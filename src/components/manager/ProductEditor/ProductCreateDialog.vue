<template>
  <v-dialog v-model="isCreateDialogOpen" width="400">
    <v-card>
      <v-card-text> Create Product </v-card-text>
      <v-card-item>
        <v-form @submit.prevent>
          <v-text-field v-model="product_name" label="product_name"></v-text-field>
          <v-text-field v-model="charachteristics" label="charachteristics"></v-text-field>
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
        <v-btn color="green" @click="createRequest">Create</v-btn>
        <v-btn color="grey" @click="closeDialog">Discard</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useCategoryEditorStore, type CategoryDTO } from '@/stores/categoryEditor'
import { useLoginStore } from '@/stores/login'
import { useProductEditorStore } from '@/stores/productEditor'

export default {
  data: () => ({
    categoryChosen: {
      category_name: '',
      category_number: 0
    } as CategoryDTO,
    product_name: '',
    charachteristics: ''
  }),
  computed: {
    ...mapState(useCategoryEditorStore, ['categories']),
    ...mapState(useLoginStore, ['jwt_token']),
    ...mapWritableState(useProductEditorStore, ['isCreateDialogOpen'])
  },
  methods: {
    ...mapActions(useProductEditorStore, ['create']),
    async createRequest() {
      const formIsNotFilled =
        this.product_name.length == 0 || this.categoryChosen.category_number <= 0
      if (formIsNotFilled) return
      const isOk = await this.create(this.jwt_token, {
        product_name: this.product_name,
        charachteristics: this.charachteristics,
        category_name: this.categoryChosen.category_name,
        category_number: this.categoryChosen.category_number,
        id_product: 0
      })
      if (isOk) this.closeDialog()
      else {
        alert('The error happened')
      }
    },
    closeDialog() {
      this.categoryChosen = {
        category_name: '',
        category_number: 0
      } as CategoryDTO
      this.charachteristics = ''
      this.product_name = ''
      this.isCreateDialogOpen = false
    }
  }
}
</script>
<style lang=""></style>
