<template>
  <div :class="visibility" class="justify-center fixed right-3 top-3 z-20">
    <div
      class="max-w-md w-full shadow-lg flex items-center sm:w-auto sm:m-4 sm:rounded-lg sm:flex-row bg-transparent"
    >
      <div
        :class="{
          'bg-fiery-rose': status == 'error',
          'bg-success': status == 'success',
          'bg-squash': status != 'error' && status != 'success',
        }"
        class="flex items-center text-white p-1 flex-grow rounded-l-md rounded-r-md pl-3"
      >
        <modal-ok-icon v-if="status == 'success'" class="fill-current" />
        <not-allowed-icon v-else-if="status == 'error'" class="fill-current" />
        <info-icon v-else class="fill-current" />
        <span class="ml-2 flex flex-col">
          <div class="font-semibold">{{ title }}</div>
          <div class="text-base">{{ msg }}</div>
        </span>
        <div class="flex mt-2 sm:mt-0 sm:ml-4">
          <button
            @click="show = false"
            class="px-3 py-2 transition ease-in-out duration-300"
          >
            <modal-close-icon class="fill-current" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import VAlert from "@scelloo/cloudenly-ui/src/components/alert";
import ModalCloseIcon from "./icons/modal-close.vue";
import ModalOkIcon from "./icons/modal-ok.vue";
import NotAllowedIcon from "./icons/not-allowed.vue";
import InfoIcon from "./icons/info.vue";

@Options({
  name: "Notify",
  components: {
    VAlert,
    ModalCloseIcon,
    InfoIcon,
    ModalOkIcon,
    NotAllowedIcon,
  },
})
export default class Notify extends Vue {
  show = false;
  msg = "";
  status = "";
  title = "";
  get visibility() {
    return this.show ? ["flex"] : ["hidden"];
  }

  toast({ msg, status, title }: INotify) {
    this.msg = msg;
    this.show = true;
    this.status = status || "";
    this.title = title || "";
    setTimeout(() => {
      this.reset();
    }, 8000);
  }

  reset() {
    this.show = false;
    this.msg = "";
    this.status = "";
  }

  created() {
    this.reset();
    window.notify = this.toast;
  }
}
</script>
