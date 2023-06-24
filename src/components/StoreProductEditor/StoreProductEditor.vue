<template>
  <StoreProductCreateDialog />
  <StoreProductDeleteDialog />
  <StoreProductUpdateDialog />
  <div class="editor-block v-container pa-5">
    <v-card class="mb-5">
      <v-card-title class="text-h4 font-weight-bold">Store Product</v-card-title>
      <v-card-actions class="d-flex">
        <v-select
          v-model="sortBy"
          density="compact"
          class="sort-by"
          :items="sortOptions"
          label="Sort By"
        ></v-select>
        <v-btn @click="search" size="large" class="mb-5 mt-0 mx-5 bg-blue">Search</v-btn>
        <v-btn @click="create" size="large" class="mb-5 mt-0 bg-green">Create New</v-btn>
      </v-card-actions>
    </v-card>

    <v-table :height="tableHeight" hover fixed-header density="compact" class="data-table mt-5">
      <thead>
        <tr>
          <th>UPC</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Characteristics</th>
          <th>Promotional</th>
          <th>Price</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody v-if="storeProducts.length != 0">
        <tr v-for="item in storeProducts" :key="item.upc">
          <td>{{ item.upc }}</td>
          <td>{{ item.product_name }}</td>
          <td>{{ item.products_nubmer }}</td>
          <td>{{ item.charachteristics }}</td>
          <td>{{ item.promotional_product }}</td>
          <td>{{ item.selling_price }}</td>
          <td>
            <v-btn size="small" @click="updateRequest(item)" class="bg-orange">Update</v-btn>
            <v-btn size="small" @click="deleteRequest(item)" class="bg-red">Delete</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script lang="ts">
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useProductEditorStore } from '@/stores/productEditor'
import { useLoginStore } from '@/stores/login'
import {
  useStoreProductEditorStore,
  type StoreProductExtendedDTO,
  type StoreProductDTO
} from '@/stores/storeProductEditor'
import StoreProductCreateDialog from '@/components/StoreProductEditor/StoreProductCreateDialog.vue'
import StoreProductDeleteDialog from './StoreProductDeleteDialog.vue'
import StoreProductUpdateDialog from './StoreProductUpdateDialog.vue'

export default {
  components: {
    StoreProductCreateDialog,
    StoreProductDeleteDialog,
    StoreProductUpdateDialog
  },
  mounted() {
    this.getAllProducts(this.jwt_token, 'product_name')
  },
  data() {
    return {
      sortBy: '',
      sortOptions: ['products_nubmer', 'product_name', 'selling_price', '']
    }
  },
  computed: {
    ...mapWritableState(useStoreProductEditorStore, [
      'isCreateDialogOpen',
      'chosenItem',
      'isDeleteDialogOpen',
      'isUpdateDialogOpen'
    ]),
    ...mapState(useLoginStore, ['jwt_token']),
    ...mapState(useStoreProductEditorStore, ['storeProducts']),
    tableHeight() {
      return window.innerHeight * 0.5
    }
  },
  methods: {
    ...mapActions(useStoreProductEditorStore, ['getAll']),
    ...mapActions(useProductEditorStore, {
      getAllProducts: 'getAll'
    }),
    async search() {
      let isOk: boolean
      isOk = await this.getAll(this.jwt_token, this.sortBy)
      if (!isOk) alert('The error happened')
    },
    create() {
      this.isCreateDialogOpen = true
    },
    deleteRequest(item: StoreProductExtendedDTO) {
      this.chosenItem = item
      this.isDeleteDialogOpen = true
    },
    updateRequest(item: StoreProductExtendedDTO) {
      this.chosenItem = { ...item }
      this.isUpdateDialogOpen = true
    }
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
