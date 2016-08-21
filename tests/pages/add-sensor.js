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

const url = '/sensor/add';

export default create({
  visit: visitable(url),
  url: url,

  form: {
    scope: 'add-sensor',
    isVisible: isVisible(),

    name: {
      scope: 'div[data-test="sensor"]',
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
