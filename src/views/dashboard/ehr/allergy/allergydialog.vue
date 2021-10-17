<template>
          <big-dialog
          v-model="show"
          :title="allaction + ' '+ 'Allergy' " 
          class=""
          >
        <v-form ref="form">
          <accordion-component class="shadow-none rounded-none border-none  text-primary" title="Basic Info" v-model="openedS">
                <div class="grid grid-cols-2 gap-4 w-full mt-5 pb-5">
                    <main-cornie-select
                    class="w-full"
                    :items="['Active','Inactive','Resolved']"
                    v-model="clinicalStatus"
                    label="clinical status"
                    >
                    </main-cornie-select>
                    <cornie-select
                    class="w-full"
                      :items="['Unconfirmed','Presumed','Confirmed','Refuted','Entered in Error']"
                      label="verification status"
                      v-model="verificationStatus"
                      placeholder="Select"
                    >
                    </cornie-select>
                    <main-cornie-select
                    class="required w-full"
                      :rules="required"
                      :items="['Allergy','Intolerance']"
                      v-model="type"
                      label="type"
                      placeholder="Select"
                    >
                    </main-cornie-select>
                    <cornie-select
                    class="required w-full"
                      :rules="required"
                      :items="['Food','Medication','Environment','Biologic',]"
                      v-model="category"
                      label="category"
                    placeholder="Select"
                    >
                    </cornie-select>
                    <cornie-select
                    class="required w-full"
                      :rules="required"
                      :items="['Low Risk','High Risk','Unable to Assess Risk',]"
                      label="criticality"
                      v-model="criticality"
                    placeholder="Select"
                    >
                    </cornie-select>
                    <cornie-select
                    class="required w-full"
                      :rules="required"
                      :items="['Hemoglobin Okaloosa','Ornithine racemase','Ferrocyanide salt','Berberine','Heptachlor','Coumachlor','Hemoglobin Nagoya','Nitrilase','	Free protein S','Guanosine']"
                      label="code"
                      v-model="code"
                    placeholder="Select"
                    >
                    </cornie-select>
                  <div>
                     <encounter-select
                      class="w-full"
                        v-model="encounter"
                      :rules="required"
                      label="Reference Encounter"
                    />
                      <!-- <label for="ecounter" class="flex uppercase mb-1 text-black text-xs font-bold">encounter
                        <span class="ml-2"> <info-icon class="text-primary fill-current" /></span>
                      </label>
                        <div class="w-full flex space-x-4 mb-3">
                        <cornie-radio
                          v-bind:value="'Days'"
                          label="xxxxxx"
                          class="text-xs"
                          name="request"
                          id="pickup"
                          v-model="encounter"
                        />
                        <cornie-radio
                          v-bind:value="'Week'"
                          label="xxxxxx"
                          name="request"
                          id="patientadress"
                          checked
                          v-model="encounter"
                        />
                        <cornie-radio
                          v-bind:value="'Month'"
                          label="xxxxxx"
                          name="request"
                          id="homeaddress"
                          v-model="encounter"
                        />
                      </div> -->
                  </div>
                  </div>
          </accordion-component>
          <accordion-component class="shadow-none rounded-none border-none  text-primary" title="OnSet" v-model="openedS">
                <div class="w-full mt-5 pb-5">
                    <div class="grid grid-cols-2 gap-4 ">
                      <div class="w-full mb-5">
                        <DateTimePicker :label="'Onset date/time'" class="z-10 w-full">
                                    <template v-slot:labelicon>
                                      <question-icon />
                                    </template>
                                    <template #date>
                                      <span>
                                        <span>
                                          {{
                                            new Date(
                                              data.onsetDate ?? Date.now(),
                                            ).toLocaleDateString()
                                          }}
                                        </span>
                                      </span>
                                    </template>
                                    <template #time>
                                      <span>
                                        <span>{{ data.onsetTime }}</span>
                                      </span>
                                    </template>
                                    <template #input>
                                      <v-date-picker
                                        v-model="data.onsetDate"
                                        style="
                                          position: relative;
                                          z-index: 9000;
                                          width: 100%;
                                        "
                                      ></v-date-picker>
                                      <label class="block uppercase my-1 text-xs font-bold">
                                        Time
                                      </label>
                                      <input
                                        v-model="data.onsetTime"
                                        type="time"
                                        class="w-full border rounded-md p-2"
                                      />
                                    </template>
                                  </DateTimePicker>
                      </div>
                      <cornie-input label="onset age" class="mb-5 w-full"  v-model="onSet.onsetAge" />
                    </div>

                    <div class="mb-5">
                      <span class="uppercase text-danger mt-4 font-bold text-xs">onset Period</span>
                      <div class="grid grid-cols-2 gap-4 w-full">
                          <div class="w-full mt-5">
                              <DateTimePicker :label="'start DATE & Time'" class="z-10 w-full">
                                  <template v-slot:labelicon>
                                    <question-icon />
                                  </template>
                                  <template #date>
                                    <span>
                                      <span>
                                        {{
                                          new Date(
                                            data.startDate ?? Date.now(),
                                          ).toLocaleDateString()
                                        }}
                                      </span>
                                    </span>
                                  </template>
                                  <template #time>
                                    <span>
                                      <span>{{ data.startTime }}</span>
                                    </span>
                                  </template>
                                  <template #input>
                                    <v-date-picker
                                      v-model="data.startDate"
                                      style="
                                        position: relative;
                                        z-index: 9000;
                                        width: 100%;
                                      "
                                    ></v-date-picker>
                                    <label class="block uppercase my-1 text-xs font-bold">
                                      Time
                                    </label>
                                    <input
                                      v-model="data.startTime"
                                      type="time"
                                      class="w-full border rounded-md p-2"
                                    />
                                  </template>
                                </DateTimePicker>
                          </div>
                          <div class="w-full mt-5">
                              <DateTimePicker :label="'end DATE & Time'" class="w-full">
                                <template v-slot:labelicon>
                                  <question-icon />
                                </template>
                                <template #date>
                                  <span>
                                    {{
                                      new Date(
                                        data.endDate ?? Date.now(),
                                      ).toLocaleDateString()
                                    }}
                                  </span>
                                </template>
                                <template #time>
                                  <span>{{ data.endTime }}</span>
                                </template>
                                <template #input>
                                  <v-date-picker
                                    name="eeee"
                                    v-model="data.endDate"
                                    style="z-index: 9000; width: 100%;"
                                  ></v-date-picker>
                                  <label class="block uppercase my-1 text-xs font-bold">
                                    Time
                                  </label>
                                  <input
                                    v-model="data.endTime"
                                    type="time"
                                    class="w-full border rounded-md p-2"
                                  />
                                </template>
                              </DateTimePicker>
                          </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                         <cornie-input label="onset range (1st value)" class="w-full mb-4"  v-model="onSet.onsetRange[' ']" placeholder="Enter" />
                         <cornie-input label="onset range (2nd value)" class="w-full mb-4"  v-model="onSet.onsetRange[' ']" placeholder="Enter" />
                    </div>
                      <div class="grid grid-cols-2 gap-4">
                        <cornie-input label="onset string" class="mb-5 w-full"   v-model="onSet.onsetString" />
                        <div class="mb-5">
                            <label for="ecounter" class="flex uppercase text-black text-xs font-bold">recorded date
                              <span class="ml-2"> <info-icon class="text-primary fill-current" /></span>
                          </label>
                            <date-picker  placeholder="autofill" v-model="onSet.recordedDate" class="w-full mb-5 required"
                            :rules="required">
                            </date-picker>
                        </div>
                        <div class="mb-3">
                            <label for="ecounter" class="flex uppercase text-black mb-1 text-xs font-bold">recorder
                              <span class="ml-2"> <info-icon class="text-primary fill-current" /></span>
                            </label>
                            <!-- <cornie-input class="w-full"  v-model="onSet.recorder" disabled/>  -->
                            
                            <input
                            class="appearance-none w-full border border-gray-100 bg-gray-100 px-3 py-3 rounded-md placeholder-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            disabled
                            :value="onSet.recorder"
                          />
                        </div>

                       </div>
  
                        <div class="flex">
                            <p class="lbl mt-2 flex uppercase text-black mb-1 text-xs font-bold">add asserter</p>
                            <label class="switch">
                              <input
                                name="category"
                                type="checkbox"
                                @input="selected"
                                v-model="switchshow"
                                value="2"
                              />
                              <span class="slider round"></span>
                            </label>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                        <div class="mb-3">
                          <label for="ecounter" class="flex uppercase mb-1 text-xs text-black font-bold">asserter
                            <span class="ml-2"> <info-icon class="text-primary fill-current" /></span>
                          </label>
                          <!-- <cornie-input class="mb-2 w-full" v-model="asserterName" disabled/> -->
                          <input
                          class="appearance-none w-full border border-gray-100 bg-gray-100 px-3 py-3 rounded-md placeholder-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          disabled
                          :value="asserterName"
                        />
                        </div>
                        <div class="mb-3">
                          <label for="ecounter" class="flex uppercase text-black mb-1 text-xs font-bold">last occurence
                            <span class="ml-2"> <info-icon class="text-primary fill-current" /></span>
                          </label>
                          <DateTimePicker class="w-full">
                                  <template v-slot:labelicon>
                                    <question-icon />
                                  </template>
                                  <template #date>
                                    <span>
                                      {{
                                        new Date(
                                          data.occurenceDate ?? Date.now(),
                                        ).toLocaleDateString()
                                      }}
                                    </span>
                                  </template>
                                  <template #time>
                                    <span>{{ data.occurenceTime }}</span>
                                  </template>
                                  <template #input>
                                    <v-date-picker
                                      name="eeee"
                                      v-model="data.occurenceDate"
                                      style="z-index: 9000; width: 100%;"
                                    ></v-date-picker>
                                    <label class="block uppercase my-1 text-xs font-bold">
                                      Time
                                    </label>
                                    <input
                                      v-model="data.occurenceTime"
                                      type="time"
                                      class="w-full border rounded-md p-2"
                                    />
                                  </template>
                                </DateTimePicker>
                        </div>
  </div>
                   
                      <div>
                        <label for="ecounter" class="flex uppercase mb-1 text-black text-xs font-bold">Note</label>
                          <div class="my-2  w-full">
                                <Textarea
                                class="w-full text-xs"
                                v-model="onSet.note"
                                placeholder="Text Area"
                                :rules="required"
                              />
                          </div>
                      </div>
                  </div>
          </accordion-component>
          <accordion-component class="shadow-none rounded-none  border-none  text-primary" title="Reaction" v-model="openedS">
                <div class="grid grid-cols-2 gap-4 w-full mt-5 pb-5">
                
                    <cornie-select
                      class="required w-full mb-2"
                      :rules="required"
                      :items="['Hemoglobin Okaloosa','	Ferrocyanide salt','Berberine','Blood group antigen IH','Heptachlor','Coumachlor','	Codeine phosphate','Arsenic-76','Enzyme variant','Fibrinogen San Juan','Acylcarnitine hydrolase','Immunoglobulin pentamer','Carminic acid','Vegetable textile fiber','Nitrilase','Free protein S','Guanosine','Hemoglobin Jianghua','	2-oxoglutarate synthase','Oil of calamus','	Coal tar extract','Lytic antibody','Urethan','Carbamate kinase']"
                      label="substance"
                      v-model="reaction.substance"
                    >
                    </cornie-select>
                    <cornie-select
                    class="w-full mb-2"
                      :items="['Clinical finding','Anxiety disorder of childhood OR adolescence','Choroidal hemorrhage','Spontaneous abortion with laceration of cervix','Homoiothermia','Decreased hair growth','Chronic pharyngitis','Normal peripheral vision','Superficial foreign body of scrotum without major open wound but with infection','Abnormal bladder continence','	Gonococcal meningitis','Severe manic bipolar I disorder without psychotic features','	Accident-prone']"
                      label="manifestation"
                      v-model="reaction.manifestation"
                    >
                    </cornie-select>
                    <cornie-input label="description" class="mb-5 w-full"   v-model="reaction.description" />
                    <div class="mb-5">
                        <label for="ecounter" class="flex uppercase mb-1 text-xs text-black font-bold">ONSET
                          <span class="ml-2"> <info-icon class="text-primary fill-current" /></span>
                        </label>
                        <DateTimePicker class="w-full">
                                <template v-slot:labelicon>
                                  <question-icon />
                                </template>
                                <template #date>
                                  <span>
                                    {{
                                      new Date(
                                        data.reactionDate ?? Date.now(),
                                      ).toLocaleDateString()
                                    }}
                                  </span>
                                </template>
                                <template #time>
                                  <span>{{ data.reactionTime }}</span>
                                </template>
                                <template #input>
                                  <v-date-picker
                                    name="eeee"
                                    v-model="data.reactionDate"
                                    style="z-index: 9000; width: 100%;"
                                  ></v-date-picker>
                                  <label class="block uppercase my-1 text-xs font-bold">
                                    Time
                                  </label>
                                  <input
                                    v-model="data.reactionTime"
                                    type="time"
                                    class="w-full border rounded-md p-2"
                                  />
                                </template>
                              </DateTimePicker>
                      </div>
                    <div class="mb-2">
                      <label for="SEVERITY" class="flex uppercase text-black mb-1 text-xs font-bold">SEVERITY
                        <span class="ml-2"> <info-icon class="text-primary fill-current" /></span>
                      </label>
                        <div class="w-full mb-3">
                        <cornie-radio
                          v-bind:value="'Mid'"
                          label="Mid"
                          class="text-xs"
                          name="request"
                          id="pickup"
                          v-model="reaction.severity"
                        />
                        <cornie-radio
                          v-bind:value="'Medium'"
                          label="Medium"
                          name="request"
                          id="patientadress"
                          checked
                          v-model="reaction.severity"
                        />
                        <cornie-radio
                          v-bind:value="'Severe'"
                          label="Severe"
                          name="request"
                          id="homeaddress"
                          v-model="reaction.severity"
                        />
                      </div>
                    </div>
                      <cornie-select
                        class="required w-full mb-2"
                        :rules="required"
                        :items="['Route of administration values','Topical route','Otic route','Intra-articular route','Per vagina','Oral route','Subcutaneous route','Per rectum','Intraluminal route','Sublingual route','Intraperitoneal route','Transdermal route','Nasal route','Intravenous route','Buccal route','Ophthalmic route','Intra-arterial route','Intramedullary route','Intrauterine route','Intrathecal route','Intramuscular route','Urethral route','Gastrostomy route','Jejunostomy route','Nasogastric route','Dental use','Endocervical use','Endosinusial use','Endotracheopulmonary use','Extra-amniotic use','Gastroenteral use','Gingival use','Intraamniotic use','Intrabursal use','Intracardiac use','Intracavernous use','Intracervical route','Intracoronary use','Intradermal use']"
                        label="Exposure Route"
                        v-model="reaction.exposureRoute"
                      >
                      </cornie-select>
                  </div>
                      <div>
                        <label for="ecounter" class="flex text-black uppercase mb-1 text-xs font-bold">Note</label>
                          <div class="my-2  w-full">
                                <Textarea
                                class="w-full text-xs"
                                v-model="reaction.note"
                                placeholder="Text Area"
                                :rules="required"
                              />
                          </div>
                      </div>
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
import InfoIcon from '@/components/icons/info.vue';
import BigDialog from "@/components/bigdialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import MainCornieSelect from "@/components/cornieselect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import NoteIcon from "@/components/icons/graynote.vue";
import { cornieClient } from "@/plugins/http";
import DEdit from "@/components/icons/aedit.vue";
import RangeSlider from "@/components/range.vue";
import EncounterSelect from "./encounter-select.vue";
import CDelete from "@/components/icons/adelete.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import DatePicker from "@/components/datepicker.vue";
import Period from "@/types/IPeriod";
import { IPatient, Practitioner, Provider } from "@/types/IPatient";
import { IOrganization } from "@/types/IOrganization";
import IAllergy ,{ OnSet,Reaction } from "@/types/IAllergy";
 import IPractitioner from "@/types/IPractitioner";
import DateTimePicker from './components/datetime-picker.vue'
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

const emptyReaction: Reaction = {
          substance: "",
          manifestation: "",
          description: "",
          onset: "",
          severity: "",
          exposureRoute: "",
        note: "",
};

@Options({
  name: "allergyDialog",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    ArrowLeftIcon,
    DatePicker,
    RangeSlider,
    DEdit,
    BigDialog,
    CDelete,
    EncounterSelect,
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
    MainCornieSelect
  },
})
export default class Medication extends Vue {
    @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

   @Prop({ type: String, default: '' })
  id!: string


  @PropSync("modelValue")
  show!: boolean;

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
    this.setAllergy()
  }

practitioner!: IPractitioner;
asserterName = "";
clinicalStatus= "";
verificationStatus = "";
type = "";
category="";
criticality="";
code = "";
onSet={...emptyOnSet};
reaction={...emptyReaction};
switchshow = false;
value=  [20, 40];
 data: any = {
    days: [],
  }
get format() {
        return `${this.onSet.onsetRange}`
  }

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
  async setAllergy() {
    const allergy = await this.getAllergyById(this.id)
    if (!allergy) return
    this.clinicalStatus = allergy.clinicalStatus
    this.verificationStatus = allergy.verificationStatus
    this.type = allergy.type
     this.category = allergy.category
    this.criticality = allergy.criticality
    this.code = allergy.code
    this.onSet = allergy.onSet
    this.reaction = allergy.reaction

  
  }
  get payload() {
    return {
      patientId: this.activePatientId,
      clinicalStatus: this.clinicalStatus,
      verificationStatus: this.verificationStatus,
      type: this.type,
      category: this.category,
      criticality: this.criticality,
      code: this.code,
      onSet: this.onSet,
       reaction: this.reaction,
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
   this.onSet.asserter = pt.id
    this.onSet.recorder =  `${pt.firstName} ${pt.lastName}`;
    this.asserterName =  `${pt.firstName} ${pt.lastName}`;
    return pt ? `${pt.firstName} ${pt.lastName}` : '';
  }
   done() {
    this.$emit("allergy-added");
    this.show = false;
  }

 async createAllergy() {
   this.payload.onSet.recordedDate = new Date(this.payload.onSet.recordedDate).toISOString();
    this.payload.onSet.onsetDateTime = new Date(this.data.onsetDate).toISOString();
    this.payload.onSet.onsetPeriod.start = new Date(this.data.startDate).toISOString();
     this.payload.onSet.onsetPeriod.end = new Date(this.data.endDate).toISOString();
      this.payload.onSet.lastOccurence = new Date(this.data.occurenceDate).toISOString();
     this.payload.reaction.onset = new Date(this.data.reactionDate).toISOString();

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
      this.setAllergy();
      this.getPractitioners();
      if (!this.organizationInfo) this.fetchOrgInfo();
  }
}
</script>

<style>


</style>
