
export class Stores {
    constructor({ id= null, name="", address="", retailerId= null, createdAt="", updatedAt="" } = {} ) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.retailerId = retailerId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
