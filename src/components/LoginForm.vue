<script lang="ts">
export default {
  data() {
  return {
    id_employee: "",
    password: "",
  }
 },
 props: {
    message: String,
  },
  methods: {
    alertForm() {
      alert(this.id_employee + this.password);
      this.id_employee = "";
      this.password = "";
    }
  }
}
</script>

<template>
  <v-card class="login-form pb-5 pt-5" width="400">
      <v-card-item>
        <v-card-title class="text-center">{{message}}</v-card-title>
      </v-card-item>
      <v-card-item>
        <v-form @submit.prevent>
      <v-text-field
        v-model="id_employee"
        label="Employee ID"
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
      ></v-text-field>
      <v-btn type="submit" @click="alertForm" block class="mt-2">Submit</v-btn>
      </v-form>
      </v-card-item>
    </v-card>
</template>

<style scoped>

</style>
