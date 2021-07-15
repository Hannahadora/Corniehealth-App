<template>
  <div class="antialiased">
    <div
      class="relative inline-block"
      @mouseleave="isVisible = false"
      @keydown.enter="isVisible = !isVisible"
    >
      <button
        @click="isVisible = true"
        type="button"
        class="
          inline-flex
          items-center
          justify-between
          px-2
          py-1
          font-medium
          text-gray-700
          rounded-md
          focus:outline-none
          focus:text-brand-900
          sm:focus:shadow-outline
        "
      >
        <span class="flex-shrink-0"><three-dot-icon /></span>
      </button>
      <transition
        enter-active-class="transition duration-300 ease-out transform"
        enter-class="-translate-y-3 scale-95 opacity-0"
        enter-to-class="translate-y-0 scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in transform"
        leave-class="translate-y-0 opacity-100"
        leave-to-class="-translate-y-3 opacity-0"
      >
        <div v-show="isVisible" class="absolute pt-2 z-10 -left-12">
          <div
            class="
              relative
              py-1
              p-2
              bg-white
              border border-gray-200
              rounded-md
              block
              w-40
              shadow-xl
            "
          >
            <div class="relative p-1">
              <slot />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import ThreeDotIcon from "@/components/icons/threedot.vue";
export default {
  name: "TableOptions",
  components: {
    ThreeDotIcon,
  },
  data() {
    return {
      isVisible: false,
    };
  },
};
</script>
