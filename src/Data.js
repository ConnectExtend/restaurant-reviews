import Utils from './Utils';

const REVIEW_ENDPOINT = 'https://maps.googleapis.com/maps/api/place/details/json?placeid={id}&fields=reviews&key={key}';
const HOURS_ENDPOINT = 'https://api.yelp.com/v3/businesses/{id}';

class Data {

  static getRestaurants() {
    return new Promise((resolve, reject) => {
      fetch('./data/restaurants.json')
        .then(resp => resp.json())
        .then(json => resolve(json.restaurants))
        .catch(reject);
    });
  }

  static getReviews(key, restaurant) {
    return new Promise((resolve, reject) => {
      Utils.crossFetch(REVIEW_ENDPOINT.replace('{key}', key).replace('{id}', restaurant.place_id))
        .then(resp => resp.json())
        .then(json => {
          if (json.status === "OK") {
            resolve(json.result.reviews);
          } else {
            reject(new Error(json.result.status));
          }
        }).catch(reject);
    });
  }

  static getHours(key, restaurant) {
    return new Promise((resolve, reject) => {
      const info = {
        headers: new Headers({ Authorization: `Bearer ${key}` })
      }
      Utils.crossFetch(HOURS_ENDPOINT.replace('{id}', restaurant.yelp_id), info)
        .then(resp => resp.json())
        .then(json => resolve(json.hours[0].open))
        .catch(reject);
    });
  }

}

export default Data;
