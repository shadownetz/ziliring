import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/analytics'
import 'firebase/performance'
import 'firebase/firestore'
import 'firebase/auth'

let firebaseConfig;
const production = window.location.hostname === 'ziliring.com';

if(production){
    firebaseConfig = {
        apiKey: "AIzaSyAG102CYK1t29uUiwsiiJyTXi_gh8lgMpU",
        authDomain: "ziliring-prod.firebaseapp.com",
        projectId: "ziliring-prod",
        storageBucket: "ziliring-prod.appspot.com",
        messagingSenderId: "665594188208",
        appId: "1:665594188208:web:4f1de5242d64af4e50c675",
        measurementId: "G-9Q7230GD1S"
    }
}else{
    firebaseConfig = {
        apiKey: "AIzaSyCDlQeiPW8d7lCbBYHlgX3h--aM_nHUqs4",
        authDomain: "ziliring.firebaseapp.com",
        projectId: "ziliring",
        storageBucket: "ziliring.appspot.com",
        messagingSenderId: "463603610933",
        appId: "1:463603610933:web:6d0dbfcdd764c60f77087c",
        measurementId: "G-W59Q96VGVF"
    }
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
export const counterRef = firestore().collection('counters')
export const requestRef = firestore().collection('requests')
export const metaRef = firestore().collection('meta')

export default firebase