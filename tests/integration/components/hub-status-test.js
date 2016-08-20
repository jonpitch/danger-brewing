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
