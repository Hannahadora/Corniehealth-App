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
            Add Occurence
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
          <div>
               <div class="">
                    <date-time-picker :label="'DateTime'" />
                  </div>
          </div>
          <div class="flex justify-end w-full mt-5">
                <span class="text-danger text-sm"> <span class="text-xl">+</span> Add Occurence</span>
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

import ICatalogueService, { ICatalogueProduct } from "@/types/ICatalogue";

import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import DateTimePicker from "@/components/date-time-picker.vue";

const catalogue = namespace("catalogues");
const user = namespace("user");

interface Result extends ICatalogueProduct {
  display: string;
}

@Options({
  name: "itemModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
   DateTimePicker,
  },
})
export default class itemModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;


  loading = false;


  query = "";

  async created() {
  
  }
}
</script>

<style></style>
