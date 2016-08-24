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
  tapName: required,
  abv: required
});

export default Ember.Component.extend(Validations, {
  tagName: 'add-beer',
  store: Ember.inject.service(),
  isSaving: false,

  // model
  name: null,
  style: null,
  tapName: null,
  abv: null,
  ounces: null,

  // taps without beers pouring
  availableTaps: Ember.computed('taps', function() {
    const taps = this.get('taps');
    let available = [];
    taps.forEach(function(t) {
      if (Ember.isEmpty(t.get('beer.content'))) {
        available.push(t);
      }
    });

    return available;
  }),

  actions: {

    // cancel adding beer
    cancel() {
      this.setProperties({
        name: null,
        style: null,
        tapName: null,
        ounces: null
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
            tapName,
            abv,
            ounces
          } = this;

          const tap = this.get('taps').findBy('name', tapName);
          const beer = this.get('store').createRecord('beer', {
            name: name,
            style: style,
            tap: tap,
            abv: abv,
            ounces: ounces,
            tapped: Date.now()
          });

          this.set('isSaving', true);
          tap.set('beer', beer);
          beer.save().then(() => {
            return tap.save().then(() => {
              this.sendAction('save');
            });
          }).catch((reason) => {
            // TODO notify error, idealy toast, not in ember-paper
            console.log(reason);
          }).finally(() => {
            this.set('isSaving', false);
          });
        } else {
          this.$('#input-beer-name').blur();
          this.$('#input-beer-style').blur();
          // tap
          this.$('#input-beer-abv').blur();
          this.$('#input-beer-ounces').blur();
        }
      });
    }
  }
});
