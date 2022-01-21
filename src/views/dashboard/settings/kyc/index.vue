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
        <accordion-component
          v-if="orgKyc.particularOfDirectors?.length > 0"
          :title="'Particulars of Directors'"
          :opened="true"
          @add="addDirector"
          :height="480"
          :add="true"
          :buttonText="'Select existing director'"
        >
          <template v-slot:default>
            <div class="w-full pb-6">
              <accordion-component
                :editabetitle="'Director' + ' ' + [index + 1]"
                v-for="(director, index) in particularOfDirectors"
                :key="index"
                :height="480"
                :opened="true"
                class="w-full"
              >
                <template v-slot:default>
                  <div class="w-full grid grid-cols-3 gap-4 mt-5 pb-8">
                    <cornie-input
                      v-model="director.fullName"
                      :label="'Full Name'"
                      placeholder="--Enter--"
                    />
                    <date-picker
                      v-model="director.dateOfBirth"
                      :label="'Date of Birth'"
                      placeholder="--Enter--"
                    />
                    <cornie-select
                      v-model="director.nationality"
                      :label="'Nationality'"
                      :items="nationState.countries"
                      placeholder="--Select--"
                      class="w-full"
                    />
                    <cornie-input
                      v-model="director.emailAddress"
                      :label="'Email Address'"
                      :rules="requiredEmail"
                      placeholder="--Enter--"
                    />
                    <!-- <phone-input
                           
                             :modelValue="director.phoneNumber.number"
                            @input="director.phoneNumber.number = $event.target.value"
                            :label="'Phone Number'"
                              placeholder="--Enter--"
                          /> -->
                    <cornie-input
                      :label="'Tax Identification Number'"
                      v-model="director.taxIdentificationNumber"
                      placeholder="--Enter--"
                    />
                    <cornie-select
                      class="w-full"
                      :items="[
                        'Nigerian Bank Identification Number (BVN)',
                        'International Passport',
                        'National Identitiy Number (NIN)',
                        'Driver\'s License',
                        'Voter\'s Card',
                      ]"
                      :label="'Identification Document'"
                      placeholder="--Select--"
                      v-model="director.identificationDocumentNumber"
                    />
                    <cornie-input
                      v-model="director.identificationDocumentNumber"
                      :label="'Identification Document Number'"
                      placeholder="--Enter--"
                    />
                    <file-picker
                      @uploaded="Uploaded"
                      @change="sendIndex(index)"
                      :label="'Upload Identitification Document '"
                      v-model="director.uploadedIdentificationDocument"
                      placeholder="--Enter--"
                    />
                    <cornie-select
                      v-model="director.practiceLicenseDocument"
                      class="w-full"
                      :items="[
                        'Medical Practice Licence',
                        'Pharmacy Practice Licence',
                        'Radiology Practice Licence',
                        'Pathology Practice Licence',
                        'Not Applicable',
                      ]"
                      :label="'Practice Licence Document'"
                      placeholder="--Select--"
                    />
                    <cornie-input
                      v-model="director.practiceLicenseNumber"
                      :label="'Practice Licence Number'"
                      placeholder="--Enter--"
                    />
                    <file-picker
                      class="w-full"
                      @uploaded="practiceLicenceUploaded"
                      @change="sendIndex(index)"
                      :label="'Upload Practice Licence Document'"
                      v-model="director.uploadedPracticeLicenseDocument"
                      placeholder="--Enter--"
                    />
                  </div>
                </template>
              </accordion-component>
            </div>
          </template>
        </accordion-component>
        <accordion-component
          v-else
          :title="'Particulars of Directors'"
          :opened="true"
          :height="480"
          :buttonText="'Select existing director'"
        >
          <template v-slot:default>
            <div class="w-full pb-6">
              <accordion-component
                :editabetitle="'Director' + ' ' + [index + 1]"
                v-for="(director, index) in newDirectors"
                :key="index"
                :height="480"
                :opened="true"
                class="w-full"
              >
                <template v-slot:default>
                  <div class="w-full grid grid-cols-3 gap-4 mt-5 pb-8">
                    <cornie-input
                      v-model="director.fullName"
                      :label="'Full Name'"
                      placeholder="--Enter--"
                    />
                    <date-picker
                      v-model="director.dateOfBirth"
                      :label="'Date of Birth'"
                      placeholder="--Enter--"
                    />
                    <cornie-select
                      v-model="director.nationality"
                      :label="'Nationality'"
                      :items="nationState.countries"
                      placeholder="--Select--"
                      class="w-full"
                    />
                    <cornie-input
                      v-model="director.emailAddress"
                      :label="'Email Address'"
                      :rules="requiredEmail"
                      placeholder="--Enter--"
                    />
                    <!-- <phone-input
                         
                            :modelValue="director.phoneNumber.number"
                            @input="director.phoneNumber.number = $event.target.value"
                            :label="'Phone Number'"
                              placeholder="--Enter--"
                          /> -->
                    <cornie-input
                      :label="'Tax Identification Number'"
                      v-model="director.taxIdentificationNumber"
                      placeholder="--Enter--"
                    />
                    <cornie-select
                      class="w-full"
                      :items="[
                        'Nigerian Bank Identification Number (BVN)',
                        'International Passport',
                        'National Identitiy Number (NIN)',
                        'Driver\'s License',
                        'Voter\'s Card',
                      ]"
                      :label="'Identification Document'"
                      placeholder="--Select--"
                      v-model="director.identificationDocumentNumber"
                    />
                    <cornie-input
                      v-model="director.identificationDocumentNumber"
                      :label="'Identification Document Number'"
                      placeholder="--Enter--"
                    />
                    <file-picker
                      @uploaded="Uploaded"
                      @change="sendIndex(index)"
                      :label="'Upload Identitification Document '"
                      v-model="director.uploadedIdentificationDocument"
                      placeholder="--Enter--"
                    />
                    <cornie-select
                      v-model="director.practiceLicenseDocument"
                      class="w-full"
                      :items="[
                        'Medical Practice Licence',
                        'Pharmacy Practice Licence',
                        'Radiology Practice Licence',
                        'Pathology Practice Licence',
                        'Not Applicable',
                      ]"
                      :label="'Practice Licence Document'"
                      placeholder="--Select--"
                    />
                    <cornie-input
                      v-model="director.practiceLicenseNumber"
                      :label="'Practice Licence Number'"
                      placeholder="--Enter--"
                    />
                    <file-picker
                      class="w-full"
                      @uploaded="practiceLicenceUploaded"
                      @change="sendIndex(index)"
                      :label="'Upload Practice Licence Document'"
                      v-model="director.uploadedPracticeLicenseDocument"
                      placeholder="--Enter--"
                    />
                  </div>
                </template>
              </accordion-component>
            </div>
          </template>
        </accordion-component>
      </div>

      <div class="w-full my-6">
        <accordion-component :title="'Address'" :height="370" :opened="true">
          <template v-slot:default>
            <div class="w-full grid grid-cols-3 gap-4 items-center mt-5 pb-6">
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
            </div>
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

      <div class="w-full my-6" v-if="practiceRegister == true">
        <accordion-component
          :title="'Beneficial Owners'"
          :showAddExisting="true"
          :opened="true"
          @add="() => (addOwner = true)"
          :add="true"
          :expandsection="true"
          :height="owners?.length <= 0 ? 45 : 52 * owners?.length + 40"
        >
          <template v-slot:default>
            <div
              class="w-full flex"
              v-for="(owner, index) in owners"
              :key="index"
            >
              <div class="w-4/12 py-3 px-2" style="border: 1px solid #c2c7d6">
                <span class="normal-text">{{ owner?.name }}</span>
              </div>
              <div
                class="w-4/12 py-3 px-2 flex justify-end"
                style="border: 1px solid #c2c7d6"
              >
                {{ owner.percentage }}%
              </div>
              <div
                class="w-4/12 py-3 px-2 flex justify-end cursor-pointer"
                @click="removeowners(index)"
                style="border: 1px solid #c2c7d6"
              >
                <span><delete-icon /></span>
                <span class="text-sm font-normal mx-2">Delete</span>
              </div>
            </div>
          </template>
        </accordion-component>
      </div>

      <div class="w-full my-6">
        <accordion-component
          :title="'Nominate Referees'"
          @add="() => (nominateRefree = true)"
          :showAddExisting="true"
          :opened="true"
          :add="true"
          :expandsection="true"
          :showAdd="true"
        >
          <template v-slot:default>
            <div
              class="w-full flex"
              v-for="(nominee, index) in orgKyc.referees"
              :key="index"
            >
              <div
                class="py-3 px-2"
                style="border: 1px solid #c2c7d6; width: 30%"
              >
                <span class="normal-text">{{ nominee?.name }}</span>
              </div>
              <div
                class="py-3 px-4 relative"
                style="border: 1px solid #c2c7d6; width: 30%"
              >
                <div class="w-full flex justify-between">
                  <span>{{ nominee.email }}</span>
                  <span
                    class="cursor-pointer"
                    @click="toggleEditDialog(nominee, index)"
                    ><edit-icon
                  /></span>
                </div>
                <div
                  id="myModal"
                  class="modal edit-dialog p-4"
                  v-if="nominee.showEditEmail"
                >
                  <!-- Modal content -->
                  <div class="modal-content">
                    <cornie-input v-model="nominee.email" />
                    <div class="w-11/12 flex justify-between py-2">
                      <span
                        class="cancel cursor-pointer"
                        @click="() => (nominee.showEditEmail = false)"
                        >Cancel</span
                      >
                      <span
                        class="update cursor-pointer"
                        @click="
                          updateRefree(
                            nominee.id,
                            index,
                            nominee.number,
                            nominee.dialCode,
                            nominee.name,
                            nominee.email
                          )
                        "
                        >Update</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="py-3 px-4 relative"
                style="border: 1px solid #c2c7d6; width: 30%"
              >
                <div class="w-full flex justify-between">
                  <span
                    >{{ nominee.phone?.dialCode
                    }}{{ nominee.phone?.number }}</span
                  >
                  <span
                    class="cursor-pointer"
                    @click="
                      togglePhoneDialog(
                        nominee,
                        index,
                        nominee.phone.dialCode,
                        nominee.phone.number
                      )
                    "
                    ><edit-icon
                  /></span>
                </div>
                <div
                  id="myModal"
                  class="modal edit-dialog p-4"
                  v-if="nominee.showEditPhone"
                >
                  <!-- Modal content -->
                  <div class="modal-content">
                    <phone-input
                      v-model="nominee.phone.number"
                      v-model:code="nominee.phone.dialCode"
                    />
                    <div class="w-11/12 flex justify-between py-2">
                      <span
                        class="cancel cursor-pointer"
                        @click="() => (nominee.showEditPhone = false)"
                        >Cancel</span
                      >
                      <span
                        class="update cursor-pointer"
                        @click="
                          updateRefree(
                            nominee.id,
                            index,
                            nominee.phone.number,
                            nominee.phone.dialCode,
                            nominee.name,
                            nominee.email
                          )
                        "
                        >Update</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="py-3 px-2 flex justify-end cursor-pointer"
                @click="deleteItem(nominee.id)"
                style="border: 1px solid #c2c7d6; width: 10%"
              >
                <span><delete-icon /></span>
                <span class="text-sm font-normal mx-2">Delete</span>
              </div>
            </div>
          </template>
        </accordion-component>
      </div>

      <div class="w-full py-10 flex justify-end">
        <cornie-button
          @click.prevent="() => $router.go(-1)"
          class="rounded-full mr-3 px-8 font-semibold cursor-pointer py-1"
          style="border: 1px solid #080056; color: #080056"
        >
          Cancel
        </cornie-button>

        <cornie-button
          @click="submit"
          :loading="loading"
          class="rounded-full px-8 font-semibold cursor-pointer py-1 text-white"
          style="background: #fe4d3c"
        >
          Save
        </cornie-button>
      </div>
    </div>
  </div>
  <nominate-refree
    @refree-added="refreeadded"
    v-model="nominateRefree"
    :id="orgkycId"
  />

  <beneficial-owner
    @ownerAdded="ownerAdded"
    @close="() => (addOwner = false)"
    :id="id"
    v-model="addOwner"
  />
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
import NominateRefree from "./components/nominate-refrees.vue";
import BeneficialOwner from "./components/beneficial-owner.vue";
import FilePicker from "./components/choose-file.vue";
import CornieRadio from "@/components/cornieradio.vue";
import EditIcon from "@/components/icons/edit-purple.vue";
import { cornieClient } from "@/plugins/http";
import { useHandleImage } from "@/composables/useHandleImage";
import AccordionComponent from "@/components/form-accordion.vue";
import IKyc, { ParticularOfDirectors, BeneficialOwners } from "@/types/IKyc";
import { namespace } from "vuex-class";
import { useCountryStates } from "@/composables/useCountryStates";
import { reactive } from "@vue/reactivity";
import IPhone from "@/types/IPhone";
import IKycref from "@/types/IKycref";

const kyc = namespace("kyc");

export interface IBeneficialOwner {
  name: string;
  percentage: number | string;
}

@Options({
  components: {
    CollapseSection,
    CornieInput,
    DatePicker,
    PhoneInput,
    CornieSelect,
    AutoComplete,
    DeleteIcon,
    CornieButton,
    NominateRefree,
    BeneficialOwner,
    AccordionComponent,
    Modal,
    FilePicker,
    CornieRadio,
    EditIcon,
  },
})
export default class KYC extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

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

  nationState = setup(() => useCountryStates());
  practiceRegister = true;
  incoporatedName = "";
  rcNumber = "";
  certificateOfIncoporation = setup(() => useHandleImage()) as any;
  formCAC = "";
  memorandumAndArticleOfAssociation = "";
  taxIdentificationNumber = "";
  country = "";
  stateRegion = "";
  city = "";
  zipCode = "";
  address = "";
  apartment = "";
  phoneNumber = "";
  proofOfAddressUpload = setup(() => useHandleImage()) as any;
  particularOfDirectors = [
    {
      fullName: "",
      dateOfBirth: "",
      nationality: "",
      emailAddress: "",
      phoneNumber: {
        number: this.phoneNumber,
        dialCode: this.dialCode,
      },
      taxIdentificationNumber: "",
      identificationDocumentNumber: "",
      uploadedIdentificationDocument: " " as string,
      practiceLicenseDocument: "",
      uploadedPracticeLicenseDocument: " " as string,
      practiceLicenseNumber: "",
    },
  ];
  newDirectors: any = this.particularOfDirectors;
  beneficialOwners: any = [
    {
      name: "",
      percentage: "",
    },
  ];
  newbeneficialOwners: any = [this.beneficialOwners];
  referees = [] as any[];
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
  addreferees!: (orgKyc: IKycref) => void;

  @kyc.Action
  deleteRefree!: (id: string) => Promise<boolean>;

  kycId = "";
  @Watch("kycId")
  idChanged() {
    this.setKyc();
  }

  // get newDirectors(){
  //   return this.particularOfDirectors

  // }
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
    this.particularOfDirectors = kyc.particularOfDirectors;
    this.owners = kyc.beneficialOwners;
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
      country: this.country,
      stateRegion: this.stateRegion,
      city: this.city,
      zipCode: this.zipCode,
      address: this.address,
      apartment: this.apartment,
      proofOfAddressUpload: this.proofOfAddressUpload,
      particularOfDirectors: this.newDirectors,
      beneficialOwners: this.owners,
      referees: this.referees,
    };
  }

  // setDirector(){
  //   this.particularOfDirectors.push(this.newDirectors)
  // }
  addDirector() {
    this.particularOfDirectors.push(...this.newDirectors);
  }
  idFileUploaded(fileUrl: string) {
    this.director.uploadedIdentificationDocument = fileUrl;
    this.certificateOfIncoporation = fileUrl;
    this.proofOfAddressUpload = fileUrl;
  }

  Uploaded(fileUrl: string) {
    this.particularOfDirectors[this.fileIndex].uploadedIdentificationDocument =
      fileUrl;
  }

  practiceLicenceUploaded(fileUrl: string) {
    this.particularOfDirectors[this.fileIndex].uploadedPracticeLicenseDocument =
      fileUrl;
  }
  sendIndex(index: number) {
    this.fileIndex = index;
  }
  addrssProofUploaded(fileUrl: string) {
    this.data.proofOfAddressUpload = fileUrl;
  }

  nominees = [] as any[];

  owners: any = this.beneficialOwners;
  async refNominated(data: any) {
    this.referees = data;
    this.newreferees = data;
    this.nominees?.push(data);
  }

  ownerAdded(data: any) {
    this.beneficialOwners = data;
    this.owners?.push(data);
  }
  async refreeadded() {
    this.addreferees([this.addreferees] as any);
    await this.fetchKycs();
    this.nominateRefree = false;
    // console.log(this.orgKyc.referees);
  }
  async submit() {
    this.loading = true;
    if (this.orgkycId) await this.updateKYC();
    else await this.createKYC();
    this.loading = false;
  }

  async createKYC() {
    this.payload.country = this.nationState.country;
    // this.payload.particularOfDirectors.uploadedIdentificationDocument = this.uploadedIdentificationDocument;
    // this.payload.particularOfDirectors.uploadedPracticeLicenseDocument = this.uploadedPracticeLicenseDocument;

    try {
      const { data } = await cornieClient().post("/api/v1/kyc", this.payload);
      window.notify({ msg: "KYC updated successfully", status: "success" });
    } catch (error) {
      window.notify({ msg: "KYC update failed", status: "error" });
    }
  }
  async updateKYC() {
    const url = `/api/v1/kyc/${this.orgkycId}`;
    const payload = {
      ...this.payload,
      id: this.orgkycId,
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

  // async getKYCData() {
  //   try {
  //     const { data } = await cornieClient().get("/api/v1/kyc");
  //     this.nominees = data.nominateReferess
  //       ? data.nominateReferess?.map((nominee: any) => {
  //           nominee.email = nominee.emailAddress;
  //           nominee.phone = nominee.phonenNumber;
  //           return nominee;
  //         })
  //       : [];

  //     this.owners = data.beneficailOwners ? data.beneficailOwners : [];

  //     if (data?.particularOfDirectors?.length > 0) {
  //       const firstIitem = data?.particularOfDirectors[0];
  //       this.director = {
  //         ...firstIitem,
  //         phone: firstIitem?.phoneNumber,
  //       };
  //     }
  //   this.practiceRegister = true;
  //     this.data = {
  //       ...data,
  //       practiceRegister: data.practiceRegister ? true : false,
  //     };
  //   } catch (error) {}
  // }

  toggleEditDialog(nominee: any, index: number) {
    this.referees[index].newEmail = this.referees[index].email;
    this.referees[index].showEditEmail = !this.referees[index].showEditEmail;
  }

  togglePhoneDialog(
    nominee: any,
    index: number,
    dialcode: string,
    phone: string
  ) {
    this.referees[index].newPhone = dialcode + "" + phone;
    // this.referees[index].newPhone.number = phone;
    this.referees[index].showEditPhone = !this.referees[index].showEditPhone;
  }

  updateNomineeEmail(index: number) {
    this.referees[index].email = this.referees[index].newEmail;
    this.referees[index].showEditEmail = false;
  }

  async updateRefree(
    id: string,
    index: number,
    value: string,
    value2: string,
    name: string,
    email: string
  ) {
    // let phonenumber = this.referees[index].phone.dialCode + this.referees[index].phone.number ;
    // console.log(phonenumber,"LOOK");
    // phonenumber = this.referees[index].newPhone;
    // this.referees[index].showEditPhone = false;
    const url = `/api/v1/kyc/referee/${id}`;
    const payload = {
      name: name,
      email: email,
      notified: false,
      phone: {
        dialCode: value2 || "+234",
        number: value || "091994858882",
      },
    };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({
          msg: "Referee updated successfully",
          status: "success",
        });
        //phonevalue = response.data.phone.dialCode + response.data.phone.number;
        this.referees[index].showEditPhone = false;
        this.referees[index].showEditEmail = false;
        this.addreferees(this.referees as any);
        console.log(this.referees as any);
      }
    } catch (error) {
      window.notify({
        msg: "Referee update failed",
        status: "error",
      });
    }
  }
  async removerefree(value: string) {
    try {
      const { data } = await cornieClient().delete(
        `/api/v1/kyc/referee/${value}`,
        {}
      );
      this.addreferees([this.orgKyc.referees] as any);
      window.notify({ msg: "Refree deleted successfully", status: "success" });
      await this.fetchKycs();
    } catch (error) {
      window.notify({
        msg: "Refree deleted not  successfully",
        status: "error",
      });
    }
  }
  removeowners(index: number) {
    this.owners.splice(index, 1);
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
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this refree",
      title: "Delete refree",
    });
    if (!confirmed) return;

    if (await this.deleteRefree(id))
      window.notify({ msg: "Refree deleted successfully", status: "success" });
    else
      window.notify({
        msg: "Refree deleted not  successfully",
        status: "error",
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
