<template>
  <div
    :class="[width]"
    class="relative text-gray-600 focus-within:text-gray-400"
  >
    <span
      class="absolute inset-y-0 left-0 flex items-center pl-2"
      v-if="prepend"
    >
      <div class="p-1 focus:outline-none focus:shadow-outline">
        <slot name="prepend" />
      </div>
    </span>
    <input
      v-bind="$attrs"
      name="q"
      v-model="valueSync"
      class="py-2 text-sm text-black rounded-md w-full"
      :class="{
        'pl-10': prepend,
        'pr-10': append,
        'pl-2': !prepend,
        'pr-2': !append,
      }"
    />
    <span
      class="absolute inset-y-0 right-0 flex items-center pr-2"
      v-if="append"
    >
      <div class="p-1 focus:outline-none focus:shadow-outline">
        <slot name="append" />
      </div>
    </span>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";

@Options({
  inheritAttrs: false,
})
export default class IconInput extends Vue {
  @Prop({ type: String })
  modelValue!: string;

  @PropSync("modelValue")
  valueSync!: string;

  @Prop({ required: false, default: "" })
  width!: string;

  get prepend() {
    return Boolean(this.$slots.prepend);
  }

  get append() {
    return Boolean(this.$slots.append);
  }
}
</script>
