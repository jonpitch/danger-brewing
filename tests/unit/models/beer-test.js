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
