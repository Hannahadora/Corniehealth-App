<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
          <cornie-icon-btn @click="show = false">
            <arrow-left-icon />
          </cornie-icon-btn>
          <h2 class="font-bold text-lg text-primary ml-3 -mt-2">{{allaction}} Detected issues</h2>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
                    <cornie-input label="IDENTIFIER" class="mb-5 w-full" />
                    <main-cornie-select
                    class="w-full"
                    :items="clinicalStatus"
                    v-model="status"
                    label="STATUS"
                    >
                    </main-cornie-select>
                    <main-cornie-select
                    class="w-full"
                    :items="clinicalCode"
                    v-model="code"
                    label="CODE"
                    >
                    </main-cornie-select>
                    <cornie-input label="Patient" class="mb-5 w-full"  v-model="onSet.onsetAge" />
          <accordion-component class="shadow-none rounded-none border-none  text-primary" title="Identified" v-model="openedS">
                <timeable-picker />
                <div class="w-full mt-5 pb-5">
                    <main-cornie-select
                    class="w-full"
                    :items="clinicalSeverity"
                    v-model="severity"
                    label="clinical severity"
                    >
                    </main-cornie-select>
                    <main-cornie-select
                    class="required w-full"
                      :rules="required"
                      :items="['Allergy','Intolerance']"
                      v-model="type"
                      label="type"
                      placeholder="Select"
                    >
                    </main-cornie-select>
                  </div>
          </accordion-component>
          <accordion-component class="shadow-none rounded-none border-none  text-primary" title="Evidence" v-model="openedS">
                <div class="w-full mt-5 pb-5">
                <main-cornie-select
                    class="required w-full"
                      :rules="required"
                      :items="clinicalCode"
                      v-model="code"
                      label="code"
                      placeholder="Select"
                    >
                    </main-cornie-select>
                      <div>
                        <label for="ecounter" class="flex uppercase mb-1 text-black text-xs font-bold">Detail</label>
                          <div class="my-2  w-full">
                                <Textarea
                                class="w-full text-xs"
                                v-model="detail"
                                placeholder="Text Area"
                                :rules="required"
                              />
                          </div>
                      </div>
                      <main-cornie-select
                    class="required w-full"
                      :rules="required"
                      :items="['Allergy','Intolerance']"
                      v-model="type"
                      label="item"
                      placeholder="Select"
                    >
                    </main-cornie-select>
                  </div>
          </accordion-component>
          <accordion-component class="shadow-none rounded-none  border-none  text-primary" title="Mitigation" v-model="openedS">
                <div class="w-full mt-5 pb-5">
                    <cornie-select
                      class="required w-full mb-2"
                      :rules="required"
                      :items="clinicalAction"
                      label="substance"
                      v-model="action"
                    >
                    </cornie-select>
                    <!-- <div> -->
                          <div class="w-full mt-5">
                              <date-time-picker
                                
                                
                                label="Date/Time"
                                width="w-full"
                              />
                          </div>
                      <!-- </div> -->
                    <cornie-select
                    class="w-full mb-2"
                      :items="clinicalItems"
                      label="manifestation"
                      v-model="item"
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
// import DatePicker from "@/components/datepicker.vue";
import Period from "@/types/IPeriod";
import TimeablePicker from "./timeable.vue";
import DatePicker from "./components/datepicker.vue";
import DateTimePicker from "./date-time-picker.vue";
import { IPatient, Practitioner, Provider } from "@/types/IPatient";
import { IOrganization } from "@/types/IOrganization";
import IAllergy ,{ OnSet,Reaction } from "@/types/IAllergy";
 import IPractitioner from "@/types/IPractitioner";
// import DateTimePicker from './components/datetime-picker.vue'
import {
  clinicalStatus,
  clinicalSeverity,
  clinicalCode,
  clinicalAction,
  clinicalItems
} from "./drop-downs";
import { namespace } from 'vuex-class'

const allergy = namespace('allergy')
const organization = namespace("organization");

const emptyOnSet: OnSet = {
          onsetDateTime: "",
          onsetAge: "",
          onsetPeriod: {} as Period,
          onsetRange: [20,50],
          onsetString: "",
          recordedDate: "",
        recorder: "",
         asserter: "",
          lastOccurence: "",
           note: ""
};

// const emptyReaction: Reaction = {
//           substance: "",
//           manifestation: "",
//           description: "",
//           onset: "",
//           // severity: "",
//           exposureRoute: "",
//         note: "",
// };

@Options({
  name: "issuesDialog",
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
    TimeablePicker,
    SearchIcon,
    AccordionComponent,
    IconInput,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieRadio,
    CornieBtn,
    MainCornieSelect
  },
})
export default class Medication extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: '' })
  id!: string

  @allergy.Action
  getAllergyById!: (id: string) => IAllergy

  @Prop({ type: Array,  default: () => [] })
  available!: object;


  @organization.State
  organizationInfo!: IOrganization;

  @organization.Action
  fetchOrgInfo!: () => Promise<void>;


 @allergy.State
  practitioners!: any[];


  @allergy.Action
  getPractitioners!: () => Promise<void>;

@Watch('id')
  idChanged() {
    // this.setAllergy()
  }

practitioner!: IPractitioner;
 clinicalStatus=clinicalStatus;
  clinicalSeverity=clinicalSeverity;
  clinicalCode=clinicalCode;
  clinicalAction=clinicalAction;
  clinicalItems=clinicalItems;
asserterName = "";
type = "";
criticality="";
code = "";
date="";
author="";
// severity:"";
status="";
patient="";
// identifiedDate:"";
// identifiedPeriod:"";
// authur:"";
// implicated:"";
action="";
// detail:"";
// item:"";
   

// onSet={...emptyOnSet};
// reaction={...emptyReaction};
switchshow = false;
// value=  [20, 40];
//  data: any = {
//     days: [],
//   }
// get format() {
//         return `${this.onSet.onsetRange}`
//   }

loading=  false;
notes='';
availableFilter= false;
profileFilter=false;


 get activePatientId() {
      const id = this.$route?.params?.id as string;
      return id;
  }

  async  apply() {
    //   this.$emit("update:preferred",  [...this.medications]);
     this.loading = true
    if (this.id) await this.updateAllergy()
    else await this.createAllergy()
    this.loading = false
    }
//   async setAllergy() {
//     const allergy = await this.getAllergyById(this.id)
//     if (!allergy) return
//     this.clinicalStatus = allergy.clinicalStatus
//     this.verificationStatus = allergy.verificationStatus
//     this.type = allergy.type
//      this.category = allergy.category
//     this.criticality = allergy.criticality
//     this.code = allergy.code
//     this.onSet = allergy.onSet
//     this.reaction = allergy.reaction

  
//   }
  get payload() {
  
    return {
        
 status: this.status,
  code: this.code,
  // severity: this.severity,
  patient: this.patient,
  Identified: {
  //  identifiedDate: this.identifiedDate,
    // identifiedPeriod: this.identifiedPeriod,
    // authur: this.authur,
    // implicated: this.implicated,
  },
  evidence: {
    code: this.code,
    // detail: this.detail,
    // item: this.item
  },
  mitigation: {
    action: this.action,
    date: this.date,
    author:this.author
  },
    //   patientId: this.activePatientId,
    //   clinicalStatus: this.clinicalStatus,
    //   verificationStatus: this.verificationStatus,
    //   type: this.type,
    //   category: this.category,
    //   criticality: this.criticality,
    //   code: this.code,
    //   onSet: this.onSet,
    //    reaction: this.reaction,
    }
  }
 get allaction() {
    return this.id ? 'Edit' : 'New'
  }

 get newaction() {
    return this.id ? 'Update' : 'Save'
  }
   async selected() {
     const orgId = this.organizationInfo.id;
    this.getPractitionerName(orgId);
  }
  getPractitionerName(id: string){
   const pt = this.practitioners.find((i: any) => i.organizationId === id);
  //  this.onSet.asserter = pt.id
    // this.onSet.recorder =  `${pt.firstName} ${pt.lastName}`;
    this.asserterName =  `${pt.firstName} ${pt.lastName}`;
    return pt ? `${pt.firstName} ${pt.lastName}` : '';
  }
   done() {
    this.$emit("allergy-added");
    this.show = false;
  }

 async createAllergy() {
  //  this.payload.onSet.recordedDate = new Date(this.payload.onSet.recordedDate).toISOString();
    // this.payload.onSet.onsetDateTime = new Date(this.data.onsetDate).toISOString();
    // this.payload.onSet.onsetPeriod.start = new Date(this.data.startDate).toISOString();
    //  this.payload.onSet.onsetPeriod.end = new Date(this.data.endDate).toISOString();
    //   this.payload.onSet.lastOccurence = new Date(this.data.occurenceDate).toISOString();
    //  this.payload.reaction.onset = new Date(this.data.reactionDate).toISOString();

    try {
      const response = await cornieClient().post('/api/v1/allergy', this.payload)
      if (response.success) {
        window.notify({ msg: 'Allergy created', status: 'success' })
        this.done();
        // this.show = false;
      }
    } catch (error) {
      console.log(error)
      window.notify({ msg: error.message, status: 'error' })
      // this.$router.push("/dashboard/provider/experience/appointments");
    }
  }

  async updateAllergy() {
    const url = `/api/v1/allergy/${this.id}`
    const payload = {
       ...this.payload,
      }
    try {
      const response = await cornieClient().put(url, payload)
      if (response.success) {
        window.notify({ msg: 'Allergy updated', status: 'success' })
        this.$router.push('/dashboard/provider/clinical/allergy')
          this.show = false;
      }
    } catch (error) {
      window.notify({ msg: 'Allergy not updated', status: 'error' })
    }
  }
  created() {
    //   this.setAllergy();
      this.getPractitioners();
      if (!this.organizationInfo) this.fetchOrgInfo();
  }
}
</script>

<style>


</style>
