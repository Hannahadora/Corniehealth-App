<template>
  <cornie-dialog v-model="show" right class="w-8/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
         Create Diagnostic Request
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
                            'draft',
                            'active',
                            'on-hold',
                            'cancelled',
                            'dispensed',
                            'substituted',
                            'completed',
                            'stopped',
                            'do-not-perform',
                            'unknown',
                            'entered-in-error',
                            'ordered',
                          ]"
                        label="Status"
                        placeholder="--Select--"
                        v-model="status"
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
                        v-model="basedOn"
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
                         v-model="intent"
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
                            v-model="priority"
                            placeholder="--Select--"
                        >
                         <template #labelicon>
                            <span class="text-xs text-gray-500">(Optional)</span>
                            
                            </template>
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
                            v-model="category"
                            placeholder="--Select--"
                        >
                        </cornie-select>
                    </div>
                </template>
            </accordion-component>
         </div>
         <div  class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component
                title="Request Info"
                :opened="true"
                >
                <template v-slot:default>
                    <div class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
                         <cornie-input
                                :rules="required"
                                class="grow w-full"
                                :placeholder="'Autoloaded'"
                                :label="'Request code'"
                                v-model="reasonCode"
                          />
                        <cornie-select
                            class="required"
                            :rules="required"
                            :items="['Routine', 'Urgent', 'ASAP', 'STAT']"
                            label="Order Detail"
                            v-model="orderDetail"
                            placeholder="--Select--"
                        >
                         <template #labelicon>
                            <span class="text-xs text-gray-500">(Optional)</span>
                            
                            </template>
                        </cornie-select>
                         <div class="w-full -mt-1">
                            <span class="text-sm font-semibold mb-3">Quantity</span>
                            <div class="flex space-x-2 w-full">
                                <cornie-input
                                :rules="required"
                                placeholder="--Enter--"
                                class="grow w-full"
                                :setfull="true"
                                v-model="quantityValue"
                                />
                                <cornie-select
                                :items="['Day']"
                                placeholder="Ratio"
                                class="w-32 mt-0.5 flex-none"
                                :setPrimary="true"
                                v-model="quantityUnit"
                                />
                            </div>
                        </div>
                        <cornie-input
                            :rules="required"
                            placeholder="Enter"
                            class="grow w-full"
                            :label="'Request Description'"
                            v-model="requestDescription"
                        />
                        <cornie-input
                            :rules="required"
                            placeholder="Enter"
                            class="grow w-full"
                            :label="'Body Site'"
                            v-model="bodySite"
                        />
                    </div>
                </template>
            </accordion-component>
         </div>
          <div  class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component
                title="Patient Info"
                :opened="true"
                >
                <template v-slot:default>
                    <div class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
                         <cornie-select class="" :label="'Patient'" v-model="patientId" :items="allRequester" :innerlabel="'Self pay'" :labelText="true" >
                        </cornie-select>
                         <!-- <cornie-select
                            :rules="required"
                            placeholder="select"
                            class="w-full"
                            :label="'Encounter'"
                            :items="allRequester"
                            v-model="encounterId"
                        /> -->
                         <encounter-select
                            :rules="required"
                            placeholder="select"
                            class="w-full"
                            :label="'Encounter'"
                            :patientId="patientId"
                            v-model="encounterId"
                        />
                         <div class="w-full -mt-1">
                            <span class="text-sm font-semibold mb-3">Quantity</span>
                            <div class="flex space-x-2 w-full">
                                <cornie-input
                                :rules="required"
                                placeholder="--Enter--"
                                class="grow w-full"
                                :setfull="true"
                                v-model="occurenceValue"
                                />
                                <cornie-select
                                :items="['Day']"
                                placeholder="Ratio"
                                class="w-32 mt-0.5 flex-none"
                                :setPrimary="true"
                                v-model="occurenceUnit"
                                />
                            </div>
                        </div>
                         <cornie-select
                            class="required"
                            :rules="required"
                            :items="allPerformerDispenser"
                            label="Performer"
                            v-model="performerId"
                            placeholder="Select"
                        >
                        </cornie-select>
                        <cornie-select
                            class="required"
                            :rules="required"
                            :items="allLocations"
                            label="Location"
                            v-model="locationId"
                            placeholder="Select"
                        >
                        </cornie-select>
                    </div>
                </template>
            </accordion-component>
         </div>
            <accordion-component
              title="Optional Section"
              :spanText="'(This fields aren’t mandatory for creating a medication request)'"
              :spanCaption="true"
              :opened="false"
            >

                <div class="border-b-2 border-gray-200 mt-5 border-dashed pb-3">   
                    <div class="w-full grid grid-cols-2 gap-5 mt-2 pb-5">
                        <cornie-select
                            class="required w-full"
                            :rules="required"
                            :items="['reason code']"
                            label="Replaces"
                            placeholder="--Select--"
                            v-model="replaces"
                        >
                        </cornie-select>
                        <cornie-select
                            :rules="required"
                            :items="['reason reference']"
                            label="As Needed"
                            placeholder="--Select--"
                            class="w-full"
                             v-model="asNeeded"
                        >
                        </cornie-select>
                        <cornie-input
                            :rules="required"
                            label="As Needed Code"
                            placeholder="Autoloaded"
                            class="w-full"
                            v-model="asNeededCode"
                        >
                        </cornie-input>
                          <cornie-input
                            :rules="required"
                            label="Reason Code"
                            placeholder="Autoloaded"
                           v-model="reasonCode"
                        >
                        </cornie-input>
                          <cornie-select
                            :rules="required"
                            :items="['reason reference']"
                            label="Reason Reference"
                            placeholder="--Select--"
                            class="w-full"
                             v-model="reasonReference"
                        >
                        </cornie-select>
                         <!-- <cornie-input
                            :rules="required"
                            label="Note"
                            placeholder="--Select--"
                            class="w-full"
                        >
                        </cornie-input> -->
                         <cornie-input
                            :rules="required"
                            label="Patient Instruction"
                            placeholder="Autoloaded"
                            class="w-full"
                            v-model="patientInstructions"
                        >
                        </cornie-input>
                         <div class="mb-5">
                            <span class="text-sm font-semibold mb-1">Link Forms</span>
                              <Multiselect
                                     v-model="forms"
                                    mode="tags"
                                    :hide-selected="false"
                                    id="field-id"
                                    :options="allForms"
                                    value-prop="code"
                                    trackBy="code"
                                    label="display"
                                    placeholder="--Select--"
                                    class="w-full"
                                  >
                                    <template v-slot:tag="{ option, handleTagRemove, disabled }">
                                      <div class="multiselect-tag is-user">
                                        {{ option.display }}
                                        <span
                                          v-if="!disabled"
                                          class="multiselect-tag-remove"
                                          @mousedown.prevent="handleTagRemove(option, $event)"
                                        >
                                          <span class="multiselect-tag-remove-icon"></span>
                                        </span>
                                      </div>
                                    </template>
                                    <template v-slot:option="{ option }">
                                      <span class="w-full text-sm">{{ option.display }}</span>
                                    </template>
                              </Multiselect>
                        </div>
                         <!-- <cornie-select
                            :rules="required"
                            :items="['reason reference']"
                            label="Link Forms"
                            placeholder="--Select--"
                            class="w-full"
                             v-model="forms"
                        >
                        </cornie-select> -->
                    </div>  
                    <div class="-mt-10 w-full">
                            <text-area :label="'Note'" v-model="note" class="w-full" :placeholder="'Type your text here'" />  
                    </div>
                </div>


          
            </accordion-component>

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
            :loading="loading"
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
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";


import ILocation from "@/types/ILocation";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import { IPatient } from "@/types/IPatient";
import IDiagnostic from "@/types/IDiagnostic";
import IPracticeform from "@/types/IPracticeform";

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
import DatePicker from "@/components/datepicker.vue";
import CornieRadio from "@/components/cornieradio.vue";
import EncounterSelect from "@/components/encounterselect.vue";
import Multiselect from "@vueform/multiselect";

const practitioner = namespace("practitioner");
const diagnostic = namespace("diagnostic");
const patients = namespace("patients");
const location = namespace("location");
const practiceform = namespace("practiceform");

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
    EncounterSelect,
    ArrowLeftIcon,
    DRangePicker,
    CancelIcon,
    CornieDialog,
    CornieRadio,
    Avatar,
    Multiselect,
    SelectOption,
    SearchIcon,
    TextArea,
    DeleteIcon,
    DatePicker,
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

    @diagnostic.Action
    getDiagnostictById!: (id: string) => IDiagnostic;

     @location.State
    locations!: ILocation[];

    @location.Action
    fetchLocations!: () => Promise<void>;

    @practiceform.State
    practiceforms!: IPracticeform[];

    @practiceform.Action
    fetchPracticeforms!: () => Promise<void>;


    loading = false;
    localSrc = require("../../../../assets/img/placeholder.png");
    query = "";
    orderBy: Sorter = () => 1;
    required = string().required();
    substitution = "Yes";

    status =  "";
    basedOn = "";
    intent =  null;
    priority = null;
    category = "";
    patientId = "";
    reasonCode = null;
    reasonReference = null;
    note = null;
    performer = "";

    orderDetail = "";
    requestDescription = "";
    bodySite = "";
    quantityUnit = "";
    quantityValue = "";
    encounterId = null;
    performerId = "";
    locationId = "";
    occurenceUnit = "";
    occurenceValue = "";
    replaces = null;
    asNeeded = null;
    asNeededCode = null;
    forms = [] as any;
    patientInstructions = null;

  
    @Watch("id")
    idChanged() {
      this.setRequest();
    }

     async setRequest() {
        const diagnostic = await this.getDiagnostictById(this.id);
        if (!diagnostic) return;
          this.status =  diagnostic.status;
          this.basedOn =  diagnostic.basedOn;
          this.intent =  diagnostic.intent;
          this.priority =  diagnostic.priority;
          this.category =  diagnostic.category;
          this.patientId =  diagnostic.patientId;
          this.reasonCode =  diagnostic.reasonCode;
          this.reasonReference =  diagnostic.reasonReference;
          this.note =  diagnostic.note;
          this.performer =  diagnostic.performer;
          this.orderDetail =  diagnostic.orderDetail;
          this.bodySite =  diagnostic.bodySite;
          this.requestDescription =  diagnostic.requestDescription;
          this.quantityUnit =  diagnostic.quantityUnit;
          this.quantityValue =  diagnostic.quantityValue;
          this.encounterId =  diagnostic.encounterId;
          this.performerId =  diagnostic.performerId;
          this.locationId =  diagnostic.locationId;
          this.occurenceUnit =  diagnostic.occurenceUnit;
          this.occurenceValue =  diagnostic.occurenceValue;
          this.replaces =  diagnostic.replaces;
          this.asNeeded =  diagnostic.asNeeded;
          this.asNeededCode =  diagnostic.asNeededCode;
          this.forms =  diagnostic.forms;
          this.patientInstructions =  diagnostic.patientInstructions;
    }

      get payload() {
        return {
            status: this.status,
            basedOn: this.basedOn,
            intent: this.intent,
            priority: this.priority,
            category: this.category,
            patientId: this.patientId,
            reasonCode: this.reasonCode,
            reasonReference: this.reasonReference,
            note: this.note,
            performer: this.performer,
            orderDetail: this.orderDetail,
            requestDescription: this.requestDescription,
            bodySite: this.bodySite,
            quantityUnit: this.quantityUnit,
            quantityValue: this.quantityValue,
            encounterId: this.encounterId,
            performerId: this.performerId,
            locationId: this.locationId,
            occurenceUnit: this.occurenceUnit,
            occurenceValue: this.occurenceValue,
            replaces: this.replaces,
            asNeeded: this.asNeeded,
            asNeededCode: this.asNeededCode,
            forms: this.forms,
            patientInstructions: this.patientInstructions,

        };
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

     get allPerformerDispenser() {
        if (!this.practitioners || this.practitioners.length === 0) return [];
        return this.practitioners.map((i: any) => {
        return {
            code: i.organizationId,
            display: i.firstName + " " + i.lastName,
        };
        });
    }

      
  get allLocations() {
    return this.locations.map((i: any) => {
      return {
        code: i.id,
        display: i.name,
      };
    });
  }
   get allForms() {
    if (!this.practiceforms || this.practiceforms.length === 0) return [];
    return this.practiceforms.map((i: any) => {
      return {
        code: i.id,
        display: i.name,
      };
    });
  }
   

   async submit() {
    this.loading = true;
    if (this.id) await this.updateRequest();
    else await this.createRequest();
    this.loading = false;
  }

    async createRequest() {
    try {
      const response = await cornieClient().post(
        "/api/v1/diagnostic-requests",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Request Created", status: "success" });
        this.done();
      }
    } catch (error:any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }
  async updateRequest() {
    const id = this.id;
    const url = `/api/v1/diagnostic-requests/${id}`;
    const payload = this.payload;
    try {
      const response = await cornieClient().put(url, this.payload);
      if (response.success) {
      //  this.setPatientRequests([response.data]);
        window.notify({ msg: "Request Updated", status: "success" });
        this.done();
      }
    } catch (error:any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }

      done() {
        this.$emit("medication-added");
        this.show = false;
    }

  async created() {
      await this.fetchPatients();
      await this.fetchPractitioners();
      await this.fetchLocations();
      await this.fetchPracticeforms();
  }
}
</script>

<style>
.dflex {
  display: -webkit-box;
}
</style>
