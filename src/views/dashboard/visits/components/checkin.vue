<template>
    <div class="w-full p-4 overflow-y-scroll h-scrren">
        <div class="container-fluid">

            <div class="w-full" v-if="item.Patients && item.Patients.length > 0">
                <PatientDetails :id="appointmentPatients.length > 0 ? appointmentPatients[0].code : ''" />
            </div>

            <div class="w-full flex items-center">
                <div class="w-4/12">
                    <div class="w-11/12">
                        <label class="block uppercase mb-1 text-xs font-bold">
                            Time
                            <input type="time" name="" class="p-3 border rounded-md w-full" id="" v-model="data.time">
                        </label>
                    </div>
                </div>
                <div class="w-8/12 flex">
                    <div class="container">
                        <div class="w-12/12">
                            <DatePicker color="red" class="w-full" :label="'Date'" style="width: 100% !important" width="100%" v-model="date" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full my-5">
                <label class="block uppercase mb-1 text-xs font-bold">
                    <span class="flex justify-between">
                        <span class="uppercase font-semibold">Physician</span>
                        <span class="uppercase  text-danger">reassign to physician</span>
                    </span>
                    <!-- <input type="text" name="" class="p-3 border rounded-md w-full mt-1" id="" v-model="data.time"> -->
                    <!-- <CornieSelect :items="actors" v-model="data.practitioner" @change="selectPractitioner" style="width: 100%" /> -->
                    <span>
                        <MultiSelect :fullWidth="true">
                        <template #selected>
                            <span>
                                <span>{{ selectedPractitioners }}</span>
                            </span>
                        </template>
                        <div style="max-height: 350px;overflow-y: scroll;z-index:99999" class="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div class="py-1 px-1" role="none">
                                <div class="w-full flex relative items-center my-2" v-for="(actor, index) in allActors" :key="index">
                                    <div class="w-1/12">
                                        <input type="checkbox" :checked="selectedActors.findIndex(i => i.code === actor.code) >= 0" name="" @click="selectPractitioner(actor)" id="">
                                    </div>
                                    <div class="w-5/12" @click="selectPractitioner(actor)">
                                        <p class="capitalize font-semibold text-sm">{{ actor.display }}</p>
                                        <span class="capitalize text-gray-400 font-normal text-xs">{{ actor.type}}</span>
                                    </div>
                                    <div class="w-6/12 flex justify-between ml-1">
                                        <span class="text-danger text-xs font-semibold capitalize">View Avaliability</span>
                                        <span class="text-danger text-xs font-semibold capitalize">View Profile</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </MultiSelect>
                    </span>
                </label>
            </div>

            <div class="w-full my-4" style="border-bottom: 1px dashed #C2C7D6;">
                <CornieSelect :items="rooms" :label="'Room'" v-model="checkinData.roomId" style="width: 100%" />
            </div>

            <!-- <div class="w-full my-4">
                <CornieSelect :items="allPatients" :label="'Patient'" v-model="checkinData.patientId" style="width: 100%" />
            </div> -->

            <div class="w-full my-4">
                <CornieSelect :items="slots" :label="'Slot'" v-model="checkinData.slot" style="width: 100%;font-size:13px" />
            </div>

            <div class="w-full mb-4 mt-8">
                <TextArea :label="'Notes'" v-model="checkinData.notes" style="width: 100%" />
            </div>

            <div class="w-full">
                <div class="container-fluid">
                    <p class="font-semibold font-normall text-sm">All patients for visit</p>
                </div>
                
                <div class="container-fluid my-5 pb-2" v-for="(patient, index) in appointmentPatients" :key="index">
                    <Visitor :id="patient.id" />
                </div>
            </div>


        </div>
        <div class="w-full mb-3 mt-8">
            <div class="container-fluid flex justify-end items-center">
                <corniebtn>
                    <router-link to="" style="border: 1px solid #080056;" class="cursor-pointer bg-white focus:outline-none text-primary border mr-6 font-bold py-3 px-8 rounded-full">
                        Cancel
                    </router-link>
                </corniebtn>
                <!-- <button  style="background: #FE4D3C;border-radius: 124px;" class="flex items-center">
                    <a @click="setSession" class="hover:bg-blue-700 cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-full">
                        Save 
                    </a>
                    <p style="height: 48px" class="px-4 border-l-2 flex items-center">A</p>
                </button> -->
                <SplitButton>
                    <template #main>
                        <span @click="setSession" >Check-In</span>
                    </template>
                    <template #dropdown>
                        <span><ChevronDown class="stroke-current white dd" /></span>
                    </template>
                </SplitButton>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Accordion from "@/components/accordion-component.vue";
import CornieInput from "@/components/cornieinput.vue";
import { namespace } from 'vuex-class';
import CustomDropdown from '@/components/cornieselect.vue'
import Button from '@/components/globals/corniebtn.vue'
import DeleteIcon from '@/components/icons/delete.vue'
import ChevronDown from '@/components/icons/chevrondownprimary.vue'
import DatePicker from '@/components/datepicker.vue'
import ToggleCheck from '@/components/ToogleCheck.vue'
import CornieSelect from '@/components/cornieselect.vue'
import TextArea from '@/components/textarea.vue'
import ILocation from "@/types/ILocation";
import { Prop, Watch } from "vue-property-decorator";
import SplitButton from '@/components/split-button.vue'
import PatientDetails from './patient-details.vue'
import slotService from '../helper/slot-service'
import MultiSelect from '../../schedules/components/apply-to.vue'
import IPractitioner from "@/types/IPractitioner";
import Visitor from './visitor.vue'

const visitsStore = namespace('visits');
const locationsStore = namespace('location');
const practitionersStore = namespace('practitioner');
const appointment = namespace("appointment");

@Options({
  components: {
      SplitButton,
      Visitor,
      Accordion,
      CornieInput,
      CustomDropdown,
      Button,
      DeleteIcon,
      ChevronDown,
      DatePicker,
      ToggleCheck,
      CornieSelect,
      TextArea,
      PatientDetails,
      MultiSelect,
  },
})
export default class CheckIn extends Vue {
 showDetails = true;
 showBreaks = false;
 showPlanning = false;
 loading = false;
 selectedActors: any = [ ]
 schedules: any = [ ]

 @Prop()
 item!: any;

 availableSlots: any = [ ]
 checkinData: any = {
    "appointmentId": this.item.id,
    "patientId": this.patientId,
    // "type": this.item.appointmentType,
    "status": "In-progress",
    "roomId": "",
    "notes": "",
    "slotId": "",
}


@appointment.State
appointments!: any[];

@appointment.Action
fetchAppointments!: () => Promise<void>;

 @visitsStore.Action
 checkin!: (body: any) => Promise<boolean>;

 @locationsStore.State
 locations!: ILocation[];

 @visitsStore.Action
 getPatients!: () => Promise<void>;

 @visitsStore.State
 patients!: any[];

 @visitsStore.Action
 schedulesByPractitioner!: (id: string) => Promise<any>;

 @locationsStore.Action
 fetchLocations!: () => Promise<void>;

 @practitionersStore.State
 practitioners!: IPractitioner[];

 @practitionersStore.Action
 fetchPractitioners!: () => Promise<void>;


  @visitsStore.Action
  createSlot!: (body: any) => Promise<any>;

async setSession() {
    
     let body = {
      "scheduleId": this.checkinData.scheduleId,
        startTime: this.checkinData.slot.split('-')[0].trim(),
        endTime: this.checkinData.slot.split('-')[1].trim(),
      "status": "active",
      "active": true,
    }

    
    console.log(body, "BODY");
    
    try {
        this.loading = true;
        const slot = await this.createSlot(body);
        this.loading = false;
        if (slot && slot.id) {
            const checkedIn = await this.checkin({
                "patientId": this.item.Patients && this.item.Patients.length > 0 ? this.item.Patients[0].id : "",
                 "appointmentId": this.item?.id,
                // "type": this.checkinData.type,
                "status": "In-progress",
                "roomId": this.checkinData.roomId,
                "notes": this.checkinData.notes,
                "slotId": slot.id,
                // "practitioners": this.selectedActors.map(i => i.id)
            });
            
            if (checkedIn && checkedIn) {
                window.notify({ msg: "Patient Check-in", status: "success" });
                this.$emit("close")
            } else {
                window.notify({ msg: "Patient check-in failed", status: "error" });
            }
            
        } else {
            window.notify({ msg: "Error checking-in patient", status: "error" });
        }
    } catch (error) {
        this.loading = false;
        console.log(error.response, "ERROR");
        
    }
 }

data: any = { date: new Date(Date.now()), time: new Date().toTimeString().substring(0, 5) }
date = new Date();
 activeStates: any = [
     { display: 'Yes', value: 'yes' },
     { display: 'No', value: 'no' },
 ]

 waitList: any = [
     { display: 'Yes', value: 'yes' },
     { display: 'No', value: 'no' },
 ]

 slotOccurence: any = [
     { display: 'Do not repeat', code: 'do not repeat' },
     { display: 'Every day', code: 'every day' },
     { display: 'Every week', code: 'every week' },
     { display: 'Every month', code: 'every month' },
     { display: 'Every forever', code: 'every forever' },
     { display: 'Custom', code: 'Custom' },
 ]

 ends: any = [
     { display: 'Never', code: 'never' },
     { display: 'On', code: '' },
     { display: 'After', code: '' },
 ]

 days: any = [ 
     { display: 'Monday', code: true },
     { display: 'Tuesday', code: false },
     { display: 'Wednesday', code: false },
     { display: 'Thursday', code: false },
     { display: 'Friday', code: false },
     { display: 'Saturday', code: false },
     { display: 'Sunday', code: false }
 ]

 get rooms() {
     if (!this.locations || this.locations.length === 0) return [ ];
     return this.locations.map(i => {
         return { code: i.id, display: i.name };
     })
 }

 get actors() {
     if (!this.practitioners || this.practitioners.length === 0) return [ ];
     return this.practitioners.map((i: any) => {
         return { code: i.id, display: i.firstName + i.lastName };
     })
 }

get actorsInAppointment() {
    if (!this.item || !this.item.appointmentId) return [ ];
    const apmt =  this.appointments.find((i: any) => i.id === this.item.appointmentId);
    
    return apmt ? apmt.Practitioners : [ ];
}

 get allActors() {
    if (!this.practitioners || this.practitioners.length === 0) return [ ];
    return this.practitioners.map(i => {
        return { code: i.id, display: `${i.firstName} ${i.lastName }`, type: i.type };
    })
 }

 get selectedPractitioners() {
     if (!this.selectedActors || this.selectedActors.length === 0) return 'Select';
     let str = this.selectedActors[0].display;
     if (this.selectedActors.length > 1) return `${str}...`;
     return str;
 }

 get allPatients() {
     if (!this.patients || this.patients.length === 0) return [ ];
     return this.patients.map((i: any) => {
         return {
             code: i.id,
             display: `${i.firstname} ${i.lastname}`
         }
     })
 }

 get scheduleId() {
     if (!this.schedules || this.schedules.length === 0) return 0;
     return this.schedules[0].id
 }

 get patientId() {
     if (!this.item || !this.item.Practitioners || this.item.Practitioners.length === 0) return 0;
     return this.item.Practitioners[0].id
 }

 get appointmentPatients() {
     if (!this.item.Patients || this.item.Patients.length === 0) return [ ];
     if (this.item.Patients.length > 2) return this.item.Patients.slice(0, 2)
     return this.item.Patients.map((i: any) => {
         return {
             code: i.id,
             display: `${i.firstname} ${i.lastname}`
         }
     })
 }

 get slots() {
     if (!this.availableSlots || this.availableSlots.length === 0) return [ ];
     return this.availableSlots.map((i: any) => {
         return { code: `${i.start} - ${i.end}`, display: `${i.start} - ${i.end}` }
     })
 }

  selectPractitioner(actor: any) {
     if (this.selectedActors.findIndex((i: any) => i.code === actor.code) < 0) {
        this.getSlots(actor.code);
        this.selectedActors.push(actor)
     } else {
         this.selectedActors = this.selectedActors.filter((i: any) => i.code !== actor.code)
     }
 }

 getSlots(id: string) {
     this.availableSlots = [ ]
    this.schedulesByPractitioner(id).then(res => {        
        if (!res || res.length == 0) return ;
        const todaySlots = res.filter((i: any) => slotService.matchDates(this.visitDate.toString(), i.startDate))        
        this.checkinData.scheduleId = todaySlots.length > 0 ? todaySlots[0].id : '';
        const firstSchedule = todaySlots.length > 0 ? todaySlots[0] : { };
        this.availableSlots = slotService.getAvailableSlots([ firstSchedule ])
    })
 }

get visitDate() {
    if (!this.date) return new Date(Date.now());
    const x =  new Date(`${new Date(this.date).toISOString()}`)
    return x;
 }
 

 @Watch('item', { immediate: true, deep: true })
 onGetSlots() {
     console.log(this.item, "MMMM");
     
     if (!this.item || !this.item.Practitioners || this.item.Practitioners.length === 0) return;
     if (this.patientId) this.getSlots(this.patientId)
 }

 @Watch('date', { immediate: true, deep: true })
 refreshSlots() {
     if (this.patientId) this.getSlots(this.patientId)
 }



    async created() {
        if (!this.locations || this.locations.length === 0) await this.fetchLocations();
        if (!this.patients || this.patients.length === 0) await this.getPatients();
        if (!this.appointments || this.appointments.length === 0) await this.fetchAppointments();
        if (!this.practitioners || this.practitioners.length === 0) await this.fetchPractitioners();
        console.log(this.practitioners, "pracs");
        console.log(this.patients, "pats");
        

        // this.checkin(req).then((res: any) => {
        //   console.log(res, "VISIT");
        // })
        // .catch((err: any) => {
        //   console.log(err);
        
        // });
    
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
</style>
