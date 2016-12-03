import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
const {
  computed
} = Ember;

export default Model.extend({
  name: attr('string'),
  type: attr('string', { defaultValue: 'temperature' }),
  temperature: attr('number'),
  humidity: attr('number'),
  hub: belongsTo('hub'),

  // convert hub temperature to degrees Fahrenheit
  temperatureFahrenheit: computed('temperature', function() {
    const celsius = this.get('temperature');
    return (celsius * 1.8) + 32;
  })
});
