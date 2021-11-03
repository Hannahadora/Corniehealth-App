<template>
  <detail-card height="auto" title="Appointments">
     <template #actions>
     <add-icon/>
   </template>
    <div class="p-8">
      <noappoint-icon class="flex mt-2 justify-center w-full text-center"/>
        <p class="mt-4 text-sm text-gray-500 text-center pb-5">Patient have no appoinntment saved. <br>
        Add new  by clicking the add icon</p>
    </div>
    
  </detail-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DetailCard from "./detail-card.vue";
import { namespace } from "vuex-class";
import IAppointment from "@/types/IAppointment";
import CalendarIcon from "@/components/icons/acalendar.vue";
import NoappointIcon from "@/components/icons/noappoint.vue";
import { IPatient } from "@/types/IPatient";
import { cornieClient } from "@/plugins/http";
import Actors from "./actors.vue";
import MoreActors from "@/views/dashboard/schedules/components/actors.vue"
import ILocation from "@/types/ILocation";
import AddIcon from "@/components/icons/add.vue";

const appointment = namespace("appointment");
const patients = namespace("patients");
const location = namespace("location");

@Options({
  name: "AppointmentCard",
  components: {
    DetailCard,
    CalendarIcon,
    NoappointIcon,
    MoreActors,
    Actors,
    AddIcon
  },
})
export default class AppointmentCard extends Vue {
  onePatientId="";
onePractitionerId="";
newslot: any;
appointmentNotes=[];
availableSlots=[];
availablepractioner=[];
locationId ="";

@location.State
  locations!: ILocation[];

  @patients.State
  patients!: IPatient[];

  @appointment.State
  patientappointments!:IAppointment[];


  @appointment.Action
  fetchByIdAppointments!: (patientId: string) => Promise<void>;

     get patientId() {
       return this.$route.params.id as string;
     }
       get newmedicationrequest () { 
  return this.patientappointments.slice(0, 3) 
  }

      get items() {
        const filteritems =  this.patientappointments.filter((c) => c !== null);
        const newappointment = filteritems.slice(0, 3) 
    const patientappointments = newappointment.map((patientappointment:any) => {
          (patientappointment as any).createdAt= new Date(
         (patientappointment as any).createdAt
       ).toLocaleDateString("en-US",{ day: 'numeric', month: 'long', year: 'numeric' });

        
     const singleParticipantlength =
        patientappointment.Practitioners.length +
        patientappointment.Devices.length +
        patientappointment.Patients.length + patientappointment.Location.length + patientappointment.HealthCare.length;

            const pateintId = patientappointment.Patients.map((patient:any) =>{
            this.onePatientId =  patient.patientId;
       
      });
      const onelocationId =  patientappointment.Location.map((location:any) =>{
            this.locationId =  location.id;
       
      });
       const practitionerId = patientappointment.Practitioners.map((Practitioner:any) =>{
            this.onePractitionerId =  Practitioner.practitionerId;
            this.availablepractioner = Practitioner.practitioner;
       
      });
      const patientNewId = this.onePatientId;
      return {
        ...patientappointment,
       action: patientappointment.id,
        patient: this.getPatientName(this.onePatientId),
       newslot:this.showSlots(patientappointment.slot),
        Participants: singleParticipantlength,
        practitioner:this.availablepractioner,
        location: this.getLocation(this.locationId)
        
      };
    });  
     return patientappointments;
  }
  getLocation(id:string){
     const pt = this.locations.find((i: any) => i.id === id);
      return pt ? `${pt.name}` : '';
  }
    getPatientName(id: string) {
            const pt = this.patients.find((i: any) => i.id === id);
            return pt ? `${pt.firstname} ${pt.lastname}` : '';
    }
     showSlots(id:string){
        const pt = this.availableSlots.find((i: any) => i.id === id);
          this.newslot = pt;
           return pt ? `${this.newslot.startTime} - ${this.newslot.endTime}` : '';
      // return  `${this.newslot.startTime} ${this.newslot.startTime}`;
  }
    async getSlot(){
        const AllSlots = cornieClient().get(`/api/v1/slot/practitioner/${this.onePractitionerId}`);
        const response = await Promise.all([AllSlots]);
        this.availableSlots = response[0].data;
    }
    async created() {
        await this.fetchByIdAppointments(this.$route.params.id.toString());
        this.getSlot();
    }
}
</script>
