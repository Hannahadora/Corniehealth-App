<template>
  <field
    :name="inputName"
    as="span"
    v-slot="{ errorMessage, meta, field }"
    :rules="rules"
    v-model="valueSync"
    class="mb-5"
  >
    <div v-bind="$attrs" class="w-11/12">
      <label class="flex capitalize mb-1 text-black text-xs font-bold">
        <slot name="label">
          {{ label }}
        </slot>
        <span class="ml-1 mb-1" v-if="$slots.labelicon">
          <slot name="labelicon" />
        </span>
        <span class="text-danger ml-1" v-if="required"> * </span>
      </label>
      <div
        class="flex rounded-lg border"
        :class="{
          'border-red-500': Boolean(errorMessage),
          'border-green-400': meta.valid && meta.touched,
          ...errorClasses,
        }"
      >
        <div
          class="border-r-2 rounded-lg p-2 bg-white flex items-center justify-center"
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
          @keypress="onlyNumber"
          class="p-2 rounded-lg w-full focus:outline-none"
          :style="{
            'border-top-left-radius: 0; border-bottom-left-radius: 0':
              $slots.prepend,
            'border-top-right-radius: 0; border-bottom-right-radius: 0':
              $slots.append,
          }"
          v-bind="field"
          type="text"
          maxlength="10"
          :placeholder="$attrs.placeholder"
          :name="inputName"
          :readonly="readonly"
          v-model="valueSync"
        />
        <div
          class="rounded-lg pr-2 bg-white flex items-center justify-center"
          style="border-top-left-radius: 0; border-bottom-left-radius: 0"
          v-if="$slots['append-inner']"
        >
          <slot name="append-inner" />
        </div>
        <div
          class="border-l-2 rounded-lg pr-2 bg-white flex items-center justify-center"
          style="border-top-left-radius: 0; border-bottom-left-radius: 0"
          v-if="$slots.append"
        >
          <slot name="append" />
        </div>
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

  @Prop({ type: Object, default: {} })
  errorClasses!: Object;

  get inputName() {
    const id = Math.random().toString(36).substring(2, 9);
    return this.name || `input-${id}`;
  }
  onlyNumber($event: any) {
    //; //keyCodes value
    let keyCode = $event.keyCode ? $event.keyCode : $event.which;
    if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      // 46 is dot
      $event.preventDefault();
    }
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
}
</style>
