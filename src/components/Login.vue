<template>
  <div class=" container-lg navbar navbar-expand-lg bg-light">
    <!-- Navbar items -->
    <div class="collapse navbar-collapse" id="navbarNav">
      <a class="navbar-brand" href="#"><img src="@/assets/images/Nike-Logo.svg" alt=""></a>
      <h3 style="font-weight: bold;"> Login </h3>
      <!-- Sử dụng lớp mới để căn giữa và đẩy về phía bên phải -->
      <div class="ml-auto-right">
       
      </div>
    </div>
  </div>

  <div class="anh-login position-relative">
    <img src="@/assets/images/artboard_1.jpg" alt="Image 1" class="image img-fluid" />
    <div class="login container position-absolute top-50 end-30 translate-middle-y">
      <h2 class="mb-4 text-center"> Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" v-model="user.username" class="form-control"  />
          <span v-if="!validation.username" class="text-danger">Please enter your username.</span>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <div class="input-group">
            <input :type="showPassword ? 'text' : 'password'" v-model="user.password" class="form-control" />
            <div class="input-group-append">
              <span class="input-group-text" @click="togglePasswordVisibility">
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </span>
            </div>
          </div>
          <span v-if="!validation.password" class="text-danger">Please enter your password.</span>
        </div>
      
        <button type="submit" class="btn">Login</button>
        <div>
        <p class="text-center mt-3" >If you don't have an account yet ?  <router-link to="/register" class="text-regis text-danger text-decoration-none"> Register</router-link></p>
        </div>
      </form>

      <!-- Social Icons -->
      <ul class="list-inline mt-3 text-center">
        <li class="list-inline-item">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
        </li>
        <li class="list-inline-item">
          <a href="#"><i class="fab fa-instagram"></i></a>
        </li>
        <li class="list-inline-item">
          <a href="#"><i class="fab fa-twitter"></i></a>
        </li>
        <li class="list-inline-item">
          <a href="#"><i class="fab fa-google"></i></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import { isAuthenticated } from "@/router";

export default {
  name: "LoginComponent",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      showPassword: false,
      validation: {
        username: true,
        password: true,
      },
    };
  },
  methods: {
    async login() {
      this.validateInput();
      if (this.validation.username && this.validation.password) {
        try {
          const response = await fetch('http://localhost:3000/User');
          const users = await response.json();
          const authenticatedUser = users.find(u => u.username === this.user.username && u.password === this.user.password);
          if (authenticatedUser) {
            this.$store.commit("login", { username: this.user.username });
            isAuthenticated.value = true;
            alert("Login successful!");
            this.$router.push("/").catch(() => {});
          } else {
            alert("Incorrect username or password.");
          }
        } catch (error) {
          console.error("Lỗi khi đăng nhập:", error);
          alert("There was an error logging in!");
        }
      }
    },
    validateInput() {
      this.validation.username = !!this.user.username.trim();
      this.validation.password = !!this.user.password.trim();
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
/* Your CSS styles */
</style>


<style scoped>
.anh-login {
  width: 100%;
}

.anh-login img {
  object-fit: cover;
  width: 100%;
  height: 600px;
}

.login {
  top: 50%;
  right: 30%;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  position: absolute;
  transform: translate(-50%, -50%);
}

.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}

.top-50 {
  top: 50%;
}

.end-30 {
  right: 10%;
}

.translate-middle-y {
  transform: translateY(-50%);
}

h2 {
  color: black;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: bold;
}

input {
  padding: 8px;
  margin-bottom: 16px;
}

button {
  background-color: #ec7546;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover{
  background-color: #9a9797;
}
p .text-regis:hover{
  color:  grey;
} 
.input-group-text {
  border-radius: 30px 30px 30px 30px;
  border: none;
  height: 40px;
  position: absolute;
  right: 30px;
  cursor: pointer;
  z-index: 2; /* Đảm bảo icon nằm trên input */
  background-color: transparent; /* Đặt màu nền transparent */
}
.list-inline {
  padding: 0;
  list-style: none;
}

.list-inline-item {
  display: inline-block;
  justify-content: center;
  font-size: 25px;
  color: red;
  margin: 30px;
}

.list-inline-item i {
  color: #ec7546;
}


.navbar{
  padding: 20px;
  height: 70px;
  background-color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
}
.navbar  li{
  list-style-type: none;
  text-decoration: none;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand img{
  width: 120px;
}
.navbar .collapse { 
  margin-top: 20px;
  margin-left: 10%;
  margin-bottom: 20px;
}
.ml-auto-right {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.text-danger {
  margin-right: 15px; 
}
/* Thêm đoạn mã CSS sau vào phần style của bạn */
.input-group {
  position: relative;
}

.input-group-text {
  height: 40px;
  position: absolute;
  right: 0px;
  cursor: pointer;
  z-index: 2; /* Đảm bảo icon nằm trên input */
}

.form-control {
  padding-right: 40px; /* Để tránh việc icon che phủ phần nội dung của input */
}



</style>



