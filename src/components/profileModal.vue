<template>
  <cornie-dialog
    v-model="show"
    right
    class="md:w-4/12 w-9/12 h-full animated fadeIn z-50"
  >
    <cornie-card height="100%" class="flex flex-col animated fadeInUp">
      <cornie-card-title class="w-full p-3">
        <div class="w-full flex justify-between">
            <h2 class="flex md:hidden font-extrabold text-lg text-black">
                Profile
            </h2>
           <div class="hidden md:flex space-x-3 items-center float-left">
                <span class=" w-10 h-10 relative justify-center">
                    <div class="flex group w-10  justify-center h-full mb-4 rounded-full overflow-hidden shadow-inner text-center bg-purple cursor-pointer"
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
                <p class="hidden md:block text-lg text-blue-600 font-extrabold">
                    {{ name }}
                </p>
             
            </div>
           <close-icon
            class="md:block hidden float-right cursor-pointer"
            @click="closeModal"
          />
          <closeblue-icon
            class="md:hidden flex float-right cursor-pointer"
            @click="closeModal"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
         <ul class="w-full">            
              <li class="flex md:hidden w-full  mb-1">
                    <span class="text-black font-bold">{{ name }}</span>
              </li>
               <li class="flex w-full border-b border-gray-200  mb-5 pb-5">
                    <span class="text-black font-bold">MRN - {{ mrn }}</span>
              </li>
              <li class="w-full mb-7">
                <div class="flex w-full justify-between">
                    <div>
                        <span class="font-medium text-black cursor-pointer" @click="showPatient = !showPatient">Profiles</span>
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
                    <div class="flex space-x-4 items-center py-3 px-3">
                        <span class="w-7 h-7">
                            <img src="@/assets/img/placeholder.png" class="object-cover object-center w-fullh-full visible group-hover:hidden" alt="profile">
                        </span>
                        <span>Kamara Claire</span>
                    </div>
                    <div class="flex space-x-4 items-center py-3 px-3">
                        <span class="w-7 h-7">
                            <img src="@/assets/img/placeholder.png" class="object-cover object-center w-fullh-full visible group-hover:hidden" alt="profile">
                        </span>
                        <span>Alfred Claire</span>
                    </div>
                </div>

              </li>
              <li class="w-full mb-7">
                 <div>
                    <span class="font-medium text-black cursor-pointer">Account Settings</span>
                </div>
              </li>
               <li class="w-full mb-7">
                 <div>
                    <span class="font-medium text-black cursor-pointer">Support</span>
                </div>
              </li>
               <li class="w-full mb-7">
                 <div>
                    <span class="font-medium text-black cursor-pointer">Feedback</span>
                </div>
              </li>
              <li class="w-full mb-7 border-b border-gray-200 pb-5">
                 <div>
                    <span class="font-medium text-black cursor-pointer">Terms of Service</span>
                </div>
              </li>
              <li class="w-full mb-0">
                 <div>
                    <span class=" font-medium text-danger cursor-pointer" @click="logout">Sign Out</span>
                </div>
              </li>
            </ul>
      </cornie-card-text>
        <cornie-card>
            <cornie-card-text class="w-full">
            <cornie-btn class="md:block hidden text-white bg-danger text-sm  w-full py-1 font-semibold rounded-xl">Switch to a provider account</cornie-btn>
             <cornie-btn class="flex md:hidden border-primary border-2 text-xs w-full font-semibold rounded-xl text-primary">Switch to a provider account</cornie-btn>
            </cornie-card-text>
        </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CloseIcon from "@/components/icons/close.vue";
import CloseblueIcon from "@/components/icons/CloseIconBlue.vue";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import ChevronRightIcon from "@/components/icons/dialogchevronright.vue";


import { logout } from "@/plugins/auth";
type INav = { name: string; to: string; icon: string };

@Options({
  name: "SettingsSidebar",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    CloseblueIcon

  },
})
export default class Settings extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  mrn!: string;

  @Prop({ type: String, default: "" })
  profilePhoto!: string;

  @Prop({ type: String, default: "" })
  name!: string;

  showPatient = false;

  closeModal(){
    this.show = false;
  }

   async logout() {
    await logout();
    this.$router.push("/login");
  }

 
}
</script>
<style scoped></style>
