<template>
  <div class="w-full">
    <span class="flex w-full mt-3 -mb-2 font-bold text-lg text-primary py-2 mx-auto">
     New Requests
    </span>
      <p class="text-danger text-xs font-normal">(Items with asterisk are required for filling)</p>
    <div>
      <div class="w-full h-screen">
        <form class="mt-5 w-full" @submit.prevent="submit">
          <div class="mb-44 pb-80">
            <accordion-component title="Request Info" v-model="opened" :opened="false">
              <template v-slot:default>
                <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['Status Reasom Code']"
                    v-model="requestModel.requestInfo.statusReason"
                    label="status reason"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['proposal','plan','order','original-order','reflex-order','filler-order','instance-order','option']"
                    v-model="requestModel.requestInfo.intent"
                    label="intent"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['category']"
                    v-model="requestModel.requestInfo.category"
                    label="category"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['routine','urgent','asap','stat']"
                    v-model="requestModel.requestInfo.priority"
                    label="priority"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['reason code']"
                    v-model="requestModel.requestInfo.doNotPerform"
                    label="do not perform"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    :rules="required"
                    :items="['reason reference']"
                    v-model="requestModel.requestInfo.reasonForProhibition"
                    label="reason for prohibition"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                </div>
              </template>
            </accordion-component>
            <accordion-component title="Request Details" v-model="opened" :opened="false">
              <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['recorder']"
                    v-model="requestModel.requestDetails.recorder"
                    label="recorder"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="required cursor-pointer"
                    :rules="required"
                     v-for="item in patient"
                    @click="updateRequester(item.id)"
                    :key="item.id"
                    :items="[item.firstname +' '+ item.lastname]"
                    v-model="requestModel.requestDetails.requester"
                    label="requester"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['Encounter']"
                    v-model="requestModel.requestDetails.encounter"
                    label="encounter"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['Condition','Problem','Diagnosis Code']"
                    v-model="requestModel.requestDetails.reasonCode"
                    label="reason code"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="required"
                    :rules="required"
                    :items="['Condition','Observation']"
                    v-model="requestModel.requestDetails.reasonReference"
                    label="reason reference"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="required"
                    :rules="required"
                    :items="['definition']"
                    v-model="requestModel.requestDetails.definition"
                    label="definition"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="required"
                    :rules="required"
                    :items="['CarePlan','MedicationRequest','ServiceRequest','ImmunizationRecommendation']"
                    v-model="requestModel.requestDetails.basedOn"
                    label="based on"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="required"
                    :rules="required"
                    :items="['information']"
                    v-model="requestModel.requestDetails.supportingInformation"
                    label="supporting information"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                </div>
            </accordion-component>
             <accordion-component title="Subject" expand="true" v-model="opened" :opened="false">
              <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                  <cornie-select
                    class="required cursor-pointer"
                    v-for="item in patient"
                    @click="updateSubject(item.id)"
                    :key="item.id"
                    :items="[item.firstname +' '+ item.lastname]"
                    v-model="requestModel.subject.subject"
                    label="subject"
                  >
                  </cornie-select>
                  <cornie-select
                   class="required"
                    :rules="required"
                    :items="['Coverage','Claim Response']"
                    v-model="requestModel.subject.paymentOption"
                    label="payment option"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                </div>
            </accordion-component>
             <medication-accordion title="Medication"  class="coursor-pointer" @show="showMedication">
            
            </medication-accordion>
             <accordion-component title="Performer">
              <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['Organisation','Care Partner']"
                    v-model="requestModel.performer.dispenserType"
                    label="dispenser type"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                   <cornie-select
                    class="required cursor-pointer"
                    v-for="item in practitioner"
                    @change="updatePractice(item.id)"
                    :key="item.id"
                    :items="[item.firstName +' '+ item.lastName]"
                    v-model="requestModel.performer.dispenser"
                    label="dispenser"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                </div>
            </accordion-component>
            <accordion-component title="Medication Administration">
                <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['service']"
                    v-model="requestModel.medicationAdministration.performerType"
                    label="performer type"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    v-for="item in practitioner"
                    @click="updatePerformer(item.id)"
                    :key="item.id"
                    :items="[item.firstName +' '+ item.lastName]"
                    v-model="requestModel.medicationAdministration.performer"
                    label="performer"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                </div>
            </accordion-component>
             <accordion-component title="Fufillment">
              <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['Pick-up','Ship to Patient Address','Ship to Hospital Address']"
                    v-model="requestModel.fufillment.nonSafetyCapRequest"
                    label="non-safety cap request"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="required"
                    :rules="required"
                    :items="['service type']"
                    v-model="requestModel.fufillment.affixLabel"
                    label="affix label"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="required"
                    :rules="required"
                    :items="['option']"
                    v-model="requestModel.fufillment.fulfillmentOption"
                    label="fulfillment option"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="required"
                    :rules="required"
                    :items="['shipping']"
                    v-model="requestModel.fufillment.priorityShipping"
                    label="priority shipping"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                </div>
            </accordion-component>
            <accordion-component title="History">
              <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                  <cornie-select
                    :items="dropdowns.serviceCategory"
                    v-model="requestModel.history.priorPrescription"
                    label="prior prescription"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    :items="dropdowns.serviceType"
                    v-model="requestModel.history.detectedIssue"
                    label="detected issue"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="required"
                    :rules="required"
                    :items="dropdowns.serviceType"
                    v-model="requestModel.history.eventHistory"
                    label="event history"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                </div>
            </accordion-component>          
            
            <span class="flex justify-end w-full">
              <button
                @click="$router.push('/dashboard/provider/experience/requests')"
                type="button"
                class="
                  outline-primary
                  rounded-full
                  text-black
                  mt-5
                  mr-3
                  py-2
                  pr-14
                  pl-14
                  px-3
                  focus:outline-none
                  hover:bg-primary
                  hover:text-white
                "
              >
                Cancel
              </button>

              <cornie-btn
                :loading="loading"
                type="submit"
                class="
                  bg-danger
                  rounded-full
                  text-white
                  mt-5
                  pr-14
                  pl-14
                  focus:outline-none
                  hover:opacity-90
                "
              >
                Save
              </cornie-btn>
            </span>
          </div>
        </form>
        <medication-modal   
        :columns="practitioner"
          @update:preferred="showMedication"
          v-model:visible="showMedicationModal"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AccordionComponent from "@/components/accordion-extended-component.vue";
import MedicationAccordion from "./accordion-medication.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import Textarea from "@/components/textarea.vue";
import PhoneInput from "@/components/phone-input.vue";
import Availability from "@/components/availability.vue";
import IRequest from "@/types/IRequest";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";
import PractitionersFilter from "@/components/practitioner.vue";
import PatientsFilter from "@/components/patient.vue";
import DevicesFilter from "@/components/device.vue";
import RolesFilter from "@/components/roles.vue";
import DEdit from "@/components/icons/aedit.vue";
import CDelete from "@/components/icons/adelete.vue";
import CAdd from "@/components/icons/cadd.vue";
import AddIcon from "@/components/icons/add.vue";
import SingleDatePicker from "@/components/datepicker.vue";
import DatePicker from "@/components/daterangepicker.vue";
import Period from "@/types/IPeriod";
import Avatar from "@/components/avatar.vue";
import MedicationModal from "./medication.vue";

const request = namespace("request");
const dropdown = namespace("dropdown");

const emptyRequest: IRequest = {
  requestInfo: {},
  requestDetails: {},
  subject: {},
  performer: {},
  medicationAdministration: {},
  fufillment: {},
  history: {},
  medications: [],


};


@Options({
  components: {
    CornieInput,
    CornieSelect,
    PractitionersFilter,
    MedicationAccordion,
    SingleDatePicker,
    Availability,
    Textarea,
    DEdit,
    CDelete,
    MedicationModal,
    Avatar,
    CAdd,
    AddIcon,
    PhoneInput,
    DatePicker,
    AccordionComponent,
    PatientsFilter,
    DevicesFilter,
    RolesFilter,
  },
})
export default class AddRequest extends Vue {
  // @Prop({ type: String, default: "" })
  // id!: string;

  @Prop({ type: Object, required: false, default: { ...emptyRequest} })
  request!: IRequest;

  requestModel = {} as IRequest;

  @request.Action
  getRequestById!: (id: string) => IRequest;

  @Watch("request")
  requestUpdated(request: IRequest) {
    this.requestModel = JSON.parse(JSON.stringify({ ...request }));
  }

  @request.Mutation
  setRequests!: any;

  loading = false;
  expand = false;
  isVisible = "";
  startdate = "";
  enddate = "";
  rule = true;
  opened = true;
  openedR = true;
  openedS = true;
  openedM = false;
  showMedicationModal = false;


  patient=[];
  practitioner=[];

dispenser="";
  // requestInfo = {};
  // requestDetails = {};
  // subject = {};
  // performer = {};
  // medicationAdministration = {};
  // fufillment= {};
  // history ={};
  // medications ={};

 @Watch("requestModel")
  updatePractice(value:string){
     this.payload.performer.dispenser = value;
  }

  preferredHeaders = [];
  items = ["Patient", "Practitioner", "Practitioner Role", "Device"];

  options = [
    { text: "Active", value: true },
    { text: "Inactive", value: false },
  ];

  required = string().required();
  dropdowns = {} as IIndexableObject;
  dropdowns2 = {} as IIndexableObject;
  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  get isUpdate() {
    return Boolean(this.request.id);
  }

  // @Watch("id")
  // idChanged() {
  //   this.setRequest();
  // }
  async setRequest() {
     this.requestModel = JSON.parse(JSON.stringify({ ...this.request }));
    // let manDate = this.deviceModel.udiCarrier.manufacturerDate;
    // let expDate = this.deviceModel.udiCarrier.expirationDate;
    // if (manDate) {
    //   manDate = new Date(manDate).toLocaleDateString("en-US");
    // }
    // if (expDate) expDate = new Date(expDate).toLocaleDateString("en-US");
  }
  get payload() {
     const model = JSON.parse(JSON.stringify({ ...this.requestModel }));
   // const medication = model.medications.medicationDetails as any;
    // if (medication.duration)
    //   medication.duration = new Date(
    //     medication.duration
    //   ).toISOString();
    //   if (medication.dispenseInterval)
    //   medication.dispenseInterval = new Date(
    //     medication.dispenseInterval
    //   ).toISOString();
    return model;

    // return  {
    //   requestInfo: this.requestInfo,
    //   requestDetails: this.requestDetails,
    //   subject: this.subject,
    //   performer: this.performer,
    //   medicationAdministration: this.medicationAdministration,
    //   fufillment: this.fufillment,
    //   history: this.history,
    //   medications: this.medications,
    // } 
  }
  get allaction() {
    return this.isUpdate ? "Edit" : "New";
  }
 async updateSubject(value:string){
   console.log("value");
   console.log(value);
    this.payload.subject.subject = value;
 }
 async updateRequester(value:string){
    this.payload.requestDetails.requester = value;
 }
//  async updatePractice(value:string){
//    this.payload.performer.dispenser = value;
//  }
 async updatePerformer(value:string){
   this.payload.medicationAdministration.performer = value;
 }
  async showMedication(value:any){
    console.log(value);
    this.requestModel.medications = value;
    this.showMedicationModal = true;
  }

  async submit() {
    this.loading = true;
    if (this.isUpdate) await this.updateRequest();
    else await this.createRequest();
    this.loading = false;
  }
  async createRequest() {
    //const period = this.period;
    try {
      const response = await cornieClient().post("/api/v1/requests", this.payload);
      if (response.success) {
          this.setRequests([response.data]);
          window.notify({ msg: response.data.message, status: "success" });
          this.$router.push("/dashboard/provider/experience/requests");
      }
    } catch (error) {
      console.log(error);
      window.notify({ msg: error, status: "error" });
    }
  }

  async updateRequest() {
     const id = this.request.id;
    const url = `/api/v1/requests/${id}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
          this.setRequests([response.data]);
        window.notify({ msg: response.data.message, status: "success" });
        this.$router.push("/dashboard/provider/experience/requests");
      }
    } catch (error) {
      window.notify({ msg: error, status: "error" });
    }
  }
  async fetchPateints() {
    const AllPateints = cornieClient().get("/api/v1/patient");
    const response = await Promise.all([AllPateints]);
    this.patient = response[0].data;
  }
 async fetchPractitioner() {
    const AllPractitioner = cornieClient().get("/api/v1/practitioner");
    const response = await Promise.all([AllPractitioner]);
    this.practitioner = response[0].data;
  }

  async created() {
    this.setRequest();
    this.fetchPateints();
    this.fetchPractitioner();
    const data = await this.getDropdowns("availability");
    const data2 = await this.getDropdowns("practitioner");
    this.dropdowns = data;
    this.dropdowns2 = data2;
  }
}
</script>
<style>
::placeholder {
  font-size: 0.8em;
  font-weight: 300;
  color: #667499;
  font-style: italic;
}
.outline-primary {
  border: 2px solid #080056;
}
.required label::after {
  content: "*";
  color: #fe4d3c;
  margin-left: 5px;
}
</style>
