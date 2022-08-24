<template>
  <cornie-dialog v-model="show" right class="w-2/5 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Add Member
          </h2>
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <div class="flex flex-col py-2 px-4 rounded">
          <patient-search v-model="selectedPatient" />
          <v-form
            ref="form"
            @submit="submit"
            class="w-full mt-4 grid grid-cols-1 gap-4"
          >
            <cornie-input
              class="w-full"
              label="First Name"
              :rules="requiredRule"
              v-model="firstName"
              :readonly="viewOnly"
            />
            <cornie-input
              class="w-full"
              label="Middle Name"
              v-model="middleName"
              :readonly="viewOnly"
            />
            <cornie-input
              class="w-full"
              label="Last Name"
              :rules="requiredRule"
              v-model="lastName"
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
              label="Relationshhip"
              placeholder="Select One"
              :items="relationships"
              :rules="requiredRule"
              v-model="relationship"
              :readonly="viewOnly"
            />
            <cornie-input
              class="w-full"
              label="Email Address"
              :rules="requiredRule"
              placeholder="Select One"
              v-model="email"
              :readonly="viewOnly"
            />
            <phone-input
              v-model="phone"
              v-model:code="dialCode"
              class="w-full"
              label="Mobile"
            />
            <cornie-select
              class="w-full"
              label="Member Role"
              placeholder="Select One"
              :items="['admin', 'member']"
              v-model="memberRole"
              :rules="requiredRule"
              :readonly="viewOnly"
            />
            <div class="flex items-center">
              <cornie-radio
                name="accountManager"
                value="admin"
                v-model="accountManager"
                label="This account will be managed from admin profile"
              />
              <info-icon class="ml-4 -mt-2" />
            </div>

            <div class="flex items-center">
              <cornie-radio
                name="accountManager"
                value="dependent"
                v-model="accountManager"
                label="This account will be exclusively managed by the dependant"
              />
              <info-icon class="ml-1 -mt-2" />
            </div>
          </v-form>
        </div>
      </cornie-card-text>

      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            @click="submit"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Ref, Watch } from "vue-property-decorator";

import { string, date } from "yup";
import PhoneInput from "@/components/phone-input.vue";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { cornieClient } from "@/plugins/http";
import IconInput from "@/components/IconInput.vue";
import { useHandleImage } from "@/composables/useHandleImage";

import CornieAvatarField from "@/components/cornie-avatar-field/CornieAvatarField.vue";
import CornieRadio from "@/components/cornieradio.vue";
import DatePicker from "@/components/datepicker.vue";
import PatientSearch from "./components/patient-search.vue";
import InfoIcon from "@/components/icons/info-blue-bg.vue";
import { IPatient } from "@/types/IPatient";
import { FormRef } from "@/types";

@Options({
  name: "MemberModal",
  components: {
    ...CornieCard,
    InfoIcon,
    PatientSearch,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    IconInput,
    CornieInput,
    CornieSelect,
    CornieBtn,
    CornieRadio,
    CornieAvatarField,
    DatePicker,
    PhoneInput,
  },
})
export default class MemberModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Ref("form")
  form!: FormRef;

  img = setup(() => useHandleImage());
  selectedPatient: IPatient | null = null;
  requiredRule = string().required();
  emailRule = string().email().required();
  firstName = "";
  middleName = "";
  lastName = "";
  dob = "";
  relationship = "";
  email = "";
  phone = "";
  dialCode = "+234";
  memberRole = "";
  accountManager = "admin";

  relationships = ["Spouse", "Child", "Parent", "Relative", "Other"];

  dobRule = date().max(
    new Date(),
    `Date must be on or before ${new Date().toLocaleDateString("en-NG")}`
  );

  @Watch("selectedPatient", { deep: true })
  patientPicked() {
    if (!this.selectedPatient?.id) return;
    this.firstName = this.selectedPatient.firstname;
    this.lastName = this.selectedPatient.lastname;
    this.email = (this.selectedPatient as any).email ?? "";
    this.middleName = this.selectedPatient.middlename ?? "";
    this.dob = this.selectedPatient.dateOfBirth ?? "";
  }

  get existingPatientPayload() {
    return {
      patientId: this.selectedPatient?.id,
      relationship: this.relationship,
      memberRole: this.memberRole,
      accountManager: this.accountManager,
    };
  }

  get newPatientPayload() {
    return {
      paymentAccounts: [],

      firstName: this.firstName,
      lastName: this.lastName,
      dob: this.dob,
      email: this.email,
      phone: this.phone,
      relationship: this.relationship,
      role: this.memberRole,
      accountManager: this.accountManager,
    };
  }

  get viewOnly() {
    return this.$route.path.includes("view");
  }

  async submit() {
    this.form.validate();
  }
}
</script>

<style>
.border-r-0 {
  border-right-width: 0px !important;
}
.border-l-0 {
  border-left-width: 0px !important;
}
</style>
