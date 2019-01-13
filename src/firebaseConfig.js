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


const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)


const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}