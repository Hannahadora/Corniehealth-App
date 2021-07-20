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
              />
        
              <cornie-select
                :rules="required"
                :items="activeStates"
                v-model="activeState"
                label="active state"
              />

              <cornie-select
                :rules="required"
                :items="activeStates"
                v-model="providedBy"
                label="Provided by"
              />
             

              <cornie-select
                :rules="required"
                :items="activeStates"
                v-model="category"
                label="category"
              />

              <cornie-select
                :rules="required"
                :items="activeStates"
                v-model="type"
                label="type"
              />

              <cornie-select
                :rules="required"
                :items="activeStates"
                v-model="specialty"
                label="specialty"
              />

              <cornie-select
                :rules="required"
                :items="activeStates"
                v-model="location"
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
                :items="activeStates"
                v-model="coverageArea"
                label="Coverage area"
                :rules="required"
              />

               <cornie-select
                :items="activeStates"
                v-model="serviceProvisionCode"
                label="service provision code"
                :rules="required"
              />

            <!-- Image Upload  -->

              
            </div>
            <span
              class="
                flex
                border-b-2
                w-full
                font-semibold
                text-xl text-primary
                py-2
                mt-4
                mx-auto
              "
            >
              Eligibility
            </span>
            <!-- <div class="w-full grid grid-cols-2 gap-5 mt-3">
              <cornie-input v-model="longitude" label="Longitude" />
              <cornie-input v-model="latitude" label="Latitude" />
              <cornie-input v-model="altitude" label="Altitude" />
              <cornie-select
                :items="['0eb0c710-665a-449c-ab27-42014d25c676']"
                v-model="managingOrg"
                label="Managing Organization"
              />
              <cornie-select
                :items="['0eb0c710-665a-449c-ab27-42014d25c676']"
                v-model="partOf"
                label="Part Of"
              />
            </div> -->
            <span
              class="
                flex
                border-b-2
                w-full
                font-semibold
                text-xl text-primary
                py-2
                mt-4
                mx-auto
              "
            >
              Available Time
            </span>
            <div class="mt-3 w-full">
              <operation-hours v-model="hoursOfOperation" />
            </div>

             <span
              class="
                flex
                border-b-2
                w-full
                font-semibold
                text-xl text-primary
                py-2
                mt-4
                mx-auto
              "
            >
             Not Available
            </span>
            <div class="w-full grid grid-cols-2 gap-5 mt-3">
              <cornie-select
                :rules="required"
                v-model="availabilityExceptions"
                :items="['X-MAS', 'SALAH']"
                label="Availability Exceptions"
              />
              <cornie-input
                :rules="required"
                v-model="openTo"
                label="Open To"
              />
              <cornie-select
                :rules="required"
                v-model="careOptions"
                label="Care Options"
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
                Cancel
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
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import PhoneInput from "@/components/phone-input.vue";
import OperationHours from "@/components/operation-hours.vue";
import IHealthcare from "@/types/IHealthcare";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";
import OrgSelect from "@/components/orgSelect.vue";

const healthcare = namespace("healthcare");

@Options({
  components: {
    CornieInput,
    CornieSelect,
    PhoneInput,
    OperationHours,
  },
})

export default class AddService extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  
  @healthcare.Action
  getHealthcareById!: (id: string) => IHealthcare;


 loading = false;
activeStates = ["yes", "No"]

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
  hoursOfOperation = "";


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
    this.coverageArea = healthcare.coverageArea;
    this.type = healthcare.type;
    this.phone = healthcare.phone;
    this.address = healthcare.address;
    this.characteristics = healthcare.characteristics;
    this.communication = healthcare.communication;
    this.photo = healthcare.photo;
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
    this.hoursOfOperation = healthcare.hoursOfOperation;
   
 }
  allaction() {
    return this.id ? "Update" : "Create New";
    }
   get payload() {
    return {
     name: this.name,
      activeState: this.activeState,
    eligibilityComment: this.eligibilityComment,
    coverageArea: this.coverageArea ,
    type: this.type,
    phone: this.phone ,
    address: this.address ,
    characteristics: this.characteristics ,
    communication: this.communication,
    photo: this.photo ,
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
   hoursOfOperation:  this.hoursOfOperation 
   
    }
   }
  
  
   async submit() {
    this.loading = true;
    if (this.id) await this.updateHealthcare();
    else await this.createHealthcare();
    this.loading = false;
  }

  async createHealthcare() {

    try {
      const response = await cornieClient().post(
        "/api/v1/healthCareServcie",
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
 
  async created() {
    this.setHealthcare();
  }

}
</script>
