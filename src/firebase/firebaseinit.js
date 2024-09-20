import firebase from "firebase/app";
import "firebase/messaging";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZtnkOVwfeN-I1v8PfdUW3wDq4TU8UlBM",
    authDomain: "fpsjobs-1516428149169.firebaseapp.com",
    databaseURL: "https://fpsjobs-1516428149169.firebaseio.com",
    projectId: "fpsjobs-1516428149169",
    storageBucket: "fpsjobs-1516428149169.appspot.com",
    messagingSenderId: "286983202019",
    appId: "1:286983202019:web:fb2f1652838f6fe72351d6",
    measurementId: "G-N7EX2NZMDJ"
};

firebase.initializeApp(firebaseConfig);

let messaging = null;
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
  messaging.usePublicVapidKey(
    "BLMIhM8a6jNRb0vkWX255iu1_SE9r0mhQyalT5entZOZ8rPRfXPpkxztbVIy7jyLYzB8IJAw0hkhdGwc8ryGEIw"
  );
}


const REACT_APP_VAPID_KEY =
  "BLMIhM8a6jNRb0vkWX255iu1_SE9r0mhQyalT5entZOZ8rPRfXPpkxztbVIy7jyLYzB8IJAw0hkhdGwc8ryGEIw";
// console.log(REACT_APP_VAPID_KEY);
// const REACT_APP_VAPID_KEY = process.env;
const publicKey = REACT_APP_VAPID_KEY;

export const getToken = async (setTokenFound) => {
  let currentToken = "";

  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }

  localStorage.setItem("Fcm", JSON.stringify(currentToken));

  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });