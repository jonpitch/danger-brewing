import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');

  this.route('beer', function() {
    this.route('add');
  });
  this.route('status');

  this.route('tap', function() {
    this.route('add');
  });
});

export default Router;
