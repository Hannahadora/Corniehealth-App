<template>
    <div class="w-full  p-4 h-scrren" style="height: fit-content">
        <div class="container-fluid">
            <div class="w-full border-b-2 curved flex py-2 bg-white px-4">
                <div class="container-fluid flex font-semibold text-xl py-2">
                    <h2>Create Schedule</h2>
                </div>
            </div>

            <div class="w-full my-6">
                <div class="container-fluid">
                    <div title="Shift Details" class="bg-white shadow-xl rounded-lg">
                        <div class="w-full px-4 details-area " :class="{ 'details-area-full': showDetails, 'details-area-fuller': showSelectArea }">
                            <div class="w-full curved py-2"  :class="{ 'border-b-2': showDetails }">
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
                                    <CustomDropdown v-model="data.locationId" :items="allLocations" label="Location"  placeholder="--Enter--" />
                                </div>
                                <div class="w-4/12">
                                     <div class="w-full">
                                        <div class="w-11/12">
                                            <CornieInput label="Name" v-model="data.name"  placeholder="Enter" />
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="w-4/12">
                                     <div class="w-full">
                                        <div class="w-11/12">
                                            <CornieInput label="Description" v-model="data.description" class="w-95" placeholder="Enter" />
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>

                            <div class="container-fluid py-3 flex justify-around">
                                <div class="w-4/12">
                                    <CustomDropdown label="Service Category" class="w-95" v-model="data.serviceCategory" :items="categories" placeholder="Enter" />
                                </div>
                                <div class="w-4/12">
                                    <CustomDropdown label="Service Type" class="w-95" v-model="data.serviceType" :items="serviceTypes" placeholder="Enter" />
                                </div>
                                <div class="w-4/12">
                                    <CustomDropdown label="Specialty" class="w-95" v-model="data.specialty" :items="specialties" placeholder="Enter" />
                                </div>
                            </div>

                            <div class="container-fluid my-4">
                                <p class="text-sm font-normal font-bold uppercase flex items-center cursor-pointer" style="color: #FE4D3C" @click="toggleSelectDisplay"><span class="mr-3">Select Actor(s) for this schedule </span><AddIcon /></p>
                            </div>

                            <div class="container-fluid my-3">
                                <div class="w-full flex" v-if="showSelectArea">
                                    <div class="w-4/12 mb-3">
                                        <div class="w-11/12 mx-auto">
                                            <SearchBox :items="actors" >
                                                <template #item="data">
                                                    <p class="my-2 flex justify-between">
                                                        <span>{{ data.item.display }}</span>
                                                        <span @click="actorSelected(data.item)" class="text-danger font-semibold text-lg cursor-pointer">Add</span>
                                                    </p>
                                                </template>
                                            </SearchBox>
                                        </div>
                                    </div>
                                    <div class="w-4/12 mb-3">
                                        <div class="w-11/12 mx-auto">
                                            <SearchBox :items="allDevices">
                                                <template #item="data">
                                                    <p class="my-2 flex justify-between">
                                                        <span>{{ data.item.display }}</span>
                                                        <span @click="deviceSelected(data.item)" class="text-danger font-semibold text-lg cursor-pointer">Add</span>
                                                    </p>
                                                </template>
                                            </SearchBox>
                                        </div>
                                    </div>
                                    <!-- <div class="w-4/12 mb-3">
                                        <div class="w-11/12 mx-auto">
                                            <SearchBox :items="allHealthcares">
                                                <template #item="data">
                                                    <p class="my-2 flex justify-between">
                                                        <span>{{ data.item.display }}</span>
                                                        <span @click="actorSelected(data.item)" class="text-danger font-semibold text-lg cursor-pointer">Add</span>
                                                    </p>
                                                </template>
                                            </SearchBox>
                                        </div>
                                    </div> -->
                                </div>

                                <div class="w-full flex">
                                    <div class="w-4/12 py-3">
                                        <div class="w-11/12 mx-auto">
                                            <p class="text-sm font-normal font-bold uppercase flex items-center cursor-pointer py-2" style="border-bottom: 1px dashed #C2C7D6" >
                                                <span class="mr-3">Practioners </span></p>
                                            <div class="w-full flex items-center" v-for="(actor, index) in data.practitioners" :key="index">
                                                <div class="w-1/12">
                                                    <div class="w-full">
                                                        <img v-if="actor.image" :src="actor.image" class="rounded-full border" alt="Image"  style="max-width: 50px; max-height:50px">
                                                        <img v-else src="https://via.placeholder.com/75x75" class="rounded-full border" alt="Image" style="max-width: 50px; max-height:50px">
                                                    </div>
                                                </div>
                                                <div class="w-10/12 px-5">
                                                    <p class="flex flex-col">
                                                        <span>{{ actor.display }}</span>
                                                        <span class="text-xs">{{ actor.job }}</span>
                                                    </p>
                                                </div>
                                                <div class="w-1/12">
                                                    <span @click="removeActor(actor.code)"><DeleteIcon /></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="w-4/12 py-3">
                                        <div class="w-11/12 mx-auto">
                                        <p class="text-sm font-normal font-bold uppercase flex items-center cursor-pointer py-2" style="border-bottom: 1px dashed #C2C7D6" >
                                            <span class="mr-3">Devices </span></p>
                                            <div class="w-full flex items-center" v-for="(actor, index) in data.devices" :key="index">
                                                <div class="w-1/12">
                                                    <div class="w-full">
                                                        <img v-if="actor.image" :src="actor.image" class="rounded-full border" alt="Image"  style="max-width: 50px; max-height:50px">
                                                        <img v-else src="https://via.placeholder.com/75x75" class="rounded-full border" alt="Image" style="max-width: 50px; max-height:50px">
                                                    </div>
                                                </div>
                                                <div class="w-10/12 px-5">
                                                    <p class="flex flex-col">
                                                        <span>{{ actor.display }}</span>
                                                        <span class="text-xs">{{ actor.job }}</span>
                                                    </p>
                                                </div>
                                                <div class="w-1/12">
                                                    <span @click="removeActor(actor.code)"><DeleteIcon /></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- <div class="w-4/12 py-3">
                                        <div class="w-11/12 mx-auto pt-2" style="border-top: 1px dashed #C2C7D6">
                                            <div class="w-full flex items-center" v-for="(actor, index) in data.practitioners" :key="index">
                                                <div class="w-1/12">
                                                    <div class="w-full">
                                                        <img v-if="actor.image" :src="actor.image" class="rounded-full border" alt="Image"  style="max-width: 50px; max-height:50px">
                                                        <img v-else src="https://via.placeholder.com/75x75" class="rounded-full border" alt="Image" style="max-width: 50px; max-height:50px">
                                                    </div>
                                                </div>
                                                <div class="w-10/12 px-5">
                                                    <p class="flex flex-col">
                                                        <span>{{ actor.display }}</span>
                                                        <span class="text-xs">{{ actor.job }}</span>
                                                    </p>
                                                </div>
                                                <div class="w-1/12">
                                                    <span @click="removeActor(actor.code)"><DeleteIcon /></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <div title="Shift Timing" class="my-6 bg-white shadow-xl rounded-lg">
                        <div class="w-full px-4 planning-area" :class="{ 'planning-area-full': showPlanning }">
                            <div class="w-full curved p-2"  :class="{ 'border-b-2 py-3': showPlanning }">
                                <h2 class="flex justify-between w-full font-bold items-center">
                                    <span>Planing Horizon</span>
                                    <span @click="togglePlanningDisplay" class="cursor-pointer"><ChevronDown /></span>
                                </h2>
                            </div>

                            <div class="container-fluid py-3">
                                <label for="" class="text-danger">Schedule type</label>

                                <div class="w-full flex mt-2">
                                    <div class="mr-6" v-for="(type, index) in schedulesTypes" :key="index">
                                        <label class="inline-flex items-center">
                                            <input type="radio" class="form-radio h-6 w-6" :value="type.code" v-model="data.scheduleType">
                                            <span class="ml-2">{{ type.display }}</span>
                                        </label>
                                    </div>
                                </div>        
                            </div>

                            <div class="container-fluid pb-3 pt-3 flex justify-around">
                                <div class="w-4/12">
                                    <MultiSelect :label="'Apply To'" >
                                        <template #selected>
                                            <span>
                                                <span>{{ selectedDays }}</span>
                                            </span>
                                        </template>
                                        <div style="max-height: 280px;overflow-y: scroll" class="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                            <div class="py-1" role="none">
                                            <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                            <a class="text-gray-700 block px-4 py-2 text-sm flex items-center" role="menuitem" tabindex="-1" id="menu-item-0"
                                                v-for="(day, index) in days" :key="index"
                                            >
                                                <span><input type="checkbox" class="h-4 w-4" name="" id="" :value="day" v-model="data.days"></span>
                                                <span class="mx-2 text-lg">{{ day }}</span>
                                            </a>
                                            </div>
                                        </div>
                                    </MultiSelect>
                                </div>
                                <div class="w-4/12">
                                    <!-- <DatePicker label="Start Date"  placeholder="" /> -->
                                    <DateTimePicker :label="'Start date'">
                                        <template #date>
                                            <span><span>{{ new Date(data.startDate ?? Date.now()).toLocaleDateString()}}</span></span>
                                        </template>
                                        <template #time>
                                            <span><span>{{ data.startTime }}</span></span>
                                        </template>
                                        <template #input>
                                            <v-date-picker  v-model="data.startDate" style="position:relative;z-index:9000;width:100%"></v-date-picker>
                                             <label
                                                class="block uppercase my-1 text-xs font-bold"
                                                >
                                                Time
                                            </label>
                                            <input v-model="data.startTime" type="time" class="w-full border rounded-md p-2">
                                        </template>
                                    </DateTimePicker>
                                </div>
                                <div class="w-4/12">
                                    <DateTimePicker :label="'End date'">
                                        <template #date>
                                            <span>{{ new Date(data.endDate ?? Date.now()).toLocaleDateString()}}</span>
                                        </template>
                                        <template #time>
                                            <span>{{ data.endTime }}</span>
                                        </template>
                                        <template #input>
                                            <v-date-picker name="eeee" v-model="data.endDate" style="z-index:9000;width:100%"></v-date-picker>
                                            <label
                                                class="block uppercase my-1 text-xs font-bold"
                                                >
                                                Time
                                            </label>
                                            <input v-model="data.endTime" type="time" class="w-full border rounded-md p-2">
                                        </template>
                                    </DateTimePicker>
                                </div>
                            </div>

                            <div class="container-fluid pb-3 pt-3 flex justify-around dashed-bottom">
                                
                                <div class="w-4/12">
                                    <label for="">
                                        <span class="uppercase font-bold text-xs">SLot Size(Mins/Hrs)</span>
                                        <input type="number" v-model="data.slotSize" class="w-full border rounded-lg p-2" id="appt" name="appt" required>
                                    </label>
                                </div>
                                <div class="w-4/12">
                                     <!-- <DatePicker label="End Date" v-model="data.endDate"  placeholder="" /> -->
                                </div>
                                <div class="w-4/12">
                                    <!-- <label for="">
                                        <span class="uppercase font-bold text-xs">Time</span>
                                        <input type="time" v-model="data.endTime" class="w-full border rounded-lg p-2" id="appt" style="width: 95%" required>
                                    </label> -->
                                </div>
                            </div>

                            <div class="container-fluid pb-3 pt-3 flex justify-around">
                                <div class="w-4/12">
                                     <CornieInput label="Comment" v-model="data.comments"  placeholder="Enter" />
                                </div>
                                <div class="w-4/12">
                                   
                                </div>
                                <div class="w-4/12">
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div title="Shift Breaks" class="mt-6 bg-white shadow-xl rounded-lg">
                        <div class="w-full px-4 breaks-area" :class="{ 'breaks-area-full': showBreaks }">
                             <div class="w-full curved py-2 my-2" :class="{ 'border-b-2 py-3': showBreaks }">
                                <h2 class="flex w-full justify-between items-center">
                                    <span>
                                        <span class="font-bold">Add Breaks</span>
                                        <span class="primary-text mx-3 text-xs">(This section is optional and can be added if desired)</span>
                                    </span>
                                    <span @click="toggleBreaksDisplay" class="cursor-pointer"><ChevronDown /></span>
                                </h2>
                            </div>
                            
                            <div class="container-fluid py-4">
                                <p class="flex justify-between items-center">
                                    <label for="">Break type</label>
                                    <ToggleCheck :checkedText="'Active'" v-model="breakData.status" :uncheckedText="'Inactive'" />
                                </p>

                                <div class="w-full flex mt-3">
                                    <div class="mr-6" v-for="(type, index) in breakTypes" :key="index">
                                        <label class="inline-flex items-center">
                                            <input type="radio" class="form-radio h-6 w-6" :value="type.code" v-model="breakData.type" name="break" >
                                            <span class="ml-2">{{ type.display }}</span>
                                        </label>
                                    </div>
                                </div>                                
                            </div>

                            <div class="container-fluid pb-3 pt-3 flex justify-around">
                                <div class="w-4/12">
                                    <CornieInput v-model="breakData.description" label="Description"  placeholder="--Enter--" />
                                </div>
                                <div class="w-4/12">
                                    <label for="" class="w-95">
                                        <span class="uppercase font-bold text-xs">Start Time</span>
                                        <div class="w-10/12 mx-auto">
                                            <input type="time" v-model="breakData.startTime" class="w-full border rounded-lg p-2 w-95" id="appt" required>
                                        </div>
                                    </label>
                                </div>
                                <div class="w-4/12">
                                
                                    <label for="">
                                        <span class="uppercase font-bold text-xs">End Time</span>
                                        <div class="w-10/12">
                                            <input type="time" v-model="breakData.endTime" class="w-full border rounded-lg p-2 w-95" required>
                                        </div>
                                        
                                    </label>
                                </div>
                            </div>

                            <div class="container-fluid pb-3 pt-3 flex justify-around">
                                <div class="w-4/12">
                                    <CornieInput v-model="breakData.duration" label="duration (MINUTES)"  placeholder="" :disable="true" />
                                    
                                </div>
                                <div class="w-4/12">
                                    <!-- <DateTimePicker /> -->
                                </div>
                                <div class="w-4/12">
                                    
                                </div>
                            </div>

                            <div class="w-full mb-4">
                                <div class="container-fluid mb-8 flex justify-end items-center">
                                    <Button>
                                        <a @click="addBreak"  style="background: #35BA83" class="hover:bg-blue-700 cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-full">
                                            Save 
                                        </a>
                                    </Button>
                                </div>
                            </div>

                            <div class="w-full mb-12">
                                <div class="container-fluid mb-8 border-t-2 pt-2">
                                    <div class="w-full flex">
                                        <div class="w-3/12">
                                            <span class="font-semibold">Break Type</span>
                                        </div>
                                        <div class="w-3/12">
                                            <span class="font-semibold">Description</span>
                                        </div>
                                        <div class="w-3/12">
                                            <span class="font-semibold">Start Time</span>
                                        </div>
                                        <div class="w-3/12">
                                            <span class="font-semibold">End Time</span>
                                        </div>
                                    </div>

                                    <div class="w-full flex" v-for="(item, index) in data.breaks" :key="index">
                                        <div class="w-3/12">
                                            <span class="text-sm text-gray-500">{{ item.type }}</span>
                                        </div>
                                        <div class="w-3/12">
                                            <span class="text-sm text-gray-500">{{ item.description }}</span>
                                        </div>
                                        <div class="w-3/12">
                                            <span class="text-sm text-gray-500">{{ item.startTime }}</span>
                                        </div>
                                        <div class="w-3/12">
                                            <p class="flex justify-between">
                                                <span class="text-sm text-gray-500"> {{ item.endTime}}</span>
                                                <span @click="removeBreak(index)"><DeleteIcon :fill="'red'" style="color:red" /></span>
                                            </p>
                                        </div>
                                    </div>
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
                    <router-link :to="{ name: 'Schedules.' }" class="cursor-pointer bg-white focus:outline-none text-gray-500 border mr-6 font-bold py-3 px-8 rounded-full">
                        Cancel
                    </router-link>
                </corniebtn>
                <Button :loading="loading"
                    v-if="!$route.params.scheduleId"
                >
                    <a @click="saveSchedule"  style="background: #FE4D3C" class="bg-red-500 hover:bg-blue-700 cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-full">
                        Save
                    </a>
                </Button>
                <Button :loading="loading"
                    v-else
                     @click="saveSchedule"
                >
                    <a  style="background: #E1E3EA" class="bg-red-500 hover:bg-blue-700 cursor-pointer focus:outline-none text-gray-500 font-bold py-3 px-8 rounded-full">
                        Update
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
import IPractitioner from "@/types/IPractitioner";

import SearchBox from './components/search-box.vue'
import User from "@/types/user";
import DateTimePicker from './components/datetime-picker.vue';
import DateTimePick from './components/datetime-picker.vue';
import MultiSelect from './components/apply-to.vue'
import Templates from "@/components/icons/templates.vue";
import AddIcon from '@/components/icons/add.vue'
import IDevice from "@/types/IDevice";

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
  },
})
export default class Shift extends Vue {
 showDetails = true;
 showBreaks = false;
 showPlanning = false;
 loading = false;
 showSelectArea = false;

    data: any = { 
        days: [ ],
        practitioners: [ ],
        breaks: [ ],
        healthcares: [ ],
        devices: [ ],
    }

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

 breakTypes = [
     { display: 'Breakfast', code: 'breakfast'},
     { display: 'Lunch', code: 'lunch'},
     { display: 'Coffee', code: 'coffee'},
     { display: '1/2 Hours', code: '1/2 hours'},
     { display: 'Unpaid', code: 'unpaid'},
 ]

 specialties = [ 'Allergy and immunology', 'Diagnostic radiology', 'Anesthesiology', 'Dermatology', 'Emergency medicine', 'Pediatrics', 'Radiation oncology']
 categories = [ 'Adoption', 'Aged Care', 'Allied Health', 'Alternative/Complementary Therapies', 'Child Care /Kindergarten', 'Child Development', 'Community Health Care']
 serviceTypes = [ 'Aged Care Assessment', 'Friendly Visiting', 'Personal Alarms/Alerts', 'Acupuncture', 'Aromatherapy', 'Bowen Therapy']

 days = [
     'Monday',
     'Tuesday',
     'Wednesday',
     'Thursday',
     'Friday',
     'Saturday',
     'Sunday',
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

 toggleSelectDisplay() {
     this.showSelectArea = !this.showSelectArea;
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

 get selectedDays() {
     if (!this.data.days) return "";
     if (this.data.days.length <= 2) return this.data.days.join(", ");
     return `${this.data.days[0]}, ${this.data.days[1]}, ...`
 }

 get allLocations() {
     if (!this.locations || this.locations.length === 0) return [ ];
     return this.locations.map((i: any) => {
         return {
             code: i.id,
             display: i.name
         }
     })
 }

 get actors() {
     if (!this.practitioners || this.practitioners.length === 0) return [ ];
     return this.practitioners.map(i => {
         return {
             code: i.id,
             display: `${i.firstName} ${i.lastName}`,
             job: i.jobDesignation,
             image: i.image
         }
     })
 }

 get allDevices() {
     if (!this.devices || this.devices.length === 0) return [ ];
     return this.devices.map(i => {
         return {
             code: i.id,
             display: i.deviceName
         }
     })
 }

 get allHealthcares() {
     if (!this.healthcares || this.healthcares.length === 0) return [ ];
     return this.healthcares.map(i => {
         return {
             code: i.id,
             display: i.name
         }
     })
 }


async created() {
    if (!this.practitioners || this.practitioners.length === 0) await this.fetchPractitioners();
    if (!this.locations || this.locations.length === 0) await this.fetchLocations();
    if (!this.schedules || this.schedules.length === 0) await this.getSchedules();
    if (!this.healthcares || this.healthcares.length === 0) await this.fetchHealthcares();
    if (!this.devices || this.devices.length === 0) await this.fetchDevices();
    if (this.$route.params.scheduleId) {
        const targetSchedule = this.schedules.find((i: any) => i.id === this.$route.params.scheduleId);
        this.data = {
            ...targetSchedule,
            practitioners: targetSchedule.practitioners.map((i: any)=> {
                return {
                    code: i.id, display: `${i.firstName} ${i.lastName}`, job: i.jobDesignation, image: i.image
                }
            })
        }
    }
    
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

 async saveSchedule() {
     const body = {
         ...this.data,
         startDate: this.data.startDate,
         organizationId: this.data.organizationId ? this.data.organizationId : this.user.orgId,
         practitioners: this.data.practitioners.map((i: any) => i.code),
         devices: this.data.devices.map((i: any) => i.code),
         slotSize: +this.data.slotSize,
         id: this.$route.params.scheduleId,
         startTime: this.data.startTime ? `${this.data.startTime.split(':')[0]}:${this.data.startTime.split(':')[1]}` : '',
         endTime: this.data.endTime ? `${this.data.endTime.split(':')[0]}:${this.data.endTime.split(':')[1]}` : ''
     }
     console.log(body, "body");
     this.loading = true;
    try {
        if (!this.$route.params.scheduleId) {
            try {
                const created = await this.createSchedule(body);
                console.log(created, "CREATED");
                
                if (created) {
                    notify({
                        msg: "Schedule created successfully",
                        status: "success",
                    });
                    this.$router.push('/dashboard/provider/experience/schedules')
                } else {
                    notify({
                        msg: "Schedule creation failed",
                        status: "error",
                    });
                }
            } catch (error) {
                console.log(error);
                notify({
                    msg: "Schedule creation failed",
                    status: "error",
                });
            }
        } else {
            try {
                const updated = await this.updateSchedule(body);
                if (updated) {
                    notify({
                        msg: "Schedule updated successfully",
                        status: "success",
                    });
                    this.$router.push('/dashboard/provider/experience/schedules')
                } else {
                    notify({
                        msg: "Schedule update failed",
                        status: "error",
                    });
                }
            } catch (error) {
                notify({
                    msg: "Schedule update failed",
                    status: "error",
                });
            }
        }
        
    } catch (error) {
        console.log(error);
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
