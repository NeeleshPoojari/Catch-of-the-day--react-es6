import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDV3E3-eMhE6jtbQgf8cARz4Q1nK6Y6JNo",
  authDomain: "catch-of-the-day-neeleshkp.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-neeleshkp.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
