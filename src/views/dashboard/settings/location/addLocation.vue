<template>
  <div class="h-screen flex justify-center">
    <div class="w-full mx-5">
      <span
        class="flex border-b-2 w-full font-semibold text-xl text-primary py-2 mx-auto"
      >
        {{ id ? "Update Location" : "Add Location" }}
      </span>
      <span class="w-full">
        <div class="w-full h-screen">
          <v-form class="mt-5 w-full" @submit="submit">
            <div class="w-full grid grid-cols-2 gap-5">
              <cornie-input
                :rules="required"
                required
                v-model="name"
                label="Location Name"
              />
              <cornie-input
                disabled
                :modelValue="identifier"
                label="Location Identifier"
              />
              <cornie-select
                :rules="required"
                required
                v-model="locationStatus"
                :items="['active', 'inactive']"
                label="Location Status"
              />
              <cornie-select
                :rules="required"
                required
                :items="dropdowns.operationalStatus"
                v-model="operationalStatus"
                label="Operational status"
              />
              <cornie-input
                :rules="required"
                required
                v-model="description"
                label="Description"
              />
              <cornie-input :rules="required" v-model="alias" label="Alias" />
              <cornie-select
                :rules="required"
                required
                :items="dropdowns.mode"
                v-model="mode"
                label="Mode"
              />
              <cornie-select
                :rules="required"
                required
                :items="dropdowns.type"
                v-model="type"
                label="Type"
              />
              <div class="block w-11/12">
                <phone-input
                  v-model="phone"
                  required
                  :rules="required"
                  label="Phone Number"
                />
              </div>
              <cornie-input
                :rules="requiredEmail"
                required
                v-model="email"
                label="Email Address"
              />
              <cornie-input
                :rules="required"
                v-model="address"
                label="Address"
                required
              />
              <auto-complete
                :rules="required"
                v-model="country"
                required
                label="Country"
                :items="countries"
                class=""
              />
              <auto-complete
                required
                :rules="required"
                :items="states"
                v-model="state"
                label="State"
              />

              <cornie-select
                :items="dropdowns.physicalType"
                v-model="physicalType"
                required
                label="Physical Type"
                :rules="required"
              />
            </div>
            <span
              class="flex border-b-2 w-full font-semibold text-xl text-primary py-2 mt-4 mx-auto"
            >
              Position
            </span>
            <div class="w-full grid grid-cols-2 gap-5 mt-3">
              <cornie-input
                :readonly="true"
                :modelValue="longitude"
                label="Longitude"
              />
              <cornie-input
                :readonly="true"
                :modelValue="latitude"
                label="Latitude"
              />
              <cornie-input
                :readonly="true"
                v-model="altitude"
                label="Altitude"
              />
              <cornie-select
                :items="['0eb0c710-665a-449c-ab27-42014d25c676']"
                v-model="managingOrg"
                label="Managing Organization"
              />
              <cornie-select
                :items="['0eb0c710-665a-449c-ab27-42014d25c676']"
                v-model="partOf"
                label="Part Of"
              />
            </div>
            <span
              class="flex border-b-2 w-full font-semibold text-xl text-primary py-2 mt-4 mx-auto"
            >
              Hours Of Operation
            </span>
            <div class="mt-3 w-full">
              <operation-hours v-model="hoursOfOperation" />
            </div>
            <div class="w-full grid grid-cols-2 gap-5 mt-3">
              <cornie-select
                :rules="required"
                required
                v-model="availabilityExceptions"
                :items="['X-MAS', 'SALAH']"
                label="Availability Exceptions"
              />
              <cornie-input
                :rules="required"
                required
                v-model="openTo"
                label="Open To"
              />
              <cornie-select
                :rules="required"
                required
                v-model="careOptions"
                label="Care Options"
                :items="['dental', 'hospice']"
              />
            </div>
            <span class="flex w-full mb-2 justify-end">
              <button
                class="rounded-full font-semibold p-2 text-primary border border-primary w-1/4 mr-3"
                @click="$router.back()"
              >
                Cancel
              </button>
              <cornie-btn
                class="w-1/4 rounded-full font-semibold p-2 text-white border bg-danger"
                :loading="loading"
                type="submit"
              >
                Save
              </cornie-btn>
            </span>
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
import OperationHours from "@/components/new-operation-hours.vue";
import ILocation, { HoursOfOperation } from "@/types/ILocation";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";
import { getCoordinates } from "@/plugins/utils";
import { getCountries, getStates } from "@/plugins/nation-states";
import AutoComplete from "@/components/autocomplete.vue";

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
  },
})
export default class AddLocation extends Vue {
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
