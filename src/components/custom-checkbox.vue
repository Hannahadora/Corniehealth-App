<template>
  <field
    :name="inputName"
    as="span"
    v-slot="{ errorMessage, meta, field }"
    :rules="rules"
    v-model="valueSync"
    class="flex items-center my-2"
  >
    <!-- <label class="block uppercase mb-1 text-xs font-bold">{{ label }}</label> -->
    <input
      :class="{
        'border-red-500': Boolean(errorMessage),
        'border-green-400': meta.valid && meta.touched,
      }"
      class="rounded-lg border p-2 w-11/12 focus:outline-none cursor-pointer"
      v-bind="{ ...$attrs, ...field }"
      :name="inputName"
      v-model="valueSync"
      @change="$emit('change', $event.target.checked)"
      type="checkbox"
      :checked="valueSync"
    />
    <span class="ml-2 text-xs font-medium w-full">{{ label }}</span>
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
  name: "CustomSelect",
  components: {
    Field,
  },
})
export default class CustomSelect extends Vue {
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

<style scoped>
input[type="checkbox"]:after {
  border: 1px solid #c4bdbd !important;
}
input[type="checkbox"]:checked:after {
  background-color: #ff0000 !important;
}
</style>
