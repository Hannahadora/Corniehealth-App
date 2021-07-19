<template>
  <div class="h-screen flex justify-center">
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
        Add a Practitioner
      </span>
      <span class="w-full">
        <div class="w-full h-screen">
          <v-form class="mt-5 w-full" @submit="submit">
            <div class="w-full grid grid-cols-2 gap-5">
              <cornie-input
                :rules="required"
                v-model="qualificationIdentifier"
                label="Identifier"
              />
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
                :items="['male', 'female']"
                v-model="gender"
                label="Gender"
              />
              <phone-input
                v-model="phone"
                :rules="required"
                label="Phone Number"
              />
              <cornie-input :rules="required" v-model="email" label="Email" />
              <cornie-input
                :rules="required"
                v-model="address"
                label="Address"
              />
              <input type="date" name="Date of Birth" v-model="dateOfBirth" />
              <cornie-select
                :rules="required"
                :items="['Doctor', 'nurse']"
                v-model="jobDesignation"
                label="Job Designation"
              />
              <cornie-select
                :rules="required"
                :items="['Finance']"
                v-model="Department"
                label="Department"
              />
              <cornie-select
                :rules="required"
                :items="['Root']"
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
              <cornie-input v-model="identifier" label="Idenifier" />
              <cornie-select
                :items="['0eb0c710-665a-449c-ab27-42014d25c676']"
                v-model="code"
                label="Code"
              />
              <input type="date" name="Period" v-model="period" />
              <cornie-input v-model="issuer" label="Issuer" />
              <cornie-select
                :items="['0eb0c710-665a-449c-ab27-42014d25c676']"
                v-model="communication"
                label="Communication"
              />
              <cornie-input v-model="licenseNumber" label="License Number" />
            </div>

            <div class="mt-3 w-full">
              <operation-hours v-model="hoursOfOperation" />
            </div>
            <div class="w-full grid grid-cols-2 gap-5 mt-3">
              <cornie-select
                :rules="required"
                v-model="availabilityExceptions"
                :items="['X-MAS', 'SALAH']"
                label="Availability Exceptions"
              />

              <cornie-select
                :rules="required"
                v-model="consulationChannel"
                label="Consulation Channel"
                :items="['..', '..']"
              />
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
                @click="$router.push('practitioners')"
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
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import PhoneInput from "@/components/phone-input.vue";
import OperationHours from "@/components/operation-hours.vue";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";

const dropdown = namespace("dropdown");
const practitioner = namespace("practitioner");

@Options({
  components: {
    CornieInput,
    CornieSelect,
    PhoneInput,
    OperationHours,
  },
})
export default class AddPractitioner extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  @practitioner.Action
  getPractitionerById!: (id: string) => IPractitioner;

  loading = false;

  name = "";
  email = "";
  activeState = "";
  gender = "";
  phone = "";
  address = "";
  dateOfBirth = "";
  image = "";
  jobDesignation = "";
  department = "";
  accessRole = "";
  qualificationIdentifier = "";
  qualificationIssuer = "";
  licenseNumber = "";
  communicationLanguage = "";
  availabilityExceptions = "";
  consultationChannel = "";
  hoursOfOperation: HoursOfOperation[] = [];
  organizationId = "";

  dropdowns = {} as IIndexableObject;

  required = string().required();

  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  @Watch("id")
  idChanged() {
    this.setPractitioner();
  }

  setPractitioner() {
    const practitioner = this.getPractitionerById(this.id);
    if (!practitioner) return;
    this.name = `${practitioner.firstName} ${practitioner.lastName}`;
    this.email = practitioner.email;
    this.activeState = practitioner.activeState;
    this.gender = practitioner.gender;
    this.phone = practitioner.phone;
    this.address = practitioner.address;
    this.dateOfBirth = practitioner.dateOfBirth;
    this.image = practitioner.image;
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
  get payload() {
    const [firstName, lastName] = this.name.split(" ");
    return {
      firstName,
      lastName,
      email: this.email,
      activeState: this.activeState,
      gender: this.gender,
      phone: this.phone,
      address: this.address,
      dateOfBirth: this.dateOfBirth,
      image: this.image,
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
        window.notify({ msg: "Practitioner added", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Practitioner not added", status: "error" });
    }
  }

  async updatePractitioner() {
    const url = `/api/v1/practitioner/${this.id}`;
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
    this.setPractitioner();
    const data = await this.getDropdowns("practitioner");
    this.dropdowns = data;
  }
}
</script>
