<template>
  <cornie-dialog v-model="show" right class="w-3/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-200">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
           Actors
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
            <span class="text-gray-500 text-xs mb-4">{{ firstPractitioner.length }} selected</span>
            <div class="flex space-x-2 w-full mb-7">
                  <cornie-select
                    :items="['Practitioner']"
                    placeholder="--Select--"
                    class="w-40"
                    v-model="actorType"
                />
                <div class="w-60">
                 <span class="mb-2 w-full rounded-full" @click="showDatalist = !showDatalist">
                    <icon-input
                    autocomplete="off"
                    class="border border-gray-600 py-2 -mt-2 rounded focus:outline-none"
                    type="search"
                    placeholder="Search"
                    v-model="query"
                    >
                    <template v-slot:prepend>
                        <search-icon />
                    </template>
                    </icon-input>
                 </span>
                  <div :class="[!showDatalist ? 'hidden' : 'o', filteredItems.length === 0 ? 'h-20' : 'h-auto']" 
                    class="absolute shadow bg-white border-gray-400 border top-100 z-40 left-0 m-3 rounded  overflow-auto mt-2 svelte-5uyqqj" style="width:96%">
                        <div class="flex flex-col w-full p-2">
                            <div v-for="(item, i) in filteredItems"
                                :key="i"
                                @click="selected(item)"
                                class="cursor-pointer w-full border-gray-100 rounded-xl hover:bg-white-cotton-ball">
                                <div  class="w-full text-sm items-center p-2 pl-2 border-transparent border-l-2 relative">
                                    {{ item?.firstName +' '+ item?.lastName   || item }}
                                    <p class="text-xs text-gray-500">[{{ item?.department }}]</p>
                                </div>
                            </div>
                        </div>
                        <div v-if="filteredItems.length === 0">
                             <span class="py-2 px-5 text-sm text-gray-600 text-center flex justify-center">No result found!</span>
                        </div>
                  </div>
                </div>
            </div>
            <div v-if="actorType == 'Practitioner'">
                <div class="w-full flex space-x-7 mt-4" v-for="(item, index) in practitioners" :key="index">  
                    <div class="w-full dflex space-x-4 mb-3">
                        <div class="w-10 h-10">
                            <avatar
                                class="mr-2"
                                v-if="item.image"
                                :src="item.image"
                            />
                            <avatar class="mr-2" v-else  :src="localSrc" />
                        </div>
                        <div class="w-full">
                            <p class="text-xs text-dark font-medium">
                              {{item.firstName}}  {{item.lastName}}
                             
                            </p>
                            <p class="text-xs text-gray-500 font-meduim">
                             {{item.department}}
                        </p>
                        </div>
                    </div>
                    <select-option @click="pushValue(item,item.id)" :value="item.id"/>
                </div>
            </div>
             <div v-if="actorType == 'Patient'">
                <div class="w-full flex space-x-7 mt-4" v-for="(item, index) in patients" :key="index">  
                    <div class="w-full dflex space-x-4 mb-3">
                        <div class="w-10 h-10">
                            <avatar
                                class="mr-2"
                                v-if="item.profilePhoto"
                                :src="item.profilePhoto"
                            />
                            <avatar class="mr-2" v-else  :src="localSrc" />
                        </div>
                        <div class="w-full">
                            <p class="text-xs text-dark font-medium">
                              {{item.firstname}}  {{item.lastname}}
                             
                            </p>
                            <p class="text-xs text-gray-500 font-meduim">
                             {{item.mrn}}
                        </p>
                        </div>
                    </div>
                    <select-option @click="pushPatientValue(item,item.id)"/>
                </div>
            </div>
         
          
       
        </v-form>
      </cornie-card-text>
      
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2  mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
          v-if="actorType == 'Practitioner'"
          :loading="loading"
             @click="submit"
            class="text-white bg-danger px-2 rounded-xl"
           >
            Add
          </cornie-btn>
          <!-- <cornie-btn
          v-if="actorType == 'Patient'"
          :loading="loading"
             @click="submitPatient"
            class="text-white bg-danger px-2 rounded-xl"
           >
            Add
          </cornie-btn> -->

        </cornie-card-text>
      </cornie-card>
    </cornie-card>
 
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { cornieClient } from "@/plugins/http";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CloseIcon from "@/components/icons/whitecancel.vue";
import { namespace } from "vuex-class";
import Multiselect from "@vueform/multiselect";
import CornieSelect from "@/components/cornieselect.vue";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import Avatar from "@/components/avatar.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import ISchedule,{Break, Repeat} from "@/types/ISchedule";
import SelectOption from "@/components/custom-checkbox.vue";
import search from "@/plugins/search";
import { IPatient } from "@/types/IPatient";

const practitioner = namespace("practitioner");
const special = namespace("special");
const schedulesStore = namespace("schedules");
const patients = namespace("patients");

type Sorter = (a: any, b: any) => number;


function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "managePractitioner",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    Multiselect,
    CancelIcon,
    CornieDialog,
    Avatar,
    SelectOption,
    SearchIcon,
    DeleteIcon,
    IconInput,
    CornieBtn,
    CornieSelect,
    CloseIcon
  },
})
export default class managePractitioner extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  practitionerId!: string;

  @Prop({ type: String, default: "" })
  specilatyId!: string;

  @Prop({ type: String, default: "" })
  date!: string;

  @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;


  loading = false;
  showPractitionerModal = false;
  showDatalist= false;
  aPractitioner = [];
  localSrc = require("../../../../../assets/img/placeholder.png");
  query = "";
  orderBy: Sorter = () => 1;
  firstPractitioner = [] as any;
  practionerIds = [] as any;

  firstPatients = [] as any;
  patientIds = [] as any;

  actorType = "Practitioner";
  practionervalue = false;

 @practitioner.State
  practitioners!: IPractitioner[];


  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  @schedulesStore.Action
  getScheduleById!: (id: string) => Promise<ISchedule>;
  
  @Watch("id")
  idChanged() {
    this.setSchedule();
  }

practitionersnew = [] as any;

  async setSchedule() {
    const schedule = await this.getScheduleById(this.id);
    if (!schedule) return;
    this.practitionersnew = schedule.practitioners;
    this.practionervalue = true;

  }

   get checkValue (){
    const activeactor = this.practitioners.filter((c) => c === this.practitionersnew);
     if(activeactor){
       return true;
     }
   }
  get filteredItems() {
    return this.practitioners
      .filter((item: any) => this.filter(item, this.query))
      .sort(this.orderBy);
  }

  get payload() {
      return this.practionerIds;
  }
  pushValue(item:any,id:string){
    this.practionerIds.push(id);
    this.firstPractitioner.push(item);
  }

  async updatePractitoinerData() {
   this.$emit('practitioner-data',this.firstPractitioner,this.practionerIds);
    this.done();
  }
  async updatePatientData() {
   this.$emit('patient-data',this.firstPatients,this.patientIds);
    this.done();
  }
   done(){
     this.$emit("schedule-added");
    this.show = false;
  }
  async submit() {
    this.loading = true;
    if (this.id) await this.apply();
    else await this.updatePractitoinerData();
    this.loading = false;
  }
  async submitPatient() {
    this.loading = true;
    if (this.id) await this.applyPatient();
    else await this.updatePatientData();
    this.loading = false;
  }
   async apply() {
    this.loading = true;
    if (this.practitionerId) await this.updatePractiitoner();
    else await this.savePractitoner();
    this.loading = false;
  }
  async applyPatient() {
    this.loading = true;
    if(this.practitionerId) await this.updatePractiitoner();
    else await this.savePractitoner();
    this.loading = false;
  }

   async savePractitoner() {
      try {
      const response = await cornieClient().post(
        `/api/v1/schedule/add-practitioners/${this.id}`,
        this.payload
      );
      if(response.success){
          this.done();
        window.notify({ msg: "Practitioner added successfully", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Practitioner not added", status: "error" });
    }
  }
  
  async updatePractiitoner() {
    const url = `/api/v1/schedule/add-practitioners/${this.practitionerId}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Practitioner updated successffuly", status: "success" });
        this.done();
      }
    } catch (error) {
      window.notify({ msg: "Practitioner not updated", status: "error" });
    }
  }



  async created() {
    await this.fetchPractitioners();
    await this.setSchedule();
    await this.fetchPatients();
  }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.dflex {
  display: -webkit-box;
}
.multiselect-option.is-selected {
  background: #fe4d3c;
  color: var(--ms-option-color-selected, #fff);
}
.multiselect-option.is-selected.is-pointed {
  background: var(--ms-option-bg-selected-pointed, #fe4d3c);
  color: var(--ms-option-color-selected-pointed, #fff);
}
.multiselect-option.is-selected {
  background: var(--ms-option-bg-selected, #fe4d3c);
  color: var(--ms-option-color-selected, #fff);
}

.multiselect {
  position: relative;
  margin: 0 auto;
  margin-bottom: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  border: var(--ms-border-width, 1px) solid var(--ms-border-color, #d1d5db);
  border-radius: var(--ms-radius, 4px);
  background: var(--ms-bg, #fff);
  font-size: var(--ms-font-size, 1rem);
  min-height: calc(
    var(--ms-border-width, 1px) * 2 + var(--ms-font-size, 1rem) *
      var(--ms-line-height, 1.375) + var(--ms-py, 0.5rem) * 2
  );
}

.multiselect-tags {
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-wrap: wrap;
  margin: var(--ms-tag-my, 0.25rem) 0 0;
  padding-left: var(--ms-py, 0.5rem);
  align-items: center;
}

.multiselect-tag.is-user {
  padding: 5px 12px;
  border-radius: 22px;
  background: #080056;
  margin: 3px 3px 8px;
  position: relative;
  left: -10px;
}

/* .multiselect-clear-icon {
      -webkit-mask-image: url("/components/icons/chevrondownprimary.vue");
      mask-image: url("/components/icons/chevrondownprimary.vue");
      background-color: #080056;
      display: inline-block;
      transition: .3s;
  } */

.multiselect-placeholder {
  font-size: 0.8em;
  font-weight: 400;
  font-style: italic;
  color: #667499;
}

.multiselect-caret {
  transform: rotate(0deg);
  transition: transform 0.3s;
  -webkit-mask-image: url("../../../../../assets/img/Chevron.png");
  mask-image: url("../../../../../assets/img/Chevron.png");
  background-color: #080056;
  margin: 0 var(--ms-px, 0.875rem) 0 0;
  position: relative;
  z-index: 10;
  flex-shrink: 0;
  flex-grow: 0;
  pointer-events: none;
}

.multiselect-tag.is-user img {
  width: 18px;
  border-radius: 50%;
  height: 18px;
  margin-right: 8px;
  border: 2px solid #ffffffbf;
}

.multiselect-tag.is-user i:before {
  color: #ffffff;
  border-radius: 50%;
}

.multiselect-tag-remove {
  display: flex;
  align-items: center;
  /* border: 1px solid #fff;
    background: #fff; */
  border-radius: 50%;
  color: #fff;
  justify-content: center;
  padding: 0.77px;
  margin: var(--ms-tag-remove-my, 0) var(--ms-tag-remove-mx, 0.5rem);
}
</style>
