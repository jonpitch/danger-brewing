import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'hub-status',
  session: Ember.inject.service(),
  store: Ember.inject.service(),

  actions: {

    // no hub found - let user set up
    setupHub() {
      const hub = this.get('store').createRecord('hub', {
        status: 'offline'
      });

      hub.save().then(() => {
        this.set('hub', hub);
      }).catch((reason) => {
        console.log('unable to create hub ' + reason);
      });
    },

    // redirect user to add-tap
    addTapRedirect() {
      this.sendAction('addTap');
    }
  }
});
