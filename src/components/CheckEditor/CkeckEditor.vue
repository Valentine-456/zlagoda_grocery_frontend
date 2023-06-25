<template>
  <!-- <EmployeeCreateDialog />-->
  <CheckDeleteDialog />
  <CheckGetOneDialog />
  <div class="editor-block v-container pa-5">
    <v-card class="mb-5">
      <v-card-title class="text-h4 font-weight-bold">Check</v-card-title>
      <!-- <v-card-action class="d-flex">
          <v-text-field
            v-model="findBySurname"
            density="compact"
            class="find-one"
            label="Surname"
          ></v-text-field>
          <v-btn @click="findBySurnameRequest" size="large" class="mb-5 mt-0 mx-5 bg-blue"
            >Search by Surname</v-btn
          >
        </v-card-action> -->
      <v-card-actions class="d-flex">
        <!-- <v-select
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
          ></v-select> -->
        <v-btn @click="search" size="large" class="mb-5 mt-0 mx-5 bg-blue">Search</v-btn>
        <!-- <v-btn @click="create" size="large" class="mb-5 mt-0 bg-green"></v-btn> -->
      </v-card-actions>
    </v-card>

    <v-table :height="tableHeight" hover fixed-header density="compact" class="data-table mt-5">
      <thead>
        <tr>
          <th>Check No</th>
          <th>Employee ID</th>
          <th>Print Date</th>
          <th>Customer Card</th>
          <th>Sum</th>
          <th>VAT</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody v-if="checks.length != 0">
        <tr v-for="item in checks" :key="item.check_number">
          <td>{{ item.check_number }}</td>
          <td>{{ item.id_employee }}</td>
          <td>{{ new Date(item.print_date).toDateString() }}</td>
          <td>{{ item.card_number || '-' }}</td>
          <td>{{ item.sum_total }}</td>
          <td>{{ item.vat }}</td>
          <td>
            <v-btn size="small" @click="findOneRequest(item)" class="bg-green">More info</v-btn>
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
import { useCheckEditorStore, type CheckDTO } from '@/stores/checkEditor'
//   import { useEmployeeEditorStore, type EmployeeDTO } from '@/stores/employeeEditor'
//   import EmployeeCreateDialog from './EmployeeCreateDialog.vue'
import CheckDeleteDialog from './CheckDeleteDialog.vue'
import CheckGetOneDialog from './CheckGetOneDialog.vue'

export default {
  components: {
    //   EmployeeCreateDialog,
    //   EmployeeDeleteDialog,
    CheckDeleteDialog,
    CheckGetOneDialog
  },
  data() {
    return {
      // sortBy: '',
      // sortOptions: ['empl_surname', 'salary', ''],
      // roleFilterOptions: ['Any', 'MANAGER', 'CASHIER'],
      // roleFilter: 'Any',
      // findBySurname: ''
    }
  },
  computed: {
    ...mapWritableState(useCheckEditorStore, [
      'chosenItem',
      'isDeleteDialogOpen',
      'isGetOneDialogOpen'
    ]),
    ...mapState(useCheckEditorStore, ['checks']),
    ...mapState(useLoginStore, ['jwt_token']),
    tableHeight() {
      return window.innerHeight * 0.5
    }
  },
  methods: {
    ...mapActions(useCheckEditorStore, ['getAll', 'getOne']),
    async search() {
      let isOk: boolean
      isOk = await this.getAll(this.jwt_token)
      if (!isOk) alert('The error happened')
    },
    deleteRequest(item: CheckDTO) {
      this.chosenItem = { ...item, sales: [] }
      this.isDeleteDialogOpen = true
    },
    async findOneRequest(item: CheckDTO) {
      await this.getOne(this.jwt_token, item.check_number)
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
