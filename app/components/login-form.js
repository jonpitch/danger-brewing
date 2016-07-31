import Ember from 'ember';
import {
  validator, buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  email: [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    }),
    validator('format', {
      regex: /\S+@\S+\.\S+/,
      messageKey: 'errors.email'
    })
  ],
  password: validator('presence', {
    presence: true,
    ignoreBlank: true
  })
});

export default Ember.Component.extend(Validations, {
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
      this.validate().then(({ m, validations }) => {
        const isValid = validations.get('isValid');
        if (isValid) {
          this.set('isLoggingIn', true);
          this.get('session').open('firebase', {
            provider: 'password',
            email: email,
            password: password
          }).then(() => {
            this.sendAction('redirect');
          }).catch((reason) => {
            // TODO notification of error - waiting for toast in ember-paper
            console.log(reason);
          }).finally(() => {
            this.set('isLoggingIn', false);
          });
        }
      });

    }
  }
});
