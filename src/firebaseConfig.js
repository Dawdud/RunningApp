import firebase from 'firebase'
import 'firebase/firestore'

var config = {
    apiKey: "AIzaSyADoJhTDAdYoSU3GoUanBkx1GD4B0UQeds",
    authDomain: "jogging-e3b56.firebaseapp.com",
    databaseURL: "https://jogging-e3b56.firebaseio.com",
    projectId: "jogging-e3b56",
    storageBucket: "jogging-e3b56.appspot.com",
    messagingSenderId: "664250265620"
  };

firebase.initializeApp(config);

const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser





const usersCollection = db.collection('users')
const trialsCollection = db.collection('trials')
const goalsCollection = db.collection('goals')


export {
    db,
    auth,
    currentUser,
    usersCollection,
    trialsCollection,
    goalsCollection,

}