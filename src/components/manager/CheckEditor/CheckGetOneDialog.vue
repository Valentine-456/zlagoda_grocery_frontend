<template>
  <v-dialog v-model="isGetOneDialogOpen" width="700">
    <v-card>
      <v-card-text>Check</v-card-text>
      <v-card-item>
        <v-card-title v-if="checkIfChosenItemIsEmpty">
          No Check were found<br />with this ID!
        </v-card-title>
        <v-form v-else @submit.prevent>
          <v-text-field
            v-model="chosenItem.check_number"
            :readonly="true"
            label="Check Number"
          ></v-text-field>
          <v-text-field
            v-model="chosenItem.id_employee"
            :readonly="true"
            label="Employee ID"
          ></v-text-field>
          <v-text-field
            v-model="chosenItem.card_number"
            :readonly="true"
            label="Card Number"
          ></v-text-field>
          <v-text-field
            v-model="printDateUserFriendly"
            :readonly="true"
            label="Print Date"
          ></v-text-field>
          <v-text-field v-model="chosenItem.sum_total" :readonly="true" label="Sum"></v-text-field>
          <v-text-field v-model="chosenItem.vat" :readonly="true" label="VAT"></v-text-field>

          <v-table hover fixed-header density="compact" class="data-table mt-5">
            <thead>
              <tr>
                <th>UPC</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Characteristics</th>
                <th>Promotional</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody v-if="chosenItem.sales.length != 0">
              <tr v-for="item in chosenItem.sales" :key="item.upc">
                <td>{{ item.upc }}</td>
                <td>{{ item.product_name }}</td>
                <td>{{ item.product_number }}</td>
                <td>{{ item.charachteristics }}</td>
                <td>{{ item.promotional_product }}</td>
                <td>{{ item.selling_price }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-form>
      </v-card-item>
      <v-card-actions>
        <v-btn color="grey" @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { mapState, mapWritableState } from 'pinia'
import { useLoginStore } from '@/stores/login'
import { useCheckEditorStore, type CheckExtendedDTO } from '@/stores/checkEditor'

export default {
  data: () => ({}),
  computed: {
    ...mapWritableState(useCheckEditorStore, ['isGetOneDialogOpen', 'chosenItem']),
    ...mapState(useLoginStore, ['jwt_token']),
    checkIfChosenItemIsEmpty() {
      return Object.keys(this.chosenItem).length == 0
    },
    printDateUserFriendly() {
      return new Date(this.chosenItem.print_date).toDateString()
    }
  },
  methods: {
    closeDialog() {
      this.chosenItem = {} as CheckExtendedDTO
      this.isGetOneDialogOpen = false
    }
  }
}
</script>
<style lang=""></style>
