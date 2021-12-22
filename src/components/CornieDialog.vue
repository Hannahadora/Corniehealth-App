<template>
  <!-- component -->
  <Transition name="slide-fade">
    <div
      :class="classes"
      class="animated fadeIn fixed z-10 pin shadow-inner flex items-center left-0 bottom-0 w-full h-full bg-black bg-opacity-50"
      v-if="show"
    >
      <div v-bind="$attrs" class="animated fadeInUp fixed">
        <slot />
      </div>
    </div>
  </Transition>
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
<style scoped>
.slide-fade-enter-active {
  transition: all 0.8s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
