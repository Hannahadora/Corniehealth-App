<template>
  <cornie-dialog v-model="show" right class="lg:w-5/12 w-full h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white overflow-y-scroll"
    >
      <cornie-card-title class="">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Upload Prescription
          </h2>
          <cancel-red-bg
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <v-form class="flex-grow flex flex-col" @submit="save">
          <accordion-component
            class="text-primary shadow-none border-none"
            title="Add Prescribed Medications"
            :opened="false"
          >
            <add-medications />

            <div v-for="(medication, idx) in medications" :key="idx">
              <div class="flex items-center">
                <div>{{ medication.name }}</div>
                <div class="flex items-center">
                  <cornie-select
                    label="Quantity"
                    primary
                    v-model="quantityUnit"
                    items="['Vitals', 'Bottles', 'Blister packs', 'Satchet', 'Syringes', 'Ampoules', 'Tube', 'Container','Strip', 'Box', 'Pieces']"
                  />
                  <cornie-input label="..." v-model="quantityValue" />
                </div>
                <div class="flex items-center">
                  <cornie-select
                    label="Quantity"
                    primary
                    v-model="amountUnit"
                    items="[]"
                  />
                  <cornie-input
                    label="..."
                    v-model="amountValue"
                    placeholder=""
                  />
                </div>
              </div>
            </div>

            <div class="mt-6">
              <cornie-input
                label="Total Amount"
                v-model="totalAmount"
                placeholder=""
              />
            </div>
          </accordion-component>

          <accordion-component
            class="text-primary shadow-none border-none"
            title="Fulfillment Option"
            :opened="false"
          >
            <div class="mt-6 flex items-center space-x-5">
              <cornie-radio
                label="Deliver to Me."
                value="delivery"
                v-model="deliveryOption"
              />
              <cornie-radio
                label="I want to pick-up at my nearest pharmacy."
                value="pick-up"
                v-model="deliveryOption"
              />
            </div>
            <div class="mt-7" v-if="deliveryOption === 'delivery'">
              <cornie-select
                label="Address"
                v-model="address"
                placeholder="--Select--"
                :items="addresses"
              />
            </div>
            <div
              v-if="deliveryOption === 'pick-up'"
              class="mt-7 w-full grid lg:grid-cols-2 space-x-4"
            >
              <cornie-select
                label="Select Location"
                v-model="location"
                placeholder="--Select--"
                :items="locations"
                class=""
              />
              <cornie-select
                label="Select Pharmacy"
                v-model="pharmacy"
                placeholder="--Select--"
                :items="pharmacys"
              />
            </div>
          </accordion-component>

          <div
            class="mt-6 text-red-500 text-sm cursor-pointer"
            @click="uploadPrescriptionModal = true"
          >
            Upload Prescription
          </div>
        </v-form>
      </cornie-card-text>

      <div class="flex items-center justify-end mt-6 mb-6 px-5">
        <cornie-btn
          class="border-primary border-2 px-3 py-1 mr-3 rounded-lg text-primary"
        >
          <img class="mr-2" src="@/assets/img/cart.svg" alt="" />
          Add to Cart
        </cornie-btn>
        <cornie-btn
          @click="save('')"
          :loading="loading"
          type="submit"
          class="text-white bg-danger px-3 py-1 rounded-lg"
        >
          Pay
        </cornie-btn>
      </div>
    </cornie-card>

    <upload-prescription v-model="uploadPrescriptionModal" />
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
import PlusIcon from "@/components/icons/plus.vue";
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
import { IPatient } from "@/types/IPatient";

import FhirInput from "@/components/fhir-input.vue";
import DateTimePicker from "@/components/date-time-picker.vue";
import DatePicker from "@/components/datetime-picker.vue";
import { first, getTableKeyValue } from "@/plugins/utils";

// import AccordionComponent from "@/components/dialog-accordion.vue";
import AccordionComponent from "@/components/form-accordion.vue";

import AddMedications from "./AddMedications.vue";
import UploadPrescription from "./UploadPrescription.vue";

const hierarchy = namespace("hierarchy");
const orgFunctions = namespace("OrgFunctions");
const user = namespace("user");
const patients = namespace("patients");

@Options({
  name: "AddPrescriptionDialog",
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
    DateTimePicker,
    CancelRedBg,
    AccordionComponent,
    PlusIcon,
    DatePicker,
    FhirInput,
    AddMedications,
    UploadPrescription,
  },
})
export default class AddPrescriptionDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, default: {} })
  observation!: any;

  loading = false;
  medications: any = [];
  deliveryOption = "delivery";
  quantityUnit = "";
  quantityValue = "";
  amountUnit = "";
  amountValue = "";
  totalAmount = "";
  address = "";
  location = "";
  pharmacy = "";
  uploadPrescriptionModal = false;

  get addresses() {
    return [];
  }
  get locations() {
    return [];
  }
  get pharmacys() {
    return [];
  }

  async save() {}

  async created() {}
}
</script>

<style scoped>
td {
  padding: 16px;
}
</style>
