import Ember from 'ember';
const {
  Controller,
  inject
} = Ember;

export default Controller.extend({
  session: inject.service(),
  leftSideBarOpen: false,

  actions: {

    // log out user
    logout() {
      this.get('session').close();
    }
  }
});
