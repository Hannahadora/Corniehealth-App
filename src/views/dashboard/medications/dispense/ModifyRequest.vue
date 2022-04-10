<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card
      v-if="!substitute"
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll"
    >
      <cornie-card-title class="pb-6 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <icon-btn @click="show = false">
            <arrow-left stroke="#ffffff" />
          </icon-btn>
          <p class="text-3xl font-bold">{{ medication.brandcode }}</p>
        </div>

        <span class="flex space-x-4" @click="substitute = true">
          <substitution-allowed class="mr-2" /> Substitute
        </span>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form class="flex-grow flex flex-col" @submit="submit">
          <cornie-select
            class="w-full mt-6"
            label="Form"
            placeholder="Tablet"
            v-model="medication.tablet"
            :items="tablets"
            :disabled="true"
          />
          <cornie-input
            class="w-full"
            label="strength"
            v-model="medication.strength"
            :disabled="true"
          />
          <cornie-input
            class="w-full"
            label="Prescribed Quantity"
            v-model="medication.quantity"
            :disabled="true"
            :rules="required"
          />

          <cornie-select
            class="w-full mt-6"
            label="Pharmacy Supply Type"
            placeholder="--Select one--"
            v-model="supplyType"
            :items="supplyTypes"
          />

           <cornie-input
            class="w-full"
            label="Quantity"
            v-model="quantity"
            :rules="required"
          />

        </v-form>
      </cornie-card-text>

      <div class="flex items-center justify-end mt-24">
        <div class="flex items-center mb-6">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 py-1 mr-3 rounded-lg text-primary"
          >
           Save
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            type="submit"
            class="text-white bg-danger px-3 py-1 rounded-lg"
          >
            Save & Continue
          </cornie-btn>
        </div>
      </div>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
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
import IDispense from "@/types/IDispense";

import DatePicker from "@/components/daterangepicker.vue";
import { first, getTableKeyValue } from "@/plugins/utils";

import Substituted from "@/components/icons/substituted.vue";
import SubstitutionAllowed from "@/components/icons/substitution-allowed.vue";

const hierarchy = namespace("hierarchy");
const orgFunctions = namespace("OrgFunctions");
const user = namespace("user");
const appointmentRoom = namespace("appointmentRoom");

@Options({
  name: "ModifyRequest",
  components: {
    CornieDialog,
    ...CornieCard,
    ArrowLeft,
    IconBtn,
    CornieInput,
    CornieSelect,
    CustomCheckbox,
    CornieBtn,
    AutoComplete,
    CornieRadio,
    DatePicker,
    CancelIcon,
  },
})
export default class ModifyRequestModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, default: "" })
  medication!: IDispense;

  required = string().required();

  loading = false;

  substitute = false;
  quantity = "";
  supplyType = "";
}
</script>

<style scoped>
td {
  padding: 16px;
}
</style>
