import Ember from 'ember';

export default Ember.Route.extend({

  actions: {

    // redirect to index on successful login
    onLoginSuccess() {
      this.transitionTo('index');
    }
  }
});
