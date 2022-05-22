<template>
  <cornie-dialog v-model="show" right class="w-1/2 h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll"
    >
      <cornie-card-title class="">
        <icon-btn class="cursor-pointer" @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3">Create New</h2>
          <cancel-icon class="float-right cursor-pointer mt-1" @click="show = false" />
        </div>
      </cornie-card-title>
      <cornie-card-text>
        <v-form class="flex-grow flex flex-col">
          <accordion-component
            class="rounded-none border-none text-primary"
            title="Basic info"
            :opened="false"
          >
          </accordion-component>
        </v-form>
      </cornie-card-text>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import CornieCard from "@/components/cornie-card";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieSelect from "@/components/cornieselect.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import AddIcon from "@/components/icons/plus.vue";
import DateTimePicker from "@/views/dashboard/schedules/components/datetime-picker.vue";
import { Options, Vue } from "vue-class-component";
import { PropSync } from "vue-property-decorator";
import ItemReference from "./item-reference.vue";
import items from "./items.vue";
import problem from "./problem.vue";

@Options({
  components: {
    CornieDialog,
    ...CornieCard,
    ArrowLeft,
    CancelIcon,
    AddIcon,
    DateTimePicker,
    AccordionComponent,
    problem,
    CornieSelect,
    items,
    ItemReference,
  },
})
export default class NewProgressNote extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  showProblemModal = false;
  showItemsModal = false;
  showItemReference = false;

  date = "23/04/2022";
  time = "";
  code = "";
  assessment = {
    protocol: "",
    summary: "",
  };
}
</script>
