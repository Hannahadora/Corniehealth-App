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
        <v-form class="flex-grow flex flex-col">
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
                v-model="subscriptionModel.subscribeFor"
                label="Subscribe for self"
                value="self"
                @change="subscriptionModel.subscribeFor = 'self'"
              />
              <cornie-radio
                name="subscriberModel"
                v-model="subscriptionModel.subscribeFor"
                value="others"
                label="Subscribe for others"
                @change="subscriptionModel.subscribeFor = 'others'"
              />
            </div>

            <div
              v-if="subscriptionModel.subscribeFor === 'self'"
              class="grid grid-cols-2 gap-6 mt-6"
            >
              <cornie-select
                class="w-full"
                label="Medical Condition"
                placeholder="--Select--"
                v-model="subscriptionModel.medicalCondition"
                :items="conditionsList"
              />
              <!-- <div class="relative">
                <span
                  class="absolute top-0 right-0 text-red-500 text-sm font-semibold"
                  >Add Physician</span
                >
                <cornie-input
                  class="w-full"
                  label="Attending Physician"
                  placeholder="Search"
                  v-model="subscriptionModel.practitionerId"
                />
              </div> -->
              <cornie-input
                class="w-full"
                v-model="subscriptionModel.practitionerId"
                label="Practitioner Email"
                :rules="requiredEmail"
                placeholder="Enter"
              />
              <div
                class="w-full cursor-pointer"
                @click="showProblemModal = true"
              >
                <cornie-input
                  v-bind="$attrs"
                  label="Allergies (Specify if known)"
                  placeholder="--Select--"
                  v-model="subscriptionModel.allergies"
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
                v-model="subscriptionModel.otherMedicalConditions[0]"
              />

              <div v-if="allergyItems.length > 0">
                <div class="w-full flex items-center py-5">
                  <div
                    class="w-4/12 flex"
                    v-for="(record, index) in allergyItems"
                    :key="index"
                  >
                    <p class="capitalize text-primary text-sm font-medium">
                      {{ record }}
                    </p>
                    <span class="mx-2 cursor-pointer"
                      ><delete-icon @click="removeItem(index, allergyItems)"
                    /></span>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="subscriptionModel.subscribeFor === 'others'"
              class="grid grid-cols-2 gap-6 mt-6"
            >
              <cornie-input
                class="w-full"
                label="Full Name"
                placeholder="--Enter--"
                v-model="subscriptionModel.fullname"
              />
              <date-picker
                class="w-full"
                label="Date of Birth"
                v-model:date="subscriptionModel.dob"
                v-model:time="subscriptionModel.tob"
              />
              <cornie-select
                class="w-full"
                label="Gender"
                placeholder="--Select--"
                v-model="subscriptionModel.gender"
                :items="['male', 'female']"
              />
              <cornie-input
                class="w-full"
                label="Email"
                placeholder="--Enter--"
                v-model="subscriptionModel.email"
              />

              <div class="col-span-2 grid grid-cols-2 gap-6">
                <phone-input
                  label="Phone Number"
                  v-model:code="subscriptionModel.dialCode"
                  v-model="subscriptionModel.phoneNumber"
                  :rules="required"
                />
              </div>
              <auto-complete
                class="w-full"
                v-model="country"
                label="Country"
                placeholder="Enter"
                :rules="required"
                :items="countries"
              />
              <auto-complete
                class="w-full"
                v-model="subscriptionModel.state"
                label="State"
                :items="states"
                placeholder="Enter"
                :rules="required"
              />
              <cornie-input
                class="w-full"
                v-model="subscriptionModel.city"
                label="City"
                placeholder="Enter"
                :rules="required"
              />
              <cornie-input
                class="w-full"
                v-model="subscriptionModel.zip"
                label="ZIP"
                placeholder="Enter"
                :rules="required"
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
                    @click="removeItem(index, items)"
                  >
                    <delete-icon class="text-danger fill-current" />
                    <span class="ml-3 text-xs">Delete</span>
                  </div>
                </template>
                <template #quantity="{ item }">
                  <!-- <cornie-select
                      primary
                      class="w-full"
                      label="Every"
                      placeholder="--Select--"
                      v-model="item.form"
                      :items="['tablet']"
                    /> -->
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

              <div
                class="py-8 mt-8 flex items-start justify-between gap-6 border-t border-dash"
              >
                <div>
                  <p class="mb-7">
                    How often do you want your medications delivered?
                  </p>
                  <div class="flex items-center space-x-3">
                    <cornie-select
                      class="w-full"
                      label="Frequently"
                      placeholder="--Select--"
                      v-model="deliveryOption"
                      :items="['weekly', 'monthly', 'quarterly']"
                    />

                    <cornie-select
                      v-if="deliveryOption === 'weekly'"
                      class="w-full"
                      label="Every"
                      placeholder="--Select--"
                      v-model="deliveryPeriod"
                      :items="[
                        'monday',
                        'tuesday',
                        'wednesday',
                        'thursday',
                        'friday',
                      ]"
                    />
                    <cornie-select
                      v-if="deliveryOption === 'monthly'"
                      class="w-full"
                      label="Every"
                      placeholder="--Select--"
                      v-model="deliveryPeriod"
                      :items="['15th Day Of The Month']"
                    />
                    <cornie-select
                      v-if="deliveryOption === 'quarterly'"
                      class="w-full"
                      label="Every"
                      placeholder="--Select--"
                      v-model="deliveryPeriod"
                      :items="['15th of Every Third month']"
                    />
                  </div>
                </div>
                <div class="w-1/3 flex items-start justify-end">
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
                      <tr>
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
          @click="save"
          :loading="loading"
          type="submit"
          class="text-white bg-danger px-3 py-1 rounded-lg"
        >
          Pay
        </cornie-btn>
      </div>
    </cornie-card>
    <add-medications v-model="medicationModal" @addMedication="addMedication" />
    <problem-modal @getProblem="showProblem" v-model="showProblemModal" />
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
import User from "@/types/user";
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
import ProblemModal from "./problemdialog.vue";
import DeleteIcon from "@/components/icons/deleteorange.vue";

// import AccordionComponent from "@/components/dialog-accordion.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import { getCountries, getStates } from "@/plugins/nation-states";

import search from "@/plugins/search";
import ObjectSet from "@/lib/objectset";
import IPractitioner from "@/types/IPractitioner";
import IAllergy, { OnSet, Reaction } from "@/types/IAllergy";

const user = namespace("user");
const patients = namespace("patients");
const account = namespace("user");
const userStore = namespace("user");
const allergy = namespace("allergy");

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
    ProblemModal,
    DeleteIcon,
  },
})
export default class MedicationSubscriptionModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, default: {} })
  observation!: IObservation;

  @user.Getter
  authPractitioner!: IPractitioner;

  required = string().required();
  requiredEmail = string().email().required();

  @userStore.State
  user!: User;

  @allergy.State
  allergys!: IAllergy[];

  customers: any = [];
  allergyItems: any = [];
  showProblemModal = false;
  loading = false;
  opened = true;
  medicationModal = false;
  discount = false;
  deliveryPeriod = "";
  deliveryOption = "weekly";

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
  country = "";
  query = "";

  subscriptionModel: any = {
    subscribeFor: "self",
    patientId: "",
    medicalCondition: "",
    practitionerId: "",
    allergies: [] as any,
    otherMedicalConditions: [] as any,
    fullname: "",
    dob: "",
    gender: "",
    email: "",
    phoneNumber: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    subscribedMedications: [] as {
      productId: "";
      quantity: "";
      cost: "";
      locationId: "";
      organizationId: "";
    }[],
  };

  @Watch("country")
  async countryPicked(country: string) {
    this.subscriptionModel.country = country;
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

  get items() {
    const dMed = this.medications?.map((medication: any) => {
      return {
        ...medication,
        action: medication.id,
        medication: `${medication.genericName} (${medication.size})`,
        form: medication.form,
        unitPrice: medication.unitPrice,
        quantity: medication.quantity,
      };
    });
    if (!this.query) return dMed;
    return search.searchObjectArray(dMed, this.query);
  }

  changeQuantity(itemId: string, quantity: number) {
    const medication = this.medications.find(({ id }: any) => id == itemId);
    if (!medication) return;
    medication.quantity = quantity;
  }

  addMedication(chosenMedication: any) {
    const medications = new ObjectSet(
      [...this.medications, { ...chosenMedication, quantity: 1 }],
      "id"
    );
    this.medications = [...medications];
  }

  removeItem(index: number, items: any) {
    items.splice(index, 1);
  }

  showProblem(value: any) {
    this.subscriptionModel.allergies = value;
    this.allergyItems = value;
  }

  get totalDiscount() {
    return 0;
  }

  get grandTotal() {
    return 0;
  }

  get subTotal() {
    return 0;
  }

  get shippingCost() {
    return 0;
  }

  get payload() {
    const data: any = {
      ...this.subscriptionModel,
      patientId: this.user.id,
      subscribedMedications: this.medications.map((el: any) => {
        return {
          // ...el,
          productId: el?.id,
          quantity: el?.quantity.toString(),
          cost: el?.cost,
          locationId: el?.locationId,
          organizationId: el?.organizationId,
        };
      }),
    };
    if (data.subscribeFor === "self") {
      data.fullname = undefined;
      data.dob = undefined;
      data.gender = undefined;
      data.email = undefined;
      data.phoneNumber = undefined;
      data.country = undefined;
      data.state = undefined;
      data.city = undefined;
      data.zip = undefined;
    } else if (data.subscribeFor === "others") {
      data.medicalCondition = undefined;
      data.practitionerId = undefined;
      data.allergies = undefined;
      data.otherMedicalConditions = undefined;
    }
    return data;
  }

  async save() {
    this.loading = true;
    try {
      const { data } = await cornieClient().post(
        "/api/v1/patient-portal/medication-subscription/create",
        { ...this.payload }
      );
      if (data.success) {
        this.loading = false;
        window.notify({
          msg: "Subscription Added",
          status: "success",
        });
        this.$emit("subscription-added");
      }
    } catch (error) {
      this.loading = false;
      window.notify({
        msg: "An error occured",
        status: "error",
      });
    }
  }

  async created() {}
}
</script>

<style scoped>
td {
  padding: 16px;
}
</style>
