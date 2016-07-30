import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    // only support one hub for now
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.store.findAll('hub').then((hubs) => {
        resolve(hubs.get('firstObject'));
      }).catch((reason) => {
        reject(reason);
      });
    });
  },

  actions: {

    // redirect to add tap
    addTapRedirect() {
      this.transitionTo('tap.add');
    }
  }
});
