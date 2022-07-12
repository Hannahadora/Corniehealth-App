<template>
  <cornie-dialog
    v-model="show"
    right
    class="w-5/12 h-full"
    style="z-index: 999"
  >
    <cornie-card height="100%" class="flex flex-col bg-white">
      <cornie-card-title>
        <div class="w-full flex items-center justify-between">
          <div class="w-full flex items-center">
            <span class="pr-2 flex items-center cursor-pointer border-r-2">
              <cornie-icon-btn @click="show = false">
                <arrow-left-icon />
              </cornie-icon-btn>
            </span>

            <h2 class="font-bold text-lg text-primary ml-3 -mt-0.5">
              Item reference
            </h2>
          </div>
          <delete-icon
            class="text-danger fill-current cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <div class="flex flex-col p-3 mb-7 h-96">
          <div class="border-b-2 pb-3 border-dashed">
            <label
              for="ecounter"
              class="flex capitalize mb-5 mt-5 text-black text-xs font-bold"
              >status
            </label>
            <div class="w-full flex space-x-4 flex-wrap">
              <cornie-radio
                v-for="(option, i) in referenceOptions"
                :key="i"
                :label="option"
                class="text-xs"
                name="reference"
                v-model="type"
                :value="option"
              />
            </div>
          </div>
          <div class="w-full mt-4">
            <div class="relative bottom-2">
              <icon-input
                autocomplete="off"
                class="border border-gray-200 h-10 w-full rounded-full focus:outline-none"
                type="search"
                placeholder="Search"
                v-bind="$attrs"
                v-model="query"
              >
                <template v-slot:prepend>
                  <search-icon />
                </template>
              </icon-input>
            </div>
          </div>
          <div class="">
            <div>
              <div v-if="type === 'Condition'">
                <div v-for="(input, index) in conditions" :key="index">
                  <div
                   :class="{ 'bg-gray-100' : selectedRef === input }"
                    class="w-full mt-2 p-3 hover:bg-gray-100 cursor-pointer"
                    @click="getValue(input)"
                  >
                    <div class="w-full flex items-center justify-between">
                      <div class="w-full">
                        <p class="text-sm text-dark mb-1 font-medium">
                          {{ codeMapper(input.code) }}
                        </p>
                        <p class="text-sm text-dark mb-1 font-medium">
                          {{ severityMapper(input.severity) }}
                        </p>
                        <p class="text-xs text-gray-300">
                          {{ new Date(input?.recordDate).toLocaleDateString() }}
                        </p>
                      </div>

                      <div>
                        <p class="text-sm">
                          <span>{{ input?.practitioner?.firstName }}</span>
                          <span>{{ input?.practitioner?.lastName }}</span>
                        </p>
                        <p class="text-xs text-gray-300">
                          {{ input?.practitioner?.jobDesignation }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="type === 'Observation'">
                <div v-for="(input, index) in observations" :key="index">
                  <div
                   :class="{ 'bg-gray-100' : selectedRef === input }"
                    class="w-full mt-2 p-3 hover:bg-gray-100 cursor-pointer"
                    @click="getValue(input)"
                  >
                    <div class="w-full">
                      <div class="w-full">
                        <p class="text-sm text-dark mb-1 font-medium">
                          {{ input?.basicInfo?.subject }}
                        </p>
                        <p class="text-xs text-gray-300">
                          {{ new Date(input.createdAt).toLocaleDateString() }},
                          {{ new Date(input.createdAt).toLocaleTimeString() }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="type == 'Device'">
              <div v-for="(input, index) in devices" :key="index">
                <div
                 :class="{ 'bg-gray-100' : selectedRef === input }"
                  class="w-full mt-2 p-3 hover:bg-gray-100 cursor-pointer"
                  @click="getValue(input)"
                >
                  <div class="flex space-x-10 w-full justify-between p-3">
                    <div class="dflex space-x-4">
                      <div class="w-10 h-10">
                        <avatar
                          class="mr-2 object-cover object-center w-full h-full visible group-hover:hidden"
                          :src="localSrc"
                        />
                      </div>
                      <div class="w-full">
                        <p class="text-xs text-dark font-semibold">
                          {{ input.deviceName.name }}
                        </p>
                        <p class="text-xs text-gray-500 font-meduim">
                          {{ input.deviceName.nameType }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="type == 'MedicationRequest'">
              <div v-for="(input, index) in medItems" :key="index">
                <div
                :class="{ 'bg-gray-100' : selectedRef === input }"
                  class="w-full mt-2 p-3 hover:bg-gray-100 cursor-pointer"
                  @click="getValue(input)"
                >
                  <div class="flex space-x-10 w-full justify-between p-3">
                    <div class="dflex space-x-4">
                      <div class="w-full">
                        <p class="text-xs text-dark font-semibold">
                          {{ input.genericName }}
                        </p>
                        <p class="text-xs text-gray-500 font-meduim">
                          {{ input.dosageInstruction }}
                        </p>
                      </div>
                    </div>

                    <div class="text-right">
                      <p>
                        {{
                          input.patient.firstname + "" + input.patient.lastname
                        }}
                      </p>
                      <p class="text-gray-400">{{ input.patient.mrn }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="type == 'CarePlan'">
              <div v-for="(input, index) in medItems" :key="index">
                <div
                :class="{ 'bg-gray-100' : selectedRef === input }"
                  class="w-full mt-2 p-3 hover:bg-gray-100 cursor-pointer"
                  @click="getValue(input)"
                >
                  <div class="flex space-x-10 w-full justify-between p-3">
                    <div class="dflex space-x-4">
                      <div class="w-full">
                        <p class="text-xs text-dark font-semibold">
                          {{ input.category }}
                        </p>
                        <p class="text-xs text-gray-500 font-meduim">
                          {{ input.intent }}
                        </p>
                      </div>
                    </div>

                    <div class="text-right">
                      <p>
                        {{
                          input.patient.firstname + "" + input.patient.lastname
                        }}
                      </p>
                      <p class="text-gray-400">{{ input.patient.mrn }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </cornie-card-text>

      <div class="flex items-center justify-end pb-6 px-2">
        <div class="flex justify-end w-full mt-auto">
          <button
            class="rounded-full mt-5 py-2 px-3 border border-primary focus:outline-none hover:opacity-90 w-1/3 mr-2 text-primary font-semibold"
            @click="show = false"
          >
            Cancel
          </button>
          <button
            @click="apply()"
            class="bg-danger rounded-full text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90 w-1/3"
          >
            Add
          </button>
        </div>
      </div>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import Modal from "@/components/practitionermodal.vue";
import DragIcon from "@/components/icons/draggable.vue";
import Draggable from "vuedraggable";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieCard from "@/components/cornie-card";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import IconInput from "@/components/IconInput.vue";
import Availability from "@/components/availability.vue";
import Profile from "@/components/profile.vue";
import SearchIcon from "@/components/icons/search.vue";
import Avatar from "@/components/avatar.vue";
import { cornieClient } from "@/plugins/http";
import CornieSelect from "@/components/cornieselect.vue";
import CornieCheckbox from "@/components/corniecheckbox.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import { useHandleImage } from "@/composables/useHandleImage";
import DatePicker from "@/components/daterangepicker.vue";
import CornieRadio from "@/components/cornieradio.vue";
import Period from "@/types/IPeriod";
import { initial } from "lodash";
import { namespace } from "vuex-class";

import IAllergy from "@/types/IAllergy";
import { ICondition } from "@/types/ICondition";
import IPractitioner from "@/types/IPractitioner";
const allergy = namespace("allergy");
const condition = namespace("condition");
const practitioner = namespace("practitioner");

import { mapDisplay } from "@/plugins/definitions";

@Options({
  name: "ReferenceDialog",
  components: {
    ...CornieCard,
    Modal,
    DragIcon,
    CornieSelect,
    CornieCheckbox,
    ArrowLeftIcon,
    CornieIconBtn,
    CancelIcon,
    Draggable,
    DatePicker,
    Availability,
    CornieDialog,
    IconInput,
    SearchIcon,
    Profile,
    Avatar,
    CornieRadio,
  },
})
export default class ReferenceDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Array, default: [] })
  referenceOptions!: any[];

  @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  @allergy.State
  allergys!: any[];

  @allergy.Action
  fetchAllergys!: (patientId: string) => Promise<void>;

  @condition.Action
  fetchPatientConditions!: (patientId: string) => Promise<void>;

  @condition.State
  conditions!: ICondition[];

  severityMapper = (code: string) => "";
  codeMapper = (code: string) => "";

  loading = false;

  selectedRef = <any>{};
  type = "";
  refBasis = "";
  query = "";
  documentReference = <any>[];
  imagingStudy = <any>[];
  media = <any>[];
  questionnaireResponse = <any>[];
  observations = <any>[];
  molecularSequence = <any>[];
  carePlan = <any>[];
  medReq = <any>[];
  devices = <any>[];
  localSrc = require("../../../../../assets/img/placeholder.png");

  get patientId() {
    return this.$route.params.id;
  }

  async loadMappers() {
    this.severityMapper = await mapDisplay(
      "http://hl7.org/fhir/ValueSet/condition-severity"
    );
    this.codeMapper = await mapDisplay(
      "http://hl7.org/fhir/ValueSet/condition-code"
    );
  }

  get medItems() {
    const combined = this.medReq.map(this.medicationRequest);
    const requests = combined.flatMap((value: any) => value);

    return requests;
  }

  medicationRequest(request: any) {
    const { medications, ...rest } = request;
    return medications.map((medication: any) => {
      return {
        ...medication,
        ...rest,
        medicationId: medication.id,
        requestId: request.id,
        createdAt: new Date(request.createdAt).toLocaleDateString(),
      };
    });
  }

  getValue(value: any) {
    this.selectedRef = value;
  }
  async fetchObservations() {
    try {
      const { data } = await cornieClient().get(`/api/v1/observations/`);
      this.observations = data;
    } catch (error) {
      window.notify({
        msg: "There was an error when fetching observations",
        status: "error",
      });
    }
  }
  async fetchCarePlan() {
    try {
      const { data } = await cornieClient().get(
        `/api/v1/care-plan/practitioner/`
      );
      this.carePlan = data;
    } catch (error) {
      window.notify({
        msg: "There was an error when fetching care plans",
        status: "error",
      });
    }
  }
  async fetchDevices() {
    try {
      const { data } = await cornieClient().get(`/api/v1/devices`);
      this.devices = data;
    } catch (error) {
      window.notify({
        msg: "There was an error when fetching devices",
        status: "error",
      });
    }
  }
  async fetchMedReq() {
    try {
      const { data } = await cornieClient().get(`/api/v1/medication-requests/`);
      this.medReq = data;
    } catch (error) {
      window.notify({
        msg: "There was an error when fetching medication requests",
        status: "error",
      });
    }
  }

  apply() {
    this.$emit("update", this.selectedRef, this.type);
    this.show = false;
  }

  async created() {
    this.loadMappers();
    // await this.fetchAllergys(this.$route?.params?.id as string);
    // await this.fetchPatientConditions(this.activepatientId);
    await this.fetchPractitioners();
    await this.fetchObservations();
    await this.fetchCarePlan();
    await this.fetchMedReq();
    await this.fetchDevices();
  }
}
</script>
<style scoped>
.custom-checkbox {
  position: absolute;
}

.custom-checkbox-input {
  display: none;
}

.custom-checkbox-text {
  padding: 1rem;
  background-color: #aaa;
  color: #555;
  cursor: pointer;
  user-select: none;
}

.custom-checkbox-input:checked ~ .custom-checkbox-text {
  background-color: red;
  color: white;
}

.dflex {
  display: -webkit-box;
}
.hide {
  display: none;
}
/* Large checkboxes */

input[type="checkbox"] {
  height: 22px;
  width: 22px;
}

input[type="checkbox"]:before {
  width: 24px;
  border: hidden;
  height: 20px;
}

input[type="checkbox"]:after {
  top: -20px;
  width: 22px;
  height: 22px;
}

input[type="checkbox"]:checked:after {
  background-image: url("../../../../../assets/tick.svg");
  background-color: #fe4d3c;
}
input[type="checkbox"]:after {
  position: relative;
  display: block;
  left: 0px;
  content: "";
  background: white;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 3px;
  text-align: center;
  border: 1px solid #fe4d3c;
}
</style>
