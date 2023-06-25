<template>
    <v-navigation-drawer class="bg-grey-lighten-2">
      <v-list>
        <v-list-item
          @click="$router.push('/dashboard-cashier')"
          title="My Account"
          value="account"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
  
      <v-list density="compact" nav>
        <v-list-item
          v-for="option in menuOptions"
          :key="option[1]"
          :title="option[0]"
          :value="option[1]"
          @click="$router.push(option[1])"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  
    <v-main style="height: 250px"></v-main>
  </template>
  <script lang="ts">
  export default {
    data: () => ({
      menuOptions: [
        ['Product', '/dashboard-cashier/product'],
        ['Store Product', '/dashboard-cashier/store-product'],
        ['Check', '/dashboard-cashier/check'],
        ['Customer', '/dashboard-cashier/customer-card']
      ]
    })
  }
  </script>
  
  <style scoped></style>
  