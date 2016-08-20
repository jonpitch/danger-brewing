import {
  create,
  visitable,
  isVisible,
  text,
  attribute
} from 'ember-cli-page-object';

const url = '/about';

export default create({
  visit: visitable(url),
  url: url,

  read: {
    header: {
      scope: 'h2[data-test="read"]',
      isVisible: isVisible(),
      text: text()
    },
    link: {
      scope: 'p',
      text: text()
    }
  },

  contribute: {
    header: {
      scope: 'h2[data-test="contribute"]',
      isVisible: isVisible(),
      text: text()
    },
    link: {
      scope: 'a[data-test="contribute"]',
      url: attribute('href')
    }
  }
});
