import { createRouter, createWebHistory } from 'vue-router';
import { ref } from 'vue'; // Import ref from Vue

export const isAuthenticated = ref(false); // Xuất isAuthenticated từ router

const routes = [
  { 
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ 'views/Home.vue') // Lazy load Home component
  },
  { 
    path: '/cart/:id',
    component: () => import(/* webpackChunkName: "cart" */ 'views/ShoppingCartPage.vue') // Lazy load ShoppingCartPage component
  },
  { 
    path: '/cart',
    component: () => import(/* webpackChunkName: "cart" */ 'views/ShoppingCartPage.vue') // Lazy load ShoppingCartPage component
  },
  { 
    path: '/search',
    component: () => import(/* webpackChunkName: "cart" */ 'views/Search.vue') // Lazy load ShoppingCartPage component
  },
  { 
    path: '/products',
    component: () => import(/* webpackChunkName: "products" */ 'views/Product.vue') // Lazy load Product component
  },
  {
    path: '/productdetail/:id',
    component: () => import(/* webpackChunkName: "productdetail" */ 'views/ProductDetailPage.vue')
  },
  { 
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ 'views/LoginPage.vue') // Lazy load Login component
  },
  { 
    path: '/register',
    component: () => import(/* webpackChunkName: "login" */ 'views/RegisterPage.vue') // Lazy load Login component
  },
  { 
    path: '/contact',
    component: () => import(/* webpackChunkName: "contact" */ 'views/LienHe.vue') // Lazy load Lienhe component
  },
  { 
    path: '/blog',
    component: () => import(/* webpackChunkName: "blog" */ 'views/Blog.vue') // Lazy load Blog component
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Kiểm tra xem người dùng đã đăng nhập chưa
  // if (to.path !== '/login' && !isAuthenticated.value) {
    // Nếu chưa đăng nhập và truy cập trang khác login, chuyển hướng đến trang login
    // next('/login');
  // } else if (to.path === '/login' && isAuthenticated.value) {
    // Nếu đã đăng nhập và truy cập trang login, chuyển hướng đến trang home
    // next('/');
  // } else {
    // Nếu đã đăng nhập hoặc truy cập trang login, cho phép tiếp tục
    next();
  // }
});

export default router;
