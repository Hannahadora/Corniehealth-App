<template>
  <field
    :name="inputName"
    as="span"
    v-slot="{ errorMessage, meta, field }"
    :rules="rules"
    v-model="valueSync"
  >
    <label class="block text-black capitalize mb-1 mt-5 text-sm font-semibold">
      {{ label }}
    </label>
    <textarea
      :rows="rows"
      :cols="cols"
      maxlength="255"
      :placeholder="placeholder"
      :class="{
        'border-red-500': Boolean(errorMessage),
        'border-green-400': meta.valid && meta.touched,
      }"
      class="rounded-lg border p-2 w-full focus:outline-none"
      v-bind="{ ...$attrs, ...field }"
      :name="inputName"
      v-model="valueSync"
    />
    <span class="w-full block text-right text-xs text-gray-500">
      {{ textCount }}/255
    </span>
    <span v-if="errorMessage" class="text-xs text-red-500 block">
      {{ errorMessage }}
    </span>
  </field>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import { Field } from "vee-validate";

@Options({
  inheritAttrs: false,
  name: "CornieArea",
  components: {
    Field,
  },
})
export default class DInput extends Vue {
  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  valueSync!: string;

  @Prop({ type: String, default: "" })
  label!: string;

  @Prop({ type: String })
  name!: string;

  @Prop({ type: String, default: "10" })
  rows!: string;

  @Prop({ type: String, default: "50" })
  cols!: string;

  @Prop({ type: String, default: "" })
  placeholder!: string;

  get inputName() {
    const id = Math.random().toString(36).substring(2, 9);
    return this.name || `input-${id}`;
  }

  @Prop({ type: Object })
  rules!: any;

  get textCount() {
    return this.modelValue?.length || 0;
  }
}
</script>
<style>
::placeholder {
  font-size: 0.8em;
  font-weight: 300;
  color: #667499;
}
</style>
