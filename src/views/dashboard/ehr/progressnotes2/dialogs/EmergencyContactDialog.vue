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
          Emergency Contact
        </span>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <p class="text-sm mb-5">
          Fill the form below to add an emergency contact.
        </p>
        <v-form @submit="save" ref="form">
          <cornie-input
            label="First, Middle, Surname"
            class="mb-5"
            placeholder="David Alabi Smith"
            v-model="name"
          />
          <cornie-select
            label="Gender"
            class="mb-5"
            placeholder="Select One"
            :items="genderOptions"
            v-model="gender"
          />
          <cornie-select
            label="Relationship"
            class="mb-5"
            placeholder="Select One"
            :items="relationshipOptions"
            v-model="relationship"
          />
          <cornie-input
            label="Mailing Address"
            class="mb-5"
            placeholder="Enter"
            v-model="mailingAddress"
          />
          <cornie-input
            label="Country"
            class="mb-5"
            placeholder="Enter"
            v-model="country"
          />
          <cornie-input
            label="State"
            class="mb-5"
            placeholder="Enter"
            v-model="state"
          />
          <cornie-input
            label="City"
            class="mb-5"
            placeholder="Enter"
            v-model="city"
          />
          <cornie-input
            label="Suite or Apt No"
            class="mb-5"
            placeholder="Enter"
            v-model="aptNumber"
          />
          <cornie-input
            label="Post Code"
            class="mb-5"
            placeholder="Enter"
            v-model="postCode"
          />
          <cornie-phone-input
            label="Mobile Number 1"
            class="mb-5"
            placeholder="Enter"
            v-model="primaryPhone.number"
            v-model:code="primaryPhone.dialCode"
          />

          <cornie-phone-input
            label="Mobile Number 2"
            class="mb-5"
            placeholder="Enter"
            v-model="secondaryPhone.number"
            v-model:code="secondaryPhone.dialCode"
          />
          <cornie-input
            label="Email"
            class="mb-5"
            placeholder="Enter"
            v-model="email"
          />
          <cornie-input
            label="Organization"
            class="mb-5"
            placeholder="Enter"
            v-model="organization"
          />
          <div class="flex items-end">
            <period-picker
              label="Period (from - to)"
              class="mr-1"
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
            @click="save"
            :loading="loading"
            type="submit"
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
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieDatePicker from "@/components/datepicker.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import PeriodPicker from "@/components/daterangepicker.vue";
import { IPatient, RelatedPerson } from "@/types/IPatient";
import ObjectSet from "@/lib/objectset";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import Period from "@/types/IPeriod";

const patients = namespace("patients");

@Options({
  name: "emergency-contact-dialog",
  components: {
    ...CornieCard,
    PeriodPicker,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    CornieInput,
    CornieSelect,
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

  @Prop({ type: Array, default: [] })
  emergencyContacts!: RelatedPerson[];

  @PropSync("emergencyContacts")
  emergencyContactsSync!: RelatedPerson[];

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
  currentId = "";

  @patients.Action
  updatePatientField!: (data: {
    id: string;
    field: string;
    data: any[];
  }) => void;

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
      type: "emergency-contact",
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
    else this.batch();
    this.loading = false;
  }

  batch() {
    const contactSet = new ObjectSet(
      [...this.emergencyContactsSync, this.payload],
      "email"
    );
    this.emergencyContactsSync = [...contactSet];
  }

  async submit() {
    const action = this.currentId ? "Updated" : "Created";
    let result: any;
    try {
      if (this.currentId) result = await this.update();
      else result = await this.createNew();
      window.notify({
        msg: `Contact ${action} successfully`,
        status: "success",
      });
    } catch (error) {
      window.notify({ msg: `Contact not ${action}`, status: "error" });
    }
    if (result) this.updatePatient(result);
  }

  updatePatient(data: any) {
    this.updatePatientField({
      id: this.patient.id!!,
      field: "emergencyContacts",
      data: [data],
    });
  }

  async createNew() {
    const response = await cornieClient().post(
      "/api/v1/patient/emergency-contact",
      this.payload
    );
    return response.data;
  }
  async update() {
    const response = await cornieClient().put(
      `/api/v1/patient/emergency-contact/${this.currentId}`,
      this.payload
    );
    return response.data;
  }
  hydrate() {
    const emergencyContacts = this.patient.emergencyContacts;
    if (!emergencyContacts) return;
    const [contact, ..._] = emergencyContacts;
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
