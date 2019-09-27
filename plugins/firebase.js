import firebase from 'firebase/app'
import 'firebase/auth'
import config from './firebase.config.js'

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

firebase.auth().languageCode = 'ja'
export const authProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
