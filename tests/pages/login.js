import {
  create,
  visitable,
  isVisible,
  attribute,
  text,
  fillable
} from 'ember-cli-page-object';

const url = '/login';

export default create({
  visit: visitable(url),
  url: url,

  form: {
    scope: 'login-form',
    isVisible: isVisible(),

    email: {
      scope: 'div[data-test="email"]',
      label: {
        scope: 'label',
        class: attribute('class'),
        text: text()
      },
      input: {
        scope: 'input[type="email"]',
        fillIn: fillable(),
        isVisible: isVisible()
      }
    },

    password: {
      scope: 'div[data-test="password"]',
      label: {
        scope: 'label',
        class: attribute('class'),
        text: text()
      }
    },

    login: {
      scope: 'input[type="password"]',
      fillIn: fillable(),
      isVisible: isVisible()
    }
  }
});
