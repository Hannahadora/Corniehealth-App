<template>
  <big-dialog
    v-model="show"
    :title="newaction + ' '+ 'History' " 
    subtext="All Fields are required"
    class=""
  >
    <v-form ref="form">
      <accordion-component
        class="shadow-none rounded-none border-none text-primary"
        title="Basic Info"
        :opened="true"
      >
        <div class="grid grid-cols-2 gap-3 mt-3">
          <cornie-select
          class="w-full"
            v-model="instantiatesCanonical"
            label="Instantiates Canonical"
            :items="['Plan Definition','Questionaire','Activity Definition','Measure','Operation Definition']"
            :rules="required"
          />
          <cornie-select
            class="w-full"
            v-model="instantiatesUri"
            label="Instantiates Uri"
            :items="['https://techsolutions.net//']"
            :rules="required"
          />
          <auto-complete
            v-model="status"
            :rules="required"
            class="w-full"
            :items="['Partial','Completed','Entered in Error','Health Unknown']"
            label="Status"
          />
          <cornie-select
            v-model="dataAbsentReason"
            class="w-full"
            label="Data Absent Reason"
            :rules="required"
            :items="['Subject Unknown','Information Withheld','Unable To Obtain','Deferred']"
          />
        <cornie-input disabled  :rules="required" label="Patient" v-model="asinglename"  class="w-full" />
           <date-picker
            :rules="required"
            v-model="date"
            label="Date"
            width="w-full"
          />
           <!-- <cornie-input  :rules="required"  label="Relationship" v-model="relationship"  class="w-full" /> -->
          <auto-complete
           v-model="relationship"
           class="w-full"
            :rules="required"
            :items="['family member','Child','Adopted child','Adopted daughter','Adopted son','Daughter']"
            label="Relationship"
          />
          <auto-complete
            v-model="sex"
            class="w-full"
            :rules="required"
            :items="['Male','Female','Other','Unknown	']"
            label="Sex"
          />
        </div>
      </accordion-component>
      <accordion-component
        class="shadow-none rounded-none border-none text-primary"
        title="Born"
          >
       
          <timeable-picker v-model="bornTimeable" class="w-full" label="heading" />
        <div class="grid grid-cols-2 gap-3 mt-4">
          <cornie-input  :rules="required"  label="Born String" v-model="bornString"   />
        </div>
      </accordion-component>
       <accordion-component
        class="shadow-none rounded-none border-none text-primary"
        title="Age"
      >
       <div class="grid grid-cols-2 mt-5 gap-2">
            <cornie-input   :rules="required" label="Age" placeholder="--Enter--" v-model="oneage"  class="cursor-pointer w-full" />
              <cornie-select
              class="w-full"
                v-model="estimatedAge"
                label="Estimated Age?"
                :items="[10,90,80]"
                :rules="required"
              />
          </div>
           <measurable label="Age Range/String" v-model="agemesurable" />
      </accordion-component>
       <accordion-component
        class="shadow-none rounded-none border-none text-primary"
        title="Deceased"
        >
          
          <div class="grid grid-cols-2 mt-5 gap-2">
              <cornie-select
                v-model="diseasedBoolean"
                label="Deceased?"
                :items="[true, false]"
                :rules="required"
              />
          </div>
          <timeable-picker v-model="deceasedtimeable" class="w-full" label="Deceased Date/Age" />
           <measurable v-model="deceasedmeasurable" class="w-full" label="Deceased Range/String" />
           <div class="grid grid-cols-2 gap-4">
                <auto-complete
              v-model="reasonCode"
              class="w-full"
              :rules="required"
              :items="['Anxiety disorder of childhood OR adolescence','Choroidal hemorrhage','Spontaneous abortion with laceration of cervix','	Homoiothermia','	Decreased hair growth','	Chronic pharyngitis','Normal peripheral vision']"
              label="Reason Code"
            />
              <!-- <div class="" v-if="refItems.length > 0" >
                <label for="assessor"  @click="showRef" class="cursor-pointer flex capitalize text-black text-sm font-bold">Reason Reference
                </label>
                <cornie-select
                class="w-full"
                :items="refItems"
                v-model="reasonReference"
                       :rules="required"
                >
                </cornie-select>
              </div> -->
               
              <div class="w-full cursor-pointer"  @click="showRef">
                <label class="flex normal-case mb-0  text-black text-sm font-bold">Reason Reference</label>
                    <input-desc-rounded     :info="''" class="cursor-pointer">
                          <input type="text"  disabled  :value="reasonReference" placeholder="Select" class="cursor-pointer p-2 border w-100 w-full" style="border-radius: 8px">
                          <span>
                           <plus-icon class="aadd text-danger fill-current"/>

                          </span>
                  </input-desc-rounded>
                        
                 <!-- <cornie-input   :rules="required" label="Reason Reference"  :value="reasonReference" v-model="reasonReference"  class="cursor-pointer w-full" />  -->
              </div>
           </div>
            <cornie-text-area
          :rules="required"
          v-model="note"
          placeholder="Placeholder"
          label="Notes"
          class="w-full"
          rows="4"
        />
      </accordion-component>
       <accordion-component
        class="shadow-none rounded-none border-none text-primary"
        title="Condition (Related Person)"
        >
          <div class="grid grid-cols-2 gap-2 mt-5">
              <cornie-select
              class="w-full"
                v-model="code"
                label="Code"
                :items="['Anxiety disorder of childhood OR adolescence', 'Choroidal hemorrhage','Accident-prone','Injury of ascending right colon without open wound into abdominal cavity','Poisoning by sawfly larvae']"
                :rules="required"
              />
               <cornie-select
                v-model="outcome"
                label="Outcome"
                class="w-full"
                :items="['Anxiety disorder of childhood OR adolescence', 'Spontaneous abortion with laceration of cervix','Spontaneous abortion with laceration of cervix','	Homoiothermia','	Decreased hair growth','	Chronic pharyngitis','Normal peripheral vision']"
                :rules="required"
              />
               <cornie-select
                v-model="contributedToDeath"
                class="w-full"
                label="Contributed to Death?"
                :items="['true', 'false']"
                :rules="required"
              />
          </div>
         
      </accordion-component>
       <accordion-component
        class="shadow-none rounded-none border-none text-primary"
        title="Onset"
      >
        <timeable-picker v-model="onsettimeable" label="Start Date & Time" />
           <measurable v-model="onsetmesurable" label="Heading"/>

              <cornie-text-area
                :rules="required"
                v-model="onsetnote"
                placeholder="Placeholder"
                label="Notes"
                class="w-full"
                rows="4"
              />
     
      </accordion-component>
   
    </v-form>
    <template #actions>
      <cornie-btn
        @click="show = false"
        class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
      >
        Cancel
      </cornie-btn>
      <cornie-btn  :loading="loading"
            @click="apply" class="text-white bg-danger px-3 rounded-xl">
       Save
      </cornie-btn>
    </template>
  </big-dialog>
      <reference-modal
          :conditions="conditions"
          :allergy="allergy"
          @show:modal="showRef"
          v-model:visible="showRefModal"
        />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import BigDialog from "@/components/bigdialog.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieNumInput from "@/components/cornienuminput.vue";
import CornieTextArea from "@/components/textarea.vue";
import DatePicker from "./datepicker.vue";
import Measurable from "@/components/measurable.vue";
import ReferenceModal from "./reasonref.vue";
import plusIcon from "@/components/icons/plus.vue";
 import { IPatient } from "@/types/IPatient";
import AutoComplete from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import TimeablePicker from "@/components/timeable.vue";
import { namespace } from "vuex-class";
import { string } from "yup";
import { cornieClient } from "@/plugins/http";
import Ihistory,{BasicInfo, OnSet, Age, ConditionRelatedPerson, Born} from "@/types/Ihistory";

const history = namespace("history");
const patients = namespace("patients");


const timeable = {
    age: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  date: "",
  time: "",
};

const measurable = {
  unit: "",
  min: 0,
  max: 0,
  string: "",
};
@Options({
  name: "AddMedicalHistory",
  components: {
    BigDialog,
    TimeablePicker,
    CornieNumInput,
    CornieBtn,
    AutoComplete,
    DatePicker,
    Measurable,
    plusIcon,
    AccordionComponent,
    ReferenceModal,
    CornieSelect,
    CornieInput,
    CornieTextArea,
  },
})
export default class AddCondition extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

   @Prop({ type: String, default: '' })
  id!: string


  @PropSync("modelValue")
  show!: boolean;

  @patients.State
  patients!: IPatient[];

    @patients.Action
  fetchPatients!: () => Promise<void>;  

 @history.Action
  gethistoryById!: (id: string) => Ihistory;

  required = string().required();
@Watch('id')
  idChanged() {
    this.setHistory()
  }

  historymodel = {} as Ihistory;

showRefModal = false;
condtions = [];
allergy =[];
refItems=[];
loading= false;

  instantiatesCanonical = "";
  instantiatesUri = "";
  status = "";
  dataAbsentReason = "";
  date = "";
   name = "";
  relationship = "";
  sex = "";



  // startAndEndDateTimeStart = "";
  // startAndEndDateTimeEnd = "";
  // bornDateTime = "";
  bornTimeable = { ...timeable };
  bornString = "";
  

   agemesurable = { ...measurable };
   oneage= 0;
   estimatedAge=0;


deceasedtimeable = {...timeable};
deceasedmeasurable = {...measurable};

    diseasedBoolean = false;
    deceasedAge = 0;
    deceasedRangeMin = "";
     deceasedRangeMax = "";
    deceasedDate = "";
    deceasedString = "";
    reasonCode = "";
    reasonReference = "";
    note = "";
    condition = "condition";
    code = "";
    outcome = "";
    contributedToDeath = "";
  
  onsettimeable =  {...timeable};
  onsetmesurable={...measurable};
    onsetAge = "";
    onsetstartAndEndDateTimeStart =  "";
    onsetstartAndEndDateTimeEnd =  "";
    onsetRangeMin = "";
    onsetRangeMax = "";
    onsetnote = "";
    onsetString = "";




  get patientId() {
    return this.$route.params.patientId;
  }
  get asinglename(){
    return this.PatientName.firstname +' '+ this.PatientName.lastname;
  }
    get PatientName() {
         var id = this.$route.params.patientId;
        const pt = this.patients.find((i: any) => i.id === id);
        return {
            ...pt
        }
    }

  get onset() {
    return {
    onsetPeriodAge: this.onsettimeable.age,
    startAndEndDateTime: { start: this.onsettimeable.startDate, end: this.onsettimeable.endDate },
    onsetRangeString: this.onsetmesurable.string,
    unitOfMesurement: this.onsetmesurable.unit,
    onsetRangeMin: this.onsetmesurable.min,
    onsetRangeMax: this.onsetmesurable.max,
    };
  }

   get born() {
    return {
    //bornDateTimePeriod: { start: this.bornTimeable.startDate, end: this.bornTimeable.endDate },
     bornDateTimePeriod: this.bornTimeable.startDate,
    bornDateTime: this.bornTimeable.date,
    bornString: this.bornString,
    };
  }


  get conditionRelatedPerson() {
    return {
    code: this.code,
    outcome: this.outcome,
    contributedToDeath: this.contributedToDeath,
    };
  }
  get basicInfo() {
    return {
    patientId: this.patientId,
    instantiatesCanonical: this.instantiatesCanonical,
    instantiatesUri: this.instantiatesUri,
    status: this.status,
    dataAbsentReason: this.dataAbsentReason,
    date: this.date,
    relationship: this.relationship,
    sex: this.sex,
    };
  }
 
  get age() {
    return {
    age: this.oneage,
    ageRangeString: this.agemesurable.string,
    unitOfMesurement: this.agemesurable.unit,
    ageRangeMin:this.agemesurable.min,
    ageRangeMax: this.agemesurable.max,
    estimatedAge: this.estimatedAge,
    };
  }


  get deceased() {
    return {
    deceased: this.diseasedBoolean,
    deceasedDateAge: this.deceasedtimeable.age,
    deceasedDate: this.deceasedtimeable.date,
    deceasedRangeString: this.deceasedmeasurable.string,
    unitOfMesurement: this.deceasedmeasurable.unit,
    deceasedRangeMin: this.deceasedmeasurable.min,
    deceasedRangeMax: this.deceasedmeasurable.max,
    reasonCode: this.reasonCode,
  reasonReference: this.reasonReference,
  notes: this.note, 


    };
  }
  async setNewHistoryModel() {
     this.historymodel = JSON.parse(JSON.stringify(this.payload));
  }

  async setHistory() {
    const history = await this.gethistoryById(this.id)
    if (!history) return
    this.historymodel =  (history);

      this.onsettimeable.age = history.onset.onsetPeriodAge
      this.onsettimeable.startDate  = history.onset.startAndEndDateTime.start as string
     this.onsettimeable.endDate  = history.onset.startAndEndDateTime.end as string
     this.onsetmesurable.string = history.onset.onsetRangeString
    this.onsetmesurable.unit = history.onset.unitOfMesurement
     this.onsetmesurable.min  = history.onset.onsetRangeMin
     this.onsetmesurable.max = history.onset.onsetRangeMax
    this.diseasedBoolean = history.deceased.deceased
      this.deceasedtimeable.age = history.deceased.deceasedDateAge
     this.deceasedtimeable.date = history.deceased.deceasedDate
     this.deceasedmeasurable.string = history.deceased.deceasedRangeString
      this.deceasedmeasurable.unit = history.deceased.unitOfMesurement
    this.deceasedmeasurable.min = history.deceased.deceasedRangeMin
     this.deceasedmeasurable.max = history.deceased.deceasedRangeMax
     this.reasonCode = history.deceased.reasonCode
 this.reasonReference = history.deceased.reasonReference
  this.note = history.deceased.note
     this.oneage = history.age.age
    this.agemesurable.string = history.age.ageRangeString as string
     this.agemesurable.unit = history.age.unitOfMesurement
    this.agemesurable.min = history.age.ageRangeMin
     this.agemesurable.max = history.age.ageRangeMax
     this.estimatedAge = history.age.estimatedAge
     this.instantiatesCanonical = history.basicInfo.instantiatesCanonical
     this.instantiatesUri = history.basicInfo.instantiatesUri
    this.status = history.basicInfo.status
   this.dataAbsentReason = history.basicInfo.dataAbsentReason
     this.date = history.basicInfo.date
     this.relationship = history.basicInfo.relationship
     this.sex = history.basicInfo.sex
       this.code = history.conditionRelatedPerson.code
     this.outcome = history.conditionRelatedPerson.outcome
     this.contributedToDeath = history.conditionRelatedPerson.contributedToDeath
     this.bornTimeable.startDate = history.born.bornDateTimePeriod
     this.bornTimeable.date = history.born.bornDateTime
     this.bornString = history.born.bornString
    
  }
 
  get payload() {
    return {
      patientId: this.patientId,
      basicInfo: this.basicInfo,
      conditionRelatedPerson: this.conditionRelatedPerson,
      born: this.born,
      age: this.age,
      deceased: this.deceased,
      onset: this.onset,
    };
  }
 get newaction() {
    return this.id ? 'Update' : 'New'
  }
async showRef(value:any){
  this.showRefModal = true;
  this.reasonReference = value;
}
  done() {
    this.$emit("history-added");
    this.show = false;
  }
  async  apply() {
     this.loading = true
    if (this.id) await this.updatehistory()
    else await this.createhistory()
    this.loading = false
    }
  async createhistory() {
     try {
      const response = await cornieClient().post('/api/v1/family-history', this.payload)
      if (response.success) {
        window.notify({ msg: 'Medical family history created', status: 'success' })
        this.done();
      }
    } catch (error) {
      console.log(error)
      window.notify({ msg: 'Medical family history not created', status: 'error' })
    
    }
  }
  async updatehistory(){
    const url = `/api/v1/family-history/${this.id}`
    const payload = {
       ...this.payload,
      }
    try {
      const response = await cornieClient().put(url, payload)
      if (response.success) {
        window.notify({ msg: 'Medical history  updated', status: 'success' })
      this.done();

      }
    } catch (error) {
      window.notify({ msg: 'Medical history not updated', status: 'error' })
    }
  }
  async fetchAllergy() {
    const AllAllergy = cornieClient().get(`/api/v1/allergy/findAllByPatient/${this.patientId}`);
    const response = await Promise.all([AllAllergy]);
    this.allergy = response[0].data;
  }

 async created() {
   this.setHistory();
   this.fetchAllergy();
  }
}
</script>
<style scoped>

.aadd{
      float: right;
    position: relative;
    bottom: 30px;
    margin-right: 10px;
}
</style>
