export class Utils {
  
  static getMapsKey() {
    return new Promise((resolve, reject) => {
      fetch('./data/settings.json')
        .then(resp => resp.json())
        .then(json => resolve(json.maps_key))
        .catch(err => reject(err));
    });
  }

  static getMapsURL(key) {
    return `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`
  }

}
