import { moduleFor, test } from 'ember-qunit';

moduleFor('route:beer/add', 'Unit | Route | beer/add', {
  needs: [
    'service:metrics'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
