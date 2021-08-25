<template>
  <div class="h-full w-full flex-grow" style="overflow: auto">
    <h1 class="text-primary text-lg capitalize font-extrabold mb-4">
      New Patient
    </h1>
    <cornie-card class="my-5 mr-4">
      <cornie-card-title>
        <h1 class="text-lg font-extrabold">Patient Information</h1>
        <cornie-spacer />
        <completed-icon class="mr-2" />
        <icon-btn @click="togglePatientInformation">
          <chevron-down-icon v-if="showPatientInformation" />
          <chevron-right-icon v-else />
        </icon-btn>
      </cornie-card-title>

      <!-- Patient Information -->
      <cornie-card-text v-if="showPatientInformation" class="">
        <v-form @submit="register">
          <div
            class="
              flex
              justify-between
              items-center
              px-4
              border-t-2 border-gray
              pt-5
            "
          >
            <cornie-avatar-field v-model="image" />
            <custom-checkbox label="Mark as VIP" v-model="vip"/>
          </div>
          <div class="flex w-full mt-10">
            <div class="w-4/12 px-4">
              <cornie-input
                class="w-full"
                label="First Name"
                placeholder="Enter"
                v-model="firstName"
              />
            </div>
            <div class="w-4/12 px-4">
              <cornie-input
                class="w-full"
                label="Middle Name"
                placeholder="Enter"
                v-model="lastName"
              />
            </div>
            <div class="w-4/12 px-4">
              <cornie-input
                class="w-full"
                label="Surname"
                placeholder="Enter"
                v-model="surname"
              />
            </div>
          </div>
          <div class="flex w-full mt-10">
            <div class="w-4/12 px-4">
              <cornie-date-picker
                class="w-full"
                label="Date of Birth"
                placeholder="Enter"
                v-model="dateOfBirth"
              />
            </div>
            <div class="w-4/12 px-4">
              <cornie-select
                class="w-full"
                label="Multiple Birth"
                placeholder="Select One"
                :items="multipleBirthOptions"
                v-model="multipleBirth"
              />
            </div>
            <div class="w-4/12 px-4">
              <cornie-input class="w-full" placeholder="Enter">
                <template #label> Multiple Birth Integer (1 - 10) </template>
              </cornie-input>
            </div>
          </div>
          <div class="flex w-full mt-10">
            <div class="w-4/12 px-4">
              <cornie-select
                class="w-full"
                label="Gender"
                placeholder="Select One"
                :items="genderOptions"
                v-model="gender"
              />
            </div>
            <div class="w-4/12 px-4">
              <cornie-select
                class="w-full"
                placeholder="Select One"
                :items="multipleBirthOptions"
                v-model="multipleBirth"
              >
                <template #label> Marital status </template>
              </cornie-select>
            </div>
            <div class="w-4/12 px-4">
              <cornie-input
                class="w-full"
                placeholder="Enter"
                label="Identity No"
                v-model="idNumber"
              >
                <template #prepend class="-0">
                  <cornie-menu>
                    <template #activator="{ on }">
                      <div v-on="on" class="flex items-center">
                        <span class="mr-3"> {{ idType }}</span>
                        <chevron-down-icon />
                      </div>
                    </template>
                    <cornie-card>
                      <div
                        class="m-1 p-2"
                        :class="{ 'bg-gray-100': idOption == idType }"
                        v-for="(idOption, index) in idOptions"
                        :key="index"
                        @click="selectId(idOption)"
                      >
                        {{ idOption }}
                      </div>
                    </cornie-card>
                  </cornie-menu>
                </template>
              </cornie-input>
            </div>
          </div>
          <div class="flex justify-end m-5">
            <cornie-btn
              loading-color="white"
              type="submit"
              class="bg-success text-white px-10 py-1"
            >
              Save
            </cornie-btn>
          </div>
        </v-form>
      </cornie-card-text>
    </cornie-card>

    <cornie-card class="my-5 mr-4">
      <cornie-card-title>
        <h1 class="text-lg font-extrabold">Contact Info</h1>
        <cornie-spacer />
        <completed-icon class="mr-2" />
        <icon-btn @click="toggleContactInfo">
          <chevron-down-icon v-if="showContactInfo" />
          <chevron-right-icon v-else />
        </icon-btn>
      </cornie-card-title>
      <cornie-card-text v-if="showContactInfo" class="">
        <v-form>
          <div
            class="
              flex
              justify-start
              items-center
              px-4
              border-t-2 border-gray
              pt-5
            "
          >
            <cornie-radio
              label="Work"
              class="mr-3"
              v-model="contactType"
              value="work"
              checked
            />
            <cornie-radio label="Home" v-model="contactType" value="home" />
          </div>
          <div class="flex w-full mt-10">
            <div class="w-4/12 px-4">
              <cornie-input
                class="w-full"
                label="Address 1"
                placeholder="Enter"
              />
            </div>
            <div class="w-4/12 px-4">
              <cornie-input
                class="w-full"
                label="Address 2"
                placeholder="Enter"
              />
            </div>
            <div class="w-4/12 px-4">
              <cornie-input
                class="w-full"
                label="Country"
                placeholder="Enter"
              />
            </div>
          </div>
          <div class="flex w-full mt-10">
            <div class="w-4/12 px-4">
              <cornie-input class="w-full" label="State" placeholder="Enter" />
            </div>
            <div class="w-4/12 px-4">
              <cornie-input
                class="w-full"
                label="Post Code"
                placeholder="Enter"
              />
            </div>
            <div class="w-4/12 px-4">
              <cornie-input class="w-full" label="City" placeholder="Enter" />
            </div>
          </div>
          <div class="flex w-full mt-10">
            <div class="w-4/12 px-4">
              <phone-input label="Phone" />
            </div>
            <div class="w-4/12 px-4">
              <cornie-input class="w-full" label="Email" placeholder="Enter" />
            </div>
          </div>
          <div class="flex justify-end m-5">
            <cornie-btn
              loading-color="white"
              type="submit"
              class="bg-success text-white px-10 py-1"
            >
              Save
            </cornie-btn>
          </div>
          <div class="text-danger ml-2" @click="addContactInfo">
            Add Another
          </div>
        </v-form>
      </cornie-card-text>
    </cornie-card>

    <cornie-card class="my-5 mr-4">
      <cornie-card-title>
        <h1 class="text-lg font-extrabold">Optional Information</h1>
        <span class="text-xs text-primary ml-2">
          (This section is optional and can be added if desired)
        </span>
        <cornie-spacer />
        <icon-btn @click="toggleOptionalInformation">
          <chevron-down-icon v-if="showOptionalInformation" />
          <chevron-right-icon v-else />
        </icon-btn>
      </cornie-card-title>
      <cornie-card-text v-if="showOptionalInformation">
        <div class="flex flex-wrap">
          <div
            class="w-4/12 py-3 px-6"
            v-for="(optionalItem, index) in optionalItems"
            :key="index"
          >
            <cornie-card height="150px" @click="optionalItem.click" class="cursor-pointer hover:bg-gray-50">
              <cornie-card-text class="h-full">
                <div class="flex h-full items-center">
                  <component :is="optionalItem.icon" class="mx-4" />
                  <div>
                    <p class="font-extrabold text-lg text-primary">
                      {{ optionalItem.name }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ optionalItem.number }} Added
                    </p>
                  </div>
                </div>
              </cornie-card-text>
            </cornie-card>
          </div>
        </div>
        <div class="flex justify-end m-5">
          <cornie-btn
            loading-color="white"
            type="submit"
            class="bg-success text-white px-10 py-1"
          >
            Save
          </cornie-btn>
        </div>
      </cornie-card-text>
    </cornie-card>
    <div class="flex justify-end">
      <cornie-btn
        class="text-primary border-2 border-primary m-5 mx-2 px-12"
      >
        Cancel
      </cornie-btn>
      <cornie-btn class="bg-danger text-white m-5 px-10" @click="registerPatient">
        Register New
      </cornie-btn>
    </div>
    <emergency-contact-dialog v-model="showEmergencyContactDialog" />
    <guarantor-dialog v-model="showGuarantorDialog" />
    <insurance-dialog v-model="showInsuranceDialog" />
    <providers-dialog v-model="showProvidersDialog" />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Ref } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card/index";
import CornieSpacer from "@/components/CornieSpacer.vue";
import ChevronRightIcon from "@/components/icons/chevronright.vue";
import ChevronDownIcon from "@/components/icons/chevrondownprimary.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import CornieAvatarField from "@/components/cornie-avatar-field/CornieAvatarField.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieDatePicker from "@/components/CornieDatePicker.vue";
import CornieSelect from "@/components/NewCornieSelect.vue";
import CornieMenu from "@/components/CornieMenu.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieRadio from "@/components/cornieradio.vue";
import PhoneInput from "@/components/phone-input.vue";
import CompletedIcon from "@/components/icons/CompletedIcon.vue";
import EmergencyIcon from "@/components/icons/EmergencyIcon.vue";
import AddIcon from "@/components/icons/add.vue";
import InsuranceIcon from "@/components/icons/InsuranceIcon.vue";
import MedicineIcon from "@/components/icons/MedicineIcon.vue";
import ScienceIcon from "@/components/icons/ScienceIcon.vue";
import MedicalTeamIcon from "@/components/icons/MedicalTeamIcon.vue";
import UrlIcon from "@/components/icons/UrlIcon.vue";
import GuarantorIcon from "@/components/icons/GuarantorIcon.vue";
import DemographicIcon from "@/components/icons/DemographicIcon.vue";

import EmergencyContactDialog from "./dialogs/EmergencyContactDialog.vue";
import GuarantorDialog from "./dialogs/GuarantorDialog.vue";
import InsuranceDialog from "./dialogs/InsuranceDialog.vue";
import ProvidersDialog from "./dialogs/ProvidersDialog.vue";

@Options({
  name: "new-patient",
  components: {
    ...CornieCard,
    CornieSpacer,
    ChevronRightIcon,
    ChevronDownIcon,
    IconBtn,
    CornieAvatarField,
    CustomCheckbox,
    CornieInput,
    CornieDatePicker,
    CornieSelect,
    CornieMenu,
    CornieBtn,
    CornieRadio,
    PhoneInput,
    CompletedIcon,
    EmergencyIcon,
    AddIcon,
    InsuranceIcon,
    MedicineIcon,
    ScienceIcon,
    MedicalTeamIcon,
    UrlIcon,
    GuarantorIcon,
    DemographicIcon,

    EmergencyContactDialog,
    GuarantorDialog,
    InsuranceDialog,
    ProvidersDialog
  },
})
export default class NewPatient extends Vue {
  showPatientInformation = true;
  showContactInfo = true;
  showOptionalInformation = false;
  idOptions = ["NIN", "MRN"];
  genderOptions = ["Male", "Female"];
  multipleBirthOptions = [];

  multipleBirth = "";
  gender = "";
  idType = "NIN";
  firstName = "";
  lastName = "";
  surname = "";
  dateOfBirth = "";
  image = "";

  showEmergencyContactDialog = false;
  showGuarantorDialog = false;
  showInsuranceDialog = false;
  showProvidersDialog = false;

  optionalItems = [
    {
      name: "Emergency Contact",
      icon: "emergency-icon",
      click: () => this.showEmergencyContactDialog = true,
      number: 0,
    },
    {
      name: "Add Guarantor",
      icon: "guarantor-icon",
      click: () => this.showGuarantorDialog = true,
      number: 0,
    },
    {
      name: "Insurance",
      icon: "insurance-icon",
      click: () => this.showInsuranceDialog = true,
      number: 0,
    },
    {
      name: "Providers",
      icon: "medicine-icon",
      click: () => this.showProvidersDialog = true,
      number: 0,
    },
    {
      name: "General Practitioners",
      icon: "medical-team-icon",
      click: () => null,
      number: 0,
    },
    {
      name: "Demographic Data",
      icon: "demographic-icon",
      click: () => null,
      number: 0,
    },
    {
      name: "Links",
      icon: "url-icon",
      click: () => null,
      number: 0,
    },
  ];

  contactType = "work";

  @Ref()
  patientsRegistrationForm!: HTMLFormElement

  togglePatientInformation() {
    this.showPatientInformation = !this.showPatientInformation;
  }

  toggleContactInfo() {
    this.showContactInfo = !this.showContactInfo;
  }

  toggleOptionalInformation() {
    this.showOptionalInformation = !this.showOptionalInformation;
  }

  addContactInfo() {}

  register(event: Event) {
    event.preventDefault();
    if(this.patientsRegistrationForm.validate()) {

    }
  }

  selectId(idOption: string) {
    this.idType = idOption;
  }
}
</script>

<style>
</style>