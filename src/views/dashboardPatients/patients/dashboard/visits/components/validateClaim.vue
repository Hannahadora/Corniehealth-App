<template>
  <cornie-dialog v-model="show" right class="md:w-4/12 w-12/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
         Validate Claim
          </h2>
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form class="container" ref="form">
            <div class="bg-blue-50 rounded-lg py-4 justify-center align-items-center  px-4 mb-5">
                <p class="text-center mb-3">Your total bill for Visit ID #6578 is <span class="font-bold">N62,501</span>. </p>
                <a href="#" class="text-blue-600 underline flex text-center justify-center text-sm">View Details</a>
            </div>
            <div class="mb-5">
                <p class="text-sm">
                    Your healthcare provider has submitted a claim of N62,501 to your health insurance company. To enable your healthcare provider get paid, you are required to validate this claim.
                </p>
            </div>
        </v-form>
      </cornie-card-text>

      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Close
          </cornie-btn>
           <cornie-btn
            class="text-white bg-danger px-6 rounded-xl"
             @click="$router.push(`/validate-claim`)"
          >
           Validate Claim
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>

  <doctor-modal :id="doctorId" v-model="showDoctor"/>

</template>


<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { createDate } from "@/plugins/utils";
import { cornieClient } from "@/plugins/http";

import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import { string, date, number } from "yup";
import PhoneInput from "@/components/phone-input.vue";
import Avatar from "@/components/avatar.vue";
import EditIcon from "@/components/icons/editview.vue";

import BillIcon from "../icons/bill.vue";
import CheckoutIcon from "@/components/icons/checkout.vue";

const patientprovider = namespace("patientprovider");

@Options({
  name: "viewBill",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    PhoneInput,
    CornieDialog,
    SearchIcon,
    IconInput,
    CornieInput,
    CornieSelect,
    CornieBtn,
    Avatar,
    EditIcon,
    BillIcon,
    CheckoutIcon
  },
})
export default class viewBill extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;


  @Prop({ type: String, default: "" })
  id!: string;

  @patientprovider.State
  primarydoctors!: any;

  @patientprovider.Action
  fetchPrimaryDoctors!: () => Promise<void>;

  showDoctor = false;

  doctorId = "";

  showModal(value:string){
    this.showDoctor = true;
    this.doctorId = value;
  }

  done() {
 
  }

  async created() {
    await this.fetchPrimaryDoctors()
  }
}
</script>

<style>
.border-r-0 {
  border-right-width: 0px !important;
}
.border-l-0 {
  border-left-width: 0px !important;
}
</style>
