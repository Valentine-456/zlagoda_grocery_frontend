<template>
  <ProductCreateDialog />
  <ProductDeleteDialog />
  <ProductUpdateDialog />
  <div class="editor-block v-container pa-5">
    <v-card class="mb-5">
      <v-card-title class="text-h4 font-weight-bold">Product</v-card-title>
      <v-card-actions class="d-flex">
        <v-select
          v-model="sortBy"
          density="compact"
          class="sort-by"
          :items="sortOptions"
          label="Sort By"
        ></v-select>
        <v-text-field
          v-model="categoryFilter"
          density="compact"
          class="sort-by"
          label="Category Filter"
        ></v-text-field>
        <v-btn @click="search" size="large" class="mb-5 mt-0 mx-5 bg-blue">Search</v-btn>
      </v-card-actions>
    </v-card>

    <v-table :height="tableHeight" hover fixed-header density="compact" class="data-table mt-5">
      <thead>
        <tr>
          <th>Number</th>
          <th>Name</th>
          <th>Category</th>
          <th>Characteristics</th>
        </tr>
      </thead>
      <tbody v-if="products.length != 0">
        <tr v-for="item in products" :key="item.id_product">
          <td>{{ item.id_product }}</td>
          <td>{{ item.product_name }}</td>
          <td>{{ item.category_name }}</td>
          <td>{{ item.charachteristics }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script lang="ts">
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useProductEditorStore, type ProductDTO } from '@/stores/productEditor'
import { useLoginStore } from '@/stores/login'

export default {
  components: {},
  data() {
    return {
      sortBy: '',
      sortOptions: ['category_name', 'product_name', ''],
      categoryFilter: ''
    }
  },
  computed: {
    ...mapState(useProductEditorStore, ['products']),
    ...mapState(useLoginStore, ['jwt_token']),
    tableHeight() {
      return window.innerHeight * 0.5
    },
  },
  methods: {
    ...mapActions(useProductEditorStore, ['getAll']),
    async search() {
      let isOk: boolean
      isOk = await this.getAll(this.jwt_token, this.sortBy, this.categoryFilter.trim() || 'Any')
      if (!isOk) alert('The error happened')
    },
  }
}
</script>
<style>
.editor-block {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.sort-by {
  max-width: 300px;
  margin-right: 20px;
}
</style>
