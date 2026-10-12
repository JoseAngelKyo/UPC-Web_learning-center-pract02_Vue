<script setup>

import { useI18n } from 'vue-i18n'
import PvSelectButton from "primevue/selectbutton"

const { locale, t } = useI18n()

const languages = [
  { label: 'En', value: 'en'},
  { label: 'Es', value: 'es'}
];

</script>

<template>

  <pv-select-button
    v-model="locale"
    :options="languages"
    option-label="label"
    option-value="value"
    :allow-empty="false"
    :aria-label="t('toolbar.language-selector')"
  />

</template>

<style scoped>

</style>