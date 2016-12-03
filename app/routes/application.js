import Ember from 'ember';
const {
  Route,
  inject
} = Ember;

export default Route.extend({
  session: inject.service(),

  beforeModel() {
    return this.get('session').fetch().catch(() => { });
  },

  actions: {

    accessDenied() {
      this.transitionTo('index');
    }
  }
});
