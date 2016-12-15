import Ember from 'ember';
const {
  Route,
  inject
} = Ember;

export default Route.extend({
  session: inject.service(),
  fastboot: inject.service(),

  beforeModel() {
    if (this.get('fastboot.isFastboot')) {
      return this._super(...arguments);
    }

    return this.get('session').fetch().catch(() => { });
  },

  actions: {

    accessDenied() {
      this.transitionTo('index');
    }
  }
});
