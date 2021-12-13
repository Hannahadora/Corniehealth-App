<template>
  <div class="h-screen flex justify-center">
    <div class="w-full mx-5">
      <!-- <span
        class="
          flex
          border-b-2
          w-full
          font-semibold
          text-xl text-primary
          py-2
          mx-auto
        "
      >
        {{ id ? "Update Location" : "Add Location" }}
      </span> -->
      <span class="w-full">
        <div class="w-full h-screen">
          <v-form class="mt-5 w-full">
            <div class="w-full"></div>
            <span class="flex w-full text-xs text-gray-25 py-2 mt-4">
              Patients will be able to see your cancellation notice when they
              book appointments online and when they recieve appointment
              notification emails. notification reminder timelines prior to
              appointment time
            </span>
            <div class="mt-3 w-full">
              <cornie-text-area rows="4" label="Message" class="w-full" />
            </div>
          </v-form>
          <div class="mt-2 flex justify-end">
            <button
              class="border-primary border-2 rounded-full text-black mr-5 py-1 px-4 focus:outline-none outline hover:bg-primary hover:text-white"
            >
              Cancel
            </button>
            <button
              class="bg-danger rounded-full text-white py-1 px-4 focus:outline-none hover:opacity-90"
              @click="addFunction = true"
            >
              <img src="@/assets/img/plus.svg" class="inline-block mr-2" />
              Save
            </button>
          </div>
          <!-- </template> -->
        </div>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import PhoneInput from "@/components/phone-input.vue";
import OperationHours from "./new-operation-hours.vue";
import ILocation, { HoursOfOperation } from "@/types/ILocation";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";
import { getCoordinates } from "@/plugins/utils";
import { getCountries, getStates } from "@/plugins/nation-states";
import AutoComplete from "@/components/autocomplete.vue";

import CalendarIcon from "@/components/icons/calendar.vue";
import DateTimePicker from "./components/datetime-picker.vue";
import CornieTextArea from "@/components/textarea.vue";

const countries = getCountries();

const dropdown = namespace("dropdown");
const location = namespace("location");

@Options({
  components: {
    CornieInput,
    AutoComplete,
    CornieSelect,
    PhoneInput,
    OperationHours,

    CalendarIcon,
    DateTimePicker,
    CornieTextArea,
  },
})
export default class AddLocationn extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  @location.Action
  getLocationById!: (id: string) => Promise<ILocation>;

  loading = false;

  name = "";
  locationStatus = "";
  operationalStatus = "";
  description = "";
  alias = "";
  mode = "";
  type = "";
  phone = "";
  email = "";
  address = "";
  country = "";
  state = "";
  physicalType = "";
  latitude = "";
  longitude = "";
  altitude = "321";
  managingOrg = "";
  partOf = "";
  availabilityExceptions = "";
  careOptions = "";
  openTo = "";
  hoursOfOperation: HoursOfOperation[] = [];

  dropdowns = {} as IIndexableObject;

  required = string().required();
  requiredEmail = string().required().email();

  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  get identifier() {
    return this.id || "System generated";
  }
  @Watch("id")
  idChanged() {
    this.setLocation();
  }

  get coordinatesCB() {
    const address = `${this.address}, ${this.state} ${this.country}`;
    return () => getCoordinates(address);
  }

  @Watch("coordinatesCB")
  async coordinatesFetched(cb: () => Promise<any>) {
    const data = await cb();
    this.longitude = String(data.longitude);
    this.latitude = String(data.latitude);
  }

  states = [] as any;
  countries = countries;

  @Watch("country")
  async countryPicked(country: string) {
    const states = await getStates(country);
    this.states = states;
  }

  async setLocation() {
    const location = await this.getLocationById(this.id);
    if (!location) return;
    this.name = location.name;
    this.locationStatus = location.locationStatus;
    this.operationalStatus = location.operationalStatus;
    this.description = location.description;
    this.alias = location.alias;
    this.mode = location.mode;

    this.type = location.type;
    this.phone = location.phone;
    this.email = location.email;
    this.address = location.address;
    this.country = location.country;
    this.state = location.state;
    this.physicalType = location.physicalType;
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.altitude = location.altitude;
    this.managingOrg = location.managingOrg;
    this.partOf = location.partOf;
    this.availabilityExceptions = location.availabilityExceptions;
    this.careOptions = location.careOptions;
    this.openTo = location.openTo;
    this.hoursOfOperation = location.hoursOfOperation;
  }
  get payload() {
    return {
      name: this.name,
      locationStatus: this.locationStatus,
      operationalStatus: this.operationalStatus,
      description: this.description,
      alias: this.alias,
      mode: this.mode,

      type: this.type,
      phone: this.phone,
      email: this.email,
      address: this.address,
      country: this.country,
      state: this.state,
      physicalType: this.physicalType,
      latitude: this.latitude,
      longitude: this.longitude,
      altitude: this.altitude,
      managingOrg: this.managingOrg,
      partOf: this.partOf,
      availabilityExceptions: this.availabilityExceptions,
      careOptions: this.careOptions,
      openTo: this.openTo,
      hoursOfOperation: this.hoursOfOperation,
    };
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.updateLocation();
    else await this.createLocation();
    this.loading = false;
  }

  async createLocation() {
    try {
      const response = await cornieClient().post(
        "/api/v1/location",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Location Created", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Location not Created", status: "error" });
    }
  }

  async updateLocation() {
    const url = `/api/v1/location/${this.id}`;
    const payload = { ...this.payload, id: this.id };
    try {
      const response = await cornieClient().put(url, payload);
      window.notify({ msg: "Location Updated", status: "success" });
    } catch (error) {
      window.notify({ msg: "Location not Updated", status: "error" });
    }
  }

  async created() {
    this.setLocation();
    const data = await this.getDropdowns("location");
    this.dropdowns = data;
  }
}
</script>

<style scoped>
input[type="time"]::-webkit-calendar-picker-indicator {
  background: none;
  display: none;
}
</style>
