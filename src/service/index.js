const BASE_URL = "http://localhost:3000";

// Gọi API
async function fetchData(endpoint, method = "GET", data = null) {
  const requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    requestOptions.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, requestOptions);
    if (!response.ok) {
      throw new Error(`Kết nối thất bại ${endpoint}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Lấy tất cả sản phẩm từ API
export async function fetchProducts() {
  return await fetchData("Products");
}
// Lấy tất cả sản phẩm demo từ API
export async function fetchProductDemo() {
  return await fetchData("ProductDemo");
}

// Lấy thông tin người dùng từ API
export async function fetchUser() {
  return await fetchData("User");
}
// Thêm thông tin người dùng vào API
export async function addUser(userData) {
  try {
    const response = await fetchData("User", "POST", userData);
    // Kiểm tra xem phản hồi từ API có được trả về không
    if (response) {
      console.log("Người dùng đã được thêm vào hệ thống:");
      // Trả về phản hồi từ API nếu cần thiết
      return response;
    } else {
      // Nếu không có phản hồi, ném ra một lỗi
      throw new Error("Không có phản hồi từ API khi thêm người dùng");
    }
  } catch (error) {
    console.error("Lỗi khi thêm người dùng:", error);
    // Ném ra lỗi để bắt ở phần gọi addUser
    throw error;
  }
}
// Thêm sản phẩm vào API
export async function addProduct(product) {
  return await fetchData("Products", "POST", product);
}

// Cập nhật thông tin sản phẩm trong API
export async function updateProduct(id, updatedProduct) {
  return await fetchData(`Products/${id}`, "PUT", updatedProduct);
}

// Xóa sản phẩm khỏi API
export async function deleteProduct(id) {
  return await fetchData(`Products/${id}`, "DELETE");
}

// Tìm kiếm sản phẩm theo tên trong API và lọc kết quả bằng biểu thức chính quy
export async function searchProductByName(name) {
  const products = await fetchProducts();
  return products.filter((product) =>
    product.name.toLowerCase().startsWith(name.toLowerCase())
  );
}

// Thêm sản phẩm vào giỏ hàng từ trang tìm kiếm
// Add a product to the cart
export async function addToCart(product) {
  try {
    // Check if the product is already in the cart
    const existingCartProduct = await fetchData(
      `CartProducts?productId=${product.id}`
    );
    if (existingCartProduct.length > 0) {
      // If the product is already in the cart, update its quantity
      const updatedQuantity = existingCartProduct[0].quantity + 1;
      await fetchData(`CartProducts/${existingCartProduct[0].id}`, "PUT", {
        quantity: updatedQuantity,
      });
    } else {
      // If the product is not in the cart, add it to the cart
      await fetchData("CartProducts", "POST", {
        productId: product.id,
        quantity: 1,
      });
    }
    console.log("Sản phẩm đã được thêm vào giỏ hàng:", product);
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    throw error;
  }
}
