<template>
    <div class="login-page">
      
      <Login />
      <Quangcao />
      <Footer />
    </div>
  </template>
  
  <script>

  import Login from '@/components/Login.vue';
  import Quangcao from '@/components/Quangcao.vue';
  import Footer from '@/components/Footer.vue';
  
  export default {
    name: 'LoginPage',
    components: {
   
      Login,
      Quangcao,
      Footer,
    },
    // LoginPage logic
  }
  </script>
  
  <style scoped>
  /* Your LoginPage styles here */
  </style>
  