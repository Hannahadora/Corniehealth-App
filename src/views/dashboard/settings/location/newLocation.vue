<template>
  <div class="w-full mx-5">
    <span
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
      Add a New Location
    </span>
    <form class="mt-5 w-full" @submit.prevent="submit">
      <span class="grid grid-cols-2">
        <d-input v-model="name" label="Location Name" />
        <d-select v-model="id" label="Location Identifier" disabled />
      </span>
      <span class="grid grid-cols-2">
        <d-select
          v-model="locationStatus"
          :items="['active', 'inactive']"
          label="Location Status"
        />
        <d-select
          v-model="operationalStatus"
          label="Operational Status"
          disabled
        />
      </span>
      <span class="grid grid-cols-2">
        <d-input v-model="description" label="Description" />
        <d-input v-model="alias" label="Alias" />
      </span>
      <span class="grid grid-cols-2">
        <d-select v-model="mode" label="Mode" />
        <d-select v-model="type" label="Type" />
      </span>
      <span class="grid grid-cols-2">
        <div class="block w-11/12">
          <phone-input
            v-model:code="dialCode"
            v-model="phone"
            required
            label="Phone"
          />
        </div>
        <d-input v-model="email" required label="Email" />
      </span>
      <span class="grid grid-cols-2">
        <d-input v-model="address" label="Address" />
        <d-select v-model="physicalType" label="Physical Type" />
      </span>
      <span
        class="
          flex
          border-b-2
          w-full
          font-semibold
          text-xl text-black
          py-2
          mt-4
          mx-auto
        "
      >
        Position
      </span>
      <span class="grid grid-cols-2">
        <d-input v-model="longitude" label="Longitude" />
        <d-input v-model="latitude" label="Latitude" />
      </span>
      <span class="grid grid-cols-2">
        <d-input v-model="altitude" label="Altitude" />
        <d-select v-model="managingOrg" label="Managing Organization" />
      </span>
      <span class="grid grid-cols-2">
        <d-select v-model="partOf" label="Part Of" />
      </span>
      <span
        class="
          flex
          border-b-2
          w-full
          font-semibold
          text-xl text-black
          py-2
          mt-4
          mx-auto
        "
      >
        Hours Of Operation
      </span>
      <span class="flex w-full mt-4 mb-2 justify-end">
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
          Revert Changes
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
          type="submit"
        >
          Add Location
        </button>
      </span>
    </form>
  </div>
</template>
<script>
import DInput from "@/components/cornieinput.vue";
import DSelect from "@/components/cornieselect.vue";
import PhoneInput from "@/components/phone-input.vue";

import { cornieClient } from "@/plugins/http";

export default {
  components: {
    DInput,
    DSelect,
    PhoneInput,
  },
  data() {
    return {
      name: "",
      id: "",
      locationStatus: "",
      operationalStatus: "",
      description: "",
      alias: "",
      mode: "",
      type: "",
      phone: "",
      email: "",
      address: "",
      physicalType: "",
      longitude: "",
      latitude: "",
      altitude: "",
      managingOrg: "",
      partOf: "",
    };
  },
  computed: {
    payload() {
      return {
        name: this.name,
        locationStatus: this.locationStatus,
        operationalStatus: this.operationalStatus,
        description: this.desription,
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
      };
    },
  },
  async created() {
    try {
      await this.fetchDropDown();
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    async submit() {
      try {
        console.log(this.payload);
        const response = await cornieClient.post(
          "api/v1/location",
          this.payload
        );
        if (response.success) {
          alert("Location Added Successfully");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style>
input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  height: auto;
  color: transparent;
  background: transparent;
}
</style>
