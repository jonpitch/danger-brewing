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

    addSensor: {
      scope: 'div[data-test="add-sensor"]',
      isVisible: isVisible(),
      click: clickable('button')
    },

    status: {
      scope: 'div[data-test="status"]',
      isVisible: isVisible(),
      isOnline: isVisible('span[data-test="online"]'),
      isOffline: isVisible('span[data-test="offline"]')
    },

    taps: collection({
      itemScope: 'div[data-test="tap"]',
      item: {
        name: text('div.md-list-item-text h3'),
        type: text('div.md-list-item-text h4'),
        pouring: text('div.md-list-item-text p'),
        hasDelete: isVisible('span[data-test="delete-tap"]'),
        delete: clickable('span[data-test="delete-tap"] button'),
        co2: isVisible('md-icon[aria-label="local-gas-station"]'),
        nitro: isVisible('md-icon[aria-label="ev-station"]')
      }
    }),

    sensors: collection({
      itemScope: 'div[data-test="sensor"]',
      item: {
        name: text('div.md-list-item-text h3'),
        type: text('div.md-list-item-text h4'),
        readout: text('div.md-list-item-text p'),
        hasDelete: isVisible('span[data-test="delete-sensor"]'),
        delete: clickable('span[data-test="delete-sensor"] button')
      }
    })
  }
});
