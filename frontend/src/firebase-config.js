import firebase from 'firebase/app'
import 'firebase/storage'

  const config = {
    apiKey: "AIzaSyD4HPMPBtPWnyo1L5EKMaok6WiN04whQ7s",
    authDomain: "ocb-store-management.firebaseapp.com",
    databaseURL: "https://ocb-store-management.firebaseio.com",
    projectId: "ocb-store-management",
    storageBucket: "ocb-store-management.appspot.com",
    messagingSenderId: "195114045052",
    appId: "1:195114045052:web:73572d83ce44e93e23c3f9",
    measurementId: "G-CNYE2NM3MC"
  };
  
  firebase.initializeApp(config);
  
  const storage=firebase.storage()

  export {
    storage, firebase as default
  }