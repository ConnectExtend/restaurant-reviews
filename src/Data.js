export class Data {

  static getRestaurants() {
    return new Promise((resolve, reject) => {
      fetch('./data/restaurants.json')
          .then(resp => resp.json())
          .then(json => resolve(json.restaurants))
          .catch(err => reject(err));
    });
  }

  static openRestaurantModal(restaurant) {
    
  }

}