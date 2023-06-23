<template>
  <v-dialog v-model="isCreateDialogOpen" width="400">
    <v-card>
      <v-card-text> Create Category </v-card-text>
      <v-card-item>
        <v-form @submit.prevent>
          <v-text-field v-model="category_name" label="category_name"></v-text-field>
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
import { useCategoryEditorStore } from '@/stores/categoryEditor'
import { useLoginStore } from '@/stores/login'

export default {
  data: () => ({
    category_name: ''
  }),
  computed: {
    ...mapWritableState(useCategoryEditorStore, ['isCreateDialogOpen']),
    ...mapState(useLoginStore, ['jwt_token'])
  },
  methods: {
    ...mapActions(useCategoryEditorStore, ['create']),
    async createRequest() {
      if (this.category_name.length == 0) return
      const isOk = await this.create(this.jwt_token, this.category_name)
      if (isOk) this.closeDialog()
      else {
        alert('The error happened')
      }
    },
    closeDialog() {
      this.category_name = ''
      this.isCreateDialogOpen = false
    }
  }
}
</script>
<style lang=""></style>
