<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/Products/');
      this.$store.state.products = response.data;
      localStorage.setItem("products", JSON.stringify(this.$store.state.products)); // Sử dụng `this.$store.state.products` thay vì `state.products`
      console.log('Sản phẩm đã được tải lên từ server:', this.$store.state.products);
    } catch(error) {
      console.error('Lỗi khi tải sản phẩm từ server:', error);
    }
  },
  mounted() {
    this.$store.dispatch('fetchData');
  },
}
</script>

<style>
/* Các quy tắc CSS cho App component hoặc component cha */
</style>
