<template>
  <CustomerCardCreateDialog />
  <CustomerCardUpdateDialog />
  <div class="editor-block v-container pa-5">
    <v-card class="mb-5">
      <v-card-title class="text-h4 font-weight-bold">Customer Card</v-card-title>
      <v-card-action class="d-flex">
        <v-text-field
          v-model="customerSurname"
          density="compact"
          class="sort-by ml-2"
          label="Customer surname"
        ></v-text-field>
        <v-btn @click="searchBySurnameRequest" size="large" class="mb-5 mt-0 bg-blue"
          >Search by customer's surname</v-btn
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
        <v-btn @click="search" size="large" class="mb-5 mt-0 mx-5 bg-blue">Search</v-btn>
        <v-btn @click="create" size="large" class="mb-5 mt-0 bg-green">Create New</v-btn>
      </v-card-actions>
    </v-card>

    <v-table :height="tableHeight" hover fixed-header density="compact" class="data-table mt-5">
      <thead>
        <tr>
          <th>Card Number</th>
          <th>Cardholder Name</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Discount %</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody v-if="customerCards.length != 0">
        <tr v-for="item in customerCards" :key="item.card_number">
          <td>{{ item.card_number }}</td>
          <td>{{ item.cust_name }} {{ item.cust_surname }} {{ item.cust_patronimic }}</td>
          <td>{{ item.phone_number }}</td>
          <td>{{ item.city }} {{ item.street }} {{ item.zip_code }}</td>
          <td>{{ item.percent }}</td>
          <td>
            <v-btn size="small" @click="updateRequest(item)" class="bg-orange">Update</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script lang="ts">
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useLoginStore } from '@/stores/login'
import { useCustomerCardEditorStore, type CustomerCardDTO } from '@/stores/customerCardEditor'
import CustomerCardCreateDialog from './CustomerCardCreateDialog.vue'
import CustomerCardUpdateDialog from './CustomerCardUpdateDialog.vue'

export default {
  components: {
    CustomerCardCreateDialog,
    CustomerCardUpdateDialog
  },
  data() {
    return {
      sortBy: '',
      sortOptions: ['cust_surname', 'percent', ''],
      customerSurname: ''
    }
  },
  computed: {
    ...mapWritableState(useCustomerCardEditorStore, [
      'isCreateDialogOpen',
      'chosenItem',
      'isUpdateDialogOpen'
    ]),
    ...mapState(useCustomerCardEditorStore, ['customerCards']),
    ...mapState(useLoginStore, ['jwt_token']),
    tableHeight() {
      return window.innerHeight * 0.5
    }
  },
  methods: {
    ...mapActions(useCustomerCardEditorStore, ['getAll', 'getAllBySurname']),
    async search() {
      let isOk: boolean
      isOk = await this.getAll(this.jwt_token, this.sortBy)
      if (!isOk) alert('The error happened')
    },
    create() {
      this.isCreateDialogOpen = true
    },
    updateRequest(item: CustomerCardDTO) {
      this.chosenItem = { ...item }
      this.isUpdateDialogOpen = true
    },
    async searchBySurnameRequest() {
      let isOk: boolean
      isOk = await this.getAllBySurname(this.jwt_token, this.customerSurname)
      if (!isOk) alert('The error happened')
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
</style>
