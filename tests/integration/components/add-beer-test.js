import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('add-beer', 'Integration | Component | add beer', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{add-beer}}
  `);

  // TODO elaborate
  const $text = this.$('input[type="text"]');
  const $numbers = this.$('input[type="number"]');

  assert.equal($text.length, 2, 'two text inputs');
  assert.equal($numbers.length, 2, 'three number inputs');
});

// TODO form validation
