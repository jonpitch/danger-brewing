import Ember from 'ember';

export default Ember.Route.extend({

  actions: {

    // cancel adding tap
    cancelAddTap() {
      this.transitionTo('status');
    },

    // tap saved successfully
    tapSaveSuccess() {
      this.transitionTo('status');
    }
  }

});
