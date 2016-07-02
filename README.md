# Danger Brewing

The Ember-powered kegerator.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Configuration

* Sign up for [Firebase](https://firebase.google.com/)
* `cd` into this directory
  * `touch .env.dev`
  * `touch .env.test`
  * `touch .env.production`
* Update each file with `ENV` variables
  * `FIREBASE_API_KEY`: Firebase API Key
  * `FIREBASE_DOMAIN`: Firebase domain
  * `FIREBASE_DATABASE`: Firebase database URL
  * `FIREBASE_STORAGE`: Firebase storage bucket
* The resulting file(s) should look like:
```
FIREBASE_API_KEY=abc123
FIREBASE_DOMAIN=my-app.firebaseapp.com
FIREBASE_DATABASE=https://my-app.firebaseio.com
FIREBASE_STORAGE=my-app.appspot.com
```

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Coming soon.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
