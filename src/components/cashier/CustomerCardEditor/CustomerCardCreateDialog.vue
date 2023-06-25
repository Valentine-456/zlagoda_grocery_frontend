<template>
  <v-dialog v-model="isCreateDialogOpen" width="400">
    <v-card>
      <v-card-text> Create Customer Card </v-card-text>
      <v-card-item>
        <v-form @submit.prevent>
          <v-text-field v-model="card_number" label="Card number"></v-text-field>
          <v-text-field v-model="cust_name" label="Name"></v-text-field>
          <v-text-field v-model="cust_surname" label="Surname"></v-text-field>
          <v-text-field v-model="cust_patronimic" label="Patronimic"></v-text-field>
          <v-text-field
            v-model="percent"
            prefix="%"
            label="Discount"
            :min="0"
            type="number"
          ></v-text-field>
          <v-text-field v-model="phone_number" label="Phone Number"></v-text-field>
          <v-text-field v-model="city" label="City"></v-text-field>
          <v-text-field v-model="street" label="Street"></v-text-field>
          <v-text-field v-model="zip_code" label="Zip-code"></v-text-field>
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
import { useCustomerCardEditorStore } from '@/stores/customerCardEditor'

export default {
  data: () => ({
    card_number: '',
    cust_name: '',
    cust_surname: '',
    cust_patronimic: '',
    phone_number: '',
    city: '',
    street: '',
    zip_code: '',
    percent: 0
  }),
  computed: {
    ...mapState(useLoginStore, ['jwt_token']),
    ...mapWritableState(useCustomerCardEditorStore, ['isCreateDialogOpen'])
  },
  methods: {
    ...mapActions(useCustomerCardEditorStore, ['create']),
    async createRequest() {
      const formIsNotFilled =
        this.card_number.length == 0 ||
        this.cust_name.length == 0 ||
        this.cust_surname.length == 0 ||
        this.phone_number.length == 0 ||
        this.percent <= 0

      if (formIsNotFilled) return
      const isOk = await this.create(this.jwt_token, {
        card_number: this.card_number,
        cust_name: this.cust_name,
        cust_surname: this.cust_surname,
        cust_patronimic: this.cust_patronimic || null,
        phone_number: this.phone_number,
        percent: this.percent,
        street: this.street || null,
        city: this.city || null,
        zip_code: this.zip_code || null
      })
      if (isOk) this.closeDialog()
      else {
        alert('The error happened')
      }
    },
    closeDialog() {
      this.card_number = ''
      this.cust_name = ''
      this.cust_surname = ''
      this.cust_patronimic = ''
      this.phone_number = ''
      this.city = ''
      this.street = ''
      this.zip_code = ''
      this.percent = 0
      this.isCreateDialogOpen = false
    }
  }
}
</script>
<style lang=""></style>
