import React from 'react';
import ReactDOM from 'react-dom';
import Utils from './Utils';
import DETAIL_MODAL from './index';
import RestaurantCard from './RestaurantCard';
import RestaurantMarker from './RestaurantMarker';

const REVIEW_ENDPOINT = 'https://maps.googleapis.com/maps/api/place/details/json?placeid={id}&fields=reviews&key={key}';
const HOURS_ENDPOINT = 'https://api.yelp.com/v3/businesses/{id}';
const CARD_CONTAINER = document.querySelector('#card-container');
const CUISINE_FILTER = document.querySelector('#cuisines-input');

class Data {

  static renderCards(restaurants) {
    const promise = 
        restaurants ? Promise.resolve(restaurants) : Data.getRestaurants();

    const allowedCuisine = CUISINE_FILTER.value;

    promise.then(data => {

      if (allowedCuisine !== 'all') {
        data = data.filter(r =>
            r.categories.some(
              c => c.toUpperCase() === allowedCuisine.toUpperCase()
            )
        );
      }

      const cards = (
        <ul id='restaurants-list'>
          {data.map((r, i) => (
            <RestaurantCard
              key={i}
              restaurant={r}
              onButtonClick={() => DETAIL_MODAL.open(r)}
            />
          ))}
        </ul>
      )

      ReactDOM.render(cards, CARD_CONTAINER);
      RestaurantMarker.show(data);


    });

  }

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

CUISINE_FILTER.onchange = () => Data.renderCards();

export default Data;
