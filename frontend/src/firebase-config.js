import firebase from 'firebase/app'
import 'firebase/storage'

  const config = {
    apiKey: process.env.FIREBASE_apiKey,
    authDomain: process.env.FIREBASE_authDomain,
    databaseURL: process.env.FIREBASE_databaseURL,
    projectId: process.env.FIREBASE_projectId,
    storageBucket: process.env.FIREBASE_storageBucket,
    messagingSenderId: process.env.FIREBASE_messagingSenderId,
    appId: process.env.FIREBASE_appId,
    measurementId: process.env.FIREBASE_measurementId
  };
  
  firebase.initializeApp(config);
  
  const storage=firebase.storage()

  export {
    storage, firebase as default
  }