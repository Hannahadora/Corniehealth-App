<template>
  <cornie-dialog v-model="show" right class="w-2/6 h-full">
    <cornie-card height="100%" class="flex flex-col h-full bg-white px-6 overflow-y-scroll">
      <cornie-card-title class="">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Origin
          </h2>
          <cancel-icon class="float-right cursor-pointer" @click="show = false" />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <div class="font-bold mb-4">Reference</div>
        <div class="grid grid-cols-3 gap-3">
          <div v-for="(r, i) in radioValues" :key="r" :class="i == 3 ? 'col-span-2' : 'col-span-1'">
            <cornie-radio v-model="selectedOption" :value="r.toLocaleLowerCase()" :label="r" />
          </div>
        </div>
        <div class="flex flex-col">
          <icon-input autocomplete="off" type="search" v-model="query" placeholder="Search"
            class="rounded-full w-full border-2 py-2 px-8 focus:outline-none">
            <template v-slot:prepend>
              <search-icon />
            </template>
          </icon-input>
        </div>
      </cornie-card-text>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import AutoComplete from "@/components/autocomplete.vue";
import CornieCard from "@/components/cornie-card";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import DateTimePicker from "@/components/date-time-picker.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import IconInput from "@/components/IconInput.vue";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import PlusIcon from "@/components/icons/plus.vue";
import SearchIcon from "@/components/icons/search.vue";
import PractionerSelect from "@/components/practitioner-select.vue";
import { Options, Vue } from "vue-class-component";
import { PropSync } from "vue-property-decorator";
import { namespace } from "vuex-class";

const hierarchy = namespace("hierarchy");
const orgFunctions = namespace("OrgFunctions");
const user = namespace("user");
const appointmentRoom = namespace("appointmentRoom");
const patients = namespace("patients");
const report = namespace("diagnosticReport");

@Options({
  name: "createReport",
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
    DateTimePicker,
    CancelIcon,
    AccordionComponent,
    PlusIcon,
    PractionerSelect,
    SearchIcon,
    IconInput,
  },
})
export default class ReasonReference extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  radioValues = ["Location", "Organisation"];
  selectedOption = "";
  query = "";
}
</script>
