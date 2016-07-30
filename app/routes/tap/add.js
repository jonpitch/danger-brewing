import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

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
