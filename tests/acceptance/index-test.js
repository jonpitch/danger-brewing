import { test } from 'qunit';
import moduleForAcceptance from 'danger-brewing/tests/helpers/module-for-acceptance';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import replaceAppRef from '../helpers/replace-app-ref';
import replaceFirebaseAppService from '../helpers/replace-firebase-app-service';
import stubFirebase from '../helpers/stub-firebase';
import unstubFirebase from '../helpers/unstub-firebase';
import { emptyApplication } from '../helpers/create-test-ref';
import page from 'danger-brewing/tests/pages/index';

let application;

moduleForAcceptance('Acceptance | index', {
  beforeEach: function() {
    stubFirebase();
    application = startApp();

    // TODO if there's already a session, replaceFirebaseAppService
    // isn't mocking it correctly.

    replaceFirebaseAppService(application, { });
    replaceAppRef(application, emptyApplication());
  },
  afterEach: function() {
    unstubFirebase();
    destroyApp(application);
  }
});

test('empty app - not authenticated', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), page.url, 'on the correct page');
    assert.ok(page.toolbar.isVisible, 'see the toolbar');
    assert.ok(page.toolbar.menu.isVisible, 'see menu');
    assert.ok(page.onTap.isEmpty, 'nothing on tap');
    assert.notOk(page.onTap.addBeer.isVisible, 'cannot add beer');
  });
});
