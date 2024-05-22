<script setup></script>

<template>
  <footer class="footer">
    <div class="top-row">
      <div class="column">
        <div class="logo">CompanyLogo</div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div class="column">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>
      <div class="column">
        <h4>Resources</h4>
        <ul>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Help Center</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
        </ul>
      </div>
      <div class="column">
        <h4>Contact Us</h4>
        <p>1234 Street Name, City, State, 12345</p>
        <p>Email: info@company.com</p>
        <p>Phone: (123) 456-7890</p>
        <div class="social-media">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </div>
    <div class="bottom-row">
      <div>
        <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
      </div>
      <div>&copy; 2024 CompanyName. All rights reserved.</div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #333;
  color: #fff;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.footer .top-row {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}
.footer .column {
  width: 25%;
}
.footer .logo {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}
.footer .column h4 {
  margin-bottom: 10px;
  font-size: 18px;
}
.footer .column ul {
  list-style: none;
  padding: 0;
}
.footer .column ul li {
  margin-bottom: 10px;
}
.footer .column ul li a {
  color: #ccc;
  text-decoration: none;
}
.footer .social-media {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
.footer .social-media a {
  color: #fff;
  font-size: 24px;
  text-decoration: none;
}
.footer .bottom-row {
  width: 80%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.footer .bottom-row a {
  color: #ccc;
  text-decoration: none;
}
</style>
