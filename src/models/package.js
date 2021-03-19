class Package{

    constructor(id, data) {
        this.id = id;
        this.data = data
    }

}

function Model(){
    this.name = '';
    this.prices = {};
    this.description = '';
    this.createdAt = new Date();
    this.updatedAt = new Date()
}

export const PackageModel = Model
export default Package