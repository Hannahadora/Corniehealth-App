<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            New Appointment
          </h2>
          <!-- <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          /> -->
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
            <div class="border-b-2 border-dashed border-gray-100">
                 <cornie-select
                    :label="'Type'"
                    placeholder="--Select--"
                    :items="[
                      'Check-Up',
                      'Follow-Up',
                      'Emergency',
                      'Routine',
                      'Walk-In',
                    ]"
                    class="w-full mt-4"
                    v-model="appointmentType"
                />
                <cornie-input
                    label="Description"
                    class="w-full mb-5"
                    placeholder="--Enter--"
                    v-model="description"
                />
               
            </div>
             <div class="w-full mt-2 mb-2">
                <div class="flex w-full border-dashed border-b border-gray-100">
                    <div class="w-full">
                     <span class="text-sm font-bold">Other Participants <span class="text-xs text-gray-500">(Optional)</span></span>
                    </div>
                    <add-icon class="flex justify-end float-right cursor-pointer" @click="showParticipant = true"/>
                </div>
                  <div class="w-full flex space-x-7 mt-4" v-for="(item, index) in Practitioners" :key="index">
                    
                    <div class="w-full dflex space-x-4 mb-3">
                        <div class="w-10 h-10">
                            <avatar
                                class="mr-2"
                                v-if="item.image"
                                :src="item.image"
                            />
                            <avatar class="mr-2" v-else :src="localSrc" />
                        </div>
                        <div class="w-full">
                            <p class="text-xs text-dark font-medium">
                                {{ item.firstName }}
                                {{ item.lastName }}
                            </p>
                            <p class="text-xs text-gray-500 font-meduim">
                            {{ item.jobDesignation }}
                            {{ item.department }}
                        </p>
                        </div>
                    </div>
                    <delete-icon class="fill-current text-danger cursor-pointer" @click="deletePractItem(item.id,index)"/>
                </div>
                 <div class="w-full flex space-x-7 mt-4" v-for="(item, index) in Devices" :key="index">
                    
                    <div class="w-full dflex space-x-4 mb-3">
                        <div class="w-10 h-10">
                            <avatar class="mr-2" :src="localSrc" />
                        </div>
                        <div class="w-full">
                            <p class="text-xs text-dark font-medium">
                                {{ item?.deviceName?.name }}
                            </p>
                            <p class="text-xs text-gray-500 font-meduim">
                            {{ item?.deviceName?.nameType }}
                        </p>
                        </div>
                    </div>
                    <delete-icon class="fill-current text-danger cursor-pointer" @click="deleteDeviceItem(index)"/>
                </div> 
            </div>
            <accordion-component :title="'Location'" :addborder="true" :opened="false">
                  <template v-slot:default>
                      <div class="w-full mt-5">
                            <span class="text-primary font-semibold text-sm">Select where you’ll like appointment to be held</span>
                           <div class="w-full flex flex-wrap items-center py-5">
                                <div class="-mb-2">
                                    <cornie-radio
                                    :label="'Hospital/Clinic'"
                                    :value="'clinic'"
                                    name="practiceRegister"
                                    v-model="venue"
                                    />
                                </div>
                                <div class="-mb-2 ml-4">
                                    <cornie-radio
                                    :label="'Virtual'"
                                    :value="'virtual'"
                                    name="practiceRegister"
                                      v-model="venue"
                                    />
                                </div>
                                <div class="ml-4 -mb-2">
                                    <cornie-radio
                                    :label="'At Home'"
                                    :value="'at-home'"
                                    name="practiceRegister"
                                      v-model="venue"
                                    />
                                </div>
                           </div>
                      </div>
                       <cornie-select
                            v-if="venue == 'clinic'"
                            :items="allLocations"
                            placeholder="--Select--"
                            :label="'Hospital/Clinic'"
                            class="w-full"
                            v-model="bookingLocationId"
                        />
                         <cornie-input
                            v-if="venue == 'virtual'"
                            :label="'Link'"
                            placeholder="Paste meeting link"
                            class="w-full"
                            v-model="meetingLink"
                        />
                        <cornie-input
                            v-if="venue == 'at-home'"
                            :label="'Address'"
                            placeholder="Enter address"
                            class="w-full"
                             v-model="venueAddress"
                        />
                  </template>    
            </accordion-component>
            <div class="w-full mt-2 mb-2">
                <div class="flex w-full border-dashed border-b border-gray-100">
                    <div class="w-full">
                     <span class="text-sm font-bold cursor-pointer">Service <span class="text-gray-400 text-xs">(Optional)</span></span>
                    </div>
                    <add-icon class="flex justify-end float-right cursor-pointer" @click="showService = true"/>
                </div>
                  <div class="w-full flex space-x-7 mt-4" v-for="(item, index) in services" :key="index">
                    
                    <div class="w-full dflex space-x-4 mb-3">
                        <div class="w-10 h-10">
                            <avatar
                                class="mr-2"
                                v-if="item.image"
                                :src="item.image"
                            />
                            <avatar class="mr-2" v-else :src="localSrc" />
                        </div>
                        <div class="w-full">
                            <p class="text-xs text-dark font-medium">
                                {{ item.name }}
                            </p>
                            <p class="text-xs text-gray-500 font-meduim">
                             ₦ {{ item.cost }}
                        </p>
                        </div>
                    </div>
                    <delete-icon class="fill-current text-danger cursor-pointer" @click="deleteServiceItem(index)"/>
                </div> 
            </div>
  
            <accordion-component :addborder="true" :title="'Billing Type'" :opened="false">
                  <template v-slot:default>
                      <div class="w-full border-dashed border-b-2 pb-4 border-gray-100">
                        <div class="flex w-full">
                                <div class="w-full">
                                  <span class="text-xs text-gray-400 font-semibold">{{billingType}}</span>    
                                </div>
                                <div class="w-full">
                                    <span class="text-xs flex justify-end w-full text-danger cursor-pointer" @click="showBilling = true">Change billing type</span>
                                </div>
                        </div>
                         <cornie-select
                                v-if="showBilling"
                                :label="'Change Billing Type'"
                                placeholder="--Select--"
                                :items="['insurance', 'cash']"
                                class="w-full mt-4"
                                v-model="billingType"
                            />
                      </div>
                      <text-area :label="'Comment'" v-model="comment" placeholder="Placeholder" class="w-full"/>
                        <div class="w-full">
                            <span class="text-sm text-primary font-semibold mb-5">Payment</span>
                            <div class="grid grid-cols-3 gap-1 mt-5">
                                <span class="border py-1 px-6 text-xs text-center border-gray-200 cursor-pointer rounded-lg" @click="showCollect = true">
                                    Collect payment
                                </span>
                                <span class="border py-1 px-6 text-center text-xs border-gray-200 cursor-pointer rounded-lg" @click="showShare = true">
                                    Share Pay Link
                                </span>
                                <span class="border py-1 px-6 text-center text-xs border-gray-200 cursor-pointer rounded-lg" @click="showBill = true">
                                    Share Bill
                                </span>
                                <span class="border py-1 px-6 text-center text-xs border-gray-200 cursor-pointer rounded-lg" @click="showPost = true">
                                    Post Claim
                                </span>

                            </div>
                        </div>


                  </template>    
            </accordion-component>


        </v-form>
      </cornie-card-text>
      
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="submit"
            class="text-white bg-danger px-6 rounded-xl"
           >
            Create
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
    </cornie-card>

        <patient-modal v-model="showPatient" @patient-added="patientadded" @patient-data="patientdata"/>
        <participant-modal v-model="showParticipant" :appoimtentId="appoimtentId" @practitioner-data="practitionerdata" @device-data="devicedata"/>
        <services-modal v-model="showService" @service-data="servicedata"/>

        <collect-modal v-model="showCollect"/>
        <share-modal v-model="showShare"/>
        <post-modal v-model="showPost"/>
        <bill-modal v-model="showBill"/>


  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { cornieClient } from "@/plugins/http";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "./components/accordion.vue";
import DatePicker from "@/components/datepicker.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import { namespace } from "vuex-class";
import Period from "@/types/IPeriod";
import SelectOption from "@/components/custom-checkbox.vue";
import TimePicker from "@/components/Timepicker.vue";
import CornieRadio from "@/components/cornieradio.vue";
import AddIcon from "@/components/icons/add-orange.vue";
import PhoneInput from "@/components/phone-input.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import TextArea from "@/components/textarea.vue";
import Avatar from "@/components/avatar.vue";
import IAppointment from "@/types/IAppointment";
import ILocation from "@/types/ILocation";
import IPractitioner from "@/types/IPractitioner";


import PatientModal from "./patients.vue";
import ParticipantModal from "./practitionerparticipants.vue";
import ServicesModal from "./services.vue";
import CollectModal from "./collectpayment.vue";
import ShareModal from "./sharepaylink.vue";
import PostModal from "./postclaim.vue";
import BillModal from "./sharebill.vue";


const appointment = namespace("appointment");
const location = namespace("location");
const user = namespace("user");
const practitioner = namespace("practitioner");


@Options({
  name: "appointmentModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    DatePicker,
    PatientModal,
    ParticipantModal,
    CollectModal,
    ShareModal,
    PostModal,
    AddIcon,
    BillModal,
    PhoneInput,
    CancelIcon,
    DeleteIcon,
    TextArea,
    TimePicker,
    Avatar,
    CornieDialog,
    ServicesModal,
    SearchIcon,
    CornieRadio,
    AccordionComponent,
    IconInput,
    CornieInput,
    CornieSelect,
    CornieBtn,

    SelectOption
  },
})
export default class appointmentModal extends Vue {
 @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  appoimtentId!: string;

  @appointment.Action
  getAppointmentById!: (id: string) => IAppointment;

  @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;

  @user.State
   currentLocation!: string;

  @practitioner.State
  practitioners!: IPractitioner[];


  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  showPatient = false;
  locationType = "";
  showBilling = false;
  showParticipant = false;
  showService = false;
  loading = false;

  showCollect = false;
  showShare = false;
  showPost = false;
  showBill = false;



  serviceCategory = "serviceCategory";
  locationId = "";
  deviceId = [];
  serviceType = "";
  specialty = "";
  appointmentType = "";
  reasonCode = "";
  reasonRef = "";
  priority = "";
  description = "";
  supportingInfo = "";
  slot = "";
  basedOn = "";
  duration = "";
  comments = "";
  patientInstruction = "";
  period = {} as Period;
  participantDetail = [];
  Practitioners = [] as any;
  Devices = [];
  Patients = [] as any;
  Locations = [];
  HealthCare = [];
  appointmentId = "";
  bookingLocationId = "";
  comment = "";
  status = "";
  services = [] as any;
  date = "2022-03-11";
  startTime = "00:00";
  endTime = "00:00";
  billingType = "";
  venueAddress = "";
  meetingLink = "";
  venue = "";
  patientId = [];
  practitionerId = [] as any;
  serviceId = [];
   localSrc = require("../../../../assets/img/placeholder.png");



 @Watch("id")
  idChanged() {
    this.setAppoitment();
  }


  async setAppoitment() {
    const appointment = await this.getAppointmentById(this.id);
    if (!appointment) return;
    this.appointmentType = appointment.appointmentType;
    this.description = appointment.description;
    this.venue = appointment.venue;
    this.meetingLink = appointment.meetingLink;
    this.venueAddress = appointment.venueAddress;
    this.billingType = appointment.billingType;
    this.Practitioners = appointment.Practitioners;
    this.Patients = appointment.Patients;
    this.services = appointment.services;
    this.comment = appointment.comment;
   

  }

get payload(){
  return {
    appointmentType: this.appointmentType,
    description: this.description,
    venue: this.venue,
    meetingLink: this.meetingLink,
    venueAddress: this.venueAddress,
    billingType: this.billingType,
    services : this.serviceId,
    Practitioners: this.practitionerId,
    Devices: this.deviceId,
    Patients: this.patientId,
    comment: this.comment,
    serviceCategory : this.serviceCategory,
    date: this.date,
    startTime: this.startTime,
    endTime : this.endTime,
    locationId : this.locationId,
    bookingLocationId: this.bookingLocationId

  }
}
  async submit() {
    this.loading = true;
    if (this.id) await this.updateAppointment();
    else await this.createAppointment();
    this.loading = false;
  }



  async createAppointment() {
    this.locationId = this.currentLocation;

    try {
      const response = await cornieClient().post(
        "/api/v1/appointment",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Appointment created", status: "success" });
        this.show = false;
      }
    } catch (error) {
      window.notify({ msg: "Appointment not created", status: "error" });
    }
  }

  async updateAppointment() {

    const url = `/api/v1/appointment/${this.id}`;
    const payload = { ...this.payload, id: this.id };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Appointment updated", status: "success" });
        this.$router.push("/dashboard/provider/experience/calendar");
      }
    } catch (error) {
      window.notify({ msg: "Appointment not updated", status: "error" });
    }
  }

   getAppointment() {
    const pt = this.practitioners.find((i: any) => i.id === this.appoimtentId);
    this.practitionerId.push({practitionerId: this.appoimtentId, required: true });
    return this.Practitioners = [pt];
  }

  patientdata(value:any,valueId:any){
      this.Patients = value;
      this.patientId = valueId;
  }

  practitionerdata(value:any,valueId:any){
     this.Practitioners = value;
      this.practitionerId = valueId;
  }
  devicedata(value:any,valueId:any){
      this.Devices = value;
      this.deviceId = valueId;
  }

  servicedata(value:any,valueId:any){
      this.services = value;
      this.serviceId = valueId;
  }

 patientadded(){

 }
  get allLocations() {
    if (!this.locations || this.locations.length === 0) return [];
    return this.locations.map((i: any) => {
      return {
        code: i.id,
        display: i.name,
      };
    });
  }

   async deletePatientItem(value:string,index:number) {
      const confirmed = await window.confirmAction({
        message: "You are about to delete this patient details",
        title: "Delete patient details",
      });
      if (!confirmed) return;
     this.Patients.splice(index, 1);
  }

 async deleteDeviceItem (index:number) {
    const confirmed = await window.confirmAction({
        message: "You are about to delete this device details",
        title: "Delete device details",
      });
      if (!confirmed) return;
     this.Devices.splice(index, 1);
 }
 async deletePractItem (value:string,index:number) {
    const confirmed = await window.confirmAction({
        message: "You are about to delete this practitioner details",
        title: "Delete practitioner details",
      });
      if (!confirmed) return;
     this.Practitioners.splice(index, 1);
 }

 async deleteServiceItem (index:number) {
    const confirmed = await window.confirmAction({
        message: "You are about to delete this service",
        title: "Delete service",
      });
      if (!confirmed) return;
     this.services.splice(index, 1);
 }

  async created() {
    await this.fetchLocations();
    await this.fetchPractitioners();
    if(this.appoimtentId) await this.getAppointment();
  }
}
</script>

<style>
.border-r-0 {
    border-right-width: 0px !important;
}
.border-l-0 {
    border-left-width: 0px !important;
}
</style>
