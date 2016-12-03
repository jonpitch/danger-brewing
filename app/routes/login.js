import Ember from 'ember';
const {
  Route
} = Ember;

export default Route.extend({

  actions: {

    // redirect to index on successful login
    onLoginSuccess() {
      this.transitionTo('index');
    }
  }
});
