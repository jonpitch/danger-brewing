import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';
import './ember-i18n/test-helpers';
const {
  run,
  assign
} = Ember;

export default function startApp(attrs) {
  let application;

  // use defaults, but you can override
  let attributes = assign({ }, config.APP, attrs);

  run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
