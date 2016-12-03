import {
  create,
  visitable,
  attribute,
  text,
  fillable,
  isVisible,
  clickable,
  hasClass,
  count
} from 'ember-cli-page-object';

const url = '/tap/add';

export default create({
  visit: visitable(url),
  url,

  form: {
    scope: 'add-tap',
    isVisible: isVisible(),

    name: {
      scope: 'div[data-test="tap"]',
      label: {
        scope: 'label',
        class: attribute('class'),
        text: text()
      },
      input: {
        scope: 'input[type="text"]',
        fillIn: fillable(),
        isVisible: isVisible(),
        hasError: hasClass('ng-invalid')
      },
      errors: count('div.paper-input-error')
    },

    nitro: {
      scope: 'div[data-test="carbonation"]',
      isVisible: isVisible(),
      label: {
        scope: 'div.md-label',
        text: text()
      },
      click: clickable('div.md-container')
    },

    actions: {
      cancel: {
        scope: 'div[data-test="cancel"] button',
        text: text(),
        isVisible: isVisible(),
        click: clickable()
      },
      add: {
        scope: 'div[data-test="submit"] button',
        text: text(),
        isVisible: isVisible(),
        click: clickable()
      }
    }
  }
});
