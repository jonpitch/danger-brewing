import { test } from 'qunit';
import moduleForAcceptance from 'danger-brewing/tests/helpers/module-for-acceptance';
import startFirebaseApp from '../helpers/start-firebase-app';
import destroyFirebaseApp from '../helpers/destroy-firebase-app';
import page from 'danger-brewing/tests/pages/about';

let application;

moduleForAcceptance('Acceptance | about', {
  beforeEach: function() { },
  afterEach: function() {
    destroyFirebaseApp(application);
  }
});

const setupData = (fixture = { }) => {
  application = startFirebaseApp(fixture);
};

test('visiting /about', function(assert) {
  setupData();
  andThen(function() {
    page.visit();
    andThen(function() {
      assert.equal(currentURL(), page.url, 'on the right page');
      assert.ok(page.read.header.isVisible, 'see about header');
      assert.ok(page.contribute.header.isVisible, 'see contribute header');
      assert.equal(
        page.contribute.link.url,
        'https://github.com/jonpitch/danger-brewing',
        'correct github link'
      );
    });
  });
});
