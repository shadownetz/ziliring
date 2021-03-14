const functions = require('firebase-functions');
const firebaseRefModule = require("../firebaseRef");
const Contribution = require("../models/contribution").Contribution;
const PaymentModel = require("../models/payment").PaymentModel;



const attachUserToUpliner = functions.firestore
    .document('contributions/{contribId}')
    .onCreate(async (snapshot, context) => {
        const downlinerContribInstance = new Contribution({id: context.params.contribId, data: snapshot.data()});
        try{
            let uplinersContrib = [];
            const activeContributions = await firebaseRefModule.contributionRef
                .where('hasPaid', '==', true)
                .where('type', '==', 'upliner')
                .where('isComplete', '==', false)
                .orderBy('createdAt', 'asc')
                .get();
            activeContributions.forEach(doc=>{
                if(doc.exists){
                    uplinersContrib.push({id: doc.id, data: doc.data()})
                }
            })
            if(uplinersContrib.length > 0){    // attaching to upliner
                let selected_upliner = await downlinerContribInstance.decide_upliner(uplinersContrib);
                if(selected_upliner){
                    const uplinerContribInstance = new Contribution({...selected_upliner})
                    const payment_record = new PaymentModel();
                    payment_record.userId = downlinerContribInstance.data.userId;
                    payment_record.contribId = context.params.contribId;
                    payment_record.amount = downlinerContribInstance.data.amountToBePaid;
                    payment_record.createdAt = payment_record.updatedAt = firebaseRefModule.firestoreRef.FieldValue.serverTimestamp();

                    const saved_payment_id = await firebaseRefModule.paymentRef.add(Object.assign({}, payment_record));

                    await firebaseRefModule.contributionRef.doc(uplinerContribInstance.id).update({
                        downliners: firebaseRefModule.firestoreRef.FieldValue.arrayUnion(downlinerContribInstance.data.userId),
                        paymentIds: firebaseRefModule.firestoreRef.FieldValue.arrayUnion(saved_payment_id),
                        isComplete: uplinerContribInstance.profit_gain_is_reached()
                    })

                    await firebaseRefModule.contributionRef.doc(downlinerContribInstance.id).update({
                        expectedProfit: downlinerContribInstance.get_expected_profit(),
                        payTo: uplinerContribInstance.id,
                        paymentProgressions: downlinerContribInstance.get_payment_progressions(),
                        paymentId: saved_payment_id,
                        expireAt: firebaseRefModule.firestoreRef.Timestamp.fromDate(Contribution.get_expiration_timestamp())
                    })
                }
            }
        }catch (e) {
            console.log('Unable to attach user to upliner::', e.message);
            functions.logger.info("Functions Logger:: Unable to attach user to upliner:", e);
        }
        return Promise.resolve()
    })

module.exports = {
    attachUserToUpliner
}
