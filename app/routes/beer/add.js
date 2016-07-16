import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  actions: {

    // cancel adding beer
    cancelAddBeer() {
      this.transitionTo('index');
    },

    // beer saved successfully
    beerSaveSuccess() {
      this.transitionTo('index');
    }
  }
});
