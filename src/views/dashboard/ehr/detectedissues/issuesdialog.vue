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
                    <cornie-input label="IDENTIFIER"  v-model="issuesModel.identifier" class="mb-5 w-full" />
                    <main-cornie-select
                    class="w-full"
                    :items="clinicalStatus"
                    v-model="issuesModel.status"
                    label="STATUS"
                    >
                    </main-cornie-select>
                    <main-cornie-select
                    class="w-full"
                    :items="clinicalCode"
                    v-model="issuesModel.code"
                    label="CODE"
                    >
                    </main-cornie-select>
                     <main-cornie-select
                    class="w-full"
                    :items="clinicalSeverity"
                    v-model="issuesModel.severity"
                    label="SEVERITY"
                    >
                    </main-cornie-select>
          <accordion-component class="shadow-none rounded-none border-none  text-primary" title="Identified" v-model="openedS">
                 <div class="grid grid-cols-2 gap-4 w-full mt-5 pb-5">
                          <div class="w-full mt-5">
                              <date-time-picker
                                v-model:date="data.date"
                                v-model:time="data.dateTime"
                                label="Date/Time"
                                width="full"
                              />
                            
                          </div>
                          <div class="w-full mt-5">
                              <date-time-picker
                                v-model:date="data.startDate"
                                v-model:time="data.startTime"
                                label="Date/Time"
                                width="full"
                              />
                            
                          </div>
                      </div>
                <div class="w-full mt-5 pb-5">
                    <main-cornie-select
                    class="w-full"
                    :items="clinicalAuthur"
                    v-model="issuesModel.identified.authur"
                    label="implicated"
                    >
                    </main-cornie-select>
                    <main-cornie-select
                    class="required w-full"
                      :rules="required"
                      :items="clinicalImplicated"
                      v-model="issuesModel.identified.implicated"
                      label="authur"
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
                      v-model="issuesModel.evidence.code"
                      label="code"
                      placeholder="Select"
                    >
                    </main-cornie-select>
                      <div>
                        <label for="ecounter" class="flex uppercase mb-1 text-black text-xs font-bold">Detail</label>
                          <div class="my-2  w-full">
                                <Textarea
                                class="w-full text-xs"
                                v-model="issuesModel.evidence.detail"
                                placeholder="Text Area"
                                :rules="required"
                              />
                          </div>
                      </div>
                      <main-cornie-select
                    class="required w-full"
                      :rules="required"
                      :items="clinicalItems"
                       v-model="issuesModel.evidence.item"
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
                      v-model="issuesModel.mitigation.action"
                    >
                    </cornie-select>
                    <!-- <div> -->
                          <div class="w-full mt-5">
                              <date-time-picker
                               v-model:date="data.endDate"
                                v-model:time="data.endTime"
                                label="Date/Time"
                                width="w-full"
                              />
                          </div>
                      <!-- </div> -->
                    <practioner-select
                    class="w-full mb-2"
                      
                      label="Author"
                       v-model="issuesModel.mitigation.author"
                    >
                    </practioner-select>
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
import PractionerSelect from "@/components/practitioner-select.vue";
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
import DateTimePicker from './components/datetime-picker.vue'
// import DateTimePicker from "./date-time-picker.vue";
import { IPatient, Practitioner, Provider } from "@/types/IPatient";
import { IOrganization } from "@/types/IOrganization";
import IIssues, {Identified} from "@/types/IIssues";
import IAllergy ,{ OnSet,Reaction } from "@/types/IAllergy";
 import IPractitioner from "@/types/IPractitioner";
// import DateTimePicker from './components/datetime-picker.vue'
import {
  clinicalStatus,
  clinicalSeverity,
  clinicalCode,
  clinicalAction,
  clinicalItems,
  clinicalAuthur,
  clinicalImplicated
} from "./drop-downs";
import { namespace } from 'vuex-class'

const issues = namespace('issues')
const organization = namespace("organization");


const patients = namespace("patients");
const emptyIssues: IIssues = {
  status:  "",
  code: "",
  severity:"",
  patient: "",
  identified : {
     identifiedDate : "",
      identifiedPeriod : {} as Period,
      authur : "",
      implicated :  "",
  },  
  evidence : {
    code: "",
    detail: "",
    item: "",
  },
  mitigation : {
     action: "",
        date : "2021-10-14T14:42:16.549Z",
    author: "",
  },


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
    MainCornieSelect,
    PractionerSelect
  },
})
export default class DetectedIssue extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: '' })
  id!: string

  @Prop()
  issue: any

  @issues.Action
  getIssuesById!: (id: string) => IIssues

  @Prop({ type: Array,  default: () => [] })
  available!: object;

  @patients.State
  patients!: IPatient[];

  @organization.State
  organizationInfo!: IOrganization;

  @organization.Action
  fetchOrgInfo!: () => Promise<void>;


 @issues.State
  practitioners!: any[];


  @issues.Action
  getPractitioners!: () => Promise<void>;
  
  issuesModel = emptyIssues as IIssues;

@Watch('id')
  idChanged() {
    this.setIssues()
  }

 data: any = {
    date:"",
    dateTime:"",
    startDate:"",
    startTime:"",
    endDate:"",
    endTime:""
  }
practitioner!: IPractitioner;
 clinicalStatus=clinicalStatus;
  clinicalSeverity=clinicalSeverity;
  clinicalCode=clinicalCode;
  clinicalAction=clinicalAction;
  clinicalItems=clinicalItems;
  clinicalAuthur=clinicalAuthur;
  clinicalImplicated=clinicalImplicated;

 async setDetectedIssue() {
     this.issuesModel = JSON.parse(JSON.stringify({ ...emptyIssues}));
  }
   
// get format() {
//         return `${this.onSet.onsetRange}`
//   }

loading=  false;
availableFilter= false;
profileFilter=false;
// openS=true;

 get activePatientId() {
      const id = this.$route?.params?.id as string;
      return id;
  }
 

  async  apply() {
    //   this.$emit("update:preferred",  [...this.medications]);
     this.loading = true
    if (this.id) await this.updateIssues()
     await this.createIssues()
    this.loading = false
    }

     async setIssues() {
    const issues = await this.getIssuesById(this.id)
    // console.log(this.id);
    // if (!issues) return
    // this.issuesModel =  (issues) ;
  }
//   
buildPeriod(
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string
  ) {
    const start = this.buildDateTime(this.data.startDate, this.data.startTime);
    const end = this.buildDateTime(this.data.endDate, this.data.endTime);
    return { start, end };
  }
  buildDateTime(dateString: string, time: string) {
    const date = new Date(dateString);
    const [hour, minute] = time.split(":");
    date.setMinutes(Number(minute));
    date.setHours(Number(hour));
    return date.toISOString();
  }
  get payload() {
    return {
      // patientId: this.activePatientId,
      status: this.issuesModel.status,
      code: this.issuesModel.code,
      patient:this.activePatientId,
      severity: this.issuesModel.severity,
      identified: this.issuesModel.identified,
      evidence: this.issuesModel.evidence,
      mitigation: this.issuesModel.mitigation,
    }
  }

 get allaction() {
    return this.id ? 'Edit' : 'New'
  }

 get newaction() {
    return this.id ? 'Update' : 'Save'
  }
  //  async selected() {
  //    const orgId = this.organizationInfo.id;
  //   this.getPractitionerName(orgId);
  // }
  // getPractitionerName(id: string){
  //  const pt = this.practitioners.find((i: any) => i.organizationId === id);
  // //  this.onSet.asserter = pt.id
  //   // this.onSet.recorder =  `${pt.firstName} ${pt.lastName}`;
  //   this.asserterName =  `${pt.firstName} ${pt.lastName}`;
  //   return pt ? `${pt.firstName} ${pt.lastName}` : '';
  // }
   done() {
    this.$emit("-added");
    this.show = false;
  }
 
 async createIssues() {
 
      this.payload.identified.identifiedDate = this.data.date;
     this.payload.identified.identifiedPeriod.start = this.data.startDate;
        this.payload.identified.identifiedPeriod.end = this.data.endDate;
    try {
      const response = await cornieClient().post('/api/v1/detected-issue', this.payload)
      if (response.success) {
        window.notify({ msg: 'Detected issue Created', status: 'success' })
        this.done();
      }
    } catch (error) {
      console.log(error)
      window.notify({ msg: 'Detected issue not Created', status: 'error' })
    
    }
  }

async updateIssues() {
    const url = `/api/v1/detected-issue/${this.id}`
    try {
      const response = await cornieClient().put(url, this.payload)
      if (response.success) {
        window.notify({ msg: 'Detected Issues  updated', status: 'success' })
      this.done();

      }
    } catch (error) {
      window.notify({ msg: 'Detected Issues not  updated', status: 'error' })
    }
  }
  created() {
      this.setIssues();
      this.getPractitioners();
      if (!this.organizationInfo) this.fetchOrgInfo();
      this.setDetectedIssue();
  }
}
</script>

<style>


</style>
