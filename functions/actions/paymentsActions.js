const functions = require('firebase-functions');
const firebaseRefModule = require("../firebaseRef");
const Contribution = require("../models/contribution").Contribution


const confirmPayment = functions.firestore
    .document('payments/{paymentId}')
    .onUpdate(async (change, context) => {
        try{
            const paymentData = change.after.data();
            const downlinerContribDoc = await firebaseRefModule.contributionRef.doc(paymentData.contribId).get();
            const downlinerDoc = await firebaseRefModule.userRef.doc(paymentData.userId).get()
            if(downlinerContribDoc.exists && downlinerDoc.exists){
                const downlinerContribInstance = new Contribution({id: downlinerContribDoc.id, data: downlinerContribDoc.data()});
                if(paymentData.confirmed){
                    await firebaseRefModule.contributionRef.doc(paymentData.contribId).update({
                        hasPaid: true,
                        type: 'upliner',
                        profitReceived: downlinerContribInstance.get_profit_received()
                    });
                    await firebaseRefModule.profileRef.doc(paymentData.userId).update({
                        balance: (downlinerDoc.data().balance + paymentData.amount)
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