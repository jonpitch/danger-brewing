import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from 'danger-brewing/tests/pages/index';

let store;

moduleForComponent('hub-status', 'Integration | Component | on tap', {
  integration: true,
  beforeEach: function() {
    page.setContext(this);
    store = this.container.lookup('service:store');
  },
  afterEach: function() {
    page.removeContext();
  }
});

test('it renders with no beers', function(assert) {
  this.render(hbs`{{on-tap beers=[]}}`);
  assert.ok(page.onTap.isEmpty, 'no beers on tap');
  assert.equal(page.onTap.beers().count, 0, 'no beers found');
});

test('it renders with beers', function(assert) {
  Ember.run(() => {
    let aPour = store.createRecord('pour', {
      created: 100,
      ounces: 5
    });

    let aBeer = store.createRecord('beer', {
      name: 'A Beer',
      style: 'A Style',
      pours: [aPour]
    });
    let bBeer = store.createRecord('beer', {
      name: 'B Beer',
      style: 'B Style'
    });

    this.set('model', [aBeer, bBeer]);
    page.render(hbs`{{on-tap beers=model}}`);
    assert.notOk(page.onTap.isEmpty, 'see beers on tap');
    assert.equal(page.onTap.beers().count, 2, 'correct # of beers');
    assert.equal(page.onTap.beers(0).name, 'A Beer', 'correct name for beer 1');
    assert.equal(page.onTap.beers(0).style, 'A Style', 'correct style for beer 1');
    assert.ok(page.onTap.beers(0).progress, 'see beer 1 progress');
    assert.notOk(page.onTap.beers(0).arrived, 'beer 1 is not new');
    assert.ok(page.onTap.beers(0).stale, 'beer 2 is not stale');
    assert.equal(page.onTap.beers(1).name, 'B Beer', 'correct name for beer 2');
    assert.equal(page.onTap.beers(1).style, 'B Style', 'correct style for beer 2');
    assert.ok(page.onTap.beers(1).progress, 'see beer 2 progress');
    assert.ok(page.onTap.beers(1).arrived, 'beer 2 is new');
    assert.notOk(page.onTap.beers(1).stale, 'beer 2 is not stale');
  });
});
