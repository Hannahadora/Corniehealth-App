<template>
  <span class="w-full">
    <label
      class="flex space-x-55 w-full capitalize mb-1 text-black text-sm font-semibold"
    >
      <span class="float-left">
        {{ label }}
      </span>
      <span class="text-danger ml-1" v-if="requiredText"> * </span>
      <add-blue-icon
        class="float-right cursor-pointer fill-current text-primary"
        @click="$emit('addnumbers')"
        v-if="add"
      />
    </label>
    <field
      :name="inputName"
      v-slot="{ errorMessage, meta, field }"
      :rules="customRules"
      v-model="valueSync"
    >
      <span class="flex w-full">
        <span class="w-full flex">
          <field
            :name="`${inputName}-code`"
            v-slot="{ meta: codeMeta, handleChange, errorMessage: codeError }"
            :rules="rules ? required : undefined"
            v-model="codeSync"
          >
            <cornie-select
              class="w-full h-full   rounded-r-none"
              :items="codes"
              v-model="codeSync"
              :class="{
                'border-red-500': Boolean(codeError),
                'border-green-400': codeMeta.valid && codeMeta.touched,
              }"
              @update:modelValue="handleChange"
            >
              <template v-slot:item="{ item }">
                <span class="w-full flex items-center mb-3">
                  <div class="flex w-full">
                    <img class="mr-3 w-6 rounded-md" :src="item.flag" />
                    <!-- <span class="text-xs font-semibold"> {{ item.name }}</span> -->
                    <span class="text-xs font-semibold codestyle"> {{ item.dialCode }}</span>
                  </div>
                  <!-- <div class="text-xs text-gray-400 flex-shrink-0 float-right">
                    {{ item.dialCode }}
                  </div> -->
                </span>
              </template>
              <template v-slot:selected="{ item }">
                <div class="flex space-x-2 mr-2">
                  <span class="block p-2">
                    <img :src="item?.flag" class="h-3 w-3" />
                  </span>
                  <span class="text-xs mt-2 mr-1">
                    {{ item?.name }}
                  </span>
                </div>
              </template>
            </cornie-select>
          </field>
        <input
          :class="{
            'border-red-500': Boolean(errorMessage),
            'border-green-400': meta.valid && meta.touched,
          }"
          class="rounded-r-lg border-1 border-gray-300 p-2 flex-grow w-full focus:outline-none"
          type="tel"
          v-bind="field"
          minlength="10"
          maxlength="11"
          placeholder=""
          style="line-height: 10px;"
        />
        </span>
      </span>
    </field>
  </span>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import { countryCodes } from "@/plugins/countrycodes";
import { Field } from "vee-validate";
import { string } from "yup";
import IconInput from "@/components/IconInput.vue";
import CornieSelect from "./phoneselect.vue";
import CornieInput from "./cornieinput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AddBlueIcon from "@/components/icons/addblue.vue";
import AddIcon from "@/views/dashboard/ehr/hospitalization/components/add-icon.vue";

const phoneRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

@Options({
  name: "PhoneInput",
  components: {
    Field,
    CornieSelect,
    CornieInput,
    SearchIcon,
    IconInput,
    AddBlueIcon,
    AddIcon,
  },
})
export default class PhoneInput extends Vue {
  @Prop({ type: String })
  modelValue!: string;

  @PropSync("modelValue")
  valueSync!: string;

  @Prop({ type: Boolean })
  add!: boolean;

  @Prop({ type: String })
  code!: string;

  @Prop({ type: Boolean, default: false })
  requiredText!: boolean;

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
    return countryCodes
      .sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      })
      .map((country) => ({
        ...country,
        display: country.dialCode,
        code: country.dialCode,
        flag: `https://flagcdn.com/60x45/${country.isoCode.toLowerCase()}.png`,
      }));
  }
}
</script>
<style scoped>
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  background: #dfe5fb;
  border: none;
  color: #394066;
  text-transform: lowercase;
  font-variant: small-caps;
}

.phone-grid {
  display: grid;
  columns: 10% 90%;
}
.codestyle{
  float: right;
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style>
