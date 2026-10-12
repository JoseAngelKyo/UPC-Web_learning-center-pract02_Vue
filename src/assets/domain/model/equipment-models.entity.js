export class EquipmentModel {
    constructor({ id = null, equipmentTypeId = null, modelNumber = "", manufacturer = "", description = "", createdAt = "",
                    updatedAt = ""} = {}) {
        this.id = id;
        this.equipmentTypeId = equipmentTypeId;
        this.modelNumber = modelNumber;
        this.manufacturer = manufacturer;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}