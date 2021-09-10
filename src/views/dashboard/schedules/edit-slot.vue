<template>
    <div class="w-full  p-4 overflow-y-scroll h-scrren">
        <div class="container-fluid">
            <div class="w-full border-b-2 curved flex py-2 bg-white px-4">
                <div class="container-fluid flex font-semibold text-xl py-2">
                    <h2>Edit Slot</h2>
                </div>
            </div>

            <div class="w-full my-6">
                <div class="container-fluid">
                    <div title="Shift Details" class="bg-white shadow-xl rounded-lg">
                        <div class="w-full px-4">

                            <div class="container-fluid pb-3 pt-3 flex justify-around">
                                <div class="w-4/12">
                                    <cornie-input v-model="data.locationId" label="Schedule"  placeholder="--Enter--" />
                                </div>
                                <div class="w-4/12">
                                     <div class="w-full">
                                        <div class="w-11/12">
                                            <CornieInput label="Start date" v-model="data.name"  placeholder="Enter" />
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="w-4/12">
                                     <div class="w-full">
                                        <div class="w-11/12">
                                            <CornieInput label="time" v-model="data.description" class="w-95" placeholder="Enter" />
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>

                            <div class="container-fluid py-3 flex justify-around">
                                <div class="w-4/12">
                                    <cornie-input label="Stop date" class="w-95" v-model="data.serviceCategory"  placeholder="Enter" />
                                </div>
                                <div class="w-4/12">
                                    <cornie-input label="time" class="w-95" v-model="data.serviceType" placeholder="Enter" />
                                </div>
                                <div class="w-4/12">
                                    <cornie-input label="time" class="w-95" v-model="data.specialty"  placeholder="Enter" />
                                </div>
                            </div>

                            <div class="container-fluid my-4">
                                <p class="">
                                    <span class="flex items-center justify-between">
                                        <span class="mr-3 text-sm font-normal font-bold flex items-center uppercase cursor-pointer"  @click="showAddActor" style="color: #FE4D3C">add participant(s) to this slot <span class="ml-2"><AddIcon /></span> </span>
                                        <span class="flex items-center">
                                            <span class="flex items-center">Status: <span class="ml-2"><info-icon/></span></span>
                                            <span><toggle-check :uncheckedText="'Private'" :checkedText="'Public'" /></span>
                                        </span>
                                    </span>
                                </p>
                            </div>

                            <div class="container-fluid py-4 border-l-none" style="border-top: 1px dashed #C2C7D6; border-bottom: 1px dashed #C2C7D6">
                                <div class="w-full flex flex-wrap">
                                    <div class="w-4/12">
                                        <div class="w-11/12 mx-auto">
                                            <div class="w-full flex relative items-center border-r-2">
                                                <div class="w-10/12 flex">
                                                    <div class="w-2/12">
                                                        <img src="https://via.placeholder.com/40x40" class="rounded-full border" alt="Image">
                                                    </div>
                                                    <div class="w-9/12 ml-3">
                                                        <p class="capitalize py-0 my-0 font-semibold text-sm">Godstar</p>
                                                        <span class="capitalize text-gray-400 font-normal text-xs">Doctor</span>
                                                    </div>
                                                </div>
                                                <div class="w-2/12">
                                                    <input type="checkbox"  name="" id="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-4/12">
                                        <div class="w-11/12 mx-auto">
                                            <div class="w-full flex relative items-center border-r-2">
                                                <div class="w-10/12 flex">
                                                    <div class="w-2/12">
                                                        <img src="https://via.placeholder.com/40x40" class="rounded-full border" alt="Image">
                                                    </div>
                                                    <div class="w-9/12 ml-3">
                                                        <p class="capitalize py-0 my-0 font-semibold text-sm">Godstar</p>
                                                        <span class="capitalize text-gray-400 font-normal text-xs">Doctor</span>
                                                    </div>
                                                </div>
                                                <div class="w-2/12">
                                                    <input type="checkbox"  name="" id="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="w-4/12">
                                        <div class="w-11/12 mx-auto">
                                            <div class="w-full flex relative items-center border-r-2">
                                                <div class="w-10/12 flex">
                                                    <div class="w-2/12">
                                                        <img src="https://via.placeholder.com/40x40" class="rounded-full border" alt="Image">
                                                    </div>
                                                    <div class="w-9/12 ml-3">
                                                        <p class="capitalize py-0 my-0 font-semibold text-sm">Godstar</p>
                                                        <span class="capitalize text-gray-400 font-normal text-xs">Doctor</span>
                                                    </div>
                                                </div>
                                                <div class="w-2/12">
                                                    <input type="checkbox"  name="" id="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-4/12">
                                        <div class="w-11/12 mx-auto">
                                            <div class="w-full flex relative items-center border-r-2">
                                                <div class="w-10/12 flex">
                                                    <div class="w-2/12">
                                                        <img src="https://via.placeholder.com/40x40" class="rounded-full border" alt="Image">
                                                    </div>
                                                    <div class="w-10/12 ml-3">
                                                        <p class="capitalize py-0 my-0 font-semibold text-sm">Godstar</p>
                                                        <span class="capitalize text-gray-400 font-normal text-xs">Doctor</span>
                                                    </div>
                                                </div>
                                                <div class="w-2/12">
                                                    <input type="checkbox"  name="" id="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p class="text-sm my-5">How often do you want this slot to occur?  <span class="text-gray-400">(optional)</span></p>

                            <div class="w-full flex mt-3">
                                <div class="mr-6" v-for="(type, index) in occurrence" :key="index">
                                    <label class="inline-flex items-center">
                                        <input type="radio" class="form-radio h-4 w-4" :value="type" v-model="breakData.type" name="break" >
                                        <span class="ml-2 text-base">{{ type }}</span>
                                    </label>
                                </div>
                            </div> 

                            <div class="w-full my-5">
                                <div class="container-fluid flex items-center">
                                    <div class="w-4/12">
                                        <custom-dropdown :label="'Status'" :items="[1, 2, 3, 4]" />
                                    </div>
                                    <div class="w-4/12 -mt-5">
                                        <cornie-input :label="'Comment'" />
                                    </div>
                                </div>
                            </div>

                            <div class="w-full pb-8 flex flex justify-end">
                                <corniebtn class="bg-gray-300 p-2 rounded-full px-8 mx-4">
                                    <span class="font-semibold text-gray-500">Cancel</span>
                                </corniebtn>

                                <corniebtn class="bg-red-500 p-2 rounded-full px-8 mx-4">
                                    <span class="text-white font-semibold">Save</span>
                                </corniebtn>
                            </div>


                            <side-modal :visible="addActorPane" @closesidemodal="() => addActorPane = false">
                                <add-actors />
                            </side-modal>

                        </div>
                    </div>

                </div>
            </div>

        </div>

        
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Accordion from "@/components/accordion-component.vue";
import CornieInput from "@/components/cornieinput.vue";
import { namespace } from 'vuex-class';
import IHealthcare from '@/types/IHealthcare'
import CustomDropdown from '@/components/cornieselect.vue'
import Button from '@/components/globals/corniebtn.vue'
import DeleteIcon from '@/components/icons/delete.vue'
import ChevronDown from '@/components/icons/chevrondownprimary.vue'
import DatePicker from '@/components/datepicker.vue'
import ToggleCheck from '@/components/ToogleCheck.vue'
import IPractitioner from "@/types/IPractitioner";

import SearchBox from './components/search-box.vue'
import User from "@/types/user";
import DateTimePicker from './components/datetime-picker.vue';
import DateTimePick from './components/datetime-picker.vue';
import MultiSelect from './components/apply-to.vue'
import Templates from "@/components/icons/templates.vue";
import AddIcon from '@/components/icons/add.vue'
import IDevice from "@/types/IDevice";
import SideModal from './components/side-modal.vue';
import AddActors from './components/select-actor.vue'
import InfoIcon from '@/components/icons/info.vue'

const healthcare = namespace('healthcare');
const schedulesStore = namespace('schedules');
const contacts = namespace('practitioner');
const userStore = namespace("user");
const locationStore = namespace("location");
const devices = namespace("device");

@Options({
  components: {
      Accordion,
      CornieInput,
      CustomDropdown,
      Button,
      DeleteIcon,
      ChevronDown,
      DatePicker,
      ToggleCheck,
      SearchBox,
      DateTimePicker,
      DateTimePick,
      MultiSelect,
    Templates,
    AddIcon,
    SideModal,
    AddActors,
    InfoIcon,
  },
})
export default class Shift extends Vue {
 showDetails = true;
 showBreaks = false;
 showPlanning = false;
 loading = false;
 showSelectArea = false;
 addActorPane = false;

    data: any = { 
        days: [ ],
        practitioners: [ ],
        breaks: [ ],
        healthcares: [ ],
        devices: [ ],
    }

    occurrence: any = [
        "Do not repeat", "Every day schedule", "Every week", "Every month", "Every year", "Forever", "Custom", 
    ]

 shift: any = {
     healthcareServices: [ ]
 }


 removeActor(id: any) {
     if (this.$route.params.scheduleId) return false;
     this.data.practitioners = this.data.practitioners.filter((i: any)=> i.code !== id);
 }

 actorSelected(actor: any) {
     if (this.data.practitioners.findIndex((i: any) => i.code === actor.code) < 0) {
         this.data.practitioners.push(actor);
     }
 }

 deviceSelected(device: any) {
     if (this.data.devices.findIndex((i: any) => i.code === device.code) < 0) {
         this.data.devices.push(device);
     }
 }

 breakData: any = {

 }
 addBreak() {
     if (!this.breakData.type || !this.breakData.startTime || !this.breakData.endTime) return false;
     this.data.breaks.push({ ...this.breakData, status: this.breakData.status ? 'active' : 'inactive' });
     this.breakData.type = "";
     this.breakData.status = false;
     this.breakData.startTime = "";
     this.breakData.endTime = "";
     this.breakData.description = "";
 }

 removeBreak(index: number) {
     this.data.breaks.splice(index, 1);
 }

 showAddActor() {
     this.addActorPane = true;
 }

 @contacts.State
 practitioners!: IPractitioner[];

 @contacts.Action
 fetchPractitioners!: () => Promise<void>;

 @devices.State
 devices!: IDevice[];

 @contacts.Action
 fetchDevices!: () => Promise<void>;

 @healthcare.State
 healthcares!: IHealthcare[];

 @healthcare.Action
 fetchHealthcares!: () => Promise<void>;

 @schedulesStore.Action
 createSchedule!: (schedule: any) => Promise<boolean>;

 @locationStore.State
 locations!: any;

 @locationStore.Action
 fetchLocations!: () => Promise<boolean>;

 @userStore.State
 user!: User;

 @schedulesStore.State
  schedules!: any[];

  @schedulesStore.Action
  getSchedules!: () => Promise<void>;

  @schedulesStore.Action
  updateSchedule!: (body: any) => Promise<boolean>;

 timeZones = [
    'Africa/Lagos', 'Africa/Algiers', 'Europe/Amsterdam', 'Europe/Berlin', 'Europe/Rome', 'WAT: West Africa Time', 'WEST: Western European Summer Time', 'MET: Middle European Time', 'CET: Central European Time'
 ]

 schedulesTypes: any = [
     { display: 'Daily', code: 'daily'},
     { display: 'Weekly', code: 'weekly'},
     { display: 'Monthly', code: 'monthly'}
 ]


async created() {
    if (!this.practitioners || this.practitioners.length === 0) await this.fetchPractitioners();

    
}

}
</script>
<style>
    .dashed-bottom {
        border-bottom: 1px dashed #667499;
    }

    .h-scrren {
        height: 100vh;
        overflow: scroll;
        padding-bottom: 40px;
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    .h-scrren::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .h-scrren {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    .details-area {
        height: 55px;
        transition: all .4s ease-in-out;
        overflow-y: hidden;
    }

    .details-area-full {
        height: 454px;
        transition: all .4s ease-in-out;
        overflow-y: scroll;
    }

    .planning-area {
        height: 57px;
        transition: all .4s ease-in-out;
        overflow-y: hidden;
    }

    .planning-area-full {
        height: 398px;
        transition: all .4s ease-in-out;
        overflow-y: scroll;
    }

    .breaks-area {
        height: 65px;
        transition: all .4s ease-in-out;
        overflow-y: hidden;
    }

    .breaks-area-full {
        height: 480px;
        transition: all .4s ease-in-out;
        overflow-y: hidden;
    }

    button:disabled {
        background: #E1E3EA;
        color: gray;
        font-weight: 500;
    }

    .select-area {
        height: 0;
        transition: all .4s ease-in-out;
        overflow: hidden;
    }

    .select-area-full {
        height: 70px;
        transition: all .4s ease-in-out;
    }

    .details-area-fuller {
        height: 600px;
        transition: all .5s ease-in-out;

    }
</style>
