import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  style: attr('string'),
  abv: attr('number'),
  tapped: attr('date'),
  kicked: attr('date'),
  nitro: attr('boolean'),
  ounces: attr('number')

});
