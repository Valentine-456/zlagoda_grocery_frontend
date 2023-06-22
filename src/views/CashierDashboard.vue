<template>
    <div>
      <h1>{{ message }}</h1>
      <button @click="updateMessage">Update Message</button>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    data() {
      return {
        message: "Cashier!"
      };
    },
    methods: {
      updateMessage() {
        this.message = "Updated message!";
      }
    }
  };
  </script>
  
  <style scoped>
  h1 {
    color: blue;
  }
  button {
    background-color: green;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  </style>