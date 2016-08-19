import stubFirebase from './stub-firebase';
import startApp from './start-app';
import replaceAppRef from './replace-app-ref';
import createOfflineRef from './create-offline-ref';

export default function startFirebaseApp(fixtures = { }) {
  stubFirebase();
  let application = startApp();

  // override default torii-adapter
  application.register('service:firebaseMock', { }, {
    instantiate: false,
    singleton: true
  });
  application.inject('torii-provider:application', 'firebaseApp', 'service:firebaseMock');
  application.inject('torii-adapter:application', 'firebaseApp', 'service:firebaseMock');

  // setup any fixture data and return instance
  replaceAppRef(application, createOfflineRef(fixtures));
  return application;
}
