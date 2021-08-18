<template>
    <div class="w-full  p-4 overflow-y-scroll h-scrren">
        <div class="container-fluid">
            <div class="w-full border-b-2 curved flex py-2 bg-white px-4">
                <div class="container-fluid flex font-semibold text-xl py-2">
                    <h2>Create Shift</h2>
                </div>
            </div>

            <div class="w-full my-6">
                <div class="container-fluid">
                    <div title="Shift Details" class="bg-white shadow-xl">
                        <div class="w-full px-4 details-area " :class="{ 'details-area-full': showDetails}">
                            <div class="w-full border-b-2 curved py-2">
                                <h2 class="flex justify-between w-full font-bold items-center">
                                    <span>Schedule Details</span>
                                    <span @click="toggleDetailsDisplay" class="cursor-pointer"><ChevronDown /></span>
                                </h2>
                            </div>

                            <div class="container-fluid mt-3">
                                <p class="text-sm font-normal">All field should be filled</p>
                            </div>

                            <div class="container-fluid pb-3 pt-3 flex justify-around">
                                <div class="w-4/12">
                                    <CustomDropdown v-model="data.location" :items="['Location', 'Area']" label="Location"  placeholder="--Enter--" />
                                </div>
                                <div class="w-4/12">
                                    <CornieInput label="Name" v-model="data.name"  placeholder="Enter" />
                                </div>
                                <div class="w-4/12">

                                    <CornieInput label="Description" v-model="data.description" class="w-95" placeholder="Enter" />
                                </div>
                            </div>

                            <div class="container-fluid py-3 flex justify-around">
                                <div class="w-4/12">
                                    <CustomDropdown label="Service Category" class="w-95" v-model="data.serviceCategory" :items="['items']" placeholder="Enter" />
                                </div>
                                <div class="w-4/12">
                                    <CustomDropdown label="Service Type" class="w-95" v-model="data.serviceType" :items="['items']" placeholder="Enter" />
                                </div>
                                <div class="w-4/12">
                                    <CustomDropdown label="Specialty" class="w-95" v-model="data.specialty" :items="['items']" placeholder="Enter" />
                                </div>
                            </div>

                            <div class="container-fluid my-4">
                                <p class="text-sm font-normal">Select Actor for this schedule</p>
                            </div>

                            <div class="container-fluid my-3">
                                <div class="w-6/12 mb-3">
                                    <input type="text" class="p-2 rounded-full border focus:outline-none w-full" placeholder="search">
                                </div>

                                <div class="w-6/12 border-t-2 py-3">
                                    <div class="w-full flex items-center">
                                        <div class="w-1/12">
                                            <div class="w-full">
                                                <img src="https://via.placeholder.com/75x75" class="rounded-full border" alt="Image">
                                            </div>
                                        </div>
                                        <div class="w-10/12 px-5">
                                            <p class="flex flex-col">
                                                <span>Dr Ajayi Charles</span>
                                                <span class="text-xs">Pediatrics</span>
                                            </p>
                                        </div>
                                        <div class="w-1/12">
                                            <span><DeleteIcon /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div title="Shift Timing" class="my-6 bg-white shadow-xl">
                        <div class="w-full px-4 planning-area" :class="{ 'planning-area-full': showBreaks }">
                            <div class="w-full border-b-2 curved py-2">
                                <h2 class="flex justify-between w-full font-bold items-center">
                                    <span>Planing Horizon</span>
                                    <span @click="toggleBreaksDisplay" class="cursor-pointer"><ChevronDown /></span>
                                </h2>
                            </div>

                            <div class="container-fluid py-3">
                                <label for="" class="text-danger">Schedule type</label>

                                <div class="w-full flex mt-2">
                                    <div class="mr-6" v-for="(type, index) in schedules" :key="index">
                                        <label class="inline-flex items-center">
                                            <input type="radio" class="form-radio h-6 w-6" @change="selectShiftType(type.actual)" v-model="type.value" name="shift">
                                            <span class="ml-2">{{ type.text }}</span>
                                        </label>
                                    </div>
                                </div>        
                            </div>

                            <div class="container-fluid pb-3 pt-3 flex justify-around">
                                <div class="w-4/12">
                                    <CustomDropdown v-model="data.location" :items="['Location', 'Area']" label="Apply To"  placeholder="--Enter--" />
                                </div>
                                <div class="w-4/12">
                                    <DatePicker label="Start Date" v-model="data.scheduleDate"  placeholder="" />
                                </div>
                                <div class="w-4/12">

                                    <label for="">
                                        <span class="uppercase font-bold text-xs">Time</span>
                                        <input type="time" v-model="shift.timeFrom" class="w-full border rounded-lg p-2" id="appt" name="appt" required>
                                    </label>
                                </div>
                            </div>

                            <div class="container-fluid pb-3 pt-3 flex justify-around dashed-bottom">
                                <div class="w-4/12">
                                     <DatePicker label="Start Date" v-model="data.scheduleDate"  placeholder="" />
                                </div>
                                <div class="w-4/12">
                                    <label for="">
                                        <span class="uppercase font-bold text-xs">Time</span>
                                        <input type="time" v-model="shift.timeFrom" class="w-full border rounded-lg p-2" id="appt" name="appt" required>
                                    </label>
                                </div>
                                <div class="w-4/12">
                                    <label for="">
                                        <span class="uppercase font-bold text-xs">SLot Size(Mins/Hrs)</span>
                                        <input type="time" v-model="shift.timeFrom" class="w-full border rounded-lg p-2" id="appt" name="appt" required>
                                    </label>
                                </div>
                            </div>

                            <div class="container-fluid pb-3 pt-3 flex justify-around">
                                <div class="w-4/12">
                                     <CornieInput label="Comment" v-model="data.comment"  placeholder="Enter" />
                                </div>
                                <div class="w-4/12">
                                   
                                </div>
                                <div class="w-4/12">
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div title="Shift Breaks" class="mt-6 bg-white shadow-xl">
                        <div class="w-full px-4 breaks-area" :class="{ 'breaks-area-full': showPlanning }">
                             <div class="w-full border-b-2 curved py-2 my-2">
                                <h2 class="flex w-full justify-between items-center">
                                    <span>
                                        <span class="font-bold">Add Breaks</span>
                                        <span class="primary-text mx-3 text-xs">(This section is optional and can be added if desired)</span>
                                    </span>
                                    <span @click="togglePlanningDisplay" class="cursor-pointer"><ChevronDown /></span>
                                </h2>
                            </div>
                            
                            <div class="container-fluid py-4">
                                <p class="flex justify-between items-center">
                                    <label for="">Break type</label>
                                    <ToggleCheck :checkedText="'Active'" :uncheckedText="'Inactive'" />
                                </p>

                                <div class="w-full flex mt-3">
                                    <div class="mr-6" v-for="(type, index) in breakTypes" :key="index">
                                        <label class="inline-flex items-center">
                                            <input type="radio" class="form-radio h-6 w-6" @change="selectBreakType(type.code)" v-model="type.code" name="break" >
                                            <span class="ml-2">{{ type.display }}</span>
                                        </label>
                                    </div>
                                </div>                                
                            </div>

                            <div class="container-fluid pb-3 pt-3 flex justify-around">
                                <div class="w-4/12">
                                    <CornieInput v-model="data.location" label="Description"  placeholder="--Enter--" />
                                </div>
                                <div class="w-4/12">
                                    <label for="" class="w-95">
                                        <span class="uppercase font-bold text-xs">Start Time</span>
                                        <div class="w-10/12">
                                            <input type="time" v-model="shift.timeFrom" class="w-full border rounded-lg p-2 w-95" id="appt" name="appt" required>
                                        </div>
                                    </label>
                                </div>
                                <div class="w-4/12">
                                    <label for="">
                                        <span class="uppercase font-bold text-xs">End Time</span>
                                        <div class="w-10/12">
                                            <input type="time" v-model="shift.timeFrom" class="w-full border rounded-lg p-2 w-95" id="appt" name="appt" required>
                                        </div>
                                        
                                    </label>
                                </div>
                            </div>

                            <div class="container-fluid pb-3 pt-3 flex justify-around">
                                <div class="w-4/12">
                                    <CornieInput v-model="data.location" label="duration (MINUTES)"  placeholder="" :disable="true" />
                                    
                                </div>
                                <div class="w-4/12">
                                    
                                </div>
                                <div class="w-4/12">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="w-full mb-12">
            <div class="container-fluid">
                <label for="" class="flex items-center mb-3">
                    <input type="checkbox" name="" id="">
                    <span class="mx-3">Send email to scheduled actors.</span>
                </label>
                <label for="" class="flex items-center">
                    <input type="checkbox" name="" id="">
                    <span class="mx-3">Break Email reminders to practitioners.</span>
                </label>
            </div>
        </div>
        <div class="w-full mb-12">
            <div class="container-fluid mb-8 flex justify-end items-center">
                <corniebtn :loading="false">
                    <router-link :to="{ name: 'Patient Experience Management' }" class="cursor-pointer bg-white focus:outline-none text-gray-500 border mr-6 font-bold py-3 px-8 rounded-full">
                        Cancel
                    </router-link>
                </corniebtn>
                <Button :loading="loading">
                    <a @click="saveShift"  style="background: #FE4D3C" class="bg-red-500 hover:bg-blue-700 cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-full">
                        Save 
                    </a>
                </Button>
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

const healthcare = namespace('healthcare');
const shifts = namespace('shifts');

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
  },
})
export default class Shift extends Vue {
 showDetails = true;
 showBreaks = false;
 showPlanning = false;
 loading = false;

    data: any = { }

 shift: any = {
     healthcareServices: [ ]
 }

 @healthcare.State
 healthcares!: IHealthcare[];

 @healthcare.Action
 fetchHealthcares!: () => Promise<void>;

 @shifts.State
 shifts!: any[];

 @shifts.Action
 createShift!: (shift: any) => Promise<boolean>;

 @shifts.Action
 updateShift!: (shift: any) => Promise<boolean>;

 @shifts.Action
 getShifts!: () => Promise<void>;


 timeZones = [
    'Africa/Lagos', 'Africa/Algiers', 'Europe/Amsterdam', 'Europe/Berlin', 'Europe/Rome', 'WAT: West Africa Time', 'WEST: Western European Summer Time', 'MET: Middle European Time', 'CET: Central European Time'
 ]

 schedules: any = [
     { text: 'Daily', value: false, actual: 'daily'},
     { text: 'Weekly', value: false, actual: 'weekly'},
     { text: 'Monthly', value: false, actual: 'monthly'}
 ]

 breakTypes = [
     { display: 'Breakfast', code: 'breakfast'},
     { display: 'Lunch', code: 'lunch'},
     { display: 'Coffee', code: 'coffee'},
     { display: '1/2 Hours', code: '1/2 hours'},
     { display: 'Unpaid', code: 'unpaid'},
 ]

 toggleDetailsDisplay() {
     this.showDetails = !this.showDetails;
 }

 toggleBreaksDisplay() {
     this.showBreaks = !this.showBreaks;
 }

 togglePlanningDisplay() {
     this.showPlanning = !this.showPlanning;
 }


 healthServiceSelected(data: any) {
     this.shift.healthcareServices.push(data);
 }

 zoneSelected(data: any) {
     this.shift.timeZone = data;
 }

 get items() {
     return this.healthcares.map(i => {
         return { id: i.id, name: i.name };
     })
 }


 mounted() {
    if (this.shift.schedule) this.selectSchedule(this.shift.schedule);
 }

 selectShiftType(type: string) {
     this.shift.type = type;
 }

 selectSchedule(type: string) {
    this.schedules = this.schedules.map((i: any) => {
        if (i.actual === type) {
            i.value = true;
            this.shift.schedule = type;            
        } else {
            i.value = false;
        }
        return i;
    })
 }

 selectBreakType(type: string) {
    this.shift.breakType = type;
 }

 async saveShift() {
     const body = {
         ...this.shift,
         id: this.$route.query.shiftId,
     }
     console.log(body, "body");
     this.loading = true;
     if (!this.$route.query.shiftId) {
         try {
             await this.createShift(body);
             this.$router.push({ name: 'Patient Experience Management'})
         } catch (error) {
             console.log(error);
             
         }
     } else {
         try {
             this.loading = true;
             await this.updateShift(body);
             this.$router.push({ name: 'Patient Experience Management'})
         } catch (error) {
             console.log(error);
             
         }
     }
     this.loading = false;
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
        height: 39px;
        transition: all .4s ease-in-out;
        overflow-y: hidden;
    }

    .details-area-full {
        height: 414px;
        transition: all .4s ease-in-out;
        overflow-y: hidden;
    }

    .planning-area {
        height: 39px;
        transition: all .4s ease-in-out;
        overflow-y: hidden;
    }

    .planning-area-full {
        height: 398px;
        transition: all .4s ease-in-out;
        overflow-y: scroll;
    }

    .breaks-area {
        height: 48px;
        transition: all .4s ease-in-out;
        overflow-y: hidden;
    }

    .breaks-area-full {
        height: 340px;
        transition: all .4s ease-in-out;
        overflow-y: hidden;
    }
</style>
