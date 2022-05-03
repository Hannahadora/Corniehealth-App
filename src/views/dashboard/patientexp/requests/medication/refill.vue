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
        <v-form ref="form">
          <div class="w-full -mt-1">
              <span class="text-sm font-semibold mb-3">Dispense Interval</span>
              <div class="flex space-x-2 w-full">
                  <cornie-input
                  :rules="required"
                  placeholder="--Enter--"
                  class="grow w-full"
                  :setfull="true"
                  v-model="emptyRefill.interval"
                  />
                  <cornie-select
                   :items="['Days', 'Months', 'Years']"
                  placeholder="Select"
                  class="w-32 mt-0.5 flex-none"
                  :setPrimary="true"
                    v-model="emptyRefill.intervalUnit"
                  />
              </div>
          </div>
            <date-picker :label="'Start Date'" v-model="emptyRefill.startDate" class="w-full"/>
          <cornie-input
              class="w-full mt-4"
              label="Quantity"
              placeholder="Enter"
              v-model="emptyRefill.quantity"
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
                  v-model="emptyRefill.supplyDuration"
                  />
                  <cornie-select
                   :items="['Days', 'Months', 'Years']"
                  placeholder="Select"
                  class="w-32 mt-0.5 flex-none"
                  :setPrimary="true"
                  v-model="emptyRefill.supplyDurationUnit"
                  />
              </div>
          </div>
        </v-form>
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

import IRequest, { Medications, RefillSection } from "@/types/IRequest";

import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from "@/components/icons/info.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
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
import DatePicker from "@/components/datepicker.vue";
import DRangePicker from "@/components/daterangecalendar.vue";

const request = namespace("request");

@Options({
  name: "RefillModal",
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
export default class RefillModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  medicationId!: string;

  @request.Action
  getRequestById!: (id: string) => IRequest;

  status = "";
  loading = false;
  expand = false;
  isVisible = "";

  required = string().required();
  medications = [] as any;
  refills = [] as  RefillSection[];

  emptyRefill = {
    medicationId: this.id,
    interval: 0,
    intervalUnit: "",
    startDate: "",
    quantity: 0,
    supplyDuration: 0,
    supplyDurationUnit: "",
  };
   emptyMedicationDetails = {
    refills: [] as  RefillSection[],

  };

  @Watch("id")
    idChanged() {
      this.setRequest();
    }


   async setRequest() {
        const request = await this.getRequestById(this.id);
        if (!request) return;
        this.medications =  request.medications as any;
  }


   get payload() {
        return this.emptyRefill;
   }

   addMedicationDetails() {
      this.emptyMedicationDetails.refills.push(this.emptyRefill);
      (this.medications as any).push(this.emptyMedicationDetails);
   }
   async saveRefill() {
     //this.addMedicationDetails();
     this.emptyRefill.medicationId = this.id;

      try {
        const response = await cornieClient().post(
          `/api/v1/medication-requests/refill/${this.id}`,
          this.payload
        );
        if (response.success) {
          window.notify({ msg: "Refill added successfully", status: "success" });
          this.done();
        }
      } catch (error:any) {
         window.notify({ msg: error.response.data.message, status: "error" });
      }
    
  }


  done() {
    this.$emit("medication-added");
    this.show = false;
  }
  async apply() {
    this.loading = true;
    await this.saveRefill();
    this.loading = false;
  }

  async created() {}
}
</script>

<style>

</style>
