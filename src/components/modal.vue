<template>
  <!-- component -->
  <div
    :class="classes"
    class="
      flex
      items-center
      justify-center
      fixed
      left-0
      bottom-0
      w-full
      h-full
      bg-gray-500 bg-opacity-50
    "
  >
    <div
      v-bind="$attrs"
      class="bg-gray-50 block justify-self-end rounded-lg opacity-100"
    >
      <div class="flex flex-col items-start">
        <div class="flex items-center w-full justify-between">
          <div class=""><slot name="title" /></div>
          <span
            @click="show = false"
            class="mdi mdi-close text-xl cursor-pointer"
          />
        </div>
        <hr />
        <div class="h-full">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Prop, PropSync } from "vue-property-decorator";
import { Options, Vue } from "vue-class-component";

@Options({
  inheritAttrs: false,
})
export default class Modal extends Vue {
  @Prop({ type: Boolean, required: true, default: false })
  visible!: boolean;
  @PropSync("visible", { type: Boolean, required: true, default: false })
  show!: boolean;

  get classes() {
    return this.show ? ["flex"] : ["hidden"];
  }
}
</script>
