<template>
  <div @mouseover="hovered = true" @mouseleave="hovered = false">
      <div class="hidden md:flex flex-col py-4 px-1  items-center min-h-screen h-screen bg-white fixed justify-center"
        :class="[hovered ? 'w-auto' : 'w-auto']"
        >
        <div
            class="flex flex-row justify-between border-b-2 pb-1 items-center border-gray-300"
        >
            <img src="@/assets/img/logo.svg" />
            <h2 class="text-primary text-xl font-semibold ml-1" v-if="hovered">
            CornieHealth
            </h2>
        </div>
        <div
            class="mt-5 flex h-full gap-y-6 items-center w-full flex-col text-primary text-lg overflow-x-hidden overflow-y-auto"
        >
            <sidebar-link
            v-for="(link, i) in links"
            :key="i"
            :to="link.to"
            :text="link.name"
            :children="link.children"
            :hovered="hovered"
            :hasSubsection="link.hasSubsection"
            >
            <keep-alive>
                <component  :is="link.icon"></component>
            </keep-alive>
            </sidebar-link>
        </div>
      <sidebar-link
        to="support"
        :hovered="hovered"
        text="Referrals"
        class="mt-auto text-center justify-center flex bg-opacity-20 bg-blue-200 text-primary py-2 rounded-2xl w-full px-3"
      >
        <reffer-icon class="text-primary fill-current" />
      </sidebar-link>
    </div>
  </div>
</template>
<script lang="ts">
  import { AccountMeta } from "@/types/user";
  import { Options, Vue } from "vue-class-component";
  import { namespace } from "vuex-class";
  import BookIcon from "./icons/book.vue";
  import CategoriesIcon from "./icons/categories.vue";
  import ChartIcon from "./icons/chart.vue";
  import ClinicIcon from "./icons/clinic.vue";
  import ClipBoardIcon from "./icons/clipboard.vue";
  import DebitCardIcon from "./icons/debitcard.vue";
  import DashboardIcon from "./icons/home.vue";
  import MedalIcon from "./icons/medal.vue";
  import PatientIcon from "./icons/PatientIcon.vue";
  import PillIcon from "./icons/pill.vue";
  import PracticeIcon from "./icons/practiceIcon.vue";
  import ReferIcon from "./icons/refer.vue";
  import ScheduleIcon from "./icons/schedule.vue";
  import SupportIcon from "./icons/support.vue";
  import WalletIcon from "./icons/wallet.vue";
 
 import CalendarIcon from "./icons/calendar2.vue";
 import SpecialistIcon from "./icons/specialist.vue";
 import VisitIcon from "./icons/visits.vue";
 import HealthIcon from "./icons/healthrecord.vue";
 import LabIcon from "./icons/labs.vue";
 import MedicationIcon from "./icons/medication.vue";
 import BillIcon from "./icons/billpayment.vue";
 import MessageIcon from "./icons/messagechat.vue";
 import RefferIcon from "./icons/reffer.vue";


  import SidebarLink from "./sidebarlinkpatient.vue";

  interface ISidebarLink {
    name: string;
    to: string | { name: string };
    icon?: string;
    hasSubsection: boolean;
    children?: ISidebarLink[];
  }

  const user = namespace("user");

  @Options({
    components: {
      SidebarLink,
      SupportIcon,
      ChartIcon,
      ReferIcon,
      DebitCardIcon,
      WalletIcon,
      MedalIcon,
      DashboardIcon,
      ScheduleIcon,
      BookIcon,
      ClinicIcon,
      PracticeIcon,
      PillIcon,
      ClipBoardIcon,
      PatientIcon,
      CategoriesIcon,
      CalendarIcon,
      SpecialistIcon,
      VisitIcon,
      HealthIcon,
      LabIcon,
      MedicationIcon,
      BillIcon,
      MessageIcon,
      RefferIcon,
    },
  })
  export default class CorniPatinetDashboardeSideBar extends Vue {
    hovered = false;

    @user.Getter
    accountMeta!: AccountMeta;

    // @Prop({ type: Array, default: [] })
    // links!: ISidebarLink[];

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
        name: "Home",
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
        to: "specialist-refferal",
        icon: "specialist-icon",
        hasSubsection: false,
      },
      {
        name: "Visits",
        to: "visits-patients",
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
            name: "One Time Access",
            to: "one-time-access",
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
  }
</script>
