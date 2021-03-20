const functions = require('firebase-functions');
const firebaseRef = require('./firebaseRef');
const updatedAt = firebaseRef.firestoreRef.FieldValue.serverTimestamp();

const addUserCounter =  functions.firestore
    .document('users/{userId}')
    .onCreate(()=>{
        return firebaseRef.counterRef
            .doc('users')
            .update({
                count: firebaseRef.firestoreRef.FieldValue.increment(1),
                updatedAt
            })
    })

const subUserCounter =  functions.firestore
    .document('users/{userId}')
    .onDelete(()=>{
        return firebaseRef.counterRef
            .doc('users')
            .update({
                count: firebaseRef.firestoreRef.FieldValue.increment(-1),
                updatedAt
            })
    })

const addContribCounter =  functions.firestore
    .document('contributions/{contribId}')
    .onCreate(async (snapshot, context)=>{
        const count = firebaseRef.firestoreRef.FieldValue.increment(1);
        try{
            await firebaseRef.packageRef
                .doc(snapshot.data().packageId)
                .update({ totalContributors: count, updatedAt })
        }catch (e) {
            functions.logger.info("Functions Logger::(unable to increment package contributors)::", e)
        }
        return firebaseRef.counterRef
            .doc('contributions')
            .update({ count, updatedAt })
    })

const subContribCounter =  functions.firestore
    .document('contributions/{contribId}')
    .onDelete(async (snapshot)=>{
        const count = firebaseRef.firestoreRef.FieldValue.increment(-1);
        try{
            await firebaseRef.packageRef
                .doc(snapshot.data().packageId)
                .update({ totalContributors: count, updatedAt })
        }catch (e) {
            functions.logger.info("Functions Logger::(unable to increment package contributors)::", e)
        }
        return firebaseRef.counterRef
            .doc('contributions')
            .update({ count, updatedAt })
    })

module.exports = {
    addUserCounter,
    addContribCounter,
    subUserCounter,
    subContribCounter
}