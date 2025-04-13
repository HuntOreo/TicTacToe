
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set } from 'firebase/database'
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider
} from 'firebase/auth'

// config info for firebase project
const firebaseConfig = {
  apiKey: "AIzaSyAP9lLig8GXhgMq0rGIGN6yFdmvj1I27BU",
  authDomain: "tictactoe-2d137.firebaseapp.com",
  databaseURL: "https://tictactoe-2d137-default-rtdb.firebaseio.com",
  projectId: "tictactoe-2d137",
  storageBucket: "tictactoe-2d137.firebasestorage.app",
  messagingSenderId: "74233409732",
  appId: "1:74233409732:web:8aefe6c22125be0c599991",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// First i need to create an account
// - Need to log in and out.
// - Must add the account to a database.
// Then i need to track a user's high scores and render them.

const googleLogin = document.querySelector('#login-btn')
googleLogin.addEventListener('click', () => {

  signInWithRedirect(auth, provider)

})


// // database stuff ignore for now
// const dumbyProfile = {
//   users: {
//     "dumby": {
//       "name": "Dumb Guy",
//       "contact": "Not Dumb Guy"
//     }
//   }
// }

// //LOOK UP SET command
// //LOOK UP DATA STRUCTURE PRECIDENT
// const writeUserData = (user) => {
//   set(ref(database, '/'), { ...user })
// }

// writeUserData(dumbyProfile)