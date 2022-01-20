<template>
  <cornie-dialog v-model="show" right class="h-full" style="width: 70.6667%">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            {{ allaction }} Request
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Request Info"
            v-model="opened"
            :opened="true"
          >
            <template v-slot:default>
              <div class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
                <fhir-input
                  reference="http://hl7.org/fhir/ValueSet/medicationrequest-status-reason"
                  class="required w-full"
                  :rules="required"
                  v-model="requestModel.requestInfo.statusReason"
                  label="status reason"
                  placeholder="--Select--"
                />
                <!-- <cornie-select
                    class="required"
                    :rules="required"
                    :items="['Try another treatment first','Prescription requires clarification','Drug level too high','Drug level too high','Admission to hospital','Lab interference issues','Patient not available','Parent is pregnant/breast feeding','Allergy','Drug interacts with another drug','Duplicate therapy','Suspected intolerance','Patient scheduled for surgery','Waiting for old drug to wash out']"
                    v-model="requestModel.requestInfo.statusReason"
                    label="status reason"
                    placeholder="--Select--"
                  >
                  </cornie-select> -->
                <fhir-input
                  reference="http://hl7.org/fhir/ValueSet/medicationrequest-intent"
                  class="required w-full"
                  :rules="required"
                  v-model="requestModel.requestInfo.intent"
                  label="intent"
                  placeholder="--Select--"
                />
                <!-- <cornie-select
                    class="required"
                    :rules="required"
                    :items="['proposal','plan','order','original-order','reflex-order','filler-order','instance-order','option']"
                    v-model="requestModel.requestInfo.intent"
                    label="intent"
                    placeholder="--Select--"
                  >
                  </cornie-select> -->
                <fhir-input
                  reference="http://hl7.org/fhir/ValueSet/medicationrequest-category"
                  class="required w-full"
                  :rules="required"
                  v-model="requestModel.requestInfo.category"
                  label="category"
                  placeholder="--Select--"
                />
                <!-- <cornie-select
                    class="required"
                    :rules="required"
                    :items="['Inpatient','Outpatient','Community','Discharge']"
                    v-model="requestModel.requestInfo.category"
                    label="category"
                    placeholder="--Select--"
                  >
                  </cornie-select> -->
                <fhir-input
                  reference="http://hl7.org/fhir/ValueSet/request-priority"
                  class="required w-full"
                  :rules="required"
                  v-model="requestModel.requestInfo.priority"
                  label="priority"
                  placeholder="--Select--"
                />
                <!-- <cornie-select
                    class="required"
                    :rules="required"
                    :items="['Routine','Urgent','ASAP','STAT']"
                    v-model="requestModel.requestInfo.priority"
                    label="priority"
                    placeholder="--Select--"
                  >
                  </cornie-select> -->
                <cornie-select
                  class="required w-full"
                  :rules="required"
                  :items="['True', 'False']"
                  v-model="requestModel.requestInfo.doNotPerform"
                  label="do not perform"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-input
                  :rules="required"
                  v-model="requestModel.requestInfo.reasonForProhibition"
                  label="reason for prohibition"
                  placeholder="--Enter--"
                  class="w-full"
                >
                </cornie-input>
                <div class="w-full">
                  <label
                    class="flex uppercase mb-1 text-black text-xs font-bold"
                    >recorder</label
                  >
                  <input-desc-rounded :info="''">
                    <input
                      :value="
                        authPractitioner.firstName +
                        ' ' +
                        authPractitioner.lastName
                      "
                      disabled
                      type="text"
                      class="p-2 border w-100 w-full"
                      style="border-radius: 8px"
                    />
                  </input-desc-rounded>
                </div>
                <div class="w-full">
                  <label
                    class="flex uppercase mb-1 text-black text-xs font-bold"
                    >requester</label
                  >
                  <input-desc-rounded :info="''">
                    <input
                      :value="
                        PatientName.firstname + ' ' + PatientName.lastname
                      "
                      disabled
                      type="text"
                      class="p-2 border w-100 w-full"
                      style="border-radius: 8px"
                    />
                  </input-desc-rounded>
                </div>
              </div>
            </template>
          </accordion-component>
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Participants"
            expand="true"
            v-model="opened"
            :opened="false"
          >
            <p
              class="text-gray-600 text-xs mt-5 mb-5 pb-3 italic border-b-2 border-dashed"
            >
              Patient
            </p>
            <div class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
              <div class="w-full mt-1">
                <label class="flex uppercase mb-1 text-black text-xs font-bold"
                  >subject</label
                >
                <input-desc-rounded :info="''">
                  <input
                    :value="PatientName.firstname + ' ' + PatientName.lastname"
                    disabled
                    type="text"
                    class="p-2 border w-100 w-full"
                    style="border-radius: 8px"
                  />
                </input-desc-rounded>
              </div>
              <cornie-select
                v-if="PatientName.insurances.length > 0"
                class="required w-full"
                :rules="required"
                :items="PatientName.insurances"
                v-model="requestModel.subject.paymentOption"
                label="payment option"
                placeholder="--Select--"
              >
              </cornie-select>
              <cornie-select
                v-else
                class="required w-full"
                :rules="required"
                :items="['No Payment option for this patient']"
                v-model="requestModel.subject.paymentOption"
                label="payment option"
                placeholder="--Select--"
              >
              </cornie-select>
            </div>
            <p
              class="text-gray-600 text-xs pb-3 italic border-b-2 border-dashed"
            >
              Dispenser
            </p>
            <div class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
              <div class="w-full">
                <label class="flex uppercase mb-1 text-black text-xs font-bold"
                  >dispenser</label
                >
                <input-desc-rounded :info="''">
                  <input
                    :value="
                      authPractitioner.firstName +
                      ' ' +
                      authPractitioner.lastName
                    "
                    disabled
                    type="text"
                    class="p-2 border w-100 w-full"
                    style="border-radius: 8px"
                  />
                </input-desc-rounded>
              </div>
            </div>
            <p
              class="text-gray-600 text-xs pb-3 italic border-b-2 border-dashed"
            >
              Performer
            </p>
            <div class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
              <cornie-select
                class="required w-full"
                :rules="required"
                :items="[
                  'Specialized surgeon',
                  'Chiropractor',
                  'Dental assistant',
                  'Specialized nurse',
                  'Hospital administrator',
                  'Plastic surgeon',
                  'Neuropathologist',
                  'Nephrologist',
                  'Obstetrician',
                  'School dental assistant',
                  'Medical microbiologist',
                  'Cardiologist',
                  'Dermatologist',
                  'Laboratory hematologist',
                  'Gerodontist',
                  'Removable prosthodontist',
                  'Specialized dentist',
                  'Neuropsychiatrist',
                  'Medical assistant',
                  'Orthopedic surgeon',
                  'Thoracic surgeon',
                  'Community health physician',
                  'Physical medicine specialist',
                  'Urologist',
                  'Electroencephalography specialist',
                  'Dental hygienist',
                ]"
                v-model="requestModel.medicationAdministration.performerType"
                label="performer type"
                placeholder="--Select--"
              >
              </cornie-select>
              <div class="w-full">
                <label class="flex uppercase mb-1 text-black text-xs font-bold"
                  >dispenser</label
                >
                <input-desc-rounded :info="''">
                  <input
                    :value="
                      authPractitioner.firstName +
                      ' ' +
                      authPractitioner.lastName
                    "
                    disabled
                    type="text"
                    class="p-2 border w-100 w-full"
                    style="border-radius: 8px"
                  />
                </input-desc-rounded>
              </div>
            </div>
          </accordion-component>
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Medication"
            v-model="openedS"
          >
            <div class="w-full pb-7 mt-10 mb-8">
              <div class="relative z-10">
                <check-icon
                  class="icon-check-mark bg-white rounded-full"
                  v-if="width == 66.66 || width == 99.99"
                />
              </div>
              <div class="relative z-10">
                <check-icon
                  class="icon-check-mark2 bg-white rounded-full"
                  v-if="width == 99.99"
                />
              </div>
              <div class="relative z-10">
                <check-icon
                  class="icon-check-mark3 bg-white rounded-full"
                  v-if="width == 99.99"
                />
              </div>
              <div
                class="grid grid-cols-3 gap-40 w-full justify-content-between content-center"
              >
                <p
                  class="text-xs text-black mb-2 font-bold"
                  :class="{ 'text-gray-900': width == 33.33 }"
                >
                  Medication Details
                </p>
                <p
                  class="text-xs text-black mb-2 font-bold"
                  :class="{ 'text-gray-900': width == 66.66 }"
                >
                  Refill Info
                </p>
                <p
                  class="text-xs text-black mb-2 font-bold"
                  :class="{ 'text-gray-900': width == 99.99 }"
                >
                  Substitution Allowed
                </p>
              </div>
              <div class="" v-if="step == 1">
                <!-- component -->
                <div class="relative pt-1">
                  <div
                    class="overflow-hidden h-1 mb-4 text-xs flex rounded bg-gray-200 cursor-pointer"
                  >
                    <div
                      :style="{ width: `${width}%` }"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      class="progress cursor-pointer shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-danger"
                    >
                      <div class="icon-wrap"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <span
                      class="text-danger text-xs uppercase float-right font-semibold"
                      >{{ medicationsDetails.length }} added</span
                    >
                  </div>
                  <div class="w-full grid grid-cols-2 gap-5 mt-10 pb-5">
                    <fhir-input
                      reference="http://hl7.org/fhir/ValueSet/medication-codes"
                      class="required w-full"
                      :rules="required"
                      v-model="
                        medicationsDetail.medicationDetails.medicationCode
                      "
                      label="medication code"
                      placeholder="--Select--"
                    />
                    <!-- <cornie-select
                                class="w-full"
                                :items="['code']"
                                v-model="medicationsDetail.medicationDetails.medicationCode"
                                label="medication code"
                                placeholder="--Select--"
                                >
                                </cornie-select> -->
                    <cornie-select
                      class="w-full"
                      :items="['reason']"
                      label="medication reference"
                      v-model="
                        medicationsDetail.medicationDetails.medicationReference
                      "
                      placeholder="--Select--"
                    >
                    </cornie-select>
                    <cornie-select
                      class="required w-full"
                      :rules="required"
                      :items="['Continuous', 'Acute', 'Seasonal']"
                      v-model="
                        medicationsDetail.medicationDetails.courseOfTherapyType
                      "
                      label="course of therapy type"
                      placeholder="--Select--"
                    >
                    </cornie-select>
                    <cornie-input
                      class="required w-full"
                      :rules="required"
                      v-model="
                        medicationsDetail.medicationDetails.dosageInstruction
                      "
                      label="dosage instruction"
                      placeholder="e.g 2 x Daily"
                    >
                    </cornie-input>
                    <cornie-input
                      class="required w-full"
                      :rules="required"
                      label="initial fill"
                      v-model="medicationsDetail.medicationDetails.initialFill"
                      placeholder="--Enter--"
                    >
                    </cornie-input>
                    <cornie-input
                      class="required w-full"
                      :rules="required"
                      label="quantity"
                      v-model="medicationsDetail.medicationDetails.quantity"
                      placeholder="--Enter--"
                    >
                    </cornie-input>
                    <date-picker
                      placeholder="autofill"
                      label="Duration"
                      v-model="medicationsDetail.medicationDetails.duration"
                      class="mb-5 w-full"
                    />
                  </div>
                </div>
              </div>
              <div class="" v-if="step == 2">
                <!-- component -->
                <div class="relative pt-1">
                  <div
                    class="overflow-hidden h-1 mb-4 text-xs flex rounded bg-gray-200 cursor-pointer"
                    @click="back"
                  >
                    <div
                      :style="{ width: `${width}%` }"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      class="progress cursor-pointer shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-danger"
                    >
                      <div class="icon-wrap2"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <span
                      class="text-danger text-xs uppercase float-right font-semibold"
                      >{{ medicationsDetails.length }} added</span
                    >
                  </div>
                  <div class="w-full grid grid-cols-2 gap-5 mt-10 pb-5">
                    <date-picker
                      placeholder="autofill"
                      v-model="medicationsDetail.refillInfo.dispenseInterval"
                      label="dispense interval"
                      class="w-full mb-5 required"
                      :rules="required"
                    />

                    <cornie-input
                      class="required w-full"
                      :rules="required"
                      v-model="
                        medicationsDetail.refillInfo.numberOfRepeatsAllowed
                      "
                      label="number of repeats allowed"
                      placeholder="--Enter--"
                    >
                    </cornie-input>
                    <cornie-input
                      class="required w-full"
                      :rules="required"
                      v-model="medicationsDetail.refillInfo.quantity"
                      label="quantity"
                      placeholder="--Enter--"
                    >
                    </cornie-input>
                    <cornie-input
                      class="required w-full"
                      :rules="required"
                      v-model="
                        medicationsDetail.refillInfo.expectedSupplyDuration
                      "
                      label="expected supply duration"
                      placeholder="--Enter--"
                    >
                    </cornie-input>
                  </div>
                </div>
              </div>
              <div class="" v-if="step == 3">
                <!-- component -->
                <div class="relative pt-1">
                  <div
                    class="overflow-hidden h-1 mb-4 text-xs flex rounded bg-gray-200 cursor-pointer"
                    @click="back"
                  >
                    <div
                      :style="{ width: `${width}%` }"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      class="progress cursor-pointer shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-danger"
                    >
                      <div class="icon-wrap3"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <span
                      class="text-danger text-xs uppercase float-right font-semibold"
                      >{{ medicationsDetails.length }} added</span
                    >
                  </div>
                  <div class="w-full grid grid-cols-2 gap-5 mt-10 pb-5">
                    <cornie-select
                      class="required w-full"
                      :rules="required"
                      :items="[
                        'Equivalent',
                        'Equivalent composition',
                        'Brand composition',
                        'Generic composition',
                        'Therapeutic alternative',
                        'Therapeutic brand',
                        'Therapeutic generic',
                        'Formulary',
                        'none',
                      ]"
                      label="Code"
                      v-model="medicationsDetail.substitutionAllowed.code"
                      placeholder="--Select--"
                    >
                    </cornie-select>
                    <cornie-select
                      class="w-full"
                      :items="[
                        'Continuing therapy',
                        'Formulary policy',
                        'Out of stock',
                        'Regulatory requirement',
                      ]"
                      label="reason"
                      v-model="medicationsDetail.substitutionAllowed.reason"
                      placeholder="--Select--"
                    >
                    </cornie-select>
                  </div>
                </div>
              </div>

              <cornie-btn
                v-if="width == 33.33 || width == 66.66"
                @click="next"
                type="button"
                class="border-primary border-2 px-2 mr-3 float-right rounded-xl text-primary"
              >
                <update-icon class="mr-3" /> Next
              </cornie-btn>
              <cornie-btn
                v-else
                @click="addMedicationDetails"
                type="button"
                class="border-primary border-2 mb-5 px-2 mr-3 float-right rounded-xl text-primary"
              >
                <bluecheck-icon class="mr-3" /> Add
              </cornie-btn>
              <div class="mt-5">
                <div class="w-full grid grid-cols-3 gap-4 mt-5">
                  <div
                    class="border-r-2 border-dashed"
                    v-for="(input, index) in medicationsDetails"
                    :key="`-${index}`"
                  >
                    <div class="flex space-x-10">
                      <div class="mb-0 p-2">
                        <p class="text-xs text-primary font-semibold">
                          {{ input.medicationDetails.medicationCode }}
                        </p>
                        <p class="text-xs text-gray-500 font-light">
                          {{ input.medicationDetails.dosageInstruction }}
                        </p>
                      </div>
                      <span>
                        <deleteorange-icon
                          class="float-right cursor-pointer mt-4 ml-14"
                          @click="removemedication(index)"
                        />
                        <d-edit
                          class="float-right mt-4 ml-5 cursor-pointer"
                          @click="editmedication(index)"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </accordion-component>
          <accordion-component
            class="shadow-none rounded-none border-none text-primary"
            title="Other Info"
            expand="true"
            v-model="opened"
            :opened="false"
          >
            <div class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
              <cornie-select
                class="required w-full"
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
                class="required w-full"
                :rules="required"
                :items="['service type']"
                v-model="requestModel.fufillment.affixLabel"
                label="affix label"
                placeholder="--Select--"
              >
              </cornie-select>
              <cornie-select
                class="required w-full"
                :rules="required"
                :items="['option']"
                v-model="requestModel.fufillment.fulfillmentOption"
                label="fulfillment option"
                placeholder="--Select--"
              >
              </cornie-select>
              <cornie-select
                class="required w-full"
                :rules="required"
                :items="['shipping']"
                v-model="requestModel.fufillment.priorityShipping"
                label="priority shipping"
                placeholder="--Select--"
              >
              </cornie-select>
              <cornie-select
                :items="dropdowns.serviceCategory"
                v-model="requestModel.history.priorPrescription"
                label="prior prescription"
                placeholder="--Select--"
                class="w-full"
              >
              </cornie-select>
              <cornie-select
                :items="dropdowns.serviceType"
                v-model="requestModel.history.detectedIssue"
                label="detected issue"
                placeholder="--Select--"
                class="w-full"
              >
              </cornie-select>
              <cornie-select
                class="required w-full"
                :rules="required"
                :items="dropdowns.serviceType"
                v-model="requestModel.history.eventHistory"
                label="event history"
                placeholder="--Select--"
              >
              </cornie-select>
            </div>
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
            @click="apply"
            class="text-white bg-danger px-6 rounded-xl"
          >
            {{ newaction }}
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from "@/components/icons/info.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import MainCornieSelect from "@/components/cornieselect.vue";
import UpdateIcon from "@/components/icons/blueupdate.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CheckIcon from "@/components/icons/authcheck.vue";
import NoteIcon from "@/components/icons/graynote.vue";
import { cornieClient } from "@/plugins/http";
import DEdit from "@/components/icons/aedit.vue";
import RangeSlider from "@/components/range.vue";
import DeleteorangeIcon from "@/components/icons/deleteorange.vue";
import CDelete from "@/components/icons/adelete.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import BluecheckIcon from "@/components/icons/bluecheck.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import DatePicker from "@/components/daterangepicker.vue";
import { string } from "yup";
import IRequest, { Medications, MedicationDetails } from "@/types/IRequest";
import { IPatient } from "@/types/IPatient";
import Period from "@/types/IPeriod";
import DateTimePicker from "./components/datetime-picker.vue";
import { namespace } from "vuex-class";
import FhirInput from "@/components/fhir-input.vue";
import IPractitioner from "@/types/IPractitioner";
import InputDescRounded from "./components/input-desc-rounded.vue";
import ReferenceModal from "@/views/dashboard/ehr/refferal/reasonref.vue";

const userStore = namespace("user");

const request = namespace("request");
const dropdown = namespace("dropdown");
const patients = namespace("patients");

const emptyMedicationDetails: Medications = {
  medicationDetails: {
    medicationCode: "",
    medicationReference: "",
    courseOfTherapyType: "",
    dosageInstruction: "",
    initialFill: "",
    quantity: 0,
    duration: {} as Period,
  },
  refillInfo: {},
  substitutionAllowed: {},
};

const emptyRequest: IRequest = {
  requestInfo: {},
  requestDetails: {},
  subject: {},
  performer: {},
  medicationAdministration: {},
  fufillment: {},
  history: {},
  Medications: [],
};

@Options({
  name: "requestDialog",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    ArrowLeftIcon,
    DatePicker,
    CDelete,
    RangeSlider,
    UpdateIcon,
    DeleteorangeIcon,
    InputDescRounded,
    CheckIcon,
    BluecheckIcon,
    DEdit,
    FhirInput,
    CancelIcon,
    InfoIcon,
    CornieDialog,
    DateTimePicker,
    SearchIcon,
    AccordionComponent,
    IconInput,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieRadio,
    CornieBtn,
    MainCornieSelect,
  },
})
export default class Medication extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  requestModel = {} as IRequest;

  @request.Action
  getRequestById!: (id: string) => IRequest;

  @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;

  @userStore.Getter
  authPractitioner!: IPractitioner;

  @request.Mutation
  setPatientRequests!: any;

  checked = false;
  checked2 = false;
  checked3 = false;
  step = 1;
  width_percent = 33.33;
  width = 33.33;

  loading = false;
  expand = false;
  isVisible = "";
  startdate = "";
  enddate = "";
  selected = 1;
  rule = true;
  opened = true;
  openedR = true;
  openedS = true;
  openedM = false;
  showMedicationModal = false;

  patient = [];
  practitioner = [];

  dispenser = "";
  subject = "";
  requester = "";
  performer = "";

  medicationCode = "";
  medicationReference = "";
  courseOfTherapyType = "";
  dosageInstruction = "";
  initialFill = "";
  quantity = 0;
  duration = {} as Period;
  dispenseInterval = {} as Period;
  numberOfRepeatsAllowed = 0;
  repeatquantity = 0;
  expectedSupplyDuration = 0;
  code = "";
  reason = "";

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

  @Watch("id")
  idChanged() {
    this.setRequest();
  }
  get allMedicationDetails() {
    return {
      medicationCode: this.medicationCode,
      medicationReference: this.medicationReference,
      courseOfTherapyType: this.courseOfTherapyType,
      dosageInstruction: this.dosageInstruction,
      initialFill: this.initialFill,
      quantity: this.quantity,
      duration: this.duration,
    };
  }
  get allRefillInfo() {
    return {
      dispenseInterval: this.dispenseInterval,
      numberOfRepeatsAllowed: this.numberOfRepeatsAllowed,
      quantity: this.repeatquantity,
      expectedSupplyDuration: this.expectedSupplyDuration,
    };
  }

  get allSubstitution() {
    return {
      code: this.code,
      reason: this.reason,
    };
  }

  get allMedications() {
    return {
      medicationDetails: this.allMedicationDetails,
      refillInfo: this.allRefillInfo,
      substitutionAllowed: this.allSubstitution,
    };
  }
  get PatientName() {
    const id = this.$route.params.id;
    const pt = this.patients.find((i: any) => i.id === id);
    return {
      ...pt,
    };
  }

  select(i: number) {
    this.selected = i;
  }
  async next() {
    this.step = this.step + 1;
    this.width += this.width_percent;
  }

  async back() {
    this.step >= 0 && (this.step -= 1);
    this.width -= this.width_percent;
  }

  medicationsDetail = { ...emptyMedicationDetails };
  // medicationsDetail = this.requestModel.Medications;
  medicationsDetails: Medications[] = [];

  addMedicationDetails() {
    this.medicationsDetails.push({ ...this.medicationsDetail });
    this.back();
  }
  removemedication(index: number) {
    this.medicationsDetails.splice(index, 1);
  }
  async setRequestModel() {
    this.requestModel = JSON.parse(JSON.stringify({ ...emptyRequest }));
    this.requestModel.Medications = [this.allMedications];
  }
  async setRequest() {
    const request = await this.getRequestById(this.id);
    if (!request) return;
    // this.requestModel =  (request);
    this.requestModel.requestInfo = request.requestInfo;
    this.requestModel.requestDetails = request.requestDetails;
    this.requestModel.subject = request.subject;
    this.requestModel.performer = request.performer;
    this.requestModel.medicationAdministration =
      request.medicationAdministration;
    this.requestModel.fufillment = request.fufillment;
    this.requestModel.history = request.history;
    this.requestModel.Medications = request.Medications;
  }
  get newaction() {
    return this.id ? "Update" : "Save";
  }
  get payload() {
    //  const model = JSON.parse(JSON.stringify({ ...this.requestModel }));
    // return model;
    return {
      requestInfo: this.requestModel.requestInfo,
      requestDetails: this.requestModel.requestDetails,
      subject: this.requestModel.subject,
      performer: this.requestModel.performer,
      medicationAdministration: this.requestModel.medicationAdministration,
      fufillment: this.requestModel.fufillment,
      history: this.requestModel.history,
      medications: this.requestModel.Medications,
    };
  }
  get allaction() {
    return this.id ? "Edit" : "New";
  }
  get allPerformer() {
    if (!this.practitioner || this.practitioner.length === 0) return [];
    return this.practitioner.map((i: any) => {
      return {
        code: i.id,
        display: i.firstName + " " + i.lastName,
      };
    });
  }
  get allRequester() {
    if (!this.patient || this.patient.length === 0) return [];
    return this.patient.map((i: any) => {
      return {
        code: i.id,
        display: i.firstname + " " + i.lastname,
      };
    });
  }
  async showMedication(value: any) {
    this.requestModel.Medications = value;
    this.showMedicationModal = true;
  }
  done() {
    this.$emit("allergy-added");
    this.show = false;
  }
  async apply() {
    this.loading = true;
    if (this.id) await this.updateRequest();
    else await this.createRequest();
    this.loading = false;
  }
  async createRequest() {
    //const period = this.period;
    const practitionerfullnameid = this.authPractitioner.id;
    const patientfullnameid = this.PatientName.id;

    this.payload.requestDetails.recorder = practitionerfullnameid;
    this.payload.requestDetails.requester = patientfullnameid;
    this.payload.subject.subject = patientfullnameid;
    this.payload.performer.dispenser = practitionerfullnameid;
    this.payload.medicationAdministration.performer = practitionerfullnameid;
    this.payload.medications = this.medicationsDetails;
    try {
      const response = await cornieClient().post(
        "/api/v1/requests",
        this.payload
      );
      if (response.success) {
        this.setPatientRequests([response.data]);
        window.notify({ msg: "Request Created", status: "success" });
        this.done();
      }
    } catch (error) {
      window.notify({ msg: "Request not Created", status: "error" });
    }
  }
  async updateRequest() {
    const id = this.id;
    const url = `/api/v1/requests/${id}`;
    const payload = this.payload;
    try {
      const response = await cornieClient().put(url, this.payload);
      if (response.success) {
        this.setPatientRequests([response.data]);
        window.notify({ msg: "Request Updated", status: "success" });
        this.done();
      }
    } catch (error) {
      window.notify({ msg: "Request not Updated", status: "error" });
    }
  }
  async fetchAllPatients() {
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
    this.setRequestModel();
    this.fetchPatients();
    this.fetchAllPatients();
    this.fetchPractitioner();
    const data = await this.getDropdowns("availability");
    const data2 = await this.getDropdowns("practitioner");
    this.dropdowns = data;
    this.dropdowns2 = data2;
  }
}
</script>

<style>
.bg-gray {
  background-color: #f6f8f9;
}
.icon-wrap {
  content: counter(step);
  counter-increment: step;
  background: #fff;
  border-radius: 50%;
  top: -0.3em;
  z-index: 1;
  color: #fff;
  border: 2px solid #fe4d3c;
  display: block;
  height: 1.4em;
  margin: 0 auto -0.6em;
  left: -54em;
  right: 0;
  position: absolute;
  width: 1.4em;
}
.icon-wrap2 {
  background: #fff;
  border-radius: 50%;
  top: -0.3em;
  z-index: 1;
  color: #fff;
  border: 2px solid #fe4d3c;
  display: block;
  height: 1.4em;
  margin: 0 auto -0.6em;
  left: -7.5em;
  right: 0;
  position: absolute;
  width: 1.4em;
}
.icon-wrap3 {
  background: #fff;
  border-radius: 50%;
  top: -0.3em;
  z-index: -1;
  color: #fff;
  border: 2px solid #fe4d3c;
  display: block;
  height: 1.4em;
  margin: 0 auto -0.6em;
  left: 52em;
  right: 0;
  position: absolute;
  width: 1.4em;
}
.icon-wrap4 {
  background: #fff;
  border-radius: 50%;
  top: -0.3em;
  z-index: 1;
  color: #fff;
  border: 2px solid #fe4d3c;
  display: block;
  height: 1.4em;
  margin: 0 auto -0.6em;
  left: 42em;
  right: 0;
  position: absolute;
  width: 1.4em;
}
.icon-check-mark {
  top: 1.3em;
  z-index: 1;
  left: 5em;
  right: 0;
  position: absolute;
}
.icon-check-mark2 {
  top: 1.3em;
  z-index: 1;
  left: 23em;
  right: 0;
  position: absolute;
}
.icon-check-mark3 {
  top: 1.3em;
  z-index: 1;
  left: 45.5em;
  right: 0;
  position: absolute;
}
.bg-danger-100 {
  background-color: #fe4d3c;
}
</style>
