import React from 'react';
import ReactModal from 'react-modal';
import { Utils } from './Utils';
import './Loading.css';
import './RestaurantModal.css';

export class RestaurantModal extends React.Component {

  state = { open: false, loaded: false };


  open(restaurant) {
    return new Promise((resolve, reject) => {
      this.setState({ isOpen: true, loaded: false });
      Promise.all([this._load(restaurant), Utils.getMapsKey()]).then(values => {
        this.setState({ loaded: true, mapsKey: values[1], error: undefined });
        resolve(this.state);
      })
      .catch(err => {
        this.setState({ error: err });
        reject(err)
      });
    });
  }

  _load(restaurant) {
    return new Promise((resolve, reject) => {
      this.setState({
        restaurant: restaurant
      });
      resolve(this.state);
    });
  }

  close() {
    this.setState({ isOpen: false });
  }

  render() {

    const props = {
      isOpen: this.state.isOpen,
      onRequestClose: () => this.close.bind(this)(),
      contentLabel: "Restaurant Details",
      className: "detail-modal",
      ref: "modal",
      overlayClassName: "detail-modal-overlay"
    };


    if (this.state.error) {
      return (
        <ReactModal {...props}>
          <strong className='modal-error'>
            <p>An error occured:</p>
            {this.state.error.message || this.state.error}
            <p>Refresh the page and try again or use Esc to close this dialog.</p>
          </strong>
        </ReactModal>
      )
    }

    if (!this.state.loaded) {
      return (
        <ReactModal {...props}>
          <div className="lds-css ng-scope">
            <div className="lds-double-ring">
              <div />
              <div />
            </div>
          </div>
        </ReactModal>
      );
    }

    const restaurant = this.state.restaurant;
    const location = restaurant.location;
    const mapsKey = this.state.mapsKey;

    return (
      <ReactModal {...props}>
        <ul className="modal-content">
          <li className="modal-titlebar">
            <h2 className="modal-heading">{restaurant.name}</h2>
            <button className="modal-close-button" onClick={props.onRequestClose} />
          </li>
          <li>
            <img 
              className="detail-modal-map"
              src={Utils.getStaticMap(mapsKey, {
                lat: location.lat,
                lng: location.lng,
                height: 300,
                width: 640,
                markers: [
                  {
                    lat: location.lat,
                    lng: location.lng,
                  }
                ]
              })}
            />
          </li>
        </ul>
      </ReactModal>
    );
  }

}