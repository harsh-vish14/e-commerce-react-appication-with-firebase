import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyD-LREqvlDJDWXs1sTYUyFxY6_iT4NJOIY",
  authDomain: "ecommerce-ba49d.firebaseapp.com",
  databaseURL: "https://ecommerce-ba49d-default-rtdb.firebaseio.com",
  projectId: "ecommerce-ba49d",
  storageBucket: "ecommerce-ba49d.appspot.com",
  messagingSenderId: "2753871991",
  appId: "1:2753871991:web:02018598c5771ce5d54672"
};

const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
const auth = firebase.auth()
const storage = firebaseApp.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, provider, auth };