import Ember from 'ember';
const {
  Route,
  RSVP
} = Ember;

export default Route.extend({

  // fetch hub for reference
  model() {
    // only support one hub for now
    return new RSVP.Promise((resolve, reject) => {
      this.store.findAll('hub').then((hubs) => {
        resolve(hubs.get('firstObject'));
      }).catch((reason) => {
        reject(reason);
      });
    });
  },

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
