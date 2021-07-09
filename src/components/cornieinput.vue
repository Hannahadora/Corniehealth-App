<template>
  <span>
    <label class="block uppercase mb-1 text-sm font-bold">{{ label }}</label>
    <input
      class="rounded-lg border p-2 w-11/12 focus:outline-none"
      v-model="valueSync"
      v-bind="$attrs"
    />
  </span>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";

@Options({
  inheritAttrs: false,
})
export default class DInput extends Vue {
  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  valueSync!: string;

  @Prop({ type: String, default: "" })
  label!: string;
}
</script>
