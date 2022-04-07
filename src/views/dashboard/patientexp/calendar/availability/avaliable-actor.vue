<template>
    <div
        class="w-full flex items-center my-2"
    >
            <div class="grid w-full grid-cols-2 gap-4">
                <div class="w-full flex space-x-4">
                    <div>
                     <p class="text-4xl text-green-400 font-bold" v-if="avaialbleStatus == 'available'">.</p>
                      <!-- <p class="text-4xl text-yellow-400 font-bold" v-if="avaialbleStatus == 'unavailable'">.</p> -->
                      <p class="text-4xl text-red-600 font-bold" v-else>.</p>
                    </div>
                    <div class="w-10 h-10">
                    <avatar
                        class="mr-2"
                        v-if="actor.user?.image"
                        :src="actor.user?.image"
                    />
                    <avatar class="mr-2" v-else :src="localSrc" />
                    </div>
                    <div>
                    <p class="text-xs text-dark font-semibold">
                        {{ actor.user?.firstName }}
                        {{ actor.user?.lastName }}
                    </p>
                    <p class="text-xs text-gray-500 font-meduim">
                        {{ actor?.jobDesignation }}
                        {{ actor?.department }}
                    </p>
                    </div>
                </div>
                <div class="float-right flex space-x-7 justify-end w-full">
                <span class="cursor-pointer" v-if="currentLocation && avaialbleStatus == 'available'">
                    <cornie-menu top="30px" >
                    <template #activator="{ on }">
                        <icon-btn v-on="on">
                        <dots-vertical-icon class="float-right flex space-x-7 justify-end"/>
                        </icon-btn>
                    </template>
                    <card-text>
                        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" 
                        @click="showAppointmentModal(actor.id)">
                        <calendar-icon />
                        <span class="ml-3 text-xs">Book appointment</span>
                        </div>
                    </card-text>
                    </cornie-menu>
                </span> 
                
                </div>
            </div>

    <appointment-modal v-model="showModal" :appoitmentDate="date" :appoimtentId="id" :range="range" :range2="range2"/>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import { Prop,PropSync } from "vue-property-decorator";
import DeleteIcon from "@/components/icons/delete.vue";
import { namespace } from "vuex-class";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from "@/components/icons/info.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import Avatar from "@/components/avatar.vue";
import SearchSection from "@/components/autocomplete.vue"
import CalendarIcon from "@/components/icons/bcalendar.vue"
import EditIcon from "@/components/icons/edit.vue";
import CopyIcon from "@/components/icons/copy.vue";
import ShareIcon from "@/components/icons/share.vue"
import CornieMenu from "@/components/CornieMenu.vue";
import DotsVerticalIcon from "@/components/icons/DotsVerticalIcon.vue";
import { cornieClient } from "@/plugins/http";
import AppointmentModal from "../appointments/addAppointmentModal.vue";


const schedules = namespace("schedules");
const user = namespace("user");

@Options({
  components: {
     ...CornieCard,
    IconInput,
    SearchIcon,
    DeleteIcon,
    Avatar,
    AppointmentModal,
    SearchSection,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    CancelIcon,
    CalendarIcon,
    EditIcon,
    CopyIcon,
    ShareIcon,
    CornieMenu,
    DotsVerticalIcon

  },
})
export default class AvailableActors extends Vue {
    search = "";
    data: any;

    @Prop({ type: String, default: "" })
    id!: string;

    @Prop({ type: String, default: "" })
    date!: any;

    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @schedules.Action
    removePractitioner!: (reqData: any) => Promise<boolean>;

    @schedules.Action
    addPractitioner!: (reqData: any) => Promise<boolean>;

    @Prop()
    schedule!: any;

    @Prop({ type: Array, default: [] })
    actor!: any;

    @Prop({ type: String, default: "" })
    range!: string;

    @Prop({ type: String, default: "" })
    range2!: string;

     @Prop({ type: String, default: 0 })
     singletime!: number;

    @user.State
    currentLocation!: string;

    localSrc = require("../../../../../assets/img/placeholder.png");
    responseData = [];
    actorType = "";
    isAvailable = "";
    appoimtentId = "";
    showModal=  false;
  
    

    get actorname(){
        if(this.actor.devicName){
            return 'device'
        }else{
            return 'practitioner'
        }
    }
    showAppointmentModal(value:string){
        this.appoimtentId = value;
        this.showModal = true;
    }



    async Available(){
        const AllCalendarDay = cornieClient().get(
        `/api/v1/calendar/personal/day-view/${this.currentLocation}/${this.actorname}/${this.id}?date=${this.date.toISOString()}`,);
        
        const response = await Promise.all([AllCalendarDay]);
        this.responseData = response[0].data;
    }

    get avaialbleStatus(){
        return this.isAvailable = this.responseData[this.singletime]
    }

    async created(){
      if(this.currentLocation) await this.Available();
        
    }


}
</script>
