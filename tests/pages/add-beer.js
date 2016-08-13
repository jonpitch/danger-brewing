import {
  create,
  visitable,
  attribute,
  fillable,
  isVisible,
  text,
  count,
  clickOnText,
  clickable
} from 'ember-cli-page-object';

const url = '/beer/add';

export default create({
  visit: visitable(url),
  url: url,

  form: {
    scope: 'add-beer',

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
      label: {
        scope: 'label',
        class: attribute('class'),
        text: text()
      },
      select: {
        resetScope: 'md-select-menu md-option',
        select: clickOnText(),
        count: count()
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
        scope: 'input[type="text"]',
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
        scope: 'input[type="text"]',
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
