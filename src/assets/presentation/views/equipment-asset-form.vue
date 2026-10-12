<script setup>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import PvSelect from 'primevue/select';
import PvCard from 'primevue/card';
import PvDataTable from 'primevue/datatable';
import PvColumn from 'primevue/column';
import useAssetsStore from '../../application/assets.store.js';

const { t } = useI18n();
const store = useAssetsStore();

const {
  stores,
  equipmentTypes,
  equipmentModels,
  selectedStoreId,
  selectedStore,
  selectedStoreAssets,
  loading,
  loaded
} = storeToRefs(store);

const columns = [
  { field: 'id', key: 'equipment.id' },
  { field: 'serialNumber', key: 'equipment.serial-number' },
  { field: 'equipmentTypeName', key: 'equipment.type' },
  { field: 'modelNumber', key: 'equipment.model-number' },
  { field: 'manufacturer', key: 'equipment.manufacturer' },
  { field: 'installedAt', key: 'equipment.installed-at' },
  { field: 'status', key: 'equipment.status' },
  { field: 'createdAt', key: 'equipment.created-at' },
  { field: 'updatedAt', key: 'equipment.updated-at' }
];

const rows = computed(() => {
  return selectedStoreAssets.value.map(asset => {
    const type = equipmentTypes.value.find(
        item => String(item.id) === String(asset.equipmentTypeId)
    );

    const model = equipmentModels.value.find(
        item => String(item.id) === String(asset.equipmentModelId)
    );

    return {
      ...asset,
      equipmentTypeName: type?.name ?? t('common.no-data'),
      modelNumber: model?.modelNumber ?? t('common.no-data'),
      manufacturer: model?.manufacturer ?? t('common.no-data')
    };
  });
});

onMounted(async () => {
  try {
    await store.loadData();
  } catch {
    // El estado loaded permite mostrar el error en el template.
  }
});
</script>

<template>
  <section
      aria-labelledby="customer-stores-title"
      :aria-busy="loading"
  >
    <h2 id="customer-stores-title">
      {{ t('stores.title') }}
    </h2>

    <p v-if="loading" role="status">
      {{ t('common.loading') }}
    </p>

    <p v-else-if="!loaded" role="alert">
      {{ t('common.load-error') }}
    </p>

    <div v-else>
      <div class="field">
        <label for="store-selector">
          {{ t('stores.select') }}
        </label>

        <pv-select
            input-id="store-selector"
            v-model="selectedStoreId"
            :options="stores"
            option-label="name"
            option-value="id"
            :placeholder="t('stores.select')"
            class="w-full md:w-6"
        />
      </div>

      <template v-if="selectedStore">
        <pv-card class="mb-4">
          <template #title>
            {{ t('stores.summary') }}
          </template>

          <template #content>
            <p>
              {{ t('stores.name') }}:
              <strong>{{ selectedStore.name }}</strong>
            </p>

            <p>
              {{ t('stores.address') }}:
              {{ selectedStore.address }}
            </p>

            <p>
              {{ t('stores.retailer-id') }}:
              {{ selectedStore.retailerId }}
            </p>

            <p>
              {{ t('equipment.created-at') }}:
              {{ selectedStore.createdAt }}
            </p>

            <p>
              {{ t('equipment.updated-at') }}:
              {{ selectedStore.updatedAt }}
            </p>
          </template>
        </pv-card>

        <pv-card>
          <template #title>
            {{ t('equipment.title') }}
          </template>

          <template #content>
            <pv-data-table
                :value="rows"
                data-key="id"
                paginator
                :rows="5"
                :rows-per-page-options="[5, 10, 20]"
                striped-rows
                table-style="min-width: 65rem"
                :aria-label="t('equipment.title')"
            >
              <template #empty>
                {{ t('common.no-data') }}
              </template>

              <pv-column
                  v-for="column in columns"
                  :key="column.field"
                  :field="column.field"
                  :header="t(column.key)"
                  sortable
              />
            </pv-data-table>
          </template>
        </pv-card>
      </template>

      <p v-else>{{ t('common.no-data') }}</p>
    </div>
  </section>
</template>