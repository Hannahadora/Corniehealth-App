<template>
  <cornie-dialog v-model="show" right class="w-2/6 h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll"
    >
      <cornie-card-title class="">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Item Reference
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <div class="font-bold mb-4">Reference</div>
        <div class="grid grid-cols-3 gap-3">
          <div
            v-for="(r, i) in radioValues"
            :key="r"
            :class="i == 3 ? 'col-span-2' : 'col-span-1'"
          >
            <cornie-radio
              v-model="selectedOption"
              :value="r.toLocaleLowerCase()"
              :label="r"
            />
          </div>
        </div>
        <div class="flex flex-col">
          <icon-input
            autocomplete="off"
            type="search"
            v-model="query"
            placeholder="Search"
            class="rounded-full w-full border-2 py-2 px-8 focus:outline-none"
          >
            <template v-slot:prepend>
              <search-icon />
            </template>
          </icon-input>
          <div
            v-if="selectedOption == 'condition'"
            class="flex flex-col space-y-5"
          >
            <!-- {{ selectedId }} -->
            <div v-for="c in conditions">
              <div
                @click="() => (selectedId = c.id)"
                :class="`rounded-full flex px-5 py-3 cursor-pointer ${
                  selectedId == c.id ? 'bg-blue-50' : ''
                }`"
              >
                <div class="flex flex-col w-full">
                  <div class="flex items-center">
                    <div class="">{{ printCode(c.code)?.display }} -</div>
                    <div class="font-light text-xxs">
                      {{ printDate(c.recordDate) }}
                    </div>
                  </div>
                  <div></div>
                </div>
                <div class="flex flex-col">
                  <div>
                    {{ c.practitioner.firstName }}
                  </div>
                  <div class="font-light text-xxs flex justify-end">
                    {{ c.practitioner.department }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="selectedOption === 'observation'">
            <div v-for="(input, index) in observations" :key="index">
              <div
                @click="() => (selectedId = input.id)"
                :class="`rounded-full flex px-5 py-3 cursor-pointer ${
                  selectedId == input.id ? 'bg-blue-50' : ''
                }`"
              >
                <div class="w-full">
                  <div class="w-full">
                    <p class="text-sm text-dark mb-1 font-medium">
                      {{ input }}
                    </p>
                    <!-- <p class="text-xs text-gray-300">04/09/2021, 19:45</p> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
            @click="submit"
            type="submit"
            class="text-white bg-danger px-3 py-1 rounded-lg"
          >
            Add
          </cornie-btn>
        </div>
      </div>
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
  import { Prop, PropSync } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { codes } from "../conditions/drop-downs";

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
  export default class PersonReference extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    radioValues = ["Condition", "Observation", "Media"];
    @Prop()
    conditions!: any[];

    @Prop()
    procedures!: any[];

    @Prop()
    observations!: any[];

    selectedOption = "";
    selectedId = "";
    selectedData = {};
    query = "";

    submit() {
      if (!this.selectedId) return;
      let u = this.$route.params.id.toLocaleString();
      //@ts-ignore
      this.selectedData = this.conditions.find((x) => x.id == this.selectedId);
      this.$emit("selectedId", {
        typeData: this.selectedOption,
        ...this.selectedData,
      });
      this.show = false;
    }

    printDate(e: string) {
      if (!e) return "";
      return new Date(e).toLocaleDateString();
    }

    printCode(code: string) {
      return codes.find((c) => c.code == code);
    }

    mounted() {
      console.log("condition", this.conditions);
      console.log("procedures", this.procedures);
      console.log("observation", this.observations);
    }
  }
</script>
