<template>
  <span class="w-11/12">
    <label class="block uppercase mb-1 text-xs font-bold">
      {{ label }}
    </label>
    <span class="flex">
      <select
        v-model="codeSync"
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
      <input
        class="rounded-r-lg border p-2 w-11/12 focus:outline-none"
        v-model="valueSync"
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
      />
    </span>
  </span>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import { countryCodes } from "@/plugins/countrycodes";

@Options({
  name: "PhoneInput",
})
export default class PhoneInput extends Vue {
  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  valueSync!: string;

  @Prop({ type: String })
  code!: string;

  @PropSync("code", { default: "+234" })
  codeSync!: string;

  @Prop({ type: String, default: "" })
  label!: string;

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
