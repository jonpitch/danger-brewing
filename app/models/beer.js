import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import config from 'danger-brewing/config/environment';
const {
  computed,
  isEmpty
} = Ember;

export default Model.extend({
  name: attr('string'),
  style: attr('string'),
  abv: attr('number'),
  active: attr('boolean', { defaultValue: true }),
  tapped: attr('number'),
  kicked: attr('number'),
  ounces: attr('number'),
  tap: belongsTo('tap'),
  pours: hasMany('pour', { async: true }),

  // ounces left
  ouncesLeft: computed('ounces', 'pours.@each.ounces', function() {
    const ounces = this.get('ounces');
    const pours = this.get('pours');

    if (isEmpty(pours) || pours.length === 0) {
      return ounces;
    }

    let poured = 0;
    pours.forEach((p) => {
      poured += p.get('ounces');
    });
    return ounces - poured;
  }),

  // what percent of the total is left
  percentLeft: computed('ouncesLeft', 'pours.@each.ounces', function() {
    const ounces = this.get('ounces');
    const left = this.get('ouncesLeft');

    return parseInt((left / ounces) * 100, 10);
  }),

  // warn when the keg is close to kicked
  warnLevel: computed('percentLeft', 'pours.@each.ounces', function() {
    const level = this.get('percentLeft');
    const { APP: { beer: { warn } } } = config;

    return level <= warn;
  }),

  // keg is somewhere in the middle
  middleLevel: computed('percentLeft', 'pours.@each.ounces', function() {
    const level = this.get('percentLeft');
    const { APP: { beer: { middle, warn } } } = config;

    return level <= middle && level > warn;
  }),

  // the last poured date
  sortedPours: computed.sort('pours', 'pourSortDescending'),
  pourSortDescending: ['created:desc'],

  lastPoured: computed('sortedPours', function() {
    const pours = this.get('sortedPours');
    if (isEmpty(pours) || pours.length === 0) {
      return null;
    }

    return pours.get('firstObject.created');
  })
});
