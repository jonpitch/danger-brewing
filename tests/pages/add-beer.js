import {
  create,
  visitable,
  attribute,
  fillable,
  isVisible,
  text,
  clickOnText,
  clickable
} from 'ember-cli-page-object';

const url = '/beer/add';

export default create({
  visit: visitable(url),
  url: url,

  noHub: isVisible('p[data-test="no-hub"]'),

  form: {
    scope: 'add-beer',
    isVisible: isVisible(),

    name: {
      scope: 'div[data-test="name"]',
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

    style: {
      scope: 'div[data-test="style"]',
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

    tap: {
      scope: 'div[data-test="tap"]',
      isVisible: isVisible(),
      open: clickable('md-select'),
      label: {
        scope: 'label',
        class: attribute('class'),
        text: text()
      },
      select: {
        resetScope: 'md-select-menu > md-content',
        choose: clickOnText('md-option div.md-text', { testContainer: 'body' })
      }
    },

    abv: {
      scope: 'div[data-test="abv"]',
      label: {
        scope: 'label',
        class: attribute('class'),
        text: text()
      },
      input: {
        scope: 'input[type="number"]',
        fillIn: fillable(),
        isVisible: isVisible()
      }
    },

    ounces: {
      scope: 'div[data-test="ounces"]',
      label: {
        scope: 'label',
        class: attribute('class'),
        text: text()
      },
      input: {
        scope: 'input[type="number"]',
        fillIn: fillable(),
        isVisible: isVisible()
      }
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
