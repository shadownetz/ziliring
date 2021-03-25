const functions = require('firebase-functions');
const Contribution = require("../models/contribution").Contribution


const purgeUser = functions.firestore
    .document('profiles/{profileId}')
    .onUpdate(async (change, context) => {
        const before = change.before.data();
        const after = change.after.data();
        if(before.isActive && !after.isActive){
            await Contribution.resetUplinerContrib(context.params.profileId)
            await Contribution.resetDownlinerContrib(context.params.profileId)
        }
    })

module.exports = {
    purgeUser
}