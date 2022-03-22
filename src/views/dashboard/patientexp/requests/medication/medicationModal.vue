<template>
  <cornie-dialog v-model="show" right class="w-8/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
          Create Medication Request
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
         <v-form ref="form">
         <div  class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component
                title="Basic Info"
                :opened="true"
                >
                <template v-slot:default>
                    <div class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
                        <cornie-select
                            class="required"
                            :rules="required"
                        :items="[
                            'CarePlan',
                            'MedicationRequest',
                            'ServiceRequest',
                            'ImmunizationRecommendation',
                        ]"
                        label="based on"
                        placeholder="--Select--"
                        v-model="requestDetails.basedOn"
                        >
                        </cornie-select>
                        <cornie-select
                        class="required"
                        :rules="required"
                        :items="[
                        'proposal',
                        'plan',
                        'order',
                        'original-order',
                        'reflex-order',
                        'filler-order',
                        'instance-order',
                        'option',
                        ]"
                         v-model="requestInfo.intent"
                        label="intent"
                        placeholder="--Select--"
                    >
                            <template #labelicon>
                            <span class="text-xs text-gray-500">(Optional)</span>
                            
                            </template>
                        </cornie-select>
                        <cornie-select
                        class="required"
                        :rules="required"
                        :items="['Routine', 'Urgent', 'ASAP', 'STAT']"
                        label="priority"
                         v-model="requestInfo.priority"
                        placeholder="--Select--"
                    >
                        </cornie-select>
                        <cornie-select
                            class="required"
                            :rules="required"
                            :items="[
                            'Inpatient',
                            'Outpatient',
                            'Community',
                            'Discharge',
                            ]"
                            label="category"
                            v-model="requestInfo.category"
                            placeholder="--Select--"
                        >
                        </cornie-select>
                        <cornie-select
                            class="required"
                            :rules="required"
                            :items="allRequester"
                            label="requester"
                            placeholder="--Select--"
                            v-model="requestDetails.requester"
                            >
                        </cornie-select>
                        <cornie-select
                            class="required"
                            :rules="required"
                            :items="allRequester"
                            label="Patient"
                            placeholder="--Select--"
                             v-model="requestDetails.requester"
                            >
                        </cornie-select>
                        <cornie-select
                            class="required cursor-pointer"
                            :items="allPerformer"
                            label="dispenser"
                            placeholder="--Select--"
                            >
                        </cornie-select>
                        <cornie-input
                            class="required"
                            :rules="required"
                            label="supporting information"
                            placeholder="Enter"
                            >
                        </cornie-input>

                    </div>
                </template>
            </accordion-component>
         </div>


          <div  class="border-b-2 pb-5 border-dashed border-gray-200">  
            <accordion-component
                title="Medication"
                :opened="false"
                >
                <div class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
                        <cornie-select
                            class="w-full"
                            :items="['code']"
                            label="medication code"
                            placeholder="--Select--"
                        >
                        </cornie-select>
                        <cornie-select
                            class="w-full"
                            :items="['reason']"
                            label="medication reference"
                            placeholder="--Select--"
                        >
                        </cornie-select>
                        <cornie-select
                            class="required w-full"
                            :rules="required"
                            :items="['Continuous', 'Acute', 'Seasonal']"
                            label="course of therapy type"
                            placeholder="--Select--"
                        >
                        </cornie-select>
                        <div class="w-full -mt-1">
                            <span class="text-sm font-semibold mb-3">Dosage Instruction</span>
                            <div class="flex space-x-2 w-full">
                                <cornie-input
                                :rules="required"
                                placeholder="0:0:0"
                                class="grow w-full"
                                :setfull="true"
                                />
                                <cornie-select
                                :items="['Day']"
                                placeholder="/ Day"
                                class="w-32 mt-0.5 flex-none"
                                :setPrimary="true"
                                />
                            </div>
                        </div>

                    <!-- <cornie-select
                    class="required"
                    :rules="required"
                    :items="['recorder']"
                    label="recorder"
                    placeholder="--Select--"
                    >
                    </cornie-select>
                
                    <cornie-select
                    class="required"
                    :rules="required"
                    :items="['Encounter']"
                    label="encounter"
                    placeholder="--Select--"
                    >
                    </cornie-select>
                    <cornie-select
                    class="required"
                    :rules="required"
                    :items="['Condition', 'Problem', 'Diagnosis Code']"
                    label="reason code"
                    placeholder="--Select--"
                    >
                    </cornie-select>
                    <cornie-select
                    class="required"
                    :rules="required"
                    :items="['Condition', 'Observation']"
                    label="reason reference"
                    placeholder="--Select--"
                    >
                    </cornie-select>
                    <cornie-select
                    class="required"
                    :rules="required"
                    :items="['definition']"
                    label="definition"
                    placeholder="--Select--"
                    >
                    </cornie-select>
                    <cornie-select
                    class="required"
                    :rules="required"
                    :items="[
                        'CarePlan',
                        'MedicationRequest',
                        'ServiceRequest',
                        'ImmunizationRecommendation',
                    ]"
                    label="based on"
                    placeholder="--Select--"
                    >
                    </cornie-select> -->
                
                </div>
                  <accordion-component
                            title="Dispense Request - Initial Fill"
                            :opened="true"
                            class="py-20"
                        >
                        <div class="grid grid-cols-2 gap-4 mt-5 w-full">
                        
                            <div class="w-full -mt-1">
                                <span class="text-sm font-semibold mb-3">Duration</span>
                                <div class="flex space-x-2 w-full">
                                    <cornie-input
                                    :rules="required"
                                    placeholder="--Enter--"
                                    class="grow w-full"
                                    :setfull="true"
                                    />
                                    <cornie-select
                                    :items="['Days','Weeks','Months']"
                                    placeholder="/ Day"
                                    class="w-32 mt-0.5 flex-none"
                                    :setPrimary="true"
                                    />
                                </div>
                            </div>
                            <cornie-input
                                    class="w-full"
                                    label="reason"
                                    placeholder="Autotlaoded"
                                    :disabled="true"
                                >
                            </cornie-input>
                        </div>
                        <p class="text-danger text-sm float-right font-semibold mt-4 mb-5"><span class="text-xl">+</span> Add</p>

                   </accordion-component>
            </accordion-component>
          </div>

           <div  class="border-b-2 border-dashed border-gray-200">
           
                <accordion-component
                    title="Refill"
                    :opened="false"
                    :grayCaption="true"
                    :check="true"
                    >
                    <div class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
                            <div class="w-full -mt-1">
                                <span class="text-sm font-semibold mb-3">Dosage Instruction</span>
                                <div class="flex space-x-2 w-full">
                                    <cornie-input
                                    :rules="required"
                                    placeholder="--Enter--"
                                    class="grow w-full"
                                    :setfull="true"
                                    />
                                    <cornie-select
                                    :items="['Day']"
                                    placeholder="/ Day"
                                    class="w-32 mt-0.5 flex-none"
                                    :setPrimary="true"
                                />
                            </div>
                            </div>
                            <d-range-picker :label="'Start Date'" class="w-full"/>
                            <cornie-input
                                class="w-full"
                                label="Qunatity"
                                placeholder="Enter"
                            >
                            </cornie-input>
                            <div class="w-full -mt-1">
                                <span class="text-sm font-semibold mb-3">Supply Duration</span>
                                <div class="flex space-x-2 w-full">
                                    <cornie-input
                                    :rules="required"
                                    placeholder="--Enter--"
                                    class="grow w-full"
                                       :setfull="true"
                                    />
                                    <cornie-select
                                    :items="['Day']"
                                    placeholder="/ Day"
                                    class="w-32 mt-0.5 flex-none"
                                    :setPrimary="true"
                                    />
                                </div>
                            </div>
                    </div>
                </accordion-component>
           </div>

            <div  class="border-b-2 border-dashed border-gray-200">
            
                <accordion-component
                    title="Substitution Allowed?"
                    :opened="false"
                >
                    <div class="flex space-x-4 w-full mt-5">
                        <cornie-radio :label="'Yes'" name="allowed"/>
                        <cornie-radio :label="'No'" name="allowed"/>
                    </div>
                    <div class="w-full grid grid-cols-2 gap-4 mt-5 pb-5">
                    <cornie-select
                        class="required w-full"
                        :rules="required"
                        :items="['reason']"
                        label="Medication Substitution Code"
                        placeholder="Select"
                    >
                    </cornie-select>
                    <cornie-input
                        class="w-full"
                        label="Reason for Substitution"
                        placeholder="Enter"
                    >
                    </cornie-input>
                    <cornie-input
                        class="w-full"
                        label="Reason Against Substitution"
                        placeholder="Enter"
                    >
                    </cornie-input>
                    </div>
                </accordion-component>
            </div>

            <accordion-component
              title="Optional Section"
              :spanText="'(This fields aren’t mandatory for creating a medication request)'"
              :spanCaption="true"
              :opened="false"
            >

                <div class="border-b-2 border-gray-200 mt-5 border-dashed pb-3">   
                    <span class="w-full font-semibold text-gray-600">Reason</span>
                    <div class="w-full grid grid-cols-2 gap-5 mt-2 pb-5">

                        <cornie-select
                            class="required w-full"
                            :rules="required"
                            :items="['reason code']"
                            label="do not perform"
                            placeholder="--Select--"
                        >
                        </cornie-select>
                        <cornie-select
                        :rules="required"
                        :items="['reason reference']"
                        label="reason for prohibition"
                        placeholder="--Select--"
                        class="w-full"
                        >
                        </cornie-select>
                    </div>  
                    <div class="-mt-10 w-full">
                            <text-area :label="'Note'" class="w-full" :placeholder="'Type your text here'" />  
                    </div>
                </div>

                <div class="border-b-2 border-gray-200 border-dashed mt-5 pb-3 w-full">   
                    <span class="w-full font-semibold text-gray-600">Medication Allergies & Existing Conditions</span>
                    <div class="w-full grid grid-cols-2 gap-5 mt-2 pb-5">

                        <cornie-select
                            class="required"
                            :rules="required"
                            :items="['reason code']"
                            label="Medication Allergies"
                            placeholder="Select"
                        >
                        </cornie-select>
                        <cornie-select
                        :rules="required"
                        :items="['reason reference']"
                        label="Existing Conditions"
                        placeholder="Select"
                        >
                        </cornie-select>
                    </div>  
                </div>
                 <div class="border-b-2 border-gray-200 mt-5 border-dashed pb-3 w-full">   
                    <span class="w-full font-semibold text-gray-600">Fulfillment</span>
                    <div class="w-full mt-2">
                        <span class="text-sm font-semibold mb-4">Safety Cap Request</span>
                         <div class="flex space-x-4 w-full mt-5">
                            <cornie-radio :label="'Yes'" name="Cap"/>
                            <cornie-radio :label="'No'" name="Cap"/>
                        </div>
                      
                    </div> 
                    <div class="w-full mt-2">
                        <span class="text-sm font-semibold mb-4">Delivery Location</span>
                         <div class="flex space-x-4 w-full mt-5">
                            <cornie-radio :label="'Pick-Up'" name="PickUp"/>
                            <cornie-radio :label="'Shipped to patient’s address'" name="PickUp"/>
                             <cornie-radio :label="'Shipped to hospital address'" name="PickUp"/>
                        </div>
                      
                    </div>
                    <div class="w-full mt-2">
                        <span class="text-sm font-semibold mb-4">Priority Shipping</span>
                         <div class="flex space-x-4 w-full mt-5">
                            <cornie-radio :label="'Yes'" name="Shipping"/>
                            <cornie-radio :label="'No'" name="Shipping"/>
                        </div>
                      
                    </div> 
                </div>

                <div class="border-b-2 border-gray-200 mt-5 border-dashed pb-3 w-full">   
                    <span class="w-full font-semibold text-gray-600">Medication Administration</span>
                    <div class="w-full grid grid-cols-2 gap-5 mt-2 pb-5">
                        <cornie-select
                            class="required"
                            :rules="required"
                            :items="['reason code']"
                            label="Performer"
                            placeholder="Select"
                        >
                        </cornie-select>
                        <cornie-select
                        :rules="required"
                        :items="['reason reference']"
                        label="Performer Role"
                        placeholder="Select"
                        >
                        </cornie-select>
                    </div>  
                </div>

                <div class="border-b-2 border-gray-200 border-dashed mt-5 pb-3 w-full">   
                    <span class="w-full font-semibold text-gray-600">History</span>
                    <div class="w-full grid grid-cols-2 gap-5 mt-2 pb-5">

                        <cornie-select
                            class="required"
                            :rules="required"
                            :items="['reason code']"
                            label="Prior Prescription"
                            placeholder="Select"
                        >
                        </cornie-select>
                        <cornie-select
                        :rules="required"
                        :items="['reason reference']"
                        label="Detected Issues"
                        placeholder="Select"
                        >
                        </cornie-select>
                    </div>  
                </div>

                <!-- <cornie-select
                  class="required"
                  :items="allRequester"
                  v-model="requestModel.subject.subject"
                  label="subject"
                >
                </cornie-select>
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="['Coverage', 'Claim Response']"
                  v-model="requestModel.subject.paymentOption"
                  label="payment option"
                  placeholder="--Select--"
                >
                </cornie-select> -->
             
            </accordion-component>


            <!-- <medication-accordion
              title="Medication"
              class="coursor-pointer"
              @show="showMedication"
            >
            </medication-accordion>
            <accordion-component title="Performer">
              <div class="w-full grid grid-cols-3 gap-5 mt-5 pb-5">
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="['Organisation', 'Care Partner']"
                  v-model="requestModel.performer.dispenserType"
                  label="dispenser type"
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
                  :items="allPerformer"
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
                  :items="[
                    'Pick-up',
                    'Ship to Patient Address',
                    'Ship to Hospital Address',
                  ]"
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
            </accordion-component> -->


        </v-form>
      </cornie-card-text>
      
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2  mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
             @click="submit"
            class="text-white bg-danger px-2 rounded-xl"
           >
            Save
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
    </cornie-card>


  </cornie-dialog>
</template>

<script lang="ts">
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import { string } from "yup";

import ISpecial from "@/types/ISpecial";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import { IPatient } from "@/types/IPatient";

import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";

import AccordionComponent from "@/components/form-accordion.vue";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CloseIcon from "@/components/icons/whitecancel.vue";
import CornieSelect from "@/components/cornieselect.vue";
import Avatar from "@/components/avatar.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import SelectOption from "@/components/custom-checkbox.vue";
import TextArea from "@/components/textarea.vue";
import CornieInput from "@/components/cornieinput.vue";
import DRangePicker from "@/components/daterangecalendar.vue";
import CornieRadio from "@/components/cornieradio.vue";



const practitioner = namespace("practitioner");
const special = namespace("special");
const patients = namespace("patients");

type Sorter = (a: any, b: any) => number;


function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "MedicationModal",
  components: {
    ...CornieCard,
    AccordionComponent,
    CornieIconBtn,
    ArrowLeftIcon,
    DRangePicker,
    CancelIcon,
    CornieDialog,
    CornieRadio,
    Avatar,
    SelectOption,
    SearchIcon,
    TextArea,
    DeleteIcon,
    IconInput,
     CornieInput,
    CornieBtn,
    CornieSelect,
    CloseIcon
  },
})
export default class MedicationModal extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @Prop({ type: Function, default: defaultFilter })
    filter!: (item: any, query: string) => boolean;

    @Prop({ type: String, default: "" })
    id!: string;

    @Prop({ type: String, default: "" })
    specilatyId!: string;

    @patients.State
    patients!: IPatient[];

    @patients.Action
    fetchPatients!: () => Promise<void>;

    @practitioner.State
    practitioners!: IPractitioner[];


    @practitioner.Action
    fetchPractitioners!: () => Promise<void>;


    loading = false;
    localSrc = require("../../../../../assets/img/placeholder.png");
    query = "";
    orderBy: Sorter = () => 1;
    required = string().required();

    requestDetails = {
        recorder :  "",
        requester : "",
        encounter : "",
        reasonCode : "",
        reasonReference : " ",
        definition : "",
        basedOn :  "",
        supportingInformation : "",
    }

    requestInfo = {
        statusReason: "",
        intent: "",
        category: "",
        priority: "",
        doNotPerform : "",
        reasonForProhibition : ""
    }


    @Watch("id")
    idChanged() {
    
    }

     get allRequester() {
        if (!this.patients || this.patients.length === 0) return [];
        return this.patients.map((i: any) => {
        return {
            code: i.id,
            display: i.firstname + " " + i.lastname,
        };
        });
    }

    get allPerformer() {
        if (!this.practitioners || this.practitioners.length === 0) return [];
        return this.practitioners.map((i: any) => {
        return {
            code: i.id,
            display: i.firstName + " " + i.lastName,
        };
        });
    }




   async submit() {
    this.loading = true;
    this.loading = false;
  }


  async created() {
      await this.fetchPatients();
      await this.fetchPractitioners();
  }
}
</script>

<style>
.dflex {
  display: -webkit-box;
}
</style>
