export class EquipmentAsset {
    constructor({id = null, storeId = null, equipmentTypeId = null, equipmentModelId = null, serialNumber = "", installedAt = "",
                    status = "", createdAt = "", updatedAt = ""} = {}) {
        this.id = id;
        this.storeId = storeId;
        this.equipmentTypeId = equipmentTypeId;
        this.equipmentModelId = equipmentModelId;
        this.serialNumber = serialNumber;
        this.installedAt = installedAt;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}