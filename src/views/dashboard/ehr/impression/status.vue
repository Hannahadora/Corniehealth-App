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
        <!-- <div class="flex rounded-md cursor-pointer">
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
        </div> -->
        <v-form>
          <div class="grid grid-cols-1 gap-3 mt-2">
            <cornie-input disabled label="Current Status" v-model="currentStatus"  class="w-full" />
            <cornie-input disabled label="Updated By" v-model="updatedBy" class="w-full" />
            <date-picker disabled label="Date Last Updated" v-model="updateDate" />
            <cornie-select
              label="Update Status"
              :items="statuses"
              class="w-full"
              v-model="status"
            />
          </div>
        </v-form>
      </cornie-card-text>
      <div class="flex justify-end mx-4 mt-auto mb-4">
        <!-- <cornie-btn
          @click="showHistory = true"
          class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
        >
          View History
        </cornie-btn> -->
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
        <cornie-btn @click="apply" class="text-white bg-danger px-9 rounded-xl">
          Update
        </cornie-btn>
      </div>
    </cornie-card>
    <status-history v-model="showHistory" :active="active" />
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from '@/components/cornieradio.vue'
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from '@/components/icons/info.vue'
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
import DatePicker from "@/components/datepicker.vue";
import { string } from "yup";
import DateTimePicker from './components/datetime-picker.vue'
import { verificationStatuses, clinicalStatuses } from "./drop-downs";



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
    DateTimePicker,
    SearchIcon,
    AccordionComponent,
    IconInput,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieRadio,
    CornieBtn,
    MainCornieSelect
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
  updateDate!: string;

status = "";
  loading = false;
  expand = false;
  isVisible = "";

 active = "clinical";

  get statuses() {
    return this.active == "clinical" ? clinicalStatuses : verificationStatuses;
  }
  required = string().required();


 async updateStatus() {
   const id = this.id;
    const url = `/api/v1/clinical-impressions/${id}`;
    const body = {
       status: this.status,
    }
    try {
      const response = await cornieClient().put(url, body);
      this.loading= true;
      if (response.success){
           this.loading= false;
          window.notify({ msg: "Status Updated", status: "success" });
        this.done();
      }
   
    } catch (error) {
     this.loading= false;
        window.notify({ msg: "Status Not Updated", status: "success" });
      this.loading = false;
    }
  }

 
 
 done() {
    this.$emit("allergy-added");
    this.show = false;
  }
  async apply() {
    this.loading = true;
     await this.updateStatus()
    this.loading = false;
  }
 
  async created() {
   
  }
}
</script>

<style>
.bg-gray {
    background-color: #F6F8F9;
}
.icon-wrap {
   content:counter(step);
  counter-increment: step;
    background: #fff;
    border-radius: 50%;
        top: -0.3em;
    z-index: 1;
    color: #fff;
    border: 2px solid #FE4D3C;
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
    border: 2px solid #FE4D3C;
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
    border: 2px solid #FE4D3C;
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
    border: 2px solid #FE4D3C;
    display: block;
    height: 1.4em;
    margin: 0 auto -0.6em;
    left: 42em;
    right: 0;
    position: absolute;
    width: 1.4em;
}
 .icon-check-mark{
    top: 1.3em;
    z-index: 1;
    left: 5em;
    right: 0;
    position: absolute;
}
.icon-check-mark2{
       top: 1.3em;
    z-index: 1;
    left: 23em;
    right: 0;
    position: absolute;
}
.icon-check-mark3{
      top: 1.3em;
    z-index: 1;
    left: 45.5em;
    right: 0;
    position: absolute;
}
.bg-danger-100{
    background-color: #FE4D3C;
}
</style>
