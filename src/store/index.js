import { createStore } from "vuex";
import axios from "axios";
import router from "@/router/index.js"; // Đảm bảo đường dẫn này trỏ đến file router.js

const store = createStore({
  state: {
    checkoutCart: [],
    currentUser: null,
    // isLoggedIn: một trạng thái boolean thể hiện người dùng hiện tại đã đăng nhập vào hệ thống hay chưa
    isLoggedIn: false,

    // user: một đối tượng chứa thông tin về người dùng hiện tại.
    // Ban đầu, username được khởi tạo rỗng "". Khi người dùng đăng nhập, thông tin này sẽ được cập nhật.
    user: {
      id: "",
      username: "",
      password: "", // Generally, you wouldn't store password in frontend state for security reasons
      phoneNumber: "",
      birthDate: "",
      gender: "",
      address: {
        street: "",
      },
    },

    // cart: một mảng dùng để lưu trữ những sản phẩm mà người dùng đã thêm vào giỏ hàng.
    cart: [],

    // redirectToLogin: trạng thái boolean dùng để kiểm soát nếu người dùng cần được điều hướng về trang đăng nhập hay không.
    redirectToLogin: false,

    // products: một mảng chứa thông tin về tất cả các sản phẩm có sẵn.
    products: [],
  },
  mutations: {
    updateCheckoutCart(state, cartItems) {
      state.checkoutCart = cartItems;
    },
  
    emptyCart(state) {
      state.cart = [];
      localStorage.removeItem("cart");
    },
    // Trong mutations
    updateStockAfterPayment(state, { cartItems }) {
      cartItems.forEach((item) => {
        const product = state.products.find(
          (product) => product.id === item.id
        );
        if (product) {
          const sizeIndex = product.sizes.findIndex(
            (size) => size.size === item.selectedSize
          );
          if (sizeIndex !== -1) {
            product.sizes[sizeIndex].instock -= item.quantity;
            if (product.sizes[sizeIndex].instock < 0) {
              product.sizes[sizeIndex].instock = 0;
            }
          }
          // Cập nhật tồn kho cho từng sản phẩm trên server
          axios
            .put(`http://localhost:3000/Products/${item.id}`, product)
            .then((response) => {
              console.log(
                `Dữ liệu tồn kho cho ${item.name} đã được cập nhật trên server: ${response.data}`
              );
            })
            .catch((error) => {
              console.error(
                `Lỗi khi cập nhật tồn kho cho ${item.name} trên server: ${error}`
              );
            });
        } else {
          console.error(`Không tìm thấy sản phẩm có ID: ${item.id}`);
        }
      });
    },

    LOAD_PRODUCTS(state, products) {
      state.products = products;
    },
    // Phương thức để thêm sản phẩm vào giỏ hàng
    addToCart(state, product) {
      // Lấy ID người dùng từ trạng thái Vuex store
      const userId = state.user.userId;

      // Tìm sản phẩm hiện tại trong giỏ hàng dựa trên ID sản phẩm, kích thước, và ID người dùng
      const existingProduct = state.cart.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize === product.selectedSize &&
          item.userId === userId
      );

      // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
      if (existingProduct) existingProduct.quantity++;
      // Nếu sản phẩm không tồn tại trong giỏ hàng, tạo một item mới và thêm vào giỏ
      else {
        const cartItem = {
          ...product,
          quantity: 1,
          selectedSize: product.selectedSize,
          userId: userId,
        };
        state.cart.push(cartItem);
      }

      // Giảm số lượng tồn kho của sản phẩm sau khi thêm vào giỏ hàng
      this.commit("decrementStock", {
        id: product.id,
        size: product.selectedSize,
        quantity: 1,
      });

      // Lưu trữ giỏ hàng vào localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    // Phương thức để xóa sản phẩm khỏi giỏ hàng
    removeFromCart(state, productId) {
      // Tìm sản phẩm và vị trí của nó trong giỏ hàng dựa trên ID sản phẩm
      const removedProduct = state.cart.find((item) => item.id === productId);
      const productIndex = state.cart.findIndex(
        (item) => item.id === productId
      );

      // Nếu tìm thấy sản phẩm, loại bỏ nó khỏi giỏ hàng
      if (productIndex !== -1) {
        state.cart.splice(productIndex, 1);

        // Tăng số lượng tồn kho của sản phẩm sau khi xóa khỏi giỏ
        this.commit("updateStock", {
          id: productId,
          size: removedProduct.size,
          quantity: removedProduct.quantity,
        });

        // Cập nhật lại localStorage với giỏ hàng mới
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    restoreCart(state, cart) {
      state.cart = cart;
    },
    login(state, { username, userId }) {
      state.isLoggedIn = true;
      state.user.username = username;
      state.user.userId = userId;
    
      // Lưu thông tin đăng nhập vào localStorage
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("username", username);
      localStorage.setItem("userId", userId);
    },
    
    logout(state) {
      state.isLoggedIn = false;
      state.user.username = "";
      state.user.userId = "";
    
      // Xóa thông tin đăng nhập khỏi localStorage
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
    },
    resetRedirectToLogin(state) {
      state.redirectToLogin = false;
    },
    updateUsername(state, { username }) {
      state.user.username = username;
    },
    // Phương thức để cập nhật số lượng sản phẩm còn hàng, dựa vào id và kích thước của sản phẩm
    updateStock(state, { id, size, quantity }) {
      // Tìm sản phẩm trong danh sách dựa trên id
      const product = state.products.find((product) => product.id === id);
      // Nếu tồn tại sản phẩm
      if (product) {
        // Tùy vào size mà cập nhật số lượng hàng còn lại cho mỗi size
        if (size === "size1") {
          product.instock1 += quantity;
        } else if (size === "size2") {
          product.instock2 += quantity;
        } else if (size === "size3") {
          product.instock3 += quantity;
        }
        // Cập nhật danh sách sản phẩm trong local storage
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },

    // Phương thức để giảm số lượng sản phẩm dựa trên id, kích thước và số lượng
    decrementStock(state, { id, selectedSize, quantity }) {
      // Tìm sản phẩm trong danh sách dựa trên id
      const product = state.products.find((product) => product.id === id);
      // Nếu tồn tại sản phẩm
      if (product) {
        // Tìm kích thước được chọn trong danh sách kích thước của sản phẩm
        const sizeIndex = product.sizes.findIndex(
          (size) => size.size === selectedSize
        );
        // Nếu tìm thấy kích thước trong danh sách
        if (sizeIndex !== -1) {
          // Giảm số lượng instock cho kích thước đó
          product.sizes[sizeIndex].instock -= quantity;
          // Nếu số lượng instock sau khi giảm dưới 0, set lại về 0
          if (product.sizes[sizeIndex].instock < 0) {
            product.sizes[sizeIndex].instock = 0;
          }
        }
        // Nếu không tìm thấy sản phẩm, hiện thông báo lỗi
      } else {
        console.error("Không tìm thấy sản phẩm");
      }
    },
  },
  actions: {
    checkout({ commit }, cartItems) {
      commit("updateCheckoutCart", cartItems);
      router.push("/checkout"); // Sử dụng 'router' thay vì 'this.$router'
    },
    async fetchData({ commit }) {
      try {
        const response = await axios.get("http://localhost:3000/Products");
        commit("LOAD_PRODUCTS", response.data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    },
    // Phương thức để khôi phục giỏ hàng từ local storage
    restoreCart({ commit }) {
      // Lấy userID từ local storage
      const userId = localStorage.getItem("userId");
      // Lấy giỏ hàng đã được lưu từ local storage hoặc trả về một mảng trống nếu không có dữ liệu
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      // Lọc ra các sản phẩm trong giỏ hàng thuộc về người dùng hiện tại
      const userCart = savedCart.filter((item) => item.userId === userId);
      // Sử dụng userCart để khôi phục giỏ hàng bằng một commit Vuex
      commit("restoreCart", userCart);
    },

    // Phương thức để thêm sản phẩm vào giỏ hàng
    addToCart({ commit, state }, product) {
      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
      const existingProduct = state.cart.find((item) => item.id === product.id);
      // Kiểm tra nếu sản phẩm chưa có trong giỏ hàng hoặc vẫn còn hàng
      if (
        !existingProduct ||
        existingProduct.instock[product.selectedSize] -
          existingProduct.quantity -
          1 >=
          0
      ) {
        // Điều kiện đúng, thêm sản phẩm vào giỏ hàng với commit Vuex
        commit("addToCart", product);
      } else {
        // Điều kiện sai, hiển thị cảnh báo sản phẩm hết hàng
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
  
        // Khôi phục giỏ hàng từ localStorage
        const cart = localStorage.getItem("cart");
        if (cart) {
          store.commit("restoreCart", JSON.parse(cart));
        }
        // Khôi phục trạng thái đăng nhập với tên người dùng từ localStorage
        store.commit("login", {
          username: localStorage.getItem("username"),
          userId: storedUserId,
        });
      }
    },
  ],
});

export default store;
