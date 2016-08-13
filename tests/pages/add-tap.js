import {
  create,
  visitable,
  attribute,
  text,
  fillable,
  isVisible,
  clickable
} from 'ember-cli-page-object';

const url = '/tap/add';

export default create({
  visit: visitable(url),
  url: url,

  form: {
    scope: 'add-tap',

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
        isVisible: isVisible()
      }
    },

    nitro: {
      scope: 'div[data-test="carbonation"]',
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
