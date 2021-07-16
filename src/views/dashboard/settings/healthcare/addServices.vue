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
              <button
                class="
                  w-1/4
                  rounded-full
                  font-semibold
                  p-2
                  text-white
                  border
                  bg-danger
                  mt-4
                "
                :loading="loading"
                type="submit"
              >
                Save
              </button>
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


@Options({
  components: {
    CornieInput,
    CornieSelect,
    PhoneInput,
    OperationHours,
  },
})

export default class AddService extends Vue {

 loading = false;
activeStates = ["yes", "No"]
 
}
</script>
