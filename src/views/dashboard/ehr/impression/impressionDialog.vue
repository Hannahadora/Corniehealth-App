<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
          <cornie-icon-btn @click="show = false">
            <arrow-left-icon />
          </cornie-icon-btn>
          <h2 class="font-bold text-lg text-primary ml-3 -mt-2">{{newaction}} Impression</h2>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
          <accordion-component class="shadow-none rounded-none border-none  text-primary" title="Basic Info" v-model="openedS">
                <div>
                    <label for="ecounter" class="flex uppercase mb-1 text-black text-xs font-bold">status
                            <span class="ml-2"> <info-icon class="text-primary fill-current" /></span>
                    </label>
                    <div class="w-full flex space-x-4 mb-3">
                            <cornie-radio label="Mid"  class="text-xs" name="request" id="pickup" v-model="status" @update:modelValue="changeChecked('Mid')"/>
                            <cornie-radio label="Medium"  name="request" id="patientadress" checked v-model="status" @update:modelValue="changeChecked('Medium')"/>
                            <cornie-radio label="Severe"  name="request" id="homeaddress" v-model="status" @update:modelValue="changeChecked('Severe')"/>
                    </div>
                </div>
                <div class="w-full mt-5 pb-5">
                     <cornie-input label="Status Reason" class="mb-5 w-full"  v-model="statusReason" />
                    <main-cornie-select
                    class="w-full"
                    :items="['Active','Inactive','Resolved']"
                    v-model="code"
                    label="Code"
                    >
                    </main-cornie-select>
                    <cornie-input label="Description" class="mb-5 w-full"  v-model="description" />
                    <cornie-select
                    class="w-full"
                      :items="['Unconfirmed','Presumed','Confirmed','Refuted','Entered in Error']"
                      label="REFERENCE ENCOUNTER"
                      v-model="encounter"
                      placeholder="Select"
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
            {{newaction}}
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
import CornieRadio from '@/components/cornieradio.vue'
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from '@/components/icons/info.vue'
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import MainCornieSelect from "@/components/cornieselect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import NoteIcon from "@/components/icons/graynote.vue";
import { cornieClient } from "@/plugins/http";
import DEdit from "@/components/icons/aedit.vue";
import RangeSlider from "@/components/range.vue";
import CDelete from "@/components/icons/adelete.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import DatePicker from "./components/datepicker.vue";
import Period from "@/types/IPeriod";
import IImpression from "@/types/IImpression";
 import Slider from '@vueform/slider';
import '@vueform/slider/themes/default.css';
import DateTimePicker from './components/datetime-picker.vue'
import { namespace } from 'vuex-class'

const impression = namespace('impression')


@Options({
  name: "impressionDialog",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    ArrowLeftIcon,
    DatePicker,
    RangeSlider,
    DEdit,
    CDelete,
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
    Slider,
    MainCornieSelect
  },
})
export default class Medication extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: '' })
  id!: string

  @impression.Action
  getImpressionById!: (id: string) => IImpression

  @Prop({ type: Array,  default: () => [] })
  available!: object;


@Watch('id')
  idChanged() {
    this.setImpression()
  }

status=  "";
statusReason = "";
code = "";
description = "";
encounter = "";
effective=  {};
investigation = {};
findings = {};

loading=  false;


  async  apply() {
     this.loading = true
    if (this.id) await this.updateImpression()
    else await this.createImpression()
    this.loading = false
    }
  async setImpression() {
    const impression = await this.getImpressionById(this.id)
    if (!impression) return
    this.status = impression.status
    this.code = impression.code
    this.statusReason = impression.statusReason
    this.description = impression.description
    this.encounter = impression.encounter
    this.effective = impression.effective
    this.investigation = impression.investigation
    this.findings = impression.findings
  }
  get payload() {
    return {
      status: this.status,
      code: this.code,
      statusReason: this.statusReason,
      description: this.description,
      encounter: this.encounter,
      effective: this.effective,
      investigation: this.investigation,
      findings: this.findings,
    }
  }

 get newaction() {
    return this.id ? 'Update' : 'New'
  }

   done() {
    this.$emit("impression-added");
    this.show = false;
  }

  changeChecked(value:string){
      if(value == 'Mid'){
          this.status = value
      }else if(value == 'Medium'){
          this.status = value;
      }else{
          this.status = value;
      }
  }

 async createImpression() {
 
    try {
      const response = await cornieClient().post('/api/v1/clinical_impressions', this.payload)
      if (response.success) {
        window.notify({ msg: 'Clinical Impression Created', status: 'success' })
        this.done();
      }
    } catch (error) {
      console.log(error)
      window.notify({ msg: error.data.response.message, status: 'error' })
    
    }
  }

  async updateImpression() {
    const url = `/api/v1/clinical_impressions/${this.id}`
    const payload = {
       ...this.payload,
      }
    try {
      const response = await cornieClient().put(url, payload)
      if (response.success) {
        window.notify({ msg: 'Clincial Impression  updated', status: 'success' })
      this.done();

      }
    } catch (error) {
      window.notify({ msg: error.data.response.message, status: 'error' })
    }
  }
  created() {
      this.setImpression();
     
  }
}
</script>

<style>

.slider-connect {
    background: #fe4d3c;
    cursor: pointer;
}

.slider-tooltip {
    position: absolute;
    display: block;
    font-size: var(--slider-tooltip-font-size, .875rem);
    line-height: var(--slider-tooltip-line-height, 1.25rem);
    font-weight: var(--slider-tooltip-font-weight, 600);
    white-space: nowrap;
    padding: var(--slider-tooltip-py, 2px) var(--slider-tooltip-px, 6px);
    min-width: var(--slider-tooltip-min-width, 20px);
    text-align: center;
    color: var(--slider-tooltip-color, #fff);
    border-radius: var(--slider-tooltip-radius, 5px);
    border: 1px solid #fe4d3c;
    background: #fe4d3c;
}

</style>
