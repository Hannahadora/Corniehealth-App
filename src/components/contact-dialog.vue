<template>
  <cornie-dialog
    v-model="show"
    right
    class="w-4/12 h-full animated fadeIn z-50"
  >
    <cornie-card height="100%" class="flex flex-col animated fadeInUp">
      <cornie-card-title class="w-full p-3">
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            {{ title }}
          </h2>
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <div class="flex flex-col h-full w-full overflow-auto max-h-full">
          <slot />
        </div>
      </cornie-card-text>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import OrgIcon from "@/components/icons/org.vue";
import SBarLink from "./sidebarlink.vue";
import ContactIcon from "@/components/icons/contactinfo.vue";
import LocationIcon from "@/components/icons/location.vue";
import HierarchyIcon from "@/components/icons/hierarchy.vue";
import BankIcon from "@/components/icons/bank.vue";
import SecurityIcon from "@/components/icons/security.vue";
import FormIcon from "@/components/icons/questionnaire.vue";
import DomainIcon from "@/components/icons/domain.vue";
import PractitionerIcon from "@/components/icons/practitioner.vue";
import GroupIcon from "@/components/icons/group.vue";
import TeamIcon from "@/components/icons/team.vue";
import RolesIcon from "@/components/icons/roles.vue";
import ApprovalIcon from "@/components/icons/approval.vue";
import HealthServiceIcon from "@/components/icons/healthservice.vue";
import TemplatesIcon from "@/components/icons/questionnaire.vue";
import DevicesIcon from "@/components/icons/devices.vue";
import PartnersIcon from "@/components/icons/partners.vue";
import ChevronRightIcon from "@/components/icons/dialogchevronright.vue";
import ChevronDownIcon from "@/components/icons/dialogchevrondown.vue";
import MarkupIcon from "@/components/icons/markup.vue";
import KycIcon from "@/components/icons/kyc.vue";

type INav = { name: string; to: string; icon: string };

@Options({
  name: "SettingsSidebar",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    SBarLink,
    ApprovalIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    FormIcon,
    IconInput,
    OrgIcon,
    LocationIcon,
    SearchIcon,
    KycIcon,
    HierarchyIcon,
    GroupIcon,
    SecurityIcon,
    HealthServiceIcon,
    BankIcon,
    PractitionerIcon,
    DomainIcon,
    ContactIcon,
    RolesIcon,
    TemplatesIcon,
    DevicesIcon,
    TeamIcon,
    PartnersIcon,
    MarkupIcon,
  },
})
export default class Settings extends Vue {
    @Prop({type: String, default: ""})
    title!: "" as String
}
</script>
