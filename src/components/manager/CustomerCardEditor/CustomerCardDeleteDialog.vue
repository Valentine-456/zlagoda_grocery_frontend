<template>
  <v-dialog v-model="isDeleteDialogOpen" width="400">
    <v-card>
      <v-card-text> Delete Customer Card </v-card-text>
      <v-card-item>
        <p>Are you sure you want to delete this customer card?</p>
      </v-card-item>
      <v-card-actions>
        <v-btn color="red" @click="deleteRequest">Delete</v-btn>
        <v-btn color="grey" @click="closeDialog">Discard</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useCustomerCardEditorStore, type CustomerCardDTO } from '@/stores/customerCardEditor'
import { useLoginStore } from '@/stores/login'

export default {
  data: () => ({}),
  computed: {
    ...mapWritableState(useCustomerCardEditorStore, ['isDeleteDialogOpen', 'chosenItem']),
    ...mapState(useLoginStore, ['jwt_token'])
  },
  methods: {
    ...mapActions(useCustomerCardEditorStore, ['delete']),
    async deleteRequest() {
      const isOk = await this.delete(this.jwt_token, this.chosenItem.card_number)
      if (isOk) this.closeDialog()
      else {
        alert('The error happened')
      }
    },
    closeDialog() {
      this.chosenItem = {} as CustomerCardDTO
      this.isDeleteDialogOpen = false
    }
  }
}
</script>
<style lang=""></style>
