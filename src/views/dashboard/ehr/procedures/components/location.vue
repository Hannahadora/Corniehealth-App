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
            Location
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
          <div v-for="(r, i) in radioValues" :key="r">
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
            v-if="selectedOption == 'location'"
            class="flex flex-col space-y-5"
          >
            <div v-if="locations.length == 0" class="font bold pt-4 text-lg">
              No Locations available
            </div>
            <div v-else v-for="c in locations">
              <div
                @click="() => (selectedId = c.id)"
                :class="`rounded-full flex px-5 py-3 cursor-pointer ${
                  selectedId == c.id ? 'bg-blue-50' : ''
                }`"
              >
                <div>{{ c.name || "Unknown" }}</div>
              </div>
            </div>
          </div>
          <div v-if="selectedOption == 'organisation'">
            <div
              @click="() => (selectedId = input.id)"
              :class="`rounded-full flex px-5 py-3 cursor-pointer`"
              v-for="(input, index) in organisation"
              :key="index"
            >
              <div
                class="flex justify-between items-center space-x-4 w-full mt-2 mb-5 p-1"
              >
                <div class="w-full flex items-center space-x-1">
                  <div class="w-10 h-10">
                    <avatar
                      class="mr-2"
                      v-if="input.image"
                      :src="input.image"
                    />
                    <avatar class="mr-2" v-else :src="localSrc" />
                  </div>
                  <div class="w-full">
                    <p class="text-sm text-dark font-semibold">
                      {{ input.name }}
                    </p>
                  </div>
                </div>

                <div class="relative bottom-1">
                  <cornie-radio
                    v-model="selectedId"
                    :value="input.id"
                    class="bg-danger focus-within:bg-danger px-6 shadow float-right"
                  />
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

    @Prop()
    locations!: any[];

    @Prop()
    organisation!: any[];

    localSrc = require("../../../../../assets/img/placeholder.png");

    radioValues = ["Location", "Organisation"];
    query = "";
    selectedOption = "";
    selectedId = "";
    selectedData = {};

    submit() {
      if (!this.selectedId) return;
      let u = this.$route.params.id.toLocaleString();

      if (this.selectedOption == "location") {
        this.selectedData = this.locations.find((x) => x.id == this.selectedId);
      }
      if (this.selectedOption == "organisation") {
        let d = this.organisation.find((x) => x.id == this.selectedId);
        this.selectedData = {
          name: d?.firstName + " " + d?.lastName,
          specialty: d?.jobDesignation,
          id: d?.id,
        };
      }

      //@ts-ignore
      this.$emit("selectedId", {
        typeData: this.selectedOption,
        ...this.selectedData,
      });
      this.show = false;
    }
  }
</script>
