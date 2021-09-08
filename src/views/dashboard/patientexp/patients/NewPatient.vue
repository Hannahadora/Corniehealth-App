<template>
  <div class="h-full w-full flex-grow" style="overflow: auto">
    <h1 class="text-primary text-lg capitalize font-extrabold mb-4">
      {{ title }}
    </h1>
    <cornie-card class="my-5 mr-4">
      <cornie-card-title>
        <h1 class="text-lg font-extrabold">Patient Information</h1>
        <cornie-spacer />
        <span v-if="viewOnly" class="cursor-pointer mr-2" @click="markEditable">
          Edit
        </span>
        <completed-icon v-if="!viewOnly && basicCompleted" class="mr-2" />
        <icon-btn @click="togglePatientInformation">
          <chevron-down-icon v-if="showPatientInformation" />
          <chevron-right-icon v-else />
        </icon-btn>
      </cornie-card-title>

      <!-- Patient Information -->
      <cornie-card-text :class="{ hidden: !showPatientInformation }">
        <v-form @submit="saveBasic" ref="basic">
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
            <cornie-avatar-field v-model="image" :readonly="viewOnly" />
            <custom-checkbox
              label="Mark as VIP"
              :readonly="viewOnly"
              v-model="vip"
            />
          </div>
          <div class="w-full mt-4 grid grid-cols-3 gap-5">
            <cornie-input
              class="w-full"
              label="First Name"
              placeholder="Enter"
              :rules="requiredRule"
              v-model="firstName"
              :readonly="viewOnly"
            />

            <cornie-input
              class="w-full"
              label="Middle Name"
              placeholder="Enter"
              v-model="middleName"
              :readonly="viewOnly"
            />

            <cornie-input
              class="w-full"
              label="Surname"
              placeholder="Enter"
              v-model="lastName"
              :rules="requiredRule"
              :readonly="viewOnly"
            />

            <date-picker
              class="w-full"
              label="Date of Birth"
              placeholder="Enter"
              :rules="dobRule"
              v-model="dateOfBirth"
              :readonly="viewOnly"
            />

            <cornie-select
              class="w-full"
              label="Multiple Birth"
              placeholder="Select One"
              :items="multipleBirthOptions"
              v-model="multipleBirth"
              :readonly="viewOnly"
            />
            <cornie-input
              class="w-full"
              placeholder="Enter"
              v-model="multipleBirthInteger"
              type="number"
              :rules="numericRule"
              :readonly="viewOnly"
            >
              <template #label> Multiple Birth Integer (1 - 10) </template>
            </cornie-input>
            <cornie-select
              class="w-full"
              label="Gender"
              :rules="requiredRule"
              placeholder="Select One"
              :items="genderOptions"
              v-model="gender"
              :readonly="viewOnly"
            />

            <cornie-select
              class="w-full"
              placeholder="Select One"
              :items="['Single', 'Divorced', 'Widowed', 'Married']"
              v-model="maritalStatus"
              :rules="requiredRule"
              :readonly="viewOnly"
            >
              <template #label> Marital status </template>
            </cornie-select>

            <cornie-input
              :readonly="viewOnly"
              class="w-full"
              placeholder="Enter"
              label="Identity No"
              v-model="idNumber"
              :rules="requiredRule"
            >
              <template #prepend class="-0">
                <cornie-menu class="cursor-pointer">
                  <template #activator="{ on }">
                    <div v-on="on" class="flex items-center">
                      <span class="mr-3"> {{ idType }}</span>
                      <chevron-down-icon />
                    </div>
                  </template>
                  <div
                    class="m-1 p-2"
                    :class="{ 'bg-gray-100': idOption == idType }"
                    v-for="(idOption, index) in idOptions"
                    :key="index"
                    @click="selectId(idOption)"
                  >
                    {{ idOption }}
                  </div>
                </cornie-menu>
              </template>
            </cornie-input>
          </div>
          <div class="flex justify-end m-5" v-if="!viewOnly">
            <cornie-btn
              loading-color="white"
              type="submit"
              :loading="loading"
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
        <span v-if="viewOnly" class="cursor-pointer mr-2" @click="markEditable">
          Edit
        </span>
        <completed-icon
          @completed="contactsCompleted = true"
          v-if="!viewOnly && contactsCompleted"
          class="mr-2"
        />

        <icon-btn @click="toggleContactInfo">
          <chevron-down-icon v-if="showContactInfo" />
          <chevron-right-icon v-else />
        </icon-btn>
      </cornie-card-title>
      <contact-info
        :patient="patient"
        v-model="contacts"
        :class="{ hidden: !showContactInfo }"
      />
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
            <cornie-card
              height="150px"
              @click="optionalItem.click"
              class="cursor-pointer hover:bg-gray-50"
            >
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
    <div class="flex justify-end" v-if="!viewOnly">
      <cornie-btn
        @click="$router.back()"
        class="text-primary border-2 border-primary m-5 mx-2 px-12"
      >
        Cancel
      </cornie-btn>
      <cornie-btn
        class="bg-danger text-white m-5 px-10"
        @click="submit"
        :loading="loading"
      >
        Register New
      </cornie-btn>
    </div>
    <emergency-contact-dialog
      :patient="patient"
      v-model="showEmergencyContactDialog"
    />
    <guarantor-dialog
      :patient="patient"
      v-model:guarantor="guarantor"
      v-model="showGuarantorDialog"
    />
    <insurance-dialog
      :patient="patient"
      v-model:insurances="insurances"
      v-model="showInsuranceDialog"
    />
    <providers-dialog
      :patient="patient"
      v-model:labs="labs"
      v-model:pharmacies="pharmacies"
      v-model="showProvidersDialog"
    />
    <demographics-dialog
      :patient="patient"
      v-model:demographics="demographics"
      v-model="showDemographicsDialog"
    />

    <practitioners-dialog
      :patient="patient"
      v-model="showPractitionersDialog"
      v-model:practitioners="practitioners"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import CornieCard from "@/components/cornie-card/index";
import CornieSpacer from "@/components/CornieSpacer.vue";
import ChevronRightIcon from "@/components/icons/chevronright.vue";
import ChevronDownIcon from "@/components/icons/chevrondownprimary.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import CornieAvatarField from "@/components/cornie-avatar-field/CornieAvatarField.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import CornieInput from "@/components/cornieinput.vue";
import DatePicker from "@/components/datepicker.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieMenu from "@/components/CornieMenu.vue";
import CornieBtn from "@/components/CornieBtn.vue";
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
import { Field } from "vee-validate";

import EmergencyContactDialog from "./dialogs/EmergencyContactDialog.vue";
import GuarantorDialog from "./dialogs/GuarantorDialog.vue";
import InsuranceDialog from "./dialogs/InsuranceDialog.vue";
import ProvidersDialog from "./dialogs/ProvidersDialog.vue";
import PractitionersDialog from "./dialogs/PractitionersDialog.vue";

import ContactInfo from "./contact-information.vue";
import { string, number, date, array } from "yup";
import { Prop, Ref } from "vue-property-decorator";
import { cornieClient } from "@/plugins/http";
import { Demographics, Guarantor, IPatient } from "@/types/IPatient";
import { namespace } from "vuex-class";
import DemographicsDialog from "./dialogs/DemographicsDialog.vue";

const patients = namespace("patients");

@Options({
  name: "new-patient",
  components: {
    ...CornieCard,
    CornieSpacer,
    ContactInfo,
    ChevronRightIcon,
    ChevronDownIcon,
    IconBtn,
    PractitionersDialog,
    CornieAvatarField,
    CustomCheckbox,
    CornieInput,
    Field,
    DatePicker,
    CornieSelect,
    CornieMenu,
    DemographicsDialog,
    CornieBtn,
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
    ProvidersDialog,
  },
})
export default class NewPatient extends Vue {
  showPatientInformation = true;
  showContactInfo = true;
  showOptionalInformation = false;
  idOptions = ["NIN", "BVN"];
  genderOptions = [
    { code: "male", display: "Male" },
    { code: "female", display: "Female" },
    { code: "other", display: "Other" },
  ];
  multipleBirthOptions = [
    { code: true, display: "Yes" },
    { code: false, display: "No" },
  ];

  @patients.Action
  fetchPatients!: () => Promise<void>;

  @patients.State
  patients!: IPatient[];

  loading = false;

  vip = false;
  multipleBirth = false;
  multipleBirthInteger = 0;
  gender = "";
  idType = "NIN";
  firstName = "";
  middleName = "";
  lastName = "";
  dateOfBirth = "";
  image = "";
  idNumber = "";

  contacts = [];
  emergencyContacts = [];
  guarantor!: Guarantor;
  insurances = [];
  labs = [];
  pharmacies = [];
  demographics!: Demographics;
  practitioners = [];

  maritalStatus = "";

  showEmergencyContactDialog = false;
  showGuarantorDialog = false;
  showInsuranceDialog = false;
  showProvidersDialog = false;
  showPractitionersDialog = false;
  showDemographicsDialog = false;

  contactsCompleted = false;

  requiredRule = string().required();
  numericRule = number();
  dobRule = date().max(
    new Date(),
    `Date must be on or before ${new Date().toLocaleDateString("en-NG")}`
  );

  requiredArray = array().min(1);

  @Prop({ type: String, default: "" })
  id!: string;

  patient!: IPatient;

  @patients.Mutation
  updatePatient!: (patient: IPatient) => void;

  @Ref("basic")
  basicInfo!: any;

  basicCompleted = false;

  get title() {
    if (this.viewOnly) return "View Patient";
    return this.patient ? "Edit Patient" : "New Patient";
  }

  get viewOnly() {
    return this.$route.path.includes("view");
  }

  markEditable() {
    this.$router.push(`/dashboard/provider/experience/edit-patient/${this.id}`);
  }

  get providerLength() {
    const labLen = this.patient?.preferredLabs?.length || this.labs.length;
    const pharmLen =
      this.patient?.preferredPharmacies?.length || this.pharmacies.length;
    return labLen + pharmLen;
  }
  get optionalItems() {
    return [
      {
        name: "Emergency Contact",
        icon: "emergency-icon",
        click: () => (this.showEmergencyContactDialog = true),
        number:
          this.patient?.emergencyContacts?.length ||
          this.emergencyContacts.length,
      },
      {
        name: "Add Guarantor",
        icon: "guarantor-icon",
        click: () => (this.showGuarantorDialog = true),
        number: this.patient?.guarantor ? 1 : this.guarantor ? 1 : 0,
      },
      {
        name: "Insurance",
        icon: "insurance-icon",
        click: () => (this.showInsuranceDialog = true),
        number: this.patient?.insurances?.length || this.insurances.length,
      },
      {
        name: "Providers",
        icon: "medicine-icon",
        click: () => (this.showProvidersDialog = true),
        number: this.providerLength,
      },
      {
        name: "General Practitioners",
        icon: "medical-team-icon",
        click: () => (this.showPractitionersDialog = true),
        number:
          this.patient?.generalPractitioners?.length ||
          this.practitioners.length,
      },
      {
        name: "Demographic Data",
        icon: "demographic-icon",
        click: () => (this.showDemographicsDialog = true),
        number: this.patient?.demographicsData ? 1 : this.demographics ? 1 : 0,
      },
    ];
  }

  togglePatientInformation() {
    this.showPatientInformation = !this.showPatientInformation;
  }

  toggleContactInfo() {
    this.showContactInfo = !this.showContactInfo;
  }

  toggleOptionalInformation() {
    this.showOptionalInformation = !this.showOptionalInformation;
  }

  async submit() {
    const report = await (this.$refs.basic as any).validate();
    if (!report.valid) return;
    this.loading = true;
    if (this.id) await this.updateData();
    else await this.registerPatient();
    this.loading = false;
  }

  get payload() {
    const basicInfo = {
      firstname: this.firstName,
      lastname: this.lastName,
      middlename: this.middleName,
      multipleBirth: this.multipleBirth,
      multipleBirthInteger: this.multipleBirthInteger,
      gender: this.gender.toLowerCase(),
      maritalStatus: this.maritalStatus,
      vip: this.vip,
      dateOfBirth: this.dateOfBirth,
      identityNos: [{ type: this.idType, number: this.idNumber }],
      profilePhoto: this.image,
      accountType: "individual",
    };
    if (this.id) {
      (basicInfo.identityNos[0] as any).patientId = this.id;
      (basicInfo.identityNos[0] as any).id = this.patient.identityNos!![0].id;
    }
    const others = {
      contactInfo: this.contacts,
      emergencyContacts: this.emergencyContacts,
      preferredLabs: this.labs,
      preferredPharmacies: this.pharmacies,
    };
    if (this.id) return basicInfo;
    return { ...basicInfo, ...others };
  }

  async registerPatient() {
    if (this.contacts.length < 1)
      return window.notify({
        msg: "At least one contact information is needed to proceed",
        status: "error",
      });
    try {
      const response = await cornieClient().post(
        "/api/v1/patient",
        this.payload
      );
      console.log("Response ", response.data);
    } catch (error) {
      window.notify({ msg: "Failed to add patient", status: "error" });
    }
    this.$router.back();
  }

  async updateData() {
    try {
      const response = await cornieClient().patch(
        `/api/v1/patient/${this.id}`,
        this.payload
      );
      const patient = response.data;
      this.updatePatient(patient);
      window.notify({ msg: "Patient Updated", status: "success" });
    } catch (e) {
      window.notify({ msg: "Failed to update patient", status: "error" });
    }
  }

  async saveBasic() {
    if (this.id) {
      this.loading = true;
      await this.updateData();
      this.loading = false;
    } else {
      this.showPatientInformation = false;
      this.basicCompleted = false;
    }
  }

  selectId(idOption: string) {
    this.idType = idOption;
  }

  hydrate() {
    const patient = this.patients.find((p) => p.id == this.id);
    if (!patient) return;
    this.patient = patient;
    this.firstName = patient.firstname;
    this.lastName = patient.lastname;
    this.middleName = patient.middlename || "";
    this.multipleBirth = patient.multipleBirths || false;
    this.multipleBirthInteger = patient.multipleBirthInteger || 0;
    this.gender = patient.gender || "";
    this.maritalStatus = patient.maritalStatus || "";
    this.vip = patient.vip || false;
    this.dateOfBirth = patient.dateOfBirth || "";
    const identityNos = patient.identityNos || [];
    const [identity, ...rest] = identityNos;
    if (identity) {
      this.idType = identity.type;
      this.idNumber = identity.number;
    }
    this.image = patient.profilePhoto || "";
  }

  async created() {
    if (!this.patients.length) await this.fetchPatients();
    if (this.id) this.hydrate();
  }
}
</script>
