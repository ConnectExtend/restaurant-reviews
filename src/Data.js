import { Utils } from './Utils';

const REVIEW_ENDPOINT = 'https://maps.googleapis.com/maps/api/place/details/json?placeid={id}&fields=reviews&key={key}';

export class Data {

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
      Utils.crossFetch(REVIEW_ENDPOINT.replace('{key}', key).replace('{id}', restaurant['place_id']))
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

}