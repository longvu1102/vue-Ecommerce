<!-- Sau khi sửa -->
<template>
  <footer class="text-white">
    <div class="container py-4">
      <div class="row">
        <div class="col-lg-3">
          <div class="mb-4">
            <h2 style="font-size: 20px">Information</h2>
            <ul class="list-unstyled">
              <li><a href="#">Find A Store</a></li>
              <li><a href="#">Become A Member</a></li>
              <li><a href="#">Student Discount</a></li>
              <li><a href="#">Send Us Feedback</a></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="mb-4">
            <h2 style="font-size: 20px">Help</h2>
            <ul class="list-unstyled">
              <li><a href="#">Get Help</a></li>
              <li><a href="#">Order Status</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Payment Option</a></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="mb-4">
            <h2 style="font-size: 20px">Company</h2>
            <ul class="list-unstyled">
              <li><a href="#">About Nike</a></li>
              <li><a href="#">Investors</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">News</a></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="text-center">
           
            <ul class="list-inline social-icons">
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
      </div>
    </div>
  

    <!-- Thanh nav mới -->
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <a class="nav-link" href="#">© 2024 Nike, Inc. All Rights Reserved</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Guides</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Terms of Sale</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Terms of Use</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Nike Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent", // Thay đổi tên thành một từ ngữ khác
  // Các phần khác của component
};
</script>

<style scoped>

footer {
  padding: 30px;
  background-color: #000;
  font-family: "Oswald", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

footer a {
  font-size: 15px;
  color: #888;
  text-decoration: none;
}

footer a:hover {
  color: #fff;
}

footer ul {
  list-style: none;
  padding: 0;
}

footer h2 {
  font-size: 20px;
}

.social-icons i {
  font-size: 24px;
  margin-right: 15px;
}

.bg-secondary {
  background-color: #333;
  color: #fff;
}
</style>
