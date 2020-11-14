import firebase from "firebase";

export const firebaseConfig = {
  apiKey: "AIzaSyAVmvv78suCXU_qFKpIau45ff_Fl1nj2MY",
  authDomain: "vladlenkaveevbrand.firebaseapp.com",
  databaseURL: "https://vladlenkaveevbrand.firebaseio.com",
  projectId: "vladlenkaveevbrand",
  storageBucket: "vladlenkaveevbrand.appspot.com",
  messagingSenderId: "78150453632",
  appId: "1:78150453632:web:6c2337e508f794f8189965",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
