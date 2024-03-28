<template>
    <div>
      <Navbar />
      <LienHe />
      <Quangcao />
      <Footer />
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  import LienHe from '@/components/LienHe.vue'; 
  import Quangcao from '@/components/Quangcao.vue';
  import Footer from '@/components/Footer.vue';

  
  export default {
    name: 'ContactView',
    components: {
      Navbar,
      LienHe,
      Quangcao,
      Footer,
    },
  };
  </script>
  
  <style scoped>
  /* Các quy tắc CSS */
</style>