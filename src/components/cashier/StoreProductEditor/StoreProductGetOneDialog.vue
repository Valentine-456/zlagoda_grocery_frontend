<template>
  <v-dialog v-model="isGetOneDialogOpen" width="400">
    <v-card>
      <v-card-text> Store Product </v-card-text>
      <v-card-item>
        <v-card-title v-if="checkIfChosenItemIsEmpty"
          >No Store product were found<br />
          with this UPC!</v-card-title
        >
        <v-form v-else @submit.prevent>
          <v-text-field :readonly="true" v-model="chosenItem.upc" label="UPC code"></v-text-field>
          <v-select
            :readonly="true"
            v-model="productChosen"
            :items="products"
            item-title="product_name"
            item-value="id_product"
            label="Associated product"
            persistent-hint
            return-object
            single-line
          ></v-select>
          <v-text-field
            :readonly="true"
            v-model="chosenItem.selling_price"
            prefix="$"
            label="selling price"
            :min="0"
            type="number"
          ></v-text-field>
          <v-text-field
            :readonly="true"
            v-model="chosenItem.products_nubmer"
            label="products nubmer"
            :min="0"
            type="number"
          ></v-text-field>
          <v-text-field
            :readonly="true"
            v-model="chosenItem.promotional_product"
            label="Is Promotional"
          ></v-text-field>
          <v-text-field
            :readonly="true"
            v-model="chosenItem.charachteristics"
            label="Charachteristics"
          ></v-text-field>
        </v-form>
      </v-card-item>
      <v-card-actions>
        <v-btn color="grey" @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { mapState, mapWritableState } from 'pinia'
import { useLoginStore } from '@/stores/login'
import { useProductEditorStore, type ProductDTO } from '@/stores/productEditor'
import {
  useStoreProductEditorStore,
  type StoreProductExtendedDTO
} from '@/stores/storeProductEditor'

export default {
  data: () => ({}),
  computed: {
    ...mapWritableState(useStoreProductEditorStore, ['isGetOneDialogOpen', 'chosenItem']),
    ...mapState(useLoginStore, ['jwt_token']),
    ...mapState(useProductEditorStore, ['products']),
    productChosen() {
      return this.products.find((item) => this.chosenItem.id_product == item.id_product)
    },
    checkIfChosenItemIsEmpty() {
      return Object.keys(this.chosenItem).length == 0
    }
  },
  methods: {
    closeDialog() {
      this.chosenItem = {} as StoreProductExtendedDTO
      this.isGetOneDialogOpen = false
    }
  }
}
</script>
<style lang=""></style>
