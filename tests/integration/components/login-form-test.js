import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from 'danger-brewing/tests/pages/login';

moduleForComponent('hub-status', 'Integration | Component | login form', {
  integration: true,
  beforeEach: function() {
    page.setContext(this);
  },
  afterEach: function() {
    page.removeContext();
  }
});

test('it renders', function(assert) {
  page.render(hbs`{{login-form}}`);
  assert.ok(page.form.isVisible, 'see login form');
  assert.ok(page.form.email.input.isVisible, 'can enter email');
  assert.ok(page.form.password.input.isVisible, 'can enter password');
  assert.ok(page.form.submit.isVisible, 'see submit button');
  assert.notOk(page.form.isLoading, 'form not "loading"');
});

test('validation - all', function(assert) {
  page.render(hbs`{{login-form}}`);
  page.form.submit.click();
  assert.ok(page.form.email.input.hasError, 'email has error state');
  assert.equal(page.form.email.errors, 3, 'correct # of errors');
  assert.ok(page.form.password.input.hasError, 'password has error state');
  assert.equal(page.form.password.errors, 2, 'correct # of errors');
});

test('validation - email', function(assert) {
  page.render(hbs`{{login-form}}`);
  page.form.password.input.fillIn('somevalidpassword');
  page.form.submit.click();
  assert.ok(page.form.email.input.hasError, 'email has error state');
  assert.equal(page.form.email.errors, 3, 'correct # of errors');
  assert.notOk(page.form.password.input.hasError, 'password does not have error state');
  assert.equal(page.form.password.errors, 0, 'correct # of errors');

  page.form.email.input.fillIn('bad@email');
  page.form.submit.click();
  assert.ok(page.form.email.input.hasError, 'email has error state');
  assert.equal(page.form.email.errors, 1, 'correct # of errors');
  assert.notOk(page.form.password.input.hasError, 'password does not have error state');
  assert.equal(page.form.password.errors, 0, 'correct # of errors');
});

test('validation - password', function(assert) {
  page.render(hbs`{{login-form}}`);
  page.form.email.input.fillIn('hugh.mann@internet.com');
  page.form.submit.click();
  assert.notOk(page.form.email.input.hasError, 'email has error state');
  assert.equal(page.form.email.errors, 0, 'correct # of errors');
  assert.ok(page.form.password.input.hasError, 'password has error state');
  assert.equal(page.form.password.errors, 2, 'correct # of errors');
});
