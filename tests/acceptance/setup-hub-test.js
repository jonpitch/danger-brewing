import { test } from 'qunit';
import moduleForAcceptance from 'danger-brewing/tests/helpers/module-for-acceptance';
import startFirebaseApp from '../helpers/start-firebase-app';
import destroyFirebaseApp from '../helpers/destroy-firebase-app';
import page from 'danger-brewing/tests/pages/status';
import { stubValidSession } from 'danger-brewing/tests/helpers/torii';
import {
  stubHubOnlyFixture,
  stubApplicationFixture
} from 'danger-brewing/tests/helpers/fixtures';

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
      assert.notOk(page.hub.addTap.isVisible, 'cannot add tap until hub setup');
      assert.notOk(page.hub.addSensor.isVisible, 'cannot add sensor until hub setup');
      page.hub.addHub.click();
      andThen(function() {
        assert.notOk(page.hub.notSetup, 'see hub setup');
        assert.notOk(page.hub.addHub.isVisible, 'can no longer setup hub');
        assert.ok(page.hub.status.isVisible, 'see hub status');
        assert.ok(page.hub.addTap.isVisible, 'can now add taps');
        assert.ok(page.hub.addSensor.isVisible, 'can now add sensors');
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
      assert.notOk(page.hub.addTap.isVisible, 'cannot add tap');
      assert.notOk(page.hub.addSensor.isVisible, 'cannot add sensor');
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
      assert.ok(page.hub.addTap.isVisible, 'can add taps');
      assert.ok(page.hub.addSensor.isVisible, 'can add sensors');
      page.hub.addTap.click();
      andThen(function() {
        assert.equal(currentURL(), '/tap/add', 'redirected to add tap');
      });
    });
  });
});

test('delete tap - not authenticated', function(assert) {
  setupData(stubApplicationFixture());
  andThen(function() {
    visit(page.url);
    andThen(function() {
      assert.equal(currentURL(), page.url, 'on the right page');
      assert.equal(page.hub.taps().count, 3, 'see taps');
      assert.notOk(page.hub.taps(0).hasDelete, 'cannot delete tap 1');
      assert.notOk(page.hub.taps(1).hasDelete, 'cannot delete tap 2');
      assert.notOk(page.hub.taps(2).hasDelete, 'cannot delete tap 3');
    });
  });
});

test('delete sensor - not authenticated', function(assert) {
  setupData(stubApplicationFixture());
  andThen(function() {
    visit(page.url);
    andThen(function() {
      assert.equal(currentURL(), page.url, 'on the right page');
      assert.equal(page.hub.sensors().count, 2, 'see sensors');
      assert.notOk(page.hub.sensors(0).hasDelete, 'cannot delete tap 1');
      assert.notOk(page.hub.sensors(1).hasDelete, 'cannot delete tap 2');
    });
  });
});

// TODO bug in ember-paper prevents this from testing properly
// test('delete tap - authenticated', function(assert) {
//   setupData(stubApplicationFixture());
//   stubValidSession(application);
//   andThen(function() {
//     visit(page.url);
//     andThen(function() {
//       const taps = 3;
//       assert.equal(currentURL(), page.url, 'on the right page');
//       assert.equal(page.hub.taps().count, taps, 'see taps');
//       page.hub.taps(0).delete();
//       andThen(function() {
//         assert.equal(page.hub.taps().count, taps - 1, 'see one less tap');
//       });
//     });
//   });
// });
//
// test('delete sensor - authenticated', function(assert) {
//   setupData(stubApplicationFixture());
//   stubValidSession(application);
//   andThen(function() {
//     visit(page.url);
//     andThen(function() {
//       const sensors = 2;
//       assert.equal(currentURL(), page.url, 'on the right page');
//       assert.equal(page.hub.sensors().count, sensors, 'see sensors');
//       page.hub.sensors(0).delete();
//       andThen(function() {
//         assert.equal(page.hub.sensors().count, sensors - 1, 'see one less sensor');
//       });
//     });
//   });
// });
