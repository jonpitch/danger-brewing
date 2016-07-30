import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hub-status', 'Integration | Component | hub status', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{hub-status}}`);
  assert.ok(false);
});
