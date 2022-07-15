<template>
  <div class="h-full w-full flex-grow" style="overflow: auto">
    <h1 class="text-primary text-lg capitalize font-extrabold mb-4">
      {{ title }}
    </h1>
    <cornie-card class="my-5 mr-4">
      <cornie-card-title
        class="cursor-pointer"
        @click="togglePatientInformation"
      >
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
        <v-form>
          <div
            class="flex justify-between items-center px-4 border-t-2 border-gray pt-5"
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
              label="Last Name"
              placeholder="Enter"
              v-model="lastName"
              :rules="requiredRule"
              :readonly="viewOnly"
            />
            <auto-complete
              class="w-full"
              v-model="nationality"
              label="Nationality"
              :items="nationState.countries"
              placeholder="Enter"
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
              label="Sex"
              :rules="requiredRule"
              placeholder="Select One"
              :items="genderOptions"
              v-model="gender"
              :readonly="viewOnly"
            />
            <cornie-select
              class="w-full"
              label="Blood Group"
              placeholder="Select One"
              :items="bloodGroupOptions"
              v-model="bloodGroup"
              :readonly="viewOnly"
            />
            <cornie-select
              label="Genotype"
              class="w-full"
              placeholder="Enter"
              v-model="genotype"
              :items="genotypeOptions"
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
              <template #labelicon>
                <cornie-tooltip>
                  <template #tooltip>
                    <span>Marital status</span>
                  </template>
                  <question-icon
                    class="fill-current text-primary leading-none"
                  />
                </cornie-tooltip>
              </template>
              <template #label> Marital status </template>
            </cornie-select>

            <cornie-input
              label="Number of Children"
              class="w-full"
              placeholder="Enter"
              v-model="numberOfChildren"
              :readonly="viewOnly"
            >
            </cornie-input>
            <cornie-select
              class="w-full"
              label="Multiple Birth?"
              placeholder="Select One"
              :items="multipleBirthOptions"
              v-model="multipleBirth"
              :readonly="viewOnly"
            />
            <cornie-input
              v-if="multipleBirth == 'yes'"
              class="w-full"
              placeholder="Enter"
              v-model.number="multipleBirthInteger"
              type="number"
              :rules="multipleBirthRule"
              :readonly="viewOnly"
              label="Number of Multiple Births"
            >
              <template #labelicon>
                <cornie-tooltip>
                  <template #tooltip>
                    <span>Number of multiple births</span>
                  </template>
                  <info-icon class="fill-current text-primary" />
                </cornie-tooltip>
              </template>
            </cornie-input>
          </div>
          <div class="flex justify-end m-5" v-if="!viewOnly">
            <cornie-btn
              loading-color="white"
              type="button"
              @click="saveBasic"
              class="bg-primary text-white px-6 py-1 rounded-md"
            >
              Save
            </cornie-btn>
          </div>
        </v-form>
      </cornie-card-text>
    </cornie-card>

    <cornie-card class="my-5 mr-4">
      <cornie-card-title class="cursor-pointer" @click="togglePatientIdentity">
        <h1 class="text-lg font-extrabold">Identity</h1>
        <cornie-spacer />
        <span v-if="viewOnly" class="cursor-pointer mr-2" @click="markEditable">
          Edit
        </span>
        <completed-icon v-if="!viewOnly && basicCompleted" class="mr-2" />
        <icon-btn @click="togglePatientIdentity">
          <chevron-down-icon v-if="showPatientIdentity" />
          <chevron-right-icon v-else />
        </icon-btn>
      </cornie-card-title>

      <!-- Patient Identity and association -->
      <cornie-card-text :class="{ hidden: !showPatientIdentity }">
        <v-form ref="basic">
          <div class="grid grid-cols-12">
            <div class="col-span-4">
              <cornie-input
                :readonly="viewOnly"
                class="w-full"
                placeholder="Enter"
                label="Identity No"
                v-model="idNumber"
                :rules="requiredRule"
              >
                <template #prepend class="0">
                  <!-- <cornie-menu class="cursor-pointer">
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
                  </cornie-menu> -->
                  <div>
                    {{ idType }}
                  </div>
                </template>
              </cornie-input>
            </div>
          </div>
          <!-- <button
            class="flex flex-row items-center w-full mt-5"
            type="button"
            @click="showAssociationsDialog = true"
          >
            <h1 class="text-sm font-bold text-red-500 mr-3">
              ADD ASSOCIATIONS
            </h1>
            <div>
              <plus-icon />
            </div>
          </button> -->
          <!-- <div class="my-4" v-if="allAssociations.length">
            <div class="flex">
              <template
                v-for="(assoc, index) in allAssociations"
                :key="assoc.id"
              >
                <div
                  class="flex items-center px-3"
                  :class="
                    index !== associations.length - 1
                      ? 'border-r border-gray-400'
                      : ''
                  "
                >
                  <div class="flex items-center mr-10">
                    <div
                      class="w-8 h-8 p-4 rounded-full bg-blue-500 text-white mr-2 flex justify-center items-center"
                    >
                      {{ assoc.name.substr(0, 2).toUpperCase() }}
                    </div>
                    <div class="flex-1">
                      <h1 class="text-sm">{{ assoc.name }}</h1>
                      <h1 class="text-xs">
                        {{ assoc.associationType }}\{{ assoc.relationship }}
                      </h1>
                    </div>
                  </div>
                  <button type="button" @click="delAssoc(assoc.id)">
                    <delete-icon />
                  </button>
                </div>
              </template>
            </div>
          </div> -->
          <div class="flex justify-end m-5" v-if="!viewOnly">
            <cornie-btn
              type="button"
              @click="saveIdentity"
              class="bg-primary text-white px-10 py-1 rounded-md"
            >
              Save
            </cornie-btn>
          </div>
        </v-form>
      </cornie-card-text>
    </cornie-card>

    <cornie-card class="my-5 mr-4">
      <cornie-card-title class="cursor-pointer" @click="toggleContactInfo">
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
      <cornie-card-title
        class="cursor-pointer"
        @click="toggleOptionalInformation"
      >
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
            type="button"
            class="bg-primary text-white px-10 py-1"
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
        type="button"
        @click="submit"
        :loading="loading"
      >
        Register New
      </cornie-btn>
    </div>

    <emergency-contact-dialog
      @allContacts="allContacts"
      :patient="patient"
      v-model="showEmergencyContactDialog"
    />

    <!-- Now Links -->
    <links-dialog
      :patient="patient"
      @links="links"
      v-model:guarantor="guarantor"
      v-model="showGuarantorDialog"
    />
    <association-dialog
      :associtions="associations"
      :patient="patient"
      v-model="showAssociationsDialog"
      @add-associations="addAssociations"
    />
    <!-- Now Payment account -->
    <payment-dialog
      v-model="addPaymentsDialog"
      @setSeconinsurance="setSeconinsurance"
    />

    <providers-dialog
      :patient="patient"
      @add-providers="addproviders"
      v-model:labs="labs"
      v-model:pharmacies="pharmacies"
      v-model="showProvidersDialog"
    />
    <demographics-dialog
      :patient="patient"
      @data-sent="datasent"
      v-model:demographics="demographics"
      v-model="showDemographicsDialog"
    />

    <!-- Now primary doctor -->
    <practitioners-dialog
      :patient="patient"
      @added-pract="addedpract"
      v-model="showPractitionersDialog"
      v-model:practitioners="practitioners"
    />
  </div>
</template>

<script lang="ts">
  import { useCountryStates } from "@/composables/useCountryStates";
  import { cornieClient } from "@/plugins/http";
  import { Field } from "vee-validate";
  import { Options, setup, Vue } from "vue-class-component";
  import { Prop, Ref } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { array, date, number, string } from "yup";

  import { IPatient } from "@/types/IPatient";

  import AutoComplete from "@/components/autocomplete.vue";
  import CornieAvatarField from "@/components/cornie-avatar-field/CornieAvatarField.vue";
  import CornieCard from "@/components/cornie-card/index";
  import CornieBtn from "@/components/CornieBtn.vue";
  import IconBtn from "@/components/CornieIconBtn.vue";
  import CornieInput from "@/components/cornieinput.vue";
  import CornieMenu from "@/components/CornieMenu.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import CornieSpacer from "@/components/CornieSpacer.vue";
  import CustomCheckbox from "@/components/custom-checkbox.vue";
  import DatePicker from "@/components/datepicker.vue";
  import AddIcon from "@/components/icons/add.vue";
  import ChevronDownIcon from "@/components/icons/chevrondownprimary.vue";
  import ChevronRightIcon from "@/components/icons/chevronright.vue";
  import CompletedIcon from "@/components/icons/CompletedIcon.vue";
  import DeleteIcon from "@/components/icons/delete-red.vue";
  import DemographicIcon from "@/components/icons/DemographicIcon.vue";
  import EmergencyIcon from "@/components/icons/EmergencyIcon.vue";
  import GuarantorIcon from "@/components/icons/GuarantorIcon.vue";
  import InfoIcon from "@/components/icons/info-blue-bg.vue";
  import InsuranceIcon from "@/components/icons/InsuranceIcon.vue";
  import LinkIcon from "@/components/icons/LinkIcon.vue";
  import MedicalTeamIcon from "@/components/icons/MedicalTeamIcon.vue";
  import MedicineIcon from "@/components/icons/MedicineIcon.vue";
  import PlusIcon from "@/components/icons/plus.vue";
  import QuestionIcon from "@/components/icons/question.vue";
  import ScienceIcon from "@/components/icons/ScienceIcon.vue";
  import UrlIcon from "@/components/icons/UrlIcon.vue";
  import CornieTooltip from "@/components/tooltip.vue";

  import ContactInfo from "./contact-information.vue";
  import AssociationDialog from "./dialogs/AssociationDialog.vue";
  import DemographicsDialog from "./dialogs/DemographicsDialog.vue";
  import EmergencyContactDialog from "./dialogs/EmergencyContactDialog.vue";
  import LinksDialog from "./dialogs/LinksDialog.vue";
  import PaymentDialog from "./dialogs/PaymentDialog.vue";
  import PractitionersDialog from "./dialogs/PractitionersDialog.vue";
  import ProvidersDialog from "./dialogs/ProvidersDialog.vue";

  const patients = namespace("patients");

  @Options({
    name: "new-patient",
    components: {
      ...CornieCard,
      CornieTooltip,
      QuestionIcon,
      InfoIcon,
      CornieSpacer,
      ContactInfo,
      ChevronRightIcon,
      ChevronDownIcon,
      IconBtn,
      PractitionersDialog,
      AutoComplete,
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
      LinkIcon,
      DeleteIcon,

      EmergencyContactDialog,
      LinksDialog,
      ProvidersDialog,
      AssociationDialog,
      PaymentDialog,
      PlusIcon,
    },
  })
  export default class NewPatient extends Vue {
    showPatientInformation = true;
    showPatientIdentity = true;
    showContactInfo = true;
    showOptionalInformation = false;
    idOptions = ["NIN"];
    genderOptions = [
      { code: "male", display: "Male" },
      { code: "female", display: "Female" },
      { code: "other", display: "Other" },
    ];
    multipleBirthOptions = [
      { code: "yes", display: "Yes" },
      { code: "no", display: "No" },
    ];
    bloodGroupOptions = [
      "A+",
      "A-",
      "B+",
      "B-",
      "O+",
      "O-",
      "AB+",
      "AB-",
      "NOT SURE",
    ];
    genotypeOptions = ["AA", "AS", "AC", "SS", "SC", "NOT SURE"];
    @patients.Action
    fetchPatients!: () => Promise<void>;

    @patients.State
    patients!: IPatient[];

    loading = false;

    nationality = "";
    numberOfChildren = "";
    genotype = "";

    vip = false;
    multipleBirth = "no";
    multipleBirthInteger = 0;
    gender = "";
    idType = "NIN";
    firstName = "";
    middleName = "";
    lastName = "";
    dateOfBirth = "";
    image = "";
    idNumber = "";
    bloodGroup = "";
    nationState = setup(() => useCountryStates());

    contacts = [];
    emergencyContacts = [] as any;
    providers = [] as any;
    guarantor = "";
    insurances = [] as any;
    labs = [] as any;
    pharmacies = [] as any;
    associations = [] as any;
    demographics = {};
    practitioners = [];

    maritalStatus = "";
    guarantorLength = 0;
    demographicsLength = 0;

    showEmergencyContactDialog = false;
    showGuarantorDialog = false;
    showAssociationsDialog = false;
    showInsuranceDialog = false;
    showProvidersDialog = false;
    showPractitionersDialog = false;
    showDemographicsDialog = false;
    addPaymentsDialog = false;

    contactsCompleted = false;

    requiredRule = string().required();
    numericRule = number();
    dobRule = date().max(
      new Date(),
      `Date must be on or before ${new Date().toLocaleDateString("en-NG")}`
    );
    multipleBirthRule = number().min(0).max(10);

    requiredArray = array().min(1);

    @Prop({ type: String, default: "" })
    id!: string;

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
      this.$router.push(
        `/dashboard/provider/experience/edit-patient/${this.id}`
      );
    }

    addAssociations(payload: any) {
      this.associations = [...payload, ...this.associations];
    }

    async delAssoc(id: string) {
      this.associations = this.associations.filter(
        (item: any) => item.id !== id
      );
    }

    get allAssociations() {
      return this.associations;
    }

    allContacts(value: any) {
      this.emergencyContacts.push(value);
    }
    addproviders(value: any, type: string) {
      if (type == "Pharmacy") {
        this.pharmacies.push(value);
      } else {
        this.labs.push(value);
      }
    }

    setSeconinsurance(value: any) {
      this.insurances.push(value);
    }
    addedpract(value: any) {
      this.practitioners = value;
    }
    datasent(value: any) {
      this.demographics = value;
      if (value || this.patient?.demographicsData) {
        this.demographicsLength = 1;
      }
    }
    links(value: string) {
      this.guarantor = value;
      if (value || this.patient?.guarantor) {
        this.guarantorLength = 1;
      }
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
          name: "Payment Accounts",
          icon: "insurance-icon",
          click: () => (this.addPaymentsDialog = true),
          number: this.patient?.insurances?.length || this.insurances.length,
        },
        {
          name: "Emergency Contact",
          icon: "emergency-icon",
          click: () => (this.showEmergencyContactDialog = true),
          number:
            this.patient?.emergencyContacts?.length ||
            this.emergencyContacts.length,
        },
        {
          name: "Providers",
          icon: "medicine-icon",
          click: () => (this.showProvidersDialog = true),
          number: this.providerLength,
        },
        {
          name: "Primary Doctor",
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
          number: this.demographicsLength,
        },
        {
          name: "Associations",
          icon: "link-icon",
          click: () => (this.showAssociationsDialog = true),
          number: this.allAssociations.length,
        },
      ];
    }

    togglePatientInformation() {
      this.showPatientInformation = !this.showPatientInformation;
    }

    togglePatientIdentity() {
      this.showPatientIdentity = !this.showPatientIdentity;
    }

    toggleContactInfo() {
      this.showContactInfo = !this.showContactInfo;
    }

    toggleOptionalInformation() {
      this.showOptionalInformation = !this.showOptionalInformation;
    }

    async submit() {
      // const report = await (this.$refs.basic as any).validate();
      // if (!report.valid) return;
      this.loading = true;
      if (this.id) await this.updateData();
      else await this.registerPatient();
      this.loading = false;
    }

    async saveIdentity() {
      if (this.id) {
        try {
          const response = await cornieClient().post(
            `/api/v1/patient/association/${this.id}`,
            this.associations
          );
          if (response.success) {
            window.notify({
              msg: "Identity added successfully updated",
              status: "success",
            });
          }
        } catch (error: any) {
          window.notify({ msg: error.response.data.message, status: "error" });
        }
      } else {
        window.notify({
          msg: "Identity added successfully updated",
          status: "success",
        });
      }
    }

    get payload() {
      const basicInfo = {
        firstname: this.firstName,
        lastname: this.lastName,
        associates: this.associations,
        middlename: this.middleName || undefined,
        multipleBirth: this.multipleBirth == "yes" ? true : false,
        multipleBirthInteger: this.multipleBirthInteger,
        gender: this.gender.toLowerCase(),
        genotype: this.genotype,
        nationality: this.nationality,
        maritalStatus: this.maritalStatus ? this.maritalStatus : undefined,
        vip: this.vip,
        dateOfBirth: this.dateOfBirth,
        bloodGroup: this.bloodGroup,
        identityNos: [{ type: this.idType, number: this.idNumber }],
        profilePhoto: this.image || undefined,
        accountType: "individual",
      };
      if (this.id) {
        (basicInfo.identityNos[0] as any).patientId = this.id;
        (basicInfo.identityNos[0] as any).id =
          this.patient!!.identityNos!![0].id;
      }
      const others = {
        contactInfo: this.contacts,
        emergencyContacts: this.emergencyContacts,
        preferredLabs: this.labs,
        preferredPharmacies: this.pharmacies,
        demographicsData: this.demographics,
        primaryDoctorDetails: this.practitioners,
        guarantor: this.guarantor ? this.guarantor : null,
        // insurances: this.insurances,
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
        const patient = response.data;
        this.updatePatient(patient);
        window.notify({ msg: "Patient added successfully", status: "success" });

        this.$router.push("/dashboard/provider/experience/patients");
      } catch (error: any) {
        window.notify({ msg: "Error creating Patient", status: "error" });
      }
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
        this.$router.go(-1);
      } catch (e: any) {
        window.notify({ msg: e?.response?.data?.message, status: "error" });
      }
    }

    async saveBasic() {
      if (this.id) {
        this.loading = true;
        await this.updateData();
        this.loading = false;
      } else {
        this.showPatientInformation = false;
        window.notify({
          msg: "Patient infromation Updated",
          status: "success",
        });
        this.basicCompleted = false;
      }
    }

    selectId(idOption: string) {
      this.idType = idOption;
    }

    get patient() {
      return this.patients.find((p) => p.id === this.id);
    }
    hydrate() {
      const patient = this.patient;
      if (!patient) return;
      this.firstName = patient.firstname;
      this.lastName = patient.lastname;
      this.middleName = patient.middlename || "";
      this.multipleBirth = patient.multipleBirths == false ? "no" : "yes";
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
