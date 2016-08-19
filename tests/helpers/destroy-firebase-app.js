import unstubFirebase from './unstub-firebase';
import destroyApp from './destroy-app';

export default function destroyFirebaseApp(application) {
  unstubFirebase();
  destroyApp(application);
}
