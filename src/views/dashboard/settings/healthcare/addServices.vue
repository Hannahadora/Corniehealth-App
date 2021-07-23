<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span
        class="
          flex
          border-b-2
          w-full
          font-semibold
          text-xl text-primary
          py-2
          mx-auto
        "
      >
        Add a New Healthcare Service
      </span>
      <span class="w-full">
        <div class="w-full h-screen">
          <v-form class="mt-5 w-full" @submit="submit">
            <div class="w-full grid grid-cols-2 gap-5">
              <cornie-input
                :rules="required"
                v-model="identifier"
                label="Identifier"
                class="bg-gray-200" disabled
              />
        
              <cornie-select
                :rules="required"
                :items="activeStates"
                v-model="activeState"
                label="active state"
              />

              <cornie-select
                :rules="required"
                :items="['providers']"
                v-model="providedBy"
                label="Provided by"
              />
             

              <cornie-select
                :rules="required"
                :items="['category']"
                v-model="category"
                label="category"
              />

              <cornie-select
                :rules="required"
                :items="['type']"
                v-model="type"
                label="type"
              />

              <cornie-select
                :rules="required"
                :items="['special']"
                v-model="specialty"
                label="specialty"
              />

              <cornie-select
                :rules="required"
                :items="['Abuja']"
                v-model="address"
                label="location"
              />


              <cornie-input
                :rules="required"
                v-model="name"
                label="name"
              />

              <cornie-input 
              :rules="required"
               v-model="comment"
                label="comment" 
                />

                <cornie-input 
              :rules="required"
               v-model="extraDetails"
                label="extra details" 
                />
            
              <phone-input
                v-model="phone"
                :rules="required"
                label="Phone Number"
              />

              <cornie-select
                :items="['coveragearea']"
                v-model="coverageArea"
                label="Coverage area"
                :rules="required"
              />

               <cornie-select
                :items="activeStates"
                v-model="provisionCode"
                label="service provision code"
                :rules="required"
              />

            <!-- Image Upload  -->
              <span class="flex items-center mt-3">
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
                  <label for="file" class="text-pink-600 font-bold cursor-pointer">
                    Upload
                  </label>
                </span>
              
            </div>
            <span class="flex border-b-2 w-full text-sm text-dark py-2 mx-auto font-semibold col-span-full mb-2 mt-4">
           Eligibility
        </span>
            <div class="w-full grid grid-cols-2 gap-5 mt-3">
        <cornie-select
                :items="['code']"
                v-model="eligibilityCode"
                label="Code"
              />
              <cornie-input v-model="eligibilityComment" label="Comment" />
              <cornie-input v-model="programs" label="Programs" />
              <cornie-input v-model="characteristics" label="Characteristics" />
              <cornie-select
                :items="['Full']"
                v-model="communication"
                label="Communication"
              />
              <cornie-select
                :items="['reffer']"
                v-model="referralMethod"
                label="referral method"
              />
              <cornie-select
                :items="['Yes', 'No']"
                v-model="appointmentRequired"
                label="appointment required?"
              />
            </div> 
             <span class="flex border-b-2 w-full text-sm text-dark py-2 mx-auto font-semibold col-span-full mb-2 mt-4">
          Available Time
        </span>
            <div class="mt-3 w-full">
              <operation-hours v-model="hoursOfOperation" />
            </div>

             <span class="flex border-b-2 w-full text-sm text-dark py-2 mx-auto font-semibold col-span-full mb-2 mt-4">
           Not Available
        </span>
            <div class="w-full grid grid-cols-2 gap-5 mt-3">
            <cornie-input
                :rules="required"
                v-model="notAvailableDescription"
                label="description"
              />
               <date-picker
              label="During"
              v-model="notAvailableDateRange"
              placeholder="--Enter--" :rules="required"
            />
           
              <cornie-input
                :rules="required"
                v-model="availabilityExceptions"
                label="availability exceptions"
              />
              <cornie-select
                :rules="required"
                v-model="notAvailableChannel"
                label="channel"
                :items="['dental', 'hospice']"
              />
            </div>
            <span class=" border-t-2 mt-4 flex w-full mb-2 justify-end">
              <button
                class="
                  rounded-full
                  font-semibold
                  p-2
                  text-primary
                  border border-primary
                  w-1/4
                  mr-3
                  mt-4
                "
                @click="$router.push('health-services')"
              >
                  Revert Changes
              </button>
              <cornie-btn
                :loading="loading"
                type="submit"
                  class="
                    bg-danger
                    rounded-full
                    text-white
                    mt-5
                    pr-10
                    pl-10
                    focus:outline-none
                    hover:opacity-90
                  "
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
import OperationHours from "@/components/operation-hours.vue";
import IHealthcare, { HoursOfOperation }  from "@/types/IHealthcare";
import { useHandleImage } from "@/composables/useHandleImage";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";
import OrgSelect from "@/components/orgSelect.vue";
import DatePicker from "./datepicker.vue";

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
  },
})

export default class AddService extends Vue {
  img = setup(() => useHandleImage());
  @Prop({ type: String, default: "" })
  id!: string;

  
  @healthcare.Action
  getHealthcareById!: (id: string) => IHealthcare;
  dropdowns = {} as IIndexableObject;
  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

 loading = false;
activeStates = ["active", "inactive"]

  identifier = "";
  name = "";
  activeState = "";
  eligibilityComment = "";
  provisionCode = "";
  eligibilityCode = "";
  coverageArea = "";
  type = "";
  phone = "";
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
    coverageArea: this.coverageArea ,
    type: this.type,
    phone: this.phone ,
    address: this.address ,
    characteristics: this.characteristics ,
    communication: this.communication,
    photo: this.img.url ,
    specialty: this.specialty ,
   referralMethod:  this.referralMethod,
   appointmentRequired:  this.appointmentRequired,
    providedBy: this.providedBy,
   category:  this.category ,
    notAvailableDescription: this.notAvailableDescription ,
    notAvailableDateRange: this.notAvailableDateRange,
   notAvailableChannel: this.notAvailableChannel ,
    availabilityExceptions: this.availabilityExceptions ,
   extraDetails:  this.extraDetails,
   comment:  this.comment ,
   hoursOfOperation:  this.hoursOfOperation ,
   eligibilityCode:  this.eligibilityCode 
   
    }
   }
  
  
   async submit() {
    this.loading = true;
    if (this.id) await this.updateHealthcare();
    else await this.createHealthcare();
    this.loading = false;
  }

  async createHealthcare() {
    this.payload.notAvailableDateRange = new Date(this.payload.notAvailableDateRange).toISOString()

    try {
      const response = await cornieClient().post(
        "/api/v1/healthCareService",
        this.payload
      );
      if (response.success) {
          window.notify({ msg: "Healthcare service  added", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Health care service  not added", status: "error" });
    }
  }
  async updateHealthcare() {
    const url = `/api/v1/healthCareService/${this.id}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Health care service updated", status: "success" });
      }
    } catch (error) {
       window.notify({ msg: "Health care servcie not updated", status: "error" });
    }
  }
  async fetchOrgInfo() {
      try {
        const response = await cornieClient().get(
          "/api/v1/organization/myOrg/get"
        );
        console.log(response);
        this.identifier = response.data.identifier;
      } catch (error) {
        alert("Could not fetch organization");
      }
    }

  async created() {
    this.setHealthcare();
    this.fetchOrgInfo();
     const data = await this.getDropdowns("healthCareService");
    this.dropdowns = data;
  }

}
</script>
