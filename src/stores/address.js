import { ref } from "vue";
import { defineStore } from "pinia";

export const useAddressStore = defineStore(
    "address",
    () => {
        const zoneCode = ref("");
        const roadAddress = ref("");
        const detailAddress = ref("");
    
  
      return { zoneCode, roadAddress, detailAddress };
    },
  );