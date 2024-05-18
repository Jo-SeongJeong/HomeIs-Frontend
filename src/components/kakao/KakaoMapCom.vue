<script setup>
import { KakaoMap } from "vue3-kakao-maps";
import { ref } from "vue";

const lat = ref(36.3549777);
const lng = ref(127.2983403);
const map = ref();

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
  // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
  const mapTypeControl = new kakao.maps.MapTypeControl();
  const mapZoomControl = new kakao.maps.ZoomControl();
  // 지도 타입 컨트롤을 지도에 표시합니다
  map.value.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
  map.value.addControl(mapZoomControl, kakao.maps.ControlPosition.BOTTOMRIGHT);
};
</script>

<template>
  <KakaoMap
    :lat="lat"
    :lng="lng"
    @onLoadKakaoMap="onLoadKakaoMap"
    width="100vw"
    height="100vh"
  />
</template>

<style scoped></style>
