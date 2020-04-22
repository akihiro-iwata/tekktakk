import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import config from './firebase.config.js'

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

firebase.auth().languageCode = 'ja'
export const authProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export const storage = firebase.storage()
export const db = firebase.firestore()
