<template>
  <v-dialog v-model="isCreateDialogOpen" width="400">
    <v-card>
      <v-card-text> Create Employee </v-card-text>
      <v-card-item>
        <v-form @submit.prevent>
          <v-text-field v-model="id_employee" label="ID"></v-text-field>
          <v-text-field v-model="empl_name" label="Name"></v-text-field>
          <v-text-field v-model="empl_surname" label="Surname"></v-text-field>
          <v-text-field v-model="empl_patronimic" label="Patronimic"></v-text-field>
          <v-text-field
            v-model="salary"
            prefix="$"
            label="Salary"
            :min="0"
            type="number"
          ></v-text-field>
          <v-select
            v-model="empl_role"
            density="compact"
            :items="selectRoles"
            label="Choose a position"
          ></v-select>
          <v-text-field v-model="phone_number" label="Phone Number"></v-text-field>
          <v-text-field v-model="city" label="City"></v-text-field>
          <v-text-field v-model="street" label="Street"></v-text-field>
          <v-text-field v-model="zip_code" label="Zip-code"></v-text-field>
          <v-text-field v-model="pass" label="Password"></v-text-field>
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
import { useEmployeeEditorStore } from '@/stores/employeeEditor'

export default {
  data: () => ({
    id_employee: '',
    empl_name: '',
    empl_surname: '',
    empl_patronimic: '',
    empl_role: '',
    salary: 0,
    date_of_birth: new Date('1995-12-17T03:24:00'),
    date_of_start: new Date(),
    phone_number: '',
    city: '',
    street: '',
    zip_code: '',
    pass: '',
    selectRoles: ['CASHIER', 'MANAGER']
  }),
  computed: {
    ...mapState(useLoginStore, ['jwt_token']),
    ...mapWritableState(useEmployeeEditorStore, ['isCreateDialogOpen'])
  },
  methods: {
    ...mapActions(useEmployeeEditorStore, ['create']),
    async createRequest() {
      const formIsNotFilled =
        this.id_employee.length == 0 ||
        this.empl_name.length == 0 ||
        this.empl_surname.length == 0 ||
        this.phone_number.length == 0 ||
        this.empl_role.length == 0 ||
        this.city.length == 0 ||
        this.street.length == 0 ||
        this.zip_code.length == 0 ||
        this.pass.length == 0 ||
        this.salary <= 0

      if (formIsNotFilled) return
      const isOk = await this.create(this.jwt_token, {
        id_employee: this.id_employee,
        empl_name: this.empl_name,
        empl_surname: this.empl_surname,
        empl_patronimic: this.empl_patronimic,
        phone_number: this.phone_number,
        salary: this.salary,
        empl_role: this.empl_role,
        street: this.street,
        city: this.city,
        zip_code: this.zip_code,
        pass: this.pass,
        date_of_birth: this.date_of_birth.toISOString(),
        date_of_start: this.date_of_start.toISOString()
      })
      if (isOk) this.closeDialog()
      else {
        alert('The error happened')
      }
    },
    closeDialog() {
      this.id_employee = ''
      this.empl_name = ''
      this.empl_surname = ''
      this.empl_patronimic = ''
      this.empl_role = ''
      this.salary = 0
      this.date_of_birth = new Date('1995-12-17T03:24:00')
      this.date_of_start = new Date()
      this.phone_number = ''
      this.city = ''
      this.street = ''
      this.zip_code = ''
      this.pass = ''
      this.isCreateDialogOpen = false
    }
  }
}
</script>
<style lang=""></style>
