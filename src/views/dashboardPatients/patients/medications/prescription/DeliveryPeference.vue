<template>
  <cornie-dialog v-model="show" right class="w-5/12 h-full">
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
            Delivery Preferences
          </h2>
          <cancel-red-bg
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable px-6">
        <div
          class="w-full mb-12 py-6 px-6 shadow flex items-start justify-between"
          v-for="(loc, i) in deliveryPreferences"
          :key="i"
        >
          <div>
            <img src="@/assets/img/blue-location.svg" alt="" />
          </div>
          <div class="mx-4">
            <span class="text-sm text-blue-300 italic" v-if="loc.isDefault"
              >Default Address</span
            >
            <span
              class="text-sm text-red-500 italic cursor-pointer"
              @click="makedefault"
              v-else
              >Make Default Address</span
            >
            <p class="font-bold">
              {{ loc.houseNumber }} {{ loc.address }}, {{ loc.city }},
              {{ loc.state }}, {{ loc.country }}
            </p>
            <span class="text-sm text-blue-300 italic">Office</span>
            <p class="font-bold flex">
              Preferred Delivery Times
              <img
                @click="showDeliveryTimes = true"
                class="ml-2"
                src="@/assets/img/chevrondown.svg"
                alt=""
              />
            </p>
            <div
              v-for="(period, i) in deliveryTimes"
              :key="i"
              class="flex items-center space-x-2"
            >
              <p>{{ period.day }}</p>
              <p>{{ period.to }} - {{ period.from }}</p>
            </div>
          </div>
          <div class="flex items-center cursor-pointer">
            <edit class="mr-10" />
            <delete-red />
          </div>
        </div>

        <div
          class="mb-12 flex items-center cursor-pointer"
          @click="showForm = !showForm"
        >
          <plus class="mr-2" />
          <p class="text-red-400">Add Another Address</p>
        </div>

        <v-form
          v-if="showForm"
          class="flex-grow flex flex-col space-x-6"
          @submit="save"
        >
          <div class="flex flex-col space-y-6">
            <cornie-select
              label="Type"
              v-model="type"
              placeholder="--Select--"
              :items="types"
              class=""
            />
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
              v-model="state"
              label="State"
              :items="states"
              placeholder="Enter"
              :rules="required"
            />
            <cornie-input
              label="City"
              v-model="city"
              placeholder="--Enter--"
              class=""
            />
            <cornie-input
              label="Zip or Post Code"
              v-model="zipCode"
              placeholder="--Enter--"
            />
            <cornie-input
              label="Apartment or House Number"
              v-model="houseNumber"
              placeholder="--Enter--"
            />
            <cornie-input
              label="Address"
              v-model="address"
              placeholder="--Enter--"
            />
          </div>
          <accordion-component
            class="text-primary shadow-none border-none"
            title="Preferred Delivery Times"
            :opened="false"
          >
            <div
              class="my-4 flex items-center cursor-pointer"
              @click="addDeliveryTimes"
            >
              <plus class="mr-2" />
              <p class="text-red-400">Add Another Delivery Time</p>
            </div>

            <div
              class="flex items-center space-x-4"
              v-for="(period, i) in deliveryTimes"
              :key="i"
            >
              <date-picker
                name="day"
                v-model="period.day"
                style="z-index: 9000; width: 100%"
              ></date-picker>

              <cornie-input type="time" :label="'From'" v-model="period.from" />
              <cornie-input type="time" :label="'To'" v-model="period.to" />
            </div>
          </accordion-component>
        </v-form>
      </cornie-card-text>

      <div class="flex items-center justify-end mt-6 mb-6 px-5">
        <cornie-btn
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
          Save
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
import TimePicker from "@/components/Timepicker.vue";
import DatePicker from "@/components/datepicker.vue";
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

// import AccordionComponent from "@/components/dialog-accordion.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import Edit from "@/components/icons/edit.vue";
import { getCountries, getStates } from "@/plugins/nation-states";

const hierarchy = namespace("hierarchy");
const orgFunctions = namespace("OrgFunctions");
const user = namespace("user");
const patients = namespace("patients");

const countries = getCountries();

@Options({
  name: "AddPrescriptionDialog",
  components: {
    CornieDialog,
    ...CornieCard,
    Edit,
    ArrowLeft,
    IconBtn,
    CornieInput,
    CornieSelect,
    CustomCheckbox,
    CornieBtn,
    AutoComplete,
    CornieRadio,
    CancelRedBg,
    AccordionComponent,
    PlusIcon,
    TimePicker,
    DatePicker,
  },
})
export default class AddPrescriptionDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, default: {} })
  observation!: any;

  required = string().required();
  requiredEmail = string().email().required();

  loading = false;
  uploadPrescriptionModal = false;

  showDeliveryTimes = false;
  showForm = false;
  deliveryPreferences = [] as any;
  states = [] as any;
  countries = countries;
  types = ["Home"];

  type = "";
  country = "";
  state = "";
  city = "";
  zipCode = "";
  houseNumber = "";
  address = "";
  deliveryTimes = [
    {
      day: "",
      from: "",
      to: "",
    },
  ];

  @Watch("country")
  async countryPicked(country: string) {
    this.country = country;
    const states = await getStates(country);
    this.states = states;
  }

  get addresses() {
    return [];
  }
  get locations() {
    return [];
  }
  get pharmacys() {
    return [];
  }
  get payload() {
    return {
      type: this.type,
      country: this.country,
      state: this.state,
      city: this.city,
      zipCode: this.zipCode,
      houseNumber: this.houseNumber,
      address: this.address,
      deliveryTimes: this.deliveryTimes,
    };
  }
  async save() {
    this.loading = true;
    try {
      const { data } = await cornieClient().post(
        "/api/v1/patient-portal/delivery-preferences/create",
        { ...this.payload }
      );
      if (data.success) {
        this.loading = false;
        window.notify({
          msg: "Delivery preference updated",
          status: "success",
        });
        this.$emit("preference-added", data.data);
      }
    } catch (error) {
      this.loading = false;
      window.notify({
        msg: "An error occured",
        status: "error",
      });
    }
  }

  async fetchDeliveryPreferences() {
    try {
      const { data } = await cornieClient().get(
        `/api/v1/patient-portal/delivery-preferences/get-all`
      );
      this.deliveryPreferences = data || [];
    } catch (error) {
      window.notify({
        msg: "There was an error fetching delivery preferneces",
        status: "error",
      });
    }
  }

  async makedefault() {}

  addDeliveryTimes() {
    this.deliveryTimes.push({
      day: "",
      from: "",
      to: "",
    });
  }

  async created() {
    await this.fetchDeliveryPreferences();
    this.$emit("preference-added", this.deliveryPreferences[0]);
  }
}
</script>

<style scoped>
td {
  padding: 16px;
}
</style>
