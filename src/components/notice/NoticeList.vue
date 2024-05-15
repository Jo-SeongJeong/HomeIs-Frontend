<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const noticeList = ref([]);

const selectAll = async () => {
  const url = "http://localhost/homeis/notice/";

  const { data } = await axios.get(url);

  console.log(data);

  noticeList.value = data;
};

selectAll();

const goDetail = (id) => {
  // router.push(`/free-board/${id}`);
  router.push({ name: "FreeBoardDetail", params: { id } });
};
</script>

<template>
    <div>
        <table>
      <tr
        v-for="notice in noticeList"
        :key="notice.id"
        @click="goDetail(notice.id)"
      >
        <td>{{ notice.title }}</td>
        <td>{{ notice.createTime }}</td>
      </tr>
    </table>
    </div>
</template>

<style scoped>

</style>