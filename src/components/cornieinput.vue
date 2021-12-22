<template>
  <field
    :name="inputName"
    as="span"
    v-slot="{ errorMessage, meta, handleChange }"
    :rules="rules"
    v-model="valueSync"
    class="mb-5"
  >
    <div v-bind="$attrs" class="w-full">
      <label class="flex capitalize mb-1 text-black text-sm font-semibold">
        <slot name="label">
          {{ label }}
        </slot>
        <span class="ml-1 mb-1" v-if="$slots.labelicon">
          <slot name="labelicon" />
        </span>
        <span class="text-danger ml-1" v-if="required"> * </span>
      </label>
      <div
        class="flex rounded-md border-1"
        :class="{
          'border-red-500': Boolean(errorMessage),
          'border-green-400': meta.valid && meta.touched,
          'bg-gray-100 border-gray-100': disabled,
          ...errorClasses,
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
        <div
          class="rounded-lg pl-2 bg-white flex items-center justify-center"
          style="border-top-right-radius: 0; border-bottom-right-radius: 0"
          v-if="$slots['prepend-inner']"
        >
          <slot name="prepend-inner" />
        </div>
        <input
          v-on:keyup.enter="$emit('keyenter')"
          class="p-2 rounded-lg focus:outline-none w-full"
          :style="{
            'border-top-left-radius: 0; border-bottom-left-radius: 0':
              $slots.prepend,

            'border-top-right-radius: 0; border-bottom-right-radius: 0':
              $slots.append,
          }"
          :placeholder="$attrs.placeholder || '--Enter--'"
          :name="inputName"
          :readonly="readonly || disabled"
          :class="{ 'bg-gray-100 border-gray-100': disabled }"
          v-model="valueSync"
          @update:modelValue="handleChange"
        />
        <div
          class="rounded-lg pr-2 bg-white flex items-center justify-center"
          style="border-top-left-radius: 0; border-bottom-left-radius: 0"
          v-if="$slots['append-inner']"
        >
          <slot name="append-inner" />
        </div>
        <div
          class="
            border-l-2
            rounded-lg
            pr-2
            bg-white
            flex
            items-center
            justify-center
          "
          style="border-top-left-radius: 0; border-bottom-left-radius: 0"
          v-if="$slots.append"
        >
          <slot name="append" />
        </div>
      </div>
      <span v-if="errorMessage" class="text-xs text-red-500 block">
        {{ errorMessage }}
      </span>
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
export default class CornieInput extends Vue {
  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  valueSync!: string;

  @Prop({ type: String, default: "" })
  label!: string;

  @Prop({ type: String, default: "" })
  labelicon!: string;

  @Prop({ type: String })
  name!: string;

  @Prop({ type: Boolean, default: false })
  required!: boolean;

  @Prop({ type: Boolean, default: false })
  readonly!: boolean;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: Object, default: {} })
  errorClasses!: Object;

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
  font-weight: 400;
  color: #667499;
}
</style>
