<template>
  <cornie-dialog v-model="show" right class="w-2/6 h-full">
    <cornie-card height="100%" class="flex flex-col h-full bg-white px-6 overflow-y-scroll">
      <cornie-card-title class="">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">Person</h2>
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
          <div v-if="selectedOption == 'practitioner'">
            <div v-for="item in items" class="flex flex-col space-y-10">
              <div class="w-full flex items-center my-1 justify-between">
                <!-- <div class="flex items-center">
                  <avatar :src="item.image" />
                  <div class="flex ml-1 flex-col">
                    <span class="text-xs">{{ item.display }}</span>
                  </div>
                </div>
                <span class="text-xs font-semibold text-gray-500">
                  {{ item.department }}
                </span> -->
                <div class="flex w-full items-center space-x-4">
                  <div class="flex-none w-10 h-10">
                    <avatar :src="item.image" />
                  </div>
                  <div class="flex-1 flex-col space-y-1">
                    <div class="flex flex-col">
                      <span class="text-xs">{{ item.display }}</span>
                    </div>
                    <div class="text-xxs font-semibold text-gray-500">
                      {{ item.department }}
                    </div>
                  </div>
                  <div class="flex-none">
                    <cornie-radio v-model="selectedId" :value="item.id" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </cornie-card-text>
      <div class="flex items-center justify-end mt-24">
        <div class="flex items-center mb-6">
          <cornie-btn @click="show = false" class="border-primary border-2 px-6 py-1 mr-3 rounded-lg text-primary">
            Cancel
          </cornie-btn>
          <cornie-btn @click="submit" type="submit" class="text-white bg-danger px-3 py-1 rounded-lg">
            Add
          </cornie-btn>
        </div>
      </div>

    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import AutoComplete from "@/components/autocomplete.vue";
import Avatar from "@/components/avatar.vue";
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
import { printPractitioner } from "@/plugins/utils";
import IPractitioner from "@/types/IPractitioner";
import { Options, Vue } from "vue-class-component";
import { PropSync } from "vue-property-decorator";
import { namespace } from "vuex-class";



const practitioners = namespace("practitioner");


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
    Avatar,
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

  radioValues = ["Practitioner", "Practitioner Role", "Related Person"];
  selectedOption = "";
  selectedId = "";
  selectedData: any = []
  query = "";

  @practitioners.State
  practitioners!: IPractitioner[];

  @practitioners.Action
  fetchPractitioners!: () => Promise<void>;


  get items() {
    return this.practitioners.map((practitioner) => ({
      ...practitioner,
      code: practitioner.id,
      display: printPractitioner(practitioner),
    }));
  }
  submit() {
    if (!this.selectedId) return
    this.selectedData = this.practitioners.find(x => x.id == this.selectedId)
    this.$emit('selectedId', { ...this.selectedData, name: printPractitioner(this.selectedData) })
    this.show = false
  }

  created() {
    if (!this.practitioners?.length) this.fetchPractitioners();
  }

}
</script>
