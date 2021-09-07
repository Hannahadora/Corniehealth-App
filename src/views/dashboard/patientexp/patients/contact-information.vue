<template>
  <cornie-card-text>
    <v-form @submit="save" ref="contact">
      <div
        class="flex justify-start items-center px-4 border-t-2 border-gray pt-5"
      >
        <cornie-radio
          label="Work"
          v-model="type"
          value="work"
          checked
          :readonly="readonly"
        />
        <span class="flex items-center ml-2">
          <cornie-radio
            label="Home"
            v-model="type"
            value="home"
            :readonly="readonly"
          />
        </span>
      </div>
      <div class="w-full grid grid-cols-3 gap-5 mt-4">
        <cornie-input
          class="w-full"
          v-model="primaryAddress"
          label="Address 1"
          placeholder="Enter"
          :rules="requiredString"
          :readonly="readonly"
        />
        <auto-complete
          class="w-full"
          v-model="country"
          label="Country"
          placeholder="Enter"
          :rules="requiredString"
          :readonly="readonly"
          :items="countries"
        />
        <cornie-input
          class="w-full"
          v-model="state"
          label="State"
          placeholder="Enter"
          :rules="requiredString"
          :readonly="readonly"
        />
        <cornie-input
          class="w-full"
          v-model="postCode"
          label="Post Code"
          placeholder="Enter"
          :rules="requiredString"
          :readonly="readonly"
        />
        <cornie-input
          class="w-full"
          v-model="city"
          label="City"
          placeholder="Enter"
          :rules="requiredString"
          :readonly="readonly"
        />
        <phone-input
          label="Phone"
          v-model:code="dialCode"
          v-model="phoneNumber"
          :rules="requiredString"
          :readonly="readonly"
        />
        <cornie-input
          class="w-full"
          v-model="email"
          label="Email"
          :rules="requiredEmail"
          placeholder="Enter"
          :readonly="readonly"
        />
      </div>
      <div class="flex justify-end m-5" v-if="!readonly">
        <cornie-btn
          loading-color="white"
          type="submit"
          :loading="loading"
          class="bg-success text-white px-10 py-1"
        >
          Save
        </cornie-btn>
      </div>
      <div
        class="text-danger ml-2 cursor-pointer"
        @click="addAnother"
        v-if="!readonly"
      >
        Add Another
      </div>
    </v-form>
  </cornie-card-text>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieCardText from "@/components/cornie-card/CornieCardText.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { Contact, IPatient } from "@/types/IPatient";
import CornieRadio from "@/components/cornieradio.vue";
import PhoneInput from "@/components/phone-input.vue";
import CornieInput from "@/components/cornieinput.vue";
import ObjectSet from "@/lib/objectset";
import CornieBtn from "@/components/CornieBtn.vue";
import AutoComplete from "@/components/autocomplete.vue";

import { string } from "yup";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import { getCountries } from "@/plugins/nation-states";

const patients = namespace("patients");

const countries = getCountries();
@Options({
  name: "PatientContact",
  components: {
    CornieCardText,
    CornieRadio,
    PhoneInput,
    CornieInput,
    AutoComplete,
    CornieBtn,
  },
})
export default class PatientContact extends Vue {
  @Prop({ type: Array, default: [] })
  modelValue!: Contact[];

  @PropSync("modelValue", { type: Array, default: [] })
  contactsSync!: Contact[];

  @Prop({ type: Object })
  patient!: IPatient;

  type = "";

  primaryAddress = "";
  secondaryAddress = "";
  country = "";
  state = "";
  postCode = "";
  city = "";
  phoneNumber = "";
  dialCode = "+234";
  email = "";
  contactId = "";

  countries = countries;
  loading = false;
  requiredString = string().required();
  requiredEmail = string().email().required();

  get readonly() {
    return this.$route.path.includes("view");
  }

  @patients.Action
  updatePatientField!: (data: {
    id: string;
    field: string;
    data: any[];
  }) => void;

  @patients.Mutation
  addPatients!: (patients: IPatient) => void;

  get contacts() {
    const patientContacts = this.patient.contactInfo || [];
    if (patientContacts.length < 1) return this.contactsSync;
    return patientContacts;
  }

  get payload() {
    const payload = {
      primaryAddress: this.primaryAddress,
      secondaryAddress: this.secondaryAddress,
      country: this.country,
      state: this.state,
      postalCode: this.postCode,
      city: this.city,
      phone: { number: this.phoneNumber, dialCode: this.dialCode },
      email: this.email,
      type: this.type,
    } as Contact;
    if (this.patient) payload.patientId = this.patient.id!!;
    if (this.contactId) payload.id = this.contactId;
    return payload;
  }

  reset() {
    this.primaryAddress = "";
    this.secondaryAddress = "";
    this.country = "";
    this.state = "";
    this.postCode = "";
    this.city = "";
    this.phoneNumber = "";
    this.dialCode = "+234";
    this.email = "";
    this.type = "work";
    this.contactId = "";
  }

  async addAnother() {
    const report = await (this.$refs.contact as any).validate();
    if (!report.valid) return;
    this.pushContact();
    this.reset();
  }

  pushContact() {
    const currentContact = this.payload;
    const contactSet = new ObjectSet(
      [...this.contactsSync, currentContact],
      "email"
    );
    this.contactsSync = [...contactSet];
  }

  async save() {
    this.loading = true;
    if (this.patient) await this.submit();
    else this.addToBatch();
    this.loading = false;
  }

  addToBatch() {
    this.pushContact();
    window.notify({ msg: "Contact Updated", status: "success" });
  }

  async submit() {
    const action = this.contactId ? "Updated" : "Created";
    try {
      if (this.contactId) await this.updateContact();
      else await this.createContact();
      window.notify({
        msg: `Contact ${action} successfully`,
        status: "success",
      });
    } catch (error) {
      window.notify({ msg: `Contact not ${action}`, status: "error" });
    }
  }

  async createContact() {
    const response = await cornieClient().post(
      "/api/v1/patient/contact",
      this.payload
    );
    const contact = response.data;
    this.updatePatient(contact);
  }

  updatePatient(data: any) {
    this.updatePatientField({
      id: this.patient.id!!,
      field: "contactInfo",
      data: [data],
    });
  }
  async updateContact() {
    const response = await cornieClient().put(
      `/api/v1/patient/contact/${this.contactId}`,
      this.payload
    );
    const contact = response.data;
    this.updatePatient(contact);
  }

  setData(contact: Contact) {
    this.primaryAddress = contact?.primaryAddress || "";
    this.secondaryAddress = contact?.secondaryAddress || "";
    this.country = contact?.country || "";
    this.state = contact?.state || "";
    this.postCode = contact?.postalCode || "";
    this.city = contact?.city || "";
    this.phoneNumber = contact?.phone?.number || "";
    this.dialCode = contact?.phone?.dialCode || "+234";
    this.email = contact?.email || "";
    this.type = contact?.type || "work";
    this.contactId = contact?.id || "";
  }

  hydrate() {
    const patient = this.patient;
    if (!patient) return;
    const contacts = patient.contactInfo || [];
    if (contacts.length < 1) return;
    const contact = [...contacts].pop();
    if (contact) this.setData(contact);
  }

  @Watch("patient")
  patientChanged() {
    this.hydrate();
  }
  created() {
    if (this.patient) this.hydrate();
  }
}
</script>
