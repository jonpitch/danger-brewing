import { test } from 'qunit';
import moduleForAcceptance from 'danger-brewing/tests/helpers/module-for-acceptance';
import startFirebaseApp from '../helpers/start-firebase-app';
import destroyFirebaseApp from '../helpers/destroy-firebase-app';
import page from 'danger-brewing/tests/pages/index';
import { stubValidSession } from 'danger-brewing/tests/helpers/torii';
import { stubApplicationFixture } from 'danger-brewing/tests/helpers/fixtures';

let application;

moduleForAcceptance('Acceptance | index', {
  beforeEach: function() { },
  afterEach: function() {
    destroyFirebaseApp(application);
  }
});

// setup application with data
const setupData = (data = { }) => {
  application = startFirebaseApp(data);
};

test('empty app - not authenticated', function(assert) {
  setupData();
  andThen(function() {
    visit(page.url);
    andThen(function() {
      assert.equal(currentURL(), page.url, 'on the correct page');
      assert.ok(page.toolbar.isVisible, 'see the toolbar');
      assert.ok(page.toolbar.menu.isVisible, 'see menu');
      assert.ok(page.onTap.isEmpty, 'nothing on tap');
      assert.notOk(page.onTap.addBeer.isVisible, 'cannot add beer');
    });
  });
});

test('empty app - authenticated', function(assert) {
  setupData();
  andThen(function() {
    stubValidSession(application);
    visit(page.url);
    andThen(function() {
      assert.equal(currentURL(), page.url, 'on the correct page');
      assert.ok(page.toolbar.isVisible, 'see the toolbar');
      assert.ok(page.toolbar.menu.isVisible, 'see menu');
      assert.ok(page.onTap.isEmpty, 'nothing on tap');
      assert.ok(page.onTap.addBeer.isVisible, 'cannot add beer');
    });
  });
});

test('up and running app - not authenticated', function(assert) {
  const fixture = stubApplicationFixture();
  setupData(fixture);
  andThen(function() {
    visit(page.url);
    andThen(function() {
      assert.equal(currentURL(), page.url, 'on the correct page');
      assert.notOk(page.onTap.addBeer.isVisible, 'cannot add beer');
      assert.equal(
        page.onTap.beers().count,
        Object.keys(fixture.beers).length,
        'see some beers on tap'
      );
      assert.notOk(page.onTap.beers(0).canDelete, 'cannot delete beers');
    });
  });
});

test('up and running app - authenticated - delete beer', function(assert) {
  const fixture = stubApplicationFixture();
  setupData(fixture);
  stubValidSession(application);
  andThen(function() {
    visit(page.url);
    andThen(function() {
      const beers = Object.keys(fixture.beers).length;
      assert.equal(currentURL(), page.url, 'on the correct page');
      assert.ok(page.onTap.addBeer.isVisible, 'can add beer');
      assert.equal(
        page.onTap.beers().count,
        beers,
        'see some beers on tap'
      );
      assert.ok(page.onTap.beers(0).canDelete, 'can delete beer');
      page.onTap.beers(0).delete();
      andThen(function() {
        assert.equal(page.onTap.beers().count, beers - 1, 'see one less beer');
      });
    });
  });
});

test('empty app - not authenticated routes', function(assert) {
  setupData();
  andThen(function() {
    visit(page.url);
    andThen(function() {
      assert.equal(currentURL(), page.url, 'can see index page');
    });

    visit('/login');
    andThen(function() {
      assert.equal(currentURL(), '/login', 'can see login page');
    });

    visit('/status');
    andThen(function() {
      assert.equal(currentURL(), '/status', 'can see status page');
    });

    visit('/beer/add');
    andThen(function() {
      assert.equal(currentURL(), page.url, 'cannot add beer');
    });

    visit('/tap/add');
    andThen(function() {
      assert.equal(currentURL(), page.url, 'cannot add tap');
    });
  });
});
