<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
           Check-Out
          </h2>
          <!-- <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          /> -->
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
            <div class="w-full border-b-2 border-gray-200 pb-5 flex space-x-7 mt-4">     
                <div class="w-full flex space-x-4 mb-3">
                    <div class="w-10 h-10">
                        <avatar
                            class="mr-2"
                            v-if="patient.profilePhoto"
                            :src="patient.profilePhoto"
                        />
                        <avatar class="mr-2" v-else :src="localSrc" />
                    </div>
                    <div class="w-full mt-2">
                        <p class="text-sm text-dark font-semibold">
                            {{ patient.firstname }}
                            {{ patient.lastname }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-5">
                 <input
                    type="time"
                    label="Time"
                    placeholder="00:00"
                    class="w-full mt-5 border-1 border-gray-300 rounded-lg px-2 py-2"
                    v-model="startTime"
                  />
                <date-picker :label="'Date'" v-model="date"/>
            </div>
            <div class="border-b-2 -mt-9 mb-5 pb-5 border-dashed border-gray-200">
              <div class="border-2 border-gray-200 p-3">
                  <div class="w-full flex space-x-7 mt-4">     
                      <div class="w-full flex space-x-4 mb-3">
                          <div class="w-10 h-10">
                              <avatar
                                  class="mr-2"
                                  v-if="practitionerdata?.image"
                                  :src="practitionerdata?.image"
                              />
                              <avatar class="mr-2" v-else :src="localSrc" />
                          </div>
                          <div class="w-full mt-2">
                              <p class="text-sm text-dark font-semibold">
                                  {{ practitionerdata?.firstName }}
                                  {{ practitionerdata?.lastName }}
                              </p>
                          </div>
                      </div>
                  </div>
                    <span class="text-sm w-full">Attending / Discharging Physician</span>
              </div>
                    
            </div>

            <div>

             <cornie-input class="" :label="'Total bill'" :innerlabel="'Paid'" :labelText="true" >
                <template #append>
                    <eye-icon />
                </template>
             
             </cornie-input>

             <cornie-input
                :label="'Room'"
                placeholder="--Select--"
                v-model="allvisit.room.name"
                :disabled="true"
                class="w-full mt-5 mb-5"
            />

             <date-picker class="mt-5" :disabled="true"  :label="'Follow up Appointment'" v-model="allvisit.checkInTime"/>
            
            </div>
            
        </v-form>
      </cornie-card-text>
      
      <cornie-card>
        <cornie-card-text class="flex justify-end overflow-auto">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
           <cornie-btn
            v-if="BillStatus.length > 0"
            :loading="loading"
            @click="submit"
            class="text-white bg-danger px-6 rounded-xl"
           >
            Submit
          </cornie-btn>
         <split-button v-else>
          <template #main>
            <span>Collect Payment</span>
          </template>
          <template #dropdown>
            <span><chevron-down class="stroke-current text-white" /></span>
          </template>
          <template #dropdownoptions>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"  @click="submit">
              <span class="ml-3 text-xs">Check-Out</span>
            </div>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showPayment = true">
              <span class="ml-3 text-xs">Collect Payment</span>
            </div>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showPayLink = true">
              <span class="ml-3 text-xs">Share Pay Link</span>
            </div>
            <!-- <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"  @click="showPostClaim = true">
              <span class="ml-3 text-xs">Post Claim</span>
            </div> -->
          </template>

        </split-button>

        </cornie-card-text>
      </cornie-card>
    </cornie-card>

  </cornie-dialog>
  <payment-modal  v-model="showPayment"/>
  <payment-link v-model="showPayLink"/>
  <post-modal v-model="showPostClaim"/>
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
import DatePicker from "@/components/datepicker.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import { namespace } from "vuex-class";
import Period from "@/types/IPeriod";
import SelectOption from "@/components/custom-checkbox.vue";
import CornieRadio from "@/components/cornieradio.vue";
import AddIcon from "@/components/icons/add-orange.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
import PhoneInput from "@/components/phone-input.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import TextArea from "@/components/textarea.vue";
import Avatar from "@/components/avatar.vue";
import SplitButton from "@/components/split-button.vue";
import ILocation from "@/types/ILocation";
import IPractitioner from "@/types/IPractitioner";
import PatientSection from "./visitor.vue";
import ChevronDown from "@/components/icons/chevrondown.vue";
import PaymentModal from "./collectPayment.vue";
import PaymentLink from "./sharepaylink.vue";
import PostModal from "./postclaim.vue";

const appointment = namespace("appointment");
const location = namespace("location");
const user = namespace("user");
const practitioner = namespace("practitioner");


@Options({
  name: "checkoutModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    DatePicker,
    PaymentModal,
    PhoneInput,
    CancelIcon,
    DeleteIcon,
    TextArea,
    PaymentLink,
    Avatar,
    CornieDialog,
    SearchIcon,
    CornieRadio,
    PostModal,
    EyeIcon,
    IconInput,
    CornieInput,
    CornieSelect,
    CornieBtn,
    PatientSection,
    SplitButton,
    SelectOption,
    ChevronDown
  },
})
export default class checkoutModal extends Vue {
 @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Array, default: [] })
  patients!: object;

  @Prop({ type: Object, default: {} })
  practitionerdata!: object;

  @Prop({ type: Object, default: {} })
  patient!: any;

  @Prop({ type: Object, default: {} })
  allvisit!: any;




  @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  @location.State
  locations!: ILocation[];


  @location.Action
  fetchLocations!: () => Promise<void>;

   @user.State
   currentLocation!: string;

  loading = false;
 localSrc = require("../../../../../assets/img/placeholder.png");
  practitioner= "";
  onepatient = [] as any;
  date = "";
  showPayment = false;
  showPayLink = false;
  showPostClaim = false;
  bill = [];

  roomId = "";
  notes = "";
  startTime = "";


  get allPractitioner() {
    if (!this.practitioners || this.practitioners.length === 0) return [];
    return this.practitioners.map((i: any) => {
      return {
        code: i.id,
        display: i.firstName + " " + i.lastName,
      };
    });
  }
  get allRooms() {
    if (!this.locations || this.locations.length === 0) return [];
    return this.locations.map((i: any) => {
      return {
        code: i.id,
        display: i.name,
      };
    });
  }
  get patientAppointemnt() {
    if (!this.practitioner) return {};
    return this.practitioners.find((i: any) => i.id === this.practitioner);
  }

   get practitionerName() {
    const pt = this.practitioners.find((i: any) => i.id === this.practitioner);
    return pt ? `${pt.firstName} ${pt.lastName}` : "";
  }

    get payload(){
      return {
       followUpId: this.allvisit.appointmentId || null
      }
    }

  async fetchPatientAppointment() {
    const newdate = this.date;
    const AllPractitioner = cornieClient().get(`/api/v1/appointment/practitioner/get-day/25bc0c8e-bec8-401d-a1a3-bb74fee9dc4a`, {date : "2022-03-13"});
    const response = await Promise.all([AllPractitioner]);
    this.onepatient = response[0].data;
  }


   async submit() {
    this.loading = true;
    // if (this.id) await this.updateCheckin();
     await this.createCheckin();
    this.loading = false;
  }



  async createCheckin() {
    
      try {
        const response = await cornieClient().post(
          `/api/v1/visit/check-out/${this.id}`,
          this.payload
        );
        if (response.success) {
          window.notify({ msg: "Patient checked-out successfully", status: "success" });
         this.done();
        }
      } catch (error:any) {
        window.notify({ msg: error.response.data.message, status: "error" });
      }
  
  }

  async updateCheckin() {

    const url = `"/api/v1/visit/check-out/${this.id}`;
    const payload = { ...this.payload, id: this.id };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Checkout updated", status: "success" });
        this.done();
      }
    } catch (error:any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }

  done(){
       this.$emit("checkout-added");
        this.show = false;
  }
   get BillStatus(){
    return this.bill.filter((c:any) => c.status == 'paid');
  }

   async fetchBill() {
     try {
      const response = await cornieClient().post(
      `/api/v1/appointment/bill/generate/${this.allvisit.appointmentId}`,{}
      );
      if (response.success) {
         this.bill = response.data;
      }
    } catch (error:any) {
     window.notify({ msg: error.response.data.message, status: "error" });
    }
  }

  async created() {
    if(this.allvisit.appointmentId)  await this.fetchBill();
   this.fetchPatientAppointment();
   await this.fetchPractitioners();
   await this.fetchLocations();
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
