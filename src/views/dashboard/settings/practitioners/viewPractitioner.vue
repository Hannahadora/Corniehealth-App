<template>
  <div class="h-full grid grid-cols-12 gap-3 bg-transparent">
    <div class="col-span-3 bg-white rounded-md h-full p-3">
      <div
        class="w-full h-40 rounded-md bg-gray-50 flex flex-col items-center p-3"
      >
        <div class="h-20 w-20 rounded-full">
          <avatar class="w-full h-full" v-if="img.url" :src="img.url" />
          <div class="w-full h-full bg-gray-500" v-else></div>
        </div>
        <div class="font-bold text-xs my-0.5">
          {{ name }}
        </div>
        <div class="text-xs text-gray-400 my-0.5">
          {{ generatedIdentifier }}
        </div>
        <div class="text-xs text-gray-400">
          {{ type }}
        </div>
      </div>
      <div class="w-full border-b border-gray-400 border-dashed my-4"></div>
      <div>
        <vertical-tabs :items="tabLinks" v-model="currentTab"></vertical-tabs>
      </div>
    </div>
    <div class="col-span-9 bg-white h-full rounded-md p-3">
      <component :is="showComponent" :properties="properties" />
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
import CornieAvatarField from "@/components/avatar.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import InfoIcon from "@/components/icons/info.vue";
import AddBlueIcon from "@/components/icons/addblue.vue";
import Multiselect from "@vueform/multiselect";
import Avatar from "@/components/avatar.vue";
import Period from "@/types/IPeriod";
import { createDate } from "@/plugins/utils";
import PlusIcon from "@/components/icons/plus.vue";
import AccessRole from "./AccessRoles.vue";
import DeleteRed from "@/components/icons/delete-red.vue";
import EditIcon from "@/components/icons/edit.vue";
import CornieRadio from "@/components/cornieradio.vue";
import { useCountryStates } from "@/composables/useCountryStates";
import AutoComplete from "@/components/autocomplete.vue";
import AddIcon from "@/components/icons/addblue.vue";
import SpecialityModal from "./specialModal.vue";
import ISpecial from "@/types/ISpecial";
import ILocation from "@/types/ILocation";
import CornieCheckbox from "@/components/custom-checkbox.vue";
import VerticalTabs from "@/components/tabs-vert.vue";

import Availability from "./screens/Availability.vue";
import Bio from "./screens/Bio.vue";
import BoardLicenses from "./screens/BoardLicense.vue";
import Communication from "./screens/Communication.vue";
import Contact from "./screens/Contact.vue";
import Education from "./screens/Education.vue";
import GroupTeams from "./screens/GroupTeams.vue";
import LocationPreviledges from "./screens/LocationPreviledges.vue";
import VisitType from "./screens/VisitType.vue";
import WorkInfo from "./screens/WorkInfo.vue";
import ConsultationChannel from "./screens/ConsultationChannel.vue";

const dropdown = namespace("dropdown");
const practitioner = namespace("practitioner");
const roles = namespace("roles");
const special = namespace("special");
const location = namespace("location");

@Options({
  name: "AddPractitioner",
  components: {
    VerticalTabs,
    Availability,
    Bio,
    BoardLicenses,
    Communication,
    Contact,
    Education,
    GroupTeams,
    LocationPreviledges,
    VisitType,
    WorkInfo,
    ConsultationChannel,
    CornieCheckbox,
    AccessRole,
    PlusIcon,
    CornieInput,
    CornieSelect,
    AccordionComponent,
    SpecialityModal,
    InfoIcon,
    PhoneInput,
    AddIcon,
    PeriodPicker,
    OperationHours,
    DatePicker,
    Avatar,
    AutoComplete,
    CornieAvatarField,
    AddBlueIcon,
    DeleteRed,
    EditIcon,
    CornieRadio,
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

  @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;

  @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  deletePractitioner!: (id: string) => Promise<boolean>;

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  @practitioner.Action
  deleteLocationrole!: (id: string) => Promise<boolean>;

  @special.State
  specials!: ISpecial[];

  @special.Action
  fetchSpecials!: () => Promise<void>;

  loading = false;

  educations = [] as any;
  licenses = [] as any;

  get properties() {
    switch (this.currentTab) {
      case 0:
        return {
          id: this.practitionerId,
          name: this.name,
          img: this.img,
          nationality: this.nationality,
          gender: this.gender,
          dob: this.dateOfBirth,
          available: this.makeAvailable,
          type: this.type,
        };
      case 1:
        return {
          id: this.practitionerId,
          img: this.img,
          phone: {
            dialCode: this.dialCode,
            number: this.phone,
          },
          email: this.email,
          country: this.country,
          state: this.state,
          city: this.city,
          postCode: this.postCode,
          aptNumber: this.aptNumber,
          address: this.address,
          available: this.makeAvailable,
          type: this.type,
        };
      case 2:
        return {
          id: this.practitionerId,
          img: this.img,
          available: this.makeAvailable,
          employmentType: this.employmentType,
          speciality: this.specialty,
          jobDescription: this.jobDesignation,
          consultationRate: this.consultationRate,
          yearsOfPractice: {
            value: this.practiceDurationvalue,
            unit: this.practiceDurationunit,
          },
          type: this.type,
        };
      case 3:
        return {
          id: this.practitionerId,
          img: this.img,
          locations: this.locations,
          roles: this.roles,
          available: this.makeAvailable,
          locationRoles: this.locationRoles,
        };
      case 4:
        return {
          id: this.practitionerId,
          img: this.img,
          available: this.makeAvailable,
          educations: this.educations,
          type: this.type,
        };
      case 5:
        return {
          id: this.practitionerId,
          img: this.img,
          available: this.makeAvailable,
          licenses: this.licenses,
          type: this.type,
        };
      case 6:
        return {
          id: this.practitionerId,
          img: this.img,
          available: this.makeAvailable,
        };
      case 7:
        return {
          id: this.practitionerId,
          img: this.img,
          available: this.makeAvailable,
          type: this.type,
        };
      case 8:
        return {
          id: this.practitionerId,
          img: this.img,
          available: this.makeAvailable,
          communication: this.communicationLanguage,
          type: this.type,
        };
      default:
        return {
          id: this.practitionerId,
          img: this.img,
          available: this.makeAvailable,
          consultationChannel: this.consultationChannel,
          type: this.type,
        };
    }
  }

  get showComponent() {
    switch (this.currentTab) {
      case 0:
        return "bio";
      case 1:
        return "contact";
      case 2:
        return "work-info";
      case 3:
        return "location-previledges";
      case 4:
        return "education";
      case 5:
        return "board-licenses";
      case 6:
        return "availability";
      case 7:
        return "group-teams";
      case 8:
        return "communication";
      default:
        return "consultation-channel";
    }
  }

  currentTab = 0;
  tabLinks = [
    "Bio",
    "Contact",
    "Work Info",
    "Location & Previledges",
    "Education",
    "Board License",
    "Availability",
    "Group & Teams",
    "Communication",
    "Visit Type",
  ];

  addEducation() {
    if (
      !this.graduationYear ||
      !this.qualificationIssuer ||
      !this.qualificationCode
    )
      return;

    this.educations = [
      {
        graduationYear: this.graduationYear,
        issuer: this.qualificationIssuer,
        qualification: this.qualificationCode,
      },
      ...this.educations,
    ];

    this.qualificationIssuer = this.qualificationCode = "";
  }

  addLicense() {
    if (!this.licensePeriod || !this.licenseIssuer || !this.licenseNumber)
      return;

    this.licenses = [
      {
        licenseNumber: this.licenseNumber,
        issuer: this.licenseIssuer,
        period: this.licensePeriod,
      },
      ...this.licenses,
    ];

    this.licenseIssuer = this.licenseNumber = "";
  }

  dobValidator = date().max(
    createDate(0, 0, -16),
    "Practitioner must be at least 16yrs."
  );

  get readonly() {
    return this.$route.path.includes("view");
  }
  nationState = setup(() => useCountryStates());

  consultationRateunit = "";
  practiceDurationvalue = 0;
  practiceDurationunit = "";
  newspecialties = [] as any;

  qualificationCode = "";
  addEmergencyContact = false;
  useSameAddress = false;
  name = "";
  email = "";
  activeState = "active";
  gender = "";
  phone = "";
  address = "";
  dateOfBirth = "";
  jobDesignation = "";
  employmentType = "";
  department = "department";
  accessRole = "";
  singleLocation = "";
  nationality = "Nigeria";
  country = "Nigeria";
  state = "Abia";
  postCode = "";
  city = "";
  specialty = "";
  years = 0;
  issuer = "";
  graduation = "";
  showSpecial = false;

  qualificationIdentifier = "1122";
  qualificationIssuer = "";
  licenseNumber = "";
  type = "General Practitioner";
  makeAvailable = "";
  practitionerId = "";
  communicationLanguage = "";
  availabilityExceptions = "availabilityExceptions";
  consultationChannel = "";
  defaultLocation = "";
  hoursOfOperation: HoursOfOperation[] = [];
  organizationId = "";
  dialCode = "+234";
  dropdown = {} as IIndexableObject;
  period = {} as Period;
  required = string().required();
  emailRule = string().email().required();
  location = [] as any;
  // locations = [];
  generatedIdentifier = "";
  addAccessRole = false;
  accessRoles = [] as any;
  locationRoles = [] as any;
  locationId = "";
  roleId = "";
  setRoles = [] as any[];
  deletedRole = {} as object;
  services = [] as any;
  emergency = {
    name: "",
    relationship: "",
    email: "",
    phone: "",
    dialCode: "+234",
    country: "",
    state: "",
    city: "",
    postCode: "",
    aptNumber: "",
    address: "",
  };

  aptNumber = "";

  specialties = [] as any;
  practiceDuration = {
    value: 0,
    unit: "Year",
  };
  consultationRate = {
    value: 0,
    unit: "Hour",
  };
  graduationYear = "" as any;
  licenseIssuer = "";
  newservices = [] as any;
  licensePeriod = "" as any;

  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  get identifier() {
    return this.generatedIdentifier || "System generated";
  }

  @Watch("id")
  idChanged() {
    this.setPractitioner();
  }

  @Watch("useSameAddress")
  populateEmergencyAddress() {
    if (this.useSameAddress) {
      this.emergency.address = this.address;
    } else {
      this.emergency.address = "";
    }
  }

  async addAccessRoles(payload: any) {
    this.accessRoles = [...payload];
    this.locationRoles = [...payload];
  }

  editRole(locationId: string, roleId: string) {
    this.locationId = locationId;
    this.roleId = roleId;
    this.addAccessRole = true;
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
  saveservices(value: any) {
    this.services = value;
    this.newservices = value;
  }

  sendspeicality(value: any) {
    this.specialties = value;
    this.newspecialties = value;
  }

  showSpecialModal() {
    this.showSpecial = true;
  }
  async setPractitioner() {
    const practitioner = await this.getPractitionerById(this.id);

    console.log(practitioner);
    if (!practitioner) return;
    this.practitionerId = practitioner.id;
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
    this.state = practitioner.state;
    this.hoursOfOperation = practitioner.hoursOfOperation;
    this.qualificationCode = practitioner.qualificationCode || "";
    this.period = practitioner.period || {};
    this.locationRoles = practitioner.locationRoles;
    this.services = practitioner.services;
    this.nationality = practitioner.nationality;
    this.country = practitioner.country;
    this.city = practitioner.city;
    this.postCode = practitioner.postCode;
    this.aptNumber = practitioner.aptNumber;
    this.specialties = practitioner.specialties;
    this.practiceDuration.value = practitioner.practiceDuration.value;
    this.practiceDuration.unit = practitioner.practiceDuration.unit;
    this.consultationRate.value = practitioner.consultationRate.value;
    this.consultationRate.unit = practitioner.consultationRate.unit;
    this.consultationRateunit = practitioner?.consultationRate?.unit;
    this.practiceDurationvalue = practitioner?.practiceDuration?.value;
    this.practiceDurationunit = practitioner?.practiceDuration?.unit;
    this.graduationYear = practitioner.graduationYear;
    this.licenseIssuer = practitioner.licenseIssuer;
    this.licensePeriod = practitioner.licensePeriod;
    this.educations = practitioner.education;
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
      services: this.services,
      nationality: this.nationality,
      country: this.country,
      state: this.state,
      city: this.city,
      postCode: this.postCode,
      aptNumber: this.aptNumber,
      specialties: this.specialties,
      practiceDuartion: {},
      practiceDuration: this.practiceDuration,
      consultationRate: this.consultationRate,
      graduationYear: this.graduationYear,
      licenseIssuer: this.licenseIssuer,
      licensePeriod: this.licensePeriod,
      education: this.educations,
      boardLicenses: this.licenses,
      location: this.locations,
      employmentType: this.employmentType,
    };
  }
  get payloadEdit() {
    const [firstName, lastName] = this.name.split(" ");
    const special = this.specialties.map((data: any) => {
      this.newspecialties = [data.id];
      return {
        ...data,
      };
    });
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
      services: this.newservices,
      nationality: this.nationality,
      country: this.country,
      state: this.state,
      city: this.city,
      postCode: this.postCode,
      aptNumber: this.aptNumber,
      specialties: this.newspecialties,
      practiceDuration: {
        value: this.practiceDurationvalue,
        unit: this.practiceDurationunit,
      },
      consultationRate: this.consultationRate,
      graduationYear: this.graduationYear,
      licenseIssuer: this.licenseIssuer,
      licensePeriod: this.licensePeriod,
      availableForOnlineBooking: this.makeAvailable === "on" ? true : false,
    };
  }

  async saveSepcailty() {
    await this.fetchSpecials();
    await this.fetchPractitioners();
  }
  getLocationName(id: string) {
    const pt = this.locations.find((i: any) => i.id === id);
    return pt ? `${pt.name}` : "";
  }
  getRoleName(id: string) {
    const pt = this.roles.find((i: any) => i.id === id);
    return pt ? `${pt.name}` : "";
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
    const payload = { ...this.payloadEdit, id: this.id };
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
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message:
        "Are you sure you want to delete this location role? This action cannot be undone.",
      title: "Delete location role",
    });
    if (!confirmed) return;
    const url = `/api/v1/practitioner/location-roles/${this.id}`;
    const payload = [id];
    try {
      const response = await cornieClient().delete(url, payload);
      if (response.success) {
        window.notify({ msg: "Location role deleted", status: "success" });
        this.updatePractitioners([response.data]);
        await this.fetchPractitioners();
        // this.$router.back();
      }
    } catch (error) {
      window.notify({ msg: "Location role not deleted", status: "error" });
    }
  }

  getSpecialityName(id: string) {
    const pt = this.specials.find((i: any) => i.id === id);
    return pt ? `${pt.name}` : "";
  }

  async setDropdown() {
    const data = await this.getDropdowns("practitioner");
    this.dropdown = data;

    console.log(data);
  }
  async created() {
    this.fetchSpecials();
    this.setPractitioner();
    this.setDropdown();
    await this.fetchPractitioners();
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
