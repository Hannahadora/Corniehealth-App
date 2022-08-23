<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
           Existing Patient
          </h2>
          <!-- <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          /> -->
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form class="container" ref="form">
          <div
            class="w-full  pb-2 mb-7 border-gray-300"
          >
            <div class="">
              <span
                class="mb-2 w-full rounded-full"
                @click="showDatalist = !showDatalist"
              >
                <icon-input
                  autocomplete="off"
                  class="border border-gray-400 py-2 rounded focus:outline-blue-400"
                  type="search"
                  placeholder="Search"
                  v-model="query"
                
                >
                  <template v-slot:prepend>
                    <search-icon />
                  </template>
                </icon-input>
              </span>
              <div
                :class="[
                  !showDatalist ? 'hidden' : 'o',
                ]"
                class="absolute shadow h-auto overflow-x-hidden bg-white border-gray-400 border top-100 z-40 left-0 m-3 rounded overflow-auto mt-2 svelte-5uyqqj"
                style="width: 96%"
              >
                <div v-if="searchResults.length === 0">
                    <span
                      class="py-2 px-5 text-sm text-gray-600 text-center flex justify-center"
                      >No result found!</span
                    >
                  </div>
                <div v-else class="flex space-x-4 items-center justify-between w-full p-2">
                      <div class="flex items-center space-x-3">
                        <avatar :src="localSrc"/>
                          <div>

                            <span class="text-black text-lg mb-0">Samuel Obi</span> 
                            <p class="text-sm text-gray-500">MRN: **** **** 5645</p>
                          </div>
                      </div>
                      <div  v-if="showDrop">
                        <cornie-select
                          class="border-none w-full"
                          :items="['Spouse','Child','Parent','Relative','Other']"
                          :placeholder="'Specify Relationship'"
                        />
                      </div>
                      <div>
                        <cornie-radio name="patient" @click="showDrop = !showDrop"/>
                      </div>
                </div>
                
              </div>
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
            @click="submit"
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
import search from "@/plugins/search";
import { namespace } from "vuex-class";
import { createDate } from "@/plugins/utils";
import { string, date, number } from "yup";


import { IPatient } from "@/types/IPatient";

import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { cornieClient } from "@/plugins/http";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import PhoneInput from "@/components/phone-input.vue";
import Avatar from "@/components/avatar.vue";
import CornieRadio from "@/components/cornieradio.vue";


type Sorter = (a: any, b: any) => number;

function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "ExisitingPatient",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    PhoneInput,
    CornieDialog,
    SearchIcon,
    AccordionComponent,
    IconInput,
    CornieInput,
    CornieSelect,
    CornieBtn,
    Avatar,
    CornieRadio,
  },
})
export default class ExisitingPatient extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

 
  @Prop({ type: String, default: "" })
  id!: string;

 
  query = "";
  showDatalist = false;
  showDrop = false;
  loading = false;
  percentage = 0;
  name = "";
  localSrc = require("../../../../../assets/img/placeholder.png");
  searchResults = [];


  //Date of birth validation
  dobValidator = date().max(
    createDate(0, 0, -16),
    "Director must be at least 16yrs."
  );
  //Email Valitdaiton
  emailRule = string().email("A valid email is required").required();
  orderBy: Sorter = () => 1;

    @Watch("query")
    idChanged() {
      this.fetchPatientName(this.query);
    }


   async fetchPatientName(patientName: any) {
      const AllNotes = cornieClient().get(`/api/v1/patient-portal/association/search-patient?${patientName}`);
      const response = await Promise.all([AllNotes]);
     const info = response[0].data;
     this.searchResults = response[0].data;
     console.log({info})
    
  }

  async submit() {
 
  }


  async created() {
   
   if(this.query !=='') await this.fetchPatientName(this.query)
  }
}
</script>

<style>
.border-r-0 {
  border-right-width: 0px !important;
}
.border-l-0 {
  border-left-width: 0px !important;
}
</style>
