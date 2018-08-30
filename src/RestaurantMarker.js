import React from "react";
import './RestaurantMarker.css';
import { Marker, InfoWindow } from 'react-google-maps';

const MARKERS = [];

class RestaurantMarker extends React.Component {

  /**
   * Rerenders the restaurant markers to only show
   * the ones within {@param restaurants}
   */
  static show(restaurants) {
    MARKERS.forEach(marker => marker._hide());
    MARKERS.filter(
      m => restaurants.some(r => m.belongsTo(r))
    ).forEach(marker => marker._show());
  }

  /**
   * Closes the info windows of all markers
   */
  static closeAllMarkers() {
    MARKERS.forEach(marker => marker._close());
  }

  state = { open: false, hidden: false };

  constructor() {
    super();
    MARKERS.push(this);
  }

  /**
   * Shows this marker on the map
   */
  _show() {
    this.setState({
      hidden: false
    });
  }

  /**
   * Hides this marker on the map
   */
  _hide() {
    this.setState({
      hidden: true
    });
  }

  /**
   * Opens the info window of this marker
   */
  _open() {
    this.setState({
      open: true
    });
  }

  /**
   * Closes the info window of this marker
   */
  _close() {
    this.setState({
      open: false
    });
  }

  /**
   * Returns whether or not this marker represents {@param restaurant}
   * 
   * @param {*} restaurant the potential owner of this marker
   */
  belongsTo(restaurant) {
    return this.props.restaurant.yelp_id === restaurant.yelp_id;
  }

  render() {
    const restaurant = this.props.restaurant;
    const location = restaurant.location;

    const coords = {
      lat: location.lat,
      lng: location.lng
    };
    
    if (this.state.hidden) {
      return null;
    }

    let icon = 'https://chart.googleapis.com/chart?chst=d_map_spin&chld=';
    
    // change this color based on whether or not the window is open
    if (this.state.open) {
      icon += '0.75|0|AAA|25|_|%E2%80%A2';
    } else {
      icon += '0.75|0|EA4335|25|_|%E2%80%A2';
    }

    return (
      <Marker
        position={coords}
        icon={icon}
        onClick={() => {
          RestaurantMarker.closeAllMarkers();
          this._open.bind(this)();
        }}
      >
        {this.state.open && <InfoWindow onCloseClick={this._close.bind(this)}>
          <div>
            <h3 className='restaurant-name'>{restaurant.name}</h3>
            <p className='restaurant-neighborhood'>
              Located in {location.neighborhood}
            </p>
            <p>{location.address}</p>
            <p>
              {location.postal_code} {location.city}
            </p>
            <p className='restaurant-categories'>
              {restaurant.categories.join(', ')}
            </p>
          </div>
        </InfoWindow>}
      </Marker>
    )
  }
  
}

export default RestaurantMarker;
