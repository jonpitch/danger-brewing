import {
  create,
  visitable,
  collection,
  text,
  isVisible,
  clickable
} from 'ember-cli-page-object';

const url = '/status';

export default create({
  visit: visitable(url),
  url: url,

  hub: {
    scope: 'hub-status',
    isVisible: isVisible(),
    notSetup: isVisible('p[data-test="not-setup"]'),

    addHub: {
      scope: 'div[data-test="add-hub"]',
      isVisible: isVisible(),
      click: clickable('button')
    },

    addTap: {
      scope: 'div[data-test="add-tap"]',
      isVisible: isVisible(),
      click: clickable('button')
    },

    status: {
      scope: 'div[data-test="status"]',
      isVisible: isVisible(),
      isOnline: isVisible('italic[data-test="online"]'),
      isOffline: isVisible('italic[data-test="offline"]')
    },

    // TODO revisit as "sensors"
    weather: {
      scope: 'div[data-test="weather"]',
      isVisible: isVisible(),
      upperTemp: text('span[data-test="upper-temp"]'),
      lowerTemp: text('span[data-test="lower-temp"]'),
      humidity: text('h2[data-test="hub-humidity"]')
    },

    taps: collection({
      itemScope: 'div[data-test="tap"]',
      item: {
        name: text('md-card-title-text span', { at: 0 }),
        pouring: text('md-card-title-text span', { at: 1 })
      }
    })
  }
});
