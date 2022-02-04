<template>
  <access-role
    :show="addAccessRole"
    :deletedRole="deletedRole"
    @close-access-diag="addAccessRole = false"
    @add-access-roles="addAccessRoles"
    @role-deleted="deletedRole = {}"
  />
  <div class="h-screen flex justify-center">
    <div class="w-full h-screen mx-5 pb-5">
      <span
        class="flex border-b-2 w-full font-semibold text-lg text-primary py-2 mx-auto"
      >
        Add a Practitioner
      </span>
      <span class="w-full h-full block">
        <div class="w-full h-screen block">
          <accordion-component title="Basic Info" :opened="true">
            <template v-slot:default>
              <div class="w-full">
                <span class="flex items-center mt-5 mb-12">
                  <cornie-avatar-field v-model="img.url" />
                </span>
              </div>
              <div class="w-full grid grid-cols-3 gap-4">
                <cornie-input
                  :modelValue="identifier"
                  label="Identifier"
                  disabled
                />
                <cornie-select
                  :rules="required"
                  :items="['active', 'inactive']"
                  v-model="activeState"
                  label="Status"
                  class="w-full"
                  placeholder="--Select--"
                />
                <cornie-input
                  v-model="type"
                  label="Type"
                  placeholder="--Enter--"
                />
                <cornie-input
                  :rules="required"
                  v-model="name"
                  label="Name (First and Last)"
                  placeholder="--Enter--"
                />
                <cornie-select
                  :rules="required"
                  :items="['male', 'female', 'other']"
                  v-model="gender"
                  label="Gender"
                  placeholder="--Select--"
                  class="w-full"
                />
                <phone-input
                  v-model="phone"
                  v-model:code="dialCode"
                  :rules="required"
                  label="Phone Number"
                  placeholder="--Enter--"
                />
                <cornie-input
                  :rules="emailRule"
                  v-model="email"
                  placeholder="--Enter--"
                  label="Email"
                />
                <cornie-input
                  :rules="required"
                  v-model="address"
                  label="Address"
                  placeholder="--Enter--"
                />
                <date-picker
                  label="Date of Birth"
                  :rules="dobValidator"
                  v-model="dateOfBirth"
                  placeholder="--Select--"
                />
                <cornie-input
                  :rules="required"
                  v-model="jobDesignation"
                  label="Job Designation"
                  placeholder="--Enter--"
                />
                <cornie-input
                  :rules="required"
                  v-model="department"
                  label="Department"
                  placeholder="--Enter--"
                />
              </div>
              <div class="flex my-5">
                <button
                  type="button"
                  class="border-0 font-bold text-red-500 text-xs mr-1"
                  @click="addAccessRole = true"
                >
                  ADD ACCESS ROLE
                </button>
                <plus class="fill-current text-blue-900 font-bold w-3" />
              </div>
              <div v-if="accessRoles.length" class="grid grid-cols-12 mb-4">
                <div
                  class="flex justify-between col-span-4 pr-5"
                  :class="[
                    index !== accessRoles.length - 1
                      ? 'border-r border-gray-400'
                      : '',
                    index % 2 !== 0 ? 'pl-5' : '',
                    index === accessRoles.length - 1 ? 'pl-5' : '',
                  ]"
                  v-for="(access, index) in accessRoles"
                  :key="`${access.roleId}-${access.locationId}`"
                >
                  <div class="flex justify-center items-center">
                    <div
                      class="w-10 h-10 rounded-full flex justify-center items-center bg-blue-600 text-white text-lg text-center font-bold mr-2"
                    >
                      {{
                        `${access.location
                          .substr(0, 1)
                          .toUpperCase()}${access.role
                          .substr(0, 1)
                          .toUpperCase()}`
                      }}
                    </div>
                    <div class="flex flex-col items-start">
                      <div class="mb-0 font-bold text-sm">
                        <div class="flex justify-center items-center">
                          <div class="mr-1">
                            {{ access.location }}
                          </div>
                          <div
                            class="font-bolder text-black mr-1"
                            v-if="access.default"
                          >
                            •
                          </div>
                          <div class="text-xs text-blue-500">
                            {{ access.default ? "Default" : "" }}
                          </div>
                        </div>
                      </div>
                      <div class="text-xs text-gray-400">{{ access.role }}</div>
                    </div>
                  </div>
                  <div class="flex justify-center items-center">
                    <button class="border-0 mr-5" type="button">
                      <edit-icon class="fill-current text-primary" />
                    </button>
                    <button
                      class="border-0"
                      type="button"
                      @click="deleteRole(access.roleId, access.locationId)"
                    >
                      <delete-red />
                    </button>
                  </div>
                </div>
              </div>
            </template>
            <template v-slot:misc>
              <info-icon class="fill-current text-primary" />
            </template>
          </accordion-component>
          <accordion-component title="Qualification" :opened="true">
            <template v-slot:default>
              <div class="w-full grid grid-cols-3 gap-4 mt-3">
                <cornie-input
                  disabled
                  label="Identifier"
                  :modelValue="identifier"
                />
                <cornie-select
                  :items="dropdown.Qualification"
                  v-model="qualificationCode"
                  label="Code"
                  placeholder="--Select--"
                  class="w-full"
                />
                <period-picker
                  label="Period"
                  class="-mt-1.5"
                  v-model="period"
                  placeholder="--Select--"
                />
                <cornie-input
                  v-model="qualificationIssuer"
                  label="Issuer"
                  class="w-full"
                  placeholder="--Enter--"
                />
                <cornie-select
                  :items="dropdown.CommunicationLanguage"
                  v-model="communicationLanguage"
                  label="Communication"
                  placeholder="--Select--"
                  class="w-full"
                />
                <cornie-input
                  v-model="licenseNumber"
                  label="License Number"
                  placeholder="--Enter--"
                />
              </div>
            </template>
            <template v-slot:misc>
              <info-icon class="fill-current text-primary" />
            </template>
          </accordion-component>

          <accordion-component title="Available Time" :opened="true">
            <template v-slot:default>
              <div class="mt-3 w-full">
                <operation-hours v-model="hoursOfOperation" />
              </div>
              <div class="w-full grid grid-cols-2 gap-5 mt-5">
                <cornie-select
                  :rules="required"
                  v-model="availabilityExceptions"
                  :items="['X-MAS', 'SALAH']"
                  label="Availability Exceptions"
                  placeholder="--Select--"
                />

                <cornie-select
                  :rules="required"
                  v-model="consultationChannel"
                  label="Consultation Channel"
                  :items="dropdown.ConsultationChannel"
                  placeholder="--Select--"
                />
              </div>
            </template>
            <template v-slot:misc>
              <info-icon class="fill-current text-primary" />
            </template>
          </accordion-component>
          <span class="flex w-full mt-5 pb-3 justify-end">
            <button
              class="rounded-full font-semibold py-1 px-12 text-primary border border-primary mr-3"
              @click="$router.push('practitioners')"
            >
              Cancel
            </button>
            <cornie-btn
              class="rounded-full font-semibold py-1 px-6 text-white border bg-danger"
              :loading="loading"
              type="submit"
              @click="submit"
            >
              Save
            </cornie-btn>
          </span>
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
import { string, date } from "yup";
import DatePicker from "@/components/datepicker.vue";
import { Prop, Watch } from "vue-property-decorator";
import { useHandleImage } from "@/composables/useHandleImage";
import PeriodPicker from "@/components/daterangepicker.vue";
import CornieAvatarField from "@/components/cornie-avatar-field/CornieAvatarField.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import InfoIcon from "@/components/icons/info.vue";
import AddBlueIcon from "@/components/icons/addblue.vue";
import Multiselect from "@vueform/multiselect";
import Avatar from "@/components/avatar.vue";
import Period from "@/types/IPeriod";
import { createDate } from "@/plugins/utils";
import Plus from "@/components/icons/plus.vue";
import AccessRole from "./AccessRoles.vue";
import DeleteRed from "@/components/icons/delete-red.vue";
import EditIcon from "@/components/icons/edit.vue";

const dropdown = namespace("dropdown");
const practitioner = namespace("practitioner");
const roles = namespace("roles");

@Options({
  name: "AddPractitioner",
  components: {
    AccessRole,
    Plus,
    CornieInput,
    CornieSelect,
    AccordionComponent,
    InfoIcon,
    PhoneInput,
    PeriodPicker,
    OperationHours,
    DatePicker,
    Avatar,
    CornieAvatarField,
    AddBlueIcon,
    DeleteRed,
    EditIcon,
  },
})
export default class AddPractitioner extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  img = setup(() => useHandleImage());

  @roles.State
  roles!: { id: string; name: string }[];

  @roles.Action
  getRoles!: () => Promise<void>;

  @practitioner.Action
  getPractitionerById!: (id: string) => Promise<IPractitioner>;

  @practitioner.Mutation
  updatePractitioners!: (practitioners: IPractitioner[]) => void;

  loading = false;

  dobValidator = date().max(
    createDate(0, 0, -16),
    "Practitioner must be at least 16yrs."
  );

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
  singleLocation = "";

  qualificationIdentifier = "1122";
  qualificationIssuer = "";
  licenseNumber = "";
  type = "";
  communicationLanguage = "";
  availabilityExceptions = "";
  consultationChannel = "";
  defaultLocation = "";
  hoursOfOperation: HoursOfOperation[] = [];
  organizationId = "";
  dialCode = "+234";
  dropdown = {} as IIndexableObject;
  period = {} as Period;
  required = string().required();
  emailRule = string().email().required();
  location = [];
  locations = [];
  generatedIdentifier = "";
  addAccessRole = false;
  accessRoles = [] as any[];
  deletedRole = {} as object;

  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  get identifier() {
    return this.generatedIdentifier || "System generated";
  }

  @Watch("id")
  idChanged() {
    this.setPractitioner();
  }

  async addAccessRoles(payload: any) {
    this.accessRoles = [...payload];
  }

  async deleteRole(roleId: string, locationId: string) {
    this.accessRoles = [
      ...this.accessRoles.filter(
        (item: any) => item.roleId !== roleId && item.locationId !== locationId
      ),
    ];

    this.deletedRole = {
      roleId,
      locationId,
    };
  }

  async setPractitioner() {
    const practitioner = await this.getPractitionerById(this.id);
    if (!practitioner) return;
    this.name = `${practitioner.firstName} ${practitioner.lastName}`;
    this.email = practitioner.email;
    this.generatedIdentifier = practitioner.identifier;
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
    this.accessRole = practitioner.accessRole || "";
    this.qualificationIdentifier = practitioner.qualificationIdentifier;
    this.qualificationIssuer = practitioner.qualificationIssuer;
    this.licenseNumber = practitioner.licenseNumber;
    this.communicationLanguage = practitioner.communicationLanguage;
    this.availabilityExceptions = practitioner.availabilityExceptions;
    this.consultationChannel = practitioner.consultationChannel;
    this.organizationId = practitioner.organizationId;
    this.hoursOfOperation = practitioner.hoursOfOperation;
    this.qualificationCode = practitioner.qualificationCode || "";
    this.period = practitioner.period || {};
    this.accessRoles = [];
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
      qualificationCode: this.qualificationCode,
      availabilityExceptions: this.availabilityExceptions,
      consultationChannel: this.consultationChannel,
      organizationId: this.organizationId,
      hoursOfOperation: this.hoursOfOperation,
      period: this.period,
      // locations: this.locations,
      // defaultLocation: this.defaultLocation,
      locationRoles: this.accessRoles,
    };
  }

  async fetchLocation() {
    const AllLocation = cornieClient().get(
      "/api/v1/location/myOrg/getMyOrgLocations"
    );
    const response = await Promise.all([AllLocation]);
    this.location = response[0].data;
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
        this.$router.back();
      }
    } catch (error) {
      window.notify({ msg: "Practitioner not created", status: "error" });
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
        this.$router.back();
      }
    } catch (error) {
      window.notify({ msg: "Practitioner not updated", status: "error" });
    }
  }

  async setDropdown() {
    const data = await this.getDropdowns("practitioner");
    this.dropdown = data;
  }
  async created() {
    this.setPractitioner();
    this.setDropdown();
    await this.fetchLocation();
    if (!this.roles.length) await this.getRoles();
  }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>
.multiselect-option.is-selected {
  background: #fe4d3c;
  color: var(--ms-option-color-selected, #fff);
}
.multiselect-option.is-selected.is-pointed {
  background: var(--ms-option-bg-selected-pointed, #fe4d3c);
  color: var(--ms-option-color-selected-pointed, #fff);
}
.multiselect-option.is-selected {
  background: var(--ms-option-bg-selected, #fe4d3c);
  color: var(--ms-option-color-selected, #fff);
}

.multiselect {
  position: relative;
  margin: 0 auto;
  margin-bottom: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  border: var(--ms-border-width, 1px) solid var(--ms-border-color, #d1d5db);
  border-radius: var(--ms-radius, 4px);
  background: var(--ms-bg, #fff);
  font-size: var(--ms-font-size, 1rem);
  min-height: calc(
    var(--ms-border-width, 1px) * 2 + var(--ms-font-size, 1rem) *
      var(--ms-line-height, 1.375) + var(--ms-py, 0.5rem) * 2
  );
}

.multiselect-tags {
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-wrap: wrap;
  margin: var(--ms-tag-my, 0.25rem) 0 0;
  padding-left: var(--ms-py, 0.5rem);
  align-items: center;
}

.multiselect-tag.is-user {
  padding: 5px 12px;
  border-radius: 22px;
  background: #080056;
  margin: 3px 3px 8px;
  position: relative;
  left: -10px;
}

/* .multiselect-clear-icon {
      -webkit-mask-image: url("/components/icons/chevrondownprimary.vue");
      mask-image: url("/components/icons/chevrondownprimary.vue");
      background-color: #080056;
      display: inline-block;
      transition: .3s;
  } */

.multiselect-placeholder {
  font-size: 0.8em;
  font-weight: 400;
  font-style: italic;
  color: #667499;
}

.multiselect-caret {
  transform: rotate(0deg);
  transition: transform 0.3s;
  -webkit-mask-image: url("../../../../assets/img/Chevron.png");
  mask-image: url("../../../../assets/img/Chevron.png");
  background-color: #080056;
  margin: 0 var(--ms-px, 0.875rem) 0 0;
  position: relative;
  z-index: 10;
  flex-shrink: 0;
  flex-grow: 0;
  pointer-events: none;
}

.multiselect-tag.is-user img {
  width: 18px;
  border-radius: 50%;
  height: 18px;
  margin-right: 8px;
  border: 2px solid #ffffffbf;
}

.multiselect-tag.is-user i:before {
  color: #ffffff;
  border-radius: 50%;
}

.multiselect-tag-remove {
  display: flex;
  align-items: center;
  /* border: 1px solid #fff;
    background: #fff; */
  border-radius: 50%;
  color: #fff;
  justify-content: center;
  padding: 0.77px;
  margin: var(--ms-tag-remove-my, 0) var(--ms-tag-remove-mx, 0.5rem);
}
</style>
