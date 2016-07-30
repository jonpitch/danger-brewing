import { moduleForModel, test } from 'ember-qunit';

moduleForModel('hub', 'Unit | Model | hub', {
  // Specify the other units that are required for this test.
  needs: [
    'model:tap'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
