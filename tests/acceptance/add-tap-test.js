import { test } from 'qunit';
import moduleForAcceptance from 'danger-brewing/tests/helpers/module-for-acceptance';
import startFirebaseApp from '../helpers/start-firebase-app';
import destroyFirebaseApp from '../helpers/destroy-firebase-app';
import page from 'danger-brewing/tests/pages/add-tap';
import statusPage from 'danger-brewing/tests/pages/status';
import { stubValidSession } from 'danger-brewing/tests/helpers/torii';
import { stubHubOnlyFixture } from 'danger-brewing/tests/helpers/fixtures';

let application;

moduleForAcceptance('Acceptance | add tap', {
  beforeEach() { },
  afterEach() {
    destroyFirebaseApp(application);
  }
});

const setupData = () => {
  application = startFirebaseApp(stubHubOnlyFixture());
};

test('authenticated - adding a new tap', function(assert) {
  setupData();
  stubValidSession(application);
  andThen(function() {
    visit(page.url);
    andThen(function() {
      const tapName = 'tap-1';
      assert.equal(currentURL(), page.url, 'on the correct page');
      assert.ok(page.form.isVisible, 'see add tap form');
      page.form.name.input.fillIn(tapName);
      page.form.nitro.click();
      page.form.actions.add.click();
      andThen(function() {
        assert.equal(currentURL(), statusPage.url, 'redirect to hub status');
        assert.equal(statusPage.hub.taps().count, 1, 'see newly added tap');
        assert.equal(statusPage.hub.taps(0).name, tapName, 'tap name is correct');
      });
    });
  });
});

test('authenticated - cancel adding new tap', function(assert) {
  setupData();
  stubValidSession(application);
  andThen(function() {
    visit(page.url);
    andThen(function() {
      assert.equal(currentURL(), page.url, 'on the correct page');
      assert.ok(page.form.isVisible, 'see add tap form');
      page.form.name.input.fillIn('tap-1');
      page.form.nitro.click();
      page.form.actions.cancel.click();
      andThen(function() {
        assert.equal(currentURL(), statusPage.url, 'redirect to hub status');
        assert.equal(statusPage.hub.taps().count, 0, 'no taps added');
      });
    });
  });
});
