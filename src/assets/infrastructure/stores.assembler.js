import { Stores } from '../domain/model/stores.entity.js';

export class StoresAssembler{
    static toEntityFromResource(resource) {
        return new Stores ({ ...resource });
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error('Error en StoreAssembler');
            return [];
        }

        const resources = Array.isArray(response.data)
            ? response.data
            : response.data['stores'];

        return resources.map(resource =>
            this.toEntityFromResource(resource)
        );
    }
}