import { test } from 'qunit';
import moduleForAcceptance from 'danger-brewing/tests/helpers/module-for-acceptance';
import startFirebaseApp from '../helpers/start-firebase-app';
import destroyFirebaseApp from '../helpers/destroy-firebase-app';
import page from 'danger-brewing/tests/pages/index';
import { stubValidSession } from 'danger-brewing/tests/helpers/torii';

let application;

moduleForAcceptance('Acceptance | index', {
  beforeEach: function() {
    application = startFirebaseApp();
  },
  afterEach: function() {
    destroyFirebaseApp(application);
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

test('empty app - authenticated', function(assert) {
  stubValidSession(application, { });
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), page.url, 'on the correct page');
    assert.ok(page.toolbar.isVisible, 'see the toolbar');
    assert.ok(page.toolbar.menu.isVisible, 'see menu');
    assert.ok(page.onTap.isEmpty, 'nothing on tap');
    assert.ok(page.onTap.addBeer.isVisible, 'cannot add beer');
  });
});
