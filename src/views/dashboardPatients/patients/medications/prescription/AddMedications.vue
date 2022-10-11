<template>
  <div>
    <v-form ref="form">
      <div class="">
        <div class="mt-6">
          <span
            class="mb-2 w-full rounded-full"
            @click="showDatalist = !showDatalist"
          >
            <icon-input
              autocomplete="off"
              class="border py-2 border-gray-600 rounded-full focus:outline-none"
              type="search"
              placeholder="Search and add"
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

            <div class="flex justify-end">
              <cornie-btn
                @click="showDatalist = false"
                class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
              >
                Cancel
              </cornie-btn>
              <cornie-btn
                v-if="filteredItems.length > 0"
                :loading="loading"
                @click="submit"
                class="text-white bg-danger font-semibold px-6 rounded-xl"
              >
                Add
              </cornie-btn>
            </div>
          </div>
        </div>
      </div>
    </v-form>

    <!-- <cornie-card> -->
  </div>
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
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";

const user = namespace("user");

type Sorter = (a: any, b: any) => number;
function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "addMedications",
  components: {
    CornieIconBtn,
    ArrowLeftIcon,
    CancelIcon,
    CornieDialog,
    SearchIcon,
    IconInput,
    CornieRadio,
    CornieBtn,
    CancelRedBg,
  },
})
export default class addMedications extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @user.Getter
  authCurrentLocation!: any;

  medicationId = "";
  // chosenMedications = [] as any;
  chosenMedication = {} as any;

  medicationDetails = [] as any;
  query = "";
  showDatalist = false;
  loading = false;

  selected(value: any) {
    // this.chosenMedications.length > 0 && this.chosenMedications.find((el: any) => {
    //   if ((el.id = value.id)) {
    //     return;
    //   } else {
    //     this.chosenMedications.push(value);
    //   }
    // });
    //  this.chosenMedications.push(value);
    this.chosenMedication = value;
  }

  // get locationId() {
  //   return this.authCurrentLocation;
  // }

  get locationId() {
    return "21b84341-2051-4cad-b6b6-feae04f81215";
  }

  submit() {
    this.$emit("addMedication", this.chosenMedication);
    // this.chosenMedications = [];
    this.show = false;
  }

  orderBy: Sorter = () => 1;

  get filteredItems() {
    return this.medicationDetails
      .filter((item: any) => this.filter(item, this.query))
      .sort(this.orderBy);
  }
  async fetchMedications(
    query?: string,
    pharmacies?: string,
    classifications?: string,
    subClassifications?: string,
    locations?: string
  ) {
    try {
      const { data } = await cornieClient().get(
        `/patient-portal/catalogue-product/search-catalogue?query=${query}&pharmacies=${pharmacies}&classifications=${classifications}&subClassifications=${subClassifications}&locations=${locations}`
      );
      this.medicationDetails = data || [];
    } catch (error) {
      window.notify({
        msg: "There was an error fetching medications",
        status: "error",
      });
    }
  }

  @Watch("query")
  typed(query: string) {
    this.fetchMedications(query);
  }

  async created() {}
}
</script>
