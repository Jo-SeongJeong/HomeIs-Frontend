<script setup></script>

<template>
  <div id="side-main">
    <div id="side-content">
      <div id="content-name">{이부분에 아파트 이름}</div>
      <div id="content-address">
        {이부분에 아파트 주소 예를 들어 대전 덕명동 어쩌구 저쩌구
        가나다라마바사}
      </div>
      <div id="content-navbar">
        <div id="content-navbar-chose">시세</div>
        <div id="content-navbar-chose">건물정보</div>
        <div id="content-navbar-chose">주변정보</div>
      </div>
      <div id="content-view-good">
        <div id="good">
          <div id="good-image"></div>
          <div id="count">{777}</div>
        </div>
        <div id="view">
          <div id="view-image"></div>
          <div id="count">{777}</div>
        </div>
      </div>
      <div id="load-view">이곳에 로드뷰 연동</div>
      <div id="trade-log">
        <div id="trade-log-header">시세 조회</div>
        <div id="trade-log-content"></div>
      </div>
      <div id="info">
        <div id="info-title">건물 정보</div>
        <div id="info-content"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#side-main {
  position: absolute;
  width: 35vw;
  height: 93vh;
  left: 0;
  top: 7vh;
  z-index: 100;
  background-color: white;
  overflow: scroll;
  #side-content {
    width: 100%;
    height: 200vh;
  }
}

#content-name {
  width: 100%;
  font-size: 2rem;
  padding: 3vh;
  background-color: aqua;
}
#content-address {
  width: 100%;
  padding-left: 3vh;
  padding-right: 3vh;
  font-size: 1.2rem;
  margin-bottom: 1vh;
}
#content-navbar {
  width: 100%;
  padding: 3vh;
  background-color: aqua;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  display: flex;
  justify-content: space-around;
}
#content-view-good {
  width: 100%;
  background-color: bisque;
  display: flex;
  justify-content: center;
  gap: 5vw;
}
#good {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#view {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#good-image {
  width: 4.5vw;
  height: 10vh;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("../../assets/img/good.png");
}
#view-image {
  width: 4.5vw;
  height: 10vh;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("../../assets/img/views.png");
}
#count {
  background-color: aqua;
}
#load-view {
  width: 100%;
  height: 50vh;
  padding: 3vh;
  /* background-color: aqua; */
  border-bottom: 1px solid black;
}
#trade-log {
  width: 100%;
  height: 50vh;
  #trade-log-header {
    padding: 2vh;
    font-size: 1.5rem;
  }
  #trade-log-content {
    width: 100%;
  }
}
#info {
  width: 100%;
  height: 50vh;
  #info-title {
    padding: 2vh;
    font-size: 1.5rem;
  }
  #info-content {
    width: 100%;
    height: 100%;
  }
}
</style>
