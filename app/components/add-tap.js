import Ember from 'ember';
import {
  validator, buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', {
    presence: true,
    ignoreBlank: true
  })
});

export default Ember.Component.extend(Validations, {
  tagName: 'add-tap',
  store: Ember.inject.service(),
  isSaving: false,

  // model
  name: null,
  nitro: false,

  actions: {

    // cancel adding tap
    cancel() {
      this.setProperties({
        name: null,
        nitro: false
      });
      this.sendAction('cancel');
    },

    // save tap
    save() {
      this.validate().then(({ m, validations }) => {
        const isValid = validations.get('isValid');
        if (isValid) {
          const {
            name,
            nitro
          } = this;

          // create tap and associate to hub
          const hub = this.get('hub');
          const tap = this.get('store').createRecord('tap', {
            name: name,
            nitro: nitro,
            hub: hub
          });

          this.set('isSaving', true);
          hub.get('taps').addObject(tap);
          tap.save().then(() => {
            return hub.save().then(() => {
              this.sendAction('save');
            });
          }).catch((reason) => {
            // TODO notify error - ideally toast, not in ember-paper
            console.log(reason);
          }).finally(() => {
            this.set('isSaving', false);
          });
        } else {
          this.$('#input-tap-name').blur();
        }
      });
    }
  }
});
