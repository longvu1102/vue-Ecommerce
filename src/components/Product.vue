<template>
  <div class="product">
    <div class="container-lg">
      <h2>{{ category ? `Sản phẩm danh mục: ${category}` : 'All Product' }}</h2>
    </div>
    <div class="container-lg category-selector">
      <select v-model="selectedCategory" @change="loadProducts">
        <option value="">All</option>
        <option value="ao">Shirt&Hoodie</option>
        <option value="quan">Pants & Trouser</option>
        <option value="giay">Shoes</option>
      </select>
    </div>
    <div class="product-danhsach">
      <div v-for="product in filteredProducts" :key="product.id" class="product-item">
        <div class="product-link">
          <div  class="product-card">
            <router-link :to="'/productdetail/' + product.id">
              <img :src="require(`@/assets/images/${product.imageUrl}`)" alt="Product Image" class="product-image">
            </router-link>
            
              <div class="product-name" style="font-size: 18px;">{{ product.name }}</div>
              <div class="product-price" style="font-size: 18px;">Price : {{ formatCurrency(product.price) }}</div>
           
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// Import các hàm từ service/index.js
import { fetchProducts, addToCart } from "@/service/index";

export default {
  name: 'ProductComponent',
  data() {
    return {
      selectedCategory: '',
      searchQuery: '',
      products: [],
    };
  },
  mounted() {
    this.loadProducts();
  },
  computed: {
    filteredProducts() {
      return this.selectedCategory
        ? this.products.filter(product => product.category === this.selectedCategory)
        : this.products;
    },
  },
  methods: {
    // Hàm để lấy danh sách sản phẩm từ API
    async loadProducts() {
      try {
        // Gọi hàm fetchProducts từ service/index.js
        this.products = await fetchProducts();
      } catch (error) {
        console.error('Error loading products:', error);
      }
    },
    // Hàm thêm sản phẩm vào giỏ hàng
    async addToCart(product) {
      if (this.$store.getters.isLoggedIn) {
        console.log('Adding to cart:', product);
        try {
          // Gọi hàm addToCart từ service/index.js để thêm sản phẩm vào giỏ hàng
          await addToCart(product);
          // Chuyển hướng đến trang giỏ hàng sau khi thêm sản phẩm thành công
          this.$router.push('/cart');
        } catch (error) {
          console.error('Error adding to cart:', error);
          // Xử lý lỗi khi thêm sản phẩm vào giỏ hàng
          // Ví dụ: Hiển thị thông báo lỗi cho người dùng
        }
      } else {
        // Xử lý trường hợp người dùng chưa đăng nhập
        // Ví dụ: Chuyển hướng đến trang đăng nhập
        alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
        console.log('User not logged in. Redirecting to login page...');
        this.$router.push('/login');
      }
    },
    // Hàm định dạng tiền tệ
    formatCurrency(value) {
      return `${value.toFixed(2)}$`;
    },
    // Hàm tìm kiếm sản phẩm
    searchProducts() {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
/* Your Product styles here */
.category-selector {
  max-width: 150px; /* Đặt giới hạn chiều rộng tối đa */
  float: left;
}

.category-selector select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
}

.category-selector {
  margin-bottom: 20px;
}

.product-danhsach {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.product-item {
  /* Styling cho mỗi sản phẩm */
  text-align: center;
}

.product-card {
  
  padding: 10px;
  text-align: center;

  transition: box-shadow 0.3s ease; /* Thêm hiệu ứng chuyển động */
}

.product-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Box shadow lớn hơn khi di chuột qua */
}

.product-image {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}
.product-image:hover {
  transform: scale(1.1);
  transition: all 0.5s;
}
.product-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.product-price {
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}

.add-to-cart-button {
  background-color: #ec7546;
  color: #fff;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.add-to-cart-button:hover {
  background-color: #a79e9e;
}
</style>
