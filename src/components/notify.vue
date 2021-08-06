<template>
  <div :class="visibility" class="justify-center fixed right-3 top-3 z-20">
    <div
      :class="{
        'bg-danger': status == 'error',
        'bg-success': status == 'success',
      }"
      class="
        max-w-xs
        w-full
        shadow-2xl
        flex
        items-center
        sm:w-auto
        sm:m-4
        sm:rounded-md
        sm:flex-row
        bg-primary
      "
    >
      <span class="block w-1 h-full"></span>
      <div
        class="
          flex
          items-center
          p-1
          flex-grow
          roundex-l-lg
          rounded-r-md
          bg-white
        "
      >
        <span class="flex flex-col">
          <div class="font-semibold text-black">{{ title }}</div>
          <div class="text-xs text-black">{{ msg }}</div>
        </span>
        <div class="flex mt-2 sm:mt-0 sm:ml-4">
          <button
            @click="show = false"
            class="px-3 py-2 transition ease-in-out duration-300"
          >
            <modal-close-icon />
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

@Options({
  name: "Notify",
  components: {
    VAlert,
    ModalCloseIcon,
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
  }

  created() {
    this.reset();
    window.notify = this.toast;
  }
}
</script>
