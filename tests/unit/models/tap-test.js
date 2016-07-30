import { moduleForModel, test } from 'ember-qunit';

moduleForModel('tap', 'Unit | Model | tap', {
  // Specify the other units that are required for this test.
  needs: [
    'model:hub',
    'model:beer'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
