import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    isLoggedIn: false,
    user: {
      username: "",
    },
    cart: [],
    redirectToLogin: false,
    products: [],
  },
  mutations: {
    emptyCart(state) {
      state.cart = [];
      localStorage.removeItem("cart");
    },
    // Trong mutations
    updateStockAfterPayment(state, { cartItems }) {
      cartItems.forEach((item) => {
        const product = state.products.find((product) => product.id === item.id);
        if (product) {
          const sizeIndex = product.sizes.findIndex((size) => size.size === item.selectedSize);
          if (sizeIndex !== -1) {
            product.sizes[sizeIndex].instock -= item.quantity;
            if (product.sizes[sizeIndex].instock < 0) {
              product.sizes[sizeIndex].instock = 0;
            }
          }
          // Cập nhật tồn kho cho từng sản phẩm trên server
          axios.put(`http://localhost:3000/Products/${item.id}`, product)
            .then(response => {
              console.log(`Dữ liệu tồn kho cho ${item.name} đã được cập nhật trên server: ${response.data}`);
            })
            .catch(error => {
              console.error(`Lỗi khi cập nhật tồn kho cho ${item.name} trên server: ${error}`);
            });
        } else {
          console.error(`Không tìm thấy sản phẩm có ID: ${item.id}`);
        }
      });
    },

    LOAD_PRODUCTS(state, products) {
      state.products = products;
    },
    addToCart(state, product) {
      // Lấy ID người dùng từ trạng thái store
      const userId = state.user.userId;
    
      const existingProduct = state.cart.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize === product.selectedSize &&
          item.userId === userId // Kiểm tra sản phẩm có cùng ID người dùng không
      );
    
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        const cartItem = {
          ...product,
          quantity: 1,
          selectedSize: product.selectedSize,
          userId: userId, // Lưu ID người dùng vào mỗi sản phẩm trong giỏ hàng
        };
        state.cart.push(cartItem);
      }
    
      // Cập nhật giảm tồn kho
      this.commit("decrementStock", {
        id: product.id,
        size: product.selectedSize,
        quantity: 1,
      });
    
      // Lưu giỏ hàng vào localStorage, đảm bảo ID người dùng cũng được lưu
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    

    removeFromCart(state, productId) {
      const removedProduct = state.cart.find((item) => item.id === productId);
      const productIndex = state.cart.findIndex(
        (item) => item.id === productId
      );
      if (productIndex !== -1) {
        state.cart.splice(productIndex, 1);

        // Tăng số lượng tồn kho của sản phẩm khi bị xóa khỏi giỏ hàng
        this.commit("updateStock", {
          id: productId,
          size: removedProduct.size,
          quantity: removedProduct.quantity,
        });

        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    restoreCart(state, cart) {
      state.cart = cart;
    },
    login(state, { username, userId }) {
      state.isLoggedIn = true;
      state.user.username = username;
      state.user.userId = userId; // Lưu ID người dùng
      // Lưu trữ ID người dùng và trạng thái đăng nhập vào localStorage
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userId", userId);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user.username = "";
     
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
     
    },
    resetRedirectToLogin(state) {
      state.redirectToLogin = false;
    },
    updateUsername(state, { username }) {
      state.user.username = username;
    },
    updateStock(state, { id, size, quantity }) {
      const product = state.products.find((product) => product.id === id);
      if (product) {
        if (size === "size1") {
          product.instock1 += quantity;
        } else if (size === "size2") {
          product.instock2 += quantity;
        } else if (size === "size3") {
          product.instock3 += quantity;
        }
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },
    decrementStock(state, { id, selectedSize, quantity }) {
      const product = state.products.find((product) => product.id === id);
      if (product) {
        const sizeIndex = product.sizes.findIndex(
          (size) => size.size === selectedSize
        );
        if (sizeIndex !== -1) {
          product.sizes[sizeIndex].instock -= quantity;
          if (product.sizes[sizeIndex].instock < 0) {
            product.sizes[sizeIndex].instock = 0;
          }
        }
      } else {
        console.error("Không tìm thấy sản phẩm");
      }
    },
  },
  actions: {
    async fetchData({ commit }) {
      try {
        const response = await axios.get("http://localhost:3000/Products");
        commit("LOAD_PRODUCTS", response.data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    },
    restoreCart({ commit }) {
      const userId = localStorage.getItem("userId");
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const userCart = savedCart.filter(item => item.userId === userId);
      commit('restoreCart', userCart);
    },
    addToCart({ commit, state }, product) {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (
        !existingProduct ||
        existingProduct.instock[product.selectedSize] -
          existingProduct.quantity -
          1 >=
          0
      ) {
        commit("addToCart", product);
      } else {
        alert("Sản phẩm đã hết hàng");
      }
    },
    async login({ commit }, { username }) {
      try {
        // Thực hiện xác thực đăng nhập ở đây

        // Nếu đăng nhập thành công, gọi mutation để cập nhật tên đăng nhập
        commit("updateUsername", { username });

        // Tiếp tục các hành động khác sau khi đăng nhập thành công
      } catch (error) {
        // Xử lý lỗi nếu có
      }
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    getUsername: (state) => state.user.username,
  },
  plugins: [
    (store) => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
  
      if (isLoggedIn === "true") {
        const storedUserId = localStorage.getItem("userId"); // Lấy ID người dùng từ localStorage
        const currentUserId = store.state.user.userId; // Lấy ID người dùng hiện tại từ Vuex store
  
        if (storedUserId !== currentUserId) {
          // Nếu ID người dùng từ localStorage không khớp với ID người dùng hiện tại trong store
          store.commit("logout"); // Đăng xuất người dùng hiện tại
          localStorage.removeItem("cart"); // Xóa giỏ hàng từ localStorage
          alert("Đã đăng xuất khỏi tài khoản trước đó. Vui lòng đăng nhập lại!");
          return; // Dừng lại và không tiếp tục khôi phục giỏ hàng
        }
  
        // Nếu ID người dùng khớp, tiếp tục khôi phục giỏ hàng từ localStorage
        const cart = localStorage.getItem("cart");
        if (cart) {
          store.commit("restoreCart", JSON.parse(cart));
        }
        // Tiếp tục đăng nhập với tên người dùng từ localStorage
        store.commit("login", { 
          username: localStorage.getItem("username"), 
          userId: storedUserId 
        });
      } else {
        alert("Vui lòng đăng nhập lại!");
        // Hoặc bạn cũng có thể redirect đến trang Đăng nhập tại đây
      }
    },
  ],
  
  
});

export default store;
