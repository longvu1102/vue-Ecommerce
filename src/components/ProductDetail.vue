<template>
  <div class="product-detail">
    <div class="container">
      <h2>Detail</h2>
      <div class="product-info">
        <div class="product-image">
          <img
            v-if="product && product.imageUrl"
            :src="require(`@/assets/images/${product.imageUrl}`)"
            alt="Hình ảnh sản phẩm"
            class="product-image"
          />
          <!-- Thumbnail images -->
          <div class="thumbnail-images" v-if="product && product.thumbnails">
            <img
              v-for="(thumbnail, index) in product.thumbnails"
              :key="index"
              :src="require(`@/assets/images/${thumbnail}`)"
              alt="Thumbnail"
              class="thumbnail"
              @mouseover="displayImage(thumbnail)"
              style="width: 100px; height: 100px; object-fit: cover"
            />
          </div>
        </div>
        <div class="product-details">
          <div v-if="product">
            <h3>{{ product.name }}</h3>
            <p v-if="product.price !== undefined" class="product-price">
              Price: {{ formatCurrency(product.price) }} $
            </p>
            <p class="product-description">{{ product.description }}</p>
            <!-- Select box for size -->
            <div class="form-group mb-3">
              <label class="select-label">Select size:</label>
              <div class="size-buttons">
                <button
                  v-for="(sizeItem, index) in product.sizes"
                  :key="index"
                  :class="{
                    'selected-size':
                      selectedSize === sizeItem.size && sizeItem.instock > 0,
                    'size-out-of-stock': sizeItem.instock === 0,
                  }"
                  @click="updateSelectedSize(sizeItem.size)"
                  :disabled="sizeItem.instock === 0"
                >
                  {{ sizeItem.size }} ({{ sizeItem.instock }})
                </button>
              </div>
            </div>
            <button @click="addToCart(product)" class="add-to-cart-button">
              Add to Cart
            </button>
          </div>
          <div v-else>Loading product information...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductDetailPage",
  data() {
    return {
      product: null,
      selectedSize: null,
      thumbnailImages: [],
      showSizeSelect: false,
    };
  },
  computed: {
    productStock() {
      const stock = {};
      if (this.product) {
        this.product.sizes.forEach((sizeItem) => {
          stock[sizeItem.size] = sizeItem.instock;
        });
      }
      return stock;
    },
  },
  mounted() {
    this.loadProductDetails(this.$route.params.id).then(() => {
      this.updateAvailableSize();
    });
  },
  methods: {
    async loadProductDetails(productId) {
      const response = await fetch(
        `http://localhost:3000/Products/?id=${productId}`
      );
      const productData = await response.json();
      this.product = productData[0];
      this.updateAvailableSize();
      return Promise.resolve();
    },
    updateAvailableSize() {
      const firstAvailableSize = this.product.sizes?.find(
        (sizeItem) => sizeItem.instock > 0
      );
      this.selectedSize = firstAvailableSize ? firstAvailableSize.size : null;
    },
    addToCart(product) {
      if (this.$store.getters.isLoggedIn) {
        if (!this.selectedSize) {
          alert("Vui lòng chọn size");
          return;
        }
        // Thêm sản phẩm vào giỏ hàng
        const productWithSize = {
          ...product,
          selectedSize: this.selectedSize, // Lưu thông tin size
        };
        this.$store.commit("addToCart", productWithSize);
        // Hiển thị thông báo và chuyển hướng đến trang giỏ hàng
        alert("Đã thêm sản phẩm vào giỏ hàng!");
        this.$router.push("/cart");
      } else {
        // Redirect đến trang đăng nhập nếu chưa đăng nhập
        alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
        this.$router.push("/login");
      }
    },
    formatCurrency(value) {
      // Format currency with comma separator
      return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    },
    displayImage(image) {
      this.product.imageUrl = image;
    },
    updateSelectedSize(size) {
      this.selectedSize = size;
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
.product-detail {
  padding: 20px;
}

.product-info {
  display: flex;
  justify-content: space-between;
}

.product-image {
  border-radius: 10px;
  width: 50%;
}

.thumbnail-images {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-right: 318px;
  border-radius: 20px;
}

.thumbnail {
  border-radius: 10px;
  padding: 10px;
  margin-right: 5px;
  cursor: pointer;
}

.product-details {
  width: 45%;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
}

.product-description {
  margin-top: 10px;
  line-height: 1.5;
}

.size-buttons {
  margin-top: 10px;
}

.size-buttons button {
  margin-right: 10px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f5f5f5;
  color: #333;
  cursor: pointer;
}

.size-buttons button.selected-size {
  border-radius: 10px;
  border: 2px solid #ee8012;
  color: #0f0606;
}

.size-buttons button.size-out-of-stock {
  background-color: #ddd;
  color: #777;
  cursor: not-allowed;
}

.add-to-cart-button {
  border: none;
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #ee8012;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.add-to-cart-button:hover {
  background-color: #dde0e3;
  transition: all 0.2s;
}
</style>
