<script setup>
import { ref, reactive } from "vue";
import axios from "axios";

const aptCode = ref("11110000000002");
const tradeLog = ref("");

const series = ref([
  {
    name: "STOCK ABC",
    data: [],
  },
]);

const chartOptions = ref({
  chart: {
    type: "area",
    height: 350,
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  title: {
    text: "",
    align: "left",
  },
  subtitle: {
    text: "",
    align: "left",
  },
  labels: [],
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    opposite: true,
  },
  legend: {
    horizontalAlign: "left",
  },
});

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      aptDealInfoList: [
        { dealAmount: "100,000", dealYear: 2015, dealMonth: 1, dealDay: 7 },
        { dealAmount: "200,000", dealYear: 2015, dealMonth: 1, dealDay: 27 },
      ],
    }),
  },
});

// 거래 로그 데이터를 가져와서 차트 시리즈에 매핑하는 함수
const getTradeLog = async () => {
  try {
    const url = `http://localhost:80/homeis/map/apartDealInfo/${aptCode.value}`;
    const { data } = await axios.get(url);
    console.log("112321312");
    const prices = data.aptDealInfoList.map((item) => {
      // dealAmount를 숫자로 변환하고 억 단위로 변환
      const dealAmount = Number(item.dealAmount.replace(/,/g, ""));
      const amountInBillion = (dealAmount / 10000).toFixed(1); // 억 단위로 변환 후 소수점 한 자리까지 유지
      return isNaN(amountInBillion) ? 0 : parseFloat(amountInBillion);
    });

    const dates = data.aptDealInfoList.map(
      (item) =>
        `${item.dealYear}-${String(item.dealMonth).padStart(2, "0")}-${String(
          item.dealDay
        ).padStart(2, "0")}`
    );

    chartOptions.value.labels = dates;
    series.value[0].data = prices;
    console.log("series", series.value);
    console.log("chartOptions", chartOptions.value);
  } catch (error) {
    console.error("거래 로그 데이터를 가져오는 중 오류 발생:", error);
  }
};

getTradeLog();
</script>

<template>
  <apexchart
    v-if="series[0].data.length > 0"
    type="area"
    height="350"
    :options="chartOptions"
    :series="series"
  />
</template>

<style scoped></style>
