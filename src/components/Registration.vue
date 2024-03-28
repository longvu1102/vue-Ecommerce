<template>
  <section class="position-relative">
    <img
      src="@/assets/images/artboard_1.jpg"
      alt="Background Image"
      class="w-100"
    />

    <div class="container position-absolute top-50 start-50 translate-middle">
      <header class="my-3" style="color:#ee4e34;">Register</header>
      <form @submit.prevent="registerUser" class="p-3">
        <!-- Full Name -->
        <div class="input-box mb-3">
          <label>User Name</label>
          <input
            type="text"
            v-model="username"
            required
            placeholder="Enter your full name"
            class="form-control"
          />
          <div v-if="!validation.username" class="text-danger">
            Please enter your full name.
          </div>
        </div>

        <!-- Phone Number and Date of Birth -->
        <div class="row">
          <div class="input-box mb-3 col-6">
            <label>Phone Number</label>
            <input
              type="telephone"
              v-model="phoneNumber"
              required
              placeholder="Enter phone number"
              class="form-control"
            />
            <div v-if="!validation.phoneNumber" class="text-danger">
              Please enter a valid phone number.
            </div>
          </div>
          <div class="input-box mb-3 col-6">
            <label>Date of Birth</label>
            <input
              type="date"
              v-model="birthDate"
              required
              placeholder="Enter date of birth"
              class="form-control"
            />
            <div v-if="!validation.birthDate" class="text-danger">
              Please enter your date of birth.
            </div>
          </div>
        </div>

        <!-- Gender Selection -->
        <div class="gender-box my-3">
          <label>Gender</label>
          <div class="gender-option d-flex my-2">
            <div class="gender me-3">
              <input
                name="gender"
                id="check-male"
                type="radio"
                v-model="gender"
                value="Male"
              />
              <label for="check-male">Male</label>
            </div>
            <div class="gender me-3">
              <input
                name="gender"
                id="check-female"
                type="radio"
                v-model="gender"
                value="Female"
              />
              <label for="check-female">Female</label>
            </div>
            <div class="gender me-3">
              <input
                name="gender"
                id="check-other"
                type="radio"
                v-model="gender"
                value="Other"
              />
              <label for="check-other">Other</label>
            </div>
          </div>
          <div v-if="!validation.gender" class="text-danger">
            Please select your gender.
          </div>
        </div>

        <!-- Address -->
        <div class="input-box address my-3">
          <label>Address</label>
          <input
            type="text"
            v-model="address.street"
            required
            placeholder="Enter address"
            class="form-control"
          />
          <div v-if="!validation.address" class="text-danger">
            Please enter your address.
          </div>
        </div>

        <!-- Password -->
        <div class="input-box mb-3">
          <label>Password:</label>
          <input
            type="password"
            v-model="password"
            required
            class="form-control"
          />
          <div v-if="!validation.password" class="text-danger">
            Please enter a password.
          </div>
        </div>

        <!-- Confirm Password -->
        <div class="input-box mb-3">
          <label>Confirm Password:</label>
          <input
            type="password"
            v-model="confirmPassword"
            required
            class="form-control"
          />
          <div v-if="!validation.confirmPassword" class="text-danger">
            Confirmation password does not match!
          </div>
        </div>

        <!-- Submit Button -->
        <!-- Submit Button -->
        <!-- Submit Button -->
        <div class="text-center">
          <button class="btn-orange-yellow" :disabled="!isFormValid">
            Register
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { addUser } from "@/service/index.js"; // Import hàm addUser từ service/index.js

export default {
  name: "RegisterHai",
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      birthDate: "",
      gender: "",
      address: {
        street: "",
      },
      validation: {
        username: false, // Set initial state to false
        password: false,
        confirmPassword: false,
        phoneNumber: false,
        birthDate: false,
        gender: false,
        address: false,
      },
    };
  },
  created() {
    // Validate all fields initially
    this.validateAll();
  },
  methods: {
    validateAll() {
      this.validation.username = !!this.username.trim();
      // Ensure password is at least 6 characters long
      this.validation.password = !!this.password && this.password.length >= 6;
      this.validation.confirmPassword = this.password === this.confirmPassword;
      this.validation.phoneNumber = /^\d{10,}$/.test(this.phoneNumber);
      this.validation.birthDate = !!this.birthDate;
      this.validation.gender = ["Male", "Female", "Other"].includes(
        this.gender
      );
      this.validation.address = !!this.address.street.trim();
    },

    async registerUser() {
      this.validateAll();

      // Proceed with registration if validation passes
      if (!this.isFormValid) {
        alert("Please check your input!");
        return;
      }

      try {
        await addUser({
          username: this.username,
          password: this.password,
          phoneNumber: this.phoneNumber,
          birthDate: this.birthDate,
          gender: this.gender,
          address: this.address,
        });

        alert("Registration successful!");
        this.$router.push("/login");
      } catch (error) {
        console.error("Registration error:", error.message);
        alert("An error occurred while registering!");
      }
    },
  },
  watch: {
    username() {
      this.validation.username = !!this.username.trim();
    },
    password(newValue) {
      this.validation.password = !!newValue && newValue.length >= 6;
      // Update confirmPassword validation too
      this.validation.confirmPassword = newValue === this.confirmPassword;
    },

    confirmPassword() {
      this.validation.confirmPassword = this.password === this.confirmPassword;
    },
    phoneNumber() {
      this.validation.phoneNumber = /^\d{10,}$/.test(this.phoneNumber);
    },
    birthDate() {
      this.validation.birthDate = !!this.birthDate;
    },
    gender() {
      this.validation.gender = ["Male", "Female", "Other"].includes(
        this.gender
      );
    },
    "address.street"() {
      this.validation.address = !!this.address.street.trim();
    },
  },
  computed: {
    isFormValid() {
      return Object.values(this.validation).every((value) => value);
    },
  },
};
</script>

<style scoped>

.container {
  padding: 20px;
  position: absolute;
  right: -500px; /* Điều chỉnh giá trị right thành 100px */
  max-width: 500px;
  width: 100%;
  background: #ffffff; /* Change background color to white */
  border-radius: 20px;
  /* Other styles */
}
img {
  height: 800px;
  object-fit: cover;
}
.container header {
  color: #ee4e34;
  font-size: 30px;
  color: #000;
  font-weight: 600;
  text-align: center;
}

.container .form {
  margin-top: 15px;
}

.form .input-box {
  width: 100%;
  margin-top: 10px;
}

.input-box label {
  color: #000;
}

.form :where(.input-box input, .select-box) {
  position: relative;
  height: 35px;
  width: 100%;
  outline: none;
  font-size: 1rem;
  color: #808080;
  margin-top: 5px;
  border: 1px solid #ee4e34;
  border-radius: 6px;
  padding: 0 15px;
  background: #fcedda;
}
label{
  font-weight: bold;
}
.input-box input:focus {
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}

.form .column {
  display: flex;
  column-gap: 15px;
}

.form .gender-box {
  margin-top: 10px;
}

.form :where(.gender-option, .gender) {
  display: flex;
  align-items: center;
  column-gap: 50px;
  flex-wrap: wrap;
}

.form .gender {
  column-gap: 5px;
}

.gender input {
  accent-color: #ee4e34;
}

.form :where(.gender input, .gender label) {
  cursor: pointer;
}

.gender label {
  color: #000;
}

.address :where(input, .select-box) {
  margin-top: 10px;
}

.select-box select {
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  color: #808080;
  font-size: 1rem;
  background: #fcedda;
}

.form button {
  height: 40px;
  width: 100%;
  color: #000;
  font-size: 1rem;
  font-weight: 400;
  margin-top: 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #ee4e34;
}

.form button:hover {
  background: #ee3e34;
}
.btn-orange-yellow {
  background-color: #ec7546; /* Màu cam vàng pha */
  color: white; /* Màu chữ trắng để dễ đọc */
  padding: 10px 20px; /* Thêm padding để nút to hơn */
  border: none; /* Loại bỏ đường viền */
  cursor: pointer; /* Thêm hiệu ứng con trỏ khi di chuột qua */
  border-radius: 5px; /* Làm mềm các góc */
  font-size: 16px; /* Tăng kích thước chữ */
  transition: background-color 0.3s; /* Hiệu ứng chuyển đổi màu nền */
  text-align: center;
  font-weight: bold;
  width: 300px;
}
/* Style for disabled button */
.btn-orange-yellow:disabled {
  background-color: #cccccc; /* Màu xám */
  color: #666666; /* Màu chữ xám nhạt */
}
</style>
