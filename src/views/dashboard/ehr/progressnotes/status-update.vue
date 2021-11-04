<template>
  <cornie-dialog v-model="show" center class="w-5/12 h-2/3">
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
              Update Status
            </h2>
          </div>
          <delete-icon
            class="text-danger fill-current cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="overflow-y-auto">
        <div class="flex rounded-md cursor-pointer">
          <span
            @click="active = 'clinical'"
            :class="{ 'bg-primary text-white': active == 'clinical' }"
            class="flex-grow rounded-l-md block p-3"
          >
            Clinical Status
          </span>
          <span
            @click="active = 'verification'"
            :class="{ 'bg-primary text-white': active == 'verification' }"
            class="flex-grow py-3 pr-3 rounded-r-md block pl-8"
          >
            Verification Status
          </span>
        </div>
        <v-form>
          <div class="grid grid-cols-1 gap-3 mt-2">
            <cornie-input disabled label="Current Status" class="w-full" />
            <cornie-input disabled label="Updated By" class="w-full" />
            <date-picker disabled label="Date Last Updated" />
            <cornie-select
              label="Update Status"
              :items="statuses"
              class="w-full"
            />
          </div>
        </v-form>
      </cornie-card-text>
      <div class="flex justify-end mx-4 mt-auto mb-4">
        <cornie-btn
          @click="showHistory = true"
          class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
        >
          View History
        </cornie-btn>
        <cornie-btn class="text-white bg-danger px-9 rounded-xl">
          Update
        </cornie-btn>
      </div>
    </cornie-card>
    <status-history v-model="showHistory" :active="active" />
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import { PropSync } from "vue-property-decorator";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieCard from "@/components/cornie-card";
import DeleteIcon from "@/components/icons/cancel.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import DatePicker from "@/components/datepicker.vue";
import { verificationStatuses, clinicalStatuses } from "./drop-downs";
import StatusHistory from "./status-history.vue";

@Options({
  name: "StatusUpdate",
  components: {
    CornieDialog,
    StatusHistory,
    ArrowLeftIcon,
    DatePicker,
    ...CornieCard,
    CornieSelect,
    CornieInput,
    DeleteIcon,
  },
})
export default class StatusUpdate extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  showHistory = false;

  active = "clinical";

  get statuses() {
    return this.active == "clinical" ? clinicalStatuses : verificationStatuses;
  }
}
</script>
