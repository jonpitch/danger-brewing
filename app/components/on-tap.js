import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'on-tap',
  session: Ember.inject.service(),

  // expected model
  beers: Ember.A()
});
