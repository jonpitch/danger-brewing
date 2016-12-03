import Ember from 'ember';
const {
  Component,
  inject
} = Ember;

export default Component.extend({
  tagName: 'hub-status',
  session: inject.service(),
  store: inject.service(),

  actions: {

    // no hub found - let user set up
    setupHub() {
      const hub = this.get('store').createRecord('hub', {
        status: 'offline'
      });

      hub.save().then(() => {
        this.set('hub', hub);
      }).catch((reason) => {
        console.log(`unable to create hub ${reason}`);
      });
    },

    // redirect user to add-tap
    addTapRedirect() {
      this.sendAction('addTap');
    },

    // redirect user to add-sensor
    addSensorRedirect() {
      this.sendAction('addSensor');
    },

    // remove tap
    deleteTap(tap) {
      tap.destroyRecord().catch(() => {
        // TODO notification
        console.log('unable to delete tap');
      });
    },

    // delete sensor
    deleteSensor(sensor) {
      sensor.destroyRecord().catch(() => {
        // TODO notification
        console.log('unable to delete sensor');
      });
    }
  }
});
