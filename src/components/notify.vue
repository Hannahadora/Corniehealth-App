<template>
  <div :class="visibility" class="justify-center fixed right-3 top-3 z-20">
    <div
      :class="colorClasses"
      class="
        max-w-xs
        w-full
        px-6
        py-3
        shadow-2xl
        flex flex-col
        items-center
        border-t
        sm:w-auto
        sm:m-4
        sm:rounded-lg
        sm:flex-row
        border-white
        bg-white
        sm:border
      "
    >
      <div class="font-semibold text-black">{{ msg }}</div>
      <div class="flex mt-2 sm:mt-0 sm:ml-4">
        <button
          @click="show = false"
          class="px-3 py-2 transition ease-in-out duration-300"
        >
          &#x2715;
        </button>
      </div>
      <div class="bg-blue-600 border-blue-600" />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import VAlert from "@scelloo/cloudenly-ui/src/components/alert";

@Options({
  name: "Notify",
  components: {
    VAlert,
  },
})
export default class Notify extends Vue {
  show = false;
  msg = "";
  color = "";

  get visibility() {
    return this.show ? ["flex"] : ["hidden"];
  }

  get colorClasses() {
    return [`border-${this.color}`];
  }

  toast({ msg, status }: INotify) {
    this.msg = msg;
    this.show = true;
    this.setColor(status);
    setTimeout(() => {
      this.reset();
    }, 8000);
  }

  setColor(status?: string) {
    switch (status) {
      case "success":
        this.color = "green-400";
        break;
      case "info":
        this.color = "blue-300";
        break;
      case "error":
        this.color = "red-500";
        break;
      default:
        this.color = "blue-300";
    }
  }
  reset() {
    this.show = false;
    this.msg = "";
    this.color = "primary";
  }

  created() {
    this.reset();
    window.notify = this.toast;
  }
}
</script>
