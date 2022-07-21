<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
           Service Availability
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
            <div class="mt-5">
                        <div class="flex space-x-4 w-full mb-5">
                            <p class="flex text-sm text-gray-400 float-left w-full">Item Code</p>
                            <p class="flex justify-end text-sm float-right w-full">GJ67894</p>
                        </div>
                        <div class="flex space-x-4 w-full mb-5">
                            <p class="flex text-sm text-gray-400 float-left w-full">Knee Replacement</p>
                            <p class="flex justify-end text-sm float-right w-full">Item Name</p>
                        </div>
                        <div class="flex space-x-4 w-full mb-5">
                            <p class="flex text-sm text-gray-400 float-left w-full">No of Specialists:</p>
                            <p class="flex justify-end text-sm float-right w-full">3</p>
                        </div>
            </div>
            <div class="bg-white py-3 px-4 shadow rounded-lg mb-4 flex w-full space-x-2" style="align-items: center;">
                <location-icon/>
                <div>
                    <p class="text-lg font-bold">Ikeja</p>
                    <p class="text-gray-400">Mon . Tue . Wed</p>
                </div>
            </div>
             <div class="bg-white py-3 px-4 shadow rounded-lg mb-4 flex w-full space-x-2" style="align-items: center;">
                <location-icon/>
                <div>
                    <p class="text-lg font-bold">Ikeja</p>
                    <p class="text-gray-400">Mon . Tue . Wed</p>
                </div>
            </div>
             <div class="bg-white py-3 px-4 shadow rounded-lg mb-4 flex w-full space-x-2" style="align-items: center;">
                <location-icon/>
                <div>
                    <p class="text-lg font-bold">Ikeja</p>
                    <p class="text-gray-400">Mon . Tue . Wed</p>
                </div>
            </div>
           
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
            class="text-white bg-danger px-6 rounded-xl"
           >
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
import { getDropdown } from "@/plugins/definitions";
import { Codeable } from "@/types/misc";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";

import ISpecial from "@/types/ISpecial";

import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";

import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CloseIcon from "@/components/icons/whitecancel.vue";
import Multiselect from "@vueform/multiselect";
import CornieSelect from "@/components/cornieselect.vue";
import FhirInput from "@/components/fhir-input.vue";
import SelectOption from "@/components/custom-checkbox.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import LocationIcon from "./locationicon.vue";

const special = namespace("special");
const dropdown = namespace("dropdown");

@Options({
  name: "serviceInfoModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    Multiselect,
    FhirInput,
    CornieDialog,
    SearchIcon,
    IconInput,
    CornieBtn,
    CancelIcon,
    SelectOption,
    CornieSelect,
    CloseIcon,
    AccordionComponent,
    LocationIcon
  },
})
export default class serviceInfoModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  async created() {
 
  }
}
</script>

<style>

</style>
