import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from 'danger-brewing/tests/pages/status';

let store;

moduleForComponent('hub-status', 'Integration | Component | hub status', {
  integration: true,
  beforeEach: function() {
    page.setContext(this);
    store = this.container.lookup('service:store');
  },
  afterEach: function() {
    page.removeContext();
  }
});

test('no model to render', function(assert) {
  page.render(hbs`{{hub-status}}`);
  assert.ok(page.hub.isVisible, 'see hub component');
  assert.ok(page.hub.notSetup, 'see that hub is not setup');
  assert.notOk(page.hub.status.isVisible, 'no status to report');
  assert.notOk(page.hub.activity.isVisible, 'no activity to report');
  assert.equal(page.hub.taps().count, 0, 'no taps');
  assert.equal(page.hub.sensors().count, 0, 'no sensors');
});

test('it renders hub model', function(assert) {
  Ember.run(() => {
    const model = store.createRecord('hub', {
      status: 'offline'
    });

    this.set('model', model);
    page.render(hbs`{{hub-status hub=model}}`);
    assert.ok(page.hub.isVisible, 'see hub status component');
    assert.ok(page.hub.status.isOffline, 'see hub is offline');
    assert.notOk(page.hub.notSetup, 'do not see the "not setup" message');
    assert.ok(page.hub.status.isVisible, 'see status card');
    assert.ok(page.hub.activity.isVisible, 'see last activity card');
    assert.equal(page.hub.taps().count, 0, 'no taps');
    assert.equal(page.hub.sensors().count, 0, 'no sensors');
  });
});

test('it renders with taps', function(assert) {
  Ember.run(() => {
    const model = store.createRecord('hub', {
      status: 'offline'
    });

    const aTap = store.createRecord('tap', {
      hub: model,
      name: 'a-tap'
    });
    const bTap = store.createRecord('tap', {
      hub: model,
      name: 'b-tap'
    });

    model.set('taps', [aTap, bTap]);
    this.set('model', model);
    page.render(hbs`{{hub-status hub=model}}`);
    assert.ok(page.hub.isVisible, 'see hub status component');
    assert.ok(page.hub.status.isOffline, 'see hub is offline');
    assert.notOk(page.hub.notSetup, 'do not see the "not setup" message');
    assert.ok(page.hub.status.isVisible, 'see status card');
    assert.equal(page.hub.taps().count, 2, 'see each tap');
    assert.equal(page.hub.taps(0).name, 'a-tap', 'correct name for a-tap');
    assert.equal(page.hub.taps(1).name, 'b-tap', 'correct name for b-tap');
  });
});

test('it renders with sensors', function(assert) {
  Ember.run(() => {
    const model = store.createRecord('hub', {
      status: 'offline'
    });

    const aSensor = store.createRecord('sensor', {
      hub: model,
      name: 'a-sensor'
    });
    const bSensor = store.createRecord('sensor', {
      hub: model,
      name: 'b-sensor'
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
    assert.equal(page.hub.sensors(1).name, 'b-sensor', 'correct name for b-sensor');
  });
});
