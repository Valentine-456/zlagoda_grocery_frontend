<template>
  <v-dialog v-model="isCreateDialogOpen" width="400">
    <v-card>
      <v-card-text> Create Store Product </v-card-text>
      <v-card-item>
        <v-form @submit.prevent>
          <v-text-field v-model="UPC" label="UPC code"></v-text-field>
          <v-text-field
            v-model="selling_price"
            prefix="$"
            label="selling price"
            :min="0"
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="products_nubmer"
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
        <v-btn color="green" @click="createRequest">Create</v-btn>
        <v-btn color="grey" @click="closeDialog">Discard</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useLoginStore } from '@/stores/login'
import { useProductEditorStore, type ProductDTO } from '@/stores/productEditor'
import { useStoreProductEditorStore } from '@/stores/storeProductEditor'

export default {
  data: () => ({
    productChosen: {
      product_name: '',
      id_product: 0
    } as ProductDTO,
    UPC: '',
    selling_price: 0,
    products_nubmer: 0
  }),
  computed: {
    ...mapState(useProductEditorStore, ['products']),
    ...mapState(useLoginStore, ['jwt_token']),
    ...mapWritableState(useStoreProductEditorStore, ['isCreateDialogOpen'])
  },
  methods: {
    ...mapActions(useStoreProductEditorStore, ['create']),
    async createRequest() {
      const formIsNotFilled =
        this.UPC.length == 0 ||
        this.selling_price == 0 ||
        this.products_nubmer == 0 ||
        this.productChosen.id_product == 0

      if (formIsNotFilled) return
      const isOk = await this.create(this.jwt_token, {
        UPC: this.UPC,
        id_product: this.productChosen.id_product,
        products_nubmer: this.products_nubmer,
        selling_price: this.selling_price
      })
      if (isOk) this.closeDialog()
      else {
        alert('The error happened')
      }
    },
    closeDialog() {
      this.productChosen = {
        product_name: '',
        id_product: 0
      } as ProductDTO
      this.products_nubmer = 0
      this.selling_price = 0
      this.UPC = ''
      this.isCreateDialogOpen = false
    }
  }
}
</script>
<style lang=""></style>
