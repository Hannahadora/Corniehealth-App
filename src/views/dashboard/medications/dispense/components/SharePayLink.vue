<template>
  <div>
    <cornie-card-title class="pb-6 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <icon-btn @click="$emit('closeModal')">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <p class="text-3xl font-bold">Share Pay Link</p>
      </div>
    </cornie-card-title>

    <cornie-card-text class="flex-grow scrollable">
      <div class="text-green-500 text-base cursor-pointer mb-4">View Bill</div>
      <v-form class="flex-grow flex flex-col">
        <cornie-input
          class="w-full"
          placeholder="Enter"
          label="Pay Link"
          v-model="payLink"
          :disabled="true"
        />
        <cornie-input
          class="w-full"
          placeholder="Autogenerated"
          label="Patient's Email"
          v-model="email"
          :disabled="true"
        />
        <cornie-input
          class="w-full"
          placeholder="Autogenerated"
          label="Payment Amount (NGN)"
          v-model="bill.total"
          :disabled="true"
        />
        <div class="-mt-4">
          <text-area
            placeholder="Autogenerated"
            label="Note"
            v-model="note"
            class="w-full"
            rows="0"
          />
        </div>
      </v-form>
    </cornie-card-text>

    <div class="flex items-center justify-end mt-24">
      <div class="flex items-center mb-6">
        <cornie-btn
          @click="$emit('closeModal')"
          class="border-primary border-2 px-6 py-1 mr-3 rounded-lg text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn
          :loading="loading"
          type="submit"
          class="text-white bg-danger px-3 py-1 rounded-lg"
          @click="sharePayLink"
        >
          Submit
        </cornie-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import TextArea from "@/components/textarea.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieBtn from "@/components/CornieBtn.vue";
import { namespace } from "vuex-class";
import { CornieUser } from "@/types/user";
import { string } from "yup";
import { cornieClient } from "@/plugins/http";
import CornieCheckBox from "@/components/corniecheckbox.vue";
import IDispenseInfo from "@/types/IDispenseInfo";

import { debounce } from "lodash";

const orgFunctions = namespace("OrgFunctions");
const user = namespace("user");

@Options({
  name: "SharePayLink",
  components: {
    CornieDialog,
    ...CornieCard,
    ArrowLeft,
    IconBtn,
    CornieInput,
    CornieSelect,
    CustomCheckbox,
    CornieBtn,
    CornieCheckBox,
    CancelIcon,
    IconInput,
    SearchIcon,
    TextArea,
  },
})
export default class SharePayLink extends Vue {
  @Prop({ type: Object, default: "" })
  request!: IDispenseInfo;

  @Prop({ type: Object, default: "" })
  bill!: any;

  loading = false;

  payLink = "";
  account = "";
  totalBill = "";
  coPaymentAmt = "";
  amtToReceive = "";
  paymentType = "";
  note = "";
  CompleteDispense = true;
  otherPaymentType = "";

  @user.Getter
  authCurrentLocation!: any;

  get locationId() {
    // return this.authCurrentLocation;
    return "21b84341-2051-4cad-b6b6-feae04f81215";
  }

  get email() {
    return this.request?.patient?.contactInfo[0].email;
  }

  async sharePayLink() {
    const payload = this.request.medications.map((medication: any) => {
      return {
        dispensedProductId: medication.id,
        reasonforSubstitution: medication.reasonForSubstitution,
        quantity: medication.quantity || 1,
      };
    });
    try {
      await cornieClient().post(
        `/api/v1/pharmacy/dispense-request/${this.locationId}/${this.request.id}`,
        payload
      );
      window.notify({
        msg: "Request successfully dispensed",
        status: "success",
      });
    } catch (error) {
      window.notify({
        msg: "There was an error geneating bill",
        status: "error",
      });
    }
  }
}
</script>

<style scoped></style>
