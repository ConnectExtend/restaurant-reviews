## FEND Certification Course
---

## Restaurant Reviews - Project Overview
A restaurant review site written with ReactJS that is accessible, available offline (via service worker) and responsive. 

### Where to start?

1. Clone the repo
2. Put your API keys in `public/settings.json`
3. Open a command prompt in the cloned repo
4. Run `yarn start` and the website will open in your default browser

### Note about the JS files
The code in this project has been written using ES6 but is backported via Babel during transpilation.

### a11y
* Color contrast ratios are fully-compliant
* Modal complies with accessibility standards (e.g. it can be closed via `Esc`)
* Markup passed HTML Validator
* Lighthouse Accessibility score: 91 (the failing elements are the nine SVG images that are the native markers on the Map)



###APIs
* Google Maps API
* Yelp Fusion API


### Sources referenced
* https://developers.google.com/maps/documentation/javascript/tutorial

* https://developers.google.com/maps/documentation/javascript/interaction

* https://github.com/reactjs/react-modal

* https://github.com/tomchentw/react-google-maps

* https://loading.io/spinner/double-ring

* https://webaim.org/techniques/css/invisiblecontent/