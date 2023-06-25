<template>
  <v-dialog v-model="isGetOneDialogOpen" width="400">
    <v-card>
      <v-card-text> Update Customer Card </v-card-text>
      <v-card-item>
        <v-card-title v-if="checkIfChosenItemIsEmpty"
          >No Employee were found<br />
          with this ID!</v-card-title
        >
        <v-form v-else @submit.prevent>
          <v-text-field v-model="chosenItem.id_employee" :readonly="true" label="ID"></v-text-field>
          <v-text-field v-model="chosenItem.empl_name" :readonly="true" label="Name"></v-text-field>
          <v-text-field
            v-model="chosenItem.empl_surname"
            :readonly="true"
            label="Surname"
          ></v-text-field>
          <v-text-field
            v-model="chosenItem.empl_patronimic"
            :readonly="true"
            label="Patronimic"
          ></v-text-field>
          <v-text-field
            v-model="chosenItem.phone_number"
            :readonly="true"
            label="Phone Number"
          ></v-text-field>
          <v-text-field v-model="chosenItem.city" :readonly="true" label="City"></v-text-field>
          <v-text-field v-model="chosenItem.street" :readonly="true" label="Street"></v-text-field>
          <v-text-field
            v-model="chosenItem.zip_code"
            :readonly="true"
            label="Zip-code"
          ></v-text-field>
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
import { useEmployeeEditorStore, type EmployeeDTO } from '@/stores/employeeEditor'

export default {
  data: () => ({}),
  computed: {
    ...mapWritableState(useEmployeeEditorStore, ['isGetOneDialogOpen', 'chosenItem']),
    ...mapState(useLoginStore, ['jwt_token']),
    checkIfChosenItemIsEmpty() {
      return Object.keys(this.chosenItem).length == 0
    }
  },
  methods: {
    closeDialog() {
      this.chosenItem = {} as EmployeeDTO
      this.isGetOneDialogOpen = false
    }
  }
}
</script>
<style lang=""></style>
