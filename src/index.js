import React from 'react';
import ReactDOM from 'react-dom';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import ReactModal from 'react-modal';
import RestaurantMarker from './RestaurantMarker';
import RestaurantModal from './RestaurantModal';
import RestaurantCard from './RestaurantCard';
import registerServiceWorker from './registerServiceWorker';
import Utils from './Utils';
import Data from './Data';

const MAP_CONTAINER = document.querySelector('#map-container');
const DEFAULT_CENTER = { lat: 41.8878, lng: 12.4844 };
const DEFAULT_ZOOM = 13;
const MODAL_CONTAINER = document.querySelector('#modal-container');
const DETAIL_MODAL = ReactDOM.render(<RestaurantModal />, MODAL_CONTAINER);
const CUISINE_FILTER = document.querySelector('#cuisines-input');
const CARD_CONTAINER = document.querySelector('#card-container');

// helps screen reader understand the modal
ReactModal.setAppElement('#wrapper');

/**
 * Renders and filters the restaurant components (e.g. cards and markers)
 */
function renderRestaurantComponents(restaurants) {
  // If data was provided use it, otherwise, get it
  const promise = restaurants ? Promise.resolve(restaurants) : Data.getRestaurants();

  const allowedCuisine = CUISINE_FILTER.value || 'all';

  promise.then(data => {

    if (allowedCuisine !== 'all') {
      data = data.filter(r =>
        r.categories.some(
          c => c.toUpperCase() === allowedCuisine.toUpperCase()
        )
      );
    }

    const cards = (
      <ul id='restaurants-list'>
        {data.map((r, i) => (
          <RestaurantCard
            key={i}
            restaurant={r}
            onButtonClick={() => DETAIL_MODAL.open(r)}
          />
        ))}
      </ul>
    )

    ReactDOM.render(cards, CARD_CONTAINER);

    RestaurantMarker.show(data);

  });
}

window.gm_authFailure = () => {
  Array.from(MAP_CONTAINER.children)
      .forEach(child => MAP_CONTAINER.removeChild(child));
  const error = document.createElement('p');
  error.innerHTML = 'Map failed to load';
  error.classList.add('map-failure');
  MAP_CONTAINER.appendChild(error);
}

Utils.getMapsKey().then(key => {

  Data.getRestaurants().then(restaurants => {

    const RestaurantMap = compose(
      withProps({
        googleMapURL: Utils.getMapsURL(key),
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '400px' }} />,
        mapElement: <div style={{ height: '100%' }} />,
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
          // makes it harder to accidentally scroll the map
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
          // renders the restaurant markers
          restaurants.map((r, i) => <RestaurantMarker key={i} restaurant={r} />)
        }
      </GoogleMap>
    ));

    ReactDOM.render(<RestaurantMap />, MAP_CONTAINER);

    renderRestaurantComponents(restaurants);

  });

});

registerServiceWorker();

// when the filter changes, filter the restaurant components accordingly
CUISINE_FILTER.onchange = () => renderRestaurantComponents();

export default DETAIL_MODAL;
