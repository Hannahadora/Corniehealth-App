<template>
  <div class="h-screen flex justify-center">
    <div class="w-full h-screen mx-5 pb-5">
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
        Add a Practitioner
      </span>
      <span class="w-full h-full block">
        <div class="w-full h-screen block">
          <v-form class="w-full h-screen my-5 block" @submit="submit">
            <span class="flex items-center mt-3 mb-3">
              <avatar class="mr-2" v-if="img.url" :src="img.url" />
              <avatar class="mr-2" v-else :src="img.placeholder" />
              <input
                type="file"
                accept="image/*"
                name="image"
                id="file"
                @change="img.onChange"
                hidden
              />
              <label for="file" class="text-pink-600 font-bold cursor-pointer">
                Upload
              </label>
            </span>
            <div class="w-full grid grid-cols-2 gap-5">
              <cornie-input :modelValue="id" label="Identifier" disabled />
              <cornie-select
                :rules="required"
                :items="['active', 'inactive']"
                v-model="activeState"
                label="Active State"
              />
              <cornie-input v-model="type" label="Type" />
              <cornie-input
                :rules="required"
                v-model="name"
                label="Name (First and Last)"
              />
              <cornie-select
                :rules="required"
                :items="['male', 'female', 'other']"
                v-model="gender"
                label="Gender"
              />
              <phone-input
                v-model="phone"
                v-model:code="dialCode"
                :rules="required"
                label="Phone Number"
              />
              <cornie-input :rules="required" v-model="email" label="Email" />
              <cornie-input
                :rules="required"
                v-model="address"
                label="Address"
              />
              <date-picker label="Date of Birth" v-model="dateOfBirth" />
              <cornie-input
                :rules="required"
                v-model="jobDesignation"
                label="Job Designation"
              />
              <cornie-input
                :rules="required"
                v-model="department"
                label="Department"
              />
              <cornie-select
                :rules="required"
                :items="[
                  {
                    code: 'c7453f3b-e712-4cb3-a86f-02d1f51198eb',
                    display: 'Clinician',
                  },
                ]"
                v-model="accessRole"
                label="Access Role"
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
              Qualification
            </span>
            <div class="w-full grid grid-cols-2 gap-5 mt-3">
              <cornie-input disabled label="Identifier" />
              <cornie-select
                :items="dropdown.Qualification"
                v-model="qualificationCode"
                label="Code"
              />
              <date-picker label="Period" />
              <cornie-input v-model="qualificationIssuer" label="Issuer" />
              <cornie-select
                :items="dropdown.CommunicationLanguage"
                v-model="communicationLanguage"
                label="Communication"
              />
              <cornie-input v-model="licenseNumber" label="License Number" />
            </div>

            <div class="mt-3 w-full">
              <operation-hours v-model="hoursOfOperation" />
            </div>
            <div class="w-full grid grid-cols-2 gap-5 mt-5">
              <cornie-select
                :rules="required"
                v-model="availabilityExceptions"
                :items="['X-MAS', 'SALAH']"
                label="Availability Exceptions"
              />

              <cornie-select
                :rules="required"
                v-model="consultationChannel"
                label="Consulation Channel"
                :items="dropdown.ConsultationChannel"
              />
            </div>
            <span class="flex w-full mt-5 pb-3 justify-end">
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
                @click="$router.push('practitioners')"
              >
                Cancel
              </button>
              <cornie-btn
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
              </cornie-btn>
            </span>
          </v-form>
        </div>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import PhoneInput from "@/components/phone-input.vue";
import OperationHours from "@/components/new-operation-hours.vue";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import DatePicker from "@/components/datepicker.vue";
import { Prop, Watch } from "vue-property-decorator";
import { useHandleImage } from "@/composables/useHandleImage";

const dropdown = namespace("dropdown");
const practitioner = namespace("practitioner");
import Avatar from "@/components/avatar.vue";
@Options({
  name: "AddPractitioner",
  components: {
    CornieInput,
    CornieSelect,
    PhoneInput,
    OperationHours,
    DatePicker,
    Avatar,
  },
})
export default class AddPractitioner extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  img = setup(() => useHandleImage());

  @practitioner.Action
  getPractitionerById!: (id: string) => Promise<IPractitioner>;

  @practitioner.Mutation
  updatePractitioners!: (practitioners: IPractitioner[]) => void;

  loading = false;

  qualificationCode = "";
  name = "";
  email = "";
  activeState = "";
  gender = "";
  phone = "";
  address = "";
  dateOfBirth = "";
  jobDesignation = "";
  department = "";
  accessRole = "";
  qualificationIdentifier = "11-22";
  qualificationIssuer = "";
  licenseNumber = "";
  type = "";
  communicationLanguage = "";
  availabilityExceptions = "";
  consultationChannel = "";
  hoursOfOperation: HoursOfOperation[] = [];
  organizationId = "";
  dialCode = "";
  dropdown = {} as IIndexableObject;

  required = string().required();

  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  @Watch("id")
  idChanged() {
    this.setPractitioner();
  }

  async setPractitioner() {
    const practitioner = await this.getPractitionerById(this.id);
    if (!practitioner) return;
    this.name = `${practitioner.firstName} ${practitioner.lastName}`;
    this.email = practitioner.email;
    this.activeState = practitioner.activeState;
    this.gender = practitioner.gender;
    this.phone = practitioner.phone?.number;
    this.dialCode = (practitioner.phone as any).dialCode;
    this.type = practitioner.type;
    this.address = practitioner.address;
    this.dateOfBirth = practitioner.dateOfBirth;
    this.img.url = practitioner.image;
    this.jobDesignation = practitioner.jobDesignation;
    this.department = practitioner.department;
    this.accessRole = practitioner.accessRole;
    this.qualificationIdentifier = practitioner.qualificationIdentifier;
    this.qualificationIssuer = practitioner.qualificationIssuer;
    this.licenseNumber = practitioner.licenseNumber;
    this.communicationLanguage = practitioner.communicationLanguage;
    this.availabilityExceptions = practitioner.availabilityExceptions;
    this.consultationChannel = practitioner.consultationChannel;
    this.organizationId = practitioner.organizationId;
    this.hoursOfOperation = practitioner.hoursOfOperation;
  }
  serializeDate(date: string) {
    if (!date) return "";
    return new Date(date).toISOString();
  }
  get payload() {
    const [firstName, lastName] = this.name.split(" ");
    return {
      firstName,
      lastName,
      email: this.email,
      activeState: this.activeState,
      gender: this.gender,
      phone: {
        number: this.phone,
        dialCode: this.dialCode,
      },
      type: this.type,
      address: this.address,
      dateOfBirth: this.serializeDate(this.dateOfBirth),
      image: this.img.url,
      jobDesignation: this.jobDesignation,
      department: this.department,
      accessRole: this.accessRole,
      qualificationIdentifier: this.qualificationIdentifier,
      qualificationIssuer: this.qualificationIssuer,
      licenseNumber: this.licenseNumber,
      communicationLanguage: this.communicationLanguage,
      availabilityExceptions: this.availabilityExceptions,
      consultationChannel: this.consultationChannel,
      organizationId: this.organizationId,
      hoursOfOperation: this.hoursOfOperation,
    };
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.updatePractitioner();
    else await this.createPractitioner();
    this.loading = false;
  }

  async createPractitioner() {
    try {
      const response = await cornieClient().post(
        "/api/v1/practitioner",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Practitioner created", status: "success" });
        this.updatePractitioners([response.data]);
      }
    } catch (error) {
      window.notify({ msg: "Practitioner not created", status: "error" });
      console.log(error);
    }
  }

  async updatePractitioner() {
    const url = `/api/v1/practitioner/${this.id}`;
    const payload = { ...this.payload, id: this.id };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Practitioner updated", status: "success" });
        this.updatePractitioners([response.data]);
      }
    } catch (error) {
      window.notify({ msg: "Practitioner not updated", status: "error" });
      console.log(error);
    }
  }

  async setDropdown() {
    const data = await this.getDropdowns("practitioner");
    this.dropdown = data;
  }
  async created() {
    this.setPractitioner();
    this.setDropdown();
  }
}
</script>
