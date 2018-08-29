import React from 'react';
import './RestaurantCard.css';

const INFO_CLASS = 'restaurant-info';

export class RestaurantCard extends React.Component {

  render() {
    const restaurant = this.props.restaurant;
    const location = restaurant.location;
    return (
      <li className='restaurant-card' tabIndex="0">
        <img
          src={`img/${restaurant.photo}`}
          alt={restaurant.alt}
          className='restaurant-thumbnail'
        />
        <h2 className='restaurant-heading'>{restaurant.name}</h2>
        <p className={INFO_CLASS}>{location.neighborhood}</p>
        <p className={INFO_CLASS}>{location.address}</p>
        <p className={INFO_CLASS}>{location.postal_code} {location.city}</p>
        <button
          className='restaurant-details-button'
          onClick={this.props.onButtonClick}
        >
          View Details
        </button>
      </li>
    );
  }

}
