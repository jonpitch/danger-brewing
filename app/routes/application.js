import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  beforeModel() {
    return this.get('session').fetch().catch(() => { });
  },

  actions: {

    accessDenied() {
      this.transitionTo('index');
    }
  }
});
