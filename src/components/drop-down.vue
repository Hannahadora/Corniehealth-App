<template>
  <div class="relative block" id="cornie-dropdown">
    <transition
      enter-active-class="transition duration-300 ease-out transform"
      enter-class="-translate-y-3 scale-95 opacity-0"
      enter-to-class="translate-y-0 scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in transform"
      leave-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-3 opacity-0"
    >
      <div v-show="isVisible" class="absolute pt-2 z-10 -left-7">
        <div
          class="
            relative
            py-2
            p-1
            bg-white
            border border-gray-200
            rounded-md
            block
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
</template>
<script lang="ts">
import { clickOutside } from "@/plugins/utils";
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";

@Options({
  name: "DropDown",
})
export default class DropDown extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync("modelValue")
  isVisible!: boolean;
}
</script>
