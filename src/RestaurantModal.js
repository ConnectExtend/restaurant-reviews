import React from 'react';
import ReactModal from 'react-modal';
import { Utils, crossFetch } from './Utils';
import { Review } from './Review';
import { Data } from './Data';
import './Loading.css';
import './RestaurantModal.css';

export class RestaurantModal extends React.Component {

  state = { open: false, loaded: false };


  open(restaurant) {
    return new Promise((resolve, reject) => {
      this.setState({ isOpen: true, loaded: false });
      this._load(restaurant).then(() => this.setState({ loaded: true }))
    });
  }

  _load(restaurant) {
    return new Promise((resolve, reject) => {
      this.setState({
        restaurant: restaurant
      });
      Utils.getMapsKey().then(mapsKey => {
        const neededData = [
          Utils.getYelpKey(),
          Data.getReviews(mapsKey, restaurant)
        ];
        Promise.all(neededData).then(values => {
          this.setState({ 
            loaded: true,
            mapsKey: mapsKey,
            yelpKey: values[0],
            error: undefined,
            reviews: values[1]
          });
          resolve();
        })
        .catch(err => {
          this.setState({ error: err.message });
          reject(err);
        });
      })
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
          <li>
            {<Review review={Review.getLongest(this.state.reviews)}/>}
          </li>
        </ul>
      </ReactModal>
    );
  }

}