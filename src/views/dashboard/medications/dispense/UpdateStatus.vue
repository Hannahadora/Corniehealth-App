<template>
  <cornie-dialog v-model="show" center class="w-4/12 h-2/3">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Update Status
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <div class="w-full">
          <div class="container content-con">
            <div class="w-full py-3">
              <cornie-input
                disabled
                label="Current Status"
                v-model="currentStatus"
                class="w-full mb-4"
              />
              <cornie-input
                disabled
                label="Updated By"
                class="w-full mb-4"
                v-model="updatedBy"
              />
              <cornie-input
                disabled
                label="Date Last Updated"
                class="w-full mb-4"
                v-model="xUpdatedAt"
              />

              <cornie-select
                :label="'New Status'"
                v-model="status"
                :items="[
                  'Draft',
                  'Active',
                  'On-hold',
                  'Cancelled',
                  'Dispensed',
                  'Substituted',
                  'Completed',
                  'Stopped',
                  'Do-not-perform',
                  'Unknown',
                  'Entered=in-error',
                  'Ordered',
                ]"
                style="width: 100%"
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
            Update
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
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
import { string } from "yup";
import IAppointment from "@/types/IAppointment";
import { namespace } from "vuex-class";

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

  @Prop({ type: Object, default: <any>{} })
  request!: {};

  practitioners = <any>[];

  status = "";
  loading = false;
  expand = false;
  isVisible = "";

  required = string().required();

  get updateDate() {
    return new Date((this.request as any).updatedAt).toLocaleDateString(
      "en-NG"
    );
  }

  get currentStatus() {
    return (this.request as any).status;
  }

  get updatedBy() {
    return this.findPractitioner((this.request as any).dispenserId);
  }

  async updateStatus() {
    const id = this.id;
    const url = `/api/v1/medication-requests/${id}`;
    const body = {
      status: this.status.toLowerCase(),
    };
    try {
      const response = await cornieClient().patch(url, body);
      if (response.success) {
        window.notify({ msg: "Status Updated", status: "success" });
        this.done();
      }
    } catch (error) {
      window.notify({ msg: "Status Not Updated", status: "error" });
      this.loading = false;
    }
  }

  async fetchPractitioners() {
    const url = "/api/v1/practitioner";
    const response = await cornieClient().get(url);
    this.practitioners = response.data;
  }

  findPractitioner(id: any) {
    const ptn = this.practitioners?.find((el: any) => (el.id = id));
    return ptn?.firstName + " " + ptn?.lastName;
  }

  done() {
    this.$emit("status-updated");
    this.show = false;
  }
  async apply() {
    this.loading = true;
    await this.updateStatus();
    this.loading = false;
  }

  async created() {
    this.fetchPractitioners();
  }
}
</script>

<style></style>
