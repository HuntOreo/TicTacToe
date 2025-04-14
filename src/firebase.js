// user currently logged in.
import { currentUser } from './JS/state'
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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const greetings_user = document.querySelector('#greetings-user')
const highscore_user = document.querySelector('#highscore')

// When Auth State (login and logout) changes, 
// look for the users data in the database (found using uid)
// and and keep track of that data.
onAuthStateChanged(auth, (user) => {
  if (user) {
    const db = getDatabase()
    const dbRef = ref(db)
    get(child(dbRef, `users/${user.uid}`))
      .then(snapshot => {
        let tempProfile = { ...snapshot.val() }
        console.log('user signed in as', tempProfile.name)
        greetings_user.innerHTML = `Hello ${tempProfile.name}`
        highscore_user.innerHTML = `Highscore: ${tempProfile.highscore}`

        currentUser.name = tempProfile.name
        currentUser.highscore = tempProfile.highscore
        currentUser.uid = tempProfile.uid
      })

  } else {
    console.log("No user is signed in")
  }
})

//grab login button and sign user in with google account
const googleLogin = document.querySelector('#login-btn')

googleLogin.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then(result => {
      // load the database,
      // then grab the reference to it.
      const db = getDatabase()
      const dbRef = ref(db)
      // get the user who just signed in
      // capture the users relevant data to be used later.
      const user = result.user
      const user_data = {
        uid: user.uid,
        name: user.displayName,
        highscore: 0
      }
      // search for the user in the RT database,
      // then check if that user already exists,
      // if they dont exist, make a new entry and track the data.
      // if they do exist, just track the current users 
      // data for later.
      get(child(dbRef, `users/${user.uid}`))
        .then(snapshot => {
          if (!snapshot.exists()) {
            currentUser.name = user_data.name
            currentUser.highscore = user_data.highscore
            currentUser.uid = user_data.uid
            set(ref(db, `users/${user.uid}`), user_data)
          } else {
            currentUser.name = user_data.name
            currentUser.highscore = user_data.highscore
            currentUser.uid = user_data.uid
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
      highscore_user.innerHTML = ""
      console.log('signed out')
    }).catch(err => {
      console.error(err)
    })
})