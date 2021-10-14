<template>
  <cornie-dialog v-model="show" center class="w-5/12 h-2/3">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title  class="w-full">
          <cornie-icon-btn @click="show = false">
            <arrow-left-icon />
          </cornie-icon-btn>
          <div class="w-full">
            <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">  Deaactivate Account</h2>
            <cancel-icon class="float-right cursor-pointer" @click="show = false"/>
          </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
              <div class="w-full">
          <div class="container  content-con">
            <div class="w-full py-3">
               <date-picker
                                      v-model="deactivateTillDate"
                                     class="w-full mb-5"
                                       label="Deactivation Date"
                                    ></date-picker>
                 
                      <cornie-text-area
                      :rules="required"

                      placeholder="Placeholder"
                    label="Reason For Deactivating"
                      v-model="reasonsForDeactivation"
                      class="w-full mt-5"
                      rows="4"
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
            @click="deactivate"
                :loading="loading"
            class="text-white bg-danger px-6 rounded-xl"
          >
           Deactivate
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
import CornieDialog from "@/components/CornieDialog.vue";
import { cornieClient } from "@/plugins/http";
import DeleteorangeIcon from "@/components/icons/deleteorange.vue";
import CDelete from "@/components/icons/adelete.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import DatePicker from "./datepicker.vue";
import CornieTextArea from "@/components/textarea.vue"
import { string } from "yup";


@Options({
  name: "statusDialog",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    DatePicker,
    CDelete,
    DeleteorangeIcon,
    CornieTextArea,
    CancelIcon,
    CornieDialog,
    AccordionComponent,
    Textarea,
  },
})
export default class Medication extends Vue {
@PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  paymentId!: string;

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
 reasonsForDeactivation = "";
      deactivateTillDate= "";

  required = string().required();

  get  payload() {
      return {
        reasonsForDeactivation: this.reasonsForDeactivation,
        deactivateTillDate: this.deactivateTillDate,
      };
    }

 done() {
    this.show = false;
  }
     async deactivate() {
      this.loading = true;
      try {
        const response = await cornieClient().post(
          `/api/v1/payments/deactivateActivatePaymentAccount/${this.paymentId}`,
          this.payload
        );
        if (response.success) {
          this.loading = false;
           window.notify({ msg: 'Payment account deactivated', status: 'success' })
            this.done();
        } 
      } catch (error) {
        this.loading = false;
        window.notify({ msg:error, status: 'error' })
      }
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
