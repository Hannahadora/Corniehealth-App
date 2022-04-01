<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            All Participants
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

       <cornie-card-text class="flex-grow scrollable">
          <p class="text-sm mt-2">All participants for this appointment</p>
          <div>
            <div
              v-for="(input, index) in participants"
              :key="index"
            >
              <span
                class="flex border-b-2 border-dashed w-full text-sm text-primary py-2 mx-auto font-semibold col-span-full mb-2 mt-4"
              >
                Practitioner
              </span>
              <div class="grid grid-cols-2 gap-4 col-span-full mt-2 p-5">
                <div class="dflex space-x-4">
                  <div class="w-10 h-10">
                    <avatar
                      class="mr-2"
                      v-if="input.practitioner.image"
                      :src="input.practitioner.image"
                    />
                    <avatar class="mr-2" v-else :src="localSrc" />
                  </div>
                  <div class="w-full">
                    <p class="text-xs text-dark font-semibold">
                      {{ input.practitioner.firstName }}
                      {{ input.practitioner.lastName }}
                    </p>
                    <p class="text-xs text-gray-500 font-meduim">
                      {{ input.practitioner.jobDesignation }}
                      {{ input.practitioner.department }}
                    </p>
                  </div>
                </div>
                <div>
                  <p class="mr-2 float-right text-xs text-danger">Accepted</p>
                </div>
              </div>
            </div>

            <div v-for="(input, index) in participants" :key="index">
                <div v-for="(value, index) in input.Participants" :key="index">

                    <div v-if="value.Device">
                        <span class="flex border-b-2 border-dashed w-full text-sm text-primary py-2 mx-auto font-semibold col-span-full mb-2">
                                Device
                        </span>
                        <div class="grid grid-cols-2 gap-4 col-span-full mt-2 p-5">
                            <div class="dflex space-x-4">
                            <div class="w-10 h-10">
                                <avatar class="mr-2" :src="localSrc" />
                            </div>
                            <div class="w-full">
                                <p class="text-xs text-dark font-semibold">
                                {{ input.device.deviceName.name }}
                                </p>
                                <p class="text-xs text-gray-500 font-meduim">
                                {{ input.device.deviceName.nameType }}
                                </p>
                            </div>
                            </div>
                            <div>
                            <p class="mr-2 float-right text-xs text-danger">Accepted</p>
                            </div>
                        </div>
                    </div>
                     <div v-if="value.Practitioner">
                         <span class="flex border-b-2 border-dashed w-full text-sm text-primary py-2 mx-auto font-semibold col-span-full mb-2">
                                Practitioner
                        </span>
                        <div class="grid grid-cols-2 gap-4 col-span-full mt-2 p-5">
                            <div class="dflex space-x-4">
                            <div class="w-10 h-10">
                                <avatar class="mr-2" v-if="value.practitioner.image" :src="value.practitioner.image" />
                                <avatar class="mr-2" v-else :src="localSrc" />
                            </div>
                            <div class="w-full">
                                <p class="text-xs text-dark font-semibold">
                                {{ value.practitioner.firstName }}
                                </p>
                                <p class="text-xs text-gray-500 font-meduim">
                                {{ value.practitioner.firstName }}
                                </p>
                            </div>
                            </div>
                            <div>
                            <p class="mr-2 float-right text-xs text-danger">Accepted</p>
                            </div>
                        </div>
                     
                     </div>
                     <div v-if="value.Patient">
                         <span class="flex border-b-2 border-dashed w-full text-sm text-primary py-2 mx-auto font-semibold col-span-full mb-2">
                                Patient
                        </span>
                        <div class="grid grid-cols-2 gap-4 col-span-full mt-2 p-5">
                            <div class="dflex space-x-4">
                            <div class="w-10 h-10">
                                <avatar class="mr-2" v-if="value.patient.profilePhoto" :src="value.patient.profilePhoto" />
                                <avatar class="mr-2" v-else :src="localSrc" />
                            </div>
                            <div class="w-full">
                                <p class="text-xs text-dark font-semibold">
                                {{ value.patient.firstname }}
                                </p>
                                <p class="text-xs text-gray-500 font-meduim">
                                {{ value.patient.lastname }}
                                </p>
                            </div>
                            </div>
                            <div>
                            <p class="mr-2 float-right text-xs text-danger">Accepted</p>
                            </div>
                        </div>
                     
                     </div>
                </div>
            
            </div>
            <div v-for="(input, index) in participants" :key="index">
              <span
                class="flex border-b-2 border-dashed w-full text-sm text-primary py-2 mx-auto font-semibold col-span-full mb-2"
              >
                Practitioners Role
              </span>
              <div class="grid grid-cols-2 gap-2 col-span-full p-5">
                <div class="dflex space-x-4">
                  <div class="w-10 h-10">
                    <avatar class="mr-2" :src="input.patient.profilePhoto" />
                  </div>
                  <div class="w-full">
                    <p class="text-xs text-dark font-semibold">
                      {{ input.patient.firstname }} {{ input.patient.lastname }}
                    </p>
                    <!-- <p class="text-xs text-gray font-light">{{input.patient.description}}</p> -->
                  </div>
                </div>
                <div>
                  <p class="mr-2 float-right text-xs text-danger">Accepted</p>
                </div>
              </div>
            </div>
            <div v-for="(input, index) in participants" :key="index">
              <span
                class="flex border-b-2 border-dashed w-full text-sm text-primary py-2 mx-auto font-semibold col-span-full mb-2"
              >
                Patients
              </span>
              <div class="grid grid-cols-2 gap-2 col-span-full p-5">
                <div class="dflex space-x-4">
                  <div class="w-10 h-10">
                    <!-- <avatar class="mr-2" :src="input.profilePhoto" v-if="input.profilePhoto" />-->
                    <avatar class="mr-2" :src="input.patient.profilePhoto" />
                  </div>
                  <div class="w-full">
                    <p class="text-xs text-dark font-semibold">
                      {{ input.patient.firstname }} {{ input.patient.lastname }}
                    </p>
                  </div>
                </div>
                <div>
                  <p class="mr-2 float-right text-xs text-danger">Accepted</p>
                </div>
              </div>
            </div>
            <div v-for="(input, index) in participants" :key="index">
              <span
                class="flex border-b-2 border-dashed w-full text-sm text-primary py-2 mx-auto font-semibold col-span-full mb-2"
              >
                Patients
              </span>
              <div class="grid grid-cols-2 gap-2 col-span-full p-5">
                <div class="dflex space-x-4">
                  <div class="w-10 h-10">
                    <!-- <avatar class="mr-2" :src="input.profilePhoto" v-if="input.profilePhoto" />-->
                    <avatar class="mr-2" :src="localSrc" />
                  </div>
                  <div class="w-full">
                    <p class="text-xs text-dark font-semibold">
                      {{ input.name }}
                    </p>
                  </div>
                </div>
                <div>
                  <p class="mr-2 float-right text-xs text-danger">Accepted</p>
                </div>
              </div>
            </div>
          </div>
        </cornie-card-text>

      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2  mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
 
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { cornieClient } from "@/plugins/http";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CloseIcon from "@/components/icons/whitecancel.vue";
import { namespace } from "vuex-class";
import Multiselect from "@vueform/multiselect";
import CornieSelect from "@/components/cornieselect.vue";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import Avatar from "@/components/avatar.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import ISchedule,{Break, Repeat} from "@/types/ISchedule";
import SelectOption from "@/components/custom-checkbox.vue";
import search from "@/plugins/search";
import { IPatient } from "@/types/IPatient";

const practitioner = namespace("practitioner");
const special = namespace("special");
const schedulesStore = namespace("schedules");
const patients = namespace("patients");

type Sorter = (a: any, b: any) => number;


function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "AllParticipants",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    Multiselect,
    CancelIcon,
    CornieDialog,
    Avatar,
    SelectOption,
    SearchIcon,
    DeleteIcon,
    IconInput,
    CornieBtn,
    CornieSelect,
    CloseIcon
  },
})
export default class AllParticipants extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @Prop({ type: String, default: "" })
  appointmentId!: string;


  loading = false;
  localSrc = require("../../../../assets/img/placeholder.png");
  participants = [] as any;

  async viewAppointemnt() {
      try {
        const response = await cornieClient().get(
          `/api/v1/appointment/${this.appointmentId}`
        );
        if (response.success) {
          this.participants = response.data;
        }
      } catch (error) {
        this.show = false;
        console.error(error);
      }
  }

  async created(){
      if(this.appointmentId) await this.viewAppointemnt();
  }



  
 
}
</script>
<style>

.dflex {
  display: -webkit-box;
}
</style>
