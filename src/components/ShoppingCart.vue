<template>
  <div class="shopping-cart container mt-4">
    <div v-if="loading" class="text-center">
      <div class="loading-spinner"></div>
    </div>
    <div v-else>
      <div v-if="cartItems && cartItems.length == 0">
        <h1 class="empty-cart-message text-center">
          Your shopping cart is empty, please add items to the cart
        </h1>
      </div>
      <div v-else>
        <h2 class="cart-title">Shopping Cart</h2>
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
                  <span class="product-name font-weight-bold">{{
                    item.name
                  }}</span>
                  <br />
                  <span class="product-size"
                    >Size: {{ item.selectedSize }}</span
                  >
                  <br />
                  <span
                    class="product-price"
                    style="font-size: 17px; font-weight: bold"
                    >Price: {{ item.price.toFixed(2) }}$</span
                  >
                </div>
              </div>
              <div class="col-md-3 mt-4">
                <div class="item-actions">
                  <span>Quantity :</span>
                  <input
                    type="number"
                    v-model="item.quantity"
                    min="1"
                    class="quantity-input  mb-2"
                    @input="updateTotalAmount"
                  />
                  <button
                    @click="confirmRemoveFromCart(item)"
                    class="btn btn-danger remove-button btn-block"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-total text-right">
          <h4>Total: {{ formattedTotalAmount }}$</h4>
          <button @click="placeOrderForAll" class="btn-checkout btn-block">
            Checkout All
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "ShoppingCartComponent",
  computed: {
    cartItems() {
      return this.$store.state.cart;
    },
    loading() {
      return this.cartItems.length === 0 && !this.cartLoaded;
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
      cartLoaded: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.cartLoaded = true;
    }, 2000);
  },
  methods: {
    confirmRemoveFromCart(item) {
      const confirmDelete = window.confirm(
        `Are you sure you want to remove ${item.name} from the cart?`
      );
      if (confirmDelete) {
        this.removeFromCart(item.id);
      }
    },
    removeFromCart(productId) {
      this.$store.commit("removeFromCart", productId);
    },
    async placeOrderForAll() {
      if (this.cartItems.length > 0) {
        try {
          await this.$store.commit("updateStockAfterPayment", {
            cartItems: [...this.cartItems],
          });
          this.$store.commit("emptyCart");
          alert("Successfully checked out all items!");
        } catch (error) {
          console.error("Error while checking out:", error);
          alert("An error occurred while checking out, please try again later");
        }
      } else {
        alert("Your cart is empty, there are no items to checkout");
      }
    },
    updateTotalAmount() {
      for (const item of this.cartItems) {
        const product = this.$store.state.products.find(
          (prod) => prod.id === item.id
        );
        if (product) {
          const sizeIndex = product.sizes.findIndex(
            (size) => size.size === item.selectedSize
          );
          if (sizeIndex !== -1) {
            const maxQuantity = product.sizes[sizeIndex].instock;
            if (item.quantity > maxQuantity) {
              alert(
                `You have added more than the available quantity of ${item.name}`
              );
              item.quantity = maxQuantity;
            }
          }
        }
      }
    },
  },
};
</script>
 
<style scoped>
.quantity-input {
  margin: 10px;
  margin-top: 10px;
  border-radius: 10px;
  text-align: center;
  height: 35px;
  border: 1px solid transparent;
  outline: none;
}
 
.quantity-input:focus {
  box-shadow: 0 0 0 2px #f4640b, 0 0 0 2px #f4640b;
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
.cart-title {
  color: #c62b0c;
}
 
.quantity-input {
  width: 70px;
}
.btn-checkout{
  color: black;
  padding: 10px;
  background-color: #f4640b;
  border: none;
  height: 40px;
  border-radius: 20px;
  margin-bottom: 10px;
}
.remove-button {
  color: black;
  padding: 10px;
  background-color: #f4640b;
  border: none;
  width: 80px;
  border-radius: 20px;
}
 
.loading-spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #c62b0c;
}
 
.empty-cart-message {
  font-size: 20px;
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
 