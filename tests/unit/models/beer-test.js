import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('beer', 'Unit | Model | beer', {
  // Specify the other units that are required for this test.
  needs: [
    'model:tap',
    'model:pour'
  ]
});

test('ounces left - has pours', function(assert) {
  Ember.run(() => {
    const aPour = this.store().createRecord('pour', {
      ounces: 10
    });

    const bPour = this.store().createRecord('pour', {
      ounces: 10
    });

    const cPour = this.store().createRecord('pour', {
      ounces: 10
    });

    let beer = this.subject({
      ounces: 100,
      pours: [aPour, bPour, cPour]
    });

    assert.equal(beer.get('ouncesLeft'), 70, 'pours subtracted from total');
  });
});

test('ounces left - no pours', function(assert) {
  Ember.run(() => {
    let beer = this.subject({
      ounces: 100,
      pours: []
    });

    assert.equal(beer.get('ouncesLeft'), 100, 'no pours subtracts nothing from total');
  });
});

test('warn level', function(assert) {
  Ember.run(() => {
    const aPour = this.store().createRecord('pour', {
      ounces: 5
    });

    let beer = this.subject({
      ounces: 100,
      pours: [aPour]
    });

    assert.notOk(beer.get('warnLevel'), 'above warn threshold is no cause for concern');

    aPour.set('ounces', 85);
    assert.ok(beer.get('warnLevel'), 'at warn threshold is cause for concern');

    aPour.set('ounces', 99);
    assert.ok(beer.get('warnLevel', 'below warn threshold is cause for concern'));
  });
});

test('middle level', function(assert) {
  Ember.run(() => {
    const aPour = this.store().createRecord('pour', {
      ounces: 5
    });

    let beer = this.subject({
      ounces: 100,
      pours: [aPour]
    });

    assert.notOk(beer.get('middleLevel'), 'above middle = ok');

    aPour.set('ounces', 50);
    assert.ok(beer.get('middleLevel'), 'at middle threshold evaluates true');
    assert.notOk(beer.get('warnLevel'), 'at middle threshold != warning');

    aPour.set('ounces', 60);
    assert.ok(beer.get('middleLevel'), 'below middle but above warn evaluates true');
    assert.notOk(beer.get('warnLevel'), 'below middle but above warn does not indicate warning');

    aPour.set('ounces', 85);
    assert.notOk(beer.get('middleLevel'), 'at warn threshold is not the middle');
    assert.ok(beer.get('warnLevel'), 'at warn threshold indicates warning');
  });
});
