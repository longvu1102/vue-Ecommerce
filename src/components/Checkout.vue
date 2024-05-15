<template>
  <div class="checkout-container container mt-4">
    <h2 class="checkout-title">Thanh toán</h2>

    <!-- Hiển thị tên người dùng -->
    <h4 class="user-name">Tên người dùng: {{ getUsername }}</h4>

    <!-- Thông tin sản phẩm trong giỏ hàng -->
    <div class="cart-items">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="cart-item border p-3 mb-3"
      >
        <div class="row">
          <div class="col-md-3">
            <img
              :src="require(`@/assets/images/${item.imageUrl}`)"
              alt="Product Image"
              class="product-image"
            />
          </div>
          <div class="col-md-6 mt-5">
            <div class="item-details ml-3">
              <span class="product-name font-weight-bold">{{ item.name }}</span>
              <br />
              <!-- Hiển thị Size sản phẩm -->
              <span class="product-size">Size: {{ item.selectedSize }}</span>
              <br />
              <!-- Hiển thị giá sản phẩm -->
              <span
                class="product-price"
                style="font-size: 17px; font-weight: bold"
              >
                Giá: {{ item.price.toFixed(2) }}$
              </span>
              <br />
              <!-- Hiển thị số lượng sản phẩm -->
              <span class="product-quantity"
                >Số lượng: {{ item.quantity }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Thông tin thanh toán -->
    <div class="payment-info mt-4">
      <h3 class="payment-title">Thông tin thanh toán</h3>
      <div class="form-group">
        <label for="phone">Số điện thoại:</label>
        <input type="text" id="phone" v-model="phone" class="form-control" />
      </div>
      <div class="form-group">
        <label for="address">Địa chỉ:</label>
        <input
          type="text"
          id="address"
          v-model="address"
          class="form-control"
        />
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="city">Thành phố:</label>
          <input type="text" id="city" v-model="city" class="form-control" />
        </div>
        <div class="form-group col-md-6">
          <label for="district">Quận/Huyện:</label>
          <input
            type="text"
            id="district"
            v-model="district"
            class="form-control"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="ward">Phường/Xã:</label>
        <input type="text" id="ward" v-model="ward" class="form-control" />
      </div>
      <div class="form-group">
        <label for="paymentMethod">Phương thức thanh toán:</label>
        <select id="paymentMethod" v-model="paymentMethod" class="form-control">
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>
      <div class="form-group">
        <label for="voucher">Mã giảm giá:</label>
        <input
          type="text"
          id="voucher"
          v-model="voucher"
          class="form-control"
        />
        <button @click="applyVoucher" class="btn btn-primary mt-2">
          Áp dụng
        </button>
      </div>
    </div>

    <!-- Tổng tiền và nút thanh toán -->
    <div class="cart-total text-right">
      <h4>Tổng: {{ formattedTotalAmount }}$</h4>
      <button @click="handleCheckout" class="btn btn-checkout btn-block">
        Thanh toán
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckoutComponent",
  computed: {
    getUsername() {
      return this.$store.getters.getUsername;
    },
    cartItems() {
      return this.$store.state.checkoutCart;
    },
    totalAmount() {
      return this.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    formattedTotalAmount() {
      return this.totalAmount.toFixed(2);
    },
  },
  data() {
    return {
      phone: "",
      address: "",
      city: "",
      district: "",
      ward: "",
      paymentMethod: "online",
      voucher: "",
    };
  },
  methods: {
    applyVoucher() {
      // Logic xử lý voucher, ví dụ như kiểm tra tính hợp lệ, giảm giá...
      alert(`Voucher ${this.voucher} đã được áp dụng.`);
    },
    async handleCheckout() {
      // Logic xử lý khi người dùng xác nhận thanh toán
      const orderDetails = {
        phone: this.phone,
        address: this.address,
        city: this.city,
        district: this.district,
        ward: this.ward,
        paymentMethod: this.paymentMethod,
        voucher: this.voucher,
        cartItems: this.cartItems,
      };
      
      if (this.cartItems.length > 0){
        try {
          await this.$store.commit("updateStockAfterPayment", { cartItems: [...this.cartItems], });
          this.$store.commit("emptyCart");
          alert("Successfully checked out all items!");
        } catch(error) {
          console.error("Error while checking out:", error);
          alert("An error occurred while checking out, please try again later");
        }
      } else {
        alert("Your cart is empty, there are no items to checkout");
      }
     
      console.log("Thông tin đơn hàng:", orderDetails);
    },
  },
};
</script>

<style scoped>
.checkout-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
}

.checkout-title {
  color: #c62b0c;
}

.cart-item {
  background-color: #f8f9fa;
  border-radius: 10px;
}

.cart-item img {
  height: 200px;
  width: 200px;
  object-fit: contain;
  border-radius: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.btn-checkout {
  color: black;
  padding: 10px;
  background-color: #f4640b;
  border: none;
  height: 40px;
  border-radius: 20px;
  margin-bottom: 10px;
}

.loading-spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #c62b0c;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 50px auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
