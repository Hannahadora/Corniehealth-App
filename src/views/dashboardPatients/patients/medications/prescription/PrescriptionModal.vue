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
            :opened="true"
          >
            <add-medications @dropdownState="handleMedDDstate" />

            <div class="my-6 flex items-center justify-between">
              <p class="text-xl text-667499 font-bold">
                {{ prescriptionCartItems.length }} Items
              </p>
              <p class="text-xl text-667499 font-bold">
                SubTotal: N{{ totalCost }}
              </p>
            </div>

            <div
              class="border border-gray-500 px-3 py-6"
              v-if="prescriptionCartItems.length > 0"
            >
              <div
                v-for="(item, idx) in prescriptionCartItems"
                :key="idx"
                class="border-b border-gray-500 px-3 py-3 mb-2"
              >
                <div class="flex items-start justify-between">
                  <div class="flex items-center">
                    <img
                      :src="item.image"
                      class="w-12 h-12 rounded-full mr-5"
                      alt=""
                    />
                    <div>
                      <p>{{ item.genericName }}</p>
                      <span class="text-xs text-gray-500"
                        >{{ item.form }} {{ item.strength }}</span
                      >
                      <p class="mt-1 text-xs">
                        {{ item.size }} {{ item.form }}
                      </p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="line-through text-danger text-sm mt-2">
                      {{ item.productPrice }}
                    </p>
                    <p class="mb-2 font-semibold text-sm">
                      {{ item.productPrice }}
                    </p>
                    <p
                      class="text-blue-500 underline text-xs mt-2 cursor-pointer"
                      @click="removeItem(item)"
                    >
                      Remove
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </accordion-component>

          <!-- <accordion-component
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
              class="mt-7 w-full grid lg:grid-cols-2 lg:space-x-4"
            >
              <cornie-select
                label="Select Location"
                v-model="location"
                placeholder="--Select--"
                :items="productLocations"
                class=""
              />
              <cornie-select
                label="Select Pharmacy"
                v-model="pharmacy"
                placeholder="--Select--"
                :items="productPharmacies"
              />
            </div>
          </accordion-component> -->

          <div
            v-if="!fileInfo.fileExt"
            class="mt-6 flex items-center text-green-500 text-sm cursor-pointer"
            @click="uploadPrescriptionModal = true"
          >
            <upload-green class="mr-4" />
            Upload Prescription
          </div>
          <div v-else class="flex items-center">
            <img
              class="h-6 w-6"
              :src="prescription.prescriptionImageUrl"
              alt="uploaded-image"
            />
            <div>
              <p class="font-bold text-sm">{{ fileInfo.fileExt }}</p>
              <p class="text-gray-300 text-xs">{{ fileInfo.fileSize }}</p>
            </div>
          </div>

          <p class="mt-7" v-if="medications.length > 0">
            View cart to review your items.
          </p>
        </v-form>
      </cornie-card-text>

      <div
        class="flex items-center justify-end mt-6 mb-6 px-5"
        v-if="!medDDState"
      >
        <cornie-btn
          class="border-primary border-2 px-3 py-1 mr-3 rounded-lg text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn
          @click.self="save"
          :loading="loading"
          :disabled="medications.length === 0"
          type="submit"
          class="text-white bg-danger px-3 py-1 rounded-lg"
        >
          View Cart
        </cornie-btn>
      </div>
    </cornie-card>

    <upload-prescription
      v-model="uploadPrescriptionModal"
      @getFormData="getFormData"
    />
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
import PlusIcon from "@/components/icons/plus.vue";
import UploadGreen from "@/components/icons/upload-green.vue";
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
const cartStore = namespace("cart");

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
    UploadGreen,
  },
})
export default class AddPrescriptionDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

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
  productLocations = [] as any;
  productPharmacies = [] as any;
  medDDState = false;

  prescription: any = {
    deliveryPreferencesId: "",
    prescriptionImageUrl: "",
    prescriber_name: "",
    prescriber_email: "",
    prescribedMedications: {
      medicationId: "",
      quantity: "",
      cost: "",
      locationId: "",
      organizationId: "",
    },
  };

  fileInfo = {} as any;

  @cartStore.State
  prescriptionCartItems: any;

  get totalCost() {
    return this.prescriptionCartItems.reduce(
      (a: any, b: any) => Number(a.productPrice) + Number(b.productPrice),
      0
    );
  }

  get addresses() {
    return [];
  }

  removeItem() {}

  handleMedDDstate(value: any) {
    this.medDDState = value;
  }

  async fetchProductLocations() {
    try {
      const { data } = await cornieClient().get(
        `/api/v1/patient-portal/catalogue-product/get-locations`
      );
      this.productLocations = data || [];
    } catch (error) {
      window.notify({
        msg: "There was an error fetching catalogue product locations",
        status: "error",
      });
    }
  }

  async fetchProductPharmacies() {
    try {
      const { data } = await cornieClient().get(
        `/api/v1/patient-portal/catalogue-product/get-pharmacies`
      );
      this.productPharmacies = data || [];
    } catch (error) {
      window.notify({
        msg: "There was an error fetching catalogue product pharmacies",
        status: "error",
      });
    }
  }

  getFormData(data: any) {
    (this.prescription.prescriptionImageUrl = data.file),
      (this.prescription.prescriber_name = data.prescriberName),
      (this.prescription.prescriber_email = data.email);
    this.fileInfo = data.fileInfo;
  }

  save() {
    this.$router.push("/dashboard/patient/shopping/cart?type=prescriptions");
  }

  async created() {
    await this.fetchProductPharmacies();
    await this.fetchProductLocations();
  }
}
</script>

<style scoped>
td {
  padding: 16px;
}
.text-667499 {
  color: #667499;
}
</style>
