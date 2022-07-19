<template>
  <cornie-dialog v-model="show" right class="w-6/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
          Reason Reference
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
         <v-form ref="form">
            <div class="flex flex-col p-3 mb-7 h-96">
                <div class="border-b-2 pb-3 border-dashed">
                <label
                    class="flex capitalize mb-5 text-black text-lg  font-bold"
                    >Select
                </label>
                <div class="w-full flex space-x-4 justify-center">
                    <div class="grid grid-cols-3 gap-4 w-full">
                    <cornie-radio
                        label="Condition"
                        class="text-xs"
                        name="reference"
                        :value="'condition'"
                        v-model="refType"
                    />
                    <cornie-radio
                        label="Diagnostic Report"
                        class="text-xs"
                        name="reference"
                        :value="'report'"
                        v-model="refType"
                    />
                    <cornie-radio
                        label="Allegry Intolerance"
                        class="text-xs"
                        name="reference"
                        :value="'allergy'"
                        v-model="refType"
                    />
                    <cornie-radio
                        label="Questionnaire Response"
                        class="text-xs"
                        name="reference"
                        :value="'question'"
                        v-model="refType"
                    />
                    <cornie-radio
                        label="Observation"
                        class="text-xs"
                        name="reference"
                        :value="'observation'"
                        v-model="refType"
                    />
                    <cornie-radio
                        label="Document Reference"
                        class="text-xs"
                        name="reference"
                        :value="'document'"
                        v-model="refType"
                    />
                    </div>
                </div>
                </div>
                <div class="w-full mt-4">
                <div class="">
                    <span
                        class="mb-2 w-full rounded-full"
                        @click="showDatalist = !showDatalist"
                    >
                        <icon-input
                        autocomplete="off"
                        class="border border-gray-600 rounded-full focus:outline-none"
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
                        filteredItems.length === 0 ? 'h-20' : 'h-auto',
                        ]"
                        class="absolute shadow bg-white border-gray-400 border top-100 z-40 left-0 m-3 rounded overflow-auto mt-2 svelte-5uyqqj"
                        style="width: 96%"
                    >
                        <div class="flex flex-col w-full p-2">
                        <div
                            v-for="(item, i) in filteredItems"
                            :key="i"
                            @click="showDatalist = !showDatalist"
                            class="cursor-pointer w-full border-gray-100 rounded-xl hover:bg-white-cotton-ball"
                        >
                            <div
                            class="w-full text-sm items-center p-2 pl-2 border-transparent border-l-2 relative"
                            >
                            {{ item.category || item }}
                            </div>
                        
                        <div v-if="filteredItems.length === 0">
                            <span
                            class="py-2 px-5 text-sm text-gray-600 text-center flex justify-center"
                            >No result found!</span
                            >
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="overflow-y-auto h-96">
                  <div>
                      <div v-if="refType == 'condition'">
                        <div v-for="(input, index) in conditions" :key="index">
                        <div
                            class="w-full mt-2 p-3 hover:bg-gray-100 cursor-pointer"
                            :class="{ 'bg-gray-100': isSelected(input) }"
                            @click="pushValue(input)"
                        >
                            <div class="w-full">
                            <div class="w-full">
                                <p class="text-sm text-dark mb-1 font-medium">
                                {{ medicationMapper(input.type) }}
                                </p>
                                <p class="text-xs text-gray-300">{{new Date(input.createdAt).toLocaleDateString()}}, {{new Date(input.createdAt).toLocaleTimeString()}}</p>
                            </div>
                            </div>
                        </div>
                        </div>
                      </div>
                  </div>
                  <div v-if="refType == 'allergy'">
                      <div v-for="(input, index) in allergys" :key="index">
                      <div
                          class="w-full mt-2 p-3 hover:bg-gray-100 cursor-pointer"
                         :class="{ 'bg-gray-100': isSelected(input) }"
                          @click="pushValue(input)"
                      >
                          <div class="w-full flex space-x-4">
                              <div class="w-full">
                                  <p class="text-sm text-dark mb-1 font-meduim">
                                  {{ input.category }}
                                  </p>
                                  <p class="text-xs text-gray-300">
                                  {{ new Date(input.createdAt).toLocaleDateString() }}
                                  , {{ new Date(input.createdAt).toLocaleTimeString() }}
                                  </p>
                              </div>
                              <div class="w-full flex justify-end">
                                  <p class="mt-4">{{ getPractitionerName(input.practitionerId)}}</p>
                                  <avatar
                                      class="mr-2 h-14 w-14"
                                      v-if="getPractitonerImage(input.practitionerId)"
                                      :src="getPractitonerImage(input.practitionerId)"
                                      />
                                      <avatar class="mr-2" v-else :src="localSrc" />
                              </div>
                          </div>
                      </div>
                      </div>
                  </div>
                   <div v-if="refType == 'observation'">
                      <div v-for="(input, index) in observations" :key="index">
                      <div
                          class="w-full mt-2 p-3 hover:bg-gray-100 cursor-pointer"
                          :class="{ 'bg-gray-100': isSelected(input) }"
                          @click="pushValue(input)"
                      >
                          <div class="w-full">
                          <div class="w-full">
                              <p class="text-sm text-dark mb-1 font-medium">
                              {{ input?.basicInfo?.subject }}
                              </p>
                              <p class="text-xs text-gray-300">{{new Date(input.createdAt).toLocaleDateString()}}, {{new Date(input.createdAt).toLocaleTimeString()}}</p>
                          </div>
                          </div>
                      </div>
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
            class="border-primary border-2  mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
             @click="show = false"
            class="text-white bg-danger px-2 rounded-xl"
           >
            Add
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
    </cornie-card>


  </cornie-dialog>
</template>

<script lang="ts">
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import { string } from "yup";
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { mapDisplay } from "@/plugins/definitions";

import IAllergy from "@/types/IAllergy";
import { ICondition } from "@/types/ICondition";
import IPractitioner from "@/types/IPractitioner";

import AccordionComponent from "@/components/form-accordion.vue";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CloseIcon from "@/components/icons/whitecancel.vue";
import CornieSelect from "@/components/cornieselect.vue";
import Avatar from "@/components/avatar.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import SelectOption from "@/components/custom-checkbox.vue";
import CornieRadio from "@/components/cornieradio.vue";
import Ihistory from "@/types/Ihistory";

const allergy = namespace("allergy");
const condition = namespace("condition");
const practitioner = namespace("practitioner");

type Sorter = (a: any, b: any) => number;

function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}


@Options({
  name: "ReasonReference",
  components: {
    ...CornieCard,
    AccordionComponent,
    CornieIconBtn,
    ArrowLeftIcon,
    CancelIcon,
    CornieDialog,
    CornieRadio,
    Avatar,
    SelectOption,
    SearchIcon,
    DeleteIcon,
    IconInput,
    CornieBtn,
    CornieSelect,
    CloseIcon,
  },
})
export default class ReasonReference extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @Prop({ type: String, default: "" })
    id!: string;

    @Prop({ type: Function, default: defaultFilter })
    filter!: (item: any, query: string) => boolean;

    @practitioner.State
    practitioners!: IPractitioner[];

    @practitioner.Action
    fetchPractitioners!: () => Promise<void>;

    
    @allergy.State
    allergys!: any[];

    @allergy.Action
    fetchAllergys!: (patientId: string) => Promise<void>;

    @condition.Action
    fetchPatientConditions!: (patientId: string) => Promise<void>;

  
  @condition.State
  conditions!: ICondition[];


    orderBy: Sorter = () => 1;
    loading = false;
    showDatalist = false;
    clickedBg = false;
    refType = "allergy";
    query = "";
    localSrc = require("../../../../assets/img/placeholder.png");
    observations = [] as any;
    clickedId = "";


    medicationMapper = (code: string) => "";

    async createMapper() {
      this.medicationMapper = await mapDisplay(
        "http://hl7.org/fhir/ValueSet/condition-stage-type"
      );
    }

    
     isSelected(impression: any) {
        return impression.id === this.clickedId;
    }


    get filteredItems() {
        return this.allergys
        .filter((item: any) => this.filter(item, this.query))
        .sort(this.orderBy);
    }

    get activepatientId() {
        const id = this.$route?.params?.id as string;
        return id;
    }

    getPractitionerName(id: string) {
        const pt = this.practitioners.find((i: any) => i.id === id);
        return pt ? `${pt.firstName} ${pt.lastName}` : "";
    }

    getPractitonerImage(id: string) {
        const pt = this.practitioners.find((i: any) => i.id === id);
        return pt ? `${pt.image}` : "";
    }

 

    async submit(){

    }

    pushValue(item:any){
        this.$emit("ref-value", item, this.refType);
        this.clickedId = item.id
        this.clickedBg = !this.clickedBg;
    }

      async fetchObservations() {
        try {
          const { data } = await cornieClient().get(
            `/api/v1/observations/`
          );
          this.observations = data;
        } catch (error) {
          window.notify({
            msg: "There was an error when fetching observations",
            status: "error",
          });
        }
      }

    
  done() {
        this.$emit("medication-added");
        this.show = false;
  }

  async created() {
    await this.createMapper();
    await this.fetchAllergys(this.$route?.params?.id as string);
    await this.fetchPatientConditions(this.activepatientId);
    await this.fetchPractitioners();
    await this.fetchObservations();

  }
}
</script>
<style>
.dflex {
  display: -webkit-box;
}
</style>
