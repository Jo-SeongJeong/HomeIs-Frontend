<script setup>
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import { ref, watch } from "vue";
import axios from "axios";
import SearchBar from "@/components/map/SearchBar.vue";
const lat = ref(36.3549777);
const lng = ref(127.2983403);
const map = ref();
const beforePos = ref({ lng1: "", lat1: "", lng2: "", lat2: "" });
const receivedDongCodeList = ref({});
const afterMoveUpdateMarker = async (lng1, lat1, lng2, lat2) => {
  console.log("lng = ", lng1, lng2);
  const { data } = await axios.get(
    "http://localhost/homeis/map/dongCodes/" +
      lng1 +
      "/" +
      lat1 +
      "/" +
      lng2 +
      "/" +
      lat2
  );
  receivedDongCodeList.value = data;
};
const timer = (lng1, lat1, lng2, lat2) => {
  setTimeout(() => {
    if (
      beforePos.value.lng1 === lng1 &&
      beforePos.value.lat1 === lat1 &&
      beforePos.value.lng2 === lng2 &&
      beforePos.value.lat2 === lat2
    ) {
      afterMoveUpdateMarker(lng1, lat1, lng2, lat2);
    }
  }, 500);
};
const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
  // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
  const mapTypeControl = new kakao.maps.MapTypeControl();
  const mapZoomControl = new kakao.maps.ZoomControl();
  // 지도 타입 컨트롤을 지도에 표시합니다
  map.value.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
  map.value.addControl(mapZoomControl, kakao.maps.ControlPosition.BOTTOMRIGHT);
  console.log("지도 로드!!");
  kakao.maps.event.addListener(map.value, "bounds_changed", () => {
    // 지도 영역정보를 얻어옵니다
    var bounds = map.value.getBounds();
    // 영역정보의 남서쪽 정보를 얻어옵니다
    var swLatlng = bounds.getSouthWest();
    // 영역정보의 북동쪽 정보를 얻어옵니다
    var neLatlng = bounds.getNorthEast();
    let lng1 = swLatlng.La;
    let lat1 = swLatlng.Ma;
    let lng2 = neLatlng.La;
    let lat2 = neLatlng.Ma;
    beforePos.value.lng1 = swLatlng.La;
    beforePos.value.lat1 = swLatlng.Ma;
    beforePos.value.lng2 = neLatlng.La;
    beforePos.value.lat2 = neLatlng.Ma;
    timer(lng1, lat1, lng2, lat2);
  });
};
const dongCodeListHandler = (dongCodeList) => {
  receivedDongCodeList.value = dongCodeList;
  moveMap();
};
const moveMap = () => {
  if (
    receivedDongCodeList.value == null ||
    receivedDongCodeList.value.length == 0
  ) {
    return;
  }
  if (map.value) {
    const willMoveLat = receivedDongCodeList.value[0].lat;
    const willMoveLng = receivedDongCodeList.value[0].lng;
    map.value.panTo(new kakao.maps.LatLng(willMoveLat, willMoveLng));
  }
};
const emit = defineEmits(["sendAptCode"]);
const visibleRef = ref(false);
const onClickKakaoMapMarker = (aptCode) => {
  emit("sendAptCode", aptCode);
};
</script>

<template>
  <KakaoMap
    :lat="lat"
    :lng="lng"
    @onLoadKakaoMap="onLoadKakaoMap"
    width="100%"
    height="100%"
  >
    <KakaoMapMarker
      v-for="apartInfo in receivedDongCodeList"
      :key="apartInfo.aptCode"
      :lat="apartInfo.lat"
      :lng="apartInfo.lng"
      :image="{
        imageSrc: '/src/assets/img/building.png',
        imageWidth: 64,
        imageHeight: 64,
        imageOption: {},
      }"
      :clickable="true"
      @onClickKakaoMapMarker="onClickKakaoMapMarker(apartInfo.aptCode)"
    />
  </KakaoMap>
  <SearchBar @send-dong-code-list="dongCodeListHandler" />
</template>

<style scoped></style>
