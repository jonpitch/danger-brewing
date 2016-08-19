import { test } from 'qunit';
import moduleForAcceptance from 'danger-brewing/tests/helpers/module-for-acceptance';
import startFirebaseApp from '../helpers/start-firebase-app';
import destroyFirebaseApp from '../helpers/destroy-firebase-app';
import page from 'danger-brewing/tests/pages/status';
import { stubValidSession } from 'danger-brewing/tests/helpers/torii';
import { stubHubOnlyFixture } from 'danger-brewing/tests/helpers/fixtures';

let application;

moduleForAcceptance('Acceptance | setup hub', {
  beforeEach: function() { },
  afterEach: function() {
    destroyFirebaseApp(application);
  }
});

const setupData = (fixture = { }) => {
  application = startFirebaseApp(fixture);
};

test('visiting /status - nothing setup - not authenticated', function(assert) {
  setupData();
  andThen(function() {
    visit(page.url);
    andThen(function() {
      assert.equal(currentURL(), page.url, 'on the right page');
      assert.ok(page.hub.notSetup, 'no hub setup');
      assert.notOk(page.hub.addHub.isVisible, 'non-authenticated user cannot add hub');
      assert.notOk(page.hub.addTap.isVisible, 'non-authenticated user cannot add tap');
      assert.equal(page.hub.taps().count, 0, 'no taps available');
    });
  });
});

test('setup hub', function(assert) {
  setupData();
  stubValidSession(application);
  andThen(function() {
    visit(page.url);
    andThen(function() {
      assert.equal(currentURL(), page.url, 'on the right page');
      assert.ok(page.hub.notSetup, 'no hub setup');
      assert.ok(page.hub.addHub.isVisible, 'can add a hub');
      assert.notOk(page.hub.status.isVisible, 'no hub status');
      assert.notOk(page.hub.weather.isVisible, 'no hub weather');
      assert.notOk(page.hub.addTap.isVisible, 'cannot add tap until hub setup');
      page.hub.addHub.click();
      andThen(function() {
        assert.notOk(page.hub.notSetup, 'see hub setup');
        assert.notOk(page.hub.addHub.isVisible, 'can no longer setup hub');
        assert.ok(page.hub.status.isVisible, 'see hub status');
        assert.ok(page.hub.weather.isVisible, 'see hub weather');
        assert.ok(page.hub.addTap.isVisible, 'can now add taps');
      });
    });
  });
});

test('hub already setup - not authenticated', function(assert) {
  setupData(stubHubOnlyFixture());
  andThen(function() {
    visit(page.url);
    andThen(function() {
      assert.equal(currentURL(), page.url, 'on the right page');
      assert.notOk(page.hub.notSetup, 'hub setup');
      assert.notOk(page.hub.addHub.isVisible, 'cannot add a hub');
      assert.ok(page.hub.status.isVisible, 'hub status visible');
      assert.ok(page.hub.weather.isVisible, 'hub weather visible');
      assert.notOk(page.hub.addTap.isVisible, 'cannot add tap');
    });
  });
});

test('hub already setup - authenticated', function(assert) {
  setupData(stubHubOnlyFixture());
  stubValidSession(application);
  andThen(function() {
    visit(page.url);
    andThen(function() {
      assert.equal(currentURL(), page.url, 'on the right page');
      assert.notOk(page.hub.notSetup, 'see hub setup');
      assert.notOk(page.hub.addHub.isVisible, 'can not setup hub');
      assert.ok(page.hub.status.isVisible, 'see hub status');
      assert.ok(page.hub.weather.isVisible, 'see hub weather');
      assert.ok(page.hub.addTap.isVisible, 'can add taps');
      page.hub.addTap.click();
      andThen(function() {
        assert.equal(currentURL(), '/tap/add', 'redirected to add tap');
      });
    });
  });
});
