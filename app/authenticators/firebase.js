import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  firebaseApp: Ember.inject.service(),

  restore(data) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.get('firebaseApp').auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject(data);
        }
      });
    });
  },

  authenticate(args) {
    // password authentication
    const { provider } = args;
    if (provider === 'password') {
      return new Ember.RSVP.Promise((resolve, reject) => {
        const { email, password } = args;
        if (Ember.isEmpty(email) || Ember.isEmpty(password)) {
          reject();
        } else {
          this.get('firebaseApp')
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
              resolve({
                provider: provider,
                id: user.uid
              });
            })
            .catch((reason) => {
              reject(reason);
            });
        }
      });
    } else {
      // TODO
      throw new Error('only the "password" provider is supported');
    }
  },

  invalidate(data) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.get('firebaseApp')
        .auth()
        .signOut()
        .then(() => {
          resolve(data);
        })
        .catch(() => {
          reject(data);
        });
    });
  }

});
