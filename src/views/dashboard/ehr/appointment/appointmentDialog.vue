<template>
  <big-dialog
    v-model="show"
    :title="newaction + ' '+ 'Appointment' " 
    subtext="All Fields are required"
    class=""
  >
    <v-form ref="form">
      <accordion-component
        class="shadow-none rounded-none border-none text-primary"
        title="Basic Info"
        :opened="true"
      >
        <div class="grid grid-cols-2 gap-3 mt-5">
          <cornie-select
          class="w-full"
          placeholder="--Select--"
           
            label="Service Category"
            :items="['Plan Definition','Questionaire','Activity Definition','Measure','Operation Definition']"
            :rules="required"
          />
          <cornie-select
            class="w-full"
             placeholder="--Select--"
           
            label="Service Type"
            :items="['https://techsolutions.net//']"
            :rules="required"
          />
          <auto-complete
           placeholder="--Select--"
         
            :rules="required"
            class="w-full"
            :items="['Partial','Completed','Entered in Error','Health Unknown']"
            label="Specialty"
          />
          <auto-complete
           placeholder="--Select--"
          
            :rules="required"
            class="w-full"
            :items="['Partial','Completed','Entered in Error','Health Unknown']"
            label="Appointment Type"
          />
          <auto-complete
           placeholder="--Select--"
          
            :rules="required"
            class="w-full"
            :items="['Partial','Completed','Entered in Error','Health Unknown']"
            label="Reason Code"
          />
          <auto-complete
           placeholder="--Select--"
          
            :rules="required"
            class="w-full"
            :items="['Partial','Completed','Entered in Error','Health Unknown']"
            label="Reason Reference"
          />
          <auto-complete
           placeholder="--Select--"
           
            :rules="required"
            class="w-full"
            :items="['Partial','Completed','Entered in Error','Health Unknown']"
            label="Priority"
          />
          <cornie-select
          
             placeholder="--Select--"
            class="w-full"
            label="Description"
            :rules="required"
            :items="['Subject Unknown','Information Withheld','Unable To Obtain','Deferred']"
          />
          <cornie-select
           
             placeholder="--Select--"
            class="w-full"
            label="Supporting Information"
            :rules="required"
            :items="['Subject Unknown','Information Withheld','Unable To Obtain','Deferred']"
          />
          <cornie-select
           
             placeholder="--Select--"
            class="w-full"
            label="Slot"
            :rules="required"
            :items="['Subject Unknown','Information Withheld','Unable To Obtain','Deferred']"
          />
           
                    <date-time-picker
                    v-model:date="period.startDate"
                    v-model:time="period.startTime"
                    label="Start Date & Time"
                    width="w-full"
                  
                    />

                    
                    <date-time-picker
                    v-model:date="period.endDate"
                    v-model:time="period.endTime"
                    label="End Date & Time"
                    width="w-full"
                    />
                
               
 <cornie-input disabled  :rules="required" label="Duration"   class="w-full mt-3" />
  <cornie-input  :rules="required" label="Comments"  placeholder="--Enter--" class="w-full mt-3" />
   <cornie-input  :rules="required" label="Patient’s Instruction"  placeholder="--Enter--" class="w-full mt-3" />
    <auto-complete
           placeholder="--Select--"
           
            :rules="required"
            class="w-full"
            :items="['Partial','Completed','Entered in Error','Health Unknown']"
            label="Based On"
          />
        </div>
      </accordion-component>
       <accordion-component
        class="shadow-none rounded-none border-none text-primary"
        title="Participants"
        :opened="false"
      >
        <div class="grid grid-cols-2 gap-3 mt-5">
          <cornie-select
          @click="checkActor"
          class="w-full"
          placeholder="--Select--"
            v-model="actors"
            label="Actor"
            :items="['Patient','Practitioner','Device','Location','Healthcare Services']"
            :rules="required"
          />
        </div>
          <div class="w-full">
                  <div>
                    <div class="w-full grid grid-cols-3 gap-4 mt-5">
                      <div class="border-r-2" v-for="(input, index) in newPractitioners" :key="index">
                        <div class="mb-8 p-2">
                          <div class="flex space-x-4">
                            <avatar class="mr-2" v-if="input.image" :src="input.image" />
                               <avatar class="mr-2" v-else :src="localSrc" />
                            <div>
                              <p class="text-xs text-dark font-semibold">
                                {{ input.firstName }}
                                {{ input.lastName }}
                              </p>
                              <p class="text-xs text-gray font-light">
                                {{ actorType }}
                              </p>
                            </div>
                          </div>
                          <span>
                            <deleteorange-icon
                              class="float-right cursor-pointer relative bottom-8"
                              @click="removePractitioner(index)"
                            />
                          </span>
                        </div>
                      </div>
                      <!-- <div class="border-r-2" v-for="(input, index) in newDevices" :key="index">
                        <div class="mb-8 p-2">
                          <div class="flex space-x-4">
                              <avatar class="mr-2"  :src="img.placeholder" />
                            <div>
                              <p class="text-xs text-dark font-semibold">
                                {{ input.deviceName.name }}
                              </p>
                              <p class="text-xs text-gray font-light">
                                 {{ valueDevice }}
                              </p>
                            </div>
                          </div>
                          <span>
                            <deleteorange-icon
                              class="float-right cursor-pointer relative bottom-8"
                              @click="removeDevice(index)"
                            />
                          </span>
                        </div>
                      </div>
                      <div  class="border-r-2" v-for="(input, index) in newRoles" :key="index">
                        <div class="mb-8 p-2">
                          <div class="flex space-x-4">
                            <avatar class="mr-2" v-if="input.image" :src="input.image" />
                              <avatar class="mr-2" v-else :src="img.placeholder" />
                            <div>
                              <p class="text-xs text-dark font-semibold">
                                {{ input.name }}
                              </p>
                              <p class="text-xs text-gray font-light">
                                  {{ valueRole }}
                              </p>
                            </div>
                          </div>
                          <span>
                            <deleteorange-icon
                              class="float-right cursor-pointer relative bottom-8"
                              @click="removeRole(index)"
                            />
                          </span>
                        </div>
                      </div>
                      <div class="border-r-2" v-for="(input, index) in newPatients" :key="index">
                        <div class="mb-8 p-2">
                          <div class="flex space-x-4">
                            <avatar class="mr-2" v-if="input.profilePhoto" :src="input.profilePhoto" />
                            <avatar class="mr-2" v-else :src="img.placeholder" />
                            <div>
                              <p class="text-xs text-dark font-semibold">
                                {{ input.firstname }} {{ input.lastname }}
                              </p>
                              <p class="text-xs text-gray font-light">
                                  {{ valuePatient }}
                              </p>
                            </div>
                          </div>
                          <span>
                            <deleteorange-icon
                              class="float-right cursor-pointer relative bottom-8"
                              @click="removePatient(index)"
                            />
                          </span>
                        </div>
                      </div> -->
                    </div>
                  </div>          
                </div> 
      </accordion-component>
     
    </v-form>
    <template #actions>
      <cornie-btn
        @click="show = false"
        class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
      >
        Cancel
      </cornie-btn>
      <cornie-btn  :loading="loading"
            @click="apply" class="text-white bg-danger px-3 rounded-xl">
       Save
      </cornie-btn>
    </template>
  </big-dialog>
      <actor-modal
          :patients="patients"
          :practitioners="practitioners"
           :devices="devices"
            :practitionerRoles="practitionerRoles"
             :locations="locations"
              :healthcares="healthcares"
              :actorType="actorType"
          @show:modal="showActor"
          v-model:visible="showActorModal"
        />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import BigDialog from "@/components/bigdialog.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieNumInput from "@/components/cornienuminput.vue";
import CornieTextArea from "@/components/textarea.vue";
// import DatePicker from "./datepicker.vue";
import DeleteorangeIcon from "@/components/icons/deleteorange.vue";
import ActorModal from "./actor.vue";
import DateTimePicker from '@/components/datetime-picker.vue'
import Measurable from "@/components/measurable.vue";
import plusIcon from "@/components/icons/plus.vue";
 import { IPatient } from "@/types/IPatient";
import AutoComplete from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import TimeablePicker from "@/components/timeable.vue";
import { namespace } from "vuex-class";
import { string } from "yup";
import { cornieClient } from "@/plugins/http";
import IAppointment from "@/types/IAppointment";
import ILocation from "@/types/ILocation";
import IDevice from "@/types/IDevice";
import IPractitioner from "@/types/IPractitioner";
import IHealthcare  from "@/types/IHealthcare";
import Period from "@/types/IPeriod";
import Avatar from "@/components/avatar.vue";

const appointment = namespace("appointment");
const patients = namespace("patients");
const location = namespace("location");
const device = namespace("device");
const practitioner = namespace("practitioner");
const roles = namespace('roles');
const healthcare = namespace("healthcare");

const data = {
    age: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  date: "",
  time: "",
};

@Options({
  name: "AddAppointment",
  components: {
    BigDialog,
    TimeablePicker,
    CornieNumInput,
    CornieBtn,
    DeleteorangeIcon,
    AutoComplete,
    DateTimePicker,
    Avatar,
    ActorModal,
    // DatePicker,
    Measurable,
    plusIcon,
    AccordionComponent,
    CornieSelect,
    CornieInput,
    CornieTextArea,
  },
})
export default class AddAppointment extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

   @Prop({ type: String, default: '' })
  id!: string


  @PropSync("modelValue")
  show!: boolean;

  @patients.State
  patients!: IPatient[];

@practitioner.State
  practitioners!: IPractitioner[];

   @device.State
  devices!: IDevice[];


  @location.State
  locations!: ILocation[];

  @healthcare.State
  healthcares!: IHealthcare[];

    @patients.Action
  fetchPatients!: () => Promise<void>; 
  
   @practitioner.Action
  fetchPractitioners!: () => Promise<void>; 

   @device.Action
  fetchDevices!: () => Promise<void>; 

   @location.Action
  fetchLocations!: () => Promise<void>; 

   @healthcare.Action
  fetchHealthcares!: () => Promise<void>; 


 @appointment.Action
  getAppointmentById!: (id: string) => IAppointment;

  required = string().required();
@Watch('id')
  idChanged() {
    this.setAppointment()
  }

  historymodel = {} as IAppointment;

showActorModal = false;
loading= false;


period = {...data};
actors="";
actorType="";
practitionerRoles=[];
 localSrc = require('../../../../assets/img/placeholder.png');
serviceCategory="";
serviceType="";
specialty="";
appointmentType="";
reasonCode="";
reasonRef="";
priority="";
description="";
supportingInfo="";
slot="";
basedOn="";
comments="";
patientInstruction="";
// period = {} as Period;

newPractitioners=[];
newPatients=[];
newDevices=[];
newLocations=[];
newHealthcare=[];

requiredPractitioner = false;
        consultationMediumPractitioner =  "";
        periodPractitioner ={
            start:"",
            end:""
        };
         requiredPatient = false;
        consultationMediumPatient =  "";
        periodPatient ={
            start:"",
            end:""
        };
         requiredDevice = false;
        consultationMediumDevice = "";
        periodDevice = {
            start:"",
            end:""
        };
         requiredLocation = false;
        consultationMediumLocation = "";
        periodLocation ={
            start:"",
            end:""
        };
         requiredHealthcare = false;
        consultationMediumHealthcare ="";
        periodHealthcare ={
            start:"",
            end:""
        };

  // startAndEndDateTimeStart = "";
  // startAndEndDateTimeEnd = "";
  // bornDateTime = "";

get allPractitioners() {
     return {
        required: this.requiredPractitioner,
        consultationMedium: this.consultationMediumPractitioner,
        period: this.periodPractitioner
       }
}
  get patientId() {
    return this.$route.params.id;
  }

  async setNewHistoryModel() {
     this.historymodel = JSON.parse(JSON.stringify(this.payload));
  }

  async setAppointment() {
    const history = await this.getAppointmentById(this.id)
    if (!history) return
    this.historymodel =  (history)
    
  }
 
  get payload() {
    return {
    
    };
  }
 get newaction() {
    return this.id ? 'Update' : 'New'
  }

async checkActor(){
    if(this.actors == 'Patient'){
        this.actorType = 'Patient';
        this.showActorModal = true;
    }else if (this.actors == 'Practitioner'){
        this.actorType = 'Practitioner'
         this.showActorModal = true;
    }else if (this.actors == 'Device'){
        this.actorType = 'Device'
         this.showActorModal = true;
    }else if (this.actors == 'Practitioner Role'){
        this.actorType = 'Practitioner Role'
         this.showActorModal = true;
    } else if (this.actors == 'Location'){
        this.actorType = 'Location'
        this.showActorModal = true;
    }else if(this.actors == 'Healthcare Services') {
        this.actorType = 'Healthcare Services'
        this.showActorModal = true;
    }else {
        this.actors =""
    }
  
   
}
async showActor(updatePractitioners:any,updatePatients:any,updateDevices:any,updateLocation:any,updateHealthcare:any,getPractitioner:any){
  this.newPractitioners = updatePractitioners;
  getPractitioner.required = this.requiredPractitioner;
  getPractitioner.consultationMedium = this.consultationMediumPractitioner;
    console.log( getPractitioner.required);
}


  done() {
    this.$emit("history-added");
    this.show = false;
  }
  async  apply() {
     this.loading = true
    if (this.id) await this.updatehistory()
    else await this.createhistory()
    this.loading = false
    }
  async createhistory() {
     try {
      const response = await cornieClient().post('/api/v1/family-history', this.payload)
      if (response.success) {
        window.notify({ msg: 'Medical family history created', status: 'success' })
        this.done();
      }
    } catch (error) {
      console.log(error)
      window.notify({ msg: 'Medical family history not created', status: 'error' })
    
    }
  }
  async updatehistory(){
    const url = `/api/v1/family-history/${this.id}`
    const payload = {
       ...this.payload,
      }
    try {
      const response = await cornieClient().put(url, payload)
      if (response.success) {
        window.notify({ msg: 'Medical history  updated', status: 'success' })
      this.done();

      }
    } catch (error) {
      window.notify({ msg: 'Medical history not updated', status: 'error' })
    }
  }

    async fetchRoles() {
    const AllRoles = cornieClient().get("/api/v1/roles");
    const response = await Promise.all([AllRoles]);
    this.practitionerRoles = response[0].data;
  }
 
 async created() {
     this.fetchRoles();
   this.setAppointment();
   this.fetchPractitioners();
   this.fetchDevices();
   this.fetchLocations();
   this.fetchHealthcares();


  }
}
</script>
<style scoped>

.aadd{
      float: right;
    position: relative;
    bottom: 30px;
    margin-right: 10px;
}
</style>
