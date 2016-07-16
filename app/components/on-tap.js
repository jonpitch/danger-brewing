import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'on-tap',
  session: Ember.inject.service(),

  actions: {

    // redirect to add beer
    addBeer() {
      this.sendAction('add');
    },

    // archive beer for stats
    archiveBeer(beer) {
      // TODO prompt first

      beer.set('kicked', Date.now());
      beer.set('active', false);
      beer.save().then(() => {
        this.sendAction('reload');
      }).catch(() => {
        beer.rollbackAttributes();
      });
    }
  }
});
