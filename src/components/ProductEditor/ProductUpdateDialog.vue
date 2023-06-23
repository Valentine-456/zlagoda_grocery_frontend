<template>
  <v-dialog v-model="isUpdateDialogOpen" width="400">
    <v-card>
      <v-card-text> Update Product </v-card-text>
      <v-card-item>
        <v-form @submit.prevent>
          <v-text-field v-model="chosenItem.product_name" label="product_name"></v-text-field>
          <v-text-field
            v-model="chosenItem.charachteristics"
            label="charachteristics"
          ></v-text-field>
          <v-select
            v-model="categoryChosen"
            :items="categories"
            item-title="category_name"
            item-value="category_number"
            label="Category"
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
import { useCategoryEditorStore } from '@/stores/categoryEditor'
import { useLoginStore } from '@/stores/login'
import { useProductEditorStore, type ProductDTO } from '@/stores/productEditor'

export default {
  data: () => ({}),
  computed: {
    ...mapWritableState(useProductEditorStore, ['isUpdateDialogOpen', 'chosenItem']),
    ...mapState(useLoginStore, ['jwt_token']),
    ...mapState(useCategoryEditorStore, ['categories']),
    categoryChosen() {
      return this.categories.find((el) => el.category_number == this.chosenItem.category_number)
    }
  },
  methods: {
    ...mapActions(useProductEditorStore, ['update']),
    async updateRequest() {
      let formIsNotCompleted = this.chosenItem.category_name.length == 0
      if (formIsNotCompleted) return
      const isOk = await this.update(this.jwt_token, this.chosenItem)
      if (isOk) this.closeDialog()
      else {
        alert('The error happened')
      }
    },
    closeDialog() {
      this.chosenItem = {} as ProductDTO
      this.isUpdateDialogOpen = false
    }
  }
}
</script>
<style lang=""></style>
