<template>
  <span>
    <label class="block uppercase mb-1 text-xs font-bold">{{ label }}</label>
    <select
      v-bind="$attrs"
      v-model="value"
      class="rounded-lg border p-2 w-11/12 focus:outline-none"
    >
      <option v-for="(item, i) in items" :key="i" :value="item.code || item">
        {{ item.display || item }}
      </option>
    </select>
  </span>
</template>
<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { Field, useField } from "vee-validate";

@Options({
  name: "CornieSelect",
})
export default class DSelect extends Vue {
  @Prop({ type: String })
  modelValue!: string;

  @PropSync("modelValue")
  value!: string;

  @Prop({ type: Array, default: [] })
  items!: any;

  @Prop({ type: String, default: "" })
  label!: string;

  @Prop({ type: String })
  name!: string;

  @Prop({ type: Object })
  rules!: any;
}
</script>
