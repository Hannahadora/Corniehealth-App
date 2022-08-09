<template>
  <cornie-dialog v-model="show" right class="md:w-4/12 w-12/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Primary Doctor
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
            class="w-full pb-2 mb-7 border-gray-300"
          >
            <span class="text-dark text-sm font-medium"
              >Add your primary doctor</span
            >
            <div class="">
              <span
                class="mb-2 w-full rounded-full"
                @click="showDatalist = !showDatalist"
              >
                <icon-input
                  autocomplete="off"
                  class="border border-gray-400 py-2 rounded-full focus:outline-none"
                  type="search"
                  placeholder="Search by practitioner  name"
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
                    @click="selected(item)"
                    class="cursor-pointer w-full border-gray-100 rounded-xl hover:bg-white-cotton-ball"
                  >
                    <div
                      class="w-full text-sm items-center p-2 pl-2 border-transparent border-l-2 relative"
                    >
                      {{ item.firstName || item }}
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
            </div>
          </div>
          <cornie-input
            label="Doctor’s Name"
            class="w-full mb-8"
            placeholder="--Enter--/--Autoloaded--"
            v-model="name"
            :disabled="true"
          />
          <cornie-input
            label="Email Address"
            class="w-full mb-8"
            placeholder="--Enter--/--Autoloaded--"
            v-model="name"
            :disabled="true"
          />
          <div class="mb-8">
              <phone-input
                   v-model="phone.number"
                   v-model:code="phone.dialCode"
                   :rules="requiredRule"
                   label="Phone Number"
                   class="w-full"
               />
          </div>
             <cornie-input
            label="Reference Organization"
            class="w-full mb-8"
            placeholder="--Enter--/--Autoloaded--"
            v-model="name"
            :disabled="true"
          />

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
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { createDate } from "@/plugins/utils";
import { cornieClient } from "@/plugins/http";

import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import { string, date, number } from "yup";
import PhoneInput from "@/components/phone-input.vue";
import search from "@/plugins/search";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";


const practitioner = namespace("practitioner");


type Sorter = (a: any, b: any) => number;

function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "DoctorModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    PhoneInput,
    CornieDialog,
    SearchIcon,
    IconInput,
    CornieInput,
    CornieSelect,
    CornieBtn,
  },
})
export default class DoctorModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @practitioner.State
  practitioners!: IPractitioner[];

@practitioner.Action
fetchPractitioners!: () => Promise<void>;


  query = "";
  showDatalist = false;
  loading = false;
  percentage = 0;
  name = "";

  phone = {
    number: "",
    dialCode: "+234",
  };
  requiredRule = string().required();

  //Date of birth validation
  dobValidator = date().max(
    createDate(0, 0, -16),
    "Director must be at least 16yrs."
  );
  //Email Valitdaiton
  emailRule = string().email("A valid email is required").required();
  orderBy: Sorter = () => 1;

 

  get filteredItems() {
    return this.practitioners
      .filter((item: any) => this.filter(item, this.query))
      .sort(this.orderBy);
  }
  selected(item: any) {
    this.showDatalist = false;
    this.name = item.fullName;
  }

 

  get payload() {
    return {
      name: this.name,
      percentage: this.percentage,
    };
  }

  get newaction() {
    return this.id ? "Update" : "Add";
  }

  done() {
    this.show = false;
  }

  async created() {
   await this.fetchPractitioners();
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
