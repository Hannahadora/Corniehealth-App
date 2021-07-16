<template>
  <span>
    <label class="block uppercase mb-1 text-sm font-bold">
      {{ label }}
    </label>
    <span class="flex">
      <input class="border border-gray-300 px-3 py-2 rounded-l-md placeholder-gray-400 focus:outline-none  focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm  sm:leading-5"
        v-bind="$attrs"
         value="https://corniehealth.com/"
         disabled
      />
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
import { countryCodes } from "@/plugins/countrycodes";

@Options({
  inheritAttrs: false,
})
export default class PhoneInput extends Vue {
  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  valueSync!: string;

  @Prop({ type: String, default: "" })
  code!: string;

  @PropSync("code")
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
select {
  background-size: 0%;
}
</style>
