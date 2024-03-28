<template>
    <div class="container-fluid">
      <h3 class="mb-5 text-start" >The Latest</h3>
      <div class=" d-flex justify-content-center">
        <div class="image-container1">
          <img src="@/assets/1549546940683.gif" alt="Image 1" class="image">
        </div>
  
        <div class="image-container2">
          <img src="@/assets/nike_01.gif" alt="Image 2" class="image">
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FutureddName',
  };
  </script>
  
  <style scoped>
  .container-fluid {
    /* Add any specific styles for the container if needed */
    margin-top: 100px;
  }
  
  .text-start {
    /* Add any specific styles for the text if needed */
  }
  
  .d-flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .image-container1,
  .image-container2 {
    flex: 1; /* Để chúng có chiều rộng bằng nhau */
    
    position: relative;
    height: 600px; /* Đặt chiều cao cố định */
    overflow: hidden; /* Ngăn chặn ảnh tràn ra khỏi container */
  }
  
  .image {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  
  h1 {
    font-size: 20px;
    font-weight: bold;
  }
  
  button {
    /* Add any specific styles for the button if needed */
  }
  </style>
  