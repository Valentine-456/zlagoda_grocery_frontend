<template>
  <EmployeeCreateDialog />
  <EmployeeDeleteDialog />
  <EmployeeUpdateDialog />
  <div class="editor-block v-container pa-5">
    <v-card class="mb-5">
      <v-card-title class="text-h4 font-weight-bold">Employee</v-card-title>
      <v-card-actions class="d-flex">
        <v-select
          v-model="sortBy"
          density="compact"
          class="sort-by"
          :items="sortOptions"
          label="Sort By"
        ></v-select>
        <v-select
          v-model="roleFilter"
          density="compact"
          class="sort-by"
          :items="roleFilterOptions"
          label="Category Filter"
        ></v-select>
        <v-btn @click="search" size="large" class="mb-5 mt-0 mx-5 bg-blue">Search</v-btn>
        <v-btn @click="create" size="large" class="mb-5 mt-0 bg-green">Create New</v-btn>
      </v-card-actions>
    </v-card>

    <v-table :height="tableHeight" hover fixed-header density="compact" class="data-table mt-5">
      <thead>
        <tr>
          <th>ID</th>
          <th>Full Name</th>
          <th>Position</th>
          <th>Salary</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody v-if="employees.length != 0">
        <tr v-for="item in employees" :key="item.id_employee">
          <td>{{ item.id_employee }}</td>
          <td>{{ item.empl_name }} {{ item.empl_surname }} {{ item.empl_patronimic || '' }}</td>
          <td>{{ item.empl_role.toLocaleLowerCase() }}</td>
          <td>{{ item.salary }}</td>
          <td>{{ item.phone_number }}</td>
          <td>{{ item.city }}, {{ item.street }}, {{ item.zip_code }}</td>
          <td>
            <v-btn size="small" @click="updateRequest(item)" class="bg-orange">Update</v-btn>
            <v-btn size="small" @click="deleteRequest(item)" class="bg-red">Delete</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script lang="ts">
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useLoginStore } from '@/stores/login'
import { useEmployeeEditorStore, type EmployeeDTO } from '@/stores/employeeEditor'
import EmployeeCreateDialog from './EmployeeCreateDialog.vue'
import EmployeeDeleteDialog from './EmployeeDeleteDialog.vue'
import EmployeeUpdateDialog from './EmployeeUpdateDialog.vue'

export default {
  components: {
    EmployeeCreateDialog,
    EmployeeDeleteDialog,
    EmployeeUpdateDialog
  },
  data() {
    return {
      sortBy: '',
      sortOptions: ['empl_surname', 'salary', ''],
      roleFilterOptions: ['Any', 'MANAGER', 'CASHIER'],
      roleFilter: 'Any'
    }
  },
  computed: {
    ...mapWritableState(useEmployeeEditorStore, [
      'isCreateDialogOpen',
      'chosenItem',
      'isDeleteDialogOpen',
      'isUpdateDialogOpen'
    ]),
    ...mapState(useEmployeeEditorStore, ['employees']),
    ...mapState(useLoginStore, ['jwt_token']),
    tableHeight() {
      return window.innerHeight * 0.5
    }
  },
  methods: {
    ...mapActions(useEmployeeEditorStore, ['getAll']),
    async search() {
      let isOk: boolean
      isOk = await this.getAll(this.jwt_token, this.sortBy, this.roleFilter)
      if (!isOk) alert('The error happened')
    },
    create() {
      this.isCreateDialogOpen = true
    },
    deleteRequest(item: EmployeeDTO) {
      this.chosenItem = { ...item }
      this.isDeleteDialogOpen = true
    },
    updateRequest(item: EmployeeDTO) {
      this.chosenItem = { ...item }
      this.isUpdateDialogOpen = true
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
