<template>
  <nav class="p-5 flex min-w-full items-center w-full border-b-2 h-14">
    <span
      @click="$router.back()"
      class="flex items-center justify-items-center pr-2 border-r-2 cursor-pointer"
    >
      <arrow-left-icon />
    </span>
    <h2 class="text-xl font-bold ml-3 capitalize">{{ routeName }}</h2>
    <span class="flex items-center justify-center ml-auto">
      <div class="dropdown">
        <settings-icon class="cursor-pointer" />
        <ul
          class="dropdown-menu p-4 bg-white rounded w-auto justify-center h-auto right-32 absolute -mt-2 z-10 shadow-md hidden"
        >
          <li
            v-for="(route, index) in recentRoutes"
            :key="index"
            @click="$router.push(route.path)"
            class="mb-3 list-none items-center flex font-medium text-sm text-black hover:bg-blue-100 rounded-full cursor-pointer my-1 -m-2 p-5 py-2"
          >
            <p class="ml-2">{{ route.name }}</p>
          </li>
          <li class="cursor-pointer mb-3" @click="showSettings">
            <cornie-btn
              class="font-semibold rounded-full mb-1 bg-primary mt-2 w-full text-white"
            >
              <span class="inline-flex justify-center text-sm">
                View all settings <settings-white-icon class="ml-2 mt-0.5"
              /></span>
            </cornie-btn>
          </li>
        </ul>
      </div>
    </span>
    <span class="flex items-center justify-center ml-5">
      <div class="dropdown">
        <bell-icon class="cursor-pointer" />
        <ul
          class="dropdown-menu p-2 bg-white rounded-md w-80 h-auto right-10 absolute -mt-2 z-10 shadow-md hidden"
        >
          <li
            class="border-b border-primary grid grid-cols-2 m-3 pb-2 gap-20 col-span-full cursor-pointer list-none"
          >
            <p class="text-1xl font-bold">Notifications</p>
            <p class="text-blue-400 text-xs -right-7 relative">Mark as read</p>
          </li>
          <li class="cursor-pointer list-none items-center -mb-5 -m-2 p-5">
            <p class="text-danger uppercase text-sm font-semibold">New (1)</p>
          </li>
          <li class="w-full flex list-none cursor-pointer my-1 -m-2 p-5 py-2">
            <div class="float-left">
              <p class="font-bold text-sm">Pending Approvals</p>
              <p class="text-xs">
                You have 5 pending approvals. Click to view and take action.
              </p>
            </div>
            <p class="text-gray-300 text-xs flex-shrink-0">8 Minutes Ago</p>
          </li>
          <li class="cursor-pointer list-none items-center -mb-5 -m-2 p-5">
            <p class="text-gray-500 font-semibold text-sm uppercase">Earlier</p>
          </li>
          <li class="w-full flex list-none cursor-pointer my-1 -m-2 p-5 py-2">
            <div class="float-left">
              <p class="font-bold text-sm">User Login</p>
              <p class="text-xs">
                Logan Paul has accepted the invitations and logged in
                successfully.
              </p>
            </div>
            <p class="text-gray-300 text-xs flex-shrink-0">12 hours Ago</p>
          </li>
          <li class="w-full flex list-none cursor-pointer my-1 -m-2 p-5 py-2">
            <div class="float-left">
              <p class="font-bold text-sm">Subscription Notice</p>
              <p class="text-xs">
                Your subscription will expire 3rd July 2021 and is set auto
                renew.
              </p>
            </div>
            <p class="text-gray-300 text-xs flex-shrink-0">1 Day Ago</p>
          </li>
          <li class="w-full flex list-none cursor-pointer my-1 -m-2 p-5 py-2">
            <div class="float-left">
              <p class="font-bold text-sm">Update Your Contact Information</p>
              <p class="text-xs">
                You have not completed your contact information. Click to
                continue...
              </p>
            </div>
            <p class="text-gray-300 text-xs flex-shrink-0">5 Days Ago</p>
          </li>
        </ul>
      </div>
    </span>
    <span class="w-10 h-10 relative ml-5">
      <div
        class="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table cursor-pointer"
      >
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
    <div class="dropdown flex">
      <span class="font-medium ml-1">{{ name }}</span>
      <span class="ml-1 mt-2">
        <chevron-down class="cursor-pointer" />
        <ul
          class="dropdown-menu p-2 bg-white rounded-md w-96 h-auto right-10 absolute -mt-2 z-10 shadow-md hidden"
        >
          <li class="float-right mr-1">
            <settings-icon
              class="mt-0.5 justify-end cursor-pointer"
              @click="$router.push('/dashboard/provider/user')"
            />
          </li>
          <li class="list-none -mb-3 mt-2 -m-2 p-5 flex justify-center">
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
          </li>
          <li class="justify-content border-b border-primary pb-5">
            <p class="3xl text-center font-extrabold">{{ name }}</p>
            <p class="2xl text-center text-gray-600 font-bold">
              {{ user ? user.email : "" }}
            </p>
            <p class="2xl text-center text-yellow-400 font-bold">
              {{ designation }}
            </p>
          </li>
          
          <li class="cursor-pointer list-none items-center -mb-2 -m-2 p-5" v-if="authorizedLocations?.length > 0">
            <span class="text-gray-600 font-bold text-xs uppercase">
              Locations</span
            >
          </li>
          <li class="flex space-x-4 justify-center w-full p-5" v-else>
            <location-icon class="fill-current text-primary"/>
            <p class="text-center text-sm font-semibold  text-danger justify-center flex">No Available Locations</p>
          </li> 

          <li  :class="{
          'experience-links-con-max': showFullHeight,
          'experience-links-con-min': !showFullHeight && authorizedLocations?.length > 0
        }">
            <div class="flex w-full mb-3" v-for="(item,index) in authorizedLocations" :key="index">
            
                  <div class="w-full flex space-x-3">
                    <div class="h-10 w-10 mt-2 flex-grow-0 flex-shrink-0">
                      <location-icon class="fill-current text-primary text-xl ml-3"/>
                    </div>
                    <div class="w-full">
                      <div class="flex items-center justify-between">
                        <h2 class="text-gray-600 text-lg">{{item.name}}</h2>
                          <span
                          v-if="item.isDefault && currentLocation == null"
                          class="p-2 text-xs font-semibold leading-none text-green-300 bg-green-50 rounded-full flex-shrink-0"
                          >Current Location</span>
                        <span
                          v-if="currentLocation === item.id"
                          class="p-2 text-xs font-semibold leading-none text-green-300 bg-green-50 rounded-full flex-shrink-0"
                          >Current Location</span>
                          <span
                          v-else
                          class="p-2 text-sm font-semibold leading-none text-danger rounded-full flex-shrink-0 cursor-pointer"
                          @click="setDefault(item.id)"
                          >Switch</span>
                      </div>
                      <a href="#" class="text-gray-400 text-sm"
                        >{{item.address}}</a
                      >
                    </div>
                  </div>
              
            </div>
          </li>
          <li>
            <span
              v-if="!expand && authorizedLocations?.length > 0"
              @click="() => (showFullHeight = !showFullHeight)"
              class="px-3 pb-3 justify-center flex more cursor-pointer"
              >{{ showFullHeight ? "See less" : "See more" }}</span
            >
          </li>
          
      
          <!-- <li class="flex w-full mb-3">
            <div class="w-full flex space-x-3">
              <div class="h-12 w-12 flex-grow-0 flex-shrink-0">
                <img
                  class="object-cover w-full h-full"
                  src="@/assets/img/evercare.png"
                />
              </div>
              <div class="w-full">
                <div class="flex items-center justify-between">
                  <h2 class="text-gray-600 text-lg">Evercare Hospital Lekki</h2>
                  <span
                    class="p-2 text-sm font-semibold leading-none text-danger rounded-full flex-shrink-0"
                    >Switch</span
                  >
                </div>
                <a href="#" class="text-gray-400 text-sm"
                  >https://www.corniehealth/reddington</a
                >
              </div>
            </div>
          </li>
          <li class="flex w-full mb-3">
            <div class="w-full flex space-x-3">
              <div class="h-12 w-12 flex-grow-0 flex-shrink-0">
                <img
                  class="object-cover w-full h-full"
                  src="@/assets/img/nicholas.png"
                />
              </div>
              <div class="w-full">
                <div class="flex items-center justify-between">
                  <h2 class="text-gray-600 text-lg">St. Nicholas Hospital</h2>
                  <span
                    class="p-2 text-sm font-semibold leading-none text-danger rounded-full flex-shrink-0"
                    >Switch</span
                  >
                </div>
                <a href="#" class="text-gray-400 text-sm"
                  >https://www.corniehealth/reddington</a
                >
              </div>
            </div>
          </li> -->


          <li class="flex w-full border-t mt-4 pt-4 mb-4 border-primary">
            <div class="w-full flex space-x-3">
              <p class="text-sm font-extrabold">Manage My Subscription</p>
              <span
                class="relative left-40 flex-shrink-0 cursor-pointer"
                @click="logout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                >
                  <path
                    d="M11.08 13.09L13.67 10.5H4V8.5H13.67L11.08 5.91L12.5 4.5L17.5 9.5L12.5 14.5L11.08 13.09ZM16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5V7.17L16 5.17V2.5H2V16.5H16V13.83L18 11.83V16.5C18 17.0304 17.7893 17.5391 17.4142 17.9142C17.0391 18.2893 16.5304 18.5 16 18.5H2C1.46957 18.5 0.960859 18.2893 0.585786 17.9142C0.210714 17.5391 0 17.0304 0 16.5V2.5C0 1.39 0.89 0.5 2 0.5H16Z"
                    fill="#6F6C93"
                  />
                </svg>
              </span>
            </div>
          </li>
        </ul>
      </span>
    </div>
  </nav>
  <settings-modal v-model="showSettingsModal" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ArrowLeftIcon from "./icons/arrowleft.vue";
import SettingsIcon from "./icons/settings.vue";
import SettingsWhiteIcon from "./icons/settingswhite.vue";
import BellIcon from "./icons/bell.vue";
import ChevronDown from "./icons/chevrondownprimary.vue";
import { namespace } from "vuex-class";
import User, { CornieUser } from "@/types/user";
import OrgIcon from "@/components/icons/org.vue";
import ContactIcon from "@/components/icons/contactinfo.vue";
import HierarchyIcon from "@/components/icons/hierarchy.vue";
import PractitionerIcon from "@/components/icons/practitioner.vue";
import ApprovalIcon from "@/components/icons/approval.vue";
import { logout } from "@/plugins/auth";
import FormIcon from "@/components/icons/questionnaire.vue";
import IPractitioner from "@/types/IPractitioner";
import ILocation,{AuthorizedLocation} from "@/types/ILocation";
import BankIcon from "@/components/icons/bank.vue";
import Avatar from "@/components/avatar.vue"
import SettingsModal from "@/views/dashboard/settings/SettingsSidebar.vue";
import LocationIcon from "@/components/icons/location.vue";
import { cornieClient } from "@/plugins/http";
import { suggester } from "@/plugins/route-suggester";

const account = namespace("user");
const routerStore = namespace("routerStore");

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
    LocationIcon
  },
})
export default class NavBar extends Vue {
  showSettingsModal = false;
  localSrc =  require("../assets/img/locationIcon.png");
   expand = false;
  showFullHeight = false;

  get routeName() {
    return this.$route.name;
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
  cornieUser!: CornieUser;

  @account.Mutation
  switchCurrentLocation!: (locationId: any) => void;

  get profilePhoto() {
    return this.cornieUser?.image;
  }
  showSettings() {
    this.showSettingsModal = true;
  }
  get designation() {
    if (!this.authPractitioner) return "Root";
    return this.authPractitioner.jobDesignation || this.authPractitioner.type;
  }

  get name() {
    if (!this.user?.id) return "";
    const lastName = this.user.lname;
    const firstInitials = this.user.fname.charAt(0).toUpperCase();
    let middleInitials = this.user.mname?.charAt(0)?.toUpperCase() || "";
    middleInitials = middleInitials ? `${middleInitials}.` : "";
    return `${lastName} ${firstInitials}. ${middleInitials}`;
  }
  // async deleteLoc(id: string) {
  //   const confirmed = await window.confirmAction({
  //     message: "You are about to delete this location",
  //   });
  //   if (!confirmed) return;

  //   if (await this.deleteLocation(id)) window.notify({ msg: "Location deleted", status: "success" }); 
  //   else window.notify({ msg: "Location not deleted", status: "error" }); 
  // }
  async setDefault(value:string) {
     const confirmed = await window.confirmAction({
      message: "Do you want to switch this location?",
      yes: "Yes",
      no: "No"
    });
    if (!confirmed) return;

      if(confirmed){
          try {
          this.switchCurrentLocation(value) 
          window.notify({ msg: "Authorized Locations Swtiched", status: "success" });
            //  else window.notify({ msg: "Authorized Locations not Swtiched", status: "error" })
          } catch (error) {
            window.notify({ msg: "Authorized Locations not Swtiched", status: "error" });
          }
      }
      //  if (await this.switchCurrentLocation(value)) window.notify({ msg: "Location deleted", status: "success" }); 
      // else window.notify({ msg: "Location not deleted", status: "error" })


      // const url = `/api/v1/practitioner/set-default-location/${this.authPractitioner.id}`;
      // try {
      //   const response = await cornieClient().patch(url,{location:value});
      //   if (response.success) {
      //     window.notify({ msg: "Approved Locations Updated", status: "success" });
      //     // this.done();
      //   }
      // } catch (error) {
      //   window.notify({ msg: "Approved Locations Not Updated", status: "error" });
      // }
    

  }


  async logout() {
    await logout();
    this.$router.push("/login");
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
  color: #FE4D3C;
  font-weight: bold;
}
</style>
