import firebase from 'firebase/app'
import 'firebase/storage'

  const config = {
    apiKey: process.env.REACT_APP_FIREBASE_apiKey,
    authDomain: process.env.REACT_APP_FIREBASE_authDomain,
    databaseURL: process.env.REACT_APP_FIREBASE_databaseURL,
    projectId: process.env.REACT_APP_FIREBASE_projectId,
    storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
    messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
    appId: process.env.REACT_APP_FIREBASE_appId,
    //measurementId: process.env.FIREBASE_measurementId
  }
  
  firebase.initializeApp(config)
  
  const storage=firebase.storage()

  export {
    storage, firebase as default
  }