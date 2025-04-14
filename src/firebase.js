
import { initializeApp } from 'firebase/app'
import {
  getDatabase,
  ref,
  set,
  get,
  child
} from 'firebase/database'

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from 'firebase/auth'

// config info for firebase project
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

const greetings_user = document.querySelector('#greetings-user')

// When the auth state changes, do this.
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('user signed in as', user.displayName)
    greetings_user.innerHTML = `Hello ${user.displayName}`
  } else {
    console.log("No user is signed in")
  }
})

// First i need to create an account
// - Need to log in and out.
// - Must add the account to a database.
// Then i need to track a user's high scores and render them.

//grab login button and sign user in with google account
const googleLogin = document.querySelector('#login-btn')
googleLogin.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then(result => {
      const db = getDatabase()
      const dbRef = ref(db)
      const user = result.user

      get(child(dbRef, `users/${user.uid}`))
        .then(snapshot => {
          if (!snapshot.exists()) {
            set(ref(db, `users/${user.uid}`), {
              uid: user.uid,
              name: user.displayName,
              highscore: 0
            })
          } else {
            console.log('i exist!')
          }
        })
    })
    .catch(err => {
      console.error(err)
    })
})


// Grab signout button element, then sign the user out when clicked.
const googleLogout = document.querySelector('#logout-btn')
googleLogout.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      greetings_user.innerHTML = ""
      console.log('signed out')
    }).catch(err => {
      console.error(err)
    })
})