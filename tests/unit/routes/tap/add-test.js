import { moduleFor, test } from 'ember-qunit';

moduleFor('route:tap/add', 'Unit | Route | tap/add', {
  needs: [
    'service:metrics'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
