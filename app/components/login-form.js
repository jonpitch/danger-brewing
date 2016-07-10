import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'login-form',
  session: Ember.inject.service(),
  isLoggingIn: false,

  // input
  email: null,
  password: null,

  // handle enter key press
  keyPress(e) {
    if (e.keyCode === 13) {
      this.send('login');
    }
  },

  actions: {

    // log the user in
    login() {
      const { email, password } = this.getProperties('email', 'password');

      // TODO validations

      this.set('isLoggingIn', true);
      this.get('session').authenticate('authenticator:firebase', {
        email: email,
        password: password
      }).then(() => {
        this.sendAction('redirect');
      }).catch((reason) => {
        // TODO notification of error
        console.log(reason);
      }).finally(() => {
        this.set('isLoggingIn', false);
      });
    }
  }
});
