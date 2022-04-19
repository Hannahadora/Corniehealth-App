<template>
  <div
    class="h-screen w-full overflow-auto max-h-full clinical-nav"
    style="scroll-snap-type: y mandatory"
  >
    <div class="containers" style="scroll-snap-align: start">
      <div class="rounded-lg bg-white shadow-md w-full">
        <div class="flex -mb-12 justify-center">
          <avatar class="mr-2 h-24 w-24 m-5" :src="profilePhoto" />
        </div>
        <div class="text-gray-400 -mb-6 text-center text-xs p-8">
          <span class="text-sm text-black font-bold">{{ items.fullname }}</span>
          | {{ items.email }} <br />
          <p>MRN-{{ items.mrn }}</p>
          <p>
            {{ items.dob }}
          </p>
          <p>
            Blood Type:
            <span class="text-sm text-black font-light">A+ | </span>
            <span
              >Genotype: <span class="text-sm text-black font-light">AA</span>
            </span>
          </p>
        </div>
        <div class="border-dashed border-2 border-gray-100 m-3"></div>
        <div>
          <div class="flex justify-between -mb-2 space-x-2 p-3">
            <p class="text-xs text-gray-400 flex">
              Policy IDs <eye-icon class="ml-2" />
            </p>
            <p class="text-xs text-black flex">{{ items.my_policyId }}</p>
          </div>
          <div class="flex justify-between -mb-2 space-x-2 p-3">
            <p class="text-xs text-gray-400">Expires</p>
            <p class="text-xs text-black flex">{{ items.the_policyExpiry }}</p>
          </div>
          <div class="flex justify-between space-x-2 p-3">
            <p class="text-xs text-gray-400">Primary Physician</p>
            <p class="text-xs text-black flex">
              {{ items.authorizedPractitioner.firstName }}
            </p>
          </div>
        </div>

        <div
          class="experience-links-con"
          :class="{
            'experience-links-con-max': showFullHeight,
            'experience-links-con-min': !showFullHeight,
          }"
        >
          <div class="border-dashed border-2 border-gray-100 m-3"></div>
          <div>
            <div class="flex justify-between -mb-2 space-x-2 p-3">
              <p class="text-xs text-gray-400 flex">
                Policy IDs <eye-icon class="ml-2" />
              </p>
              <p class="text-xs text-black flex">{{ items.my_policyId }}</p>
            </div>
            <div class="flex justify-between -mb-2 space-x-2 p-3">
              <p class="text-xs text-gray-400">Expires</p>
              <p class="text-xs text-black flex">
                {{ items.the_policyExpiry }}
              </p>
            </div>
            <div class="flex justify-between space-x-2 p-3">
              <p class="text-xs text-gray-400">Primary Physician</p>
              <p class="text-xs text-black flex">
                {{ items.authorizedPractitioner.firstName }}
              </p>
            </div>
          </div>

          <div
            class="experience-links-con"
            :class="{
              'experience-links-con-max': showFullHeight,
              'experience-links-con-min': !showFullHeight,
            }"
          >
            <div class="border-dashed border-2 border-gray-100 m-3"></div>
            <div>
              <div class="flex justify-between -mb-2 space-x-2 p-3">
                <p class="text-xs text-gray-400 flex">Mobile</p>
                <p class="text-xs text-black flex">{{ items.phone }}</p>
              </div>
              <div class="flex justify-between -mb-2 space-x-2 p-3">
                <p class="text-xs text-gray-400">Email</p>
                <p class="text-xs text-black flex">{{ items.email }}</p>
              </div>
              <div class="flex justify-between space-x-2 p-3">
                <p class="text-xs text-gray-400">Address</p>
                <p class="text-xs text-black flex">{{ items.address }}</p>
              </div>
            </div>
            <div class="border-dashed border-2 border-gray-100 m-3"></div>
            <div>
              <div class="flex justify-between -mb-2 space-x-2 p-3">
                <p class="text-xs text-gray-400 flex">Last Visited</p>
                <p class="text-xs text-black flex">{{ items.lastVisited }}</p>
              </div>
              <div class="flex justify-between -mb-2 space-x-2 p-3">
                <p class="text-xs text-gray-400">Active Since</p>
                <p class="text-xs text-black flex">{{ items.activeSince }}</p>
              </div>
            </div>
          </div>
        </div>
        <span
          @click="() => (showFullHeight = !showFullHeight)"
          class="text-danger more font-bold cursor-pointer p-5 text-sm flex justify-center"
          >{{ showFullHeight ? "See less" : "See more" }}</span
        >
      </div>
    </div>

    <div class="containers sticky" style="scroll-snap-align: start">
      <div
        class="mt-2 mb-5 rounded-lg bg-white shadow-md w-full h-full max-h-full"
      >
        <div class="w-full h-full p-2 pb-6">
          <div
            class="grid w-full pr-2 gap-y-9"
            style="grid-template-rows: 10% 85%; max-height: 77vh"
          >
            <div class="flex flex-col w-full">
              <p class="text-black font-bold py-3 px-2">Records</p>
              <icon-input
                autocomplete="off"
                type="search"
                v-model="query"
                placeholder="Search"
                class="rounded-full w-full border-2 py-2 px-8 focus:outline-none"
              >
                <template v-slot:prepend>
                  <search-icon />
                </template>
              </icon-input>
            </div>
            <div
              class="mt-3 overflow-y-auto nav-list"
              v-for="(setting, key, i) in settings"
              :key="i"
            >
              <span>
                <div class="flex flex-col mt-1 text-gray-500">
                  <s-bar-link
                    class="mb-3"
                    :name="item.name"
                    :to="mapUrl(item.to)"
                    v-for="(item, index) in setting"
                    :key="index"
                  >
                    <template v-slot="{ active }">
                      <keep-alive>
                        <component
                          :is="item.icon"
                          :class="{ 'fill-current': active }"
                        ></component>
                      </keep-alive>
                    </template>
                  </s-bar-link>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";
import IconInput from "@/components/IconInput.vue";
import Avatar from "@/components/avatar.vue";
import SearchIcon from "@/components/icons/search.vue";
import { useHandleImage } from "@/composables/useHandleImage";
import SBarLink from "./sidebarlink.vue";
import ApprovalIcon from "@/components/icons/approval.vue";
import TrendIcon from "@/components/icons/ehrtrend.vue";
import MedicalIcon from "@/components/icons/ehrmedical.vue";
import AllergyIcon from "@/components/icons/ehrallergy.vue";
import AppointIcon from "@/components/icons/ehrappointments.vue";
import VisitIcon from "@/components/icons/ehrvisits.vue";
import VitalIcon from "@/components/icons/ehrvital.vue";
import EncounterIcon from "@/components/icons/ehrencounter.vue";
import ConditionIcon from "@/components/icons/ehrcondition.vue";
import MedicationIcon from "@/components/icons/ehrmedication.vue";
import DiagIcon from "@/components/icons/ehrdiag.vue";
import ProceedIcon from "@/components/icons/ehrprocedure.vue";
import RefferIcon from "@/components/icons/ehrreffer.vue";
import CareIcon from "@/components/icons/ehrcare.vue";
import ImpressionIcon from "@/components/icons/ehrimpression.vue";
import BillIcon from "@/components/icons/ehrbill.vue";
import CorrespondIcon from "@/components/icons/ehrcorrespond.vue";
import AttachIcon from "@/components/icons/ehrattach.vue";
import ChevronRightIcon from "@/components/icons/chevronright.vue";
import ChevronDownIcon from "@/components/icons/chevrondownprimary.vue";
import eyeIcon from "@/components/icons/yelloweye.vue";
import PartnersIcon from "@/components/icons/partners.vue";
import PlanIcon from "@/components/icons/plan.vue";
import { namespace } from "vuex-class";
import { Demographics, Guarantor, IPatient } from "@/types/IPatient";
import { Prop, Ref } from "vue-property-decorator";
const patients = namespace("patients");
type INav = { name: string; to: string; icon: string };
@Options({
  name: "ClinicalSidebar",
  components: {
    SBarLink,
    ApprovalIcon,
    Avatar,
    eyeIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    IconInput,
    SearchIcon,
    ImpressionIcon,
    RefferIcon,
    TrendIcon,
    PartnersIcon,
    MedicalIcon,
    AllergyIcon,
    AppointIcon,
    VisitIcon,
    PlanIcon,
    VitalIcon,
    EncounterIcon,
    ConditionIcon,
    MedicationIcon,
    DiagIcon,
    ProceedIcon,
    CareIcon,
    BillIcon,
    CorrespondIcon,
    AttachIcon,
  },
})
export default class Settings extends Vue {
  showFullHeight = false;
  expand = false;
  query = "";
  open = 0;
  @Prop({ type: Object, required: true })
  patient!: IPatient;
  get profilePhoto() {
    return this.patient.profilePhoto;
  }
  img = setup(() => useHandleImage());
  get organization() {
    return [
      { name: "Health Trend", to: "health-trend", icon: "trend-icon" },
      {
        name: "History",
        to: "history",
        icon: "medical-icon",
      },
      {
        name: "Allergies (Intolerance)",
        to: "allergy",
        icon: "allergy-icon",
      },
      { name: "Vital Signs", to: "vital-signs", icon: "vital-icon" },
      { name: "Condition/Problem", to: "condition", icon: "condition-icon" },
      {
        name: "Appointments",
        to: "appointments",
        icon: "appoint-icon",
      },
      { name: "Visits", to: "visits", icon: "visit-icon" },
      { name: "Encounter", to: "encounter", icon: "encounter-icon" },
      {
        name: "Clinical Impression",
        to: "clinical-impressions",
        icon: "impression-icon",
      },
      { name: "Medications", to: "medications", icon: "medication-icon" },
      { name: "Diagnostics", to: "diagnostics", icon: "diag-icon" },
      { name: "DetectedIssues", to: "detectedissues", icon: "diag-icon" },
      { name: "Procedure", to: "procedure", icon: "proceed-icon" },
      { name: "Referral", to: "referral", icon: "reffer-icon" },
      { name: "Care Team", to: "care-team", icon: "care-icon" },
      { name: "Care Partners", to: "care-partners", icon: "partners-icon" },
       { name: "Care Plan", to: "care-plan", icon: "plan-icon" },
      { name: "Billing Data", to: "billing-data", icon: "bill-icon" },
      { name: "Correspondence", to: "correspondence", icon: "correspond-icon" },
      { name: "Attachments", to: "attachments", icon: "attach-icon" },
      {
        name: "Progress Notes",
        to: "progress-notes/",
        icon: "proceed-icon",
      },
      {
        name: "Risk Assesment",
        to: "/risk-assessment/",
        icon: "diag-icon",
      },
    ];
  }
  get settings() {
    const provider = {
      Organization: this.filter(this.organization),
    };
    return provider;
  }

  get fullname() {
    const name = `${this.patient.firstname} ${this.patient.lastname}`;
    return name;
  }

  mapUrl(url: string) {
    const settingsBase = this.$router.resolve({ name: "EHR" }).href;
    // const settingsBase = this.$router.resolve({ name: "Patient EHR" }).href;
    return `${settingsBase}/${url}`.replace("//", "/");
  }
  filter(navs: INav[]) {
    if (!this.query) return navs;
    return navs.filter((nav) =>
      nav.name.toLowerCase().includes(this.query.toLowerCase())
    );
  }
  get ppp() {
    const current_patient = this.patient;
    return this.printPhone(current_patient);
  }
  get policies() {
    const current_patient = this.patient;
    return this.printPolicyId(current_patient);
  }
  get PrimaryPhysician() {
    const current_patient = this.patient;
    if (current_patient.authorizedPractitioners?.length == 0) return "N/A";
    const my_primaryPhysician = current_patient.authorizedPractitioners;
    return my_primaryPhysician;
  }
  get items() {
    // const name =  `${this.patient.firstname} ${this.patient.lastname}`
    // return name;
    const current_patient = this.patient;
    return {
      code: current_patient?.id,
      fullname: `${current_patient?.firstname} ${current_patient?.lastname}`,
      email: this.printEmail(current_patient),
      address: this.printAddress(current_patient),
      phone: this.printPhone(current_patient),
      dob: this.printDOB(current_patient?.dateOfBirth),
      mrn: this.printMRN(current_patient?.mrn),
      my_policyId: this.printPolicyId(current_patient),
      the_policyExpiry: this.printPolicyExpiry(current_patient),
      authorizedPractitioner: this.printPrimaryPhysician(current_patient),
    };
  }
  printPhone(patient: IPatient) {
    if (!patient?.contactInfo) return "N/A";
    const phone = patient?.contactInfo[0].phone;
    return phone?.number || "N/A";
  }
  printGender(gender: string) {
    if (!gender) return "N/A";
    return gender || "N/A";
  }
  printEmail(patient: IPatient) {
    if (!patient?.contactInfo) return "N/A";
    return patient?.contactInfo[0].email || "N/A";
  }
  printAddress(patient: IPatient) {
    if (!patient?.contactInfo) return "N/A";
    return patient?.contactInfo[0].primaryAddress || "N/A";
  }
  printDOB(dateOfBirth?: string) {
    if (!dateOfBirth) return "N/A";
    const date = new Date(dateOfBirth);
    return date.toLocaleDateString("en-NG");
  }
  printLastVisited(updatedAt?: string) {
    if (!updatedAt) return "N/A";
    const date = new Date(updatedAt);
    return date.toLocaleDateString("en-NG");
  }
  printactiveSince(createdAt?: string) {
    if (!createdAt) return "N/A";
    const date = new Date(createdAt);
    return date.toLocaleDateString("en-NG");
  }
  printMRN(mrn?: string) {
    return `${mrn?.substr(31)}`;
  }
  printPolicyId(patient: IPatient) {
    if (!patient?.insurances?.length) return "N/A";
    const policyNumber = patient?.insurances[0].policyNo;
    return policyNumber || "N/A";
  }
  printPolicyExpiry(patient: IPatient) {
    if (!patient?.insurances?.length) return "N/A";
    const policyExpiry = new Date(patient?.insurances[0].policyExpiry);
    return policyExpiry?.toLocaleDateString("en-Ng");
  }
  printPrimaryPhysician(patient: IPatient) {
    if (!patient?.authorizedPractitioners?.length) return "N/A";
    const ret = patient?.authorizedPractitioners[0].user;
    return ret;
  }
  //
}
</script>
<style scoped>
.experience-links-con-max {
  height: 225px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
.experience-links-con-min {
  height: 10px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
.clinical-nav::-webkit-scrollbar {
  display: none;
}
</style>
