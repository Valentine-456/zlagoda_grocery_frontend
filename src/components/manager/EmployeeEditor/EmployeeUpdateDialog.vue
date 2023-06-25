<template>
  <v-dialog v-model="isUpdateDialogOpen" width="400">
    <v-card>
      <v-card-text> Update Customer Card </v-card-text>
      <v-card-item>
        <v-form @submit.prevent>
          <v-text-field v-model="chosenItem.id_employee" :readonly="true" label="ID"></v-text-field>
          <v-text-field v-model="chosenItem.empl_name" label="Name"></v-text-field>
          <v-text-field v-model="chosenItem.empl_surname" label="Surname"></v-text-field>
          <v-text-field v-model="chosenItem.empl_patronimic" label="Patronimic"></v-text-field>
          <v-text-field
            v-model="chosenItem.salary"
            prefix="$"
            label="Salary"
            :min="0"
            type="number"
          ></v-text-field>
          <v-select
            v-model="roleChosen"
            density="compact"
            :items="selectRoles"
            label="Choose a position"
          ></v-select>
          <v-text-field v-model="chosenItem.phone_number" label="Phone Number"></v-text-field>
          <v-text-field v-model="chosenItem.city" label="City"></v-text-field>
          <v-text-field v-model="chosenItem.street" label="Street"></v-text-field>
          <v-text-field v-model="chosenItem.zip_code" label="Zip-code"></v-text-field>
          <v-card-text class="text-medium-emphasis text-caption">
            Warning: If you donn't want to change password, just leave this field empty. Otherwise
            put a new password here.
          </v-card-text>
          <v-text-field v-model="newPossiblePass" label="Password"></v-text-field>
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
import { useEmployeeEditorStore, type EmployeeDTO } from '@/stores/employeeEditor'

export default {
  data: () => ({
    roleChosen: '',
    newPossiblePass: '',
    selectRoles: ['CASHIER', 'MANAGER']
  }),
  computed: {
    ...mapWritableState(useEmployeeEditorStore, ['isUpdateDialogOpen', 'chosenItem']),
    ...mapState(useLoginStore, ['jwt_token'])
  },
  methods: {
    ...mapActions(useEmployeeEditorStore, ['update']),
    async updateRequest() {
      const formIsNotFilled =
        this.chosenItem.id_employee.length == 0 ||
        this.chosenItem.empl_name.length == 0 ||
        this.chosenItem.empl_surname.length == 0 ||
        this.chosenItem.phone_number.length == 0 ||
        this.roleChosen.length == 0 ||
        this.chosenItem.city.length == 0 ||
        this.chosenItem.street.length == 0 ||
        this.chosenItem.zip_code.length == 0 ||
        this.chosenItem.salary <= 0
      if (formIsNotFilled) return

      const passToChange =
        this.newPossiblePass.trim().length > 0 ? this.newPossiblePass.trim() : null
      const isOk = await this.update(this.jwt_token, {
        ...this.chosenItem,
        pass: passToChange,
        empl_role: this.roleChosen
      })
      if (isOk) this.closeDialog()
      else {
        alert('The error happened')
      }
    },
    closeDialog() {
      this.chosenItem = {} as EmployeeDTO
      this.newPossiblePass = ''
      this.roleChosen = ''
      this.isUpdateDialogOpen = false
    }
  }
}
</script>
<style lang=""></style>
