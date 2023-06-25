<template>
  <v-dialog v-model="isCreateDialogOpen" width="700">
    <v-card>
      <v-card-text>Check</v-card-text>
      <v-card-item>
        <v-form @submit.prevent>
          <v-text-field v-model="check_number" label="Check Number"></v-text-field>
          <v-text-field v-model="card_number" label="Card Number"></v-text-field>
          <v-text-field
            v-model="printDate"
            class="sort-by"
            label="Print date"
            type="date"
          ></v-text-field>
          <v-table hover fixed-header density="compact" class="data-table mt-5">
            <thead>
              <tr>
                <th>UPC</th>
                <th>Quantity</th>
                <th>Name</th>
              </tr>
              <tr>
                <th>
                  <v-text-field v-model="newUPC" class="sales-input" label="UPC"></v-text-field>
                </th>
                <th>
                  <v-text-field
                    class="sales-input"
                    v-model="newQuantity"
                    label="Quantity"
                    :min="1"
                    type="number"
                  ></v-text-field>
                </th>
                <th>
                  <v-btn @click="addSales">Add</v-btn>
                </th>
              </tr>
            </thead>
            <tbody v-if="sales.length != 0">
              <tr v-for="item in sales" :key="item.upc">
                <td>{{ item.upc }}</td>
                <td>{{ item.product_number }}</td>
                <td>{{ item.product_name }}</td>
              </tr>
            </tbody>
          </v-table>
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
import { useCheckEditorStore, type CheckExtendedDTO } from '@/stores/checkEditor'
import { useStoreProductEditorStore } from '@/stores/storeProductEditor'

export default {
  data: () => ({
    check_number: '',
    card_number: '',
    printDate: new Date()
      .toLocaleString('en-GB', { month: '2-digit', day: '2-digit', year: 'numeric' })
      .split('/')
      .reverse()
      .join('-'),
    sales: [] as Array<{
      upc: string
      product_number: number
      product_name: string
    }>,
    newUPC: '',
    newQuantity: 1
  }),
  computed: {
    ...mapWritableState(useCheckEditorStore, ['isCreateDialogOpen']),
    ...mapState(useLoginStore, ['jwt_token', 'id_employee']),
    ...mapState(useStoreProductEditorStore, ['storeProducts'])
  },
  methods: {
    ...mapActions(useCheckEditorStore, ['create']),
    addSales() {
      this.sales.push({
        upc: this.newUPC,
        product_number: this.newQuantity,
        product_name: this.storeProducts.find((i) => i.upc == this.newUPC)?.product_name || ''
      })
      this.newQuantity = 1
      this.newUPC = ''
    },
    async createRequest() {
      const formIsNotFilled = this.check_number.length == 0 || this.sales.length == 0
      if (formIsNotFilled) return

      const isOk = await this.create(this.jwt_token, {
        card_number: this.card_number.trim() || null,
        id_employee: this.id_employee,
        check_number: this.check_number,
        print_date: this.printDate.split('-').join('/'),
        sales: this.sales.map((item) => ({
          ...item,
          selling_price: 0,
          promotional_product: false,
          charachteristics: ''
        })),
        sum_total: 0,
        vat: 0
      })
      if (isOk) this.closeDialog()
      else {
        alert('The error happened')
      }
    },
    closeDialog() {
      this.check_number = ''
      this.card_number = ''
      this.printDate = new Date()
        .toLocaleString('en-GB', { month: '2-digit', day: '2-digit', year: 'numeric' })
        .split('/')
        .reverse()
        .join('-')
      this.sales = []
      this.newUPC = ''
      this.newQuantity = 1
      this.isCreateDialogOpen = false
    }
  }
}
</script>
<style>
.sales-input {
  max-width: 150px;
}
</style>
