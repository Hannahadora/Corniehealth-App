<template>
  <cornie-dialog v-model="show" right class="w-1/3 h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll py-6"
    >
      <cornie-card-title class="w-full">
        <div class="w-full flex items-center justify-between">
          <h2 class="font-bold float-left text-lg text-primary">
            Add Practice
          </h2>

          <cancel-red-bg
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable mt-6">
        <p class="mb-6">Add a practice to this care team</p>
        <v-form ref="form">
          <div class="mb-6">
            <span
              class="w-full rounded-full"
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
              class="absolute shadow px-4 mx-4 bg-white border-gray-400 border top-100 z-40 left-0 m-3 rounded overflow-auto mt-2 svelte-5uyqqj"
              style="width: 90%"
            >
              <div
                v-for="(item, i) in filteredItems"
                :key="i"
                class="cursor-pointer mb-3 flex space-x-4 w-full border-gray-100 rounded-xl hover:bg-white-cotton-ball"
              >
                <cornie-radio name="search" @click="selected(item)" />
                <div
                  class="w-full text-sm items-center p-2 pl-2 border-transparent border-l-2 relative"
                >
                  {{ item?.name || item }}
                  <p class="text-xs text-gray-400 italic">
                    {{ item?.brandCode || item?.form }}
                  </p>
                </div>
              </div>
              <div v-if="filteredItems.length === 0">
                <span
                  class="py-2 px-5 text-sm text-gray-600 text-center flex justify-center"
                  >No result found!</span
                >
              </div>
            </div>
          </div>

          <cornie-select
            class="w-full"
            label="Health Record"
            placeholder="--Select--"
            v-model="practice.healthRecord"
          />

          <div class="flex justify-end">
            <cornie-btn
              @click="show = false"
              class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
            >
              Add
            </cornie-btn>
          </div>
        </v-form>
      </cornie-card-text>

      <!-- <cornie-card> -->
      <div class="flex justify-end">
        <cornie-btn
          @click="show = false"
          class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn
          :loading="loading"
          class="text-white bg-danger font-semibold px-6 rounded-xl"
        >
          Save
        </cornie-btn>
      </div>
      <!-- </cornie-card> -->
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";

import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import Tooltip from "@/components/tooltip.vue";
import TooltipIcon from "@/components/icons/formtip.vue";

const user = namespace("user");

type Sorter = (a: any, b: any) => number;
function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "addPractice",
  components: {
    CornieIconBtn,
    ...CornieCard,
    ArrowLeftIcon,
    CancelIcon,
    CornieDialog,
    CornieInput,
    CornieRadio,
    CornieBtn,
    CancelRedBg,
    CornieSelect,
    IconInput,
    SearchIcon,
    Tooltip,
    TooltipIcon
  },
})
export default class addPractice extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @user.Getter
  authCurrentLocation!: any;

  practice = {
    email: "",
    healthRecord: "",
  };
  loading = false;
  query = "";
  showDatalist = false;
  practices = <any>[];
  selectedPractices = <any>[];

  orderBy: Sorter = () => 1;

  @Watch("query")
  typed(query: string) {
    this.fetchPractice(query);
  }

  get filteredItems() {
    return this.practices
      .filter((item: any) => this.filter(item, this.query))
      .sort(this.orderBy);
  }

  async fetchPractice(query: any) {
    try {
      this.loading = true;
      const res = await cornieClient().get(
        `/api/v1/utils/practice?query=${query}`
      );
      this.loading = false;
      this.practices = res.data || [];
    } catch (error) {
      this.loading = false;
      notify({
        msg: "There was an error fetching organization",
        status: "error",
      });
    }
  }

  selected(item: any) {
    this.selectedPractices.push(item)
  }

  async created() {}
}
</script>
