<template>
  <cornie-dialog v-model="show" right class="w-8/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            New Location
          </h2>
          <cancel-icon class="float-right cursor-pointer" @click="show = false" />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <div class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
              <cornie-input label="Location Name" placeholder="--Enter--" class="w-full" :modelValue="name" />
              <cornie-select class="required" :rules="required" :items="[
                'CarePlan',
                'MedicationRequest',
                'ServiceRequest',
                'ImmunizationRecommendation',
              ]" label="Location Type" placeholder="--Select--" v-model="type">
              </cornie-select>
              <cornie-select class="required" :rules="required" :items="[
                'CarePlan',
                'MedicationRequest',
                'ServiceRequest',
                'ImmunizationRecommendation',
              ]" label="Location Manager" placeholder="--Select--" v-model="manager">
              </cornie-select>
              <cornie-input label="Address" placeholder="--Enter--" class="w-full" :modelValue="address" />
              <cornie-select class="required" :rules="required" :items="[
                'CarePlan',
                'MedicationRequest',
                'ServiceRequest',
                'ImmunizationRecommendation',
              ]" label="Country" placeholder="--Select--" v-model="country">
              </cornie-select>
              <cornie-select class="required" :rules="required" :items="[
                'CarePlan',
                'MedicationRequest',
                'ServiceRequest',
                'ImmunizationRecommendation',
              ]" label="State" placeholder="--Select--" v-model="state">
              </cornie-select>
              <cornie-select class="required" :rules="required" :items="[
                'CarePlan',
                'MedicationRequest',
                'ServiceRequest',
                'ImmunizationRecommendation',
              ]" label="City" placeholder="--Select--" v-model="city">
              </cornie-select>
              <cornie-input label="Postal/Zip Code *" placeholder="--Enter--" class="w-full" :modelValue="zip" />
              <cornie-select class="required" :rules="required" :items="[
                'CarePlan',
                'MedicationRequest',
                'ServiceRequest',
                'ImmunizationRecommendation',
              ]" label="Inventory Category" placeholder="--Select--" v-model="city">
              </cornie-select>
            </div>
            <p class="flex items-center justify-start">
              + Add New Category
            </p>
          </div>
        </v-form>
      </cornie-card-text>

      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn @click="show = false" class="border-primary border-2  mr-3 rounded-xl text-primary">
            Cancel
          </cornie-btn>
          <cornie-btn :loading="loading" @click="submit" class="text-white bg-danger px-2 rounded-xl">
            Save
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
    </cornie-card>

  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { string } from "yup";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";

@Options({
  name: "Inventory Modal",
  components: {
    ...CornieCard,
    CornieDialog,
    CornieInput,
    CornieSelect,
    CornieIconBtn,
    ArrowLeftIcon,
    CancelIcon,
  }
})

export default class InventoryLocationModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;


  name = ''
  type = ''
  manager = ''
  address = ''
  country = ''
  state = ''
  city = ''
  zip = ''
  category = ''
  required = string().required();
  loading = false

  async submit() {
    this.loading = true;
    // if (this.id) await this.updateRequest();
    // else await this.createRequest();
    // this.loading = false;
    console.log('submit')
    this.loading = false
  }
}
</script>