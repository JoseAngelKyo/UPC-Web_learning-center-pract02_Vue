import { EquipmentAsset } from '../domain/model/equipment-assets.entity.js'

export class EquipmentAssetAssembler {
    static toEntityFromResource(resource) {
        return new EquipmentAsset({ ...resource });
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error('Error en EquipmentAssetAssembler');
            return [];
        }

        const resources = Array.isArray(response.data)
            ? response.data
            : response.data['equipment-assets'];

        return resources.map(resource =>
            this.toEntityFromResource(resource)
        );
    }
}