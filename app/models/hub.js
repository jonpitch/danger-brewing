import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  status: attr('string'),
  upperTemp: attr('number'),
  lowerTemp: attr('number'),
  humidity: attr('number'),
  lastActivity: attr('date'),
  taps: hasMany('tap', { async: true }),

  // is the hub online
  isOnline: Ember.computed('status', function() {
    return this.get('status') === 'online';
  })
});