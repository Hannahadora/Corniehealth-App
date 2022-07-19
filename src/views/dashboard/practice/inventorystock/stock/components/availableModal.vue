<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
          <span class="pr-2 flex items-center cursor-pointer border-r-2">
            <cornie-icon-btn @click="show = false">
            <arrow-left-icon />
            </cornie-icon-btn>
          </span>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Check Availability
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
            <div class="flex space-x-4 w-full mb-4">
                <p class="text-sm text-gray-400 w-full">Item Code</p>
                <p class="flex justify-end float-right w-full">{{ item.code }}</p>
            </div>
            <div class="flex space-x-4 w-full mb-4">
                <p class="text-sm text-gray-400 w-full">Item Name</p>
                <p class="flex justify-end float-right w-full">{{ item.name }}</p>
            </div>
            <div class="flex space-x-4 w-full mb-4">
                <p class="text-sm text-gray-400 w-full">Brand</p>
                <p class="flex justify-end float-right w-full">{{ item.brand }}</p>
            </div>
            <div class="flex space-x-4 w-full mb-4">
                <p class="text-sm text-gray-400 w-full">Form</p>
                <p class="flex justify-end float-right w-full">{{ item.form }}</p>
            </div>
            <div class="flex space-x-4 w-full mb-4">
                <p class="text-sm text-gray-400 w-full">Strength</p>
                <p class="flex justify-end float-right w-full">{{ item.strength }}</p>
            </div>
            <div class="flex space-x-4 w-full mb-4">
                <p class="text-sm text-gray-400 w-full">Pack Size</p>
                <p class="flex justify-end float-right w-full">{{ item.packSize }}</p>
            </div>

            <div v-if="stockAvaialbilty.length === 0">
            <p class="text-center font-bold">
              No Available Stock
            </p>

            </div>
            <div class="shadow-lg p-2 mb-4 flex space-x-4 rounded"  v-for="(item, index) in stockAvaialbilty" :key="index">
                <location-icon/>
                <div>
                    <p class="font-bold">{{ item.location }}</p>
                    <span class="text-gray-400 text-sm">{{ item.balance }}</span>
                </div>
            </div>
        </v-form>
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
            :loading="loading"
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
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";


import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from "@/components/icons/info.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import MainCornieSelect from "@/components/cornieselect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import NoteIcon from "@/components/icons/graynote.vue";
import DEdit from "@/components/icons/aedit.vue";
import RangeSlider from "@/components/range.vue";
import CDelete from "@/components/icons/adelete.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";

import LocationIcon from "../icons/location.vue";


@Options({
  name: "availableModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    ArrowLeftIcon,
    RangeSlider,
    DEdit,
    CDelete,
    CancelIcon,
    InfoIcon,
    CornieDialog,
    SearchIcon,
    AccordionComponent,
    IconInput,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieRadio,
    CornieBtn,
    MainCornieSelect,
    LocationIcon,
  },
})
export default class availableModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Object, default: {} })
  item!: any;

  @Prop({ type: String, default: "" })
  id!: string


  loading = false;

  stockAvaialbilty = [] as any;
 
  
      @Watch("id")
  idChanged() {
    this.fetchAvailability();
  }


  async fetchAvailability() {
    const AllLocation = cornieClient().get(
      `/api/v1/inventory/stock/availability/${this.id}`
    );
    const response = await Promise.all([AllLocation]);
    this.stockAvaialbilty = response[0].data;
  }

  
  async created() {
    if(this.id != ""){
        await this.fetchAvailability();
    }
  }
}
</script>

<style></style>
