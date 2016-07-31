import { moduleForModel, test } from 'ember-qunit';

moduleForModel('hub', 'Unit | Model | hub', {
  // Specify the other units that are required for this test.
  needs: [
    'model:tap'
  ]
});

test('is online', function(assert) {
  let model = this.subject({
    status: 'online'
  });

  assert.ok(model.get('isOnline'), 'online status shows hub online');

  model.set('status', 'offline');
  assert.notOk(model.get('isOnline'), 'offline status shows not online');
});
