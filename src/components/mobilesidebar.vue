<template>
  <cornie-dialog v-model="show" left class="w-9/12 h-full animated fadeIn z-50">
    <cornie-card height="100%" class="flex flex-col animated fadeInUp">
      <cornie-card-title class="w-full p-3">
        <div class="w-full">
          <h2 class="font-extrabold float-left text-xl text-black ml-3 -mt-1">
            Nav
          </h2>
          <close-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <ul class="w-full p-3">
          <li class="w-full mb-5">
            <router-link
              to="/"
              class="flex space-x-4 items-center text-black font-medium"
            >
              <home-icon />
              <span>Home</span>
            </router-link>
          </li>
          <li class="w-full mb-5">
            <router-link
              to="/"
              class="flex space-x-4 items-center text-black font-medium"
            >
              <calendar-icon class="text-blue-600 fill-current" />
              <span>Appointments</span>
            </router-link>
          </li>
          <li class="w-full mb-5">
            <router-link
              to="/"
              class="flex space-x-4 items-center text-black font-medium"
            >
              <specialist-icon class="text-danger fill-current" />
              <span>Specialist Referrals</span>
            </router-link>
          </li>
          <li class="w-full mb-5">
            <router-link
              to="/"
              class="flex space-x-4 items-center text-black font-medium"
            >
              <visit-icon class="text-blue-600 fill-current" />
              <span>Visits</span>
            </router-link>
          </li>
          <li class="w-full mb-5">
            <router-link
              to="/"
              class="flex space-x-4 items-center text-black font-medium"
            >
              <health-icon class="text-yellow-400 fill-current" />
              <span>Health Records</span>
            </router-link>
          </li>
          <li class="w-full mb-5">
            <router-link
              to="/"
              class="flex space-x-4 items-center text-black font-medium"
            >
              <lab-icon class="text-green-400 fill-current" />
              <span>Labs & Imaging</span>
            </router-link>
          </li>
          <li class="w-full mb-5">
            <router-link
              to="/"
              class="flex space-x-4 items-center text-black font-medium"
            >
              <medication-icon class="text-purple-800 fill-current" />
              <span>Medications</span>
            </router-link>
          </li>

          <li class="w-full mb-5">
            <router-link
              to="/"
              class="flex space-x-4 items-center text-black font-medium"
            >
              <bill-icon class="text-blue-400 fill-current" />
              <span>Bills & Payments</span>
            </router-link>
          </li>
          <li class="w-full mb-5">
            <router-link
              to="/"
              class="flex space-x-4 items-center text-black font-medium"
            >
              <message-icon class="text-green-400 fill-current" />
              <span>Messages</span>
            </router-link>
          </li>

          <li class="w-full mb-7">
            <div class="flex w-full justify-between">
              <div>
                <span
                  class="font-bold text-black cursor-pointer"
                  @click="showOthers = !showOthers"
                  >Others</span
                >
              </div>
              <div>
                <chevron-down-icon
                  v-if="showOthers"
                  @click="showOthers = false"
                  class="cursor-pointer stroke-current text-primary"
                />
                <chevron-right-icon
                  @click="showOthers = !showOthers"
                  v-else
                  class="cursor-pointer stroke-current text-primary"
                />
              </div>
            </div>
            <div v-if="showOthers" class="w-full">
              <div class="flex space-x-4 items-center py-3">
                <router-link
                  to="/"
                  class="flex space-x-4 items-center text-black font-medium"
                >
                  <question-icon class="text-danger fill-current" />
                  <span>Questionnaires</span>
                </router-link>
              </div>
              <div class="flex space-x-4 items-center py-3">
                <router-link
                  to="/"
                  class="flex space-x-4 items-center text-black font-medium"
                >
                  <onetime-icon class="text-purple-800 fill-current" />
                  <span>One-Time Access</span>
                </router-link>
              </div>
              <div class="flex space-x-4 items-center py-3">
                <router-link
                  to="/"
                  class="flex space-x-4 items-center text-black font-medium"
                >
                  <healthaccess-icon class="text-primary fill-current" />

                  <span>Health Insurance</span>
                </router-link>
              </div>
              <div class="flex space-x-4 items-center py-3">
                <router-link
                  to="/"
                  class="flex space-x-4 items-center text-black font-medium"
                >
                  <reffer-icon class="text-yellow-400 fill-current" />
                  <span>Referrals</span>
                </router-link>
              </div>
            </div>
          </li>
        </ul>
      </cornie-card-text>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
  import CornieCard from "@/components/cornie-card";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieIconBtn from "@/components/CornieIconBtn.vue";
  import IconInput from "@/components/IconInput.vue";
  import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
  import ChevronDownIcon from "@/components/icons/chevrondown.vue";
  import ChevronRightIcon from "@/components/icons/dialogchevronright.vue";
  import OrgIcon from "@/components/icons/org.vue";
  import SearchIcon from "@/components/icons/search.vue";
  import { AccountMeta } from "@/types/user";
  import { Options, Vue } from "vue-class-component";
  import { PropSync } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import SidebarLink from "./sidebarlinkpatient.vue";

  import BillIcon from "./icons/billpayment.vue";
  import CalendarIcon from "./icons/calendar.vue";
  import HealthaccessIcon from "./icons/healthaccess.vue";
  import HealthIcon from "./icons/healthrecord.vue";
  import HomeIcon from "./icons/home.vue";
  import LabIcon from "./icons/labs.vue";
  import MedicationIcon from "./icons/medication.vue";
  import MessageIcon from "./icons/messagechat.vue";
  import OnetimeIcon from "./icons/onetimeaccss.vue";
  import QuestionIcon from "./icons/questionair.vue";
  import RefferIcon from "./icons/reffer.vue";
  import SpecialistIcon from "./icons/specialist.vue";
  import VisitIcon from "./icons/visits.vue";

  import CloseIcon from "@/components/icons/CloseIconBlue.vue";

  const user = namespace("user");

  type INav = { name: string; to: string; icon: string };

  interface ISidebarLink {
    name: string;
    to: string | { name: string };
    icon?: string;
    hasSubsection: boolean;
    children?: ISidebarLink[];
  }

  @Options({
    name: "SettingsSidebar",
    components: {
      ...CornieCard,
      CornieIconBtn,
      ArrowLeftIcon,
      CornieDialog,
      SidebarLink,
      IconInput,
      OrgIcon,
      SearchIcon,
      CloseIcon,
      HomeIcon,
      CalendarIcon,
      SpecialistIcon,
      VisitIcon,
      HealthIcon,
      BillIcon,
      LabIcon,
      MedicationIcon,
      MessageIcon,
      RefferIcon,
      ChevronDownIcon,
      ChevronRightIcon,
      QuestionIcon,
      OnetimeIcon,
      HealthaccessIcon,
    },
  })
  export default class Settings extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @user.Getter
    accountMeta!: AccountMeta;

    query = "";
    open = 0;
    showOthers = true;

    get links() {
      let links: ISidebarLink[];
      if (!this.accountMeta.practiceType) links = [] as ISidebarLink[];
      links = this.patientLinks;
      //links = getPracticeNav(this.accountMeta.practiceType);
      const accType = "patient";
      return links.map((link) => {
        return {
          ...link,
          to: `/dashboard/${accType}/${link.to}/`,
        };
      });
    }

    patientLinks: ISidebarLink[] = [
      {
        name: "Patient-Dashboard",
        to: "home",
        icon: "dashboard-icon",
        hasSubsection: false,
      },
      {
        name: "Appointments",
        to: "appointments",
        icon: "calendar-icon",
        hasSubsection: false,
      },
      {
        name: "Specialist Referrals",
        to: "specialist",
        icon: "specialist-icon",
        hasSubsection: false,
      },
      {
        name: "Visits",
        to: "visits",
        icon: "visit-icon",
        hasSubsection: false,
      },
      {
        name: "Health Records",
        to: "health",
        icon: "health-icon",
        hasSubsection: false,
      },
      {
        name: "Labs & Imaging",
        to: "labs",
        icon: "lab-icon",
        hasSubsection: false,
      },
      {
        name: "Medications",
        to: "medications",
        icon: "medication-icon",
        hasSubsection: false,
      },

      {
        name: "Bills & Payments",
        to: "bills-account",
        icon: "bill-icon",
        hasSubsection: false,
      },
      {
        name: "Messages",
        to: "messages",
        icon: "message-icon",
        hasSubsection: false,
      },
      {
        name: "Others",
        to: "others",
        hasSubsection: true,
        children: [
          {
            name: "Questionnaires",
            to: "/dashboard/provider/settings/diagnostics",
            icon: "question-icon",
            hasSubsection: false,
          },
          {
            name: "One-Time Access",
            to: "/dashboard/provider/settings/virtual-lab-orders",
            icon: "onetime-icon",
            hasSubsection: false,
          },
          {
            name: "Health Insurance",
            to: "/dashboard/provider/settings/observations",
            icon: "health-icon",
            hasSubsection: false,
          },
        ],
      },
    ];

    get accType() {
      return this.$route.params.type as string;
    }

    clicked() {
      this.show = false;
    }
  }
</script>
<style scoped></style>
