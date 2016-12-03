import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';
const {
  run
} = Ember;

moduleForModel('sensor', 'Unit | Model | sensor', {
  // Specify the other units that are required for this test.
  needs: [
    'model:hub'
  ]
});

test('celsius to fahrenheit', function(assert) {
  let model = this.subject();
  run(() => {
    model.set('temperature', 0);
    assert.equal(model.get('temperatureFahrenheit'), 32, 'correct freezing conversion');
  });

  run(() => {
    model.set('temperature', 100);
    assert.equal(model.get('temperatureFahrenheit'), 212, 'correct boiling conversion');
  });

  run(() => {
    model.set('temperature', 15);
    assert.equal(model.get('temperatureFahrenheit'), 59, 'correct conversion');
  });
});
