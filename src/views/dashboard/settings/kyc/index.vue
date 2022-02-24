<template>
  <div>
    <div class="py-2" style="border-bottom: 1px solid #c2c7d6">
      <p class="header text-sm">KYC</p>
    </div>

    <div class="w-full">
      <!-- <form> -->
      <p class="normal-text mt-5">Is this practice registered?</p>
      <div class="w-full flex flex-wrap items-center pt-6 pb-8">
        <div class="-mb-2">
          <cornie-radio
            :checked="practiceRegister"
            v-model="practiceRegister"
            :label="'Yes'"
            :value="true"
            name="practiceRegister"
          />
        </div>
        <div class="ml-4 -mb-2">
          <cornie-radio
            v-model="practiceRegister"
            :label="'No'"
            :value="false"
            name="practiceRegister"
          />
        </div>
      </div>

      <div class="w-full my-6" v-if="practiceRegister == true">
        <accordion-component
          :title="'Incorporation Details'"
          :opened="true"
          :height="200"
        >
          <template v-slot:default>
            <div class="w-full grid grid-cols-3 gap-4 mt-5">
              <cornie-input
                v-model="incoporatedName"
                :label="'Incorporated Name'"
                placeholder="--Enter--"
              />
              <cornie-input
                v-model="rcNumber"
                placeholder="--Enter--"
                :label="'RC Number'"
              />
              <file-picker
                @uploaded="idFileUploaded"
                v-model="certificateOfIncoporation"
                :label="'Certificate of Incorporation'"
                class=""
              />
              <cornie-input
                v-model="formCAC"
                :label="'Form CAC 1.1'"
                placeholder="--Enter--"
              />
              <cornie-input
                v-model="memorandumAndArticleOfAssociation"
                :label="'Memorandum & Articles of Association'"
                placeholder="--Enter--"
              />
              <cornie-input
                v-model="taxIdentificationNumber"
                :label="'Tax Identification Number'"
                placeholder="--Enter--"
              />
            </div>
          </template>
        </accordion-component>
      </div>
        <div class="w-full my-6">
        <accordion-component :title="'Practice Address'" :height="370" :opened="true">
          <template v-slot:default>
            <div class="flex w-full my-5">
              <span class="w-full">
                No 90 Ashiek jarma street, jabi
              </span>
              <cornie-button
                  class="grow-0 w-32 px-0 flex justify-end  float-right rounded font-semibold cursor-pointer py-1 text-white"
                  style="background: #fe4d3c"
                >
                  Change
                </cornie-button>

            </div>
            <!-- <div class="w-full grid grid-cols-3 gap-4 items-center mt-5 pb-6">
              <cornie-select
                v-model="nationState.country"
                :items="nationState.countries"
                :label="'Country'"
                class="w-full"
                placeholder="--Select--"
              />
              <cornie-select
                v-model="stateRegion"
                :items="nationState.states"
                :label="'State of Region'"
                class="w-full"
                placeholder="--Select--"
              />
              <cornie-input
                v-model="city"
                :label="'City'"
                class="w-full"
                placeholder="--Select--"
              />

              <cornie-input
                v-model="zipCode"
                :label="'ZIP or Post Code'"
                class="w-full"
              />
              <cornie-input
                v-model="address"
                placeholder="--Enter--"
                :label="'Address'"
                class="w-full"
              />
              <cornie-input
                v-model="apartment"
                :label="'Apartment or House Number'"
                class="w-full"
                placeholder="--Enter--"
              />
            </div> -->
            <div class="grid grid-cols-2 gap-4 pb-8 w-full">
              <file-picker
                @uploaded="addrssProofUploaded"
                :label="'Please upload a proof of address *'"
              />
              <div class="w-full upload-desc p-3">
                <span class="pb-4 text-xs border-b-2 border-gray-200 mb-3">
                  Proof of address can be any of the listed documents below, not
                  more than 3 months old.
                </span>
                <div class="w-full mt-8">
                  <ul class="pl-4" style="list-style: unset">
                    <li class="text-normal mb-3 text-sm" style="color: #14171f">
                      Utility bill for services to the address
                    </li>
                    <li class="text-normal mb-3 text-sm" style="color: #14171f">
                      Bank statement showing current address
                    </li>
                    <li class="text-normal mb-3 text-sm" style="color: #14171f">
                      Tax assessment document showing address
                    </li>
                    <li class="text-normal mb-3 text-sm" style="color: #14171f">
                      Letter from a public authority
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </template>
        </accordion-component>
      </div>


      <div class="w-full my-6">
        <director-sections
          @director-added="directorAdded"
          @directordata="directordata"
          :id="orgkycId"
          :directors="particularOfDirectors"
        />
      </div>

    
      <div class="w-full my-6" v-if="practiceRegister == true">
        <owner-section
          :owners="orgKyc.beneficialOwners"
          :id="orgkycId"
          @owner-added="setOwner"
          @ownerAdded="ownerAdded"
          @ownerdata="ownerdata"
        />
      </div>

      <div class="w-full my-6">
        <refree-section
          :refrees="orgKyc.referees"
          :id="orgkycId"
          @refree-added="refreeadded"
          @refreedata="refreedata"
        />
      </div>
      <div class="w-full py-10 flex justify-end">
        <cornie-button
          @click.prevent="() => $router.go(-1)"
          class="rounded mr-3 px-8 font-semibold cursor-pointer py-1"
          style="border: 1px solid #080056; color: #080056"
        >
          Cancel
        </cornie-button>

        <cornie-button
          @click="submit"
          :loading="loading"
          class="rounded px-8 font-semibold cursor-pointer py-1 text-white"
          style="background: #fe4d3c"
        >
          Save
        </cornie-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { Options, Vue, setup } from "vue-class-component";
import CollapseSection from "./components/collapse-section.vue";
import CornieInput from "@/components/cornieinput.vue";
import DatePicker from "@/components/datepicker.vue";
import PhoneInput from "@/components/phone-input.vue";
import CornieSelect from "@/components/autocomplete.vue";
import AutoComplete from "@/components/autocomplete.vue";
import DeleteIcon from "@/components/icons/deleteorange.vue";
import CornieButton from "@/components/CornieBtn.vue";
import Modal from "@/components/modal.vue";
import NominateRefree from "./components/refreesModal.vue";
import BeneficialOwner from "./components/beneficial-owner.vue";
import FilePicker from "./components/choose-file.vue";
import CornieRadio from "@/components/cornieradio.vue";
import EditIcon from "@/components/icons/edit-purple.vue";
import { cornieClient } from "@/plugins/http";
import { useHandleImage } from "@/composables/useHandleImage";
import AccordionComponent from "@/components/form-accordion.vue";
import IKyc from "@/types/IKyc";
import { namespace } from "vuex-class";
import { useCountryStates } from "@/composables/useCountryStates";
import { reactive } from "@vue/reactivity";
import IKycref from "@/types/IKycref";
import { string, date } from "yup";
import { createDate } from "@/plugins/utils";
import DirectorSections from "./components/directorSection.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import OwnerSection from "./components/ownerSection.vue";
import RefreeSection from "./components/refreesection.vue";
import IDirector from "@/types/IDirector";
import IOwner from "@/types/IOwner";

const kyc = namespace("kyc");

export interface IBeneficialOwner {
  name: string;
  percentage: number | string;
}

@Options({
  components: {
    CollapseSection,
    CornieInput,
    DirectorSections,
    DatePicker,
    PhoneInput,
    CornieSelect,
    AutoComplete,
    DeleteIcon,
    OwnerSection,
    RefreeSection,
    CornieButton,
    NominateRefree,
    BeneficialOwner,
    AccordionComponent,
    CornieTable,
    Modal,
    FilePicker,
    CornieRadio,
    EditIcon,
  },
})
export default class KYC extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  emailRule = string().email("A valid email is required").required();
  dobValidator = date().max(
    createDate(0, 0, -16),
    "Director must be at least 16yrs."
  );
  nominateRefree = false;
  addOwner = false;
  loading = false;
  data: any = {};
  phone = "";
  dialCode = "+234";
  allCountries = [];
  allStates = [];

  setup() {
    const { url, placeholder, onChange } = useHandleImage();
    return { img: reactive({ url, placeholder, onChange }) };
  }

  nominees = [] as any[];

  owners = [] as any[];

  nationState = setup(() => useCountryStates());
  practiceRegister = true;
  incoporatedName = "";
  rcNumber = "";
  certificateOfIncoporation = setup(() => useHandleImage()) as any;
  formCAC = "";
  memorandumAndArticleOfAssociation = "";
  taxIdentificationNumber = "";
  country = "";
  stateRegion = "stateRegion";
  city = "city";
  zipCode = "zipCode";
  address = "address";
  apartment = "apartment";
  phoneNumber = "";
  proofOfAddressUpload = setup(() => useHandleImage()) as any;
  particularOfDirectors = [] as IDirector[];
  newDirectors: any = this.particularOfDirectors;
  beneficialOwners = [] as IOwner[];
  newbeneficialOwners: any = [this.beneficialOwners];
  referees = [] as IKycref[];
  newreferees = [] as any;

  uploadedIdentificationDocument = setup(() => useHandleImage()) as any;

  uploadedPracticeLicenseDocument = setup(() => useHandleImage()) as any;
  fileIndex = 0;
  director: any = { dialCode: "+234" };

  @kyc.Action
  getKycById!: (id: string) => IKyc;

  @kyc.Action
  fetchKycs!: () => Promise<void>;

  @kyc.State
  orgKyc!: IKyc;

  @kyc.Mutation
  addOwners!: (orgKyc: IOwner) => void;

  @kyc.Mutation
  addreferees!: (orgKyc: IKycref) => void;

  @kyc.Mutation
  addDirectors!: (orgKyc: IDirector) => void;

  @kyc.Action
  deleteRefree!: (id: string) => Promise<boolean>;

  kycId = "";
  @Watch("kycId")
  idChanged() {
    this.setKyc();
  }

  async setKyc() {
    const kyc = this.orgKyc;
    if (!kyc) return;
    this.practiceRegister = kyc.practiceRegister;
    this.incoporatedName = kyc.incoporatedName;
    this.rcNumber = kyc.rcNumber;
    this.certificateOfIncoporation = kyc.certificateOfIncoporation;
    this.formCAC = kyc.formCAC;
    this.memorandumAndArticleOfAssociation =
      kyc.memorandumAndArticleOfAssociation;
    this.taxIdentificationNumber = kyc.taxIdentificationNumber;
    this.country = kyc.country;
    this.stateRegion = kyc.stateRegion;
    this.city = kyc.city;
    this.zipCode = kyc.zipCode;
    this.address = kyc.address;
    this.apartment = kyc.apartment;
    this.proofOfAddressUpload = kyc.proofOfAddressUpload;
    this.particularOfDirectors = kyc.directors;
    this.newowner = kyc.beneficialOwners;
    this.referees = kyc.referees;
  }
  get orgkycId() {
    this.kycId = this.orgKyc.id as string;
    return this.orgKyc.id;
  }
  get payload() {
    return {
      practiceRegister: this.practiceRegister,
      incoporatedName: this.incoporatedName,
      rcNumber: this.rcNumber,
      certificateOfIncoporation: this.certificateOfIncoporation,
      formCAC: this.formCAC,
      memorandumAndArticleOfAssociation: this.memorandumAndArticleOfAssociation,
      taxIdentificationNumber: this.taxIdentificationNumber,
      country: "country",
      stateRegion: "stateRegion",
      city: "city",
      zipCode: "zipCode",
      address: "address",
      apartment: "apartment",
      proofOfAddressUpload: this.proofOfAddressUpload,
      directors: this.particularOfDirectors,
      beneficialOwners: this.newowner,
      referees: this.referees,
    };
  }

  addDirector() {
    this.particularOfDirectors.push(...this.newDirectors);
  }
  idFileUploaded(fileUrl: string) {
    this.director.uploadedIdentificationDocument = fileUrl;
    this.certificateOfIncoporation = fileUrl;
    this.proofOfAddressUpload = fileUrl;
  }

  sendIndex(index: number) {
    this.fileIndex = index;
  }
  addrssProofUploaded(fileUrl: string) {
    this.data.proofOfAddressUpload = fileUrl;
  }
  async directorAdded() {
    await this.fetchKycs();
    this.addDirectors([this.addDirectors] as any);
  }

  directordata(value:any){
    this.particularOfDirectors = value;
  }
  ownerdata(value:any){
    this.newowner = value;
  }
  refreedata(value:any){
    this.referees = value;
  }

  async refNominated(data: any) {
    this.referees = data;
    this.newreferees = data;
    this.nominees?.push(data);
  }

  async setOwner() {
    this.addOwners([this.addOwners] as any);
    await this.fetchKycs();
  }

  newowner = [] as any;
  ownerAdded(data: any) {
    this.beneficialOwners = data;
    this.newowner.push(this.beneficialOwners);
  }
  async refreeadded() {
    this.addreferees([this.addreferees] as any);
    await this.fetchKycs();
    this.nominateRefree = false;
    // console.log(this.orgKyc.referees);
  }
  refree(value: any) {
    this.referees = [value];
  }
  async submit() {
    this.loading = true;
    if (this.orgkycId) await this.updateKYC();
    else await this.createKYC();
    this.loading = false;
  }

  async createKYC() {
    this.payload.country = this.nationState.country;
    // this.payload.particularOfDirectors.phoneNumber.number = this.phone;
    // this.payload.particularOfDirectors.phoneNumber.dialCode = this.dialCode;
    // this.payload.particularOfDirectors.uploadedIdentificationDocument = this.uploadedIdentificationDocument;
    // this.payload.particularOfDirectors.uploadedPracticeLicenseDocument = this.uploadedPracticeLicenseDocument;

    try {
      const { data } = await cornieClient().post("/api/v1/kyc", this.payload);
      window.notify({ msg: "KYC created successfully", status: "success" });
    } catch (error) {
      window.notify({ msg: "KYC creation failed", status: "error" });
    }
  }
  async updateKYC() {
    const url = `/api/v1/kyc/${this.orgkycId}`;
    const payload = {
      ...this.payload,
      id: this.orgkycId,
      particularOfDirectors: this.particularOfDirectors,
    };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({
          msg: "KYC updated successfully",
          status: "success",
        });
        await this.fetchKycs();
      }
    } catch (error) {
      window.notify({
        msg: "KYC update failed",
        status: "error",
      });
    }
  }

  get allCountry() {
    if (!this.allCountries || this.allCountries.length === 0) return [];
    return this.allCountries.map((i: any) => {
      return {
        code: i.code,
        display: i.name,
      };
    });
  }

  async created() {
    //  await this.getKYCData();
    await this.setKyc();
    await this.fetchKycs();
  }
}
</script>

<style scoped>
* {
  font-family: Inter;
  font-style: normal;
}

.header {
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  color: #080056;
}

.normal-text {
  font-size: 14px;
  line-height: 21px;
  color: #14171f;
  font-weight: 600;
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

.edit-dialog {
  position: absolute;
  z-index: 1;
  background: #fff;
  width: 100%;
  background: #ffffff;
  /* Buttons & Cards */

  box-shadow: 0px 1px 2px rgba(46, 41, 78, 0.02),
    0px 4px 8px rgba(46, 41, 78, 0.08);
}

.update {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */

  /* Primary/Razzmataz */

  color: #fe4d3c;
}

.cancel {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */

  /* Greys/Blue Yonder */

  color: #667499;
}
</style>
