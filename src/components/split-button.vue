<template>
  <div class="w-auto relative">
    <div class="">
      <button
        style="background: #fe4d3c; border-radius: 124px"
        class="flex items-center"
      >
        <a
          class="cursor-pointer focus:outline-none text-white font-bold py-2 px-5 rounded-full"
        >
          <slot name="main" />
        </a>
        <p
          @click="() => (show = !show)"
          style="height: 34px"
          class="px-4 border-l-2 flex items-center dd"
        >
          <slot name="dropdown" />
        </p>
      </button>
    </div>
    <div class="shadow-lg p-2 absolute" v-if="show">
      <a href="">Collect Payment</a>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

export default {
  setup() {
    const show = ref(false);

    window.addEventListener("click", (e) => {
      if (!e.target.classList.contains("dd")) show.value = false;
    });

    return { show };
  },
};
</script>
