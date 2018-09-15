import React from 'react';
import ReactModal from 'react-modal';
import Utils from './Utils';
import Hours from './Hours';
import Review from './Review';
import Data from './Data';

import './Loading.css';
import './RestaurantModal.css';

class RestaurantModal extends React.Component {

  state = { open: false, loaded: false };


  open(restaurant) {
    return new Promise((resolve, reject) => {
      this.setState({ isOpen: true, loaded: false });
      this._load(restaurant).then(() => { 
        this.setState({ loaded: true })
        resolve();
      })
      .catch(reject);
    });
  }

  _load(restaurant) {
    return new Promise((resolve, reject) => {

      this.setState({
        restaurant
      });

      Promise.all([Utils.getMapsKey(), Utils.getYelpKey()]).then(keys => {

        const neededData = [
          Data.getReviews(keys[0], restaurant),
          Data.getHours(keys[1], restaurant)
        ];

        Promise.all(neededData).then(info => {
          this.setState({
            loaded: true,
            mapsKey: keys[0],
            yelpKey: keys[1],
            error: undefined,
            reviews: info[0],
            hours: info[1]
          });
          resolve();
        }).catch(err => {
          this.setState({ error: err || err.message });
          reject(err);
        });

      })

    });
  }

  close() {
    this.setState({ isOpen: false });
  }

  _getReviews(amount, getIndex) {
    const reviews = this.state.reviews;

    if (reviews) {
      return reviews.splice(0, amount).map((review, i) => 
        <Review getIndex={getIndex} key={i} review={review} />
      );
    }

    return <strong className="modal-no-reviews">No reviews yet.</strong>
  }

  render() {

    const props = {
      isOpen: this.state.isOpen,
      onRequestClose: () => this.close.bind(this)(),
      contentLabel: "Restaurant Details",
      className: "modal",
      role: "dialog",
      overlayClassName: "modal-overlay"
    };

    if (this.state.error) {
      return (
        <ReactModal {...props}>
          <p className="modal-error">
            An error occured:
            <br />
            {this.state.error.message || this.state.error}
            <br />
            Refresh the page and try again or use Esc to close this dialog.
          </p>
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
        <ul className="modal-content" tabIndex="-1">
          <li className="modal-titlebar" tabIndex="-1">
            <h2 className="modal-heading" tabIndex="0">
              {restaurant.name}
            </h2>
            <button
              className="modal-close-button"
              onClick={this.close.bind(this)}
              tabIndex="-1"
            />
          </li>

          <li className="modal-map-container">
            <img
                className="modal-map"
                tabIndex="0"
                alt={`Map of the area around ${restaurant.name}`}
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
            <ul className="modal-reviews-hours">
              <li className="modal-hours">
                <Hours
                  key={location.lat}
                  hours={this.state.hours}
                />
              </li>
              <li className="modal-reviews">
                {this._getReviews(2)}
              </li>
            </ul>
          </li>
        </ul>
      </ReactModal>
    );
  }

}

export default RestaurantModal;
