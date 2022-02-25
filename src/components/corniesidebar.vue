<template>
  <div @mouseover="hovered = true" @mouseleave="hovered = false">
    <div
      class="flex flex-col py-4 px-1 items-center min-h-screen h-screen bg-primary shadow-md fixed justify-center w-auto"
    >
      <div
        class="flex flex-row justify-between border-b-2 pb-1 items-center border-gray-300"
      >
        <img src="@/assets/img/logo.svg" />
        <h2 class="text-white text-xl font-semibold ml-1" v-if="hovered">
          CornieHealth
        </h2>
      </div>
      <div
        class="mt-5 flex h-3/4 gap-y-6 items-center w-full flex-col text-white text-lg overflow-y-auto"
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
            <component :is="link.icon"></component>
          </keep-alive>
        </sidebar-link>
      </div>
      <sidebar-link
        to="support"
        :hovered="hovered"
        text="Feedback & Support"
        class="mt-auto bg-opacity-20 bg-white text-white py-2 rounded-2xl w-full px-3"
      >
        <support-icon class="" />
      </sidebar-link>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DashboardIcon from "./icons/dashboard.vue";
import ScheduleIcon from "./icons/schedule.vue";
import BookIcon from "./icons/book.vue";
import ClinicIcon from "./icons/clinic.vue";
import ClipBoardIcon from "./icons/clipboard.vue";
import PillIcon from "./icons/pill.vue";
import MedalIcon from "./icons/medal.vue";
import DebitCardIcon from "./icons/debitcard.vue";
import WalletIcon from "./icons/wallet.vue";
import ChartIcon from "./icons/chart.vue";
import ReferIcon from "./icons/refer.vue";
import SupportIcon from "./icons/support.vue";
import PatientIcon from "./icons/PatientIcon.vue";
import SidebarLink from "./sidebarlink.vue";
import { namespace } from "vuex-class";
import { AccountMeta } from "@/types/user";
import { getPracticeNav } from "@/features/navigation";
import EPracticeType from "@/types/practice-type";

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
    PillIcon,
    ClipBoardIcon,
    PatientIcon,
  },
})
export default class CorniDashboardeSideBar extends Vue {
  hovered = false;

  @user.Getter
  accountMeta!: AccountMeta;

  get links() {
    let links: ISidebarLink[];
    if (!this.accountMeta.practiceType) links = [] as ISidebarLink[];
    links = getPracticeNav(this.accountMeta.practiceType);
    const accType = this.accType?.toLowerCase();
    return links.map((link) => {
      return {
        ...link,
        to: `/dashboard/${accType}/${link.to}/`,
      };
    });
  }

  providerLinks: ISidebarLink[] = [
    {
      name: "Dashboard",
      to: "home",
      icon: "dashboard-icon",
      hasSubsection: false,
    },
    {
      name: "Experience",
      to: "experience",
      icon: "patient-icon",
      hasSubsection: true,
      children: [
        { name: "Patients", to: { name: "Patients" }, hasSubsection: false },
         {
          name: "Calendar",
          to: "/dashboard/experience/calendar",
          hasSubsection: false,
        },
        {
          name: "Schedules",
          to: "/dashboard/experience/schedules",
          hasSubsection: false,
        },
        {
          name: "Appointments",
          to: { name: "Appointment" },
          hasSubsection: false,
        },
        {
          name: "Visits",
          to: "/dashboard/experience/visits",
          hasSubsection: false,
        },
        { name: "Requests", to: { name: "Requests" }, hasSubsection: false },
        { name: "Tasks", to: { name: "Tasks" }, hasSubsection: false },
        {
          name: "Messaging",
          to: "/dashboard/experience/messages",
          hasSubsection: false,
        },
        {
          name: "Satisfaction & Ratings",
          to: "/dashboard/experience/ratings",
          hasSubsection: false,
        },
        {
          name: "Questionaires",
          to: "/dashboard/experience/questionaires",
          hasSubsection: false,
        },
      ],
    },
    {
      name: "Clinical",
      to: "clinical",
      icon: "book-icon",
      hasSubsection: false,
    },
    {
      name: "In-Patient",
      to: "in-patient",
      icon: "clinic-icon",
      hasSubsection: false,
    },
    {
      name: "Diagnostics",
      to: "diagnostics",
      icon: "clip-board-icon",
      hasSubsection: false,
    },
    {
      name: "Medications",
      to: "medications",
      icon: "pill-icon",
      hasSubsection: true,
      children: [
        {
          name: "Markup",
          to: "/dashboard/provider/settings/markup",
          hasSubsection: false,
        },
        {
          name: "Catalogue",
          to: "catologue",
          hasSubsection: false,
        },
        {
          name: "Inventory",
          to: "inventory",
          hasSubsection: false,
        },
        {
          name: "Pricebook",
          to: "pricebook",
          hasSubsection: false,
        },
      ],
    },

    {
      name: "Bills & Payments",
      to: "bills",
      icon: "debit-card-icon",
      hasSubsection: false,
    },
    {
      name: "Accounting",
      to: "accounting",
      icon: "wallet-icon",
      hasSubsection: false,
    },
    {
      name: "Analytics",
      to: "analytics",
      icon: "chart-icon",
      hasSubsection: false,
    },
    { name: "Referrals", to: "refs", icon: "refer-icon", hasSubsection: false },
  ];

  hmoLinks: ISidebarLink[] = [
    {
      name: "Dashboard",
      to: "settings",
      icon: "dashboard-icon",
      hasSubsection: false,
    },
    {
      name: "Experience",
      to: "experience",
      icon: "refer-icon",
      hasSubsection: false,
    },
    {
      name: "Health Plans",
      to: "health-plans",
      icon: "book-icon",
      hasSubsection: false,
    },
    {
      name: "Bills & Payments",
      to: "bills",
      icon: "debit-card-icon",
      hasSubsection: false,
    },
    {
      name: "Accounting",
      to: "accounting",
      icon: "wallet-icon",
      hasSubsection: false,
    },
    {
      name: "Analytics",
      to: "analytics",
      icon: "chart-icon",
      hasSubsection: false,
    },
    {
      name: "Approvals",
      to: "analytics",
      icon: "chart-icon",
      hasSubsection: false,
    },
  ];

  get accType() {
    return this.$route.params.type as string;
  }
}
</script>
