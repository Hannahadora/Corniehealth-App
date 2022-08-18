<template>
  <cornie-dialog v-model="show" right class="w-5/12 h-full">
    <cornie-card height="100%" class="flex flex-col bg-white">
      <cornie-card-title>
        <div class="w-full flex items-center justify-between">
          <div class="w-full flex items-center">
            <span class="pr-2 flex items-center cursor-pointer border-r-2">
              <cornie-icon-btn @click="show = false">
                <arrow-left-icon />
              </cornie-icon-btn>
            </span>

            <h2 class="font-bold text-lg text-primary ml-3 -mt-0.5">Problem</h2>
          </div>
          <delete-icon
            class="text-danger fill-current cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <div class="flex flex-col p-3 mb-7">
          <div class="border-b-2 pb-3 border-dashed">
            <label
              for="ecounter"
              class="flex capitalize mb-5 text-black text-sm font-bold"
              >Reference
            </label>
            <div class="w-full flex space-x-4">
              <cornie-radio
                label="Condition"
                class="text-xs"
                name="practice"
                value="condition"
                v-model="type"
              />
              <cornie-radio
                label="Allergy Intolerance"
                class="text-xs"
                name="role"
                value="allergy"
                v-model="type"
              />
            </div>
          </div>
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
                 :class="{ 'bg-gray-100' : selected === item }"
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
              <div v-if="type === 'condition'">
                <div v-for="(input, index) in conditions" :key="index">
                  <div
                  :class="{ 'bg-gray-100' : selected === input }"
                    class="w-full mt-2 p-3 hover:bg-gray-100 cursor-pointer"
                    @click="getValue(input)"
                  >
                    <div class="w-full flex items-center justify-between">
                      <div class="w-full">
                        <p
                          class="capitalize text-sm text-dark mb-1 font-medium"
                        >
                          {{ codeMapper(input.code) }}
                        </p>
                        <p
                          class="capitalize text-sm text-dark mb-1 font-medium"
                        >
                          {{ severityMapper(input.severity) }}
                        </p>
                        <p class="capitalize text-xs text-gray-300">
                          {{
                            new Date(input?.recordDate).toLocaleDateString(
                              "en-GB"
                            )
                          }}
                        </p>
                      </div>

                      <div>
                        <p class="capitalize text-sm">
                          <span>{{ input?.practitioner?.firstName }} </span>
                          <span>{{ input?.practitioner?.lastName }}</span>
                        </p>
                        <p class="capitalize text-xs text-gray-300">
                          {{ input?.practitioner?.jobDesignation }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="type === 'allergy'">
              <div v-for="(input, index) in allergys" :key="index">
                <div
                :class="{ 'bg-gray-100' : selected === input }"
                  class="w-full mt-2 p-3 hover:bg-gray-100 cursor-pointer"
                  @click="getValue(input)"
                >
                  <div class="w-full flex items-center justify-between">
                    <div class="w-full">
                      <p class="capitalize text-sm text-dark mb-1 font-meduim">
                        {{ codeMapper(input.code) }} {{ input.category }}
                      </p>
                      
                      <p class="capitalize text-xs text-gray-300">
                        {{
                          new Date(input?.recordDate).toLocaleDateString(
                            "en-GB"
                          )
                        }}
                      </p>
                    </div>

                    <div>
                      <p class="capitalize text-sm text-dark mb-1 font-medium">
                        {{ input.criticality }}
                      </p>
                      <p class="capitalize text-xs text-gray-300">
                        {{ input.type }}
                      </p>
                    </div>

                    <!-- <div>
                      <p class="capitalize text-sm">
                        <span>{{
                          findPractitionerName(input?.practitionerId)
                        }}</span>
                      </p>
                      <p class="capitalize text-xs text-gray-300">
                        {{ findPractitionerSpecialty(input?.practitionerId) }}
                      </p>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </cornie-card-text>

      <cornie-card-text class="flex justify-end">
        <cornie-btn
          @click="show = false"
          class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn
          :loading="loading"
          @click="apply"
          class="text-white bg-danger px-6 rounded-xl"
        >
          Update
        </cornie-btn>
      </cornie-card-text>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import search from "@/plugins/search";
import CornieDialog from "@/components/CornieDialog.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieCard from "@/components/cornie-card";
import DeleteIcon from "@/components/icons/cancel.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import DatePicker from "@/components/datepicker.vue";
import { string } from "yup";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import SearchIcon from "@/components/icons/search.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieBtn from "@/components/CornieBtn.vue";

import Problem from "@/types/IImpression";
import { ICondition } from "@/types/ICondition";
import IAllergy from "@/types/IAllergy";

import { mapDisplay } from "@/plugins/definitions";

type Sorter = (a: any, b: any) => number;

function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}


@Options({
  name: "ProblemDialog",
  components: {
    CornieDialog,
    ArrowLeftIcon,
    CornieIconBtn,
    DatePicker,
    ...CornieCard,
    CornieSelect,
    CornieInput,
    DeleteIcon,
    SearchIcon,
    CornieRadio,
    CornieBtn,
  },
})
export default class ProblemDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @Prop({ type: Array, default: [] })
  conditions!: ICondition[];

  @Prop({ type: Array, default: [] })
  allergys!: IAllergy[];

  @Prop({ type: Array, default: [] })
  practitioners!: any[];

  severityMapper = (code: string) => "";
  codeMapper = (code: string) => "";

  orderBy: Sorter = () => 1;
  loading = false;
  expand = false;
  isVisible = "";
  showDatalist = false;
  clickedBg = false;
  selected = <any>{};

  query = "";
  checkProblem = <any>{};
  problemCode = "";
  type = "condition";

  required = string().required();

  async loadMappers() {
    this.severityMapper = await mapDisplay(
      "http://hl7.org/fhir/ValueSet/condition-severity"
    );
    this.codeMapper = await mapDisplay(
      "http://hl7.org/fhir/ValueSet/condition-code"
    );
  }

  get filteredItems() {
    return this.allergys
      .filter((item: any) => this.filter(item, this.query))
      .sort(this.orderBy);
  }

  getValue(value: any) {
    this.selected = value
    if (this.type === "condition") {
      this.checkProblem.referenceType = this.type;
      this.checkProblem.referenceId = value.id;
      this.checkProblem.practitioner = `${value.practitioner?.firstName} ${value.practitioner?.lastName}`;
      this.checkProblem.practitionerSpecialty =
        value.practitioner?.jobDesignation;
      this.checkProblem.description = this.codeMapper(value.code);
      this.checkProblem.details = this.severityMapper(value.severity);
    } else if (this.type === "allergy") {
      this.checkProblem.referenceType = this.type;
      this.checkProblem.referenceId = value.id;
      this.checkProblem.practitioner = this.findPractitionerName(
        value?.practitionerId
      );
      this.checkProblem.practitionerSpecialty = this.findPractitionerSpecialty(
        value?.practitionerId
      );
      this.checkProblem.description =
        this.codeMapper(value.code) + "-" + value.category;
      this.checkProblem.details = value.criticality;
    }
  }

  findPractitionerName(id: any) {
    const p = this.practitioners?.find((el: any) => {
      el.id === id;
    });
    return `${p?.firstName} ${p?.lastName}` || "";
  }

  findPractitionerSpecialty(id: any) {
    const p = this.practitioners?.find((el: any) => {
      el.id === id;
    });
    return `${p?.jobDesignation}` || "";
  }

  apply() {
    this.$emit("getProblem", this.checkProblem);
    this.show = false;
    this.checkProblem = {};
  }

  async created() {
    this.loadMappers();
  }
}
</script>
