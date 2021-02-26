class User{

    constructor() {

    }
}

function model(){
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phone = '';
    this.isAdmin = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
}

export const UserModel = model
export default User