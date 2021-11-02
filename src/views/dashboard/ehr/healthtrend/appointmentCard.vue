<template>
  <detail-card height="auto" title="Appointments">
     <template #actions>
     <add-icon/>
   </template>
    <div class="p-8" v-if="items.length === 0">
      <noappoint-icon class="flex mt-2 justify-center w-full text-center"/>
        <p class="mt-4 text-sm text-gray-500 text-center pb-5">Patient have no appoinntment saved. <br>
        Add new  by clicking the add icon</p>
    </div>
      <div v-else >
      <div class="flex flex-col">
        <div class="-my-8 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden border-0">
              <table class="min-w-full">
                <thead class="border-b-2 border-gray-100">
                  <tr>
                    <th scope="col" class="px-1 py-1 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" class="px-1 py-1 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      practitioner
                    </th>
                    <th scope="col" class="px-1 py-1 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Appointment Type
                    </th>
                    <th scope="col" class="px-1  py-1 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                   
                  </tr>
                </thead>
                <tbody class="bg-white ">
                  <tr  class="border-b-2 border-gray-100" v-for="(input, index) in items" :key="index">
                    <td class="px-1 py-1 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <calendar-icon/>
                        </div>
                        <div class="ml-0">
                          <div class="text-sm font-bold text-primary">
                            {{
                              new Date(
                              input.createdAt
                            ).toLocaleDateString("en-US",{ day: 'numeric', month: 'long', year: 'numeric' })
                            }}
                          </div>
                          <div class="text-sm mt-1 font-light text-gray-800">
                            {{input.newslot}} (1 slot)
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-1 py-1 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                           <span class="rounded-full">
                               <more-actors :items="input.practitioner" v-if="input.practitioner.length > 1"/>
                              <Actors :items="input.practitioner" v-else/>
                          </span>
                        </div>
                        <div class="ml-0">
                          <div class="text-sm font-bold text-black">
                            Dr. {{input.practitioner.firstName +' '+ input.practitioner.lastName}}
                          </div>
                          <div class="text-sm mt-1 font-light text-gray-800">
                            {{input.practitioner.department}}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-1 py-1 whitespace-nowrap text-sm text-black">
                        {{input.appointmentType}}
                    </td>
                    <td class="px-1 py-1 whitespace-nowrap text-sm text-black" v-if="input.Location.length > 0">
                      {{input.location}}
                    </td>
                    <td class="px-1 py-1 whitespace-nowrap text-sm text-black" v-else>
                      No location
                    </td>
                  </tr>

                  <!-- More people... -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

       <div class="w-full flex justify-end pb-2 mt-5">
        <div class="text-xs text-danger mt-5 font-semibold">
          <span class="cursor-pointer" @click="$router.push(`/dashboard/provider/clinical/${patientId}/appointments`)">
           Manage Appointments
          </span>
        </div>
      </div>
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
