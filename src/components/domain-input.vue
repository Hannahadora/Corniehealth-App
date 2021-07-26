<template>
  <div>
    <label class="block uppercase mb-1 text-xs font-bold">
      {{ label }}
    </label>
    <div id="DomainName" class="flex items-center">
      <input
        class="
          appearance-none
          w-6/12
          border border-gray-300
          bg-gray-500
          px-3
          py-2
          rounded-l-md
          placeholder-white
          focus:outline-none
          focus:shadow-outline-blue
          focus:border-blue-300
          transition
          duration-150
          ease-in-out
          sm:text-sm
          sm:leading-5
        "
        disabled
        placeholder="https://corniehealth.com/"
      />
      <input
        :placeholder="placeholder"
        class="
          rounded-r-md
          appearance-none
          w-5/12
          px-3
          py-2
          border border-gray-300
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
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";

@Options({
  inheritAttrs: false,
})
export default class PhoneInput extends Vue {
  @Prop({ type: String, default: "" })
  placeholder!: string;

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
}
</script>
