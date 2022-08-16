<template>
  <cornie-dialog v-model="show" right class="w-2/3 h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll py-6"
    >
      <cornie-card-title class="flex items-center">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Manage Permissions
          </h2>
          <cancel-red-bg
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable mt-8">
        <div class="mb-6 w-full flex items-center">
          <sort-icon class="mr-5" />
          <span class="w-full rounded-full">
            <icon-input
              autocomplete="off"
              class="w-full border border-gray-600 rounded-full focus:outline-none"
              type="search"
              placeholder="Search Practice/Doctor"
              v-model="query"
            >
              <template v-slot:prepend>
                <search-icon />
              </template>
            </icon-input>
          </span>
        </div>

        <p class="mt-10 mb-5 font-bold text-lg">Select Health Record</p>

        <div
          class="flex items-center justify-between mb-6"
          v-for="(option, index) in options"
          :key="index"
        >
          <div class="w-1/2">
            <cornie-radio
              :label="option"
              :value="option"
              :modelValue="option[index]"
              :name="option"
            />
          </div>

          <div class="w-1/2 flex items-center">
            <div class="mr-44 flex items-center">
              <label for="" class="mr-3 text-base">View</label>
              <cornie-checkbox v-model="view" />
            </div>
            <div class="flex items-center">
              <label for="" class="mr-3 text-base">Create</label>
              <cornie-checkbox v-model="create" />
            </div>
          </div>
        </div>
      </cornie-card-text>

      <!-- <cornie-card> -->
      <div class="flex justify-end mt-16">
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
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CornieCheckbox from "@/components/custom-checkbox.vue";
import SortIcon from "@/components/icons/sort.vue";

const user = namespace("user");

type Sorter = (a: any, b: any) => number;
function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "ManagePermissions",
  components: {
    ArrowLeftIcon,
    CancelIcon,
    CornieDialog,
    CornieInput,
    CornieRadio,
    CornieBtn,
    CancelRedBg,
    CornieSelect,
    ArrowLeft,
    IconBtn,
    IconInput,
    SearchIcon,
    CornieCheckbox,
    SortIcon,
  },
})
export default class ManagePermissions extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @user.Getter
  authCurrentLocation!: any;

  view = false;
  create = true;
  option = false;

  loading = false;
  query = "";
  options = [
    "Health Trends",
    "Medical History",
    "Family History",
    "Allergies",
    "Vitals",
    "Encounter Notes",
    "Medications",
    "Diagnostics",
    "Referrals",
    "Care Teams",
    "Care Plans",
  ];

  // get locationId() {
  //   return this.authCurrentLocation;
  // }

  get locationId() {
    return "21b84341-2051-4cad-b6b6-feae04f81215";
  }

  async created() {}
}
</script>
