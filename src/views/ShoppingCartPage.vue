<!-- ShoppingCartPage.vue -->
<template>
  <div class="shopping-cart-page">
    <Navbar />
    <ShoppingCart />
    <Quangcao />
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';
import Quangcao from '@/components/Quangcao.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'ShoppingCartPage',
  components: {
    Navbar,
    ShoppingCart,
    Quangcao,
    Footer,
  },
};
</script>

<style scoped>
/* Your ShoppingCartPage styles here */
</style>
