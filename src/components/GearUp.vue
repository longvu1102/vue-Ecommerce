<template>
    <div class=" container-fluid image-container mt-5">
        <h3 class="mb-5">Gear Up</h3>
      <img src="@/assets/images/nike-just-do-it.jpg" alt="Your Image" class="full-height-image">
    </div>
    <p class=" image-cap text-center text-black mt-3" >Nike Football</p>
    <h1 class="heading-cap text-center">2024 National Team Kits</h1>
    <p class="image-cap text-center text-blac">Featuring Dri-FIT, built for the moments that matter most</p>
  </template>
  
  <script>
  export default {
    name: 'ImageContainer',
    // Your script here
  }
  </script>
  
  <style scoped>
  .image-container {
    object-fit: contain;
    position: relative;
    height: 750px; 
    overflow: hidden; /* Đảm bảo ảnh không tràn ra ngoài container */
  }
  
  .full-height-image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Đảm bảo ảnh sẽ hiển thị mà không bị vặn hoặc bị căng */
  }
  .image-cap {
    font-size: 17px;
    font-weight: 500;
  }
 .heading-cap{
    font-size: 70px;
    font-weight: bold;
 }
  </style>
  