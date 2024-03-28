<template>
  <div>
    <form class=" container-lg form form-inline my-2 my-lg-0" @submit.prevent="search">
      <!-- Thêm icon search vào trong input -->
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <i class="fas fa-search"></i>
          </div>
        </div>
        <input
          class="form-control mr-sm-2 w-auto"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style="margin-top: 5px"
          v-model="searchQuery"
        />
      </div>
    </form>

    <!-- Hiển thị thông báo tải dữ liệu -->
    <div v-if="loading" class="loading-message">Loading...</div>

    <!-- Hiển thị kết quả tìm kiếm -->
    <div  v-else>
      <div v-if="searchResults.length > 0" class="search-results">
        <div
          v-for="product in searchResults"
          :key="product.id"
          class="product-card"
        >  <router-link :to="'/productdetail/' + product.id">
          <img :src="require(`@/assets/images/${product.imageUrl}`)" alt="Product Image" />
        </router-link>
          <div class="product-details">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <span>Price: ${{ product.price }}</span>
          </div>
        </div>
      </div>
      <!-- Khi không có sản phẩm nào được tìm thấy -->
      <div v-else class="no-results">No results found</div>
    </div>
  </div>
</template>

<script>
import { searchProductByName } from "@/service/index.js"; // Đảm bảo đường dẫn đúng

export default {
  name: "SearchProduct",
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      loading: false,
    };
  },
  methods: {
    async search() {
      try {
        // Đánh dấu là đang tải dữ liệu
        this.loading = true;
        if (this.searchQuery === "") {
          // Nếu searchQuery rỗng, đặt searchResults là một mảng trống
          this.searchResults = [];
          // Đánh dấu là đã tải xong dữ liệu
          this.loading = false;
          return; // Kết thúc hàm search ở đây nếu không có query
        }
        // Gọi hàm tìm kiếm sản phẩm từ service/index.js
        this.searchResults = await searchProductByName(this.searchQuery);
        // Đánh dấu là đã tải xong dữ liệu
        this.loading = false;
      } catch (error) {
        console.error("Error searching products:", error);
        // Đánh dấu là đã tải xong dữ liệu (kể cả khi có lỗi xảy ra)
        this.loading = false;
      }
    },
  },
  watch: {
    searchQuery: function () {
      // Gọi phương thức search() khi searchQuery thay đổi
      this.search();
    },
  },
};
</script>

  

  
  
  <style scoped>
  .search-results {
    margin: 20px auto; /* Để căn giữa theo chiều ngang */
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* Căn giữa theo chiều ngang */
   
  }
  
  .loading-message {
    margin-top: 20px;
    text-align: center;
  }
  /* Add your custom styles here if needed */
  .form input {
    border-radius: 50px !important; /* Sử dụng !important để đảm bảo ưu tiên */
  }
  .input-group {
    position: relative;
  }
  
  .input-group-text {
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    right: 5px; /* Điều chỉnh khoảng cách từ biểu tượng tìm kiếm đến mép phải của thanh tìm kiếm */
    z-index: 1; /* Đảm bảo hiển thị trên top của các phần tử khác */
  }
  
  .form-control {
    padding-left: 35px; /* Đảm bảo đủ chỗ cho biểu tượng tìm kiếm */
  }
  
  .form-control:focus + .input-group-text i {
    color: #333; /* Thay đổi màu của biểu tượng khi input được focus */
  }
  .input-group-text {
    background-color: transparent; /* Đặt màu nền của icon search thành trong suốt */
    border: none; /* Loại bỏ viền */
  }
  
  .input-group-text i {
    color: #aaa; /* Đặt màu của icon search */
  }
  
  .input-group-text i:hover {
    color: #333; /* Đổi màu khi di chuột qua */
  }
  .form-control:focus + .input-group-text i {
    color: #333; /* Thay đổi màu của icon khi input được focus */
  }
  
  /* Hiển thị kết quả tìm kiếm */
  .search-results {
    margin-left: 30px;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
  }
  
  /* Style cho mỗi sản phẩm */
  .product-card {
    width: 300px;
    margin-right: 20px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
  
  .product-card img {
    width: 100%;
    border-radius: 5px;
  }
  
  .product-details h3 {
    margin-top: 10px;
  }
  
  .product-details p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
  }
  
  .product-details span {
    display: block;
    margin-top: 10px;
    font-weight: bold;
  }
  
  /* Ẩn vùng hiển thị khi không có sản phẩm được tìm thấy */
  .no-results {
    display: none;
  }
  </style>
  