<!-- ProductDemo.vue -->
<template>
  <div class=" product-demo container mx-auto">
    <div class="head text-center">
      <!-- ... your existing content ... -->
    </div>
    <div class="productdemo">
      <section v-for="product in products" :key="product.id" class="product shadow-lg">
        <div class="product-image">
          <img :src="require(`@/assets/images/${product.imageUrl}`)" alt="Product Image">
        </div>
        <div class="chu product-details">
          <h2 class="text-xl font-bold mb-2">{{ product.name }}</h2>
          <div class="text-xl"><h5 class="" style="font-weight: bold;font-size:18px"> Price: {{ product.price }}$</h5></div>
          <button
            class="mt-2"
            style="background-color: #ec7546; color: #fff; font-weight: bold; padding: 8px 16px; border-radius: 8px;"
            @click="addToCart(product)"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDemo',
  data() {
    return {
      products: [],
    };
  },
  async created() {
    try {
      const response = await fetch('http://localhost:3000/ProductDemo');
      this.products = await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
  methods: {
    addToCart(product) {
      if (this.$store.getters.isLoggedIn) {
        console.log('Adding to cart:', product);
        this.$store.commit('addToCart', product);
        this.$router.push('/cart');
      } else {
        alert("Vui lòng đăng nhập ")
        console.log('User not logged in. Redirecting to login page...');
        this.$router.push('/login');
      }
    },
  },
};
</script>


  
  <style scoped>
  /* Your Product styles here */
  .head .title{
    font-size: 30px;
    font-weight: bold;
  }
  .head h2{
    font-size: 70px;
    font-weight: bold;
  }
  .head p{
    font-size: 17px;
  }
  .head button{
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    background-color: #160c0c;
    border-radius: 50px;
    width: 120px;
    height: 40px;
  }
  .head button:hover{
    cursor: pointer;
    background-color: #333;
    transform: translateY(3px);
    transition: all 0.5s;
  }
  .productdemo {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around; /* Điều chỉnh để giữa các sản phẩm ở giữa */
  }
  
  .product {
    margin-bottom: 20px;
    width: 45%; /* Điều chỉnh kích thước card, giảm khoảng cách giữa các card */
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
  }
  
  .product img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease-in-out;
    border-radius: 8px; /* Bo góc ảnh */
  }
  
  .product:hover img {
    transform: scale(0.95);
  }
  
  .product-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    text-align: center;
  }
  
  .product-details h2 {
    font-size: 20px;
    font-weight: bold;
    margin: 10px 0;
  }
 
  .product-details h5 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .product button {
    margin-top: 10px;
    background-color: #ec7546;
    color: #fff;
    font-weight: bold;
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
  
  .product button:hover {
    background-color: #000;
  }
  
  @media (max-width: 768px) {
    .product {
      width: 100%; /* Đảm bảo các sản phẩm hiển thị full-width trên thiết bị di động */
    }
  }
  </style>
  