import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { AssetsApi } from '../infrastructure/assets-api.js';
import { StoresAssembler } from '../infrastructure/stores.assembler.js';
import { EquipmentTypeAssembler } from '../infrastructure/equipment-types.assembler.js';
import { EquipmentModelAssembler } from '../infrastructure/equipment-models.assembler.js';
import { EquipmentAssetAssembler } from '../infrastructure/equipment-assets.assembler.js';

const assetsApi = new AssetsApi();

const useAssetsStore = defineStore('assets', () => {
    const stores = ref([]);
    const equipmentTypes = ref([]);
    const equipmentModels = ref([]);
    const equipmentAssets = ref([]);

    const selectedStoreId = ref(null);

    const loading = ref(false);
    const loaded = ref(false);
    const saving = ref(false);
    const errors = ref([]);

    let loadingPromise = null;

    function loadData() {
        if (loaded.value) {
            return Promise.resolve();
        }

        if (loadingPromise) {
            return loadingPromise;
        }

        loading.value = true;
        errors.value = [];

        loadingPromise = Promise.all([
            assetsApi.getStores(),
            assetsApi.getEquipmentTypes(),
            assetsApi.getEquipmentModels(),
            assetsApi.getEquipmentAssets()
        ])
            .then(([
                       storesResponse,
                       typesResponse,
                       modelsResponse,
                       assetsResponse
                   ]) => {
                const loadedStores =
                    StoresAssembler.toEntitiesFromResponse(storesResponse);

                const loadedTypes =
                    EquipmentTypeAssembler.toEntitiesFromResponse(typesResponse);

                const loadedModels =
                    EquipmentModelAssembler.toEntitiesFromResponse(modelsResponse);

                const loadedAssets =
                    EquipmentAssetAssembler.toEntitiesFromResponse(assetsResponse);

                stores.value = loadedStores;
                equipmentTypes.value = loadedTypes;
                equipmentModels.value = loadedModels;
                equipmentAssets.value = loadedAssets;

                if (selectedStoreId.value === null) {
                    selectedStoreId.value = stores.value[0]?.id ?? null;
                }

                loaded.value = true;
            })
            .catch(error => {
                errors.value.push(error);
                throw error;
            })
            .finally(() => {
                loading.value = false;
                loadingPromise = null;
            });

        return loadingPromise;
    }

    function getStoreById(id) {
        return stores.value.find(
            store => String(store.id) === String(id)
        );
    }

    function getEquipmentAssetById(id) {
        return equipmentAssets.value.find(
            asset => String(asset.id) === String(id)
        );
    }

    const selectedStore = computed(() => {
        return getStoreById(selectedStoreId.value) ?? null;
    });

    function getAssetsByStoreId(storeId) {
        return equipmentAssets.value.filter(
            asset => String(asset.storeId) === String(storeId)
        );
    }

    const selectedStoreAssets = computed(() => {
        if (!selectedStore.value) {
            return [];
        }

        return getAssetsByStoreId(selectedStore.value.id);
    });

    function getAvailableStoresForAsset(assetId) {
        const asset = getEquipmentAssetById(assetId);

        if (!asset) {
            return [];
        }

        const currentStore = getStoreById(asset.storeId);

        if (!currentStore || currentStore.retailerId == null) {
            return [];
        }

        return stores.value.filter(store =>
            store.retailerId != null
            && String(store.retailerId) === String(currentStore.retailerId)
            && String(store.id) !== String(currentStore.id)
        );
    }

    async function assignEquipmentAsset(assetId, destinationStoreId) {
        if (saving.value) {
            throw new Error('An assignment is already being saved.');
        }

        const asset = getEquipmentAssetById(assetId);
        const destinationStore = getStoreById(destinationStoreId);

        if (!asset || !destinationStore) {
            throw new Error('Equipment asset or destination store not found.');
        }

        const availableStores = getAvailableStoresForAsset(assetId);

        const validDestination = availableStores.some(
            store => String(store.id) === String(destinationStore.id)
        );

        if (!validDestination) {
            throw new Error(
                'Select a different store belonging to the same retailer.'
            );
        }

        saving.value = true;

        try {
            const resource = {
                ...asset,
                storeId: destinationStore.id,
                updatedAt: new Date().toISOString()
            };

            const response =
                await assetsApi.updateEquipmentAsset(resource);

            const updatedAsset =
                EquipmentAssetAssembler.toEntityFromResource(response.data);

            const index = equipmentAssets.value.findIndex(
                item => String(item.id) === String(updatedAsset.id)
            );

            if (index !== -1) {
                equipmentAssets.value[index] = updatedAsset;
            }

            return updatedAsset;

        } catch (error) {
            errors.value.push(error);
            throw error;
        } finally {
            saving.value = false;
        }
    }

    function clearErrors() {
        errors.value = [];
    }

    return {
        stores,
        equipmentTypes,
        equipmentModels,
        equipmentAssets,
        selectedStoreId,
        selectedStore,
        selectedStoreAssets,
        loading,
        loaded,
        saving,
        errors,
        loadData,
        getStoreById,
        getEquipmentAssetById,
        getAssetsByStoreId,
        getAvailableStoresForAsset,
        assignEquipmentAsset,
        clearErrors
    };
});

export default useAssetsStore;