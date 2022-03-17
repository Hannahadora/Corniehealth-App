<template>
  <cornie-dialog v-model="show" right class="w-3/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
           Other Participants
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
                    :items="['Practitioner','Device']"
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
             <div v-if="actorType == 'Device'">
                <div class="w-full flex space-x-7 mt-4" v-for="(item, index) in devices" :key="index">  
                    <div class="w-full dflex space-x-4 mb-3">
                        <div class="w-10 h-10">
                            <avatar class="mr-2" :src="localSrc" />
                        </div>
                        <div class="w-full">
                            <p class="text-xs text-dark font-medium">
                              {{item.deviceName.name}} 
                             
                            </p>
                            <p class="text-xs text-gray-500 font-meduim">
                             {{item.deviceName.nameType}}
                        </p>
                        </div>
                    </div>
                    <select-option @click="pushDeviceValue(item,item.id)"/>
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
          <cornie-btn
          v-if="actorType == 'Device'"
          :loading="loading"
             @click="submitDevice"
            class="text-white bg-danger px-2 rounded-xl"
           >
            Add
          </cornie-btn>

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
import IDevice from "@/types/IDevice";

const practitioner = namespace("practitioner");
const devices = namespace("device");
const schedulesStore = namespace("schedules");
const patients = namespace("patients");

type Sorter = (a: any, b: any) => number;


function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "Participants",
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
export default class Participants extends Vue {
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
  appoimtentId!: string;

  @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;

  @Prop({ type: Array, default: [] })
  devices!: IDevice[];

  @devices.Action
  fetchDevices!: () => Promise<void>;



  loading = false;
  showPractitionerModal = false;
  aPractitioner = [];
  localSrc = require("../../../../assets/img/placeholder.png");
  query = "";
  orderBy: Sorter = () => 1;
  firstPractitioner = [] as any;
  practionerIds = [] as any;

  firstDevice = [] as any;
  deviceIds = [] as any;
  singlePractitonerid = "";

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
    this.practionerIds.push({practitionerId: id, required: true });
    this.firstPractitioner.push(item);
    this.singlePractitonerid = id;
  }
  pushDeviceValue(item:any,id:string){
     this.deviceIds.push({id: id, required: true });
    this.firstDevice.push(item);
  }

  async updatePractitoinerData() {
   this.$emit('practitioner-data',this.firstPractitioner,this.practionerIds, this.singlePractitonerid);
    this.done();
  }
  async updatDeviceData() {
   this.$emit('device-data',this.firstDevice,this.deviceIds);
    this.done();
  }
  done() {
    this.$emit("practitoner-added");
    this.show = false;
  }
  async submit() {
    this.loading = true;
    if (this.id) await this.apply();
    else await this.updatePractitoinerData();
    this.loading = false;
  }
  async submitDevice() {
    this.loading = true;
    await this.updatDeviceData();
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

   getAppointment() {
    const pt = this.practitioners.find((i: any) => i.id === this.appoimtentId);
    console.log(pt,"PT")
    return [pt];
  }



  async created() {
    if(this.appoimtentId) await this.getAppointment();
    await this.fetchPractitioners();
    await this.setSchedule();
    await this.fetchPatients();
    await this.fetchDevices();
  }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.dflex {
  display: -webkit-box;
}
</style>
