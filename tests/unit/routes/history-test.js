import { moduleFor, test } from 'ember-qunit';

moduleFor('route:history', 'Unit | Route | history', {
  needs: [
    'service:metrics'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
