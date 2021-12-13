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
          <v-form class="mt-5 w-full" @submit="submit">
            <div class="w-full grid grid-cols-2 gap-5"></div>
            <span class="flex w-full text-xs text-gray-25 py-2 mt-4 mx-auto">
              Specify notification reminder timelines prior to appointment time
            </span>
            <div class="mt-3 w-full flex">
              <cornie-input class="w-full pr-3" readonly label="1st Reminder">
                <template #prepend-inner>
                  <calendar-icon class="cursor-pointer" />
                  <input
                    type="time"
                    class="w-full p-2 outline-none"
                    v-model="istReminder.time"
                  />
                </template>
                <template #append-inner>
                  <slot name="time" />
                </template>
              </cornie-input>
              <div class="pr-2 pt-6">
                <input
                  type="number"
                  v-model="istReminder.days"
                  placeholder="30"
                  max="366"
                  class="text-center placeholder-black font-bold font-black outline-none border border-blue-lighter rounded-md h-12 w-12"
                />
                <input
                  type="text"
                  readonly
                  placeholder="Days"
                  class="text-center placeholder-black font-bold font-black outline-none border border-blue-lighter rounded-md h-12 w-12"
                />
              </div>

              <div class="pt-6">
                <input
                  type="number"
                  v-model="istReminder.weeks"
                  placeholder="30"
                  max="52"
                  class="text-center placeholder-black font-bold font-black outline-none border border-blue-lighter rounded-md h-12 w-12"
                />
                <input
                  type="text"
                  readonly
                  placeholder="Weeks"
                  class="text-center placeholder-black font-bold font-black outline-none border border-blue-lighter rounded-md h-12 w-12"
                />
              </div>
            </div>

            <div class="mt-3 w-full flex">
              <cornie-input class="w-full pr-3" readonly label="2nd Reminder">
                <template #prepend-inner>
                  <calendar-icon class="cursor-pointer" />
                  <input
                    type="time"
                    class="w-full p-2 outline-none"
                    v-model="secondReminder.time"
                  />
                </template>
                <template #append-inner>
                  <slot name="time" />
                </template>
              </cornie-input>
              <div class="pr-2 pt-6">
                <input
                  type="number"
                  v-model="secondReminder.days"
                  placeholder="30"
                  max="366"
                  class="text-center placeholder-black font-bold font-black outline-none border border-blue-lighter rounded-md h-12 w-12"
                />
                <input
                  type="text"
                  readonly
                  placeholder="Days"
                  class="text-center placeholder-black font-bold font-black outline-none border border-blue-lighter rounded-md h-12 w-12"
                />
              </div>

              <div class="pt-6">
                <input
                  type="number"
                  v-model="secondReminder.weeks"
                  max="52"
                  placeholder="30"
                  class="text-center placeholder-black font-bold font-black outline-none border border-blue-lighter rounded-md h-12 w-12"
                />
                <input
                  type="text"
                  readonly
                  placeholder="Weeks"
                  class="text-center placeholder-black font-bold font-black outline-none border border-blue-lighter rounded-md h-12 w-12"
                />
              </div>
            </div>

            <div class="mt-3 w-full flex">
              <cornie-input class="w-full pr-3" readonly label="3rd Reminder">
                <template #prepend-inner>
                  <calendar-icon
                    class="cursor-pointer"
                    @click="toggleDropdown"
                  />
                  <input
                    type="time"
                    class="w-full p-2 outline-none"
                    v-model="thirdReminder.time"
                  />
                </template>
                <template #append-inner>
                  <slot name="time" />
                </template>
              </cornie-input>
              <div class="pr-2 pt-6">
                <input
                  type="number"
                  v-model="thirdReminder.days"
                  placeholder="30"
                  max="366"
                  class="text-center placeholder-black font-bold font-black outline-none border border-blue-lighter rounded-md h-12 w-12"
                />
                <input
                  type="text"
                  readonly
                  placeholder="Days"
                  class="text-center placeholder-black font-bold font-black outline-none border border-blue-lighter rounded-md h-12 w-12"
                />
              </div>

              <div class="pt-6">
                <input
                  type="number"
                  v-model="thirdReminder.weeks"
                  placeholder="30"
                  max="52"
                  class="text-center placeholder-black font-bold font-black outline-none border border-blue-lighter rounded-md h-12 w-12"
                />
                <input
                  type="text"
                  readonly
                  placeholder="Weeks"
                  class="text-center placeholder-black font-bold font-black outline-none border border-blue-lighter rounded-md h-12 w-12"
                />
              </div>
            </div>
            <!-- <template #actions> -->
             <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="apply"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card> 
            <!-- </template> -->
          </v-form>
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
  },
})
export default class AddLocation extends Vue {
  get istReminder() {
    return {
      days: 0,
      weeks: 0,
      time: "",
    };
  }

  get secondReminder() {
    return {
      days: 0,
      weeks: 0,
      time: "",
    };
  }

  get thirdReminder() {
    return {
      days: 0,
      weeks: 0,
      time: "",
    };
  }
  @Prop({ type: String, default: "" })
  id!: string;

  @location.Action
  getLocationById!: (id: string) => Promise<ILocation>;

  loading = false;

  // days = 0;
  //       weeks: 0,
  //       time: "",
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
  becomeNumber(val: string) {
    return Number(val);
  }
  get payload() {
    this.istReminder.days = Number(this.istReminder.days);
    this.istReminder.weeks = Number(this.istReminder.weeks);
    this.secondReminder.days = Number(this.secondReminder.days);
    this.secondReminder.weeks = Number(this.secondReminder.weeks);
    this.thirdReminder.days = Number(this.thirdReminder.days);
    this.thirdReminder.weeks = Number(this.thirdReminder.weeks);
    return {
      first: this.istReminder,
      second: this.secondReminder,
      third: this.thirdReminder,
      // name: this.name,
      // locationStatus: this.locationStatus,
      // operationalStatus: this.operationalStatus,
      // description: this.description,
      // alias: this.alias,
      // mode: this.mode,

      // type: this.type,
      // phone: this.phone,
      // email: this.email,
      // address: this.address,
      // country: this.country,
      // state: this.state,
      // physicalType: this.physicalType,
      // latitude: this.latitude,
      // longitude: this.longitude,
      // altitude: this.altitude,
      // managingOrg: this.managingOrg,
      // partOf: this.partOf,
      // availabilityExceptions: this.availabilityExceptions,
      // careOptions: this.careOptions,
      // openTo: this.openTo,
      // hoursOfOperation: this.hoursOfOperation,
    };
  }

  async submit2() {
    ;
    this.loading = true;
    if (this.id) await this.updateLocation();
    else await this.createLocation();
    this.loading = false;
  }

  async submit() {
    ;
    this.loading = true;
    this.createLocation();
    this.loading = false;
  }

  async createLocation() {
    try {
      const response = await cornieClient().post(
        "/api/v1/appointment-reminders",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Appointment Created", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Appointment Created", status: "error" });
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
