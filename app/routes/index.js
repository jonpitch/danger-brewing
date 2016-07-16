import Ember from 'ember';

export default Ember.Route.extend({

  // get beer data - only active beers
  getBeers() {
    return this.store.query('beer', {
      orderBy: 'active',
      equalTo: true
    });
  },

  model() {
    return this.getBeers();
  },

  actions: {

    // redirect user to add beer
    addBeerRedirect() {
      this.transitionTo('beer.add');
    },

    // reload data
    reload() {
      return this.getBeers();
    }
  }
});
