<template>
  <div class="navbar-left navbar-expand-lg navbar-light bg-light">
    <!-- Thêm logo mới vào phần navbar-left -->
    <a class="navbar-brand" href="#">
      <img
        src="@/assets/images/air-jordan.png"
        style="
          margin-right: 1115px;
          height: 40px;
          width: 40px;
          object-fit: contain;
        "
        alt=""
      />
    </a>

    <div class="navbar-nav ml-auto">
      <router-link class="nav-link" to="#">Find a Store</router-link>
      <router-link class="nav-link" to="#">Help</router-link>
      <router-link class="nav-link" to="#">Join Us</router-link>
      <!-- Hiển thị nút đăng nhập khi chưa đăng nhập -->
      <router-link v-if="!isLoggedIn" class="nav-link" to="/login"
        >Login</router-link
      >

      <!-- Hiển thị nút đăng xuất khi đã đăng nhập -->
      <button v-if="isLoggedIn" class="nav-link" @click="logout">Logout</button>
    </div>
  </div>

  <br />
  <div class="container-fluid navbar navbar-expand-lg">
    <!-- Navbar brand -->
    <a class="navbar-brand" href="#">
      <img src="@/assets/images/Nike-Logo.svg" alt="" />
    </a>

    <!-- Navbar toggle button (for mobile) -->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Navbar items -->
    <div class="collapse navbar-collapse" id="navbarNav">
      <!-- Left-aligned items -->
      <ul class="navbar-nav">
        <li class="nav-item ">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <!-- Dropdown for Products -->
        <li class="nav-item">
          <router-link class="nav-link" to="/products">Shop</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/contact">Contact</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/blog">Blog</router-link>
        </li>
      </ul>

      <!-- Right-aligned items -->
      <ul class="navbar-nav ml-auto">
        <!-- Search box -->
        <li class="nav-item"></li>

        <!-- Shopping cart icon -->
        <li class="nav-item">
          <router-link class="nav-link" to="/cart">
            <i class="fas fa-shopping-cart"></i>
            <span v-if="cartItemCount" class="cart-badge">{{
              cartItemCount
            }}</span>
          </router-link>
        </li>

        <!-- Gửi chúng ta phía sau bằng cách sử dụng ml-auto -->
        <li class="nav-item ml-auto">
          <router-link v-if="isLoggedIn" class="nav-link text-danger" to="#"
            >Hello, {{ getUsername }}</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavbarComponent",

  // Navbar component logic
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    getUsername() {
      return this.$store.getters.getUsername;
    },
    cartItemCount() {
      // Đếm số lượng sản phẩm duy nhất trong giỏ hàng
      const uniqueItems = new Set();
      this.$store.state.cart.forEach((item) => uniqueItems.add(item.id));
      return uniqueItems.size;
    },
  },
  methods: {
    // ... Your existing methods ...

    // New method for handling logout
    logout() {
      // Perform the logout action by committing the 'logout' mutation
      this.$store.commit("logout");

      // Redirect to the login page
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
/* Your Navbar styles here */
/* Kiểu cho thanh điều hướng của bạn */

.navbar {
  padding-left: 50px;
  margin-top: 20px;
  height: 70px;
  background-color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
}

.navbar-brand img {
  height: 60px;
  width: 60px;
  object-fit: contain;
}

.navbar .collapse {
  margin-top: 20px;
  margin-left: 25%;
  margin-bottom: 20px;
}

.navbar .collapse .nav-link {
  color: black;
  margin-left: 10px;
  font-weight: 600;
}

.navbar .collapse .nav-item {
  padding: 10px;
}

.navbar .collapse .nav-item .fas {
  font-size: 30px; /* Điều chỉnh kích thước phông chữ theo nhu cầu */
  color: inherit; /* Kế thừa màu từ phần tử cha */
  /* Kiểu bổ sung cho biểu tượng tìm kiếm */
  line-height: 1; /* Căn giữa biểu tượng theo chiều dọc trong trường đầu vào */
}

.navbar-left {
  display: flex;
  align-items: center; /* Canh chính giữa theo chiều dọc */
  float: right; /* Đặt logo ở bên trái */
  margin-right: 15px; /* Khoảng cách giữa logo và các nút */
}

.navbar-left .nav-link {
  padding-left: 10px;
  padding-right: 10px;
  border-right: 2px solid black;
}

.cart-badge {
  background-color: #ec7546;
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 540px;
}
</style>
