<template>
    <div class="container-fluid border rounded">
        <div title="Shift Timing" class="bg-white shadow-xl">
            <div class="w-full planning-area" :class="{ 'planning-area-full': showPlanning }">
                <div class="w-full border-b-2 px-2 bg-gray-100 curved py-2">
                    <h2 class="flex justify-between w-full font-bold items-center">
                        <span>Planing Horizon</span>
                        <span @click="togglePlanningDisplay" class="cursor-pointer"><ChevronDown /></span>
                    </h2>
                </div>

                <div class="w-full px-2 border">
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

                    <div class="container-fluid pb-3 pt-3">
                        <div class="w-12/12 my-2">
                            <CustomDropdown v-model="data.location" :items="['Location', 'Area']" label="Apply To"  placeholder="--Enter--" style="width: 100%" />
                        </div>

                        <div class="w-full flex justify-around">
                            <div class="w-full flex justify-around ">
                                <div class="w-8/12">
                                    <DatePicker label="Start Date" v-model="data.scheduleDate"  placeholder="" />
                                </div>
                                <div class="w-4/12">
                                    <label for="">
                                        <span class="uppercase font-bold text-xs">Time</span>
                                        <input type="time" v-model="shift.timeFrom" class="w-full border rounded-lg p-2" id="appt" name="appt" required>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container-fluid pb-3 pt-3">
                        <div class="w-full flex justify-around ">
                            <div class="w-8/12">
                                <DatePicker label="Start Date" v-model="data.scheduleDate"  placeholder="" />
                            </div>
                            <div class="w-4/12">
                                <label for="">
                                    <span class="uppercase font-bold text-xs">Time</span>
                                    <input type="time" v-model="shift.timeFrom" class="w-full border rounded-lg p-2" id="appt" name="appt" required>
                                </label>
                            </div>
                        </div>
                        <div class="w-12/12">
                            <label for="">
                                <span class="uppercase font-bold text-xs">SLot Size(Mins/Hrs)</span>
                                <input type="time" v-model="shift.timeFrom" class="w-full border rounded-lg p-2" id="appt" name="appt" required>
                            </label>
                        </div>
                    </div>

                    <!-- <div class="container-fluid pb-3 pt-3 flex justify-around">
                        <div class="w-12/12">
                            <CornieInput label="Comment" v-model="data.comment"  placeholder="Enter" />
                        </div>
                    </div> -->
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
</style>
