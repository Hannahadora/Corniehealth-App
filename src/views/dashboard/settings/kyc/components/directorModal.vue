<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Add New Director
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
            <div class="border-b-2 w-full border-dashed pb-2 mb-5 border-gray-300">
                <span class="text-dark text-sm font-medium">Enter director’s details</span>
            </div>
             <cornie-input
                label="Full Name"
                class="w-full mb-5"
                placeholder="--Enter--"
                v-model="fullName"
              />
            <date-picker
                  label="Date of Birth"
                  :rules="dobValidator"
                  placeholder="--/04/2021"
                  class="mt-4"
                  v-model="dateOfBirth"
            />
            <cornie-select
                :label="'Nationality'"
                :items="nationState.countries"
                placeholder="--Select--"
                class="w-full mt-4"
                v-model="nationality"
            />
            <cornie-input
                :label="'Email Address'"
                placeholder="--Enter--"
                :rules="emailRule"
                class="mb-5"
                v-model="emailAddress"
            />
             <phone-input
                :label="'Phone Number'"
                placeholder="--Enter--"
                class="mb-5"
                v-model:code="phoneNumber.dialCode"
                v-model="phoneNumber.number"
            />
            <div class="mt-4">
                <span class="font-semibold text-sm mb-3">Identity Document Number</span>
                <div class="flex">
                    <cornie-select
                        :items="['Nigerian Bank Identification Number (BVN)','International Passport','National Identitiy Number (NIN)','Drivers License','Voters Card']"
                        placeholder="--Select--"
                        class="w-48 mt-0.5  rounded-r-none"
                        v-model="identificationDocument"
                    />
                    <div class="w-full">
                    <cornie-input
                        :addextraclass="true"
                        class="w-full"
                        placeholder="--Enter Identity Number--"
                        v-model="identificationDocumentNumber"
                    />
                    </div>
                </div>
            </div>
             <div class="mb-2">
                <span class="font-semibold text-sm mb-3">Practice Licence Information</span>
                <div class="flex">
                    <cornie-select
                        :items="['Medical Practice Licence','Pharmacy Practice Licence','Radiology Practice Licence','Pathology Practice Licence','Not Applicable']"
                        placeholder="select doc type"
                        class="w-48 mt-0.5  rounded-r-none"
                        v-model="practiceLicense"
                    />
                    <div class="w-full">
                    <cornie-input
                      :addextraclass="true"
                      class="w-full border-l-0 rounded-l-none"
                        placeholder="--Enter Licence Number--"
                        v-model="practiceLicenseNumber"
                    />
                    </div>
                </div>
            </div>
            <file-picker
                class="w-full"
                @change="sendIndex(index)"
                :label="'Upload Practice Licence Document'"
                placeholder="--Enter--"
                v-model="uploadedPracticeLicenseDocument"
            />
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
            @click="sendDirectorData"
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
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from "@/components/icons/info.vue";
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
import DatePicker from "@/components/datepicker.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import Period from "@/types/IPeriod";
import IImpression, { Effective } from "@/types/IImpression";
import { namespace } from "vuex-class";

import { createDate } from "@/plugins/utils";
import { string, date } from "yup";
import { useCountryStates } from "@/composables/useCountryStates";
import FilePicker from "./choose-file.vue";
import PhoneInput from "@/components/phone-input.vue";

const impression = namespace("impression");


@Options({
  name: "directorModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    ArrowLeftIcon,
    DatePicker,
    RangeSlider,
    DEdit,
    CDelete,
    PhoneInput,
    CancelIcon,
    InfoIcon,
    FilePicker,
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
export default class Medication extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @impression.Action
  getImpressionById!: (id: string) => IImpression;

  @Prop({ type: Array, default: () => [] })
  available!: object;

  impressionModel = {} as IImpression;


//Date of birth validation
  dobValidator = date().max(
    createDate(0, 0, -16),
    "Director must be at least 16yrs."
  );
  //Email Valitdaiton
  emailRule = string().email("A valid email is required").required();

//   @Watch("id")
//   idChanged() {
//     this.setImpression();
//   }

  nationState = setup(() => useCountryStates());
  loading = false;
 fileIndex = 0;

    fullName = "";
    dateOfBirth  =  "";
    nationality = "";
    emailAddress = "";
    phoneNumber =  {
        number: "",
        dialCode: "+234",
    };
    taxIdentificationNumber = "";
    identificationDocumentNumber = "";
    practiceLicenseDocument = "";
    uploadedPracticeLicenseDocument = " " as string;
    practiceLicenseNumber = "";
    identificationDocument = "";
    practiceLicense = "";

 
  async apply() {
    this.loading = true;
    if (this.id) await this.updateDirectorData();
    else await this.sendDirectorData();
    this.loading = false;
  }

 sendIndex(index:number){
    this.fileIndex = index
  }
//   async setImpression() {
//     const impression = await this.getImpressionById(this.id);
//     if (!impression) return;
//     this.impressionModel = impression;
//   }


  get payload() {
    return {
      fullName: this.fullName,
      dateOfBirth: this.dateOfBirth,
      nationality: this.nationality,
      emailAddress: this.emailAddress,
      phoneNumber: this.phoneNumber,
      taxIdentificationNumber: this.taxIdentificationNumber,
      identificationDocumentNumber: this.identificationDocumentNumber,
      practiceLicenseDocument: this.practiceLicenseDocument,
      practiceLicenseNumber: this.practiceLicenseNumber,
      identificationDocument: this.identificationDocument,
      practiceLicense: this.practiceLicense,
      
    };
  }

  get newaction() {
    return this.id ? "Update" : "Create New";
  }

  done() {
    this.$emit("impression-added");
    this.show = false;
  }

 
  async sendDirectorData() {
      this.$emit('director-data',this.payload);
       this.show = false;
  }
  async updateDirectorData() {
   this.$emit('director-data',this.payload);
  }
 

  created() {
    //this.setImpression();
  }
}
</script>

<style>
.border-r-0 {
    border-right-width: 0px !important;
}
.border-l-0 {
    border-left-width: 0px !important;
}
</style>
