import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  style: attr('string'),
  abv: attr('number'),
  active: attr('boolean', { defaultValue: true }),
  tapped: attr('number'),
  kicked: attr('number'),
  ounces: attr('number'),
  tap: belongsTo('tap')
});
