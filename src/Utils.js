class Utils {
  
  static getSetting(setting) {
    return new Promise((resolve, reject) => {
      fetch('./data/settings.json')
        .then(resp => resp.json())
        .then(json => resolve(json[setting]))
        .catch(reject)
    });
  }

  static getMapsKey() {
    return Utils.getSetting('maps_key');
  }

  static getYelpKey() {
    return Utils.getSetting('yelp_key');
  }

  static getMapsURL(key) {
    return `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`
  }

  static crossFetch(url, data) {
    return fetch(`https://cors-anywhere.herokuapp.com/${url}`, data);
  }

  /**
   * Takes a google maps api key and
   * a json props object to generate
   * a valid URL to a static map image.
   * 
   * @returns a valid URL to static map image
   */
  static getStaticMap(key, props) {
    const markers = (props.markers || []).map(marker =>
      [`&markers=color:${marker.color || 'red'}`,
      `label:${(marker.label || '').replace('|', '\\|')}`,
      `${marker.lat},${marker.lng}`].join('|')
    )
    return `https://maps.googleapis.com/maps/api/staticmap?center=${props.lat},${props.lng}&zoom=13&size=${props.width}x${props.height}&maptype=${props.type || 'roadmap'}${markers.join('')}&key=${key}`;
  }

}

export default Utils;
