<script setup></script>

<template>
  <footer class="footer">
    <div class="top-row">
      <div class="column">
        <div class="logo">
          <img src="../assets/img/homeis-white.png" style="width: 200px" />
        </div>
        <p class="author">회원님의 새로운 보금자리를 발견하시기를 기원합니다</p>
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
        <div class="person">
          <p>장준석</p>
          <div class="social-media">
            <a href="https://github.com/junseok-99"
              ><i class="fab fa-github"></i
            ></a>
          </div>
        </div>
        <div class="person">
          <p>조성정</p>
          <div class="social-media">
            <a href="https://github.com/Jo-SeongJeong"
              ><i class="fab fa-github"></i
            ></a>
          </div>
        </div>
        <div class="person">
          <p>조용훈</p>
          <div class="social-media">
            <a href="https://github.com/sjsin0905"
              ><i class="fab fa-github"></i
            ></a>
          </div>
        </div>
        <!-- <p>Email: info@company.com</p>
        <p>Phone: (123) 456-7890</p> -->
      </div>
    </div>
    <div class="bottom-row">
      <div>
        <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
      </div>
      <div>&copy; 2024 HomeIs. All rights reserved.</div>
    </div>
  </footer>
</template>

<style scoped>
.person {
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}

.footer {
  background-color: #333;
  color: #fff;
  display: flex;
  padding-top: 15px;
  flex-direction: column;
  align-items: center;
  height: 200px;
}
.footer .top-row {
  width: 90%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
  gap: 5vw;
}
.footer .column {
  width: 30%;
  text-align: center;
}
.footer .logo {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.author {
  padding-top: 5px;
  white-space: nowrap; /* 텍스트를 한 줄로 만듭니다 */
  overflow: visible; /* overflow를 visible로 설정하여 텍스트가 div를 삐져나오게 합니다 */
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
  /* margin-top: 20px; */
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
