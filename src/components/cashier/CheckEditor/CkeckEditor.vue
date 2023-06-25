<template>
  <CheckCreateDialog />
  <CheckGetTotalSumDialog />
  <CheckGetOneDialog />
  <div class="editor-block v-container pa-5">
    <v-card class="mb-5">
      <v-card-title class="text-h4 font-weight-bold">Check</v-card-title>
      <v-card-action class="d-flex">
        <!-- <v-expansion-panels class="my-5">
          <v-expansion-panel title="Advanced search">
            <v-expansion-panel-text class="advance-search-bar"> -->
        <div class="d-flex">
          <v-text-field
            v-model="dateFrom"
            class="sort-by ml-2"
            label="Start date"
            type="date"
          ></v-text-field>
          <v-text-field
            v-model="dateTo"
            class="sort-by"
            label="End date"
            type="date"
          ></v-text-field>
        </div>

        <!-- </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels> -->
      </v-card-action>
      <v-card-actions class="d-flex">
        <v-btn size="large" @click="searchWithinDates" class="mb-5 mt-0 mr-5 bg-blue">Search</v-btn>
        <v-btn @click="create" size="large" class="mb-5 mt-0 mx-5 bg-success">Add new</v-btn>
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
import CheckGetTotalSumDialog from './CheckGetTotalSumDialog.vue'
import CheckGetOneDialog from './CheckGetOneDialog.vue'
import CheckCreateDialog from './CheckCreateDialog.vue'
import { useStoreProductEditorStore } from '@/stores/storeProductEditor'
import { useEmployeeEditorStore } from '@/stores/employeeEditor'

export default {
  components: {
    CheckGetTotalSumDialog,
    CheckGetOneDialog,
    CheckCreateDialog
  },
  mounted() {
    this.getAllStoreProducts(this.jwt_token, '')
  },
  data() {
    return {
      dateFrom: new Date(Date.now() - 86_400_000)
        .toLocaleString('en-GB', { month: '2-digit', day: '2-digit', year: 'numeric' })
        .split('/')
        .reverse()
        .join('-'),
      dateTo: new Date()
        .toLocaleString('en-GB', { month: '2-digit', day: '2-digit', year: 'numeric' })
        .split('/')
        .reverse()
        .join('-')
    }
  },
  computed: {
    ...mapWritableState(useCheckEditorStore, [
      'chosenItem',
      'isGetOneDialogOpen',
      'isGetStatisticsDialogOpen',
      'isCreateDialogOpen'
    ]),
    ...mapState(useCheckEditorStore, ['checks']),
    ...mapState(useLoginStore, ['jwt_token', 'id_employee']),
    ...mapState(useEmployeeEditorStore, ['employees']),
    tableHeight() {
      return window.innerHeight * 0.5
    },
    chosenIdEmployeeFilter() {
      return this.id_employee
    }
  },
  methods: {
    ...mapActions(useCheckEditorStore, ['getAll', 'getOne', 'getAllWithinDates']),
    ...mapActions(useStoreProductEditorStore, {
      getAllStoreProducts: 'getAll'
    }),
    // async search() {
    //   let isOk: boolean
    //   isOk = await this.getAll(this.jwt_token)
    //   if (!isOk) alert('The error happened')
    // },
    create() {
      this.isCreateDialogOpen = true
    },
    async findOneRequest(item: CheckDTO) {
      await this.getOne(this.jwt_token, item.check_number)
      this.isGetOneDialogOpen = true
    },
    async searchWithinDates() {
      const fromParam = this.dateFrom.split('-').join('/')
      const toParam = this.dateTo.split('-').join('/')
      let isOk: boolean
      isOk = await this.getAllWithinDates(
        this.jwt_token,
        fromParam,
        toParam,
        this.chosenIdEmployeeFilter
      )
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

.find-one {
  max-width: 300px;
  margin-right: 20px;
  margin-left: 8px;
}
</style>
