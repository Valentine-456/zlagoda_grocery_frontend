<template>
  <StoreProductGetOneDialog />
  <div class="editor-block v-container pa-5">
    <v-card class="mb-5">
      <v-card-title class="text-h4 font-weight-bold">Store Product</v-card-title>
      <v-card-action class="d-flex">
        <v-text-field
          v-model="findByUPC"
          density="compact"
          class="find-one"
          label="UPC code"
        ></v-text-field>
        <v-btn @click="findByUPCRequest" size="large" class="mb-5 mt-0 mx-5 bg-blue"
          >Search by UPC</v-btn
        >
      </v-card-action>
      <v-card-actions class="d-flex">
        <v-select
          v-model="sortBy"
          density="compact"
          class="sort-by"
          :items="sortOptions"
          label="Sort By"
        ></v-select>
        <v-select
          v-model="promotionFilter"
          density="compact"
          class="sort-by"
          :items="promotionFilterOptions"
          label="Promotion Filter"
        ></v-select>
        <v-btn @click="search" size="large" class="mb-5 mt-0 mx-5 bg-blue">Search</v-btn>
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
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script lang="ts">
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useProductEditorStore } from '@/stores/productEditor'
import { useLoginStore } from '@/stores/login'
import { useStoreProductEditorStore } from '@/stores/storeProductEditor'
import StoreProductGetOneDialog from './StoreProductGetOneDialog.vue'

export default {
  components: {
    StoreProductGetOneDialog
  },
  mounted() {
    this.getAllProducts(this.jwt_token, 'product_name')
  },
  data() {
    return {
      findByUPC: '',
      sortBy: '',
      sortOptions: ['products_nubmer', 'product_name', 'selling_price', ''],
      promotionFilter: 'Any',
      promotionFilterOptions: ['promotional', 'nonpromotional', 'Any']
    }
  },
  computed: {
    ...mapWritableState(useStoreProductEditorStore, ['chosenItem', 'isGetOneDialogOpen']),
    ...mapState(useLoginStore, ['jwt_token']),
    ...mapState(useStoreProductEditorStore, ['storeProducts']),
    tableHeight() {
      return window.innerHeight * 0.5
    }
  },
  methods: {
    ...mapActions(useStoreProductEditorStore, ['getAll', 'getOne']),
    ...mapActions(useProductEditorStore, {
      getAllProducts: 'getAll'
    }),
    async search() {
      let isOk: boolean
      isOk = await this.getAll(this.jwt_token, this.sortBy, this.promotionFilter)
      if (!isOk) alert('The error happened')
    },
    async findByUPCRequest() {
      await this.getOne(this.jwt_token, this.findByUPC)
      this.isGetOneDialogOpen = true
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

.find-one {
  max-width: 300px;
  margin-right: 20px;
  margin-left: 8px;
}
</style>
