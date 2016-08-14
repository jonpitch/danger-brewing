import unstubFirebase from '../helpers/unstub-firebase';
import destroyApp from '../helpers/destroy-app';

export default function destroyFirebaseApp(application) {
  unstubFirebase();
  destroyApp(application);
}
