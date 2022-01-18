<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span
        class="flex border-b-2 w-full font-bold text-lg text-primary py-2 mx-auto"
      >
        Add a New Healthcare Service
      </span>
      <span class="w-full">
        <div class="w-full h-screen">
          <v-form class="mt-5 w-full" @submit="submit">
              <accordion-component title="Basic Info" :opened="true">
                <template  v-slot:default>
                  <div class="w-full grid grid-cols-3 gap-4 mt-5">
                     <!-- Image Upload  -->
                    <div class="w-full">
                        <span class="flex items-center">
                          <cornie-avatar-field v-model="img.url" />
                        </span>
                      </div>
                    <cornie-input
                      v-model="identifier"
                      label="Identifier"
                      class="w-fill"
                      :disabled="true"
                      placeholder="--Enter--"
                    />

                    <cornie-select
                      
                      :items="activeStates"
                      v-model="activeState"
                      label="active state"
                      class="w-full"
                      placeholder="--Select--"
                    />

                    <cornie-select
                      :items="['providers']"
                      v-model="providedBy"
                      label="Provided by"
                      class="w-full"
                      placeholder="--Select--"
                    />
                     <fhir-input
                       
                        reference="http://hl7.org/fhir/ValueSet/service-category"
                        class="w-full"
                        v-model="category"
                        label="category"
                          placeholder="--Select--"
                      />
                      <fhir-input
                       
                        reference="http://hl7.org/fhir/ValueSet/service-type"
                        class="w-full"
                        v-model="type"
                        label="type"
                        placeholder="--Select--"
                      />
                      <fhir-input
                       
                        reference="http://hl7.org/fhir/ValueSet/c80-practice-codes"
                        class="w-full"
                        v-model="specialty"
                        label="Specialty"
                        placeholder="--Select--"
                      />
                    <cornie-select
                      
                     :items="nationState.countries"
                      v-model="address"
                      label="location"
                      class="w-full"
                       placeholder="--Select--"
                    />

                    <cornie-input  v-model="name" label="name"   placeholder="--Enter--"/>

                    <cornie-input
                      
                      v-model="comment"
                      label="comment"
                       placeholder="--Enter--"
                    />

                    <cornie-input
                      
                      v-model="extraDetails"
                      label="extra details"
                       placeholder="--Enter--"
                    />

                    <phone-input
                      v-model="phone"
                      
                      label="Phone Number"
                       placeholder="--Enter--"
                    />
                    <cornie-select
                      :items="allLocation"
                      v-model="coverageArea"
                      label="Coverage area"
                      
                      class="w-full"
                      placeholder="--Select--"
                    />
                      <fhir-input
                       
                        reference="http://hl7.org/fhir/ValueSet/service-provision-conditions"
                        class="w-full"
                        v-model="provisionCode"
                        label="service provision code"
                        placeholder="--Select--"
                      />
                   
                    <!-- <span class="flex items-center mt-3">
                      <avatar class="mr-2" v-if="img.url" :src="img.url" />
                      <avatar class="mr-2" v-else :src="img.placeholder" />
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        id="file"
                        @change="img.onChange"
                        hidden
                      />
                      <label
                        for="file"
                        class="text-pink-600 font-bold cursor-pointer"
                      >
                        Upload
                      </label>
                    </span> -->
                  </div>
                </template>
                 <template v-slot:misc>
                 <info-icon class="fill-current text-primary"/>
               </template>
              </accordion-component>

                <accordion-component title="Eligibility" :opened="false">
                  <template  v-slot:default>
                    <div class="w-full grid grid-cols-3 gap-4 mt-5">
                      <cornie-select
                        :items="['code']"
                        v-model="eligibilityCode"
                        label="Code"
                        class="w-full"
                        placeholder="--Select--"
                      />
                      <cornie-input v-model="eligibilityComment" label="Comment" placeholder="--Enter--" class="w-full"/>
                      <cornie-input v-model="programs" label="Programs" placeholder="--Enter--" class="w-full"/>
                      <cornie-input v-model="characteristics" label="Characteristics" placeholder="--Enter--" class="w-full"/>
                      <fhir-input
                          
                          reference="http://hl7.org/fhir/ValueSet/languages"
                          class="w-full"
                          v-model="communication"
                          label="Communication"
                          placeholder="--Select--"
                        />
                        <fhir-input
                          
                          reference="http://hl7.org/fhir/ValueSet/service-referral-method"
                          class="w-full"
                          v-model="referralMethod"
                          label="referral method"
                          placeholder="--Select--"
                        />
                      <cornie-select
                        :items="['Yes', 'No']"
                        v-model="appointmentRequired"
                        label="appointment required?"
                         placeholder="--Select--"
                         class="w-full"
                      />
                    </div>
                  </template>
                   <template v-slot:misc>
                    <info-icon class="fill-current text-primary"/>
                  </template>
                </accordion-component>

                 <accordion-component title="Available Time" :opened="false">
                    <template  v-slot:default>
                        <div class="mt-3 w-full">
                          <operation-hours v-model="hoursOfOperation" />
                        </div>

                       <div class="flex space-x-1 w-full mt-5 mb-5 col-span-full justify-between">
                          <span class="text-sm w-32 -mb-2"> Not Available</span>
                          <span class="border-b-2 border-gray-200 w-full"></span>
                       </div>
                        <div class="w-full grid grid-cols-3 gap-4 mt-5">
                          <cornie-input
                            
                            v-model="notAvailableDescription"
                            label="description"
                            placeholder="--Enter--"
                            class="w-full"
                          />
                          <date-picker
                            label="During"
                            v-model="notAvailableDateRange"
                            placeholder="--Enter--"
                            
                            class="w-full"
                          />
                          <cornie-input
                            v-model="availabilityExceptions"
                            label="availability exceptions"
                             placeholder="--Enter--"
                             class="w-full"
                          />
                          <cornie-select
                            
                            v-model="notAvailableChannel"
                            label="channel"
                            :items="['dental', 'hospice']"
                             placeholder="--Select--"
                             class="w-ful"
                          />
                      </div>
                    </template>
                      <template v-slot:misc>
                      <info-icon class="fill-current text-primary"/>
                    </template>
                 </accordion-component>

            
            <span class="mt-10 flex w-full mb-32 pb-20 justify-end">
              <button
                class="rounded-full font-semibold pr-10 pl-10 py-1 text-sm text-primary border border-primary mr-3"
                @click="$router.push('health-services')"
              >
                Cancel
              </button>
              <cornie-btn
                :loading="loading"
                type="submit"
                class="bg-danger rounded-full text-white pr-6 pl-6 py-1 focus:outline-none hover:opacity-90"
              >
                Save
              </cornie-btn>
            </span>
          </v-form>
        </div>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import Modal from "@/components/modal.vue";
import PhoneInput from "@/components/phone-input.vue";
import Avatar from "@/components/avatar.vue";
import OperationHours from "@/components/new-operation-hours.vue";
import IHealthcare, { HoursOfOperation } from "@/types/IHealthcare";
import { useHandleImage } from "@/composables/useHandleImage";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";
import DatePicker from "./datepicker.vue";
// import DatePicker from "@/components/daterangepicker.vue";
import  AccordionComponent from "@/components/form-accordion.vue";
import FhirInput from "@/components/fhir-input.vue";
import { getCountries, getStates } from "@/plugins/nation-states";
import { useCountryStates } from "@/composables/useCountryStates";
import CornieAvatarField from "@/components/cornie-avatar-field/CornieAvatarField.vue";
import InfoIcon from "@/components/icons/info.vue"

const countries = getCountries();

const healthcare = namespace("healthcare");
const dropdown = namespace("dropdown");
@Options({
  components: {
    CornieInput,
    Modal,
    DatePicker,
    CornieSelect,
    PhoneInput,
    Avatar,
    OperationHours,
    AccordionComponent,
    FhirInput,
    CornieAvatarField,
    InfoIcon
  },
})
export default class AddService extends Vue {

  nationState = setup(() => useCountryStates());
  img = setup(() => useHandleImage());
  @Prop({ type: String, default: "" })
  id!: string;

  @healthcare.Action
  getHealthcareById!: (id: string) => IHealthcare;
  dropdowns = {} as IIndexableObject;
  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  loading = false;
  activeStates = ["active", "inactive"];
  location=[];

  identifier = "";
  name = "";
  activeState = "";
  eligibilityComment = "";
  provisionCode = "";
  eligibilityCode = "";
  coverageArea = "";
  type = "";
  phone = "";
  emailRule = string().email().required();
  address = "";
  characteristics = "";
  communication = "";
  photo = "";
  specialty = "";
  referralMethod = "";
  appointmentRequired = "";
  providedBy = "";
  category = "";
  notAvailableDescription = "";
  notAvailableDateRange = "";
  notAvailableChannel = "";
  availabilityExceptions = "";
  extraDetails = "";
  comment = "";
  hoursOfOperation: HoursOfOperation[] = [];

  required = string().required();

  @Watch("id")
  idChanged() {
    this.setHealthcare();
  }
  async setHealthcare() {
    const healthcare = await this.getHealthcareById(this.id);
    if (!healthcare) return;
    this.name = healthcare.name;
    this.activeState = healthcare.activeState;
    this.eligibilityComment = healthcare.eligibilityComment;
    this.provisionCode = healthcare.provisionCode;
    this.coverageArea = healthcare.coverageArea;
    this.type = healthcare.type;
    this.phone = healthcare.phone;
    this.address = healthcare.address;
    this.characteristics = healthcare.characteristics;
    this.communication = healthcare.communication;
    this.img.url = healthcare.photo;
    this.specialty = healthcare.specialty;
    this.referralMethod = healthcare.referralMethod;
    this.appointmentRequired = healthcare.appointmentRequired;
    this.providedBy = healthcare.providedBy;
    this.category = healthcare.category;
    this.notAvailableDescription = healthcare.notAvailableDescription;
    this.notAvailableDateRange = healthcare.notAvailableDateRange;
    this.notAvailableChannel = healthcare.notAvailableChannel;
    this.availabilityExceptions = healthcare.availabilityExceptions;
    this.extraDetails = healthcare.extraDetails;
    this.comment = healthcare.comment;
    this.eligibilityCode = healthcare.eligibilityCode;
    this.hoursOfOperation = healthcare.hoursOfOperation;
  }

  get payload() {
    return {
      name: this.name,
      activeState: this.activeState,
      eligibilityComment: this.eligibilityComment,
      provisionCode: this.provisionCode,
      coverageArea: this.coverageArea,
      type: this.type,
      phone: this.phone,
      address: this.address,
      characteristics: this.characteristics,
      communication: this.communication,
      photo: this.img.url,
      specialty: this.specialty,
      referralMethod: this.referralMethod,
      appointmentRequired: this.appointmentRequired,
      providedBy: this.providedBy,
      category: this.category,
      notAvailableDescription: this.notAvailableDescription,
      notAvailableDateRange: this.notAvailableDateRange,
      notAvailableChannel: this.notAvailableChannel,
      availabilityExceptions: this.availabilityExceptions,
      extraDetails: this.extraDetails,
      comment: this.comment,
      hoursOfOperation: this.hoursOfOperation,
      eligibilityCode: this.eligibilityCode,
    };
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.updateHealthcare();
    else await this.createHealthcare();
    this.loading = false;
  }

  async createHealthcare() {
    this.payload.notAvailableDateRange = new Date(
      this.payload.notAvailableDateRange
    ).toISOString();

    try {
      const response = await cornieClient().post(
        "/api/v1/healthCareService",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Healthcare service  added", status: "success" });
        this.$router.push("/dashboard/provider/settings/health-services");
      }
    } catch (error) {
      window.notify({ msg: "Healthcare service not added", status: "error" });
    }
  }
  async updateHealthcare() {
    const url = `/api/v1/healthCareService/${this.id}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        this.$router.push("/dashboard/provider/settings/health-services");
        window.notify({
          msg: "Health care service updated",
          status: "success",
        });
      }
    } catch (error) {
      window.notify({
        msg: "Health care service not updated",
        status: "error",
      });
    }
  }
  async fetchOrgInfo() {
    try {
      const response = await cornieClient().get(
        "/api/v1/organization/myOrg/get"
      );
      this.identifier = response.data.id;
    } catch (error) {
      window.notify({ msg: "Could not fetch organization", status: "error" });
    }
  }
  get allLocation() {
    if (!this.location || this.location.length === 0) return [];
    return this.location.map((i: any) => {
      return {
        code: i.id,
        display: i.name,
      };
    });
  }
 
  async fetchLocation() {
    const AllLocation = cornieClient().get(
      "/api/v1/location/myOrg/getMyOrgLocations"
    );
    const response = await Promise.all([AllLocation]);
    this.location = response[0].data;
  }


  async created() {
    this.setHealthcare();
    this.fetchOrgInfo();
    await this.fetchLocation();
    const data = await this.getDropdowns("healthCareService");
    this.dropdowns = data;
  }
}
</script>
