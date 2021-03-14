const functions = require('firebase-functions');
const firebaseRef = require('../firebaseRef');
const profileModule = require("../models/profile")


const addUserProfile = functions.firestore
    .document('users/{userId}')
    .onCreate((snapshot, context) => {
       try{
           const newProfile = new profileModule.ProfileModel();
           newProfile.userId = context.params.userId;
           return firebaseRef.profileRef.doc(context.params.userId).set(Object.assign({}, newProfile));
       }catch (e) {
           console.log('Error detected while adding profile::', e.message)
       }
        return Promise.resolve()
    })

module.exports = {
    addUserProfile
}