<template>
  <div class="h-full mb-96 flex justify-center">
    <div class="w-full mx-5">
      <span
        class="flex border-b-2 w-full font-bold text-lg text-primary py-2 mx-auto"
      >
        {{ id ? "Update Location" : "New Location" }}
      </span>
      <span class="w-full">
        <div class="w-full h-screen">
          <accordion-component title="Location Details" :opened="true">
            <template v-slot:default>
              <div class="w-full">
                <div class="w-full mt-5 grid grid-cols-3 gap-4">
                  <!-- <cornie-input
                    disabled
                    :modelValue="identifier"
                    label="Location Identifier"
                    class="w-full"
                  /> -->
                  <cornie-input
                    :rules="required"
                    required
                    v-model="name"
                    label="Location Name"
                    class="w-full"
                    placeholder="--Enter--"
                  />
                  <cornie-select
                    :rules="required"
                    required
                    v-model="locationStatus"
                    :items="['active', 'inactive']"
                    label="Location Status"
                    class="w-full"
                    placeholder="--Select--"
                  />
                  <cornie-select
                    :rules="required"
                    required
                    :items="dropdowns.operationalStatus"
                    v-model="operationalStatus"
                    label="Operational status"
                    placeholder="--Select--"
                    class="w-full"
                  />
                  <cornie-input
                    :rules="required"
                    required
                    v-model="description"
                    label="Description"
                    placeholder="--Enter--"
                    class="w-full"
                  />
                  <cornie-input
                    v-model="alias"
                    label="Alias"
                    placeholder="--Enter--"
                    class="w-full"
                  />
                  <fhir-input
                    reference="http://hl7.org/fhir/ValueSet/v3-ServiceDeliveryLocationRoleType"
                    class="required w-full"
                    v-model="type"
                    label="Type"
                    placeholder="--Select--"
                  />
                  <phone-input
                    v-model:code="dialCode"
                    v-model="phoneNumber"
                    required
                    :rules="required"
                    label="Phone Number"
                    class="w-full"
                  />
                  <auto-complete
                    :rules="required"
                    v-model="country"
                    required
                    label="Country"
                    :items="countries"
                    class="w-full"
                  />
                  <auto-complete
                    required
                    :rules="required"
                    :items="states"
                    v-model="state"
                    label="State"
                    class="w-full"
                  />
                  <cornie-input
                    :rules="required"
                    v-model="city"
                    label="City"
                    required
                  />
                  <cornie-input
                    :rules="required"
                    v-model="address"
                    label="Address"
                    required
                  />
                  <!-- <cornie-select
                        :rules="required"
                        required
                        :items="dropdowns.type"
                        v-model="type"
                        label="Type"
                          placeholder="--Select--"
                          class="w-full"
                      /> -->

                  <!-- <cornie-input
                        :rules="requiredEmail"
                        required
                        v-model="email"
                        label="Email Address"
                      />
                      
                      
                      <cornie-select
                        :items="dropdowns.physicalType"
                        v-model="physicalType"
                        required
                        label="Physical Type"
                        :rules="required"
                      /> -->
                </div>
                <!-- <Textarea
                  :label="'Address'"
                  v-model="address"
                  :rows="1"
                  :cols="1"
                  class="w-full"
                  placeholder="Start typing..."
                /> -->
              </div>
            </template>
            <template v-slot:misc>
              <info-icon class="fill-current text-primary" />
            </template>
          </accordion-component>
          <!-- <accordion-component title="Position" :opened="false">
            <template v-slot:default>
              <div class="w-full grid grid-cols-3 gap-4 mt-3">
                <cornie-input
                  :readonly="true"
                  :modelValue="longitude"
                  label="Longitude"
                  class="w-full"
                  placeholder="--Enter--"
                  :disabled="true"
                />
                <cornie-input
                  :readonly="true"
                  :modelValue="latitude"
                  label="Latitude"
                  placeholder="--Enter--"
                  class="w-full"
                  :disabled="true"
                />
                <cornie-input
                  v-model="altitude"
                  label="Altitude"
                  placeholder="--Enter--"
                  class="w-full"
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
            </template>
            <template v-slot:misc>
              <info-icon class="fill-current text-primary" />
            </template>
          </accordion-component> -->
          <accordion-component title="Hours Of Operation" :opened="false">
            <template v-slot:default>
              <div class="grid grid-cols-12 gap-4">
                <div class="mt-3 w-full col-span-12">
                  <operation-hours v-model="hoursOfOperation" />
                </div>
                <div class="w-full mt-16 grid gap-10 grid-cols-3 col-span-12">
                  <cornie-select
                    :rules="required"
                    required
                    v-model="availabilityExceptions"
                    :items="['X-MAS', 'SALAH']"
                    label="Availability Exceptions"
                    placeholder="--Select--"
                    class="w-full"
                  />
                  <cornie-input
                    :rules="required"
                    required
                    v-model="openTo"
                    label="Open To"
                    placeholder="--Enter--"
                    class="w-full mb-3"
                  />
                  <cornie-select
                    :rules="required"
                    required
                    v-model="careOptions"
                    label="Care Channel"
                    :items="['Hospital/Clinic', 'Virtual', 'At Home']"
                    placeholder="--Select--"
                    class="w-full"
                  />
                </div>
              </div>
            </template>
            <template v-slot:misc>
              <info-icon class="fill-current text-primary" />
            </template>
          </accordion-component>

          <span class="flex w-full mb-5 mt-10 pb-10 justify-end">
            <cornie-btn
              @click="$router.back()"
              class="border-primary border-2 px-6 mr-3 rounded text-primary"
            >
              Cancel
            </cornie-btn>
            <cornie-btn
              :loading="loading"
              @click="submit"
              class="text-white bg-danger px-6 rounded"
            >
              Save
            </cornie-btn>
          </span>
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
import OperationHours from "@/components/location-operation-hours.vue";
import ILocation, { HoursOfOperation } from "@/types/ILocation";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";
import { getCoordinates } from "@/plugins/utils";
import { getCountries, getStates } from "@/plugins/nation-states";
import AutoComplete from "@/components/autocomplete.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import InfoIcon from "@/components/icons/info.vue";
import Textarea from "@/components/textarea.vue";
import FhirInput from "@/components/fhir-input.vue";
import IPhone from "@/types/IPhone";

const countries = getCountries();

const dropdown = namespace("dropdown");
const location = namespace("location");

@Options({
  components: {
    CornieInput,
    AutoComplete,
    CornieSelect,
    InfoIcon,
    PhoneInput,
    OperationHours,
    Textarea,
    FhirInput,
    AccordionComponent,
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
  phoneNumber = "";
  dialCode = "+234";
  email = "";
  address = "";
  country = "";
  state = "";
  city = "";
  physicalType = "";
  latitude = "";
  longitude = "";
  altitude = "";
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
    this.phoneNumber = location.phoneObject.number;
    this.dialCode = location.phoneObject.dialCode;
    this.email = location.email;
    this.address = location.address;
    this.country = location.country;
    this.state = location.state;
    this.city = location.city;
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
      phone: {
        number: this.phoneNumber,
        dialCode: this.dialCode,
      } as any as IPhone,
      email: this.email,
      address: this.address,
      country: this.country,
      state: this.state,
      city: this.city,
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
        this.$router.push("/dashboard/provider/settings/location");
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
      this.$router.push("/dashboard/provider/settings/location");
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
