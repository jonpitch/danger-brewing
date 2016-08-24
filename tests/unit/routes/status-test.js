import { moduleFor, test } from 'ember-qunit';

moduleFor('route:status', 'Unit | Route | status', {
  needs: [
    'service:metrics'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
