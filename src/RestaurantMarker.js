import React from "react";
import { Marker, InfoWindow } from "react-google-maps";
import './RestaurantMarker.css';

const MARKERS = [];

export class RestaurantMarker extends React.Component {

  static closeAllMarkers() {
    MARKERS.forEach(marker => marker._close());
  }

  static getFittingBounds() {
    const bounds = new window.google.maps.LatLngBounds();
    MARKERS.forEach(m => bounds.extend(m.props.position));
    return bounds;
  }

  state = { open: false };

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

  _close() {
    this.setState({
      open: false
    });
  }

  render() {
    const restaurant = this.props.restaurant;
    const coords = {
      lat: restaurant.location.lat,
      lng: restaurant.location.lng
    };
    const location = restaurant.location;
    return (
      <Marker
        position={coords}
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
