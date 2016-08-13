/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'danger-brewing',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {

      }
    },

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-eval' 'unsafe-inline' apis.google.com",
      'frame-src': "'self' https://*.firebaseapp.com https://*.firebaseio.com",
      'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
      'connect-src': "'self' wss://*.firebaseio.com https://*.googleapis.com",
      'font-src': "'self' http://fonts.gstatic.com",
      'img-src': "'self' data:",
      'media-src': "'self'"
    },

    // firebase connection
    firebase: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE,
      storageBucket: process.env.FIREBASE_STORAGE
    },

    // torii
    torii: {
      sessionServiceName: 'session'
    },

    // ember-i18n
    i18n: {
      defaultLocale: 'en'
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
