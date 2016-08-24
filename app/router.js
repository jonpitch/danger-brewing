import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  metrics: Ember.inject.service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = document.location.pathname;
      const title = this.getWithDefault('currentRouteName', 'unknown');

      Ember.get(this, 'metrics').trackPage({ page, title });
    });
  }
});

Router.map(function() {
  this.route('login');
  this.route('status');
  this.route('about');
  this.route('history');

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
