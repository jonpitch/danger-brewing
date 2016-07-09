import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import Firebase from 'firebase';
import config from '../config/environment';

export default Base.extend({

  // firebase reference
  _firebase: null,

  // TODO error handling of config
  init() {
    this._super();

    // initialize firebase
    const firebase = Firebase.initializeApp(config.firebase);
    this.set('_firebase', firebase);
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

  // TODO non-password authentication
  // TODO error handling of args
  authenticate(args) {
    // password authentication
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.get('_firebase')
        .auth()
        .signInWithEmailAndPassword(args.email, args.password)
        .then((user) => {
          resolve({
            provider: 'password',
            id: user.uid
          });
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  },

  invalidate(data) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.get('_firebase')
        .auth()
        .signout()
        .then(() => {
          resolve(data);
        })
        .catch(() => {
          reject(data);
        });
    });
  }

});
