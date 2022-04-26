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
          <p class="text-3xl font-bold">{{ medication.genericName }}</p>
        </div>

        <span
          v-if="medication.substitutionAllowed"
          class="flex items-center space-x-4 text-red-500 cursor-pointer"
          @click="substitute = true"
        >
          <substitution-allowed class="mr-2" /> Substitute
        </span>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form class="flex-grow flex flex-col">
          <cornie-select
            class="w-full mt-6"
            label="Form"
            placeholder="--Select--"
            v-model="medication.form"
            :items="medication.form"
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
            v-model="medication.dosageInstruction"
            :disabled="true"
            :rules="required"
          />

          <cornie-select
            class="w-full mt-6"
            label="Pharmacy Supply Type"
            placeholder="--Select one--"
            v-model="supplyType"
            :items="['walk-in', 'delivery']"
          />

          <cornie-input
            class="w-full"
            label="Quantity"
            v-model="medication.quantity"
            :rules="required"
          />
        </v-form>
      </cornie-card-text>

      <div class="flex items-center justify-end mt-24">
        <div class="flex items-center mb-6">
          <cornie-btn
            @click="show = false; substitute = false;"
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
        <v-form class="flex-grow flex flex-col" @submit="substituteMed">
          <cornie-select
            class="w-full"
            label="Prescribed medication"
            v-model="medication.genericName"
            :item="medNames"
            :disabled="true"
          />
          <cornie-select
            class="w-full"
            label="Type"
            placeholder="Select one"
            v-model="medication.form"
            :items="medTypes"
          />
          <cornie-select
            class="w-full"
            label="Reason"
            placeholder="Select one"
            v-model="medication.reasonForSubstitution"
            :items="['ook', 'jjjk']"
          />

          <cornie-input
            class="w-full"
            label="Responsible Party"
            v-model="responsibleParty"
            :disabled="true"
            :rules="required"
          />

          <auto-complete
            v-bind="$attrs"
            label="Select medication to substitute with		"
            placeholder="Select one"
            v-model="medicationName"
            :rules="required"
            :items="medicationData"
            @query="fetchMedications"
          >
            <template #item="{ item }">
              <div class="w-full flex items-center justify-between my-1">
                <!-- <avatar :src="item.image" /> -->
                <div class="ml-4 flex flex-col">
                  <span class="text-xs">{{ item.name }}</span>
                  <span class="text-xs font-semibold text-gray-500">
                    {{ item.brandCode }}
                  </span>
                </div>
                 <cornie-radio name="search" @click="selected(item)" />
              </div>
            </template>
          </auto-complete>
        </v-form>
      </cornie-card-text>

      <div class="flex items-center justify-end mt-24">
        <div class="flex items-center mb-6">
          <cornie-btn
            @click="show = false; substitute = false;"
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
import { cornieClient } from "@/plugins/http";
import CornieRadio from "@/components/cornieradio.vue";
import IDispenseInfo from "@/types/IDispenseInfo";
import AutoComplete from "@/components/autocomplete.vue";

import SearchInput from "@/components/search-input.vue";

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
    SearchInput,
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

  substitute = false;

  medQuery = "";
  medNames = <any>[];
  medTypes = <any>[];
  medicationName = "";

  required = string().required();
  loading = false;
  selectedMed = "";
  
  medicationData = <any>[];
  
  quantity = "";
  supplyType = "";
  supplyTypes = [];
  medicationInStock = [];
  newMedication = "";

  @user.Getter
  authCurrentLocation!: any;

  get locationId() {
    // return this.authCurrentLocation;
    return "21b84341-2051-4cad-b6b6-feae04f81215";
  }

  get responsibleParty() {
    return "";
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

  selected(item: any) {
    console.log("item", item);
    this.selectedMed = item;
    this.medicationName = item.genericName
  }

  @Watch("medQuery")
  typed(medQuery: string) {
    this.fetchMedications(medQuery);
  }

  substituteMed() { 
    this.$emit("medicationModified", this.selectedMed);
    this.show = false;
  }
}
</script>

<style scoped>
td {
  padding: 16px;
}
</style>
