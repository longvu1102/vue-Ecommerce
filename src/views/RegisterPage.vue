<template>
  <div class="login-page">
    <Registration />
    <Quangcao />
    <Footer />
  </div>
</template>

<script>
import Registration from "@/components/Registration.vue";
import Quangcao from "@/components/Quangcao.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "LoginPage",
  components: {
    Registration,
    Quangcao,
    Footer,
  },
  // LoginPage logic
};
</script>

<style scoped>
/* Your LoginPage styles here */
</style>
