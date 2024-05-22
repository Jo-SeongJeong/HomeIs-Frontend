<template>
    <div>
        <div id="roadview" style="width:100%;height:400px;"></div>
    </div>
</template>

<script>
export default {
    name: "KakaoMapRoadview",
    props: {
        position: {
            type: Object,
            required: true
        },
    },
    watch: {
        position: {
            handler(newVal) {
                console.log("ZZZZZZZZZZZZZZ", newVal.lat);
                this.updateRoadview(newVal.lat, newVal.lng);
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        this.initRoadview();
    },
    methods: {
        initRoadview() {
            // 로드뷰를 표시할 div
            const roadviewContainer = document.getElementById('roadview');
            // 로드뷰 객체를 생성
            const roadview = new kakao.maps.Roadview(roadviewContainer);
            // 로드뷰 도로 객체
            const roadviewClient = new kakao.maps.RoadviewClient();

            // 특정 좌표의 로드뷰를 표시합니다.
            const position = new kakao.maps.LatLng(33.450701, 126.570667);
            roadviewClient.getNearestPanoId(position, 50, (panoId) => {
                roadview.setPanoId(panoId, position);
            });

            // 로드뷰 초기 설정
            roadview.setViewpoint({
                pan: 321,
                tilt: 0,
                zoom: 0
            });
        },
        updateRoadview(lat, lng) {
            console.log("UPDATE!!! = ", lat, lng);
            if (lat && lng) {
                const roadviewContainer = document.getElementById('roadview');
                // 로드뷰 객체를 생성
                const roadview = new kakao.maps.Roadview(roadviewContainer);
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
                    zoom: 0
                });
            }
        }
    }
}
</script>

<style scoped>
#roadview {
    width: 100%;
    height: 500px;
}
</style>
