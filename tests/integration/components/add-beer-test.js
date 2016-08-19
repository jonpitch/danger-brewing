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

test('validation - all', function(assert) {
  page.render(hbs`{{add-beer}}`);
  page.form.actions.add.click();
  assert.ok(page.form.name.input.hasError, 'name has error state');
  assert.equal(page.form.name.errors, 2, 'correct # of errors');
  assert.ok(page.form.style.input.hasError, 'style has error state');
  assert.equal(page.form.style.errors, 2, 'correct # of errors');
  assert.ok(page.form.abv.input.hasError, 'abv has error state');
  assert.equal(page.form.abv.errors, 2, 'correct # of errors');
  assert.ok(page.form.ounces.input.hasError, 'ounces has error state');
  assert.equal(page.form.ounces.errors, 1, 'correct # of errors');
});

test('validation - name', function(assert) {
  page.render(hbs`{{add-beer}}`);
  page.form.style.input.fillIn('Double IPA');
  page.form.abv.input.fillIn('7.9');
  page.form.ounces.input.fillIn('128');
  page.form.actions.add.click();
  assert.ok(page.form.name.input.hasError, 'name has error state');
  assert.equal(page.form.name.errors, 2, 'correct # of errors');
});

test('validation - style', function(assert) {
  page.render(hbs`{{add-beer}}`);
  page.form.name.input.fillIn('Victory Storm King');
  page.form.abv.input.fillIn('9.2');
  page.form.ounces.input.fillIn('200');
  page.form.actions.add.click();
  assert.ok(page.form.style.input.hasError, 'style has error state');
  assert.equal(page.form.style.errors, 2, 'correct # of errors');
});

test('validation - abv', function(assert) {
  page.render(hbs`{{add-beer}}`);
  page.form.name.input.fillIn('The Bruery Tart of Darkness');
  page.form.style.input.fillIn('Sour');
  page.form.ounces.input.fillIn('128');
  page.form.actions.add.click();
  assert.ok(page.form.abv.input.hasError, 'abv has error state');
  assert.equal(page.form.abv.errors, 2, 'correct # of errors');
});

test('validation - ounces', function(assert) {
  page.render(hbs`{{add-beer}}`);
  page.form.name.input.fillIn('Russian River Consecration');
  page.form.style.input.fillIn('Epic Sour');
  page.form.abv.input.fillIn('8');
  page.form.actions.add.click();
  assert.ok(page.form.ounces.input.hasError, 'ounces has error state');
  assert.equal(page.form.ounces.errors, 1, 'correct # of errors');
});
