<script setup>
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import { ref, watch } from "vue";
import SearchBar from "@/components/map/SearchBar.vue";

const props = defineProps({
  dongCodeList: Object,
});
const lat = ref(36.3549777);
const lng = ref(127.2983403);
const map = ref();
console.log("DONGLIST = ", props.dongCodeList.value);
watch(props.dongCodeList, (newValue) => {
  console.log(`바뀐값: ${newValue}`);
});

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
  // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
  const mapTypeControl = new kakao.maps.MapTypeControl();
  const mapZoomControl = new kakao.maps.ZoomControl();
  // 지도 타입 컨트롤을 지도에 표시합니다
  map.value.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
  map.value.addControl(mapZoomControl, kakao.maps.ControlPosition.BOTTOMRIGHT);
};

const receivedDongCodeList = ref({});
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
        imageSrc: '/src/assets/img/house.png',
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
