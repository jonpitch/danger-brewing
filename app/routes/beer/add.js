import Ember from 'ember';

export default Ember.Route.extend({

  // there must be a taps before adding a beer
  model() {
    return this.store.findAll('tap');
  },

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
