import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('status');
  this.route('about');

  this.authenticatedRoute('beer', function() {
    this.authenticatedRoute('add');
  });

  this.authenticatedRoute('tap', function() {
    this.authenticatedRoute('add');
  });

  this.authenticatedRoute('sensor', function() {
    this.authenticatedRoute('add');
  });
});

export default Router;
