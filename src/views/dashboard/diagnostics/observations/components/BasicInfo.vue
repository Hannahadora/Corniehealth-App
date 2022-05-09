<template>
  <div>
    <div class="grid grid-cols-2 gap-6 py-6">
      <cornie-select
        class="w-full"
        label="Based On"
        placeholder="Select"
        v-model="basicInfo.basedOn"
        :items="['a', 'b']"
      />
      <cornie-select
        class="w-full"
        label="Part of"
        placeholder="Select"
        v-model="basicInfo.partOf"
        :items="['a', 'b']"
      />
      <cornie-select
        class="w-full"
        label="Category"
        placeholder="Select"
        v-model="basicInfo.category"
        :items="['a', 'b']"
      />
      <cornie-select
        class="w-full"
        label="Code"
        placeholder="Select"
        v-model="basicInfo.code"
        :items="['a', 'b']"
      />
      <cornie-select
        class="w-full"
        label="Subject"
        placeholder="Select"
        v-model="basicInfo.subject"
        :items="['a', 'b']"
      />
      <cornie-select
        class="w-full"
        label="Focus (Optional)"
        placeholder="Select"
        v-model="basicInfo.focus"
        :items="['a', 'b']"
      />
      <cornie-select
        class="w-full"
        label="Encounter"
        placeholder="Select"
        v-model="basicInfo.encounter"
        :items="['a', 'b']"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieBtn from "@/components/CornieBtn.vue";
import { namespace } from "vuex-class";
import { CornieUser } from "@/types/user";
import { string } from "yup";
import AutoComplete from "@/components/autocomplete.vue";
import { cornieClient } from "@/plugins/http";
import CornieRadio from "@/components/cornieradio.vue";

import DateTimePicker from "@/components/date-time-picker.vue";
import DatePicker from "@/components/datetime-picker.vue";
import { first, getTableKeyValue } from "@/plugins/utils";

@Options({
  name: "BasicInfo",
  components: {
    CornieInput,
    CornieSelect,
    CustomCheckbox,
    CornieBtn,
    AutoComplete,
    CornieRadio,
    DateTimePicker,
    DatePicker,
  },
})
export default class BasicInfo extends Vue {
  @Prop({ type: Object, default: <any>{} })
  basicInfo!: {};

  required = string().required();
}
</script>

<style scoped></style>
