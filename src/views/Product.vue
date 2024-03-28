
<template>
    <div class="product">
      <Navbar />
      <ProductList />
      <Footer />
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  import ProductList from '@/components/Product.vue'; // Thay thế Product bằng ProductList
  import Footer from '@/components/Footer.vue';
  
  export default {
    name: 'ProductPage', // Thay đổi tên của component
    components: {
      Navbar,
      ProductList, // Thay thế Product bằng ProductList
      Footer,
    },
  };
  </script>
  
  <style scoped>
  /* Your ShoppingCartPage styles here */
  </style>
  