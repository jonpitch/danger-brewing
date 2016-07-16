import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import Firebase from 'firebase';
import config from '../config/environment';

export default Base.extend({

  // firebase reference
  _firebase: null,

  init() {
    this._super();

    // initialize firebase
    if (config.firebase) {
      const firebase = Firebase.initializeApp(config.firebase);
      this.set('_firebase', firebase);
    } else {
      throw new Error('"firebase" not configured');
    }
  },

  restore(data) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.get('_firebase').auth().onAuthStateChanged((user) => {
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
          this.get('_firebase')
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
      this.get('_firebase')
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
