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

    activity: {
      scope: 'div[data-test="activity"]',
      isVisible: isVisible(),
      date: text('span[data-test="last"]')
    },

    taps: collection({
      itemScope: 'div[data-test="tap"] div.md-list-item-text',
      item: {
        name: text('h3'),
        type: text('h4'),
        pouring: text('p')
      }
    }),

    sensors: collection({
      itemScope: 'div[data-test="sensor"] div.md-list-item-text',
      item: {
        name: text('h3'),
        type: text('h4'),
        readout: text('p')
      }
    })
  }
});
