import Ember from 'ember';
import {
  validator, buildValidations
} from 'ember-cp-validations';

const required = validator('presence', {
  presence: true,
  ignoreBlank: true
});

const Validations = buildValidations({
  name: required,
  style: required,
  tap: required,
  abv: required,
  nitro: []
});

export default Ember.Component.extend(Validations, {
  tagName: 'add-beer',
  store: Ember.inject.service(),
  isSaving: false,

  // model
  name: null,
  style: null,
  tap: null,
  abv: null,
  ounces: null,
  nitro: false,

  actions: {

    // cancel adding beer
    cancel() {
      this.setProperties({
        name: null,
        style: null,
        tap: null,
        ounces: null,
        nitro: false
      });
      this.sendAction('cancel');
    },

    // save beer
    save() {
      this.validate().then(({ m, validations }) => {
        const isValid = validations.get('isValid');
        if (isValid) {
          const {
            name,
            style,
            tap,
            abv,
            ounces,
            nitro
          } = this;

          const beer = this.get('store').createRecord('beer', {
            name: name,
            style: style,
            tap: tap,
            abv: abv,
            ounces: ounces,
            nitro: nitro,
            tapped: Date.now()
          });
          beer.save().then(() => {
            this.sendAction('save');
          }).catch(() => {
            // TODO notify error
          }).finally(() => {
            this.set('isSaving', false);
          });
        }
      });
    }
  }
});
