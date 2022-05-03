<template>
  <div>
    <div
      class="grid grid-cols-2 gap-6 mb-6"
      v-for="(payment, idx) in payments"
      :key="idx"
    >
      <cornie-input
        class="w-full"
        label="Amount Due"
        placeholder="--Enter--"
        v-model="payment.amount"
        :rules="required"
        :disabled="true"
      />

      <cornie-select
        class="w-full"
        label="Payment Type"
        placeholder="--Search--"
        v-model="payment.paymentType"
        :items="['pos', 'cash']"
        :disabled="salesData"
      />
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
  name: "AppointmentRoomDialog",
  components: {
    CornieInput,
    CornieSelect,
    CornieBtn,
  },
})
export default class FullPayment extends Vue {
  @Prop({ type: Array, default: <any>[] })
  payments!: any;

  @Prop({ type: Boolean, default: false })
  salesData!: boolean;
}
</script>
