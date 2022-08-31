<template>
  <cornie-dialog v-model="show" right class="w-10/12 h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll py-6"
    >
      <cornie-card-title class="flex items-center">
        <icon-btn @click="$emit('close')">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2
            class="font-bold float-left text-2xl text-primary ml-3 -mt-1 capitalize"
          >
            View Profile
          </h2>
          <cancel-red-bg
            class="float-right cursor-pointer"
            @click="$emit('close')"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable mt-4">
        <div class="w-full">
          <div class="">
            <hospital-profile :hospital="hospital" />
            <p class="font-bold text-sm text-center text-red-500 mt-9 mb-5">
              View address in map
            </p>

            <div class="info-container p-6 mb-4">
              <div class="font-bold text-sm mb-8">Photos</div>
              <div class="px-12">
                <hospital-photos :hospital="hospital" />
              </div>
            </div>

            <div class="info-container p-6 mb-4">
              <ul class="flex items-center border-b mb-8">
                <li
                  v-for="(tab, index) in tabs"
                  :key="index"
                  :class="{ 'active-tab': activeTab === tab }"
                  class="py-2 px-4 text-grey-blue cursor-pointer"
                  @click="handleActiveTab(tab)"
                >
                  {{ tab }}
                </li>
              </ul>

              <div v-if="activeTab === 'Specialties'">
                <hospital-specialties :hospital="hospital" />
              </div>
              <div
                v-if="activeTab === 'Doctors'"
                class="grid grid-cols-2 gap-8"
              >
                <div
                  v-for="practitioner in practitioners"
                  :key="practitioner.id"
                >
                  <doctors-card
                    :practitioner="practitioner"
                  />
                </div>
              </div>
              <div v-if="activeTab === 'Insurance'"></div>
            </div>
          </div>
        </div>
      </cornie-card-text>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";

import CornieCard from "@/components/cornie-card";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
import ArrowLeft from "@/components/icons/arrowleft.vue";

import HospitalProfile from "./HospitalProfile.vue";
import HospitalSpecialties from "./HospitalSpecialties.vue";
import DoctorsCard from "./DoctorsCard.vue";
import HospitalPhotos from "./HospitalPhotos.vue";
import AppointmentModal from "./AppointmentModal.vue";

@Options({
  name: "HospitalDetailsModal",
  components: {
    ...CornieCard,
    CancelIcon,
    CornieDialog,
    CancelRedBg,
    ArrowLeft,
    CornieBtn,
    HospitalProfile,
    HospitalSpecialties,
    DoctorsCard,
    HospitalPhotos,
    AppointmentModal,
  },
})
export default class HospitalDetailsModal extends Vue {
  activeTab: string = "Specialties";
  practitionerId: string = "";
  tabs: Array<any> = ["Specialties", "Doctors"];
  loading: boolean = false;
  show = false;
  showAppointmentModal: Boolean = false;

  @Prop({ type: Object, default: {} })
  hospital!: any;

  @Prop({ type: Array, default: [] })
  locations!: any[];

  @Prop({ type: Array, default: [] })
  practitioners!: any[];

  handleActiveTab(tab: any) {
    this.activeTab = tab;
  }
}
</script>

<style scoped>
.hospital-icon {
  width: 100px;
  height: 100px;
  border-radius: 100%;
}
.active-tab {
  border-bottom: 4px solid #fe4d3c;
  font-weight: 600;
  color: #14171f;
}

.info-container {
  background: #ffffff;
  border: 0.2px solid #c2c7d6;
  box-sizing: border-box;
  box-shadow: 0px 15px 40px rgba(20, 23, 31, 0.08);
  border-radius: 16px;
}

.info-container > ul > li:nth-of-type(1) {
  padding-left: 0px;
}

.info-container > ul > li:nth-of-type(3) {
  padding-right: 0px;
}
</style>
