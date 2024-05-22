import { ref } from "vue";
import { defineStore } from "pinia";

export const useHeaderTitleStore = defineStore(
    "headerTitle",
    () => {
        const title = ref("자유게시판");
  
      return { title };
    },
    { persist: true }
  );