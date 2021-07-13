<template>
  <span>
    <label class="block uppercase mb-1 text-xs font-bold">{{ label }}</label>
    <field
      :name="inputName"
      v-slot="{ meta, field, errorMessage }"
      v-model="value"
      :rules="rules"
    >
      <select
        v-bind="field"
        :class="{
          'border-red-500': Boolean(errorMessage),
          'border-green-400': meta.valid && meta.touched,
        }"
        class="rounded-lg border p-2 w-11/12 focus:outline-none"
      >
        <option v-for="(item, i) in items" :key="i" :value="item.code || item">
          {{ item.display || item }}
        </option>
      </select>
      <span v-if="errorMessage" class="text-xs text-red-500 block">{{
        errorMessage
      }}</span>
    </field>
  </span>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import { Field } from "vee-validate";

@Options({
  name: "CornieSelect",
  components: {
    Field,
  },
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

  get inputName() {
    const id = Math.random().toString(36).substring(2, 9);
    return this.name || `input-${id}`;
  }
}
</script>
