
// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
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

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});