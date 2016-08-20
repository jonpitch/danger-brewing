import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from 'danger-brewing/tests/pages/add-sensor';

moduleForComponent('hub-status', 'Integration | Component | add sensor', {
  integration: true,
  beforeEach: function() {
    page.setContext(this);
  },
  afterEach: function() {
    page.removeContext();
  }
});

test('it renders', function(assert) {
  page.render(hbs`{{add-sensor}}`);
  assert.ok(page.form.isVisible, 'see form');
  assert.ok(page.form.name.input.isVisible, 'can add tap name');
  assert.ok(page.form.actions.cancel.isVisible, 'can cancel adding sensor');
  assert.ok(page.form.actions.add.isVisible, 'can save sensor');
});

test('validation', function(assert) {
  page.render(hbs`{{add-sensor}}`);
  page.form.actions.add.click();
  assert.ok(page.form.name.input.hasError, 'name has error');
  assert.equal(page.form.name.errors, 2, 'correct # of errors');
});
