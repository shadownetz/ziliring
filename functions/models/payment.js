class Payment{
    constructor() {
    }

}

function Model() {
    this.contribId = '';
    this.proof = [];
    this.amount = 0;
    this.confirmed = false;
    this.reported = false;
    this.userId = '';
    this.receiverId = '';
    this.payContext = 'plan';   // plan || profit
    this.createdAt = new Date();
    this.updatedAt = new Date()
}

module.exports = {
    PaymentModel : Model,
    Payment
}
