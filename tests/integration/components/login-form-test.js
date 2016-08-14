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

// TODO
test('validation', function(assert) {
  page.render(hbs`{{login-form}}`);
  assert.ok(true);
});
