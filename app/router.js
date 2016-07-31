import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('status');

  this.authenticatedRoute('beer', function() {
    this.authenticatedRoute('add');
  });

  this.authenticatedRoute('tap', function() {
    this.authenticatedRoute('add');
  });
});

export default Router;
