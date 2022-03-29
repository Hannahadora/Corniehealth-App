<template>
  <div class="w-auto relative">
    <div class="">
      <button
        class="flex items-center bg-danger rounded-lg"
      >
        <a
          class="cursor-pointer focus:outline-none text-white font-bold py-2 px-5 rounded-lg"
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
    <div class="shadow-lg p-2 absolute overflow-auto h-full" v-if="show">
        <slot name="dropdownoptions"/>
    </div>
      <div class="shadow-lg p-2 absolute overflow-auto h-full" v-else>
         <div v-if="show">
          <slot name="dropdownoptions"/>
        </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

export default {

   props: {
        showup: {
            type: Boolean,
            default: false
        },
    },
  setup() {
    const show = ref(false);

    window.addEventListener("click", (e) => {
      if (!e.target.classList.contains("dd")) show.value = false;
    });

    return { show };
  },
};
</script>
