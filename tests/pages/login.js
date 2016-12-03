import {
  create,
  visitable,
  isVisible,
  attribute,
  text,
  fillable,
  clickable,
  hasClass,
  count
} from 'ember-cli-page-object';

const url = '/login';

export default create({
  visit: visitable(url),
  url,

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
        isVisible: isVisible(),
        hasError: hasClass('ng-invalid')
      },
      errors: count('div.paper-input-error')
    },

    password: {
      scope: 'div[data-test="password"]',
      label: {
        scope: 'label',
        class: attribute('class'),
        text: text()
      },
      input: {
        scope: 'input[type="password"]',
        fillIn: fillable(),
        isVisible: isVisible(),
        hasError: hasClass('ng-invalid')
      },
      errors: count('div.paper-input-error')
    },

    login: {
      scope: 'input[type="password"]',
      fillIn: fillable(),
      isVisible: isVisible()
    },

    isLoading: isVisible('div[data-test="loading"]'),
    submit: {
      scope: 'div[data-test="submit"] button',
      isVisible: isVisible(),
      click: clickable()
    }
  }
});
