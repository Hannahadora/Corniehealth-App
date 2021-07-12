<template>
  <div class="w-full h-screen">
    <v-form class="mt-5 w-full" @submit="submit">
      <div class="w-full grid grid-cols-2 gap-5">
        <cornie-input :rules="required" v-model="name" label="Location Name" />
        <cornie-input
          :rules="required"
          :modelValue="id"
          label="Location Identifier"
        />
        <cornie-input
          :rules="required"
          v-model="locationStatus"
          label="Location Status"
        />
        <cornie-select
          :rules="required"
          :items="dropdowns.operationalStatus"
          v-model="operationalStatus"
          label="Operational status"
        />
        <cornie-input
          :rules="required"
          v-model="description"
          label="Description"
        />
        <cornie-input :rules="required" v-model="alias" label="Alias" />
        <cornie-select
          :rules="required"
          :items="dropdowns.mode"
          v-model="mode"
          label="Mode"
        />
        <cornie-select
          :rules="required"
          :items="dropdowns.type"
          v-model="type"
          label="Type"
        />
        <phone-input :rules="required" label="Phone Number" />
        <cornie-input :rules="required" v-model="email" label="Email Address" />
        <cornie-input :rules="required" v-model="address" label="Address" />
        <cornie-input
          :rules="required"
          v-model="country"
          label="Country"
          class=""
        />
        <cornie-select
          :items="dropdowns.physicalType"
          v-model="physicalType"
          label="Physical Type"
          :rules="required"
        />
      </div>
      <span
        class="
          flex
          border-b-2
          w-full
          font-semibold
          text-xl text-primary
          py-2
          mt-4
          mx-auto
        "
      >
        Position
      </span>
      <div class="w-full grid grid-cols-2 gap-5 mt-3">
        <cornie-input v-model="longitude" label="Longitude" />
        <cornie-input v-model="latitude" label="Latitude" />
        <cornie-input v-model="altitude" label="Altitude" />
        <cornie-select v-model="managingOrg" label="Managing Organization" />
        <cornie-select v-model="partOf" label="Part Of" />
      </div>
      <span
        class="
          flex
          border-b-2
          w-full
          font-semibold
          text-xl text-primary
          py-2
          mt-4
          mx-auto
        "
      >
        Hours Of Operation
      </span>
      <div class="mt-3 w-full">
        <operation-hours v-model="hoursOfOperation" />
      </div>
      <div class="w-full grid grid-cols-2 gap-5 mt-3">
        <cornie-select
          v-model="availabilityExceptions"
          label="Availability Exceptions"
        />
        <cornie-select v-model="openTo" label="Open To" />
        <cornie-select v-model="careOptions" label="Care Options" />
      </div>
      <span class="flex w-full mb-2 justify-end">
        <button
          class="
            rounded-full
            font-semibold
            p-2
            text-primary
            border border-primary
            w-1/4
            mr-3
          "
        >
          Cancel
        </button>
        <button
          class="
            w-1/4
            rounded-full
            font-semibold
            p-2
            text-white
            border
            bg-danger
          "
          :loading="loading"
          type="submit"
        >
          Save
        </button>
      </span>
    </v-form>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import PhoneInput from "@/components/phone-input.vue";
import OperationHours from "@/components/operation-hours.vue";
import { HoursOfOperation } from "@/types/ILocation";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";

const dropdown = namespace("dropdown");

@Options({
  components: {
    CornieInput,
    CornieSelect,
    PhoneInput,
    OperationHours,
  },
})
export default class AddLocation extends Vue {
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
  altitude = "";
  managingOrg = "";
  partOf = "";
  availabilityExceptions = "";
  careOptions = "";
  openTo = "";
  id = "";
  hoursOfOperation: HoursOfOperation[] = [];

  dropdowns = {} as IIndexableObject;

  required = string().required();
  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

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
  async submit(data: any) {
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
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateLocation() {
    const url = `/api/v1/location/${this.id}`;
    const payload = { ...this.payload, id: this.id };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async created() {
    const data = await this.getDropdowns("location");
    this.dropdowns = data;
  }
}
</script>
