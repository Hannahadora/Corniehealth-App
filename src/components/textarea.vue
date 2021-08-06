<template>
  <field
    :name="inputName"
    as="span"
    v-slot="{ errorMessage, meta, field }"
    :rules="rules"
    v-model="valueSync"
  >
    <label class="block uppercase mb-1 text-xs font-bold">{{ label }}</label>
     <textarea
    rows="4"
    cols="50"
    maxlength="255"
    v-on:keyup="limiter(this, 140)"
      :class="{
        'border-red-500': Boolean(errorMessage),
        'border-green-400': meta.valid && meta.touched,
      }"
      class="rounded-lg border p-2 w-11/12 focus:outline-none"
      v-bind="{ ...$attrs, ...field }"
      :name="inputName"
      v-model="valueSync"
    />
    <span v-if="errorMessage" class="text-xs text-red-500 block">{{
      errorMessage
    }}</span>
  </field>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import { Field } from "vee-validate";

@Options({
  inheritAttrs: false,
  name: "CornieInput",
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

  get inputName() {
    const id = Math.random().toString(36).substring(2, 9);
    return this.name || `input-${id}`;
  }

  @Prop({ type: Object })
  rules!: any;

}
</script>
