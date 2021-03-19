const functions = require('firebase-functions');
const firebaseRefModule = require("../firebaseRef");
const Contribution = require("../models/contribution").Contribution


const confirmPayment = functions.firestore
    .document('payments/{paymentId}')
    .onUpdate(async (change, context) => {
        try{
            const paymentData = change.after.data();
            const paymentPrevData = change.before.data();
            const contribDoc = await firebaseRefModule.contributionRef.doc(paymentData.contribId).get();
            const uplinerProfile = await firebaseRefModule.profileRef.doc(paymentData.receiverId).get();
            const downlinerProfile = await firebaseRefModule.profileRef.doc(paymentData.userId).get()
            if(contribDoc.exists && uplinerProfile.exists && downlinerProfile.exists){
                const contribInstance = new Contribution({id: contribDoc.id, data: contribDoc.data()});
                // from false to true
                if(!paymentPrevData.confirmed && paymentData.confirmed){
                    const downlinerUpdates = {}
                    // Assign the downliner specified bonus
                    if(contribInstance.data.amountToBePaid === 500000){
                        const amount = await contribInstance.totalNoOfContribAmount(500000);
                        if(amount >= 5){
                            downlinerUpdates.profit = (downlinerProfile.data().profit + ((2/100)*500000))
                        }
                    }
                    else if(contribInstance.data.amountToBePaid === 1000000){
                        const amount = await contribInstance.totalNoOfContribAmount(1000000);
                        if(amount >= 2){
                            downlinerUpdates.profit = (downlinerProfile.data().profit + ((5/100)*1000000))
                        }
                    }
                    await firebaseRefModule.contributionRef.doc(paymentData.contribId).update({
                        hasPaid: true,
                        type: 'upliner',
                        profitReceived: contribInstance.get_profit_received(),
                        beginAt: firebaseRefModule.firestoreRef.FieldValue.serverTimestamp(),
                        expireAt: firebaseRefModule.firestoreRef.Timestamp.fromDate(Contribution.get_expiration_timestamp()),
                    });
                    await firebaseRefModule.profileRef.doc(paymentData.receiverId).update({
                        balance: (uplinerProfile.data().balance + paymentData.amount),
                    })
                    await firebaseRefModule.profileRef.doc(paymentData.userId).update({
                        verifiedContributions: firebaseRefModule.firestoreRef.FieldValue.increment(1),
                        ...downlinerUpdates
                    })
                }
            }
        }catch (e) {
            console.log('Error while confirming payment::', e.message);
            functions.logger.info("Functions Logger:: Error while confirming payment:", e);
        }
        return Promise.resolve()
    })

module.exports = {
    confirmPayment
}