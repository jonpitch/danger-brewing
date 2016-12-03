import Ember from 'ember';
import {
  validator, buildValidations
} from 'ember-cp-validations';
const {
  Component,
  inject
} = Ember;

const Validations = buildValidations({
  name: validator('presence', {
    presence: true,
    ignoreBlank: true
  })
});

export default Component.extend(Validations, {
  tagName: 'add-sensor',
  store: inject.service(),
  isSaving: false,

  // model
  name: null,

  actions: {

    // cancel adding tap
    cancel() {
      this.setProperties({
        name: null
      });
      this.sendAction('cancel');
    },

    // save tap
    save() {
      this.validate().then(({ m, validations }) => {
        const isValid = validations.get('isValid');
        if (isValid) {
          const {
            name
          } = this;

          // create tap and associate to hub
          const hub = this.get('hub');
          const sensor = this.get('store').createRecord('sensor', {
            name,
            hub
          });

          this.set('isSaving', true);
          hub.get('sensors').addObject(sensor);
          sensor.save().then(() => {
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
          this.$('#input-sensor-name').blur();
        }
      });
    }
  }
});
