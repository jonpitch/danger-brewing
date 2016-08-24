import { moduleFor, test } from 'ember-qunit';

moduleFor('route:sensor/add', 'Unit | Route | sensor/add', {
  needs: [
    'service:metrics'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
