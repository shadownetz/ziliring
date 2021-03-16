import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/analytics'
import 'firebase/performance'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCDlQeiPW8d7lCbBYHlgX3h--aM_nHUqs4",
    authDomain: "ziliring.firebaseapp.com",
    projectId: "ziliring",
    storageBucket: "ziliring.appspot.com",
    messagingSenderId: "463603610933",
    appId: "1:463603610933:web:6d0dbfcdd764c60f77087c",
    measurementId: "G-W59Q96VGVF"
}

firebase.initializeApp(firebaseConfig);

export const firebaseAnalytics = firebase.analytics()
export const firebasePerformance = firebase.performance()
export const firestore = firebase.firestore
export const storageRef = firebase.storage()
export const userRef = firestore().collection('users')
export const profileRef = firestore().collection('profiles')
export const contributionRef = firestore().collection('contributions')
export const packageRef = firestore().collection('packages')
export const paymentRef = firestore().collection('payments')

export default firebase