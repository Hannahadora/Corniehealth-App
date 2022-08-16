<template>
  <div
    class="bg-white mb-32 h-full overflow-x-hidden overflow-y-scroll shadow-lg p-6 mt-2 rounded-lg w-full"
  >
    <div class="flex font-semibold text-xl py-2">
      <icon-btn @click="$router.go(-1)" class="border-r px-2 mr-4">
        <arrow-left stroke="#ffffff" />
      </icon-btn>
      <h2>Access Control & Privileges</h2>
    </div>

    <div class="flex items-center justify-between">
      <p class="text-sm font-semibold py-10">
        Your account is part of a family account
      </p>
      <Button :loading="false" class="focus:outline-none">
        <span
          @click="leaveFamilyAccountModal = true"
          class="bg-red-500 cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-lg"
        >
          Leave Family Account
        </span>
      </Button>
    </div>

    <div class="w-full my-5">
      <div class="w-full curved py-2">
        <div>
          <h2 class="mb-2 font-semibold text-lg">Admin Access</h2>
          <p>
            <span>Control how your admin interacts with your account.</span>
          </p>
        </div>

        <div class="flex items-center my-9">
          <div class="w-1/2 mr-8 flex items-center">
            <p>
              Allow my admin to view and manage my profile, including personal
              health records?
            </p>
            <Tooltip
              class="text-white text-sm dropdown-menu"
              text="Yes by default. If turned No, Admin will no longer be able to navigate to your profile.
                "
            >
              <div class="text-black text-sm flex space-x-2">
                <tooltip-icon class="cursor-pointer" />
              </div>
            </Tooltip>
          </div>
          <div class="flex">
            <div class="mr-6">
              <cornie-radio
                :label="'Yes'"
                :value="true"
                v-model="access.allowAdminRecordAccess"
                name="allowAdminRecordAccess"
                @change="handleChange"
              />
            </div>
            <div class="">
              <cornie-radio
                :label="'No'"
                :value="false"
                v-model="access.allowAdminRecordAccess"
                name="allowAdminRecordAccess"
                @change="handleChange"
              />
            </div>
          </div>
        </div>

        <div class="flex items-center mb-9">
          <div class="w-1/2 mr-8 flex items-center">
            <p>Allow my admin to manage my healthcare finances?</p>
            <Tooltip
              class="text-white text-sm dropdown-menu"
              text="Yes by default. If turned No, the primary account will no longer be charged for transactions on this account.
                "
            >
              <div class="text-black text-sm flex space-x-2">
                <tooltip-icon class="cursor-pointer" />
              </div>
            </Tooltip>
          </div>
          <div class="flex mr-8">
            <div class="mr-6">
              <cornie-radio
                :label="'Yes'"
                :value="true"
                v-model="access.allowAdminFinanceAccess"
                name="allowAdminFinanceAccess"
                @change="handleChange"
              />
            </div>
            <div class="">
              <cornie-radio
                :label="'No'"
                :value="false"
                v-model="access.allowAdminFinanceAccess"
                name="allowAdminFinanceAccess"
                @change="handleChange"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="w-full curved py-2">
        <div>
          <h2 class="mb-2 font-semibold text-lg">
            Health Record Access Policy
          </h2>
          <p>
            <span>Manage and control access to your health records.</span>
          </p>
        </div>

        <div class="flex items-center my-9">
          <div class="w-1/2 mr-8 flex items-center">
            <p>
              Allow only pre-authorised Practices and Doctors access to my
              global PHR.
            </p>
            <Tooltip
              class="text-white text-sm dropdown-menu"
              text="This implies that all other physicians and providers (facilities) will create a new HR instance on registration..
                "
            >
              <div class="text-black text-sm flex space-x-2">
                <tooltip-icon class="cursor-pointer" />
              </div>
            </Tooltip>
          </div>
          <div class="flex mr-8">
            <div class="mr-6">
              <cornie-radio
                :label="'Yes'"
                :value="true"
                v-model="access.requireRegistrationApproval"
                name="requireRegistrationApproval"
                @change="handleChange"
              />
            </div>
            <div class="">
              <cornie-radio
                :label="'No'"
                :value="false"
                v-model="access.requireRegistrationApproval"
                name="requireRegistrationApproval"
                @change="handleChange"
              />
            </div>
          </div>
          <div>
            <span class="text-sm" style="color: #667499"
              >This excludes One-Time Access grants</span
            >
          </div>
        </div>

        <div class="flex items-center my-9">
          <div class="w-1/2 mr-8 flex items-center">
            <p>I want to approve every new registration by a practice.</p>
            <Tooltip
              class="text-white text-sm dropdown-menu"
              text="You will have to approve this registration before this provider can access your profile info. If this provider is not pre-authorized we will create a new HR instance which you can manage as you wish. In cases of emergencies, this provider will be given full access to your global HR.
                "
            >
              <div class="text-black text-sm flex space-x-2">
                <tooltip-icon class="cursor-pointer" />
              </div>
            </Tooltip>
          </div>
          <div class="flex mr-8">
            <div class="mr-6">
              <cornie-radio
                :label="'Yes'"
                :value="true"
                v-model="access.restrictUnauthorizedAccess"
                name="restrictUnauthorizedAccess"
                @change="handleChange"
              />
            </div>
            <div class="">
              <cornie-radio
                :label="'No'"
                :value="false"
                v-model="access.restrictUnauthorizedAccess"
                name="restrictUnauthorizedAccess"
                @change="handleChange"
              />
            </div>
          </div>
          <div>
            <span class="text-sm" style="color: #667499"
              >This excludes One-Time Access grants</span
            >
          </div>
        </div>
      </div>

      <div class="w-full curved py-2">
        <div>
          <h2 class="mb-2 font-semibold text-lg">Provider permissions</h2>
          <p>
            <span>Add permissions for providers</span>
          </p>
        </div>
      </div>

      <div class="w-full mt-6 mb-9 flex justify-end">
        <Button class="focus:outline-none mr-8">
          <span
            @click="inviteModal = true"
            style="background: #fff"
            class="text-primary curved border border-primary cursor-pointer focus:outline-none font-bold py-3 px-8 rounded-lg"
          >
            Invite New
          </span>
        </Button>
        <Button :loading="loading" class="focus:outline-none">
          <span
            @click="addModal = true"
            style="background: #fe4d3c"
            class="curved cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-lg"
          >
            Add Existing
          </span>
        </Button>
      </div>
    </div>

    <access-table />
    <!-- <div class="w-full" style="height: 100px"></div> -->

    <invitepractice-modal v-model="inviteModal" />
    <addpractice-modal v-model="addModal" @practiceAdded="getAccessData" />
    <leave-family-account v-model="leaveFamilyAccountModal" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import Icon from "@/views/dashboard/settings/rolesprivileges/components/icon.vue";
import AccordionRight from "@/components/icons/accordion-right.vue";
import AccessTable from "./components/access-table.vue";
import InvitepracticeModal from "./components/invitepractice-modal.vue";
import AddpracticeModal from "./components/addpractice-modal.vue";
import Tooltip from "@/components/tooltip.vue";
import TooltipIcon from "@/components/icons/formtip.vue";
import { namespace } from "vuex-class";
import User from "@/types/user";
import Button from "@/components/globals/corniebtn.vue";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import { string } from "yup";
import CornieRadio from "@/components/cornieradio.vue";
import { cornieClient } from "@/plugins/http";
import AccordionComponent from "@/components/form-accordion.vue";
import LeaveFamilyAccount from "./components/leavefamilyaccount.vue";

const userSettingsStore = namespace("usersettings");
const userStore = namespace("user");

@Options({
  components: {
    Icon,
    AccessTable,
    Tooltip,
    TooltipIcon,
    Button,
    AccordionRight,
    ArrowLeft,
    IconBtn,
    CornieRadio,
    AccordionComponent,
    InvitepracticeModal,
    AddpracticeModal,
    LeaveFamilyAccount,
  },
})
export default class AccessControl extends Vue {
  access: any = {
    allowAdminRecordAccess: true,
    allowAdminFinanceAccess: true,
    requireRegistrationApproval: false,
    restrictUnauthorizedAccess: false,
  };
  inviteModal = false;
  addModal = false;
  loading = false;
  leaveFamilyAccountModal = false;

  // @Watch("access", { deep: true })
  // async onUpdate() {
  //   await this.updateAccessData();
  // }

  async handleChange() {
    await this.updateAccessData();
  }

  async getAccessData() {
    try {
      this.loading = true;
      const res = await cornieClient().get(
        "/api/v1/patient-portal/access-control"
      );
      this.loading = false;
      if (!res.status) {
        notify({
          msg: "There was an error fetching access data",
          status: "error",
        });
      } else {
        this.access = res.data;
      }
    } catch (error) {
      this.loading = false;
    }
  }

  async updateAccessData() {
    try {
      this.loading = true;
      const res = await cornieClient().patch(
        "/api/v1/patient-portal/access-control",
        {
          ...this.access,
        }
      );
      this.loading = false;
      if (!res.status) {
        notify({
          msg: "There was an error updating access data",
          status: "error",
        });
      } else {
        this.access = res.data;
      }
    } catch (error) {
      this.loading = false;
    }
  }

  async created() {
    await this.getAccessData();
  }
}
</script>

<style scoped>
.topest {
  overflow-x: scroll;
  height: 100vh;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.topest::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.topest {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.password-section {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.update-password {
  height: 280px;
  overflow-y: hidden;
  transition: all 0.5s ease-in-out;
}

.update-2fa {
  height: 400px;
  overflow-y: hidden;
  transition: all 0.5s ease-in-out;
}

.deactivate-account-section {
  height: 480px;
  overflow-y: hidden;
  transition: all 0.5s ease-in-out;
}

.underbar {
  border: 1px solid red !important;
}

.underbar-green {
  border: 1px solid green !important;
}

button:disabled {
  opacity: 0.5 !important;
}
</style>
