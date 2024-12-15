import 'vue3-easy-data-table/dist/style.css'

import Vue3EasyDataTable from 'vue3-easy-data-table'

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('EasyDataTable', Vue3EasyDataTable)
})
