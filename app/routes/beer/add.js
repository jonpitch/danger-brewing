import Ember from 'ember';
const {
  Route
} = Ember;

export default Route.extend({

  // there must be taps before adding a beer
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
