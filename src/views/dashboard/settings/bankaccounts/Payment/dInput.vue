<template>
  <span>
    <label class="block uppercase mb-1 text-xs font-semibold">{{
      label
    }}</label>
    <input
      type="date"
      class="rounded-lg border p-2 w-80 focus:outline-none"
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
