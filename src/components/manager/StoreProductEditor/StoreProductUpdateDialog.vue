<template>
  <v-dialog v-model="isUpdateDialogOpen" width="400">
    <v-card>
      <v-card-text> Update Store Product </v-card-text>
      <v-card-item>
        <v-form @submit.prevent>
          <v-text-field v-model="chosenItem.upc" label="UPC code"></v-text-field>
          <v-text-field
            v-model="chosenItem.selling_price"
            prefix="$"
            label="selling price"
            :min="0"
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="chosenItem.products_nubmer"
            label="products nubmer"
            :min="0"
            type="number"
          ></v-text-field>
          <v-select
            v-model="productChosen"
            :items="products"
            item-title="product_name"
            item-value="id_product"
            label="Associated product"
            persistent-hint
            return-object
            single-line
          ></v-select>
        </v-form>
      </v-card-item>
      <v-card-actions>
        <v-btn color="orange" @click="updateRequest">Update</v-btn>
        <v-btn color="grey" @click="closeDialog">Discard</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useLoginStore } from '@/stores/login'
import { useProductEditorStore, type ProductDTO } from '@/stores/productEditor'
import {
  useStoreProductEditorStore,
  type StoreProductExtendedDTO
} from '@/stores/storeProductEditor'

export default {
  data: () => ({
    productChosen: {
      id_product: 0,
      product_name: ''
    } as ProductDTO
  }),
  computed: {
    ...mapWritableState(useStoreProductEditorStore, ['isUpdateDialogOpen', 'chosenItem']),
    ...mapState(useLoginStore, ['jwt_token']),
    ...mapState(useProductEditorStore, ['products'])
  },
  methods: {
    ...mapActions(useStoreProductEditorStore, ['update']),
    async updateRequest() {
      const formIsNotFilled =
        this.chosenItem.upc.length == 0 ||
        this.chosenItem.selling_price == 0 ||
        this.chosenItem.products_nubmer == 0 ||
        this.productChosen.id_product == 0

      if (formIsNotFilled) return
      const isOk = await this.update(this.jwt_token, {
        ...this.chosenItem,
        id_product: this.productChosen.id_product
      })
      if (isOk) this.closeDialog()
      else {
        alert('The error happened')
      }
    },
    closeDialog() {
      this.chosenItem = {} as StoreProductExtendedDTO
      this.isUpdateDialogOpen = false
    }
  }
}
</script>
<style lang=""></style>
