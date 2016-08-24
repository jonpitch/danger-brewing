import { moduleFor, test } from 'ember-qunit';

moduleFor('route:application', 'Unit | Route | application', {
  needs: [
    'service:metrics'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
