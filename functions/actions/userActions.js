const functions = require('firebase-functions');
const firebaseRef = require('../firebaseRef');
const profileModule = require("../../src/models/profile")


const addUserProfile = functions.firestore
    .document('users/{userId}')
    .onCreate((snapshot, context) => {
        const newProfile = new profileModule.ProfileModel();
        newProfile.userId = context.params.userId;
        return firebaseRef.profileRef.add(Object.assign({}, newProfile))
    })

module.exports = {
    addUserProfile
}