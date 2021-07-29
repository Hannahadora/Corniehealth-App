<template>
  <span class="w-11/12">
    <label class="block uppercase mb-1 text-xs font-bold">
      {{ label }}
    </label>
    <field
      :name="inputName"
      v-slot="{ errorMessage, meta, field }"
      :rules="customRules"
      v-model="valueSync"
    >
      <span class="flex">
        <field
          :name="`${inputName}-code`"
          v-slot="{ meta: codeMeta, field: codeField }"
          :rules="rules ? required : undefined"
          v-model="codeSync"
        >
          <select
            v-bind="codeField"
            :class="{
              'border-red-500': Boolean(errorMessage),
              'border-green-400': codeMeta.valid && codeMeta.touched,
            }"
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
            <option value="+234" selected="selected" hidden>+234</option>
            <option
              :value="code.dialCode"
              :selected="code.default"
              v-for="(code, i) in codes"
              :key="i"
            >
              {{ code.dialCode }}
            </option>
          </select>
        </field>
        <input
          :class="{
            'border-red-500': Boolean(errorMessage),
            'border-green-400': meta.valid && meta.touched,
          }"
          class="rounded-r-lg border p-2 w-11/12 focus:outline-none"
          type="tel"
          v-bind="field"
        />
      </span>
      <span v-if="errorMessage" class="text-xs text-red-500 block">{{
        errorMessage
      }}</span>
    </field>
  </span>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import { countryCodes } from "@/plugins/countrycodes";
import { Field } from "vee-validate";
import { string } from "yup";

const phoneRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

@Options({
  name: "PhoneInput",
  components: {
    Field,
  },
})
export default class PhoneInput extends Vue {
  @Prop({ type: String })
  modelValue!: string;

  @PropSync("modelValue")
  valueSync!: string;

  @Prop({ type: String })
  code!: string;

  @PropSync("code", { default: "+234" })
  codeSync!: string;

  @Prop({ type: String, default: "" })
  label!: string;

  @Prop({ type: String })
  name!: string;

  get inputName() {
    const id = Math.random().toString(36).substring(2, 9);
    return this.name || `phone-${id}`;
  }

  get customRules() {
    const phoneRule = string()
      .matches(phoneRegex, "A valid phone number is required")
      .min(9, "A valid phone number must contain at least 11 digits")
      .max(11);
    if (this.rules) return phoneRule.concat(this.rules);
    return phoneRule;
  }

  @Prop({ type: Object })
  rules!: any;

  required = string().required();
  get codes() {
    return countryCodes.sort((a, b) => {
      if (a.dialCode > b.dialCode) return 1;
      if (a.dialCode < b.dialCode) return -1;
      return 0;
    });
  }
}
</script>
<style scoped>
select- {
  background-size: 0%;
}
</style>
