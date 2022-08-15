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
            <span class="w-full rounded-full">
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

  // get locationId() {
  //   return this.authCurrentLocation;
  // }

  get locationId() {
    return "21b84341-2051-4cad-b6b6-feae04f81215";
  }

  async created() {}
}
</script>
