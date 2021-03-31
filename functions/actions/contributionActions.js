const functions = require('firebase-functions');
const firebaseRefModule = require("../firebaseRef");
const Contribution = require("../models/contribution").Contribution;
const PaymentModel = require("../models/payment").PaymentModel;

function getJsDate(timestamp){
    const date = new Date(0);
    date.setSeconds(timestamp.seconds);
    if(date.getTime() === date.getTime()) return date
    return new Date()
}

const attachUserToUpliner = functions.firestore
    .document('contributions/{contribId}')
    .onCreate(async (snapshot, context) => {
        if(!snapshot.data().adminInitiated && snapshot.data().mode === 'default'){
            const downlinerContribInstance = new Contribution({id: context.params.contribId, data: snapshot.data()});
            try{
                let uplinersContrib = [];
                const prioritizedContribs = await firebaseRefModule.contributionRef
                    .where('mode', '==', 'withdrawal')
                    .where('type', '==', 'upliner')
                    .where('isComplete', '==', false)
                    .get();
                const activeContributions = await firebaseRefModule.contributionRef
                    .where('hasPaid', '==', true)
                    .where('type', '==', 'upliner')
                    .where('isComplete', '==', false)
                    .where('userId', '!=', downlinerContribInstance.data.userId)
                    .get();
                activeContributions.forEach(doc=>{
                    if(doc.exists){
                        uplinersContrib.push({id: doc.id, data: doc.data()})
                    }
                })
                uplinersContrib.sort((a, b)=>{
                    let date1 = getJsDate(a.data.createdAt);
                    let date2 = getJsDate(b.data.createdAt);
                    return (date1 - date2)
                })
                prioritizedContribs.forEach(doc=>{
                    if(doc.exists){
                        uplinersContrib.unshift({id: doc.id, data: doc.data()})
                    }
                })
                let selected_upliner = await downlinerContribInstance.decide_upliner(uplinersContrib);
                if(selected_upliner){
                    const uplinerContribInstance = new Contribution({...selected_upliner})
                    const payment_record = new PaymentModel();
                    const upliner = await uplinerContribInstance.getUser();
                    payment_record.userId = downlinerContribInstance.data.userId;
                    payment_record.contribId = context.params.contribId;
                    payment_record.amount = downlinerContribInstance.data.amountToBePaid;
                    payment_record.createdAt = payment_record.updatedAt = firebaseRefModule.firestoreRef.FieldValue.serverTimestamp();
                    payment_record.receiverId = upliner.id;

                    const saved_payment = await firebaseRefModule.paymentRef.add(Object.assign({}, payment_record));

                    await firebaseRefModule.contributionRef.doc(uplinerContribInstance.id).update({
                        downliners: firebaseRefModule.firestoreRef.FieldValue.arrayUnion(downlinerContribInstance.data.userId),
                        paymentIds: firebaseRefModule.firestoreRef.FieldValue.arrayUnion(saved_payment.id),
                        isComplete: uplinerContribInstance.profit_gain_is_reached(),
                        paymentProgressions: uplinerContribInstance.getPaymentProgressions()
                    })

                    await firebaseRefModule.contributionRef.doc(downlinerContribInstance.id).update({
                        expectedProfit: downlinerContribInstance.get_expected_profit(),
                        payTo: upliner.id,
                        paymentProgressions: downlinerContribInstance.get_payment_progressions(),
                        paymentId: saved_payment.id,
                    })
                }
            }catch (e) {
                console.log('Unable to attach user to upliner::', e.message);
                functions.logger.info("Functions Logger:: Unable to attach user to upliner:", e);
            }
        }
        return Promise.resolve()
    })

module.exports = {
    attachUserToUpliner
}
