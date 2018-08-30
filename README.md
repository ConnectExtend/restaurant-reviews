## Udacity FEND Certification Course
---

## Restaurant Reviews - Project Overview
A restaurant review site written with ReactJS that is accessible, available offline (via service worker), and responsive. 

### Where to start?
1. Install Git, NodeJS, Yarn and Python if not already installed
2. Clone the repo via `git clone <repository url>`
3. Put your API keys in `public/data/settings.json`
4. Open a command prompt in the cloned repo
5. Run `yarn install` in the opened cmd
6. Run `yarn build` in the opened cmd
7. CD into the build folder via `cd build` in the opened cmd
8. Start a http server in the build folder:
    * If you use Python 3, run `python3 -m http.server 5423`
        * Depending on your Python setup, you may have to use `python` instead of `python3`
    * If you use Python 2, run `python -m SimpleHTTPServer 5423`
9. Navigate to `localhost:5423` in a modern browser

### Technology used
* ReactJS
* JavaScript ES6 (backported via Babel during transpilation)
* CSS, including Flexbox and variables
* HTML5

### Validation
* HTML Validator - passed
* CSS - passed
* ESLint - passed

### a11y
* Color contrast ratios are fully-compliant
* Modal complies with accessibility standards (e.g. it can be closed via `Esc`)
* Logical tab order


## Lighthouse
![Lighthouse audit results](https://i.imgur.com/C7Lix1u.png)

### APIs
* Google Maps API
* Yelp Fusion API

### Sources referenced

* https://github.com/reactjs/react-modal

* https://github.com/tomchentw/react-google-maps

* https://loading.io/spinner/double-ring

* https://webaim.org/techniques/css/invisiblecontent/

* https://developers.google.com/maps/documentation/javascript/tutorial

* https://developers.google.com/maps/documentation/javascript/interaction