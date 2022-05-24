<template>
  <cornie-dialog v-model="show" right class="w-8/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <span
          class="pr-2 flex items-center cursor, Templates-pointer border-r-2"
        >
          <cornie-icon-btn @click="show = false">
            <arrow-left-icon />
          </cornie-icon-btn>
        </span>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
           View Allergy
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
           <div class="grid grid-cols-3 gap-4 w-full mt-5">
               <div>
                   <p class="text-gray-400 italic text-sm">Allergy Intolerance ID</p>
                   <span class="text-sm">XXXXXX</span>
               </div>
                <div>
                   <p class="text-gray-400 italic text-sm">Clinical Status</p>
                   <span class="text-sm">XXXXXX</span>
               </div>
                <div>
                   <p class="text-gray-400 italic text-sm">Verification Status</p>
                   <span class="text-sm">XXXXXX</span>
               </div>
                <div>
                   <p class="text-gray-400 italic text-sm">Encounter</p>
                   <span class="mb-0 text-sm">XXXXXX</span>
                   <p class="text-xs">24/02/2929</p>
               </div>
                 <div>
                   <p class="text-gray-400 italic text-sm">Asserter</p>
                   <div class="flex space-x-4">
                       <avatar />
                        <div>
                            <span class="mb-0 text-sm">Dr George Smith</span>
                            <p class="text-xs">Cardiology</p>
                        </div>
                   </div>
               </div>

           </div> 
          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="Basic Info" :opened="true">
              <template v-slot:default>
                <div class="mt-5 grid grid-cols-2 gap-4 w-full">
                  <cornie-input
                    label="type"
                    placeholder="Autoloaded"
                    :disabled="true"
                  />
                   <cornie-input
                    label="Category"
                    placeholder="Autoloaded"
                    :disabled="true"
                  />
                   <cornie-input
                    label="Criticality"
                    placeholder="Autoloaded"
                    :disabled="true"
                  />
                   <cornie-input
                    label="Code"
                    placeholder="Autoloaded"
                    :disabled="true"
                  />
                 
                </div>
              </template>
            </accordion-component>
          </div>

               <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="Recorded" :opened="true">
              <template v-slot:default>
                <div class="mt-8 grid grid-cols-2 gap-4 w-full">
                  <div class="">
                    <date-time-picker :label="'Date/Time'" :disabled="true" />
                  </div>
                  <cornie-input
                    label="Recorder"
                    class="-mt-5 w-full"
                    placeholder="Autoloaded"
                    :disabled="true"
                  >
                    <template #labelicon>
                      <custom-checkbox
                        :label="'Assert this record'"
                        class="w-full"
                        :disabled="true"
                      />
                    </template>
                  </cornie-input>
                  <div class="">
                    <date-time-picker :disabled="true" :label="'Last Occurence'" />
                  </div>
                  <cornie-input
                    label="Note"
                    class="mb-5 w-full"
                    placeholder="Autoloaded"
                    :disabled="true"
                  >
                  </cornie-input>
                </div>
              </template>
            </accordion-component>
          </div>

          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="Onset" :opened="true">
              <template v-slot:default>
                <div>
                  <onset-picker v-model="onsetmesurable" :disabled="true" label="Onset" />
                </div>
              </template>
            </accordion-component>
          </div>

          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="Reaction" :opened="true">
              <template v-slot:default>
                <div class="mt-5 grid grid-cols-2 gap-4 w-full">
                   <cornie-input
                    label="Substance"
                    placeholder="Autoloaded"
                    :disabled="true"
                  />
                   <cornie-input
                    label="Manifestation"
                    placeholder="Autoloaded"
                    :disabled="true"
                  />
                   <cornie-input
                    label="Description"
                    placeholder="Autoloaded"
                    :disabled="true"
                  />

                   <div class="-mt-5">
                    <date-time-picker :label="'Onset'" :disabled="true"/>
                  </div>
                   <cornie-input
                    label="Severity"
                    placeholder="Autoloaded"
                    :disabled="true"
                  />
                   <cornie-input
                    label="Exposure Route"
                    placeholder="Autoloaded"
                    :disabled="true"
                  />
                  <cornie-input
                    label="Note"
                    class="mb-5 w-full"
                    placeholder="Autoloaded"
                    :disabled="true"
                  >
                  </cornie-input>
                </div>
              </template>
            </accordion-component>
          </div>
        </v-form>
      </cornie-card-text>

      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <span
            v-if="!id"
            class="text-sm font-bold text-danger float-left flex justify-start w-full cursor-pointer"
            @click="SaveDraftGrn"
          >
            Save as draft
          </span>
          <span
            v-else
            class="text-sm font-bold text-danger float-left flex justify-start w-full cursor-pointer"
            @click="completeDraft"
          >
            Complete draft
          </span>

          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            v-if="!id"
            :loading="loading"
            @click="submit"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
          <cornie-btn
            v-else
            :loading="loading"
            @click="submit"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Update
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import { string, date } from "yup";
import search from "@/plugins/search";

import IPractitioner from "@/types/IPractitioner";

import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from "@/components/icons/info.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import NoteIcon from "@/components/icons/graynote.vue";
import DEdit from "@/components/icons/aedit.vue";
import DatePicker from "@/components/datepicker.vue";
import CDelete from "@/components/icons/adelete.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import FhirInput from "@/components/fhir-input.vue";
import DateTimePicker from "@/components/date-time-picker.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import Avatar from "@/components/avatar.vue";

import OnsetPicker from "./onset.vue";

const timeable = {
  age: null,
  startDate: null,
  startTime: null,
  endDate: null,
  endTime: null,
  date: null,
  time: null,
};

const measurable = {
  age: null,
  ageUnit: null,
  ageValue: null,
  day: null,
  unit: null,
  min: null,
  minUnit: null,
  minValue: null,
  max: null,
  maxUnit: null,
  maxValue: null,
  string: null,
  startDate: null,
  startTime: null,
  endDate: null,
};

@Options({
  name: "AlergyModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    ArrowLeftIcon,
    DatePicker,
    DEdit,
    CDelete,
    CancelIcon,
    Avatar,
    InfoIcon,
    CornieDialog,
    SearchIcon,
    AccordionComponent,
    IconInput,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieRadio,
    CornieBtn,
    CornieTable,
    OnsetPicker,
    FhirInput,
    DateTimePicker,
    CustomCheckbox,
  },
})
export default class AlergyModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  loading = false;
  required = string().required();
  emailRule = string().email().required();
  requiredRule = string().required();
  query = "";

  onsetmesurable = { ...measurable };

  @Watch("id")
  idChanged() {
    this.setRequest();
  }

  async setRequest() {}

  get payload() {
    return {};
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.updateRequest();
    else await this.createRequest();
    this.loading = false;
  }

  async SaveDraftGrn() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;

    try {
      const response = await cornieClient().post(
        "/api/v1/inventory/material-request/draft",
        this.payload
      );
      if (response.success) {
        window.notify({
          msg: "Material request draft saved",
          status: "success",
        });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }

  async createRequest() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;

    try {
      const response = await cornieClient().post(
        "/api/v1/inventory/material-request",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Material Requests Saved", status: "success" });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }
  async updateRequest() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;
    const id = this.id;
    const url = `/api/v1/inventory/material-request/draft/${id}`;
    const payload = this.payload;
    try {
      const response = await cornieClient().put(url, this.payload);
      if (response.success) {
        window.notify({
          msg: "Material Request Updated",
          status: "success",
        });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }
  async completeDraft() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;
    const id = this.id;
    const url = `/api/v1/inventory/material-request/draft/complete/${id}`;
    const payload = this.payload;
    try {
      const response = await cornieClient().put(url, this.payload);
      if (response.success) {
        window.notify({
          msg: "Material Request draft completed",
          status: "success",
        });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }

  done() {
    this.show = false;
    this.$emit("requestAdded");
  }

  async created() {}
}
</script>

<style></style>
