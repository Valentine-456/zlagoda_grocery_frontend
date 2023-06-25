<template>
  <v-dialog v-model="isUpdateDialogOpen" width="400">
    <v-card>
      <v-card-text> Update Customer Card </v-card-text>
      <v-card-item>
        <v-form @submit.prevent>
          <v-text-field v-model="chosenItem.card_number" label="Card number"></v-text-field>
          <v-text-field v-model="chosenItem.cust_name" label="Name"></v-text-field>
          <v-text-field v-model="chosenItem.cust_surname" label="Surname"></v-text-field>
          <v-text-field v-model="chosenItem.cust_patronimic" label="Patronimic"></v-text-field>
          <v-text-field
            v-model="chosenItem.percent"
            prefix="%"
            label="Discount"
            :min="0"
            type="number"
          ></v-text-field>
          <v-text-field v-model="chosenItem.phone_number" label="Phone Number"></v-text-field>
          <v-text-field v-model="chosenItem.city" label="City"></v-text-field>
          <v-text-field v-model="chosenItem.street" label="Street"></v-text-field>
          <v-text-field v-model="chosenItem.zip_code" label="Zip-code"></v-text-field>
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
import { useCustomerCardEditorStore, type CustomerCardDTO } from '@/stores/customerCardEditor'

export default {
  data: () => ({}),
  computed: {
    ...mapWritableState(useCustomerCardEditorStore, ['isUpdateDialogOpen', 'chosenItem']),
    ...mapState(useLoginStore, ['jwt_token'])
  },
  methods: {
    ...mapActions(useCustomerCardEditorStore, ['update']),
    async updateRequest() {
      const formIsNotFilled =
        this.chosenItem.card_number.length == 0 ||
        this.chosenItem.cust_name.length == 0 ||
        this.chosenItem.cust_surname.length == 0 ||
        this.chosenItem.phone_number.length == 0 ||
        this.chosenItem.percent <= 0

      if (formIsNotFilled) return
      const isOk = await this.update(this.jwt_token, {
        ...this.chosenItem
      })
      if (isOk) this.closeDialog()
      else {
        alert('The error happened')
      }
    },
    closeDialog() {
      this.chosenItem = {} as CustomerCardDTO
      this.isUpdateDialogOpen = false
    }
  }
}
</script>
<style lang=""></style>
