<template>
<div class="container-fluid bg-gray-100">
  <div class="overflow-y-scroll">
    <div class="bg-white m-10 px-5 rounded-md">
      <div class="w-full bg-white py-4" style="border-bottom: 1px solid #c2c7d6">
        <p class="header">KYC</p>
      </div>

      <div class="w-full">
        <form action="">
          <div class="w-full flex flex-wrap items-center pt-6 pb-8">
            <p class="normal-text">
              Thank you for choosing to refer Dr.{{practionername}}. This exercise
              will take less than 5 minutes.
            </p>
          </div>

          <div class="w-full section-card px-4">
            <div class="w-full flex flex-wrap items-center py-4">
              <div class="w-5/12">
                <p class="normal-text mr-4">
                  What's your relationship with Dr. {{practionername}}?
                </p>
              <div class="w-full space-x-20 mt-4 flex">
                  <cornie-radio
                    v-model="relationship"
                    :label="'Professional Colleague'"
                    value="Professional Colleague"
                    class="w-full"
                  />
                  <cornie-radio
                    v-model="relationship"
                    :label="'Friend'"
                    value="Friend"
                     class="w-full"
                  />
                  <cornie-radio
                    v-model="relationship"
                    :label="'Relative'"
                    value="Relative"
                    class="w-full"
                  />
                  <cornie-radio
                    v-model="relationship"
                    :label="'Others'"
                    value="Others"
                    class="w-full"
                  />
              
              </div>
              </div>
            </div>

            <div class="w-full flex my-3">
              <div class="w-5/12">
                <p class="normal-text">
                  How long have you known Dr. {{practionername}}?
                </p>
              <div
                class="w-full mt-4 flex border py-1 rounded"
                style="height: 46px; max-width: 200px"
              >
                <div class="w-4/12">
                  <input
                    type="text"
                    v-model="relationshipDuration.value"
                    class="w-full p-2 px-3 outline-none"
                    style="height: 100%; border: none"
                  />
                  <!-- <cornie-input style="width:100%;border: transparent" /> -->
                </div>
                <div class="w-8/12 border-l-2">
                  <cornie-dropdown
                    v-model="relationshipDuration.unit"
                    style="width: 100%; border: transparent"
                    :items="['Years', 'Months']"
                  />
                </div>
              </div>
              </div>
            </div>

            <div class="w-full flex mb-4">
              <div class="w-full my-2">
                <a class="normal-text mr-4"
                  >Please select qualities that best describe Dr. {{practionername}}</a
                >
                <div class="grid grid-cols-9 gap-2 w-full">
                  <div
                    class="mx-3 -mb-2"
                    v-for="(quality, index) in qualities"
                    :key="index"
                  >
                    <label class="inline-flex items-center my-4">
                      <input
                      v-model="qualityDescriptions"
                        type="checkbox"
                        class="form-radio h-2 w-2"
                        :value="quality"
                      />
                      <span class="ml-2 noraml-text text-xs font-normal">{{
                        quality
                      }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="w-full flex flex-wrap items-start pb-4">
                <p class="normal-text mb-8">
                  Please rate Dr. {{practionername}}'s clinical experience
                </p>
              <div class="w-full">
                <div class="grid grid-cols-4 justify-between col-span-full w-96">
                  <span>{{clinicalExperience.min}}</span>
                      <Slider class="custom mt-2" :tooltips="false" v-model="clinicalExperience.value" :min="0" :max="100" :default="50"/>
                  <span class="ml-28">{{clinicalExperience.max}}</span>
                  <input type="number" class="p-1.5 ml-14 -mt-1 border-2 border-danger rounded h-8 w-12" v-model="clinicalExperience.value">
                </div>
                
              </div>
            </div>

            <div class="w-full flex flex-wrap items-start py-4">
                <p class="normal-text mb-8">
                  Please rate Dr. {{practionername}} quality of work in clinical
                  medicine
                </p>
              <!-- <div class="w-6/12">
              <div class="w-full mt-4 flex">
                <range-picker  v-model="qualityOfWork.value"/>
              </div>
              </div> -->
               <div class="w-full">
                <div class="grid grid-cols-4 justify-between col-span-full w-96">
                  <span>{{qualityOfWork.min}}</span>
                      <Slider class="custom mt-2" :tooltips="false" v-model="qualityOfWork.value" :min="0" :max="100" :default="50"/>
                  <span class="ml-28">{{qualityOfWork.max}}</span>
                  <input type="number" class="p-1.5 ml-14 -mt-1 border-2 border-danger rounded h-8 w-12" v-model="qualityOfWork.value">
                </div>
                
              </div>
            </div>

            <div class="w-full flex flex-wrap items-center py-4">
              <div class="w-7/12">
                <p class="normal-text mr-4">
                  Are you aware of any previous or pending malpractice suite
                  against Dr. {{practionername}}?
                </p>
              <div class="w-full mt-4 flex">
                <div class="mx-2 -mb-2">
                  <cornie-radio v-model="previousMalpractice" :label="'Yes'" :value="true" />
                </div>
                <div class="mx-2 -mb-2">
                  <cornie-radio v-model="previousMalpractice" :label="'No'" :value="false" />
                </div>
              </div>
              </div>
            </div>

            <div class="w-full">
              <div class="w-full pb-12">
                <Textarea
                  style="width: 97%; height: 150px"
                  :label="'General comments'"
                  v-model="generalComments"
                  placeholder="Start typing..."
                />
              </div>
            </div>
          </div>

          <div class="w-full my-6">
            <accordion-component
              :title="'Particulars of Referee'"
              :opened="true"
            >
               <template v-slot:default>
                 <div class="mt-5">
                    <div class="w-full grid grid-cols-4 gap-4 mb-6">    
                        <cornie-input :label="'Full Name'" placeholder="--Enter--" v-model="fullname" />
                    
                        <cornie-input :label="'Nationality'" placeholder="--Enter--" v-model="nationality"/>
                    
                          <cornie-input :label="'Email Address'" placeholder="--Enter--" v-model="email"/>
                      
                    
                          <phone-input :label="'Phone Number'" v-model="phone.number" v-model:code="phone.dialCode" />
                    </div>
                    <div class="w-full grid grid-cols-3 gap-4 mb-6">
                        <cornie-select
                          :items="[
                            'Nigerian Bank Identification Number (BVN)',
                            'International Passport',
                            'National Identitiy Number (NIN)',
                            'Driver\'s License',
                            'Voter\'s Card',
                          ]"
                          :label="'Identification Document'"
                          v-model="identificationDocument"
                          placeholder="--Select--"
                        />
                        <cornie-input placeholder="--Enter--" :label="'Identity Document Number'" v-model="identificationDocumentNumber"/>
                        <file-picker placeholder="--Enter--" :label="'Upload Identitification Document'"  @uploaded="idFileUploaded" v-model="identificationDocumentFile" />
                        <cornie-select
                          :items="[
                            'Medical Practice Licence',
                            'Pharmacy Practice Licence',
                            'Radiology Practice Licence',
                            'Pathology Practice Licence',
                            'Not Applicable',
                          ]"
                          :label="'Practice Licence Document'"
                          v-model="practiceLicenseDocument"
                          placeholder="--Select--"
                        />
                        <cornie-input placeholder="--Enter--" :label="'Practice Licence Number'" v-model="practiceLicenseNumber" />
                        <file-picker :label="'Upload Practice Licence Document'" @uploaded="idFileUploaded2"  v-model="practiceLicenseFile"/>
                    </div>
                 </div>
              </template>
            </accordion-component>
          </div>

          <div class="w-full my-6">
            <accordion-component :opened="true" :title="'Address'" :height="220">
              <template v-slot:default>
                <div class="w-full grid mt-4 grid-cols-3 gap-4 items-center mb-6">
                    <cornie-select placeholder="--Select--" v-model="nationState.country"
                    :items="nationState.countries" :label="'Country'" />
                    <cornie-select
                    placeholder="--Select--"
                      :items="nationState.states"
                      :label="'State of Region'"
                      v-model="state"
                      
                    />
                    <cornie-input placeholder="--Enter--"   v-model="city" :label="'City'" />
                    <cornie-input placeholder="--Enter--" :label="'ZIP or Post Code'" v-model="zipCode"/>
                    <cornie-input placeholder="--Enter--" :label="'Address'" v-model="address"/>
                    <cornie-input placeholder="--Enter--" :label="'Apartment or House Number'" v-model="houseNumber" />
                </div>
               
              </template>
            </accordion-component>
          </div>

          <div class="w-full py-10 flex justify-end">
            <cornie-button
              class="rounded-full px-8 mr-5 font-semibold cursor-pointer py-1"
              style="border: 1px solid #080056; color: #080056"
            >
              Cancel
            </cornie-button>

            <cornie-button
              class="rounded-full px-8 font-semibold cursor-pointer py-1 text-white"
              style="background: #fe4d3c"
              @click="submit"
               :loading="loading"
            >
              Save
            </cornie-button>
          </div>
        </form>
      </div>
    </div>

    <modal :visible="nominateRefree">
      <nominate-refree @close="() => (nominateRefree = false)" />
    </modal>

    <modal :visible="addOwner">
      <beneficial-owner @close="() => (addOwner = false)" />
    </modal>
  </div>
</div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import CollapseSection from "./collapse-section.vue";
import CornieInput from "@/components/cornieinput.vue";
import DatePicker from "@/components/datepicker.vue";
import PhoneInput from "@/components/phone-input.vue";
import CornieSelect from "@/components/autocomplete.vue";
import AutoComplete from "@/components/autocomplete.vue";
import DeleteIcon from "@/components/icons/deleteorange.vue";
import CornieButton from "@/components/CornieBtn.vue";
import Modal from "@/components/modal.vue";
import Textarea from "@/components/textarea.vue";
import RangePicker from "./range-picker.vue";
import CornieDropdown from "@/components/cornieselect.vue";
import FilePicker from "./choose-file.vue";
import UploadedFile from "./uploadd-file.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieCheckbox from "@/components/corniecheckbox.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import { useCountryStates } from "@/composables/useCountryStates";
import { cornieClient } from "@/plugins/http";
import Slider from '@vueform/slider'

@Options({
  components: {
    CollapseSection,
    CornieInput,
    DatePicker,
    PhoneInput,
    CornieSelect,
    Slider,
    AutoComplete,
    DeleteIcon,
    CornieButton,
    Modal,
    Textarea,
    RangePicker,
    AccordionComponent,
    CornieDropdown,
    FilePicker,
    UploadedFile,
    CornieRadio,
    CornieCheckbox,
  },
})
export default class EmailLink extends Vue {
  nominateRefree = false;
  addOwner = false;
  loading=false;
nationState = setup(() => useCountryStates());
  qualities = [
    "Knowledgeable",
    "Attentive",
    "Curious",
    "Collaborative",
    "Analytical",
    "Calm",
    "Decisive",
    "Detail",
    "Composed",
    "Trustworthy",
    "Mature",
    "Responsible",
    "Ethical",
    "Empathetic",
    "Patient Oriented",
    "Frieindly",
    "Time management",
  ];

  relationship = "";
  relationshipDuration = {
    unit: "",
    value: 0
  };
  qualityDescriptions = [];
  clinicalExperience = {
    value: "10",
    max: "100",
    min:"0"
  };
  qualityOfWork = {
     value: "10",
    max: "100",
    min:"0"
  };
  previousMalpractice = true;
  generalComments = "";
  fullname = "";
  nationality = "";
  email = "";
  phone = {
    number : '',
    dialCode : '+234',
  };
  identificationDocument = "";
  identificationDocumentNumber = "";
  identificationDocumentFile = "";
  practiceLicenseDocument = "";
  practiceLicenseNumber = "";
  practiceLicenseFile = "";
  country = "";
  state = "";
  city = "";
  zipCode = "";
  address = "";
  houseNumber = "";

  data: any = {};
  get practionername(){
    const name = this.$route.query.practitioner;
    const name2 = atob(`${name}`)
    return name2
  }
  get id(){
    return this.$attrs.id
  }
    idFileUploaded(fileUrl: string,) {
    this.identificationDocumentFile = fileUrl;
  }
idFileUploaded2(fileUrl: string,) {
     this.practiceLicenseFile = fileUrl;
  }


    get payload() {
    return {
      relationship: this.relationship,
      relationshipDuration: this.relationshipDuration,
      qualityDescriptions: this.qualityDescriptions,
      clinicalExperience: this.clinicalExperience,
      qualityOfWork: this.qualityOfWork,
      previousMalpractice: this.previousMalpractice,
      generalComments: this.generalComments,
      country: this.nationState.country,
      fullname: this.fullname,
      city: this.city,
      zipCode: this.zipCode,
      address: this.address,
      nationality: this.nationality,
      email: this.email,
      phone: this.phone,
      identificationDocument: this.identificationDocument,
      identificationDocumentNumber: this.identificationDocumentNumber,
      identificationDocumentFile: this.identificationDocumentFile,
      practiceLicenseDocument: this.practiceLicenseDocument,
      practiceLicenseNumber: this.practiceLicenseNumber,
       practiceLicenseFile: this.practiceLicenseFile,
        state: this.state,
         houseNumber: this.houseNumber,

    };
  }
  async submit() {
    this.loading = true;
     await this.createResponse();
    this.loading = false;
  }
  async createResponse() {
    try {
      const { data } = await cornieClient().post(
        `/api/v1/kyc/response/${this.id}`,
        this.payload
      );
      window.notify({ msg: "Response submited successfully", status: "success" });
      setTimeout(() => {
        this.$router.push('/');
        //your code to be executed after 1 second
      }, 6000);
    } catch (error) {
      window.notify({ msg: "Response not submited", status: "error" });
    }
  }

}

</script>
<style src="@vueform/slider/themes/default.css"></style>
<style scoped>
* {
  font-family: Inter;
  font-style: normal;
}
.custom{
     margin-left: -60px;
    margin-right: -90px;
}
input:focus-visible {
    outline-offset: unset !important;
}
:focus-visible {
    outline: unset !important;
}
.slider-connect {
    background: #fe4d3c;
    cursor: pointer;
}
.slider-handle:focus {
    box-shadow: 0 0 0 var(--slider-handle-ring-width,3px) #b9371030,var(--slider-handle-shadow,.5px .5px 2px 1px rgba(0,0,0,.32));
    outline: none;
}
.header {
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  color: #080056;
}

.normal-text {
  font-size: 14px !important;
  line-height: 21px !important;
  color: #14171f !important;
  font-weight: 600 !important;
}

.section-card {
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(46, 41, 78, 0.02),
    0px 4px 8px rgba(46, 41, 78, 0.08);
}

.upload-desc {
  background: #f6f8f9;
  border-radius: 8px;
}

input[type="checkbox"]:after {
  border: 1px solid #c4bdbd !important;
}
input[type="checkbox"]:checked:after {
  background-color: #ff0000 !important;
}
</style>
