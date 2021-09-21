<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
          <h2 class="font-bold text-lg text-primary ml-3 -mt-2">{{allaction}} Allergy</h2>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
       <accordion-component class="shadow-none rounded-none border-none  text-primary" title="Basic Info" v-model="openedS">
               <div class="w-full mt-5 pb-5">
                  <cornie-select
                  class="w-full"
                  :items="['code']"
                  v-model="clinicalStatus"
                  label="clinical status"
                  >
                  </cornie-select>
                  <cornie-select
                   class="w-full"
                    :items="['reason']"
                    label="verification status"
                    v-model="verificationStatus"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="required w-full"
                    :rules="required"
                    :items="['Continuous','Acute','Seasonal']"
                    v-model="type"
                    label="type"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="required w-full"
                    :rules="required"
                    :items="['reason']"
                    v-model="category"
                    label="category"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                   <cornie-select
                   class="required w-full"
                    :rules="required"
                    :items="['reason']"
                    label="criticality"
                    v-model="criticality"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                   <cornie-select
                   class="required w-full"
                    :rules="required"
                    :items="['code']"
                    label="code"
                    v-model="code"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                <div>
                    <label for="ecounter" class="flex uppercase mb-1 text-xs font-bold">encounter
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
                    </div>
                </div>
                </div>
        </accordion-component>
        <accordion-component class="shadow-none rounded-none border-none  text-primary" title="OnSet" v-model="openedS">
              <div class="w-full mt-5 pb-5">
                 <div class="w-full mb-2">
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
                  <cornie-input label="onset age" class="mb-2 w-full"  v-model="onSet.onsetAge" />
                  <div class="mb-2">
                    <span class="uppercase text-danger mt-4 font-bold text-xs">onset Period</span>
                    <div class="w-full">
                        <div class="w-full mt-3">
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
                        <div class="w-full mt-3">
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
                    <div class="mb-2">
                       <span class="uppercase font-bold text-xs mb-2">onset range</span>
                       <div class="flex p-3 space-x-2 mt-4 justify-between w-full">
                         <div class="float-left w-full pr-5">
                           <div>
                              <p class="relative top-4 right-4">0</p><Slider v-model="value"  :format="format" showTooltip="drag"/><p class="float-right relative bottom-4 -mr-7">100</p>
                           </div>
                         </div>
                        <div class="border-2 text-xs h-10 p-2 w-16 mt-1 float-right rounded border-danger">
                            {{format}}
                        </div>
                       </div>
                    </div>
                   <cornie-input label="onset string" class="mb-2 w-full"   v-model="onSet.onsetString" />
                   <div>
                      <label for="ecounter" class="flex uppercase mb-1 text-xs font-bold">recorded date
                        <span class="ml-2"> <info-icon class="text-primary fill-current" /></span>
                    </label>
                      <date-picker  placeholder="autofill" v-model="onSet.recordedDate" class="w-full mb-5 required"
                      :rules="required">
                      </date-picker>
                   </div>
                   <div class="mb-3">
                      <label for="ecounter" class="flex uppercase mb-1 text-xs font-bold">recorder
                        <span class="ml-2"> <info-icon class="text-primary fill-current" /></span>
                      </label>
                      <cornie-input class="w-full"  v-model="onSet.recorder" /> 
                   </div>
                    <div class="flex">
                        <p class="lbl mt-2 flex uppercase mb-1 text-xs font-bold">add asserter</p>
                        <label class="switch">
                          <input
                            name="category"
                            type="checkbox"
                            v-model="switchshow"
                            value="2"
                          />
                          <span class="slider round"></span>
                        </label>
                    </div>
                    <div class="mb-3">
                       <label for="ecounter" class="flex uppercase mb-1 text-xs font-bold">asserter
                        <span class="ml-2"> <info-icon class="text-primary fill-current" /></span>
                      </label>
                      <cornie-input class="mb-2 w-full" />
                    </div>
                     <div class="mb-3">
                       <label for="ecounter" class="flex uppercase mb-1 text-xs font-bold">last occurence
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
                    <div>
                       <label for="ecounter" class="flex uppercase mb-1 text-xs font-bold">Note</label>
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
              <div class="w-full mt-5 pb-5">
                  <cornie-select
                    class="required w-full mb-2"
                    :rules="required"
                    :items="['reason']"
                    label="substance"
                    v-model="reaction.substance"
                  >
                  </cornie-select>
                  <cornie-select
                   class="w-full mb-2"
                    :items="['reason']"
                    label="manifestation"
                    v-model="reaction.manifestation"
                  >
                  </cornie-select>
                  <cornie-input label="description" class="mb-2 w-full"   v-model="reaction.description" />
                   <div class="mb-3">
                       <label for="ecounter" class="flex uppercase mb-1 text-xs font-bold">ONSET
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
                    <label for="SEVERITY" class="flex uppercase mb-1 text-xs font-bold">SEVERITY
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
                      :items="['reason']"
                      label="Exposure Route"
                      v-model="reaction.exposureRoute"
                    >
                    </cornie-select>
                     <div>
                       <label for="ecounter" class="flex uppercase mb-1 text-xs font-bold">Note</label>
                        <div class="my-2  w-full">
                              <Textarea
                              class="w-full text-xs"
                              v-model="reaction.note"
                              placeholder="Text Area"
                              :rules="required"
                            />
                        </div>
                    </div>
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
import CornieSelect from "@/components/cornieselect.vue";
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
import DatePicker from "@/components/CornieDatePicker.vue";
import Period from "@/types/IPeriod";
import { duration } from 'moment';
import IAllergy ,{ OnSet,Reaction } from "@/types/IAllergy";
 import Slider from '@vueform/slider'
import '@vueform/slider/themes/default.css';
import DateTimePicker from './components/datetime-picker.vue'
import { namespace } from 'vuex-class'

const allergy = namespace('allergy')


const emptyOnSet: OnSet = {
          onsetDateTime: "",
          onsetAge: "",
          onsetPeriod: {} as Period,
          onsetRange: "20",
          onsetString: "",
          recordedDate: "",
        recorder: "",
         asserter: "87e846a3-bac0-43b9-a4db-0b2605426c42",
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
    Slider
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

 @Prop({ type: String, default: '' })
  taskId!: string;

 @Prop({ type: String, default: '' })
  requesId!: string;


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
        return `${this.value}`
  }

loading=  false;
notes='';
availableFilter= false;
profileFilter=false;

  async  apply() {
    //   this.$emit("update:preferred",  [...this.medications]);
     this.loading = true
    if (this.id) await this.updateAllergy()
    else await this.createAllergy()
    this.loading = false
      //  window.notify({ msg: "Medication Added", status: "success" });
      // this.show = false;
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
    return this.id ? 'New' : 'Edit'
  }

 get newaction() {
    return this.id ? 'Save' : 'Update'
  }

 async createAllergy() {
    this.payload.onSet.onsetDateTime = new Date(this.data.onsetDate).toISOString();
    this.payload.onSet.onsetPeriod.start = new Date(this.data.startDate).toISOString();
     this.payload.onSet.onsetPeriod.end = new Date(this.data.endDate).toISOString();
      this.payload.onSet.lastOccurence = new Date(this.data.occurenceDate).toISOString();
     this.payload.reaction.onset = new Date(this.data.reactionDate).toISOString();
     this.payload.onSet.recordedDate = new Date(this.payload.onSet.recordedDate).toISOString();

    try {
      const response = await cornieClient().post('/api/v1/allergy', this.payload)
      if (response.success) {
        window.notify({ msg: 'Allergy created', status: 'success' })
        this.$router.push('/dashboard/provider/clinical/allergy')
        this.show = false;
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
