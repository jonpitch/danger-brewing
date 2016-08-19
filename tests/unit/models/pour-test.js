import { moduleForModel, test } from 'ember-qunit';

moduleForModel('pour', 'Unit | Model | pour', {
  // Specify the other units that are required for this test.
  needs: [
    'model:beer'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
