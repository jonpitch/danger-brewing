import { test } from 'qunit';
import moduleForAcceptance from 'danger-brewing/tests/helpers/module-for-acceptance';
import startFirebaseApp from '../helpers/start-firebase-app';
import destroyFirebaseApp from '../helpers/destroy-firebase-app';
import page from 'danger-brewing/tests/pages/add-sensor';
import statusPage from 'danger-brewing/tests/pages/status';
import { stubValidSession } from 'danger-brewing/tests/helpers/torii';
import { stubHubOnlyFixture } from 'danger-brewing/tests/helpers/fixtures';

let application;

moduleForAcceptance('Acceptance | add sensor', {
  beforeEach() { },
  afterEach() {
    destroyFirebaseApp(application);
  }
});

const setupData = () => {
  application = startFirebaseApp(stubHubOnlyFixture());
};

test('authenticated - adding a new sensor', function(assert) {
  setupData();
  stubValidSession(application);
  andThen(function() {
    visit(page.url);
    andThen(function() {
      const sensorName = 'sensor-1';
      assert.equal(currentURL(), page.url, 'on the correct page');
      assert.ok(page.form.isVisible, 'see add sensor form');
      page.form.name.input.fillIn(sensorName);
      page.form.actions.add.click();
      andThen(function() {
        assert.equal(currentURL(), statusPage.url, 'redirect to hub status');
        assert.equal(statusPage.hub.sensors().count, 1, 'see newly added sensor');
        assert.equal(statusPage.hub.sensors(0).name, sensorName, 'sensor name is correct');
      });
    });
  });
});

test('authenticated - cancel adding new sensor', function(assert) {
  setupData();
  stubValidSession(application);
  andThen(function() {
    visit(page.url);
    andThen(function() {
      assert.equal(currentURL(), page.url, 'on the correct page');
      assert.ok(page.form.isVisible, 'see add sensor form');
      page.form.name.input.fillIn('sensor-1');
      page.form.actions.cancel.click();
      andThen(function() {
        assert.equal(currentURL(), statusPage.url, 'redirect to hub status');
        assert.equal(statusPage.hub.sensors().count, 0, 'no sensors added');
      });
    });
  });
});
