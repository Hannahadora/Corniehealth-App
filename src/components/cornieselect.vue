<template>
  <span>
    <label class="block uppercase mb-1 text-sm font-bold">{{ label }}</label>

    <select
      v-bind="$attrs"
      class="rounded-lg border p-2 w-11/12 focus:outline-none"
      placeholder="--generated--"
      v-model="valueSync"
    >
      <option v-for="(item, i) in items" :key="i" :value="item.code || item">
        {{ item.display || item }}
      </option>
    </select>
  </span>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";

@Options({})
export default class DSelect extends Vue {
  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  valueSync!: string;

  @Prop({ type: Array, default: [] })
  items!: any;

  @Prop({ type: String, default: "" })
  label!: string;
}
</script>
