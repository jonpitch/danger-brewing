import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hub-status', 'Integration | Component | hub status', {
  integration: true
});

// TODO
test('it renders', function(assert) {
  this.render(hbs`{{hub-status}}`);
  assert.ok(true);
});
