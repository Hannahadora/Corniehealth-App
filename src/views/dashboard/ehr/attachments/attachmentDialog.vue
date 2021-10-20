<template>
  <cornie-dialog v-model="show" right class="w-8/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title  class="w-full">  
          <div class="w-full">
            <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">{{newaction}}  Attachment</h2>
            <cancel-icon class="float-right cursor-pointer" @click="show = false"/>
          </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
        <div class="grid grid-cols-3 gap-4 mt-3">
            <cornie-input label="TITLE" class="mt-3" placeholder="---Enter---"  />
            </div>
            <label for="ecounter" class="flex uppercase mb-1 text-black text-xs font-bold">Upload</label>
            <div 
             class="dropzone border-2 border-dashed">
              <span>Drag or Drop File</span>
              <span>OR</span>
              <label for="dropzoneFile" class=" font-bold  py-1 px-3 my-1 cursor-pointer">
                    Browse Files
              </label>
              <input
                type="file"
                name="attachment"
                id="dropzoneFile"
                @change="img.onChange"
                hidden
              />
              </div>
              <label for="dropzoneFile" class=" font-bold block bg-danger text-white text-center rounded-full py-1 px-3 my-1 cursor-pointer">
                    Upload
              </label>
            
             <div class=" justify-content-center mt-5">
                        <label for="ecounter" class="flex uppercase mb-1 text-black text-xs font-bold">Comments(optional)</label>
                          <div class="my-2  w-full">
                                <Textarea
                                class="w-full text-xs"
                                placeholder="Placeholder"
                                :rules="required"
                              />
                          </div>
                      </div>
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
           Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
     <assesor-modal
          :practitioners="practitioner"
          :roles="role"
          @update:preferred="showAssessor"
          v-model:visible="showAssessorModal"
        />
       <problem-modal
          :conditions="conditions"
          :allergy="allergy"
          @update:preferred="showProblem"
          v-model:visible="showProblemModal"
        />
         <item-modal
          :observations="observations"
          :questions="questions"
          @update:preferred="showItem"
          v-model:visible="showItemModal"
        />
         <reference-modal
          @update:preferred="showFindings"
          v-model:visible="showFindingModal"
        />
      

        
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, setup, Options } from "vue-class-component";
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
import CancelIcon from "@/components/icons/CloseIcon.vue";
import Period from "@/types/IPeriod";
import IImpression, {Effective} from "@/types/IImpression";
import EncounterSelect from "./encounter-select.vue";
import DateTimePicker from './components/datetime-picker.vue';
import Avatar from "@/components/avatar.vue";
import { useHandleImage } from "@/composables/useHandleImage";
import AssesorModal from './assesor.vue'
import ProblemModal from './problem.vue'
import ItemModal from './itemdailog.vue'
import Dropzone from './dropzone.vue'
import ReferenceModal from './reference.vue'
import { namespace } from 'vuex-class'


const impression = namespace('impression')

const emptyImpression: IImpression = {
  status:  "",
  statusReason : "",
  updatedAt:"",
  code : "",
  description : "",
  subject: "subject",
  encounter : "",
  effective : {
     effectiveDate : "",
      effectivePeriod : {} as Period,
      date : "2021-10-14T14:42:16.549Z",
      assessor : "",
      previous :  "",
      problem : "",
  },  
  investigation : {
    code: "",
    item: "",
    protocol: "protocol",
    summary: "",
  },
  findings : {
     item: "",
    itemReference: "",
    basis: "",
    prognosis: "",
    prognosisReference: "",
    supportingInfo: "",
    note: "",
  },


};

@Options({
  name: "attachmentDialog",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    ArrowLeftIcon,
    DatePicker,
    RangeSlider,
    DEdit,
    AssesorModal,
    ProblemModal,
    CDelete,
    CancelIcon,
    InfoIcon,
    EncounterSelect,
    CornieDialog,
    DateTimePicker,
    SearchIcon,
    AccordionComponent,
    IconInput,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    ItemModal,
    ReferenceModal,
    CornieRadio,
    CornieBtn,
    MainCornieSelect,
    Dropzone
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

  impressionModel = {} as IImpression;

@Watch('id')
  idChanged() {
    this.setImpression()
  }


 data: any = {
    days: [],
  }
assessorItems = [];
conditionItems = [];
problemItems=[];
investigateItems=[];
loading=  false;
active= false;
status=  false;
showAssessorModal = false;
showProblemModal = false;
showItemModal = false;
practitioner= [];
role = [];
condtions = [];
allergy =[];
setType = "";
observations=[];
questions=[];
setFindingType="";
showFindingModal = false;
findingItems = [];


onsetDate = "";
  onsetTime = "";
  onsetAge = "";
  onsetStartDate = "";
  onsetStartTime = "";
  onsetEndDate = "";
  onsetEndTime = "";
  onsetMin = "";
  onsetMax = "";
  onsetString = "";
  dropzoneFile="";

   async setImpressionModel() {
     this.impressionModel = JSON.parse(JSON.stringify({ ...emptyImpression}));
  }

  async toggleActive() {
     this.active = !this.active;
  }
   get activePatientId() {
      const id = this.$route?.params?.id as string;
      return id;
  }

  img = setup(() => useHandleImage());
  async  apply() {
     this.loading = true
    if (this.id) await this.updateImpression()
    else await this.createImpression()
    this.loading = false
    }
  async setImpression() {
    const impression = await this.getImpressionById(this.id)
    if (!impression) return
    this.impressionModel =  (impression) ;
  }
 

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
      patientId: this.activePatientId,
      status: this.impressionModel.status,
      code: this.impressionModel.code,
      subject: this.impressionModel.subject,
      statusReason: this.impressionModel.statusReason,
      description: this.impressionModel.description,
      encounter: this.impressionModel.encounter,
      effective: this.impressionModel.effective,
      investigation: this.impressionModel.investigation,
      findings: this.impressionModel.findings,
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
      if(value == 'Mild'){
          this.impressionModel.status = value
      }else if(value == 'Medium'){
          this.impressionModel.status = value;
      }else{
          this.impressionModel.status = value;
      }
  }

  showAssessor(valueforrole:any){
    this.showAssessorModal = true;
    this.assessorItems = valueforrole 
  }
  showProblem(value:any,type:string){
    this.showProblemModal = true;
    if (type == 'Allergy'){
      this.problemItems = value;
      this.setType = type;
      this.passProblem(this.problemItems);
    }else if (type == 'Condition'){
      this.conditionItems = value;
      this.setType = type;
       this.passProblem(this.conditionItems);
    }

  }
  passProblem(e:any){
    this.impressionModel.effective.problem = e.code
  }

  passRef(e:any){
    this.impressionModel.findings.itemReference = 'Identifier';
  }
 async showItem(value:any){
    this.showItemModal = true;
    this.investigateItems = value;
  }

  showFindings(value:any){
    this.showFindingModal = true;
    this.findingItems = value;
    this.passRef(this.findingItems);
  }
 async createImpression() {
 
      this.payload.effective.effectiveDate = this.data.date;
     this.payload.effective.effectivePeriod.start = this.data.startDate;
        this.payload.effective.effectivePeriod.end = this.data.endDate;
    try {
      const response = await cornieClient().post('/api/v1/clinical-impressions', this.payload)
      if (response.success) {
        window.notify({ msg: 'Clinical Impression Created', status: 'success' })
        this.done();
      }
    } catch (error) {
      console.log(error)
      window.notify({ msg: error, status: 'error' })
    
    }
  }
  async updateImpression() {
    const url = `/api/v1/clinical-impressions/${this.id}`
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
   async fetchPractitioners() {
    const AllPractitioners = cornieClient().get("/api/v1/practitioner");
    const response = await Promise.all([AllPractitioners]);
    this.practitioner = response[0].data;
  }
  async fetchRoles() {
    const AllRoles = cornieClient().get("/api/v1/roles");
    const response = await Promise.all([AllRoles]);
    this.role = response[0].data;
  }
   async fetchCondtions() {
    const AllRoles = cornieClient().get("/api/v1/roles");
    const response = await Promise.all([AllRoles]);
    this.role = response[0].data;
  }

   async fetchAllergy() {
    const AllAllergy = cornieClient().get(`/api/v1/allergy/findAllByPatient/${this.activePatientId}`);
    const response = await Promise.all([AllAllergy]);
    this.allergy = response[0].data;
  }
  created() {
      this.setImpression();
      this.fetchRoles();
      this.fetchPractitioners();
      this.fetchAllergy();
      this.setImpressionModel();
     
  }
}
</script>

<style>
.dropzone{
  width: 800px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  /* border: 2px dashed #41b883; */
  background-color: #fff;
  transition: 0.3s ease all;
}

.active-dropzone{
  color: #fff;
  border-color: #ffff;
  background-color: #41b883;
}
</style>
