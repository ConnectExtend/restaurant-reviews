import React from 'react';
import ReactDOM from 'react-dom';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import ReactModal from 'react-modal';
import RestaurantMarker from './RestaurantMarker';
import RestaurantModal from './RestaurantModal';
import registerServiceWorker from './registerServiceWorker';
import Utils from './Utils';
import Data from './Data';

const MAP_CONTAINER = document.querySelector('#map-container');
const DEFAULT_CENTER = { lat: 41.8878, lng: 12.4844 };
const DEFAULT_ZOOM = 13;
const MODAL_CONTAINER = document.querySelector('#modal-container');
const DETAIL_MODAL = ReactDOM.render(<RestaurantModal />, MODAL_CONTAINER);

ReactModal.setAppElement('#wrapper');

Utils.getMapsKey().then(key => {

  Data.getRestaurants().then(restaurants => {

    const RestaurantMap = compose(
      withProps({
        googleMapURL: Utils.getMapsURL(key),
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
        defaultZoom: DEFAULT_ZOOM,
        defaultCenter: DEFAULT_CENTER,
        onIdle: () => {
          // add alt text to google maps images that don't have any
          Utils.waitFor(
            () => document.getElementsByClassName('gm-control-active').length >= 5
          ).then(() => {
              Array.from(document.getElementsByTagName("img"))
                // google maps image use data URIs
                .filter(img => (img.src || '').indexOf('data') !== -1)
                .filter(img => (img.parentElement || img).tagName === 'BUTTON')
                .forEach(img => {
                  img.alt = img.parentElement.getAttribute('aria-label');
                });
              }
          );
        },
        options: {
          gestureHandling: 'cooperative',
          streetViewControl: false,
          disableDoubleClickZoom: true,
          mapTypeControl: false
        }
      }),
      withScriptjs,
      withGoogleMap
    )(props => (
      <GoogleMap {...props}>
        {
          restaurants.map((r, i) => <RestaurantMarker key={i} restaurant={r} />)
        }
      </GoogleMap>
    ));

    ReactDOM.render(<RestaurantMap />, MAP_CONTAINER);

    Data.renderCards(restaurants);

  });

});

registerServiceWorker();

export default DETAIL_MODAL;
