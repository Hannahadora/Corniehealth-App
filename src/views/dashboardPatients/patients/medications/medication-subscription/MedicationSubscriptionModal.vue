<template>
  <cornie-dialog v-model="show" right class="w-1/2 h-full">
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
            Medication Subscription
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
            class="text-primary"
            title="Subscription"
            :opened="false"
          >
            <div class="p-2 text-sm" style="background: #f0f4fe">
              Source your regular medications and care for yourself and your
              loved ones. You can save upto 59% off regular retail prices each
              time you receive your medications from our virtual pharmacy.
            </div>
            <div class="flex gap-5 mt-6">
              <cornie-radio
                name="subscriberModel"
                v-model="subscriberModel"
                label="Subscribe for self"
                value="self"
                @change="subscriberModel = 'self'"
              />
              <cornie-radio
                name="subscriberModel"
                v-model="subscriberModel"
                value="others"
                label="Subscribe for others"
                @change="subscriberModel = 'others'"
              />
            </div>

            <div
              v-if="subscriberModel === 'self'"
              class="grid grid-cols-2 gap-6 mt-6"
            >
              <cornie-select
                class="w-full"
                label="Medical Condition"
                placeholder="--Select--"
                v-model="form.condition"
                :items="conditionsList"
              />
              <div class="relative">
                <span
                  class="absolute top-0 right-0 text-red-500 text-sm font-semibold"
                  >Add Physician</span
                >
                <cornie-input
                  class="w-full"
                  label="Attending Physician"
                  placeholder="Search"
                  v-model="form.physician"
                />
              </div>
              <div class="w-full cursor-pointer">
                <cornie-input
                  v-bind="$attrs"
                  label="Allergies (Specify if known)"
                  placeholder="--Select--"
                  v-model="form.allergy"
                >
                  <template #append-inner>
                    <plus-icon class="fill-current text-danger" />
                  </template>
                </cornie-input>
              </div>
              <cornie-input
                class="w-full"
                label="Other Medical Condition (Specify if known)"
                placeholder="--Enter--"
                v-model="form.otherCondition"
              />
            </div>

            <div
              v-if="subscriberModel === 'others'"
              class="grid grid-cols-2 gap-6 mt-6"
            >
              <cornie-input
                class="w-full"
                label="Full Name"
                placeholder="--Enter--"
                v-model="other.fullname"
              />
              <date-picker
                class="w-full"
                label="Date of Birth"
                v-model:date="other.dob"
                v-model:time="other.tob"
              />
              <cornie-select
                class="w-full"
                label="Gender"
                placeholder="--Select--"
                v-model="other.gender"
                :items="['Male', 'Female']"
              />
              <cornie-input
                class="w-full"
                label="Email"
                placeholder="--Enter--"
                v-model="other.email"
              />

              <div class="col-span-2 grid grid-cols-2 gap-6">
                <phone-input
                  label="Phone Number"
                  v-model:code="other.dialCode"
                  v-model="other.phoneNumber"
                  :rules="requiredString"
                  :readonly="readonly"
                />
              </div>
              <auto-complete
                class="w-full"
                v-model="country"
                label="Country"
                placeholder="Enter"
                :rules="requiredString"
                :readonly="readonly"
                :items="countries"
              />
              <auto-complete
                class="w-full"
                v-model="state"
                label="State"
                :items="states"
                placeholder="Enter"
                :rules="requiredString"
                :readonly="readonly"
              />
              <cornie-input
                class="w-full"
                v-model="city"
                label="City"
                placeholder="Enter"
                :rules="requiredString"
                :readonly="readonly"
              />
              <cornie-input
                class="w-full"
                v-model="postCode"
                label="ZIP"
                placeholder="Enter"
                :rules="requiredString"
                :readonly="readonly"
              />
            </div>
          </accordion-component>

          <accordion-component
            class="text-primary"
            title="Add Medications"
            :opened="false"
          >
            <div class="p-2 text-sm" style="background: #f0f4fe">
              Select your medications and specify quantities.
            </div>
            <div class="my-4" @click="medicationModal = true">
              <span class="text-red-500 text-sm font-semibold"
                >Add Medication</span
              >
            </div>

            <div v-if="medications.length > 0">
              <cornie-table
                :columns="rawHeaders"
                v-model="items"
                :listmenu="true"
                :check="false"
                class="mt-7"
              >
                <template #actions="{ index }">
                  <div
                    class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                    @click="deleteItem(index)"
                  >
                    <delete-icon class="text-danger fill-current" />
                    <span class="ml-3 text-xs">Delete</span>
                  </div>
                </template>
                <template #quantity="{ item }">
                  <input
                    class="border p-1"
                    type="number"
                    placeholder="Enter"
                    :min="1"
                    :max="item.available"
                    :modelValue="item.quantity"
                    @input="
                      (evt) => changeQuantity(item.id, Number(evt.data || 1))
                    "
                  />
                </template>
              </cornie-table>

              <div class="mt-8 grid grid-cols-2 gap-6 border-t border-dash">
                <div class="w-1/3">
                  <table class="w-full">
                    <tbody>
                      <tr v-if="discount">
                        <td>Total Discount</td>
                        <td>{{ totalDiscount || 0.0 }}</td>
                      </tr>
                      <tr>
                        <td>Sub Total</td>
                        <td>{{ subTotal || 0.0 }}</td>
                      </tr>
                      <tr v-if="type === 'delivery'">
                        <td class="font-bold">Shipping Cost</td>
                        <td>{{ shippingCost || 0.0 }}</td>
                      </tr>
                      <tr class="">
                        <td class="font-bold">Grand Total</td>
                        <td>{{ grandTotal || 0.0 }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </accordion-component>
        </v-form>
      </cornie-card-text>

      <div class="flex items-center justify-end mt-6 mb-6">
        <cornie-btn
          @click="show = false"
          class="border-primary border-2 px-3 py-1 mr-3 rounded-lg text-primary"
        >
          Cancel
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
    <add-medications v-model="medicationModal" @addMedication="addMedication" />
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
import { IObservation } from "@/types/IObservation";
import { IPatient } from "@/types/IPatient";

import FhirInput from "@/components/fhir-input.vue";
import DateTimePicker from "@/components/date-time-picker.vue";
import DatePicker from "@/components/datetime-picker.vue";
import { first, getTableKeyValue } from "@/plugins/utils";
import PhoneInput from "@/components/phone-input.vue";
import AddMedications from "./AddMedications.vue";
import TableOptions from "@/components/table-options.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";

// import AccordionComponent from "@/components/dialog-accordion.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import { getCountries, getStates } from "@/plugins/nation-states";
import ObjectSet from "@/lib/objectset";

const user = namespace("user");
const patients = namespace("patients");

const countries = getCountries();
@Options({
  name: "MedicationSubscriptionModal",
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
    PhoneInput,
    AddMedications,
    CornieTable,
    TableOptions,
  },
})
export default class MedicationSubscriptionModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, default: <any>{} })
  observation!: IObservation;

  required = string().required();

  customers = <any>[];

  loading = false;
  opened = true;
  subscriberModel = "self";
  medicationModal = false;

  form: any = {
    condition: "",
    otherCondition: "",
    allergy: "",
    physician: "",
  };
  other: any = {
    fullname: "",
    gender: "",
    email: "",
    dob: "",
    tob: "",
    phoneNumber: "",
    dialCode: "",
  };
  country = "";
  state = "";
  city = "";
  postCode = "";
  conditionsList: any = [
    "Hypertension (High Blood Pressure)",
    "Coronary Heart Disease & Stroke",
    "Prostate",
    "High Cholesterol",
    "Arthristis",
    "Diabetes",
    "Cancer",
    "Chronic Kidney Disease and Other",
    "Alzheimer’s Disease and Other",
    "ALS (Lou Gehrig’s Disease)",
    "Osteoporosis",
    "Chronic Obstructive Pulmonary",
    "Crohn’s Disease, Ulcerative Colitis",
    "Obesity",
    "Asthma",
    "Cystic Fibrosis",
    "Reflex Sympathetic Dystrophy (RSD)",
    "Oral Health",
  ];

  states = [] as any;
  countries = countries;
  medications: any = [];

  @Watch("country")
  async countryPicked(country: string) {
    const states = await getStates(country);
    this.states = states;
  }

  @Watch("id")
  idChanged() {}

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "MEDICATION",
      key: "medication",
      show: true,
    },
    {
      title: "FORM",
      key: "form",
      show: true,
    },
    {
      title: "QUANTITY",
      key: "quantity",
      show: true,
    },
    {
      title: "RETAIL PRICE",
      key: "retailPrice",
      show: true,
    },
    {
      title: "OUR PRICE",
      key: "ourPrice",
      show: true,
    },
    {
      title: "SAVINGS(N)",
      key: "savings",
      show: true,
    },
  ];

  addMedication(chosenMedication: any) {
    const medications = new ObjectSet(
      [...this.medications, { ...chosenMedication, quantity: 1 }],
      "id"
    );
    this.medications = [...medications];
  }

  async created() {}
}
</script>

<style scoped>
td {
  padding: 16px;
}
</style>
