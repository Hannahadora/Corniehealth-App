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
            :rules="required"
            v-model="message"
          />
        </div>
      </div>
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
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
  },
})
export default class Cancellation extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

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
  cancelId = "";
  loading = false;

  async setCancel() {
    const cancel = await this.getCancelById(this.items as any);
    if (!cancel) return;
    this.message = cancel.message;
  }
  get items() {
    return this.cancels.map((cancel) => {
      return (this.cancelId = cancel.id as string);
    });
  }
  get payload() {
    return {
      message: this.message,
    };
  }

  async submit() {
    this.loading = true;
    await this.createCancel();
    // if (this.id) await this.updateLocation();
    // else await this.createCancel();
    this.loading = false;
  }

  async createCancel() {
    try {
      const response = await cornieClient().post(
        "/api/v1/cancellations",
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
    const url = `/api/v1/location/${this.id}`;
    const payload = { ...this.payload, id: this.id };
    try {
      const response = await cornieClient().put(url, payload);
      window.notify({ msg: "Location Updated", status: "success" });
    } catch (error) {
      window.notify({ msg: "Location not Updated", status: "error" });
    }
  }

  async created() {
    await this.setCancel();
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
