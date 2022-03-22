<template>
  <cornie-dialog v-model="show" center class="w-4/12 h-2/3">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
           Refill Request
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <div class="w-full">
                <div class="w-full -mt-1">
                    <span class="text-sm font-semibold mb-3">Dispense Interval</span>
                    <div class="flex space-x-2 w-full">
                        <cornie-input
                        :rules="required"
                        placeholder="--Enter--"
                        class="grow w-full"
                        :setfull="true"
                        />
                        <cornie-select
                        :items="['Years']"
                        placeholder="years"
                        class="w-32 mt-0.5 flex-none"
                        :setPrimary="true"
                        />
                    </div>
                </div>
                 <d-range-picker :label="'Start Date'" class="w-full"/>
                <cornie-input
                    class="w-full mt-4"
                    label="Quantity"
                    placeholder="Enter"
                >
                </cornie-input>
                 <div class="w-full mt-4">
                    <span class="text-sm font-semibold mb-3">Supply Duration</span>
                    <div class="flex space-x-2 w-full">
                        <cornie-input
                        :rules="required"
                        placeholder="--Enter--"
                        class="grow w-full"
                            :setfull="true"
                        />
                        <cornie-select
                        :items="['Day']"
                        placeholder="/ Day"
                        class="w-32 mt-0.5 flex-none"
                        :setPrimary="true"
                        />
                    </div>
                </div>
        </div>
      </cornie-card-text>
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
            @click="apply"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { string } from "yup";
import IAppointment from "@/types/IAppointment";

import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from "@/components/icons/info.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import MainCornieSelect from "@/components/cornieselect.vue";
import UpdateIcon from "@/components/icons/blueupdate.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CheckIcon from "@/components/icons/authcheck.vue";
import NoteIcon from "@/components/icons/graynote.vue";
import { cornieClient } from "@/plugins/http";
import DEdit from "@/components/icons/aedit.vue";
import RangeSlider from "@/components/range.vue";
import DeleteorangeIcon from "@/components/icons/deleteorange.vue";
import CDelete from "@/components/icons/adelete.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import BluecheckIcon from "@/components/icons/bluecheck.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import DatePicker from "@/components/daterangepicker.vue";
import DRangePicker from "@/components/daterangecalendar.vue";



const appointment = namespace("appointment");
@Options({
  name: "statusDialog",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    ArrowLeftIcon,
    DatePicker,
    CDelete,
    RangeSlider,
    UpdateIcon,
    DeleteorangeIcon,
    CheckIcon,
    BluecheckIcon,
    DEdit,
    DRangePicker,
    CancelIcon,
    InfoIcon,
    CornieDialog,
    SearchIcon,
    AccordionComponent,
    IconInput,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieRadio,
    CornieBtn,
    MainCornieSelect,
  },
})
export default class Medication extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  updatedBy!: string;

  @Prop({ type: String, default: "" })
  currentStatus!: string;

  @Prop({ type: String, default: "" })
  dateUpdated!: string;

  @Prop({ type: Object })
  appointments!: IAppointment;

  @appointment.Mutation
  setPatientAppointment!: ({
    appointments,
  }: {
    appointments: IAppointment[];
  }) => Promise<void>;

  status = "";
  loading = false;
  expand = false;
  isVisible = "";

  required = string().required();

  async updateStatus() {
    const id = this.id;
    const url = `/api/v1/requests/${id}`;
    const body = {
      status: this.status,
    };
    try {
      const response = await cornieClient().put(url, body);
      if (response.success) {
        window.notify({ msg: "Status Updated", status: "success" });
        this.done();
      }
    } catch (error) {
      window.notify({ msg: "Status Not Updated", status: "success" });
      this.loading = false;
    }
  }

  done() {
    this.$emit("status-added");
    this.show = false;
  }
  async apply() {
    this.loading = true;
    await this.updateStatus();
    this.loading = false;
  }

  async created() {}
}
</script>

<style>

</style>
