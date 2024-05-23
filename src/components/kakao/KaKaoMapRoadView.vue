<template>
  <div>
    <div ref="roadviewDiv" style="width: 100%; height: 40vh"></div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  position: {
    type: Object,
    required: true,
  },
});

const roadviewDiv = ref(null);

const updateRoadview = (lat, lng) => {
  console.log("UPDATE!!! = ", lat, lng);
  if (lat && lng) {
    // 로드뷰 객체를 생성
    const roadview = new kakao.maps.Roadview(roadviewDiv.value);
    // 로드뷰 도로 객체
    const roadviewClient = new kakao.maps.RoadviewClient();
    const positionV = new kakao.maps.LatLng(lat, lng);
    roadviewClient.getNearestPanoId(positionV, 50, (panoId) => {
      roadview.setPanoId(panoId, positionV);
    });

    // 로드뷰 초기 설정
    roadview.setViewpoint({
      pan: 321,
      tilt: 0,
      zoom: 0,
    });
  }
};

watch(
  () => props.position,
  (newVal) => {
    if (newVal.lat && newVal.lng) updateRoadview(newVal.lat, newVal.lng);
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style scoped>
#roadview {
  width: 100%;
  height: 500px;
}
</style>
