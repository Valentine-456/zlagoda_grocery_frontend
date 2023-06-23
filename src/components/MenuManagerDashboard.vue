<template>
  <v-navigation-drawer class="bg-grey-lighten-2">
    <v-list>
      <v-list-item
        @click="$router.push('/dashboard-manager')"
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
      ['Category', '/dashboard-manager/category'],
      ['Product', '/dashboard-manager/product'],
      ['Store Product', '/dashboard-manager/store-product'],
      ['Check', '/dashboard-manager/check'],
      ['Employee', '/dashboard-manager/employee'],
      ['Customer', '/dashboard-manager/customer-card']
    ]
  })
}
</script>

<style scoped></style>
