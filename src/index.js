import React from 'react';
import ReactDOM from 'react-dom';
import { RestaurantMarker } from './RestaurantMarker';
import { compose, withProps, withHandlers } from "recompose"
import registerServiceWorker from './registerServiceWorker';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import { Utils } from './Utils';
import { Data } from './Data';
import { RestaurantModal } from './RestaurantModal';
import ReactModal from 'react-modal';

const MAP_CONTAINER = document.querySelector('#map-container');
const DEFAULT_CENTER = { lat: 41.8878, lng: 12.4844 };
const DEFAULT_ZOOM = 13;
const MODAL_CONTAINER = document.querySelector('#modal-container');
export const DETAIL_MODAL = ReactDOM.render(<RestaurantModal />, MODAL_CONTAINER);

ReactModal.setAppElement('#wrapper');

Utils.getMapsKey().then(key => {

  Data.getRestaurants().then(restaurants => {

    const RestaurantMap = compose(
      withProps({
        googleMapURL: Utils.getMapsURL(key),
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
      }),
      withScriptjs,
      withGoogleMap
    )(props => (
      <GoogleMap
        options={
          {
            gestureHandling: 'cooperative',
            streetViewControl: false,
            disableDoubleClickZoom: true,
            mapTypeControl: false
          }
        }
        defaultZoom={DEFAULT_ZOOM}
        defaultCenter={DEFAULT_CENTER}
      >
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
