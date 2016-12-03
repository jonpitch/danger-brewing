import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
const {
  computed
} = Ember;

export default Model.extend({
  status: attr('string'),
  taps: hasMany('tap', { async: true }),
  sensors: hasMany('sensor', { async: true }),

  // is the hub online
  isOnline: computed('status', function() {
    return this.get('status') === 'online';
  })
});
