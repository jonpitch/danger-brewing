import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  actions: {

    // log out user
    logout() {
      this.get('session').invalidate();
    }
  }
});
