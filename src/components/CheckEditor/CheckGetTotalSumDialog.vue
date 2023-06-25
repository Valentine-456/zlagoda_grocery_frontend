<template>
  <v-dialog v-model="isGetStatisticsDialogOpen" width="400">
    <v-card>
      <v-card-text>Check</v-card-text>
      <v-card-item>
        <v-card-title class="text-h6"> {{ statisticsTotalSumOfChecks }} $ </v-card-title>
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
import { useCheckEditorStore } from '@/stores/checkEditor'

export default {
  data: () => ({}),
  computed: {
    ...mapWritableState(useCheckEditorStore, [
      'isGetStatisticsDialogOpen',
      'statisticsTotalSumOfChecks'
    ]),
    ...mapState(useLoginStore, ['jwt_token'])
  },
  methods: {
    closeDialog() {
      this.statisticsTotalSumOfChecks = 0
      this.isGetStatisticsDialogOpen = false
    }
  }
}
</script>
<style lang=""></style>
