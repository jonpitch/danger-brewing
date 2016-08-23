import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
      hub: this.store.findAll('hub').then((hubs) => {
        return hubs.get('firstObject');
      })
    });
  },

  actions: {

    // redirect to add tap
    addTapRedirect() {
      this.transitionTo('tap.add');
    },

    // redirect to add sensor
    addSensorRedirect() {
      this.transitionTo('sensor.add');
    }
  }
});
