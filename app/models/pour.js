import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  created: attr('date'),
  ounces: attr('number'),
  beer: belongsTo('beer', { async: true })
});
