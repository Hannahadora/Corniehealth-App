<template>
  <div class="w-1/2 flex flex-col justify-center items-center">
    <img src="@/assets/img/nodevice.svg" />
    <h3 class="text-center mt-5">You have no devices</h3>
    <button
      class="
        bg-danger
        rounded-full
        text-white
        mt-5
        py-2
        px-3
        focus:outline-none
        hover:opacity-90
      "
      @click="$emit('add-device')"
    >
      Add a New Device
    </button>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class DeviceEmptyState extends Vue {}
</script>
