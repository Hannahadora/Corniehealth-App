<template>
  <!-- component -->
  <div>
    <div :class="classes">
      <div v-bind="$attrs" class="rounded-lg opacity-100">
        <slot></slot>
      </div>
    </div>
    <span @click="show = false" class="mdi mdi-close text-xl cursor-pointer" />
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
  isActive!: false;
  get classes() {
    return this.show ? ["flex"] : ["hidden"];
  }
  get() {
    return (this.show = false);
  }

  set(val: string) {
    this.$emit("update:visible", val);
  }

  closeModal() {
    this.isActive = false;
  }
}
</script>
