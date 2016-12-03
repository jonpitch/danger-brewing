import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from 'danger-brewing/tests/pages/status';
const {
  run
} = Ember;

let store;
let i18n;

moduleForComponent('hub-status', 'Integration | Component | hub status', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    store = this.container.lookup('service:store');
    i18n = this.container.lookup('service:i18n');
  },
  afterEach() {
    page.removeContext();
  }
});

test('no model to render', function(assert) {
  page.render(hbs`{{hub-status}}`);
  assert.ok(page.hub.isVisible, 'see hub component');
  assert.ok(page.hub.notSetup, 'see that hub is not setup');
  assert.notOk(page.hub.status.isVisible, 'no status to report');
  assert.equal(page.hub.taps().count, 0, 'no taps');
  assert.equal(page.hub.sensors().count, 0, 'no sensors');
});

test('it renders hub model', function(assert) {
  run(() => {
    const model = store.createRecord('hub', {
      status: 'offline',
      lastActivity: '2016-01-01'
    });

    this.set('model', model);
    page.render(hbs`{{hub-status hub=model}}`);
    assert.ok(page.hub.isVisible, 'see hub status component');
    assert.ok(page.hub.status.isOffline, 'see hub is offline');
    assert.notOk(page.hub.notSetup, 'do not see the "not setup" message');
    assert.ok(page.hub.status.isVisible, 'see status card');
    assert.equal(page.hub.taps().count, 0, 'no taps');
    assert.equal(page.hub.sensors().count, 0, 'no sensors');
  });
});

test('it renders with taps', function(assert) {
  run(() => {
    const model = store.createRecord('hub', {
      status: 'offline'
    });

    const aTap = store.createRecord('tap', {
      hub: model,
      name: 'a-tap',
      nitro: false
    });
    const bTap = store.createRecord('tap', {
      hub: model,
      name: 'b-tap',
      nitro: true
    });

    const beerName = 'Something Awesome';
    const beer = store.createRecord('beer', {
      name: beerName
    });
    bTap.set('beer', beer);

    model.set('taps', [aTap, bTap]);
    this.set('model', model);
    page.render(hbs`{{hub-status hub=model}}`);
    assert.ok(page.hub.isVisible, 'see hub status component');
    assert.ok(page.hub.status.isOffline, 'see hub is offline');
    assert.notOk(page.hub.notSetup, 'do not see the "not setup" message');
    assert.ok(page.hub.status.isVisible, 'see status card');
    assert.equal(page.hub.taps().count, 2, 'see each tap');
    assert.equal(page.hub.taps(0).name, 'a-tap', 'correct name for a-tap');
    assert.equal(
      page.hub.taps(0).type,
      i18n.t('components.hubStatus.taps.co2'),
      'a-tap has correct carbonation'
    );
    assert.ok(page.hub.taps(0).co2, 'correct gas icon');
    assert.notOk(page.hub.taps(0).nitro, 'not nitro gas icon');
    assert.equal(
      page.hub.taps(0).pouring,
      i18n.t('components.hubStatus.taps.notPouring'),
      'nothing on tap for b-tap'
    );
    assert.equal(page.hub.taps(1).name, 'b-tap', 'correct name for b-tap');
    assert.ok(page.hub.taps(1).nitro, 'correct gas icon');
    assert.notOk(page.hub.taps(1).co2, 'not co2 gas icon');
    assert.equal(
      page.hub.taps(1).type,
      i18n.t('components.hubStatus.taps.nitro'),
      'b-tap has correct carbonation'
    );
    assert.equal(
      page.hub.taps(1).pouring,
      i18n.t('components.hubStatus.taps.pouring', { beer: beerName }),
      'see beer on tap'
    );
  });
});

test('it renders with sensors', function(assert) {
  run(() => {
    const model = store.createRecord('hub', {
      status: 'offline'
    });

    const aSensor = store.createRecord('sensor', {
      hub: model,
      name: 'a-sensor',
      temperature: 20
    });
    const bSensor = store.createRecord('sensor', {
      hub: model,
      name: 'b-sensor',
      temperature: 25,
      humidity: 15
    });

    model.set('sensors', [aSensor, bSensor]);
    this.set('model', model);
    page.render(hbs`{{hub-status hub=model}}`);
    assert.ok(page.hub.isVisible, 'see hub status component');
    assert.ok(page.hub.status.isOffline, 'see hub is offline');
    assert.notOk(page.hub.notSetup, 'do not see the "not setup" message');
    assert.ok(page.hub.status.isVisible, 'see status card');
    assert.equal(page.hub.sensors().count, 2, 'see each sensor');
    assert.equal(page.hub.sensors(0).name, 'a-sensor', 'correct name for a-sensor');
    assert.equal(page.hub.sensors(0).type, 'temperature', 'correct sensor type for a-sensor');
    assert.equal(
      page.hub.sensors(0).readout,
      '20°C',
      'see correct readout for a-sensor'
    );
    assert.equal(page.hub.sensors(1).name, 'b-sensor', 'correct name for b-sensor');
    assert.equal(page.hub.sensors(1).type, 'temperature', 'correct sensor type for b-sensor');
    assert.equal(
      page.hub.sensors(1).readout,
      '25°C — 15%',
      'see correct readout for b-sensor'
    );
  });
});
