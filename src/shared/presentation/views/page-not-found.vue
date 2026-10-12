<script setup>
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import PvButton from 'primevue/button';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
</script>

<template>
  <section class="p-4" aria-labelledby="not-found-title">
    <h1 id="not-found-title"> {{ t('page-not-found.title') }} </h1>
    <p>{{t('page-not-found.content', {'unavailable-route': route.path}) }}</p>
    <pv-button :label="t('page-not-found.go-home')" icon="pi pi-home" @click="router.push('/home')"/>
  </section>
</template>