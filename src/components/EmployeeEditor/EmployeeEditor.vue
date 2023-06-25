<template>
  <EmployeeCreateDialog />
  <EmployeeDeleteDialog />
  <EmployeeUpdateDialog />
  <EmployeeGetOneDialog />
  <div class="editor-block v-container pa-5">
    <v-card class="mb-5">
      <v-card-title class="text-h4 font-weight-bold">Employee</v-card-title>
      <v-card-action class="d-flex">
        <v-text-field
          v-model="findBySurname"
          density="compact"
          class="find-one"
          label="Surname"
        ></v-text-field>
        <v-btn @click="findBySurnameRequest" size="large" class="mb-5 mt-0 mx-5 bg-blue"
          >Search by Surname</v-btn
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
        <v-select
          v-model="roleFilter"
          density="compact"
          class="sort-by"
          :items="roleFilterOptions"
          label="Role Filter"
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
import EmployeeGetOneDialog from './EmployeeGetOneDialog.vue'

export default {
  components: {
    EmployeeCreateDialog,
    EmployeeDeleteDialog,
    EmployeeUpdateDialog,
    EmployeeGetOneDialog
  },
  data() {
    return {
      sortBy: '',
      sortOptions: ['empl_surname', 'salary', ''],
      roleFilterOptions: ['Any', 'MANAGER', 'CASHIER'],
      roleFilter: 'Any',
      findBySurname: ''
    }
  },
  computed: {
    ...mapWritableState(useEmployeeEditorStore, [
      'isCreateDialogOpen',
      'chosenItem',
      'isDeleteDialogOpen',
      'isUpdateDialogOpen',
      'isGetOneDialogOpen'
    ]),
    ...mapState(useEmployeeEditorStore, ['employees']),
    ...mapState(useLoginStore, ['jwt_token']),
    tableHeight() {
      return window.innerHeight * 0.5
    }
  },
  methods: {
    ...mapActions(useEmployeeEditorStore, ['getAll', 'GetOneBySurname']),
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
    },
    async findBySurnameRequest() {
      await this.GetOneBySurname(this.jwt_token, this.findBySurname)
      this.isGetOneDialogOpen = true
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

.find-one {
  max-width: 300px;
  margin-right: 20px;
  margin-left: 8px;
}
</style>
