import {
  create,
  visitable,
  isVisible,
  text,
  clickable,
  collection
} from 'ember-cli-page-object';

const url = '/';

export default create({
  visit: visitable(url),
  url: url,

  toolbar: {
    scope: 'md-card-content md-toolbar',
    isVisible: isVisible(),
    text: text('h2'),
    menu: {
      scope: 'button',
      isVisible: isVisible(),
      click: clickable()
    }
  },

  navigation: collection({
    itemScope: 'md-sidenav md-content md-list > md-list-item',
    item: {
      text: text('span.link > a'),
      click: clickable()
    }
  }),

  onTap: {
    scope: 'on-tap',
    isEmpty: isVisible('p[data-test="empty"]'),
    addBeer: {
      scope: 'div[data-test="add-beer"]',
      isVisible: isVisible(),
      click: clickable('button')
    },
    beers: collection({
      itemScope: 'div[data-test="beer"]',
      item: {
        name: text('span[data-test="name"]'),
        style: text('span[data-test="style"]'),
        delete: {
          itemScope: 'md-card-actions button',
          click: clickable(),
          isVisible: isVisible()
        }
      }
    })
  }
});
