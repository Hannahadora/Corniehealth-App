<template>
  <nav class="hidden md:block p-5 min-w-full items-center w-full h-36">
    <div
      class="flex float-right space-x-4 justify-end items-center border-b-2 pb-3 border-gray-100 w-full"
    >
      <span class="text-gray-400 text-sm">Book Appointments</span>
      <span class="text-gray-400 text-sm">Shop Medicines</span>

      <span class="text-gray-400 text-sm">Book Tests</span>
      <span class="text-gray-400 text-sm">Shop Plan</span>
      <div>
        <cornie-btn class="text-white bg-danger px-6 font-semibold rounded-xl"
          >Download App</cornie-btn
        >
      </div>
    </div>

    <div class="flex w-full justify-end items-center pt-1 pb-5 cursor-pointer">
      <span class="ml-8">
        <cart-icon />
      </span>

      <span class="ml-8">
        <notify-icon />
      </span>

      <span class="flex space-x-6 items-center">
        <span class="w-10 h-10 relative ml-5 flex">
          <div
            class="group w-full flex h-full rounded-full overflow-hidden shadow-inner text-center bg-purple cursor-pointer"
          >
            <div>
              <img
                v-if="profilePhoto"
                :src="profilePhoto"
                class="object-cover object-center w-full h-full visible group-hover:hidden"
              />
              <img
                v-else
                src="@/assets/img/placeholder.png"
                class="object-cover object-center w-full h-full visible group-hover:hidden"
              />
            </div>
          </div>
        </span>
        <div>
          <div class="mb-4">
            <p class="3xl text-blue-600 font-extrabold">
              {{ name }}
            </p>
            <p class="text-xs text-black">MRN-{{ mrn }}</p>
            <div>
              <span
                class="bg-green-100 text-green-500 text-xs py-0.5 rounded-md px-4"
                >{{ cornieData?.patient?.accountType }}</span
              >
            </div>
          </div>
        </div>
      </span>

      <div class="dropdown flex">
        <span class="ml-5 mt-2">
          <chevron-down class="cursor-pointer" />
          <ul
            class="dropdown-menu p-2 bg-white rounded-md w-96 h-auto right-2 absolute -mt-2 z-10 shadow-lg hidden"
          >
            <li
              class="flex w-full justify-between mb-3 p-3 border-b-2 border-gray-100"
            >
              <div class="flex space-x-3 items-center">
                <span class="w-10 h-10 relative justify-center">
                  <div
                    class="group w-10 flex justify-center h-full mb-4 rounded-full overflow-hidden shadow-inner text-center bg-purple cursor-pointer"
                  >
                    <img
                      v-if="profilePhoto"
                      :src="profilePhoto"
                      class="object-cover object-center w-full h-full visible group-hover:hidden"
                    />
                    <img
                      v-else
                      src="@/assets/img/placeholder.png"
                      class="object-cover object-center w-fullh-full visible group-hover:hidden"
                    />
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="absolute top-8 left-8"
                        width="6"
                        height="6"
                        viewBox="0 0 6 6"
                        fill="none"
                      >
                        <path
                          d="M0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3Z"
                          fill="#35BA83"
                        />
                        <path
                          d="M3 5C1.89543 5 1 4.10457 1 3H-1C-1 5.20914 0.790861 7 3 7V5ZM5 3C5 4.10457 4.10457 5 3 5V7C5.20914 7 7 5.20914 7 3H5ZM3 1C4.10457 1 5 1.89543 5 3H7C7 0.790861 5.20914 -1 3 -1V1ZM3 -1C0.790861 -1 -1 0.790861 -1 3H1C1 1.89543 1.89543 1 3 1V-1Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </div>
                </span>
                <div>
                  <p class="text-lg text-blue-600 mb-0 font-extrabold">
                    {{ name }}
                  </p>
                  <p class="text-sm text-black mb-1">MRN - {{ mrn }}</p>
                  <div>
                    <span
                      class="bg-green-100 text-green-500 text-sm py-1 rounded-md px-4"
                      >{{ cornieData?.patient?.accountType }}</span
                    >
                  </div>
                </div>
              </div>
              <span>
                <close-icon />
              </span>
            </li>
            <li class="w-full mb-4">
              <div class="flex w-full justify-between">
                <div>
                  <span
                    class="text-sm font-medium text-black cursor-pointer"
                    @click="showPatient = !showPatient"
                    >Dependent Accounts</span
                  >
                </div>
                <div>
                  <chevron-down-icon
                    v-if="showPatient"
                    @click="showPatient = false"
                    class="cursor-pointer stroke-current text-primary"
                  />
                  <chevron-right-icon
                    @click="showPatient = !showPatient"
                    v-else
                    class="cursor-pointer stroke-current text-primary"
                  />
                </div>
              </div>
              <div v-if="showPatient" class="w-full">
                <div
                  class="flex space-x-4 items-center py-3 px-3"
                  v-for="(item, index) in patientdependants"
                  :key="index"
                >
                  <span
                    class="w-7 h-7 cursor-pointer"
                    @click="switchDependants(item.id)"
                  >
                    <img
                      :src="item.image"
                      v-if="item.image"
                      class="object-cover object-center w-fullh-full visible group-hover:hidden"
                      alt="profile"
                    />
                    <img
                      v-else
                      src="@/assets/img/placeholder.png"
                      class="object-cover object-center w-fullh-full visible group-hover:hidden"
                      alt="profile"
                    />
                  </span>
                  <span
                    class="cursor-pointer"
                    @click="switchDependants(item.id)"
                    >{{ item.name }}</span
                  >
                </div>
              </div>
            </li>
            <li
              class="w-full mb-4 border-t-2 border-dashed pt-5 border-gray-100"
            >
              <div>
                <router-link
                  to="/dashboard/patient/account-settings"
                  class="text-sm font-medium text-black cursor-pointer"
                  >Account Settings</router-link
                >
              </div>
            </li>
            <li class="w-full mb-4">
              <div>
                <span class="text-sm font-medium text-black cursor-pointer"
                  >Support</span
                >
              </div>
            </li>
            <li class="w-full mb-4">
              <div>
                <span class="text-sm font-medium text-black cursor-pointer"
                  >Feedback</span
                >
              </div>
            </li>
            <li class="w-full mb-4">
              <div>
                <span class="text-sm font-medium text-black cursor-pointer"
                  >Terms of Service</span
                >
              </div>
            </li>
            <li class="w-full mb-4 border-b-2 border-gray-100 pb-5">
              <div>
                <span
                  class="text-sm font-medium text-danger cursor-pointer"
                  @click="logout"
                  >Sign Out</span
                >
              </div>
            </li>
            <li class="w-full mb-4 flex justify-center">
              <cornie-btn
                class="text-white bg-danger px-16 py-1 font-semibold rounded-xl"
                @click="$router.push('/signup')"
                >Add a New Account</cornie-btn
              >
            </li>
            <li class="w-full mb-4 flex justify-center">
              <cornie-btn
                class="border-primary border-2 px-6 py-0.5 font-semibold rounded-xl text-primary"
                @click="
                  $router.push(
                    $route.query.practitioner
                      ? `/signin?practitioner=${$route.query.practitioner}`
                      : '/signin'
                  )
                "
                >Sign In to an Existing Account</cornie-btn
              >
            </li>
          </ul>
        </span>
      </div>
    </div>
  </nav>
  <nav class="flex md:hidden min-w-full items-center w-full border-b-2 h-14">
    <div class="flex space-x-4 w-full justify-start items-center pt-3 pb-3">
      <menu-icon class="cursor-pointer" @click="showMobileMenu = true" />
      <div class="flex flex-row justify-between pb-1 items-center">
        <img src="@/assets/img/logo.svg" class="h-5 w-5" />
        <h2 class="text-primary text-xs font-semibold ml-1">CornieHealth</h2>
      </div>
    </div>
    <div
      class="flex w-full justify-end items-center pt-3 pb-3 cursor-pointer"
      @click="showProfileModal = true"
    >
      <span class="ml-8">
        <cart-icon />
      </span>

      <span class="ml-8">
        <notify-icon />
      </span>

      <span class="flex space-x-6 items-center">
        <span class="w-10 h-10 relative ml-5 flex">
          <div
            class="group w-full flex h-full rounded-full overflow-hidden shadow-inner text-center bg-purple cursor-pointer"
          >
            <div>
              <img
                v-if="profilePhoto"
                :src="profilePhoto"
                class="object-cover object-center w-full h-full visible group-hover:hidden"
              />
              <img
                v-else
                src="@/assets/img/placeholder.png"
                class="object-cover object-center w-full h-full visible group-hover:hidden"
              />
            </div>
          </div>
        </span>
      </span>
    </div>
  </nav>
  <settings-modal v-model="showSettingsModal" />
  <profile-section
    v-model="showProfileModal"
    :name="name"
    :mrn="mrn"
    :profilePhoto="profilePhoto"
  />
  <mobile-menu v-model="showMobileMenu" />
  <profile-mobile v-model="showProfileMobile" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import { logout } from "@/plugins/auth";
import localstore from "@/plugins/localstore";

import { AuthorizedLocation } from "@/types/ILocation";
import IPractitioner from "@/types/IPractitioner";
import IPatientSwtich from "@/types/IPatientSwtich";
import User, { CornieUser } from "@/types/user";

import Avatar from "@/components/avatar.vue";
import ApprovalIcon from "@/components/icons/approval.vue";
import BankIcon from "@/components/icons/bank.vue";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import ContactIcon from "@/components/icons/contactinfo.vue";
import ChevronRightIcon from "@/components/icons/chevronright.vue";
import HierarchyIcon from "@/components/icons/hierarchy.vue";
import LocationIcon from "@/components/icons/location.vue";
import NewLocationIcon from "@/components/icons/newlocation.vue";
import OrgIcon from "@/components/icons/org.vue";
import PractitionerIcon from "@/components/icons/practitioner.vue";
import FormIcon from "@/components/icons/questionnaire.vue";
import SettingsModal from "@/views/dashboard/settings/SettingsSidebar.vue";

import ArrowLeftIcon from "./icons/arrowleft.vue";
import BellIcon from "./icons/bell.vue";
import ChevronDown from "./icons/chevrondownprimary.vue";
import SettingsIcon from "./icons/settings.vue";
import SettingsWhiteIcon from "./icons/settingswhite.vue";

import CartIcon from "./icons/cart.vue";
import CloseIcon from "./icons/close.vue";
import MenuIcon from "./icons/menu.vue";
import NotifyIcon from "./icons/notify.vue";

import ProfileMobile from "./mobileprofilemodal.vue";
import MobileMenu from "./mobilesidebar.vue";
import ProfileSection from "./profileModal.vue";

const account = namespace("user");
const routerStore = namespace("routerStore");
const patientswtich = namespace("patientswtich");

@Options({
  components: {
    ArrowLeftIcon,
    ChevronDown,
    BankIcon,
    SettingsIcon,
    SettingsWhiteIcon,
    FormIcon,
    BellIcon,
    OrgIcon,
    ContactIcon,
    HierarchyIcon,
    PractitionerIcon,
    ApprovalIcon,
    SettingsModal,
    Avatar,
    LocationIcon,
    ChevronDownIcon,
    NewLocationIcon,
    CartIcon,
    NotifyIcon,
    CloseIcon,
    ChevronRightIcon,
    ProfileSection,
    MenuIcon,
    MobileMenu,
    ProfileMobile,
  },
})
export default class NavBar extends Vue {
  showSettingsModal = false;
  localSrc = require("../assets/img/locationIcon.png");
  expand = false;
  showFullHeight = false;

  get routeName() {
    return this.$route.fullPath === "/dashboard/provider/clinical/"
      ? "EHR"
      : this.$route.name;
  }

  @routerStore.State("recents")
  recentRoutes!: { path: string; name: string }[];

  @account.State
  user!: User;

  @account.Getter
  authPractitioner!: IPractitioner;

  @account.Getter
  authorizedLocations!: AuthorizedLocation[];

  @account.State
  currentLocation!: string;

  @account.Getter
  authCurrentLocation!: string;

  @account.Getter
  cornieUser!: CornieUser;

  @account.State
  cornieData!: any;

  @account.Mutation
  switchCurrentLocation!: (locationId: any) => void;

  @account.Mutation
  updatePractitioner!: (practitioners: IPractitioner[]) => void;

  @patientswtich.State
  patientdependants!: IPatientSwtich[];

  @patientswtich.Action
  fetchDependaantsAccount!: () => Promise<void>;

  defaultLocation = "";
  showPatient = false;
  showProfileModal = false;
  showMobileMenu = false;
  showProfileMobile = false;

  get profilePhoto() {
    return this.cornieData?.patient?.profilePhoto;
  }

  showSettings() {
    this.showSettingsModal = true;
  }
  get designation() {
    if (!this.authPractitioner) return "Root";
    return this.authPractitioner.jobDesignation || this.authPractitioner.type;
  }

  get email() {
    return this.cornieUser?.email || "";
  }

  get mrn() {
    return this.cornieData?.patient?.mrn || "";
  }

  get name() {
    const patient = this.cornieData?.patient;
    if (!patient) return "";
    const firstname = patient.firstname || "";
    const middlename = patient.middlename || "";
    const lastname = patient.lastname || "";

    const firstInitials = firstname.charAt(0).toUpperCase();
    let middleInitials = middlename.charAt(0).toUpperCase();
    middleInitials = middleInitials ? `${middleInitials}.` : "";
    return `${lastname} ${firstInitials}. ${middleInitials}`;
  }

  async setDefault(value: string) {
    const confirmed = await window.confirmAction({
      message: "Do you want to switch this location?",
      yes: "Yes",
      no: "No",
    });
    if (!confirmed) return;

    try {
      this.switchCurrentLocation(value);
      window.notify({
        msg: "Authorized Locations Swtiched",
        status: "success",
      });
    } catch (error) {
      window.notify({
        msg: "Authorized Locations not Swtiched",
        status: "error",
      });
    }
  }

  async switchDependants(id: string) {
    try {
      const response = await cornieClient().post(
        "/api/v1/patient-portal/security/switch-accounts/",
        { dependentPatientId: id }
      );
      if (response.data) {
        window.notify({ msg: "Dependant account swtiched", status: "success" });
        localstore.put("dependatAuthToken", response.data.token);
        location.reload();
      }
      //this.reset();
    } catch (error: any) {
      window.notify({ msg: "Dependant account not swtiched", status: "error" });
    }
  }

  get locationDefault() {
    const pt = this.authorizedLocations?.find(
      (i: any) => i.id === this.authCurrentLocation
    );
    return pt ? `${pt.name}` : "Switch default location";
  }
  get sortLocations() {
    const sorted = this.authorizedLocations?.sort((a, b) => {
      if (a.currentLocation) return -1;
      if (b.currentLocation) return 1;

      return 0;
    });
    return sorted;
  }
  async logout() {
    await logout();
    this.$router.push("/login");
  }
  mounted() {
    this.updatePractitioner(this.authPractitioner as any);
  }
  async created() {
    this.authCurrentLocation;
    this.updatePractitioner(this.authPractitioner as any);
    await this.fetchDependaantsAccount();
  }
}
</script>
<style scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}
.experience-links-con-max {
  height: auto;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.experience-links-con-min {
  height: 190px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.more {
  font-size: 14px;
  color: #0a0870;
  font-weight: bold;
}
</style>
