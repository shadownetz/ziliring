const functions = require('firebase-functions');
const firebaseRef = require('../firebaseRef');


const requestStatus = functions.firestore
    .document('requests/{requestId}')
    .onUpdate((change, context) => {
        const prevData = change.before.data();
        const data = change.after.data();
        try{
            if(prevData.status !== 'approved' && data.status === 'approved'){
                if(data.context === 'withdrawal'){
                    return firebaseRef.profileRef.doc(data.createdBy).update({
                        balance: firebaseRef.firestoreRef.FieldValue.increment(-data.amount)
                    })
                }
                else if(data.status === 'profit'){
                    return firebaseRef.profileRef.doc(data.createdBy).update({
                        profit: firebaseRef.firestoreRef.FieldValue.increment(-data.amount)
                    })
                }
            }else
            if(prevData.status === 'approved' && data.status !== 'approved'){
                if(data.context === 'withdrawal'){
                    return firebaseRef.profileRef.doc(data.createdBy).update({
                        balance: firebaseRef.firestoreRef.FieldValue.increment(data.amount)
                    })
                }
                else if(data.status === 'profit'){
                    return firebaseRef.profileRef.doc(data.createdBy).update({
                        profit: firebaseRef.firestoreRef.FieldValue.increment(data.amount)
                    })
                }
            }
        }catch (e) {
            functions.logger.error('Error while processing request status', e)
        }
        return Promise.resolve()
    })

module.exports = {
    requestStatus
}