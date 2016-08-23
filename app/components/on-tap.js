import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'on-tap',
  session: Ember.inject.service(),
  store: Ember.inject.service(),

  actions: {

    // redirect to add beer
    addBeer() {
      this.sendAction('add');
    },

    // archive beer for stats
    archiveBeer(beer) {
      // TODO prompt first

      // update beer - remove tap from relationship
      const tap = this.get('store').peekRecord('tap', beer.get('tap.id'));
      tap.set('beer', null);
      beer.setProperties({
        kicked: Date.now(),
        active: false,
        tap: null
      });

      beer.save().then(() => {
        return tap.save().then(() => {
          this.sendAction('reload');
        });
      }).catch(() => {
        beer.rollbackAttributes();
      });
    }
  }
});
