<template>
  <v-card class="container-block elevation-6" variant="tonal">
    <v-card-title class="">My Profile</v-card-title>
    <v-divider></v-divider>
    <v-card-item>
      <v-text-field readonly>
        Full Name: {{ myProfile.empl_name }} {{ myProfile.empl_surname }}
        {{ myProfile.empl_patronimic || '' }}
      </v-text-field>
      <v-text-field readonly> Id: {{ myProfile.id_employee }} </v-text-field>
      <v-text-field readonly> Position: {{ myProfile.empl_role }} </v-text-field>
      <v-text-field readonly> Salary: {{ myProfile.salary }} </v-text-field>
      <v-text-field readonly>
        Address: {{ myProfile.city }} {{ myProfile.street }} {{ myProfile.zip_code }}
      </v-text-field>
      <v-text-field readonly> Phone: {{ myProfile.phone_number }} </v-text-field>
    </v-card-item>
    <v-card-item>
      <v-btn block @click="logout" class="bg-red elevation-20" size="x-large">Logout </v-btn>
    </v-card-item>
  </v-card>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { useLoginStore } from '@/stores/login'

export default {
  data: () => ({
    loading: true
  }),
  computed: {
    ...mapState(useLoginStore, ['id_employee', 'myProfile'])
  },
  methods: {
    ...mapActions(useLoginStore, ['getMyProfile', 'clearStore']),
    logout() {
      this.clearStore()
      this.$router.push('/')
    }
  }
}
</script>
<style>
.container-block {
  min-width: 400px;
  transform: translateX(-25%);
}
</style>
