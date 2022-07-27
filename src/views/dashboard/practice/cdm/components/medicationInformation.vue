<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
           Medication Information
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
            <accordion-component :title="'Medical Description'" :opened="true">
                <template v-slot:default>
                    <div class="mt-5">
                        <div class="flex space-x-4 w-full mb-5">
                            <p class="flex text-sm text-gray-400 float-left w-full">Form:</p>
                            <p class="flex justify-end text-sm float-right w-full">{{ selectedItem?.form }}</p>
                        </div>
                        <div class="flex space-x-4 w-full mb-5">
                            <p class="flex text-sm text-gray-400 float-left w-full">Strength:</p>
                            <p class="flex justify-end text-sm float-right w-full">{{ selectedItem?.strength}}</p>
                        </div>
                        <div class="flex space-x-4 w-full mb-5">
                            <p class="flex text-sm text-gray-400 float-left w-full">Pack Size:</p>
                            <p class="flex justify-end text-sm float-right w-full">{{ selectedItem?.pack}}</p>
                        </div>
                        <div class="flex space-x-4 w-full mb-5">
                            <p class="flex text-sm text-gray-400 float-left w-full">Manufacturer:</p>
                            <p class="flex justify-end text-sm float-right w-full">{{ selectedItem?.brand}}</p>
                        </div>
                        <div class="flex space-x-4 w-full mb-5">
                            <p class="flex text-sm text-gray-400 float-left w-full">NAFDAC Registration Number:</p>
                            <p class="flex justify-end text-sm float-right w-full">{{ selectedItem?.regNo}}</p>
                        </div>
                    </div>
               </template>
            </accordion-component>
            <accordion-component :title="'Active Ingredients'" :opened="false">
                <template v-slot:default>
                    <div class="mt-5">
                        <div class="rounded-lg w-full bg-blue-50 border-2 px-4 border-gray-200 py-4">
                            <p class="text-sm text-gray-700">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue ipsum, fringilla felis augue netus ut massa maecenas. Neque, nec ac sit tristique porta. Maecenas ante pharetra est, varius ac.
                            </p> 
                        </div>
                        
                    </div>
               </template>
            </accordion-component>
             <accordion-component :title="'Direction to Use'" :opened="false">
                <template v-slot:default>
                    <div class="mt-5">
                        <div class="rounded-lg w-full bg-blue-50 border-2 px-4 border-gray-200 py-4">
                            <p class="text-sm text-gray-700">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris arcu vel odio nascetur.
                            </p> 
                        </div>
                        
                    </div>
               </template>
            </accordion-component>
            <accordion-component :title="'Storage Information'" :opened="false">
                <template v-slot:default>
                    <div class="mt-5">
                        <div class="rounded-lg w-full bg-blue-50 border-2 px-4 border-gray-200 py-4">
                            <p class="text-sm text-gray-700" v-for="(item,index) in selectedItem.storages" :key="index">
                               {{ item?.room +','+ item?.shelf +','+ item?.rack +','+ item?.bin +',' }}
                            </p> 
                        </div>
                        
                    </div>
               </template>
            </accordion-component>
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

const special = namespace("special");
const dropdown = namespace("dropdown");

@Options({
  name: "medicationInfoModal",
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
    AccordionComponent
  },
})
export default class medicationInfoModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Object, default: {} })
  selectedItem!: any;

  @Prop({ type: String, default: "" })
  id!: string;

  async created() {
 
  }
}
</script>

<style>

</style>
