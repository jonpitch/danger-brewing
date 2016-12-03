import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from 'danger-brewing/tests/pages/add-beer';

let taps = [];

moduleForComponent('hub-status', 'Integration | Component | add beer', {
  integration: true,
  beforeEach() {
    page.setContext(this);

    const tap = this.container.lookup('service:store').createRecord('tap', {
      name: 'tap-1'
    });
    taps.push(tap);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders', function(assert) {
  this.set('taps', taps);
  page.render(hbs`{{add-beer taps=taps}}`);
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
  this.set('taps', taps);
  page.render(hbs`{{add-beer taps=taps}}`);
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
  this.set('taps', taps);
  page.render(hbs`{{add-beer taps=taps}}`);
  page.form.abv.input.fillIn('7.9');
  page.form.ounces.input.fillIn('128');
  page.form.actions.add.click();
  assert.ok(page.form.name.input.hasError, 'name has error state');
  assert.equal(page.form.name.errors, 2, 'correct # of errors');
});

test('validation - style', function(assert) {
  this.set('taps', taps);
  page.render(hbs`{{add-beer taps=taps}}`);
  page.form.abv.input.fillIn('9.2');
  page.form.ounces.input.fillIn('200');
  page.form.actions.add.click();
  assert.ok(page.form.style.input.hasError, 'style has error state');
  assert.equal(page.form.style.errors, 2, 'correct # of errors');
});

test('validation - abv', function(assert) {
  this.set('taps', taps);
  page.render(hbs`{{add-beer taps=taps}}`);
  page.form.name.input.fillIn('The Bruery Tart of Darkness');
  page.form.style.input.fillIn('Sour');
  page.form.ounces.input.fillIn('128');
  page.form.actions.add.click();
  assert.ok(page.form.abv.input.hasError, 'abv has error state');
  assert.equal(page.form.abv.errors, 2, 'correct # of errors');
});

test('validation - ounces', function(assert) {
  this.set('taps', taps);
  page.render(hbs`{{add-beer taps=taps}}`);
  page.form.name.input.fillIn('Russian River Consecration');
  page.form.style.input.fillIn('Epic Sour');
  page.form.abv.input.fillIn('8');
  page.form.actions.add.click();
  assert.ok(page.form.ounces.input.hasError, 'ounces has error state');
  assert.equal(page.form.ounces.errors, 1, 'correct # of errors');
});

test('no taps available', function(assert) {
  this.set('taps', []);
  page.render(hbs`{{add-beer taps=taps}}`);
  assert.notOk(page.form.name.input.isVisible, 'name input not visible');
  assert.notOk(page.form.style.input.isVisible, 'style input not visible');
  assert.notOk(page.form.abv.input.isVisible, 'abv input not visible');
  assert.ok(page.noTaps, 'all taps currently busy');
});
