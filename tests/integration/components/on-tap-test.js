import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('on-tap', 'Integration | Component | on tap', {
  integration: true
});

test('it renders - empty - non-authenticated', function(assert) {
  this.render(hbs`
    {{on-tap beers=[]}}
  `);

  const $empty = this.$('p[data-test="empty"]');
  const $add = this.$('div[data-test="add-beer"]');
  assert.equal($empty.length, 1, 'see empty text');
  assert.notOk($add.is(':visible'), 'cannot add beer');
});

// TODO empty - authenticated
// TODO with data
