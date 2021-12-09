<template>
  <div class="container-fluid topest" style="height: 100vh; overflow-y: scroll">
    <div class="w-full">
      <div class="container-fluid">
        <div class="w-full border-b-2 curved flex py-2">
          <div class="container-fluid flex font-semibold text-xl py-2">
            <h2>Set Up Profile</h2>
          </div>
        </div>

        <div class="w-full my-6 border">
          <div class="container-fluid">
            <Accordion title="Basic Info" v-model="show" class="" :first="true">
              <div class="w-full px-4">
                <div class="container">
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
                    <label
                      for="file"
                      class="text-pink-600 font-bold cursor-pointer"
                    >
                      Upload
                    </label>
                  </span>
                </div>
                <div class="container-fluid py-3 flex justify-around">
                  <div class="w-4/12">
                    <CornieInput
                      label="Identifier"
                      v-model="data.id"
                      placeholder="--Enter--"
                    />
                  </div>
                  <div class="w-4/12">
                    <CornieSelect
                      label="Active state"
                      :items="states"
                      v-model="data.activeState"
                      placeholder="--Enter--"
                    />
                  </div>
                  <div class="w-4/12">
                    <CornieSelect
                      label="Type"
                      :items="types"
                      v-model="data.type"
                      placeholder="--Enter--"
                    />
                  </div>
                </div>

                <div class="container-fluid py-3 flex justify-around">
                  <div class="w-4/12">
                    <CornieInput
                      label="name (first and last)"
                      v-model="data.name"
                      placeholder="--Enter--"
                    />
                  </div>
                  <div class="w-4/12">
                    <CornieSelect
                      label="Gender"
                      :items="genders"
                      v-model="data.gender"
                      placeholder="--Enter--"
                    />
                  </div>
                  <div class="w-4/12">
                    <phone-select
                      label="Phone"
                      v-model="data.phone"
                      v-model:code="data.phoneCode"
                      placeholder="--Enter--"
                    />
                  </div>
                </div>

                <div class="container-fluid py-3 flex justify-around">
                  <div class="w-4/12">
                    <CornieInput
                      label="Address"
                      v-model="data.address"
                      placeholder="--Enter--"
                    />
                  </div>
                  <div class="w-4/12">
                    <div class="w-11/12">
                      <DatePicker
                        v-model="data.dateOfBirth"
                        label="Date of birth"
                        style="width:max-width:100%"
                        placeholder="--Enter--"
                      />
                    </div>
                  </div>
                  <div class="w-4/12">
                    <CornieSelect
                      label="Job Designation"
                      :items="designations"
                      v-model="data.jobDesignation"
                      placeholder="--Enter--"
                    />
                  </div>
                </div>

                <div class="container-fluid py-3 flex justify-around">
                  <div class="w-4/12">
                    <CornieSelect
                      label="Department"
                      :items="functions"
                      v-model="data.department"
                      placeholder="--Enter--"
                    />
                    <!-- <CornieInput  label="Department"  placeholder="--Enter--" /> -->
                  </div>
                  <div class="w-4/12">
                    <CornieSelect
                      label="Access role"
                      :items="accessRoles"
                      v-model="data.accessRole"
                      placeholder="--Enter--"
                    />
                    <!-- <CornieInput label="access role"  placeholder="--Enter--" /> -->
                  </div>
                  <div class="w-4/12"></div>
                </div>
              </div>
            </Accordion>

            <Accordion title="Qualification" v-model="show" class="my-6">
              <div class="w-full px-4">
                <div class="container-fluid py-3 flex justify-around">
                  <div class="w-4/12">
                    <CornieInput
                      label="identifier"
                      v-model="data.qualificationIdentifier"
                      placeholder=""
                      :disabled="true"
                    />
                  </div>
                  <div class="w-4/12">
                    <CornieSelect
                      label="Code"
                      :items="dropdown.Qualification"
                      v-model="data.qualificationCode"
                      placeholder="--Enter--"
                    />
                  </div>
                  <div class="w-4/12">
                    <Period
                      label="Period"
                      v-model="data.period"
                      placeholder="--Enter--"
                    />
                  </div>
                </div>

                <div class="container-fluid py-3 flex justify-around">
                  <div class="w-4/12">
                    <CornieInput
                      label="Issuer"
                      v-model="data.qualificationIssuer"
                      placeholder="--Enter--"
                    />
                  </div>
                  <div class="w-4/12">
                    <cornie-select
                      :items="dropdown.CommunicationLanguage"
                      v-model="data.communicationLanguage"
                      label="Communication"
                    />
                  </div>
                  <div class="w-4/12">
                    <CornieInput
                      label="LICENSE NUMBER"
                      v-model="data.licenseNumber"
                      placeholder="--Enter--"
                    />
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion title="Available Time" class="mt-6">
              <div class="w-full px-4">
                <!-- <div class="container my-3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="form-radio h-6 w-6" v-model="allChecked" @change="onAll"  name="schedule">
                                            <span class="ml-2">All days</span>
                                        </label>
                                    </div> -->

                <!-- <div class="container flex">
                                        <div class="w-2/12">
                                        </div>
                                        <div class="w-4/12">
                                            <div class="container flex">
                                                <div class="w-6/12 mr-3">
                                                    <span class="font-bold uppercase text-sm">Start</span>
                                                </div>
                                                <div class="w-6/12">
                                                    <span class="font-bold uppercase text-sm">Stop</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div> -->

                <div class="w-full">
                  <operation-hours v-model="hoursOfOperation" />
                </div>

                <!-- <div class="container flex my-3" v-for="(day, index) in times" :key="index">
                                        <div class="w-2/12">
                                            <label class="inline-flex items-center">
                                                <input type="checkbox" v-model="day.selected" class="form-radio h-6 w-6"  name="schedule">
                                                <span class="ml-2">{{ day.day }}</span>
                                            </label>
                                        </div>
                                        <div class="w-4/12">
                                            <div class="container flex">
                                                <div class="w-6/12 mr-3">
                                                    <label for="">
                                                        <input type="time" v-model="day.openTime" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                                <div class="w-6/12">
                                                    <label for="">
                                                        <input type="time" v-model="day.closeTime" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div> -->

                <div class="container flex my-3">
                  <div class="w-4/12">
                    <CornieSelect
                      label="availability exceptions"
                      :items="['X-MAS', 'SALAH']"
                      v-model="data.availabilityExceptions"
                      placeholder="--Enter--"
                    />
                  </div>
                  <div class="w-4/12">
                    <CornieSelect
                      label="consulation channel"
                      :items="dropdown.ConsultationChannel"
                      v-model="data.consultationChannel"
                      placeholder="--Enter--"
                    />
                  </div>
                </div>
              </div>
            </Accordion>
          </div>
        </div>
      </div>
      <div class="w-full mb-12">
        <div class="container-fluid my-8 flex justify-end items-center">
          <corniebtn :loading="false">
            <router-link
              to=""
              class="cursor-pointer focus:outline-none text-gray-500 border mr-6 font-bold py-3 px-8 rounded-full"
            >
              Cancel
            </router-link>
          </corniebtn>
          <CornieBtn
            :loading="loading"
            @click="setup"
            :class="{ 'bg-gray-500': loading }"
          >
            <a
              style="background: #fe4d3c"
              class="bg-red-500 hover:bg-blue-700 cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-full"
            >
              Save
            </a>
          </CornieBtn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";
import { useHandleImage } from "@/composables/useHandleImage";
import Accordion from "@/components/accordion-component.vue";
import Button from "@/components/globals/corniebtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import DatePicker from "@/components/datepicker.vue";
import Period from "@/components/daterangepicker.vue";
import Avatar from "@/components/avatar.vue";
import EmptyState from "./empty-state.vue";
import CornieSelect from "@/components/cornieselect.vue";
import PhoneSelect from "@/components/phone-input.vue";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import User from "@/types/user";
import setupHelper from "../helper/setup-helper";
import OperationHours from "@/components/new-operation-hours.vue";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import { Watch } from "vue-property-decorator";
import CornieBtn from "@/components/CornieBtn.vue";

const roles = namespace("roles");
const dropdown = namespace("dropdown");
const userStore = namespace("user");
const userSettingsStore = namespace("usersettings");

@Options({
  components: {
    Accordion,
    Button,
    DatePicker,
    Avatar,
    CornieInput,
    EmptyState,
    CornieSelect,
    PhoneSelect,
    Period,
    OperationHours,
    CornieBtn,
  },
})
export default class USerSetup extends Vue {
  @roles.State
  roles!: any;

  @roles.Action
  getRoles!: () => Promise<any>;

  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  @userStore.State
  user!: User;

  @userStore.Getter
  authPractitioner!: IPractitioner;

  @userSettingsStore.Action
  setUserUp!: (body: IPractitioner) => Promise<boolean>;

  dropdown = {} as IIndexableObject;
  hoursOfOperation: HoursOfOperation[] = [];

  show = true;
  data: any = {};
  loading = false;

  types: string[] = ["Full Time (FT)", "Part Time (PT)", "AdHoc (AH)"];

  states: any[] = [
    { code: "active", display: "Active" },
    { code: "inactive", display: "Inctive" },
  ];

  genders: any[] = [
    { code: "male", display: "Male" },
    { code: "female", display: "Female" },
    { code: "other", display: "Other" },
  ];

  designations: any[] = [];
  levels: any[] = [];
  functions: any[] = [];

  times: any[] = [
    { day: "Monday", openTime: "", closeTime: "", selected: false },
    { day: "Tuesday", openTime: "", closeTime: "", selected: false },
    { day: "Wednesday", openTime: "", closeTime: "", selected: false },
    { day: "Thursday", openTime: "", closeTime: "", selected: false },
    { day: "Friday", openTime: "", closeTime: "", selected: false },
    { day: "Saturday", openTime: "", closeTime: "", selected: false },
    { day: "Sunday", openTime: "", closeTime: "", selected: false },
  ];

  img = setup(() => useHandleImage());

  async setDropdown() {
    const data = await this.getDropdowns("practitioner");
    this.dropdown = data;
  }

  onAll(e: any) {
    if (e.target.checked) {
      this.times = this.times.map((i) => {
        i.selected = true;
        return i;
      });
    } else {
      this.times = this.times.map((i) => {
        i.selected = false;
        return i;
      });
    }
  }

  get allChecked() {
    const index = this.times.findIndex((i) => !i.selected);
    return index >= 0 ? false : true;
  }

  async getLevels() {
    try {
      const {
        data: { levels },
      } = await cornieClient().get(`/api/v1/orgHierarchy/levels`);
      this.levels = levels.map((i: any) => {
        return { code: i.id, display: i.name };
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getDesignations() {
    try {
      const {
        data: { designations },
      } = await cornieClient().get(`/api/v1/orgHierarchy/designation`);
      this.designations = designations.map((i: any) => {
        return { code: i.id, display: i.name };
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getDepartments() {
    try {
      const {
        data: { functions },
      } = await cornieClient().get(`/api/v1/orgHierarchy/function`);
      this.functions = functions.map((i: any) => {
        return { code: i.id, display: i.name };
      });
    } catch (error) {
      console.log(error);
    }
  }

  get accessRoles() {
    return this.roles.map((i: any) => {
      return { code: i.id, display: i.name };
    });
  }

  async setup() {
    const body = {
      ...this.data,
      // id: this.user.id,
      firstName: this.data.name ? this.data.name.split(" ")[0] : "",
      lastName: this.data.name ? this.data.name.split(" ")[1] : "",
      email: this.user.email,
      phone: {
        number: this.data.phone,
        dialCode: this.data.phoneCode,
      },
      hoursOfOperation: this.hoursOfOperation,
      dateOfBirth: this.data.dateOfBirth
        ? new Date(this.data.dateOfBirth).toISOString()
        : "",
      organizationId: this.user.orgId,
      image: this.img.url,
    };

    try {
      this.loading = true;
      const res = await this.setUserUp(body);
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }

  @Watch("authPractitioner")
  updateData() {
    this.data = setupHelper.constructPractitionerData(this.authPractitioner);
  }

  async created() {
    if (this.roles) await this.getRoles();
    console.log(this.user, "user");

    this.getDesignations();
    this.getLevels();
    this.getDepartments();
    this.setDropdown();
  }
}
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.topest::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.topest {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
