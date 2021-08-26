<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <span class="text-primary font-extrabold text-lg border-l-2 border-gray-100 pl-2">
          Add Guarantor
        </span>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <p class="text-sm mb-5">Fill the form below to add a guarantor.</p>
        <v-form>
          <cornie-input label="First, Middle, Surname" class="mb-5" placeholder="David Alabi Smith" v-model="name"/>
          <cornie-select label="Gender" class="mb-5" placeholder="Select One" :items="genderOptions" v-model="gender"/>
          <cornie-select label="Relationship" class="mb-5" placeholder="Select One" :items="relationshipOptions" v-model="relationship"/>
          <cornie-input label="Mailing Address" class="mb-5" placeholder="Enter" v-model="mailingAddress"/>
          <cornie-input label="Country" class="mb-5" placeholder="Enter" v-model="country"/>
          <cornie-input label="State" class="mb-5" placeholder="Enter" v-model="state"/>
          <cornie-input label="City" class="mb-5" placeholder="Enter" v-model="city"/>
          <cornie-input label="Suite or Apt No" class="mb-5" placeholder="Enter" v-model="aptNumber"/>
          <cornie-input label="Post Code" class="mb-5" placeholder="Enter" v-model="postcode"/>
          <cornie-phone-input label="Mobile Number 1" class="mb-5" placeholder="Enter" v-model="postcode"/>
          <cornie-phone-input label="Mobile Number 2" class="mb-5" placeholder="Enter" v-model="postcode"/>
          <cornie-input label="Email" class="mb-5" placeholder="Enter" v-model="postcode"/>
          <cornie-input label="Organization" class="mb-5" placeholder="Enter" v-model="postcode"/>
          <div class="flex items-end">
            <cornie-date-picker label="Period (from - to)" class="mr-1" v-model="fromDate"/>
            <cornie-date-picker label=" " v-model="toDate"/>
          </div>
        </v-form>
      </cornie-card-text>
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn class="border-primary border-2 px-6 mr-3 rounded-xl text-primary">
            Cancel
          </cornie-btn>
          <cornie-btn class="text-white bg-danger px-6 rounded-xl">
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { PropSync } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/NewCornieSelect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieDatePicker from "@/components/CornieDatePicker.vue";
import CornieBtn from "@/components/CornieBtn.vue";

@Options({
  name: "guarantor-dialog",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieDatePicker,
    CornieBtn
  },
})
export default class EmergencyDontactDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  name = "";
  gender = "";
  relationship = "";
  country = "";
  state = "";
  city = "";
  aptNumber = "";
  email = "";
  organization = "";
  postCode = "";
  fromDate = "";
  toDate = "";

  genderOptions = [ "Male", "Female" ];
  relationshipOptions = [];
}
</script>

<style>
</style>