import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";

const storesEndpointPath = import.meta.env.VITE_STORES_ENDPOINT_PATH;
const equipmentTypesEndpointPath = import.meta.env.VITE_EQUIPMENT_TYPES_ENDPOINT_PATH;
const equipmentModelsEndpointPath = import.meta.env.VITE_EQUIPMENT_MODELS_ENDPOINT_PATH;
const equipmentAssetsEndpointPath = import.meta.env.VITE_EQUIPMENT_ASSETS_ENDPOINT_PATH;

export class AssetsApi extends BaseApi {
    #storesEndpoint;
    #equipmentTypesEndpoint;
    #equipmentModelsEndpoint;
    #equipmentAssetsEndpoint;

    constructor() {
        super();

        this.#storesEndpoint = new BaseEndpoint(this, storesEndpointPath);
        this.#equipmentTypesEndpoint = new BaseEndpoint(this, equipmentTypesEndpointPath);
        this.#equipmentModelsEndpoint = new BaseEndpoint(this, equipmentModelsEndpointPath);
        this.#equipmentAssetsEndpoint = new BaseEndpoint(this, equipmentAssetsEndpointPath);
    }


    getStores() {
        return this.#storesEndpoint.getAll();
    }

    getEquipmentTypes() {
        return this.#equipmentTypesEndpoint.getAll();
    }

    getEquipmentModels() {
        return this.#equipmentModelsEndpoint.getAll();
    }

    getEquipmentAssets() {
        return this.#equipmentAssetsEndpoint.getAll();
    }

    updateEquipmentAsset(resource) {
        return this.#equipmentAssetsEndpoint.update(
            resource.id,
            resource
        );
    }
}
