# Danger Brewing [![Code Climate](https://codeclimate.com/github/jonpitch/danger-brewing/badges/gpa.svg)](https://codeclimate.com/github/jonpitch/danger-brewing)

The Ember-powered kegerator.

## Overview

This is a web application that collects data from the [Danger Brewing Hub](https://github.com/jonpitch/danger-brewing-hub). Your kegerator might consist of:

* Flow meters - to monitor beer distribution
* Sensors - to monitor temperature, humidity, etc.

Administer your kegerator in real-time or let everyone know what's on tap.

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
* `npm install && bower install`

## Configuration

* Sign up for [Firebase](https://firebase.google.com/) - it's free
  * You might want to create two projects, for `development` and `production`.
* `cd` into this directory
  * `cp .env.example .env.dev`
  * `cp .env.example .env.production` - if using [ember-cli-deploy](https://github.com/ember-cli-deploy/ember-cli-deploy)
* Update each file with `ENV` variables
  * `FIREBASE_API_KEY`: Firebase API Key
  * `FIREBASE_DOMAIN`: Firebase domain
  * `FIREBASE_DATABASE`: Firebase database URL
  * `FIREBASE_STORAGE`: Firebase storage bucket
  * `GA`: Google Analytics property ID
* The resulting file(s) should look like:
```
FIREBASE_API_KEY=abc123
FIREBASE_DOMAIN=my-app.firebaseapp.com
FIREBASE_DATABASE=https://my-app.firebaseio.com
FIREBASE_STORAGE=my-app.appspot.com
GA=UA-000-12
```
* Setup an admin user
  * Navigate to your Firebase dashboard, `Auth`
  * Enable email/password authentication.
  * Add a new user with whatever email and password you choose.
* Add database index
  * Navigate to your Firebase dashboard, `Database`
  * Click the `Rules` tab
  * Update your rules to look as follows:
  ```
  {
    "rules": {
      ".read": true,
      ".write": "auth != null",
      "beers": {
        ".indexOn": ["active"]
      }
    }
  }
  ```
* Integrate with your kegerator - Launch the application:
  * `ember server`
  * Navigate to `Login`
  * Log in as your admin user you setup.
  * Navigate to `Status` and `Add Hub`.
    * Now that you have a hub, you can add `Taps` and `Sensors`.
  * The Hub IDs, along with tap and sensor IDs, will be used to integrate your kegerator to Firebase.

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

* Heroku
  * Set your ENV values, similar to `.env.example`
  * `heroku buildpacks:set https://codon-buildpacks.s3.amazonaws.com/buildpacks/heroku/emberjs.tgz`
  * `git push heroku master`

* `ember-cli-deploy`
  * For an overview, go [here](http://ember-cli-deploy.com/docs/v0.6.x/deployment-strategies-overview/)
  * The [lightning strategy](http://ember-cli-deploy.com/docs/v0.6.x/the-lightning-strategy) is recommended.

## Contributing

* Follow the [GitHub Flow](https://guides.github.com/introduction/flow/)
  * branch `master`
  * code
  * issue a pull request when ready

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
