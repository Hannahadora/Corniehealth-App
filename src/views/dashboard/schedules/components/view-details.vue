<template>
    <div class="container-fluid border rounded">
        <div title="Shift Details" class="bg-white shadow-xl border ">
            <div class="w-full details-area " :class="{ 'details-area-full': showDetails}">
                <div class="w-full border-b-2 px-2 curved py-2 bg-gray-100">
                    <h2 class="flex justify-between w-full font-bold items-center">
                        <span>Schedule Details</span>
                        <span @click="toggleDetailsDisplay" class="cursor-pointer"><ChevronDown /></span>
                    </h2>
                </div>

                <div class="w-full px-4">
                    <div class="container-fluid mt-3">
                        <p class="text-sm font-normal">All field should be filled</p>
                    </div>

                    <div class="container-fluid pb-3 pt-3">
                        <div class="w-12/12 my-2">
                            <CustomDropdown v-model="data.location" :items="['Location', 'Area']" label="Location" placeholder="--Enter--" style="width: 100%"/>
                        </div>
                        <div class="w-12/12 my-2">
                            <CornieInput label="Name" v-model="data.name"  placeholder="Enter" style="width: 100%" />
                        </div>
                        <div class="w-12/12 my-2">

                            <CornieInput label="Description" v-model="data.description" class="w-95" placeholder="Enter" style="width: 100%" />
                        </div>
                    </div>

                    <div class="container-fluid py-3">
                        <div class="w-full flex justify-between">
                            <div class="w-6/12">
                                <CustomDropdown label="Service Category" class="w-95" v-model="data.serviceCategory" :items="['items']" placeholder="Enter" />
                            </div>
                            <div class="w-6/12">
                                <CustomDropdown label="Service Type" class="w-95" v-model="data.serviceType" :items="['items']" placeholder="Enter"  style="width: 100%" />
                            </div>
                        </div>
                        <div class="w-12/12 my-2">
                            <CustomDropdown label="Specialty" class="w-95" v-model="data.specialty" :items="['items']" placeholder="Enter" style="width: 100%" />
                        </div>
                    </div>

                    <div class="container-fluid my-4">
                        <p class="text-sm font-normal">Select Actor for this schedule</p>
                    </div>

                    <div class="container-fluid my-3">
                        <div class="w-12/12 mb-3">
                            <input type="text" class="p-2 rounded-full border focus:outline-none w-full" placeholder="search">
                        </div>

                        <div class="w-12/12 border-t-2 py-3">
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
export default class EditDetail extends Vue {
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
 <style scoped>
    .details-area {
        height: 39px;
        transition: all .4s ease-in-out;
        overflow-y: hidden;
    }

    .details-area-full {
        height: 658px;
        transition: all .4s ease-in-out;
        overflow-y: hidden;
    }
 </style>