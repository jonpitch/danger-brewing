import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  leftSideBarOpen: false,

  actions: {

    // log out user
    logout() {
      this.get('session').close();
    }
  }
});
