<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title  class="w-full">
          <div class="w-full">
            <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">Add Collection Account</h2>
            <cancel-icon class="float-right cursor-pointer" @click="show = false"/>
          </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
              <div class="w-full">
          <div class="container  content-con">
            <div class="w-full py-3">
                <!-- <cornie-select
                label="Business Name"
                class="mb-4 w-full"
                :items="['Kuda']"
                placeholder="--Auto-generated from profile--"
                /> -->
                <cornie-input disabled label="Business Name" placeholder="--Auto-generated from profile--" class="w-full mb-4" />
                 <cornie-select
                label="Bank"
                class="mb-4 w-full"
                :items="['Access Bank']"
                placeholder="--Select Preferred Bank--"
                />
                <cornie-input label="Account Number" placeholder="--Enter Account Numebr--" class="w-full mb-4" />
               
                 <cornie-input disabled label="Account Name" placeholder="--Autoloaded--" class="w-full mb-4" />
               <div v-if="error" class="flex space-x-4 -mt-2 justify-between w-full">
                <p class="float-left text-xs">Name does not match.</p>
                  <fail-icon class="float-right"/>
              </div>

              <div class="flex space-x-4 justify-between w-full mt-8 border-gray-200 pb-8 border-b-2">
                <p class="float-left text-sm">Scelloo Limited Nigeria</p>
                  <correct-icon class="float-right"/>
              </div>
            </div>
            <div>
                <p class="mt-4 text-sm text-danger font-semibold cursor-pointer">
                   <span class="text-danger text-lg">+</span> Add Account
                </p>
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
            <cornie-btn  :loading="loading"
                  @click="apply" class="text-white bg-danger px-3 rounded-xl">
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
import CorrectIcon from "@/components/icons/correct.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import FailIcon from "@/components/icons/fail.vue";
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
    CorrectIcon,
    FailIcon,
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
    MainCornieSelect
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
 
 error= false;

  required = string().required();


 async updateStatus() {
   const id = this.id;
    const url = `/api/v1/requests/${id}`;
    const body = {
       status: this.status,
    }
    try {
      const response = await cornieClient().put(url, body);
      if (response.success){
          window.notify({ msg: "Status Updated", status: "success" });
        this.done();
      }
   
    } catch (error) {
      console.log(error);
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
