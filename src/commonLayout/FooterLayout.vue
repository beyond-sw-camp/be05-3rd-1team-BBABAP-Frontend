<template>
  <footer class="footer">
    <hr class="footer-line">
    <div class="footer-content">
      <div class="footer-left">
        <img src="https://github.com/beyond-sw-camp/be05-2nd-1team-BBABAP/assets/113917104/aa9c8201-c25c-4553-89cb-bcf0a741ce58" alt="전기차 로고">
        <p>전기차를 사랑하는 사람들을 위한 커뮤니티</p>
      </div>
      <div class="footer-right">
        <ul>
          <li><a href="#">이용약관</a></li>
          <li><a href="#">개인정보처리방침</a></li>
          <li><a href="#">문의하기</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  // 필요한 로직이 있다면 여기에 추가하세요.
}
</script>

<style scoped>
.footer {
  background-color: #343a40; /* 배경색 변경 */
  color: #fff; /* 텍스트 색상 변경 */
  padding: 20px 0;
  text-align: center;
}

.footer-line {
  border: none;
  border-top: 1px solid #dee2e6;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-left img {
  width: 100px; /* 로고 이미지에 맞게 조정 */
}

.footer-left p {
  margin-top: 10px;
  font-size: 14px;
}

.footer-right ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-right ul li {
  display: inline-block;
  margin-left: 20px;
}

.footer-right ul li:first-child {
  margin-left: 0;
}

.footer-right ul li a {
  color: #fff; /* 링크 텍스트 색상 변경 */
  text-decoration: none;
  transition: color 0.3s ease; /* 링크에 호버 효과 추가 */
}

.footer-right ul li a:hover {
  color: #ffc107; /* 호버 시 색상 변경 */
}
</style>
