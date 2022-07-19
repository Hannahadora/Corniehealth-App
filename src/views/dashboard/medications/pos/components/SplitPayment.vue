<template>
  <div>
    <div class="flex items-center justify-end px-5 py-2">
      <img src="../../../../../assets/img/plus-blue-icon.png" alt="" />
      <span
        class="cursor-pointer text-sm text-blue-500 font-bold ml-4"
        @click="payments.push({})"
        >Add</span
      >
    </div>
    <div
      v-for="(payment, idx) in payments"
      :key="idx"
      class="grid items-center mb-8 gap-x-6"
      style="grid-template-columns: 40% 40% 10%"
    >
      <cornie-input
        class="w-full"
        label="Amount Due"
        placeholder="--Enter--"
        v-model="payment.amount"
        :rules="required"
        :disabled="salesData"
      />

      <cornie-select
        class="w-full"
        label="Payment Type"
        placeholder="--Search--"
        v-model="payment.PaymentType"
        :items="['pos', 'cash']"
        :disabled="salesData"
      />

      <div class="flex items-center justify-between">
        <div class="flex items-center justify-center px-5 py-2">
          <img src="../../../../../assets/img/del-red-icon.png" alt="" />
          <span
            class="cursor-pointer text-sm text-red-500 font-bold ml-4"
            @click="payments.splice(idx, 1)"
            >Remove</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieBtn from "@/components/CornieBtn.vue";
import { namespace } from "vuex-class";
import { CornieUser } from "@/types/user";
import { string } from "yup";
import { cornieClient } from "@/plugins/http";

const hierarchy = namespace("hierarchy");
const orgFunctions = namespace("OrgFunctions");
const user = namespace("user");
const appointmentRoom = namespace("appointmentRoom");

@Options({
  name: "SplitPayment",
  components: {
    CornieInput,
    CornieSelect,
    CornieBtn,
  },
})
export default class SplitPayment extends Vue {
  @Prop({ type: Array, default: <any>[] })
  payments!: any;

  @Prop({ type: Boolean, default: false })
  salesData!: boolean;
 
  required = string().required();
}
</script>
