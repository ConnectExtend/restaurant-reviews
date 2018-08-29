import React from "react";
import { Marker, InfoWindow } from "react-google-maps";
import './RestaurantMarker.css';

const MARKERS = [];

export class RestaurantMarker extends React.Component {

  static show(restaurants) {
    MARKERS.forEach(marker => marker._hide());
    MARKERS.filter(
      m => restaurants.some(r => m.belongsTo(r))
    ).forEach(marker => marker._show());
  }

  static closeAllMarkers() {
    MARKERS.forEach(marker => marker._close());
  }

  static getFittingBounds() {
    const bounds = new window.google.maps.LatLngBounds();
    MARKERS.forEach(m => bounds.extend(m.props.position));
    return bounds;
  }

  state = { open: false, hidden: false };

  constructor() {
    super();
    MARKERS.push(this);
  }

  get restaurant() {
    return this.props.restaurant;
  }

  get location() {
    return this.restaurant.location;
  }

  _open() {
    this.setState({
      open: true
    });
  }

  _show() {
    this.setState({
      hidden: false
    });
  }

  _hide() {
    this.setState({
      hidden: true
    });
  }

  _close() {
    this.setState({
      open: false
    });
  }

  belongsTo(restaurant) {
    return this.props.restaurant['yelp_id'] === restaurant['yelp_id'];
  }

  render() {
    const restaurant = this.props.restaurant;
    const coords = {
      lat: restaurant.location.lat,
      lng: restaurant.location.lng
    };
    const location = restaurant.location;
    
    if (this.state.hidden) {
      return null;
    }

    let icon = 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=';
    
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
              {location['postal_code']} {location.city}
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
