import { EquipmentType } from '../domain/model/equipment-types.entity.js';

export class EquipmentTypeAssembler {
    static toEntityFromResource(resource) {
        return new EquipmentType({ ...resource });
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error('Error en EquipmentTypeAssembler');
            return [];
        }

        const resources = Array.isArray(response.data)
            ? response.data
            : response.data['equipment-types'];

        return resources.map(resource =>
            this.toEntityFromResource(resource)
        );
    }
}