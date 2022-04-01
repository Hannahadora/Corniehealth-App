<template>
  <cornie-dialog v-model="show" right class="w-3/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
           Select Patient
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
            <div class="border-b-2 border-dashed border-gray-100">
                <span class="text-sm mb-4">Select patient for this appointment</span>
                <div class="w-full mb-5">
                    <span class="mb-2 w-full rounded-full">
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
                </div>
            </div>
             <span class="text-gray-500 text-xs mb-4">{{ firstPatient.length }} selected</span>
                <div class="w-full flex space-x-7 mt-4" v-for="(item, index) in patients" :key="index">
                    <div class="w-full dflex space-x-4 mb-3" >
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
                              {{ item.firstname }} {{ item.lastname }}
                            </p>
                            <p class="text-xs text-gray-500 font-meduim">
                             {{ item.mrn }}
                        </p>
                        </div>
                    </div>
                    <select-option @click="pushValue(item,item.id)" :value="item.id"/>
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
             @click="submit"
            class="text-white bg-danger px-2 rounded-xl"
           >
            Add
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  <new-practitioner v-model="showPractitionerModal"   :specilatyId="specilatyId"/>

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
import ISpecial from "@/types/ISpecial";
import SelectOption from "@/components/custom-checkbox.vue";
import search from "@/plugins/search";
import { IPatient } from "@/types/IPatient";


const patients = namespace("patients");
const special = namespace("special");

type Sorter = (a: any, b: any) => number;


function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "Patients",
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
export default class Patients extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  specilatyId!: string;

  @Prop({ type: String, default: "" })
  patientId!: string;


  loading = false;
  showPractitionerModal = false;
  aPractitioner = [];
  localSrc = require("../../../../assets/img/placeholder.png");
  query = "";
  orderBy: Sorter = () => 1;
  patientIds = [] as any;
  firstPatient = [] as any;
  singlePatientId = "";


  @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;

  get payload() {
      return this.patientIds;
  }

  get filteredItems() {
    return this.patients
      .filter((item: any) => this.filter(item, this.query))
      .sort(this.orderBy);
  }

  pushValue(item:any,id:string){
    this.patientIds.push({patientId: id, required: true });
    this.firstPatient.push(item);
     this.singlePatientId = id;
  }

   async submit() {
    this.loading = true;
    if (this.id) await this.apply();
    else await this.updatePatientData();
    this.loading = false;
  }
  async updatePatientData(){
      this.$emit('patient-data',this.firstPatient,this.patientIds,this.singlePatientId);
    this.done();
  }
  async apply(){
      this.loading = true;
        if (this.patientId) await this.updatePatient();
        else await this.savePatient();
     this.loading = false;
  }
  async savePatient() {
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
  
  async updatePatient() {
    const url = `/api/v1/schedule/add-practitioners/${this.patientId}`;
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
 done() {
    this.$emit("patient-added");
    this.show = false;
  }

  async created() {
    await this.fetchPatients();
  }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.dflex {
  display: -webkit-box;
}
</style>
