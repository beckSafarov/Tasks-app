import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: 'AIzaSyAFG2gMLimvFBUm9Fw3kzxUQiu-zGksEps',
  authDomain: 'tasks-app-70002.firebaseapp.com',
  projectId: 'tasks-app-70002',
  storageBucket: 'tasks-app-70002.appspot.com',
  messagingSenderId: '1039362062681',
  appId: '1:1039362062681:web:77ec8540145853830f3448',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { app, db }
