import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';
const {
  run
} = Ember;

moduleForModel('hub', 'Unit | Model | hub', {
  needs: [
    'model:tap',
    'model:sensor'
  ]
});

test('is online', function(assert) {
  run(() => {
    let model = this.subject({
      status: 'online'
    });

    assert.ok(model.get('isOnline'), 'online status shows hub online');

    model.set('status', 'offline');
    assert.notOk(model.get('isOnline'), 'offline status shows not online');
  });
});
