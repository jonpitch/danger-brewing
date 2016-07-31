import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('add-tap', 'Integration | Component | add tap', {
  integration: true
});

// TODO
test('it renders', function(assert) {
  this.render(hbs`{{add-tap}}`);
  assert.ok(true);
});
