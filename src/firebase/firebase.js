import firebase from 'firebase/app'
import 'firebase/auth'

export const firebaseConfig = {
  apiKey: "AIzaSyBZtnkOVwfeN-I1v8PfdUW3wDq4TU8UlBM",
  authDomain: "fpsjobs-1516428149169.firebaseapp.com",
  databaseURL: "https://fpsjobs-1516428149169.firebaseio.com",
  projectId: "fpsjobs-1516428149169",
  storageBucket: "fpsjobs-1516428149169.appspot.com",
  messagingSenderId: "286983202019",
  appId: "1:286983202019:web:fb2f1652838f6fe72351d6",
  measurementId: "G-N7EX2NZMDJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase