<template>
  <cornie-dialog v-model="show" right class="w-6/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
          {{ newaction }} Medication Request
          </h2>
          <cancel-icon class="float-right cursor-pointer" @click="show = false" />
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
                        required
                            class="required w-full"
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
                        class="w-full"
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
                          <fhir-input
                            required
                            class="required w-full"
                          label="priority"
                          v-model="priority"
                          placeholder="--Select--"
                          reference="http://hl7.org/fhir/ValueSet/request-priority"
                        />
                      
                        <cornie-select
                        required
                            class="required w-full"
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
                        <cornie-select
                            class="required w-full"
                            required
                            :rules="required"
                            :items="allPerformer"
                            label="requester"
                            placeholder="--Select--"
                            v-model="requesterId"
                            >
                        </cornie-select>
                  
                        <cornie-select
                            class="required cursor-pointer"
                            :items="allPerformerDispenser"
                            label="dispenser"
                            placeholder="--Select--"
                            v-model="dispenserId"
                            >
                        </cornie-select>
                        <cornie-input
                            class="w-ful"
                            label="supporting information"
                            placeholder="Enter"
                            v-model="supportingInformation"
                            >
                        </cornie-input>

                </div>
              </template>
            </accordion-component>
          </div>


          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="Medication" :opened="false">
              <div class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
                    <auto-complete :label="'Generic Name'" @click="resultData(emptyMedicationDetails.genericCode)"  :items="allDrug" @input="searchData"  v-model="emptyMedicationDetails.genericCode" :placeholder="'Search generic name'"/>
                    <cornie-select :label="'Brand Name'"  @click="resultBrand(emptyMedicationDetails.genericName)"  :items="allBrand"  v-model="emptyMedicationDetails.genericName" :placeholder="'Select'"/>
                      <cornie-select
                    v-model="dataForm"
                    :label="'Form'"
                    :items="allForms"
                    :placeholder="'Select'"
                    class="w-full"
                    @click="resultPack(dataForm)"
                  
                    />
                    <cornie-input
                    :label="'Pack'"
                    v-model="pack"
                    placeholder="--Autoloaded--"
                    class="w-full"
                    :disabled="true"
                    />
                    <cornie-input
                    :label="'Strength'"
                    v-model="strength"
                    placeholder="--Autoloaded--"
                    class="w-full"
                    :disabled="true"
                    />
                    <div>
                            <p class="text-sm text-black font-semibold mb-1">
                              Medication Reference
                            </p>
                            <div
                              class="flex w-full border-2 border-gray-200 bg-gray-100 rounded-lg py-3 px-4 cursor-pointer"
                              @click="showMedRefModal = true"
                            >
                              <span class="w-full text-xs">{{ emptyMedicationDetails.reference }}</span>
                              <span class="flex justify-end w-full">
                                <plusIcon class="fill-current text-danger mt-1" />
                              </span>
                            </div>
                    </div>
                    <cornie-select
                        class="required w-full"
                        :rules="required"
                        :items="['Continuous', 'Acute', 'Seasonal']"
                        label="course of therapy type"
                        placeholder="--Select--"
                        v-model="emptyMedicationDetails.courseOfTherapy"
                    >
                    </cornie-select>
                    <div class="w-full -mt-1">
                        <span class="text-sm font-semibold mb-3">Dosage Interval</span>
                        <div class="flex space-x-2 w-full">
                          <div>
                            <cornie-input
                            v-maska="'#*:#*:#*'"
                            :rules="required"
                            placeholder="0:0:0"
                            class="grow w-full"
                            :setfull="true"
                            v-model="emptyMedicationDetails.dosageInstruction"
                            />
                            <span class="text-xs text-gray-600">Press the space bar to add <span class="text-sm font-bold">' : '</span> </span>
                          </div>
                            <cornie-select
                            :items="['Day']"
                            placeholder="/ Day"
                            class="w-32 mt-0.5 flex-none"
                            :setPrimary="true"
                            v-model="days2"
                            />
                        </div>
                    </div>
  
              </div>
              <div class="px-4">

                <p class="text-danger text-sm float-right font-semibold cursor-pointer  mt-4 mb-5"
                       @click="addMedicationDetails"><span class="text-xl">+</span> Add</p>
              </div>
                <div>
                  <div class="w-full grid grid-cols-3 gap-4 mt-5">
                    <div class="border-r-2 border-dashed" v-for="(input, index) in medications" :key="`-${index}`">
                      <div class="flex space-x-10">
                        <div class="mb-0 p-2">
                          <p class="text-xs text-primary font-semibold">
                            {{ input.genericName }}
                          </p>
                          <p class="text-xs text-gray-500 font-light">
                            {{ input.dosageInstruction }}
                          </p>
                        </div>
                        <span>
                          <deleteorange-icon class="float-right cursor-pointer mt-4 ml-14"
                            @click="removemedication(index)" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>           
              <accordion-component title="Dispense Request - Initial Fill" :opened="true">
                  <template v-slot:default>

                    <div class="grid grid-cols-2 gap-4 mt-5 w-full">
                      <div class="w-full -mt-1">
                        <span class="text-sm font-semibold mb-3">Duration</span>
                        <div class="flex space-x-2 w-full">
                          <cornie-input :rules="required" placeholder="--Enter--" class="grow w-full" :setfull="true"
                            v-model="emptyMedicationDetails.durationInDays" />
                          <cornie-select :items="['Days']" placeholder="Days" class="w-32 mt-0.5 flex-none"
                            :setPrimary="true" v-model="days" />
                        </div>
                      </div>
                    </div>
                    

                  </template>   
              </accordion-component>
              <accordion-component
                  title="Refill"
                  :opened="false"
                  :grayCaption="true"
                  :check="true"
                  >
                  <div class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
                        <div class="w-full -mt-1">
                              <span class="text-sm font-semibold mb-3">Dosage Interval</span>
                          <div class="flex space-x-2 w-full">
                                  <cornie-input
                                      placeholder="--Enter--"
                                      class="grow w-full"
                                      :setfull="true"
                                      v-model="emptyRefill.interval"
                                  />
                                  <cornie-select
                                  :items="['Days','Week','Month']"
                                  placeholder="/ Days"
                                  class="w-32 mt-0.5 flex-none"
                                  :setPrimary="true"
                                    v-model="emptyRefill.intervalUnit"
                              />
                          </div>
                        </div>
                          <DRangePicker :label="'Validity Period'" v-model="emptyRefill.startDate" class="w-full"/>
                          <cornie-input
                              class="w-full"
                              label="Quantity"
                              placeholder="Enter"
                              v-model="emptyRefill.quantity"
                          >
                          </cornie-input>
                          <div class="w-full -mt-1">
                              <span class="text-sm font-semibold mb-3">Supply Duration</span>
                              <div class="flex space-x-2 w-full">
                                  <cornie-input
                                      placeholder="--Enter--"
                                      class="grow w-full"
                                      :setfull="true"
                                      v-model="emptyRefill.supplyDuration"
                                  />
                                  <cornie-select
                                  :items="['Day']"
                                  placeholder="/ Day"
                                  class="w-32 mt-0.5 flex-none"
                                  :setPrimary="true"
                                  v-model="emptyRefill.supplyDurationUnit"
                                  />
                              </div>
                          </div>
                  </div>
              </accordion-component>
              <accordion-component title="Substitution Allowed?" :opened="false">
                <div class="flex space-x-4 w-full mt-5">
                  <cornie-radio :label="'Yes'" :value="true" v-model="emptyMedicationDetails.substitutionAllowed"
                    name="allowed" />
                  <cornie-radio :label="'No'" :value="false" v-model="emptyMedicationDetails.substitutionAllowed"
                    name="allowed" />
                </div>
                <div class="w-full grid grid-cols-2 gap-4 mt-5 pb-5">
                  <fhir-input
                          reference="http://hl7.org/fhir/ValueSet/medication-codes"
                          class="required w-full"
                          :rules="required"
                          v-model="emptyMedicationDetails.substitutionCode"
                          label="Medication Substitution Code"
                          placeholder="--Select--"
                        />
                  <!-- <cornie-select class="required w-full" :rules="required" :items="['reason']"
                    label="Medication Substitution Code" placeholder="Select"
                    v-model="emptyMedicationDetails.substitutionCode">
                  </cornie-select> -->
                  <cornie-input v-if="emptyMedicationDetails.substitutionAllowed == true" class="w-full"
                    label="Reason for Substitution" placeholder="Enter"
                    v-model="emptyMedicationDetails.reasonForSubstitution">
                  </cornie-input>
                  <cornie-input v-else class="w-full" label="Reason Against Substitution" placeholder="Enter"
                    v-model="emptyMedicationDetails.reasonAgainstSubstitution">
                  </cornie-input>
                </div>
              </accordion-component>

             
            </accordion-component>
          </div>

          <accordion-component title="Optional Section"
            :spanText="'(This fields aren’t mandatory for creating a medication request)'" :spanCaption="true"
            :opened="false">

            <div class="border-b-2 border-gray-200 mt-5 border-dashed pb-3">
              <span class="w-full font-semibold text-gray-600">Reason</span>
              <div class="w-full grid grid-cols-2 gap-5 mt-2 pb-5">
                        <fhir-input
                          reference="http://hl7.org/fhir/ValueSet/condition-code"
                          class="required w-full"
                          :rules="required"
                          v-model="reasonCode"
                          label="Reason Code"
                          placeholder="--Select--"
                        />
                         <div>
                            <p class="text-sm text-black font-semibold mb-1">
                              Reason Reference
                            </p>
                            <div
                              class="flex w-full border-2 border-gray-200 bg-gray-100 rounded-lg py-2 px-4 cursor-pointer"
                              @click="showRefModal = true"
                            >
                              <span class="w-full">{{ reasonReference }}</span>
                              <span class="flex justify-end w-full">
                                <plusIcon class="fill-current text-danger mt-1" />
                              </span>
                            </div>
                          </div>
                        <!-- <cornie-select
                            :items="['reason reference']"
                            label="Reason Reference "
                            placeholder="--Select--"
                            class="w-full"
                             v-model="reasonReference"
                        >
                        </cornie-select> -->
                    </div>  
                    <div class="-mt-10 w-full">
                            <text-area :label="'Note'" v-model="note" class="w-full" :placeholder="'Type your text here'" />  
                    </div>
                </div>

            <div class="border-b-2 border-gray-200 border-dashed mt-5 pb-3 w-full">
              <span class="w-full font-semibold text-gray-600">Medication Allergies & Existing Conditions</span>
              <div class="w-full grid grid-cols-2 gap-5 mt-2 pb-5">
                <div class="mb-5">
                  <span class="text-sm font-semibold mb-1">Medication Allergies</span>
                  <Multiselect v-model="allergies" mode="tags" :hide-selected="false" id="field-id"
                    :options="allAllegies" value-prop="code" trackBy="display" label="display" placeholder="--Select--"
                    class="w-full">
                    <template v-slot:tag="{ option, handleTagRemove, disabled }">
                      <div class="multiselect-tag is-user">
                        {{ option.display }}
                        <span v-if="!disabled" class="multiselect-tag-remove"
                          @mousedown.prevent="handleTagRemove(option, $event)">
                          <span class="multiselect-tag-remove-icon"></span>
                        </span>
                      </div>
                    </template>
                    <template v-slot:option="{ option }">
                      <span class="w-full text-sm">{{ option.display }}</span>
                    </template>
                  </Multiselect>
                </div>
                <div class="mb-5">
                  <span class="text-sm font-semibold mb-1">Existing Conditions</span>
                  <Multiselect v-model="aconditions" mode="tags" :hide-selected="false" id="field-id"
                    :options="allAllegies" value-prop="code" trackBy="display" label="display" placeholder="--Select--"
                    class="w-full">
                    <template v-slot:tag="{ option, handleTagRemove, disabled }">
                      <div class="multiselect-tag is-user">
                        {{ option.display }}
                        <span v-if="!disabled" class="multiselect-tag-remove"
                          @mousedown.prevent="handleTagRemove(option, $event)">
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
            </div>
            <div class="border-b-2 border-gray-200 mt-5 border-dashed pb-3 w-full">
              <span class="w-full font-semibold text-gray-600">Fulfillment</span>
              <div class="w-full mt-2">
                <span class="text-sm font-semibold mb-4">Safety Cap Request</span>
                <div class="flex space-x-4 w-full mt-5">
                  <cornie-radio :label="'Yes'" :value="true" v-model="safetyCapRequest" name="Cap" />
                  <cornie-radio :label="'No'" :value="false" v-model="safetyCapRequest" name="Cap" />
                </div>

              </div>
              <div class="w-full mt-2">
                <span class="text-sm font-semibold mb-4">Delivery Location</span>
                <div class="flex space-x-4 w-full mt-5">
                  <cornie-radio :label="'Pick-Up'" value="pick-up" v-model="deliveryLocation" name="PickUp" />
                  <cornie-radio :label="'Shipped to patient’s address'" v-model="deliveryLocation"
                    value="patient-address" name="PickUp" />
                  <cornie-radio :label="'Shipped to hospital address'" v-model="deliveryLocation"
                    value="hospital-address" name="PickUp" />
                </div>

                <div class="border-b-2 border-gray-200 mt-5 border-dashed pb-3 w-full">   
                    <span class="w-full font-semibold text-gray-600">Medication Administration</span>
                    <div class="w-full grid grid-cols-2 gap-5 mt-2 pb-5">
                        <cornie-select
                            class="w-full"
                            :items="allPerformer"
                            label="Performer"
                            placeholder="Select"
                            v-model="performer"
                        >
                        </cornie-select>
                          <fhir-input
                           v-model="performerRole"
                            label="Performer Role"
                            placeholder="Select"
                            reference="http://hl7.org/fhir/ValueSet/performer-role"
                            class="w-full"
                          />
                    </div>  
                </div>

                <div class="border-b-2 border-gray-200 border-dashed mt-5 pb-3 w-full">   
                    <span class="w-full font-semibold text-gray-600">History</span>
                    <div class="w-full grid grid-cols-2 gap-5 mt-2 pb-5">
                        <cornie-select
                            class="w-full"
                            :items="allMeidcaitons"
                            label="Prior Prescription"
                            placeholder="Select"
                             v-model="priorPrescription"
                        >
                        </cornie-select>
                        <div class="mb-5">
                            <span class="text-sm font-semibold mb-1">Detected Issues</span>
                              <Multiselect
                                    v-model="detectedIssues"
                                    mode="tags"
                                    :hide-selected="false"
                                    id="field-id"
                                    :options="allIssues"
                                    value-prop="code"
                                    trackBy="display"
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
                        label="Detected Issues"
                        placeholder="Select"
                         v-model="detectedIssues"
                        >
                        </cornie-select> -->
                    </div>
                 </div>
              </div>
            </div>


          </accordion-component>


        </v-form>
      </cornie-card-text>

      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn @click="show = false" class="border-primary border-2  mr-3 rounded-xl text-primary">
            Cancel
          </cornie-btn>
          <cornie-btn :loading="loading" @click="submit" class="text-white bg-danger px-2 rounded-xl">
            Save
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
    </cornie-card>


  </cornie-dialog>
  <reference-modal v-model="showRefModal" @ref-value="refvalue"/>
  <medication-ref v-model="showMedRefModal" @ref-value="medvalue"/>
</template>

<script lang="ts">
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import { string } from "yup";
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { mapDisplay } from "@/plugins/definitions";


import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import { IPatient } from "@/types/IPatient";
import IAllergy from "@/types/IAllergy";
import { ICondition } from "@/types/ICondition";

import IRequest, { Medications, RefillSection } from "@/types/IRequest";
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
import DeleteorangeIcon from "@/components/icons/deleteorange.vue";
import Multiselect from "@vueform/multiselect";
import FhirInput from "@/components/fhir-input.vue";
import AutoComplete from "@/components/autocomplete.vue";
import ReferenceModal from "./referenceModal.vue";
import plusIcon from "@/components/icons/plus.vue";
import MedicationRef from "./medicationRefModal.vue";
import { ImageResolutionProperty } from "csstype";

const practitioner = namespace("practitioner");
const request = namespace("request");
const patients = namespace("patients");
const allergy = namespace("allergy");
const issues = namespace("issues");
const condition = namespace("condition");
const roles = namespace("roles");

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
    FhirInput,
    CancelIcon,
    AutoComplete,
    CornieDialog,
    CornieRadio,
    Avatar,
    SelectOption,
    SearchIcon,
    TextArea,
    DeleteIcon,
    DatePicker,
    Multiselect,
    IconInput,
    CornieInput,
    CornieBtn,
    CornieSelect,
    CloseIcon,
    DeleteorangeIcon,
    ReferenceModal,
    plusIcon,
    MedicationRef
  },
})
export default class MedicationModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, default: {} })
  selectedItem!: any;

  @Prop({ type: String, default: "" })
  specilatyId!: string;

  @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;

  @practitioner.State
  practitioners!: IPractitioner[];

  @request.Mutation
  setPatientRequests!: any;


  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  @request.Action
  getRequestById!: (id: string) => IRequest;

  @allergy.State
  allergys!: any[];

  @allergy.Action
  fetchAllergys!: (patientId: string) => Promise<void>;

  @issues.State
  issues!: any[];

  @issues.Action
  fetchIssues!: (patientId: string) => Promise<void>

  @condition.Action
  fetchPatientConditions!: (patientId: string) => Promise<void>;

  @request.State
  patientrequests!: IRequest[];

  @request.Action
  fetchrequestsById!: (patientId: string) => Promise<void>;

  @condition.State
  conditions!: { [state: string]: ICondition[] };

  @roles.Action
  getRoles!: () => Promise<any>;

  @roles.State
  roles!: any[];



  medicationMapper = (code: string) => "";

  loading = false;
  localSrc = require("../../../../assets/img/placeholder.png");
  query = "";
  orderBy: Sorter = () => 1;
  required = string().required();
  substitution = "Yes";
  searchresult = [] as any;
  fullInfo = [] as any;
  showRefModal = false;
  showMedRefModal = false;

  dataForm = "";
  pack = "";
  strength = "";
  fullBrand = [] as any;
  Nafdac = "";
  size = "";
  anewBrand = [] as any;

  days = "";
  days2 = "";
  basedOn = "";
  intent = null;
  priority = "";
  category = "";
  requesterId = "";
  patientId = "";
  dispenserId = "";
  supportingInformation =  null;
  medications = [] as Medications[];
  status = "active";
  reasonCode = null;
  reasonReference = "reasonReference";
  note = null;
  allergies = [] as any;
  aconditions = [] as any;
  identifier = "";
  safetyCapRequest = true;
  deliveryLocation = "pick-up";
  priorPrescription = null;
  detectedIssues = [] as any;
  priorityShipping = true;
  performer = null;
  performerRole =  null;
  emptyRefill = {
    medicationId: "",
    interval: 0,
    intervalUnit: "",
    startDate: "",
    quantity: 0,
    supplyDuration: 0,
    supplyDurationUnit: "",
  };
  emptyMedicationDetails = {
    genericCode: null as any,
    code: "",
    genericName: "",
    reference: "Medication Reference",
    courseOfTherapy: "",
    dosageInstruction: "",
    durationInDays: "",
    requestId: "",
    refills: [] as RefillSection[],
    substitutionAllowed: true,
    substitutionCode: "",
    reasonForSubstitution: null,
    reasonAgainstSubstitution: null,
  };


  @Watch("id")
  idChanged() {
    this.setRequest();
  }
   async setRequest() {
    const request = this.getRequestById(this.id);
    if (!request) return;
    this.basedOn = request.basedOn;
    this.intent = request.intent;
    this.priority = request.priority;
    this.category = request.category;
    this.requesterId = request.requesterId;
    this.patientId = request.patientId;
    this.dispenserId = request.dispenserId;
    this.supportingInformation = request.supportingInformation;
    this.medications = request.medications as any;
    this.status = request.status;
    this.reasonCode = request.reasonCode;
    this.reasonReference = request.reasonReference;
    this.note = request.note;
    this.allergies = request.allergies;
    this.aconditions = request.conditions;
    this.identifier = request.identifier;
    this.safetyCapRequest = request.safetyCapRequest;
    this.deliveryLocation = request.deliveryLocation;
    this.priorPrescription = request.priorPrescription;
    this.detectedIssues = request.detectedIssues;
  }


   refvalue(value:any, type:string){
    //this.references.push(value);
    this.reasonReference = type;
  }
  medvalue(value:any, type:string){
    this.emptyMedicationDetails.reference = type;
  }
  

  addMedicationDetails() {
    this.emptyMedicationDetails.genericCode = this.emptyMedicationDetails?.genericCode?.toString();
    this.emptyMedicationDetails.code = this.emptyMedicationDetails?.genericCode?.toString();


    const med = this.emptyMedicationDetails as any;
    this.medications.push(med);
    this.emptyMedicationDetails.refills.push(this.emptyRefill);
  }
  removemedication(index: number) {
    this.medications.splice(index, 1);
  }

   get onepatientId() {
    return this.$route.params.id as string;
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
     get allAllegies() {
        if (!this.allergys || this.allergys.length === 0) return [];
        return this.allergys.map((i: any) => {
        return {
            code: i.id,
            display: i.category,
        };
        });
    }
     get allMeidcaitons() {
        if (!this.patientrequests || this.patientrequests.length === 0) return [];
        return this.patientrequests.map((i: any) => {
        return {
            code: i.id,
            display: i.category,
        };
        });
    }
    get allDrug() {
        if (!this.searchresult || this.searchresult.length === 0) return [];
        return this.searchresult.map((i: any) => {
        return {
            code: i.id,
            display: i.name,
        };
        });
    }
    get allBrand() {
    if (!this.fullInfo || this.fullInfo.length === 0) return [];
    return this.fullInfo.map((i: any) => {
      return {
        code: i.label,
        value: i.label,
        display: i.label,
      };
    });
  }
     async resultBrand(id: any) {
        const pt = this.fullInfo.find((i: any) => i.label === id);
        this.anewBrand = pt?.data;
        return pt || [];
      }

     async resultPack(id: any) {
        const pt = this.anewBrand.find((i: any) => i.id === id);
        //this.resultStrength(id);
        if(pt){
          console.log({pt})
          this.pack = pt.pack;
          this.strength = pt.strength;
          this.Nafdac = pt.NAFDAC;
          //this.form = pt.form
        }
        return pt;
      }

    async resultStrength(id: any) {
        const pt = this.fullInfo.find((i: any) => i.id === id);
        this.resultNadac(id);

        return (this.strength = pt ? `${pt?.strength}` : "Strength not available");
    }
    async resultNadac(id: any) {
      const pt = this.fullInfo.find((i: any) => i.id === id);
      return (this.Nafdac = pt ? `${pt?.NAFDAC}` : "NAFDAC not available");
    }

   get allForms() {
    if (!this.anewBrand || this.anewBrand.length === 0) return [];
    return this.anewBrand.map((i: any) => {
      return {
        code: i.id,
        value: i.id,
        display: i.form,
      };
    });
  }
    // get allConditions() {
    //     if (!this.conditions || this.conditions.length === 0) return [];
    //     return this.conditions.map((i: any) => {
    //     return {
    //         code: i.id,
    //         display: i.name,
    //     };
    //     });
    // }
     get allIssues() {
        if (!this.issues || this.issues.length === 0) return [];
        return this.issues.map((i: any) => {
        return {
            code: i.id,
            display: i.code,
        };
        });
    }
     get allRoles() {
        if (!this.roles || this.roles.length === 0) return [];
        return this.roles.map((i: any) => {
        return {
            code: i.id,
            display: i.name,
        };
        });
    }
  get newaction() {
    return this.selectedItem.id ? "Update" : "Create";
  }

 

  get payload() {
    return {
      basedOn: this.basedOn,
      intent: this.intent,
      priority: this.priority,
      category: this.category,
      requesterId: this.requesterId,
      patientId: this.onepatientId,
      dispenserId: this.dispenserId,
      supportingInformation: this.supportingInformation || undefined,
      medications: this.medications,
      status: this.status,
      reasonCode: this.reasonCode,
      reasonReference: this.reasonReference,
      note: this.note,
      allergies: this.allergies,
      conditions: this.aconditions,
      identifier: this.identifier,
      safetyCapRequest: this.safetyCapRequest,
      deliveryLocation: this.deliveryLocation,
      priorPrescription: this.priorPrescription,
      detectedIssues: this.detectedIssues,
    };
  }


  async submit() {
    this.loading = true;
    if (this.selectedItem.id) await this.updateRequest();
    else await this.createRequest();
    this.loading = false;
  }

  async createRequest() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;
    try {
      const response = await cornieClient().post(
        "/api/v1/medication-requests",
        this.payload
      );
      if (response.success) {
        // this.setPatientRequests([response.data]);
        window.notify({ msg: "Request Created", status: "success" });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: "Request Not Created", status: "error" });
    }
  }
  async updateRequest() {
    const id = this.selectedItem.id;
    const url = `/api/v1/medication-requests/${id}`;
    const payload = this.payload;
    try {
      const response = await cornieClient().put(url, this.payload);
      if (response.success) {
        //  this.setPatientRequests([response.data]);
        window.notify({ msg: "Request Updated", status: "success" });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: "Request Not Updated", status: "error" });
    }
  }


  async createMapper() {
    this.medicationMapper = await mapDisplay(
      "http://hl7.org/fhir/ValueSet/medication-codes"
    );
  }

   async searchData(event: any) {
    if(event.target.value.length > 2){
      const AllNotes = cornieClient().get(`/api/v1/emdex/generic-by-keyword/`, {
        keyword: event.target.value,
      });
      const response = await Promise.all([AllNotes]);
      if (response[0].data === 0) {
        this.searchresult = "No medication code found";
      } else {
        this.searchresult = response[0].data;
      }
    }
  }
  async resultData(id: any) {
    if(id){
      const AllNotes = cornieClient().get(`/api/v1/emdex/generic-brands/${id}`);
    const response = await Promise.all([AllNotes]);
    if (response[0].data === 0) {
      this.fullInfo = "No medication code found";
    } else {
      const info = response[0].data;
     const newData = [...new Set(info.map((d:any) => d.name))].map(label => {
        return {
          label,
          data: info.filter((d:any) => d.name === label).flatMap((d:any) => {
            return {
              ...d
            }
          })
        }
      })
      this.fullInfo = newData
    }
    }
  }

  // async resultData(code: string) {
  //   const AllNotes = cornieClient().get(
  //     `/api/v1/emdex/generic-brands/${code}`,
  //   );
  //   const response = await Promise.all([AllNotes]);
  //   if (response[0].data === 0) {
  //     this.fullInfo = 'No medication code found'
  //   } else {

  //     this.fullInfo = response[0].data;
  //   }

  // }
  done() {
    this.$emit("medication-added");
    this.show = false;
  }

  async created() {
    await this.setRequest();
    await this.getRoles();
    await this.createMapper();
    await this.fetchPatients();
    await this.fetchPractitioners();
  }
}
</script>
<style src="@vueform/multiselect/themes/default.css">
</style>
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
  min-height: calc(var(--ms-border-width, 1px) * 2 + var(--ms-font-size, 1rem) * var(--ms-line-height, 1.375) + var(--ms-py, 0.5rem) * 2);
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