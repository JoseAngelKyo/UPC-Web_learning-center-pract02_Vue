import { EquipmentModel } from '../domain/model/equipment-models.entity.js';

export class EquipmentModelAssembler {
    static toEntityFromResource(resource) {
        return new EquipmentModel({ ...resource });
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error('Error en EquipmentModelAssembler');
            return [];
        }

        const resources = Array.isArray(response.data)
            ? response.data
            : response.data['equipment-models'];

        return resources.map(resource =>
            this.toEntityFromResource(resource)
        );
    }
}