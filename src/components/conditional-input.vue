<template>
  <span>
    <label class="block uppercase mb-1 text-xs font-semibold">
      {{ label }}
    </label>
    <span class="flex">
      <select
        class="
          border border-gray-300
          px-3
          py-2
          rounded-l-md
          placeholder-gray-400
          focus:outline-none
          focus:shadow-outline-blue
          focus:border-blue-300
          transition
          duration-150
          ease-in-out
          sm:text-sm
          sm:leading-5
        "
      >
        <option v-for="(item, i) in items" :value="item.code || item" :key="i">
          {{ item.display || item }}
        </option>
      </select>
      <input
        class="rounded-r-lg border p-2 w-11/12 focus:outline-none"
        v-model="valueSync"
        v-bind="$attrs"
      />
    </span>
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

  @Prop({ type: Array, default: [] })
  items!: any[];

  @Prop({ type: String, default: "" })
  label!: string;
}
</script>
<style scoped>
select {
  background-size: 0%;
}
</style>
