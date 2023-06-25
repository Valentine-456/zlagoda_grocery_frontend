<template>
  <v-card>
    <v-layout class="d-flex">
      <MenuCashierDashboard />
      <v-main class="main d-flex bg-green-lighten-5 pa-0">
        <RouterView />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import MenuCashierDashboard from '@/components/MenuCashierDashboard.vue'
import { RouterView } from 'vue-router'

export default {
  data() {
    return {}
  },
  components: {
    MenuCashierDashboard
  },
  methods: {}
}
</script>

<style scoped>
.main {
  height: 100vh;
  width: calc(100vw - 256px);
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  justify-content: center;
  align-items: center;
  flex-grow: 2;
}
</style>
