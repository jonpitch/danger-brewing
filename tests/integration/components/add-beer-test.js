import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from 'danger-brewing/tests/pages/add-beer';

moduleForComponent('hub-status', 'Integration | Component | add beer', {
  integration: true,
  beforeEach: function() {
    page.setContext(this);
  },
  afterEach: function() {
    page.removeContext();
  }
});

test('it renders', function(assert) {
  page.render(hbs`{{add-beer}}`);
  assert.ok(page.form.isVisible, 'see form');
  assert.ok(page.form.name.input.isVisible, 'can enter beer name');
  assert.ok(page.form.style.input.isVisible, 'can enter beer style');
  assert.ok(page.form.tap.isVisible, 'can add beer to tap');
  assert.ok(page.form.abv.input.isVisible, 'can add abv');
  assert.ok(page.form.ounces.input.isVisible, 'can add ounces');
  assert.ok(page.form.actions.cancel.isVisible, 'can cancel adding beer');
  assert.ok(page.form.actions.add.isVisible, 'can save beer');
});

// TODO
test('validation', function(assert) {
  page.render(hbs`{{add-beer}}`);
  assert.ok(true);
});
