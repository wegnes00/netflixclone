import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCGWK4f4e37-FKudD98NG39QsuXgjXbQhA",
  authDomain: "so-clones.firebaseapp.com",
  databaseURL: "https://so-clones.firebaseio.com",
  projectId: "so-clones",
  storageBucket: "so-clones.appspot.com",
  messagingSenderId: "898209943614",
  appId: "1:898209943614:web:5c1fe925d26b1dde99816f",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
