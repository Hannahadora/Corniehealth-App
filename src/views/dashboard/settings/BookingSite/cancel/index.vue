<template>
  <div class="h-screen flex justify-center">
    <div class="bg-white w-full shadow-md p-4">
      <div>
        <div class="w-full flex items-center justify-between mt-3">
          <div class="">
            <p class="text-sm mt-3 text-black">
              Patients will be able to see your cancellation notice when they
              book appointments online and when they receive appointment
              notification emails.
            </p>
          </div>
          <div
            class="flex space-x-4 text-primary font-semibold text-sm mt-3 cursor-pointer"
          >
            <edit-icon class="fill-current text-primary mr-4" /> Edit
          </div>
        </div>
      </div>
      <div class="w-full mb-14">
        <label
          for="ecounter"
          class="w-full capitalize text-black text-sm font-bold mt-8"
          >Cancellation Notice
          <span class="text-xs text-red-600 font-medium italic"
            >(Max. of 300 characters)</span
          ></label
        >
        <div class="mt-1">
          <Textarea
            class="w-full text-xs"
            placeholder="Start typing..."
            v-model="message"
          />
        </div>
        <div>
          <span>Refund Policy</span>
          <div class="grid grid-cols-3 gap-4 w-full">
             <div class="flex space-x-2 w-full">
                <cornie-input
                  label="Cancellation Timeframe"
                  placeholder="0"
                  v-model="cancellationTimeFrame"
                  class="grow w-full"
                  type="number"
                  :setfull="true"
                />
                <cornie-select
                  :items="['Hrs']"
                  placeholder="Hrs"
                  class="w-20 mt-3 flex-none"
                  :setPrimary="true"
                  v-model="cancellationTimeFrameUnit"
                />
              </div>
               <div class="flex space-x-2 w-full">
                <cornie-input
                  label="Late Cancellation Penalty"
                  placeholder="0"
                  v-model="lateCancellationPenalty"
                  class="grow w-full"
                  :setfull="true"
                   type="number"
                />
                <cornie-select
                  :items="['%']"
                  placeholder="%"
                  class="w-20 mt-3 flex-none"
                  :setPrimary="true"
                  v-model="lateCancellationPenaltyUnit"
                />
              </div>
               <div class="flex space-x-2 w-full">
                <cornie-input
                  label="No Show of Penalty"
                  placeholder="0"
                  v-model="noShowPenalty"
                  class="grow w-full"
                  :setfull="true"
                   type="number"
                />
                <cornie-select
                  :items="['%']"
                  placeholder="%"
                  class="w-20 mt-3 flex-none"
                  :setPrimary="true"
                  v-model="noShowPenaltyUnit"
                />
              </div>

          </div>
        </div>
      </div>
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="message = ''"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="submit"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import PhoneInput from "@/components/phone-input.vue";
import ILocation, { HoursOfOperation } from "@/types/ILocation";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";
import { getCoordinates } from "@/plugins/utils";
import { getCountries, getStates } from "@/plugins/nation-states";
import AutoComplete from "@/components/autocomplete.vue";
import Textarea from "@/components/textarea.vue";
import EditIcon from "@/components/icons/aedit.vue";
import CalendarIcon from "@/components/icons/calendar.vue";
import DateTimePicker from "@/components/datetime-picker.vue";
import CornieTextArea from "@/components/textarea.vue";
import ICancel from "@/types/ICancel";
import TooltipSection from "@/components/tooltip.vue";

const cancel = namespace("cancel");
const location = namespace("location");

@Options({
  components: {
    CornieInput,
    AutoComplete,
    CornieSelect,
    PhoneInput,
    Textarea,
    EditIcon,
    CalendarIcon,
    DateTimePicker,
    CornieTextArea,
    TooltipSection,
  },
})
export default class Cancellation extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  canceId!: string;

  @cancel.Action
  fetchCancels!: () => Promise<void>;

  @cancel.State
  cancels!: ICancel[];

  @cancel.Action
  getCancelById!: (id: string) => ICancel;

  @Watch("canceId")
  idChanged() {
    this.setCancel();
  }

  message = "";
  loading = false;
  cancellationTimeFrame = 0;
  cancellationTimeFrameUnit = "Hrs";
  lateCancellationPenaltyUnit = "%";
  lateCancellationPenalty = 0;
  noShowPenalty = 0;
  noShowPenaltyUnit = "%";

  async setCancel() {
    const cancel = await this.getCancelById(this.cancellationId);
    if (!cancel) return;
    this.message = cancel.message;
    (this.cancellationTimeFrame as any) = cancel.cancellationTimeFrame;
    (this.lateCancellationPenaltyUnit as any) = cancel.lateCancellationPenaltyUnit;
    (this.lateCancellationPenalty as any) = cancel.lateCancellationPenalty;
    (this.noShowPenalty as any) = cancel.noShowPenalty;
    (this.noShowPenaltyUnit as any) = cancel.noShowPenaltyUnit;
  }
  get items() {
    return this.cancels.find((cancel) => cancel.id);
  }

  get cancellationId(){
    return this.items?.id as string;
  }
  get payload() {
    return {
      message: this.message,
      cancellationTimeFrame: +this.cancellationTimeFrame,
      cancellationTimeFrameUnit: this.cancellationTimeFrameUnit,
      lateCancellationPenalty: +this.lateCancellationPenalty,
      noShowPenalty: +this.noShowPenalty,
    };
  }

  async submit() {
    this.loading = true;
    await this.createCancel();
    this.loading = false;
  }

  async createCancel() {
    try {
      const response = await cornieClient().post(
        "/api/v1/cancellations-policy",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Cancellations Saved", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Cancellations not Saved", status: "error" });
    }
  }

  async updateLocation() {
    const url = `/api/v1/cancellations-policy/${this.id}`;
    const payload = { ...this.payload, id: this.id };
    try {
      const response = await cornieClient().put(url, payload);
      window.notify({ msg: "Cancellations Updated", status: "success" });
    } catch (error) {
      window.notify({ msg: "Cancellations not Updated", status: "error" });
    }
  }

  async created() {
    this.setCancel();
    await this.fetchCancels();
  }
}
</script>

<style scoped>
input[type="time"]::-webkit-calendar-picker-indicator {
  background: none;
  display: none;
}
</style>
