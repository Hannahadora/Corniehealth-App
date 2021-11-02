<template>
  <field
    :name="inputName"
    as="span"
    v-slot="{ errorMessage, meta, field }"
    :rules="rules"
    v-model="valueSync"
    class="mb-5"
  >
    <div v-bind="$attrs">
      <label class="block capitalize mb-1 text-sm text-black font-bold">
        {{ label }}
        <span class="text-danger ml-1" v-if="required"> * </span>
      </label>
      <div
        class="flex   border-1 border-gray-300 rounded-md"
        :class="{
          'border-red-500': Boolean(errorMessage),
          'border-green-400': meta.valid && meta.touched,
        }"
      >
        <div
          class="
            border-r-2
            rounded-lg
            p-2
            bg-white
            flex
            items-center
            justify-center
          "
          style="border-top-right-radius: 0; border-bottom-right-radius: 0"
          v-if="$slots.prepend"
        >
          <slot name="prepend" />
        </div>
        <input
            type="number"
          class="p-2 rounded-lg w-full focus:outline-none"
          :style="{
            'border-top-left-radius: 0; border-bottom-left-radius: 0':
              $slots.prepend,
          }"
          v-bind="field"
          :placeholder="$attrs.placeholder"
          :name="inputName"
          v-model="valueSync"
        />
      </div>
      <span v-if="errorMessage" class="text-xs text-red-500 block">{{
        errorMessage
      }}</span>
    </div>
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

  @Prop({ type: Boolean, default: false })
  required!: boolean;

  get inputName() {
    const id = Math.random().toString(36).substring(2, 9);
    return this.name || `input-${id}`;
  }

  @Prop({ type: Object })
  rules!: any;
}
</script>
<style scoped>
::placeholder {
  font-size: 0.8em;
  font-weight: 300;
  color: #667499;
  font-style: italic;
}
input[type=number]::-webkit-inner-spin-button {
  opacity: 1;
  justify-content: center;
}
</style>
