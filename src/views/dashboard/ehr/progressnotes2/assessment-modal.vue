<template>
  <cornie-dialog v-model="show" center class="w-2/4 h-2/3">
    <cornie-card height="100%" class="flex flex-col bg-white">
      <cornie-card-title>
        <div class="w-full flex items-center justify-between">
          <div class="w-full flex items-center">
            <span class="pr-2 flex items-center cursor-pointer border-r-2">
              <cornie-icon-btn @click="show = false">
                <arrow-left-icon />
              </cornie-icon-btn>
            </span>

            <h2 class="font-bold text-lg text-primary ml-3 -mt-0.5">
              Assessment
            </h2>
          </div>
          <delete-icon
            class="text-danger fill-current cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <div class="px-4">
        <span class="capitalize font-bold text-sm"> Reference </span>
        <span class="grid grid-cols-3 gap-2 mt-2 border-b-2 pb-3 border-dashed">
          <cornie-radio name="reference" label="Clinical Impression" />
          <cornie-radio name="reference" label="Diagnostic Reports" />
          <cornie-radio name="reference" label="Observation" />
        </span>
      </div>
      <div class="mt-2 px-4 block">
        <search-input class="" />
      </div>
      <cornie-card-text class="overflow-y-auto flex-col">
        <div class="flex items-center justify-between text-sm px-2">
          <span class="flex-col flex">
            <span>XXX-XXX-XXX</span>
            [Problem]
          </span>
          <span>
            <span class="text-gray-500">24/09/2021, 19:45</span>
          </span>
        </div>
      </cornie-card-text>
      <div class="flex justify-end mx-4 mt-auto mb-4">
        <cornie-btn
          @click="show = false"
          class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn class="text-white bg-danger px-9 rounded-xl">
          Add
        </cornie-btn>
      </div>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import { Prop, PropSync } from "vue-property-decorator";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieCard from "@/components/cornie-card";
import DeleteIcon from "@/components/icons/cancel.vue";
import CornieRadio from "@/components/cornieradio.vue";
import SearchInput from "@/components/search-input.vue";

@Options({
  name: "AssessmentModal",
  components: {
    CornieDialog,
    SearchInput,
    CornieRadio,
    ArrowLeftIcon,
    ...CornieCard,
    DeleteIcon,
  },
})
export default class AssessmentModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: false;
}
</script>
