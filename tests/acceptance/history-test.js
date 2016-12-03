import { test } from 'qunit';
import moduleForAcceptance from 'danger-brewing/tests/helpers/module-for-acceptance';
import startFirebaseApp from '../helpers/start-firebase-app';
import destroyFirebaseApp from '../helpers/destroy-firebase-app';
import page from 'danger-brewing/tests/pages/history';

let application;

moduleForAcceptance('Acceptance | history', {
  beforeEach() { },
  afterEach() {
    destroyFirebaseApp(application);
  }
});

const setupData = (fixture = { }) => {
  application = startFirebaseApp(fixture);
};

// this feature is not yet implemented
test('placeholder', function(assert) {
  setupData();
  andThen(function() {
    visit(page.url);
    andThen(function() {
      assert.equal(currentURL(), page.url, 'on the right page');
    });
  });
});
