<template>
  <!-- component -->
  <div
    :class="classes"
    class="flex items-center fixed left-0 bottom-0 w-full h-full bg-black bg-opacity-50 z-10"
    v-if="show"
  >
    <div v-bind="$attrs">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { Prop, PropSync } from "vue-property-decorator";
import { Options, Vue } from "vue-class-component";

@Options({
  inheritAttrs: false,
  name: "Dialog",
})
export default class Modal extends Vue {
  @Prop({ type: Boolean, default: false })
  center!: boolean;

  @Prop({ type: Boolean, default: false })
  right!: boolean;

  @Prop({ type: Boolean, default: false })
  left!: boolean;

  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync("modelValue", { type: Boolean, required: true, default: false })
  show!: boolean;

  get classes() {
    return [
      this.center
        ? "justify-center"
        : this.left
        ? "justify-start"
        : this.right
        ? "justify-end"
        : "",
    ];
  }
}
</script>
