<template>
  <cornie-dialog v-model="show" right class="w-1/2 h-full">
    <cornie-card
      v-if="!substitute"
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll"
    >
      <cornie-card-title class="pb-6 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <icon-btn @click="show = false">
            <arrow-left stroke="#ffffff" />
          </icon-btn>
          <p class="text-3xl font-bold">{{ medication.brandCode }}</p>
        </div>

        <span
          v-if="medication.substitutionAllowed"
          class="flex items-center space-x-4 text-red-500"
          @click="substitute = true"
        >
          <substitution-allowed class="mr-2" /> Substitute
        </span>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form class="flex-grow flex flex-col" @submit="submit">
          <cornie-select
            class="w-full mt-6"
            label="Form"
            placeholder="Tablet"
            v-model="medication.form"
            :items="tablets"
            :disabled="true"
          />
          <cornie-input
            class="w-full"
            label="strength"
            v-model="medication.strength"
            :disabled="true"
          />
          <cornie-input
            class="w-full"
            label="Prescribed Quantity"
            v-model="medication.quantity"
            :disabled="true"
            :rules="required"
          />

          <cornie-select
            class="w-full mt-6"
            label="Pharmacy Supply Type"
            placeholder="--Select one--"
            v-model="supplyType"
            :items="supplyTypes"
          />

          <cornie-input
            class="w-full"
            label="Quantity"
            v-model="quantity"
            :rules="required"
          />
        </v-form>
      </cornie-card-text>

      <div class="flex items-center justify-end mt-24">
        <div class="flex items-center mb-6">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 py-1 mr-3 rounded-lg text-primary"
          >
            Save
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            type="submit"
            class="text-white bg-danger px-3 py-1 rounded-lg"
          >
            Save & Continue
          </cornie-btn>
        </div>
      </div>
    </cornie-card>

    <cornie-card
      v-if="substitute"
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll"
    >
      <cornie-card-title class="pb-6 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <icon-btn @click="show = false">
            <arrow-left stroke="#ffffff" />
          </icon-btn>
          <p class="text-3xl font-bold">Substitution</p>
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form class="flex-grow flex flex-col" @submit="submit">
          <cornie-select
            class="w-full mt-6"
            label="Prescribed medication"
            v-model="medication.brandCode"
            :items="brandCode"
            :disabled="true"
          />
          <cornie-select
            class="w-full mt-6"
            label="Type"
            placeholder="Select one"
            v-model="supplyType"
            :items="supplyTypes"
          />
          <cornie-select
            class="w-full mt-6"
            label="Reason"
            placeholder="Select one"
            v-model="reasons"
            :items="reasons"
          />

          <cornie-input
            class="w-full"
            label="Responsible Party"
            v-model="medication.responsibleParty"
            :rules="required"
          />

          <cornie-select
            class="w-full mt-6"
            label="Pharmacy Supply Type"
            placeholder="Select one"
            v-model="supplyType"
            :items="supplyTypes"
          />

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
                v-model="medQuery"
              >
                <template v-slot:prepend>
                  <search-icon />
                </template>
              </icon-input>
            </span>
            <div
              :class="[
                !showDatalist ? 'hidden' : 'o',
                medicationData.length === 0 ? 'h-20' : 'h-auto',
              ]"
              class="absolute shadow bg-white border-gray-400 border top-100 z-40 left-0 m-3 rounded overflow-auto mt-2 svelte-5uyqqj"
              style="width: 50%"
            >
              <div class="flex flex-col w-full p-3">
                <div
                  v-for="(item, i) in medicationData"
                  :key="i"
                  class="cursor-pointer mb-3 w-full border-gray-100 rounded-xl hover:bg-white-cotton-ball"
                >
                  <div class="flex items-center justify-between">
                    <div
                      class="w-full text-sm items-center p-2 border-transparent border-l-2 relative"
                    >
                      {{ item.name }}
                      <p class="text-xs text-gray-400 italic">
                        {{ item?.brandCode }}
                      </p>
                    </div>

                    <cornie-radio
                      name="search"
                      @click="selectMed(item, item.name)"
                    />
                  </div>
                </div>
              </div>
              <div v-if="medicationData.length === 0">
                <span
                  class="py-2 px-5 text-sm text-gray-600 text-center flex justify-center"
                  >No Match!</span
                >
              </div>
            </div>
          </div>
        </v-form>
      </cornie-card-text>

      <div class="flex items-center justify-end mt-24">
        <div class="flex items-center mb-6">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 py-1 mr-3 rounded-lg text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            type="submit"
            class="text-white bg-danger px-3 py-1 rounded-lg"
          >
            Substitute
          </cornie-btn>
        </div>
      </div>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieBtn from "@/components/CornieBtn.vue";
import { namespace } from "vuex-class";
import { CornieUser } from "@/types/user";
import { string } from "yup";
import AutoComplete from "@/components/autocomplete.vue";
import { cornieClient } from "@/plugins/http";
import CornieRadio from "@/components/cornieradio.vue";
import IDispenseInfo from "@/types/IDispenseInfo";

import CornieSearch from "@/components/search-input.vue";

import DatePicker from "@/components/daterangepicker.vue";
import { first, getTableKeyValue } from "@/plugins/utils";

import Substituted from "@/components/icons/substituted.vue";
import SubstitutionAllowed from "@/components/icons/substitution-allowed.vue";
import IMedication from "@/types/IMedication";
import { debounce } from "lodash";

import search from "@/plugins/search";

const hierarchy = namespace("hierarchy");
const orgFunctions = namespace("OrgFunctions");
const user = namespace("user");
const appointmentRoom = namespace("appointmentRoom");

@Options({
  name: "ModifyRequest",
  components: {
    CornieDialog,
    ...CornieCard,
    ArrowLeft,
    IconBtn,
    CornieInput,
    CornieSelect,
    CustomCheckbox,
    CornieBtn,
    AutoComplete,
    CornieRadio,
    DatePicker,
    CancelIcon,
    SubstitutionAllowed,
    CornieSearch,
    IconInput,
    SearchIcon,
  },
})
export default class ModifyRequestModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, default: "" })
  medication!: IMedication;

  required = string().required();

  loading = false;
  selectedMed = "";
  showDatalist = false;
  medicationDetails = <any>[];
  medicationData = <any>[];
  substitute = false;
  quantity = "";
  supplyType = "";
  supplyTypes = [];
  medicationInStock = [];
  newMedication = "";

  @user.Getter
  authCurrentLocation!: any;

  get locationId() {
    return this.authCurrentLocation;
  }

  async fetchMedications(query: string) {
    try {
      const { data } = await cornieClient().get(
        `/api/v1/pharmacy/find-medication/${this.locationId}/?query=${query}`
      );
      this.medicationData = data || [];
    } catch (error) {
      window.notify({
        msg: "There was an error fetching medications",
        status: "error",
      });
    }
  }

  selectMed(item: any) {
    this.$emit("selected", item);
    console.log("item", item);
    this.selectedMed = item;
    this.showDatalist = false;
  }

  @Watch("medQuery")
  typed(medQuery: string) {
    this.fetchMedications(medQuery);
  }
}
</script>

<style scoped>
td {
  padding: 16px;
}
</style>
