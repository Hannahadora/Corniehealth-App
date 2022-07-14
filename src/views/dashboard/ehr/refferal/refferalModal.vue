<template>
  <cornie-dialog v-model="show" right class="w-6/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
         Create Referral Request
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
                    <div class="w-full  mt-5 grid grid-cols-2 gap-4">
                        <cornie-select
                        v-if="id"
                            class="required"
                            :rules="required"
                         :items="[
                            'draft',
                            'active',
                            'revoked',
                            'on-hold',
                            'completed',
                            'do-not-perform',
                            'stopped',
                            'unknown',
                            'entered-in-error',
                            'ordered',
                          ]"
                        label="Status"
                        placeholder="--Select--"
                        v-model="status"
                        :disabled="true"
                        >
                        </cornie-select>
                    </div>
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
                            class="w-full"
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
                            'Specialist Consultation',
                            'Surgical Procedure',
                            'Therapy',
                            'Counseling',
                            ' Pharmacist Medication Review',
                            ]"
                            label="category"
                            v-model="category"
                            placeholder="--Select--"
                        >
                        </cornie-select>
                        <!-- <cornie-select
                            class="required"
                            :rules="required"
                            :items="allRequester"
                            label="Patient"
                            v-model="patientId"
                            placeholder="Select"
                        >
                        </cornie-select> -->
                        <div class="w-full -mt-1">
                            <span class="text-sm font-semibold mb-3">Occurrence</span>
                            <div class="flex space-x-2 w-full">
                                <date-picker
                                :rules="required"
                                placeholder="--Enter--"
                                class="grow w-full"
                                v-model="occurenceValue"
                                />
                                <cornie-select
                                :items="['Date']"
                                placeholder="Date"
                                class="w-32 mt-0.5 flex-none"
                                :setPrimary="true"
                                v-model="occurenceUnit"
                                />
                            </div>
                        </div>
                        <cornie-select
                            class="required"
                            :rules="required"
                            :items="allSpecials"
                            label="Specialty"
                            v-model="specialty"
                            placeholder="Select"
                        >
                        </cornie-select>
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
                            v-model="performerLocationId"
                            placeholder="Select performer’s address"
                            :disabled="true"
                        >
                        </cornie-select>
                    </div>
                </template>
            </accordion-component>
         </div>
         <div  class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component
                title="Request"
                :opened="true"
                >
                <template v-slot:default>
                    <div class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
                         <cornie-input
                            class="required"
                            :rules="required"
                            label="Request Code"
                            v-model="reasonCode"
                            placeholder="--Select--"
                        />
                        <cornie-input
                            class="required"
                            :rules="required"
                            label="Order Detail"
                            v-model="orderDetail"
                            placeholder="--Select--"
                        />
                         <!-- <cornie-select
                            class="required"
                            :rules="required"
                            :items="['Routine', 'Urgent', 'ASAP', 'STAT']"
                            label="Order Detail"
                            v-model="orderDetail"
                            placeholder="--Select--"
                        >
                        </cornie-select> -->
                        <div class="w-full -mt-1">
                            <span class="text-sm font-semibold mb-3">Quantity <span class="text-xs text-gray-300">(optional)</span></span>
                            <div class="flex space-x-2 w-full">
                                <cornie-input
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
                                class="grow w-full"
                                :label="'Request Description'"
                                :placeholder="'Enter'"
                                v-model="requestDescriptions"
                          />
                          <fhir-input
                            reference="http://hl7.org/fhir/ValueSet/body-site"
                            class="w-full"
                            label="Body Site (Optional)"
                            v-model="bodySite"
                            placeholder="--Select--"
                          />
               
                        <!-- <cornie-select
                            class="required"
                            :rules="required"
                            :items="['Routine', 'Urgent', 'ASAP', 'STAT']"
                            label="Body Site"
                            v-model="bodySite"
                            placeholder="--Select--"
                        >
                         <template #labelicon>
                            <span class="text-xs text-gray-500">(Optional)</span>
                            
                            </template>
                        </cornie-select> -->
                     
                    </div>
                </template>
            </accordion-component>
         </div>

            <accordion-component
              title="Optional Section"
              :spanText="'(This Fields Aren’t Mandatory For Creating A Referral Request)'"
              :spanCaption="true"
              :opened="false"
            >

                <div class="border-b-2 border-gray-200 mt-5 border-dashed pb-3"> 
                    <div class="mt-5 w-full grid grid-cols-2 gap-4">
                         <cornie-select
                            class="w-full"
                            :items="allRefferRequest"
                            label="Replaces"
                            placeholder="--Select--"
                            v-model="replaces"
                        >
                        </cornie-select>       
                    </div>  
                    <div class="w-full grid grid-cols-2 gap-5 mt-2 pb-5">
                      <div>
                           <span class="text-sm font-semibold mb-3">As Needed</span>
                       <div class="flex space-x-4 w-full mt-5">
                            <cornie-radio :label="'Yes'" :value="true" v-model="asNeeded" name="Needed"/>
                            <cornie-radio :label="'No'" :value="false" v-model="asNeeded" name="Needed"/>
                       </div>
                      </div>
                        <cornie-input
                            label="As Needed Code"
                            placeholder="--Enter--"
                            class="w-full"
                            v-model="asNeededCode"
                        >
                        </cornie-input>
                          <cornie-input
                            label="Reason Code"
                            placeholder="--Enter--"
                           v-model="reasonCode"
                        >
                        </cornie-input>
                          <div>
                            <p class="text-sm text-black font-semibold mb-1">
                              Reason Reference
                            </p>
                            <div
                              class="flex w-full border-2 border-gray-200 bg-gray-100 rounded-lg py-3 px-4 cursor-pointer"
                              @click="showRefModal = true"
                            >
                              <span class="w-full text-xs">{{ reasonReference }}</span>
                              <span class="flex justify-end w-full">
                                <plusIcon class="fill-current text-danger mt-1" />
                              </span>
                            </div>
                          </div>
                          <!-- <cornie-select
                            :rules="required"
                            :items="['reason reference']"
                            label="Reason Reference"
                            placeholder="--Select--"
                            class="w-full"
                             v-model="reasonReference"
                        >
                        </cornie-select> -->
                         <!-- <cornie-input
                            :rules="required"
                            label="Note"
                            placeholder="--Select--"
                            class="w-full"
                        >
                        </cornie-input> -->
                         <cornie-input
                            label="Patient Instruction"
                            placeholder="--Enter--"
                            class="w-full"
                            v-model="patientInstruction"
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
  <reasonref-modal v-model="showRefModal" @ref-value="refvalue"/>
</template>

<script lang="ts">
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import { string } from "yup";
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";


import ISpecial from "@/types/ISpecial";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import { IPatient } from "@/types/IPatient";
import IRefferal from "@/types/IRefferal";
import ILocation from "@/types/ILocation";
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
import DatePicker from "./components/datepicker.vue";
import CornieRadio from "@/components/cornieradio.vue";
import Multiselect from "@vueform/multiselect";
import ReasonrefModal from "./reasonref.vue";
import plusIcon from "@/components/icons/plus.vue";
import FhirInput from "@/components/fhir-input.vue";


const practitioner = namespace("practitioner");
const refferal = namespace("refferal");
const patients = namespace("patients");
const location = namespace("location");
const practiceform = namespace("practiceform");
const special = namespace("special");
const user = namespace("user");

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
    Multiselect,
    CancelIcon,
    CornieDialog,
    CornieRadio,
    Avatar,
    SelectOption,
    SearchIcon,
    TextArea,
    DeleteIcon,
    DatePicker,
    IconInput,
     CornieInput,
    CornieBtn,
    CornieSelect,
    CloseIcon,
    ReasonrefModal,
    plusIcon,
    FhirInput
  },
})
export default class RefferalModal extends Vue {
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

    @refferal.Action
    getOneRefferalById!: (id: string) => IRefferal;

    @refferal.State
    patientrefferals!: IRefferal[];

    @refferal.Action
    fetchRefferalById!: (patientId: string) => Promise<void>;
  
  
    @location.State
    locations!: ILocation[];

    @location.Action
    fetchLocations!: () => Promise<void>;

    @practiceform.State
    practiceforms!: IPracticeform[];

    @practiceform.Action
    fetchPracticeforms!: () => Promise<void>;

    @special.State
    specials!: ISpecial[];

    @special.Action
    fetchSpecials!: () => Promise<void>;

    @user.Getter
    authCurrentLocation!: string;

    loading = false;
    localSrc = require("../../../../assets/img/placeholder.png");
    query = "";
    orderBy: Sorter = () => 1;
    required = string().required();
    substitution = "Yes";
    showRefModal = false;


   


    
    status =  "active";
    basedOn = "";
    intent =  "";
    priority = "";
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
    occurenceUnit = "";
    occurenceValue = "";
    replaces = null;
    asNeeded = false;
    asNeededCode = null;
    forms = [] as any;
    patientInstruction = null;

    specialty = "";
    performerLocationId = "";
    requestDescriptions = "";

  
  
   refvalue(value:any, type:any){
    //this.references.push(value);
    this.reasonReference = type;
  }
    @Watch("id")
    idChanged() {
      this.setRequest();
    }

     async setRequest() {
        const diagnostic = await this.getOneRefferalById(this.id);
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
          this.occurenceUnit =  diagnostic.occurenceUnit;
          this.occurenceValue =  diagnostic.occurenceValue;
          this.replaces =  diagnostic.replaces;
          this.asNeeded =  diagnostic.asNeeded;
          this.asNeededCode =  diagnostic.asNeededCode;
          this.forms =  diagnostic.forms;
          this.patientInstruction =  diagnostic.patientInstruction;
          this.specialty =  diagnostic.specialty;
          this.performerLocationId =  diagnostic.performerLocationId;
          this.requestDescriptions =  diagnostic.requestDescriptions;
    }
 get aPatientId() {
    return this.$route.params.id as string;
  }
    get payload() {
        return {
            status: this.status,
            basedOn: this.basedOn,
            intent: this.intent,
            priority: this.priority,
            category: this.category,
            patientId: this.aPatientId,
            reasonCode: this.reasonCode,
            reasonReference: this.reasonReference,
            note: this.note,
            performer: this.performer,
            orderDetail: this.orderDetail,
            requestDescription: this.requestDescription,
            bodySite: this.bodySite,
            quantityUnit: this.quantityUnit,
            quantityValue: this.quantityValue.toString(),
            encounterId: this.encounterId,
            performerId: this.performerId,
            occurenceUnit: this.occurenceUnit,
            occurenceValue: this.occurenceValue,
            replaces: this.replaces,
            asNeeded: this.asNeeded,
            asNeededCode: this.asNeededCode,
            forms: this.forms,
            patientInstruction: this.patientInstruction,
            specialty: this.specialty,
            performerLocationId: this.performerLocationId,
            requestDescriptions: this.requestDescriptions,
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

    get allSpecials() {
    return this.specials.map((i: any) => {
      return {
        code: i.id,
        display: i.name,
      };
    });
  }

  get allRefferRequest() {
    return this.patientrefferals.map((i: any) => {
      return {
        code: i.id,
        display: i.category,
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
        "/api/v1/referral-requests",
        this.payload
      );
      if (response.success) {

        window.notify({ msg: "Request Created", status: "success" });
        this.done();
      }
    } catch (error:any) {
      window.notify({ msg: "Request  Not Created", status: "error" });
    }
  }
  async updateRequest() {
    const id = this.id;
    const url = `/api/v1/referral-requests/${id}`;
    const payload = this.payload;
    try {
      const response = await cornieClient().put(url, this.payload);
      if (response.success) {
      //  this.setPatientRequests([response.data]);
        window.notify({ msg: "Request Updated", status: "success" });
        this.done();
      }
    } catch (error:any) {
      window.notify({ msg: "Request Not Updated", status: "error" });
    }
  }

      done() {
        this.$emit("medication-added");
        this.show = false;
    }

  async created() {
    this.performerLocationId = this.authCurrentLocation;
      await this.fetchPatients();
      await this.fetchRefferalById(this.aPatientId);
      await this.fetchPractitioners();
      await this.fetchPracticeforms();
      await this.fetchLocations();
      await this.fetchSpecials();
  }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.dflex {
  display: -webkit-box;
}
.multiselect-option.is-selected {
  background: #fe4d3c;
  color: var(--ms-option-color-selected, #fff);
}
.multiselect-option.is-selected.is-pointed {
  background: var(--ms-option-bg-selected-pointed, #fe4d3c);
  color: var(--ms-option-color-selected-pointed, #fff);
}
.multiselect-option.is-selected {
  background: var(--ms-option-bg-selected, #fe4d3c);
  color: var(--ms-option-color-selected, #fff);
}

.multiselect {
  position: relative;
  margin: 0 auto;
  margin-bottom: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  border: var(--ms-border-width, 1px) solid var(--ms-border-color, #d1d5db);
  border-radius: var(--ms-radius, 4px);
  background: var(--ms-bg, #fff);
  font-size: var(--ms-font-size, 1rem);
  min-height: calc(
    var(--ms-border-width, 1px) * 2 + var(--ms-font-size, 1rem) *
      var(--ms-line-height, 1.375) + var(--ms-py, 0.5rem) * 2
  );
}

.multiselect-tags {
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-wrap: wrap;
  margin: var(--ms-tag-my, 0.25rem) 0 0;
  padding-left: var(--ms-py, 0.5rem);
  align-items: center;
}

.multiselect-tag.is-user {
  padding: 5px 12px;
  border-radius: 22px;
  background: #080056;
  margin: 3px 3px 8px;
  position: relative;
  left: -10px;
}

/* .multiselect-clear-icon {
      -webkit-mask-image: url("/components/icons/chevrondownprimary.vue");
      mask-image: url("/components/icons/chevrondownprimary.vue");
      background-color: #080056;
      display: inline-block;
      transition: .3s;
  } */

.multiselect-placeholder {
  font-size: 0.8em;
  font-weight: 400;
  font-style: italic;
  color: #667499;
}

.multiselect-caret {
  transform: rotate(0deg);
  transition: transform 0.3s;
  -webkit-mask-image: url("../../../../assets/img/Chevron.png");
  mask-image: url("../../../../assets/img/Chevron.png");
  background-color: #080056;
  margin: 0 var(--ms-px, 0.875rem) 0 0;
  position: relative;
  z-index: 10;
  flex-shrink: 0;
  flex-grow: 0;
  pointer-events: none;
}

.multiselect-tag.is-user img {
  width: 18px;
  border-radius: 50%;
  height: 18px;
  margin-right: 8px;
  border: 2px solid #ffffffbf;
}

.multiselect-tag.is-user i:before {
  color: #ffffff;
  border-radius: 50%;
}

.multiselect-tag-remove {
  display: flex;
  align-items: center;
  /* border: 1px solid #fff;
    background: #fff; */
  border-radius: 50%;
  color: #fff;
  justify-content: center;
  padding: 0.77px;
  margin: var(--ms-tag-remove-my, 0) var(--ms-tag-remove-mx, 0.5rem);
}
</style>
