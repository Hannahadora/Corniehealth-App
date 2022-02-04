<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <span
          class="text-primary font-extrabold text-lg border-l-2 border-gray-100 pl-2"
        >
          Add Guarantor
        </span>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <p class="text-sm mb-5">Fill the form below to add a guarantor.</p>
        <v-form ref="form" class="grid grid-cols-1 gap-y-4">
          <cornie-input
            label="First, Middle, Surname"
            class="w-full"
            placeholder="David Alabi Smith"
            v-model="name"
          />
          <cornie-select
            label="Gender"
            class="w-full"
            placeholder="Select One"
            :items="genderOptions"
            v-model="gender"
          />
          <cornie-select
            label="Relationship"
            class="w-full"
            placeholder="Enter"
            :items="relationshipOptions"
            v-model="relationship"
          />
          <cornie-input
            label="Mailing Address"
            class="w-full"
            placeholder="Enter"
            v-model="mailingAddress"
          />
          <auto-complete
            :items="countries"
            label="Country"
            class="w-full"
            placeholder="Enter"
            v-model="country"
          />
          <auto-complete
            label="State"
            class="w-full"
            placeholder="Enter"
            v-model="state"
            :items="states"
          />
          <cornie-input
            label="City"
            class="w-full"
            placeholder="Enter"
            v-model="city"
          />
          <cornie-input
            label="Suite or Apt No"
            class="w-full"
            placeholder="Enter"
            v-model="aptNumber"
          />
          <cornie-input
            label="Post Code"
            class="w-full"
            placeholder="Enter"
            v-model="postcode"
          />
          <span class="block w-full">
            <cornie-phone-input
              label="Mobile Number 1"
              class="w-full"
              placeholder="Enter"
              v-model:code="primaryPhone.dialCode"
              v-model="primaryPhone.number"
            />
          </span>
          <span class="block w-full">
            <cornie-phone-input
              label="Mobile Number 2"
              class="w-full"
              placeholder="Enter"
              v-model:code="secondaryPhone.dialCode"
              v-model="secondaryPhone.number"
            />
          </span>

          <cornie-input
            label="Email"
            class="w-full"
            placeholder="Enter"
            v-model="email"
          />
          <cornie-input
            label="Organization"
            class="w-full"
            placeholder="Enter"
            v-model="organization"
          />
          <div class="flex items-end w-full">
            <period-picker
              label="Period (from - to)"
              class="mr-1 w-full"
              v-model="period"
            />
          </div>
        </v-form>
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
            :loading="loading"
            @click="save"
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
import { Vue, Options } from "vue-class-component";
import { PropSync, Prop, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieDatePicker from "@/components/CornieDatePicker.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { Guarantor, IPatient, RelatedPerson } from "@/types/IPatient";
import Period from "@/types/IPeriod";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import PeriodPicker from "@/components/daterangepicker.vue";
import AutoComplete from "@/components/autocomplete.vue";
import { getCountries, getStates } from "@/plugins/nation-states";
const countries = getCountries();

const patients = namespace("patients");

@Options({
  name: "guarantor-dialog",
  components: {
    ...CornieCard,
    CornieIconBtn,
    AutoComplete,
    ArrowLeftIcon,
    CornieDialog,
    CornieInput,
    CornieSelect,
    PeriodPicker,
    CorniePhoneInput,
    CornieDatePicker,
    CornieBtn,
  },
})
export default class EmergencyDontactDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Object })
  patient!: IPatient;

  @Prop({ type: Object })
  guarantor!: RelatedPerson;

  @PropSync("guarantor")
  guarantorSync!: RelatedPerson;

  currentId = "";

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

  period: Period = { start: "", end: "" };
  mailingAddress = "";
  primaryPhone = { number: "", dialCode: "+234" };
  secondaryPhone = { number: "", dialCode: "+234" };
  genderOptions = [
    { code: "male", display: "Male" },
    { code: "female", display: "Female" },
    { code: "other", display: "Other" },
  ];

  states = [] as any;
  countries = countries;

  @Watch("country")
  async countryPicked(country: string) {
    const states = await getStates(country);
    this.states = states;
  }

  relationshipOptions = [
    "Father",
    "Mother",
    "Sibling",
    "Grand Father",
    "Grand Mother",
    "Uncle",
    "Aunt",
  ];

  loading = false;

  @patients.Mutation
  updatePatient!: (patient: IPatient) => void;

  get payload() {
    let [firstname, middlename, lastname] = this.name.split(" ");
    if (!lastname) lastname = middlename;
    const payload = {
      firstname,
      lastname,
      middlename,
      gender: this.gender,
      relationship: this.relationship,
      country: this.country,
      state: this.state,
      city: this.city,
      aptNumber: this.aptNumber,
      email: this.email,
      organization: this.organization,
      postalCode: this.postCode,
      period: this.period,
      primaryPhone: this.primaryPhone,
      secondaryPhone: this.secondaryPhone,
      mailingAddress: this.mailingAddress,
      type: "guarantor",
    } as RelatedPerson;
    if (this.patient?.id) payload.patientId = this.patient.id;
    if (this.currentId) payload.id = this.currentId;
    return payload;
  }

  async save() {
    const report = await (this.$refs.form as any).validate();
    if (!report.valid) return;
    this.loading = true;
    if (this.patient) await this.submit();
    else this.guarantorSync = this.payload;
    this.loading = false;
  }

  async submit() {
    const action = this.currentId ? "Updated" : "Created";
    let result: any;
    try {
      if (this.currentId) result = await this.update();
      else result = await this.createNew();
      window.notify({
        msg: `Guarantor ${action} successfully`,
        status: "success",
      });
    } catch (error) {
      window.notify({ msg: `Guarantor not ${action}`, status: "error" });
    }
    if (result) this.updateStore(result);
  }

  updateStore(guarantor: Guarantor) {
    this.updatePatient({ ...this.patient, guarantor });
  }

  async createNew() {
    const response = await cornieClient().post(
      "/api/v1/patient/guarantor",
      this.payload
    );
    return response.data;
  }
  async update() {
    const response = await cornieClient().put(
      `/api/v1/patient/guarantor/${this.currentId}`,
      this.payload
    );
    return response.data;
  }

  hydrate() {
    const guarantor = this.patient.guarantor;
    if (!guarantor) return;
    const contact = guarantor;
    if (!contact) return;
    this.currentId = contact.id || "";
    this.name = `${contact.firstname} ${contact.middlename || ""} ${
      contact.lastname
    }`;
    this.city = contact.city || "";
    this.aptNumber = contact.aptNumber || "";
    this.postCode = contact.postalCode || "";
    this.primaryPhone = { ...contact.primaryPhone };
    this.secondaryPhone = {
      ...(contact.secondaryPhone || this.secondaryPhone),
    };
    this.email = contact.email || "";
    this.organization = contact.organization || "";
    this.relationship = contact.relationship || "";
    this.period = contact.period || this.period;
  }

  @Watch("patient")
  patientChanged() {
    if (this.patient?.id) this.hydrate();
  }

  created() {
    if (this.patient?.id) this.hydrate();
  }
}
</script>

<style></style>
