import Ember from 'ember';

export default Ember.Route.extend({

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
