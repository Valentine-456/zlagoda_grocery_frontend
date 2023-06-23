<template>
  <CategoryCreateDialog />
  <CategoryDeleteDialog />
  <CategoryUpdateDialog />
  <div class="editor-block v-container pa-5">
    <v-card class="mb-5">
      <v-card-title class="text-h4 font-weight-bold">Category</v-card-title>
      <v-card-actions class="d-flex">
        <v-select
          v-model="sortBy"
          density="compact"
          class="sort-by"
          :items="['category_name', '']"
          label="Sort By"
        ></v-select>
        <v-btn @click="search" size="large" class="mb-5 mt-0 mx-5 bg-blue">Search</v-btn>
        <v-btn @click="create" size="large" class="mb-5 mt-0 bg-green">Create New</v-btn>
      </v-card-actions>
    </v-card>

    <v-table :height="tableHeight" hover fixed-header density="compact" class="data-table mt-5">
      <thead>
        <tr>
          <th>Number</th>
          <th>Category</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody v-if="categories.length != 0">
        <tr v-for="item in categories" :key="item.category_number">
          <td>{{ item.category_number }}</td>
          <td>{{ item.category_name }}</td>
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
import { useCategoryEditorStore, type CategoryDTO } from '@/stores/categoryEditor'
import { useLoginStore } from '@/stores/login'
import CategoryCreateDialog from './CategoryCreateDialog.vue'
import CategoryDeleteDialog from './CategoryDeleteDialog.vue'
import CategoryUpdateDialog from './CategoryUpdateDialog.vue'

export default {
  components: {
    CategoryCreateDialog,
    CategoryDeleteDialog,
    CategoryUpdateDialog
  },
  data() {
    return {
      sortBy: ''
    }
  },
  computed: {
    ...mapWritableState(useCategoryEditorStore, [
      'isCreateDialogOpen',
      'chosenItem',
      'isDeleteDialogOpen',
      'isUpdateDialogOpen'
    ]),
    ...mapState(useCategoryEditorStore, ['categories']),
    ...mapState(useLoginStore, ['jwt_token']),
    tableHeight() {
      return window.innerHeight * 0.5
    }
  },
  methods: {
    ...mapActions(useCategoryEditorStore, ['getAll']),
    async search() {
      // if(this.jwt_token.length == 0) return;
      let isOk: boolean
      isOk = await this.getAll(this.jwt_token, this.sortBy)
      if (!isOk) alert('The error happened')
    },
    create() {
      this.isCreateDialogOpen = true
    },
    deleteRequest(item: CategoryDTO) {
      this.chosenItem = item
      this.isDeleteDialogOpen = true
    },
    updateRequest(item: CategoryDTO) {
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
}
</style>
