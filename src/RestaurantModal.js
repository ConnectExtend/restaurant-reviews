import React from 'react';
import ReactModal from 'react-modal';
import './Loading.css';
import './RestaurantModal.css'

export class RestaurantModal extends React.Component {

  state = { open: false, loaded: false };


  open(restaurant) {
    return new Promise((resolve, reject) => {
      this.setState({ isOpen: true, loaded: false });
      this._load(restaurant).then(() => {
        this.setState({ loaded: true })
        resolve(this.state);
      })
      .catch(err => reject(err));
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
      overlayClassName: "detail-modal-overlay"
    };

    if (!this.state.loaded) {
      return (
        <ReactModal {...props}>
          <div class="lds-css ng-scope">
            <div class="lds-double-ring">
              <div />
              <div />
            </div>
          </div>
        </ReactModal>
      );
    }

    const restaurant = this.state.restaurant;
    const location = restaurant.location;

    return (
      <ReactModal {...props}>
        <p>{restaurant.name}</p>
      </ReactModal>
    );
  }

}