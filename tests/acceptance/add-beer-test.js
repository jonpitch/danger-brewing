import { test } from 'qunit';
import moduleForAcceptance from 'danger-brewing/tests/helpers/module-for-acceptance';
import startFirebaseApp from '../helpers/start-firebase-app';
import destroyFirebaseApp from '../helpers/destroy-firebase-app';
import page from 'danger-brewing/tests/pages/add-beer';
import indexPage from 'danger-brewing/tests/pages/index';
import { stubValidSession } from 'danger-brewing/tests/helpers/torii';
import { stubHubAndTapsFixture } from 'danger-brewing/tests/helpers/fixtures';

let application;

moduleForAcceptance('Acceptance | add beer', {
  beforeEach: function() { },
  afterEach: function() {
    destroyFirebaseApp(application);
  }
});

const setupData = (fixture = { }) => {
  application = startFirebaseApp(fixture);
};

test('admin can add beer from index page', function(assert) {
  setupData(stubHubAndTapsFixture());
  stubValidSession(application);
  andThen(function() {
    visit(indexPage.url);
    andThen(function() {
      assert.equal(currentURL(), indexPage.url, 'on the right page');
      assert.notOk(page.noHub, 'do not see no hub message');
      assert.ok(indexPage.onTap.addBeer.isVisible, 'admin can add beer');
      indexPage.onTap.addBeer.click();
      andThen(function() {
        assert.equal(currentURL(), page.url, 'redirected to add beer');
        assert.ok(page.form.isVisible, 'see add beer form');
      });
    });
  });
});

// NOTE: commenting out for now
// https://github.com/san650/ember-cli-page-object/issues/219
// wormhole never regains focus after element clicked outside of testContainer

// test('adding beer', function(assert) {
//   const fixture = stubHubAndTapsFixture();
//   setupData(fixture);
//   stubValidSession(application);
//   andThen(function() {
//     visit(page.url);
//     andThen(function() {
//       assert.equal(currentURL(), page.url, 'redirected to add beer');
//       assert.notOk(page.noHub, 'do not see no hub message');
//       assert.ok(page.form.isVisible, 'see add beer form');
//       const name = 'Tart of Darkness';
//       const style = 'Sour';
//       const taps = Object.keys(fixture.taps);
//       const tapKey = taps.get(0);
//       const tap = fixture.taps[tapKey].name;
//       const abv = 7;
//       const ounces = 128;
//       page.form.name.input.fillIn(name);
//       page.form.style.input.fillIn(style);
//       page.form.tap.open();
//       andThen(function() {
//         page.form.tap.select.choose(tap);
//         page.form.abv.input.fillIn(abv);
//         page.form.ounces.input.fillIn(ounces);
//         page.form.actions.add.click();
//         andThen(function() {
//           assert.equal(currentURL(), page.url, 'redirect to index');
//           assert.equal(indexPage.onTap.beers().count, 1, 'see newly added beer');
//           assert.equal(indexPage.onTap.beers(0).name, name, 'correct beer name');
//           assert.equal(indexPage.onTap.beers(0).style, style, 'correct beer style');
//         });
//       });
//     });
//   });
// });

test('cancel adding beer', function(assert) {
  const fixture = stubHubAndTapsFixture();
  setupData(fixture);
  stubValidSession(application);
  andThen(function() {
    visit(page.url);
    andThen(function() {
      assert.equal(currentURL(), page.url, 'redirected to add beer');
      assert.notOk(page.noHub, 'do not see no hub message');
      assert.ok(page.form.isVisible, 'see add beer form');
      page.form.name.input.fillIn('Tart of Darkness');
      page.form.style.input.fillIn('Sour');
      page.form.abv.input.fillIn(7);
      page.form.ounces.input.fillIn(128);
      page.form.actions.cancel.click();
      andThen(function() {
        assert.equal(currentURL(), indexPage.url, 'redirect to index');
        assert.equal(indexPage.onTap.beers().count, 0, 'no beer added');
      });
    });
  });
});

test('add beer with no hub', function(assert) {
  setupData();
  stubValidSession(application);
  andThen(function() {
    visit(page.url);
    andThen(function() {
      assert.ok(page.noHub, 'no hub found, setup first');
      assert.notOk(page.form.isVisible, 'do not see add beer form');
    });
  });
});
