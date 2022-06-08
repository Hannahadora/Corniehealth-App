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
          <!-- <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          /> -->
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
                        class="w-58 mt-0.5  rounded-r-none"
                        v-model="identificationDocumentType"
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
                        class="w-58 mt-0.5  rounded-r-none"
                        v-model="practiceLicenseDocumentType"
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
                 @uploaded="idFileUploaded"
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
            @click="submit"
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
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { cornieClient } from "@/plugins/http";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import DatePicker from "@/components/datepicker.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import { namespace } from "vuex-class";

import { useHandleImage } from "@/composables/useHandleImage";
import { reactive } from "@vue/reactivity";
import { createDate } from "@/plugins/utils";
import { string, date } from "yup";
import { useCountryStates } from "@/composables/useCountryStates";
import FilePicker from "./choose-file.vue";
import PhoneInput from "@/components/phone-input.vue";
import IDirector from "@/types/IDirector";

const kyc = namespace("kyc");

@Options({
  name: "directorModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    DatePicker,
    PhoneInput,
    CancelIcon,
    FilePicker,
    CornieDialog,
    SearchIcon,
    AccordionComponent,
    IconInput,
    CornieInput,
    CornieSelect,
    CornieBtn,
  },
})
export default class DirectorModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  directorId!: string;

 @kyc.Action
  getDirectorById!: (id: string) => IDirector;



 
 //Date of birth validation
  dobValidator = date().max(
    createDate(0, 0, -16),
    "Director must be at least 16yrs."
  );

  //Email Valitdaiton
  emailRule = string().email("A valid email is required").required();

 setup() {
    const { url, placeholder, onChange } = useHandleImage();
    return { img: reactive({ url, placeholder, onChange }) };
  }

idFileUploaded(fileUrl: string) {
    this.practiceLicenseDocument = fileUrl;
  }

  @Watch("directorId")
  idChanged() {
    this.setDirector();
  }

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
    uploadedPracticeLicenseDocument = "" as string;
    practiceLicenseNumber = "";
    practiceLicenseDocumentType = "";
    identificationDocumentType = "";
    identificationDocument = "";


 sendIndex(index:number){
    this.fileIndex = index
  }
  async setDirector() {
    const director = await this.getDirectorById(this.directorId);
    if (!director) return;
     this.fullName  = director.fullName;
      this.dateOfBirth  = director.dateOfBirth;
      this.nationality  = director.nationality;
      this.emailAddress  = director.emailAddress;
      this.phoneNumber  = director.phoneNumber;
      this.identificationDocumentNumber  = director.identificationDocumentNumber;
      this.practiceLicenseDocument  = director.practiceLicenseDocument;
      this.practiceLicenseNumber  = director.practiceLicenseNumber;
      this.practiceLicenseDocumentType  = director.practiceLicenseDocumentType;
      this.identificationDocumentType  = director.identificationDocumentType;
      this.identificationDocument  = director.identificationDocument;

  }

  async submit() {
    this.loading = true;
    if (this.id) await this.apply();
    else await this.updateDirectorData();
    this.loading = false;
  }
   async apply() {
    this.loading = true;
    if (this.directorId) await this.updateDirector();
    else await this.saveDirector();
    this.loading = false;
  }


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
      practiceLicenseDocumentType: this.practiceLicenseDocumentType,
      identificationDocumentType: this.identificationDocumentType,
      identificationDocument: this.identificationDocumentType
      
    };
  }

  get newaction() {
    return this.id ? "Update" : "Add";
  }

 
 
  async saveDirector() {
      try {
      const response = await cornieClient().post(
        `/api/v1/kyc/director/${this.id}`,
        this.payload
      );
      if(response.success){
          this.done();
        window.notify({ msg: "Director added successfully", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Director not added", status: "error" });
    }
  }
  
  async updateDirector() {
    const url = `/api/v1/kyc/director/${this.directorId}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Director updated succesffuly", status: "success" });
        this.done();
      }
    } catch (error) {
      window.notify({ msg: "Director not updated", status: "error" });
    }
  }

  async updateDirectorData() {
   this.$emit('director-data',[this.payload]);
    this.done();
  }
 
  done() {
    this.$emit("director-added");
    this.show = false;
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
