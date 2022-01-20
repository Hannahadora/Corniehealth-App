<template>
  <span>
    <img v-if="type === 1" :src="img" alt="Hi" />
    <img v-if="type === 2" :src="img2" alt="Hi" />
    <img v-if="type === 3" :src="img3" alt="Hi" />
  </span>
</template>
<script>
import img from "@/assets/transfer-icon.svg";
import img2 from "@/assets/info_icon.svg";
import img3 from "@/assets/doc.svg";

export default {
  name: "AddIcon",
  props: ["type"],
  data() {
    return {
      img,
      img2,
      img3,
    };
  },
};
</script>
