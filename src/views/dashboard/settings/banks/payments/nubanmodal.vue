<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Virtual NUBAN Account
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
                label="First Name"
                placeholder="--Enter First Name--"
                class="w-full mb-4"
              />
              <cornie-input
                label="Last Name"
                placeholder="--Enter Last Name--"
                class="w-full mb-4"
              />
              <cornie-input
                label="Email Address"
                placeholder="--Enter Email Address--"
                class="w-full mb-4"
              />
              <cornie-input
                label="Phone Number"
                placeholder="--Enter Phone Number--"
                class="w-full mb-4"
              />
              <cornie-select
                label="Preferred Bank"
                class="mb-4 w-full"
                :items="['Kuda']"
                placeholder="--Select Preferred Bank--"
              />
              <cornie-input
                label="BVN"
                placeholder="----Enter BVN--"
                class="w-full mb-4"
              />
            </div>
            <p class="mt-4 text-xs">
              This account will be deactivated if not used within 3 months. You
              can deactivate this account at any time in the future.
            </p>
          </div>
        </div>
      </cornie-card-text>
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            :loading="loading"
            @click="apply"
            class="text-white bg-danger px-6 font-semibold text-sm rounded-xl"
          >
            Generate NUBAN
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
import { flatten } from "@/plugins/utils";

@Options({
  name: "nubanmodal",
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

  @Prop({ type: Boolean, default: false })
  displayNubanTable!: boolean;

  @Prop({ type: String, default: "" })
  updatedBy!: string;

  @Prop({ type: String, default: "" })
  currentStatus!: string;

  @Prop({ type: String, default: "" })
  dateUpdated!: string;

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
      ;
      window.notify({ msg: "Status Not Updated", status: "error" });
      this.loading = false;
    }
  }

  done() {
    this.$emit("medicationAdded");
    this.show = false;
  }
  async apply() {
    // this.loading = true;
    //await this.updateStatus()
    this.displayNubanTable = true;
    this.show = false;
    //  this.loading = false;
  }

  async created() {}
}
</script>

<style>
.bg-gray {
  background-color: #f6f8f9;
}
.icon-wrap {
  content: counter(step);
  counter-increment: step;
  background: #fff;
  border-radius: 50%;
  top: -0.3em;
  z-index: 1;
  color: #fff;
  border: 2px solid #fe4d3c;
  display: block;
  height: 1.4em;
  margin: 0 auto -0.6em;
  left: -54em;
  right: 0;
  position: absolute;
  width: 1.4em;
}
.icon-wrap2 {
  background: #fff;
  border-radius: 50%;
  top: -0.3em;
  z-index: 1;
  color: #fff;
  border: 2px solid #fe4d3c;
  display: block;
  height: 1.4em;
  margin: 0 auto -0.6em;
  left: -7.5em;
  right: 0;
  position: absolute;
  width: 1.4em;
}
.icon-wrap3 {
  background: #fff;
  border-radius: 50%;
  top: -0.3em;
  z-index: -1;
  color: #fff;
  border: 2px solid #fe4d3c;
  display: block;
  height: 1.4em;
  margin: 0 auto -0.6em;
  left: 52em;
  right: 0;
  position: absolute;
  width: 1.4em;
}
.icon-wrap4 {
  background: #fff;
  border-radius: 50%;
  top: -0.3em;
  z-index: 1;
  color: #fff;
  border: 2px solid #fe4d3c;
  display: block;
  height: 1.4em;
  margin: 0 auto -0.6em;
  left: 42em;
  right: 0;
  position: absolute;
  width: 1.4em;
}
.icon-check-mark {
  top: 1.3em;
  z-index: 1;
  left: 5em;
  right: 0;
  position: absolute;
}
.icon-check-mark2 {
  top: 1.3em;
  z-index: 1;
  left: 23em;
  right: 0;
  position: absolute;
}
.icon-check-mark3 {
  top: 1.3em;
  z-index: 1;
  left: 45.5em;
  right: 0;
  position: absolute;
}
.bg-danger-100 {
  background-color: #fe4d3c;
}
</style>
