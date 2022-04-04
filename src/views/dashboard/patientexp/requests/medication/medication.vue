<template>
  <cornie-dialog v-model="show" center class="w-4/12 h-2/3">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
           Add Medication
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
            <div>
                <auto-complete class="w-full" @click="resultData(emptyMedicationDetails.genericCode)"  v-model="medselectedItem.genericCode" :label="'Medication code'" :items="allDrug" @input="search" :placeholder="'Medicaiton code'"/>
            </div>
            <cornie-select :label="'Brand Name'"  :items="allBrand"  v-model="emptyMedicationDetails.genericName" :placeholder="'Select'"/>
              <cornie-select
                class="w-full"
                :items="['Condition', 'Observation']"
                label="medication reference"
                placeholder="--Select--"
                v-model="medselectedItem.reference"
            >
            </cornie-select>
            <cornie-select
                class="required w-full"
                :rules="required"
                :items="['Continuous', 'Acute', 'Seasonal']"
                label="course of therapy type"
                placeholder="--Select--"
                v-model="medselectedItem.courseOfTherapy"
            >
            </cornie-select>
             <div class="w-full -mt-1">
                <span class="text-sm font-semibold mb-3">Dosage Instruction</span>
                <div class="flex space-x-2 w-full">
                    <cornie-input
                    :rules="required"
                    placeholder="0:0:0"
                    class="grow w-full"
                    :setfull="true"
                    v-model="medselectedItem.dosageInstruction"
                    />
                    <cornie-select
                    :items="['days']"
                    placeholder="/ Day"
                    class="w-32 mt-0.5 flex-none"
                    :setPrimary="true"
                    v-model="days2"
                    />
                </div>
            </div>
            <accordion-component
                title="Dispense Request - Initial Fill"
                :opened="true">
                <div class="mt-5 w-full">
                    <div class="w-full -mt-1">
                        <span class="text-sm font-semibold mb-3">Duration</span>
                        <div class="flex space-x-2 w-full">
                            <cornie-input
                                :rules="required"
                                placeholder="--Enter--"
                                class="grow w-full"
                                :setfull="true"
                                v-model="medselectedItem.durationInDays"
                            />
                            <cornie-select
                                :items="['Days']"
                                placeholder="Days"
                                class="w-32 mt-0.5 flex-none"
                                :setPrimary="true"
                                v-model="days"
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
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { string } from "yup";

import IRequest, { Medications, RefillSection } from "@/types/IRequest";

import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from "@/components/icons/info.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import MainCornieSelect from "@/components/cornieselect.vue";
import UpdateIcon from "@/components/icons/blueupdate.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CheckIcon from "@/components/icons/authcheck.vue";
import NoteIcon from "@/components/icons/graynote.vue";
import { cornieClient } from "@/plugins/http";
import DEdit from "@/components/icons/aedit.vue";
import RangeSlider from "@/components/range.vue";
import DeleteorangeIcon from "@/components/icons/deleteorange.vue";
import CDelete from "@/components/icons/adelete.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import BluecheckIcon from "@/components/icons/bluecheck.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import DatePicker from "@/components/datepicker.vue";
import DRangePicker from "@/components/daterangecalendar.vue";
import AutoComplete from "@/components/autocomplete.vue";


const request = namespace("request");

@Options({
  name: "EditMedication",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    ArrowLeftIcon,
    DatePicker,
    CDelete,
    RangeSlider,
    UpdateIcon,
    DeleteorangeIcon,
    CheckIcon,
    BluecheckIcon,
    DEdit,
    DRangePicker,
    CancelIcon,
    InfoIcon,
    AutoComplete,
    CornieDialog,
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
  },
})
export default class EditMedication extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, default: {} })
  medselectedItem!: any;


  @request.Action
  getRequestById!: (id: string) => IRequest;

  status = "";
  loading = false;
  expand = false;
  isVisible = "";
  searchresult = [] as any;
  fullInfo = [] as any;
  days2 = "";
  days = "";

  required = string().required();
  medications = [] as any;
  refills = [] as  RefillSection[];

  emptyRefill = {
    medicationId: this.id,
    interval: 0,
    intervalUnit: "",
    startDate: "",
    quantity: 0,
    supplyDuration: 0,
    supplyDurationUnit: "",
  };
    emptyMedicationDetails = {
   genericCode : this.medselectedItem.genericCode,
    genericName : this.medselectedItem.genericName,
    code : this.medselectedItem.code,
    reference: this.medselectedItem.reference,
    courseOfTherapy: this.medselectedItem.courseOfTherapy,
    dosageInstruction : this.medselectedItem.dosageInstruction,
    durationInDays: this.medselectedItem.durationInDays,
    requestId:this.medselectedItem.requestId,
    refills: [] as  RefillSection[],
    substitutionAllowed: true,
    substitutionCode:null,
    reasonForSubstitution:null,
    reasonAgainstSubstitution:null,
  };

  @Watch("id")
    idChanged() {
      this.setRequest();
    }


   async setRequest() {
        const request = await this.getRequestById(this.medselectedItem.id);
        if (!request) return;
        this.medications =  request.medications as any;
  }


   get payload() {
        return [this.emptyMedicationDetails];
   }

   async saveMedication() {
     //this.addMedicationDetails();
     //this.emptyRefill.medicationId = this.id;

      const body = {
            code : this.medselectedItem.code,
            reference: this.medselectedItem.reference,
            courseOfTherapy: this.medselectedItem.courseOfTherapy,
            dosageInstruction : this.medselectedItem.dosageInstruction,
            durationInDays: this.medselectedItem.durationInDays,
            requestId:this.medselectedItem.requestId,
            refills: [] as  RefillSection[],
            substitutionAllowed: true,
            substitutionCode:null,
            reasonForSubstitution:null,
            reasonAgainstSubstitution:null,
    };

      try {
        const response = await cornieClient().post(
          `/api/v1/medication-requests/medications/${this.medselectedItem.id}`,
          [body]
        );
        if (response.success) {
          window.notify({ msg: "Medication added successfully", status: "success" });
          this.done();
        }
      } catch (error:any) {
         window.notify({ msg: error.response.data.message, status: "error" });
      }
    
   }

    get allDrug() {
        if (!this.searchresult || this.searchresult.length === 0) return [];
        return this.searchresult.map((i: any) => {
        return {
            code: i.name,
            display: i.name,
        };
        });
    }
        get allBrand(){
       if (!this.fullInfo || this.fullInfo.length === 0) return [];
        return this.fullInfo.map((i: any) => {
        return {
            code: i.name,
            display: i.name,
        };
        });
    }

  done() {
    this.$emit("medication-added");
    this.show = false;
  }
  async apply() {
    this.loading = true;
    await this.saveMedication();
    this.loading = false;
  }
    getSearchResult(){

    }
    async search(event:any){
        console.log(event.target.value,"VSLUEJFFJ");
        console.log(event,"000");
        const AllNotes = cornieClient().get(
        `/api/v1/emdex/generic-by-keyword/`,
        {
            keyword : event.target.value,
        }
        );
        const response = await Promise.all([AllNotes]);
        if(response[0].data === 0){
            this.searchresult = 'No medication code found'
        }else{

            this.searchresult = response[0].data;
        }

    }
     async resultData(code:string){
      console.log("ALL BRNAD NAMW")
          const AllNotes = cornieClient().get(
          `/api/v1/emdex/generic-brands/${code}`,
          );
          const response = await Promise.all([AllNotes]);
          if(response[0].data === 0){
              this.fullInfo = 'No medication code found'
          }else{

              this.fullInfo = response[0].data;
          }

  }
  async created() {}
}
</script>

<style>

</style>
