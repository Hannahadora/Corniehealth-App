<template>
  <div>
    <label class="block capitalize mb-1 text-sm text-black font-semibold">
      {{ label }}
    </label>
    <field
      :name="inputName"
      as="div"
      v-slot="{ errorMessage, meta, handleChange }"
      :rules="customRule"
      v-model="valueSync"
      id="DomainName"
      class="w-full"
    >
      <div class="flex items-center w-full">
        <input
          :placeholder="$attrs.placeholder"
          style="width: 55%"
          :class="{
            'border-red-500': Boolean(errorMessage),
            'border-green-400': meta.valid && meta.touched,
            ...errorClasses,
          }"
          :disabled="$attrs.disabled"
          @change="handleChange"
          class="
            rounded
            appearance-none
            px-3
            py-2
            border border-gray-300
            placeholder-gray-400
            focus:outline-none
            focus:shadow-outline-blue
            focus:border-blue-300
            transition
            duration-150
            mr-2
            ease-in-out
            sm:text-sm
            sm:leading-5
          "
          v-model="valueSync"
        />
        <input
          style="width: 50%"
          class="
            appearance-none
            border border-gray-300
            bgcolor
            px-3
            py-2
            rounded
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
           placeholder="corniehealth.com/booking/gp-consultation"
        />
      </div>
      <span v-if="errorMessage" class="text-xs text-red-500 block">
        {{ errorMessage }}
      </span>
    </field>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import { Field } from "vee-validate";
import { string, StringSchema } from "yup";
import { cornieClient } from "@/plugins/http";

async function checkDomain(domainName?: string) {
  if (!domainName) return false;
  try {
    const { success } = await cornieClient().post(
      "/api/v1/domain/checkDomain",
      { domainName }
    );
    return success;
  } catch (error) {
    return false;
  }
}

async function uniqueDomain(instance: StringSchema, msg: string) {
  return instance.test({
    name: "uniqueDomain",
    message: msg,
    test: checkDomain,
  });
}

@Options({
  inheritAttrs: false,
  components: {
    Field,
  },
})
export default class DomainInput extends Vue {
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

  @Prop({ type: Object, default: {} })
  errorClasses!: Object;

  @Prop({ type: Object })
  rules!: any;

  get customRule() {
    const domainRule = string().test({
      name: "uniqueDomain",
      message: "Domain name already exists",
      test: checkDomain,
    });
    if (this.rules) return domainRule.concat(domainRule);
    return domainRule;
  }

  get inputName() {
    const id = Math.random().toString(36).substring(2, 9);
    return `domain-${id}`;
  }
}
</script>

<style scoped>
.bgcolor {
  background-color: #080056;
}

</style>
