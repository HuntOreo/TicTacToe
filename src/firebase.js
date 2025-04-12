
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// config info for firebase project
const firebaseConfig = {
  apiKey: "AIzaSyAP9lLig8GXhgMq0rGIGN6yFdmvj1I27BU",
  authDomain: "tictactoe-2d137.firebaseapp.com",
  projectId: "tictactoe-2d137",
  storageBucket: "tictactoe-2d137.firebasestorage.app",
  messagingSenderId: "74233409732",
  appId: "1:74233409732:web:8aefe6c22125be0c599991"

}

// initializes the firebase app using the config info
const app = initializeApp(firebaseConfig)

// initializes the firestore and get a reference to the service
console.log(app)
