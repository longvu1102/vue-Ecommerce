<template>
    <div>
      <Navbar />
      <BlogPost />
      <Footer />
    </div>
  </template>
  
  <script>
  import Navbar from "@/components/Navbar.vue";
  import BlogPost from "@/components/Blog.vue";
  import Footer from "@/components/Footer.vue";
  
  export default {
    name: "BlogView",
    components: {
      Navbar,
      BlogPost,
      Footer,
    },
  };
  </script>
  
  <style scoped>
  /* Các quy tắc CSS */
  </style>
  