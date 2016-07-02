/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    dotEnv: {
      clientAllowedKeys: [
        'FIREBASE_API_KEY',
        'FIREBASE_DOMAIN',
        'FIREBASE_DATABASE',
        'FIREBASE_STORAGE'
      ],
      path: {
        development: './.env.dev',
        test: './.env.test',
        production: './.env.production'
      }
    }
  });

  return app.toTree();
};
