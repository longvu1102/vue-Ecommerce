<template>
  <div class="home">
    <Navbar />
    <Search />
    <Slide />

    <Featured />
    <GearUp />
    <Futured />
    <Quangcao />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Slide from "@/components/Slide.vue";
import Featured from "@/components/Featured.vue";
import Futured from "@/components/Futured.vue";
import GearUp from '@/components/GearUp.vue'
import Search from "@/components/Search.vue";
import Quangcao from "@/components/Quangcao.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "HomePage",
  components: {
    Navbar,
    Search,
    Slide,
    Featured,
    GearUp,
    Futured,
    Quangcao,
    Footer,
  },
  // Home page logic
};
</script>

<style scoped>
/* Your Home styles here */
@media only screen and (max-width: 739px) {
  /* Ví dụ: ẩn nút và tiêu đề trong button class khi màn hình nhỏ hơn hoặc bằng 768px */
}
@media only screen and (min-width: 740px) and (max-width: 1023px) {
}
</style>
