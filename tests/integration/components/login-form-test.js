import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('login-form', 'Integration | Component | login form', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{login-form}}
  `);

  // TODO make this better
  const $email = this.$('input[type="email"]');
  const $password = this.$('input[type="password"]');
  const $login = this.$('button');

  assert.equal($email.length, 1, 'see email input');
  assert.equal($password.length, 1, 'see password input');
  assert.equal($login.length, 1, 'see login button');
});

// TODO form validation
// TODO invalid credentials
// TODO successful login
