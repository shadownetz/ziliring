class Profile{

    constructor({id, data}) {
        this.id = id;
        this.data = Object.assign(new Model(), data)
    }

    get_balance(){
        return this.data.balance
    }
}

function Model(){
    this.userId = '';
    this.bankName = '';
    this.bankAccountName = '';
    this.bankAccountNumber = '';
    this.verifiedContributions = 0;
    this.balance = 0;
    this.profit = 0;
    this.purgedAt = new Date()
    this.purgeCount = 0;
    this.isActive = true
}
module.exports = {
    ProfileModel: Model,
    Profile
}