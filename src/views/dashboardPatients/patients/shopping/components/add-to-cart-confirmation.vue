<template>
  <cornie-dialog :modelValue="show" center class="w-1/2 h-auto">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll py-6"
    >
    <cornie-card-title class="flex items-center justify-end">
      <div class="w-full">
        <cancel-red-bg
          class="float-right cursor-pointer"
          @click="show = false"
        />
      </div>
    </cornie-card-title>
    <div class="w-full">
      <p class="my-4 mb-6"
        >How would you like to receive this item?</p
      >
      <div class="w-full grid grid-cols-3 gap-2">
            <div class="border px-2 py-6 flex flex-col items-center justify-center">
              <in-store class="mb-3" />
              <div class="mr-3 text-center">
                <p class="mb-3 text-xs font-semibold">In-store Pickup</p>
                <p class="small-p-10 mb-3">In-stock at MedPlus, 18 Admiralty Way, Lekki, Lagos</p>
                <p class="small-p-10 text-accent-blue">Instant Pickup: Pay & Pickup</p>
              </div>
            </div>
            <div class="border px-2 py-6 flex flex-col items-center justify-center">
              <same-day class="mb-3" />
              <div class="mr-3 text-center">
                <p class="mb-3 text-xs font-semibold">Same Day Delivery</p>
                <p class="small-p-10 mb-3">Delivered within 12 hours</p>
                <p class="small-p-10 text-accent-blue">Orders placed after 6pm will be delivered the next day.</p>
              </div>
            </div>
            <div class="border px-2 py-6 flex flex-col items-center justify-center">
              <standard-shipping class="mb-3" />
                <div class="text-center">
                <p class="mb-3 text-xs font-semibold">Standard Shipping</p>
                <p class="small-p-10 mb-3">Delivered within 3-7 business days</p>
                <p class="small-p-10 text-accent-blue"> Free shipping for orders above N10,000 or ship to store free.</p>
              </div>
            </div>
          </div>
      <p
        class="mt-4 mb-24 text-sm"
        >*Orders comprising items from different stores may be shipped and
        charged differently!</p
      >

      <div
        class="flex xl:flex-row flex-col items-center xl:justify-end justify-center mt-8"
      >
        <cornie-btn
          class="xl:mr-2 xl:mb-0 mb-6 xl:w-auto w-full bg-white px-6 py-1 text-primary border-primary border-2 rounded-xl"
          @click="show = false"
        >
          Cancel
        </cornie-btn>
        <div class="flex bg-danger rounded-xl px-3">
          <div
            class="flex items-center justify-center text-white font-bold border-r border-white pr-3 py-4"
          >
            <p class="mr-2 font-bold text-xs">{{ item.quantity }}</p>
            <div class="flex flex-col justify-center">
              <chevron-white-up
                class="cursor-pointer"
                @click="item.quantity++"
              />
              <chevron-white-down
                class="cursor-pointer"
                @click="item.quantity--"
              />
            </div>
          </div>
          <div class="w-11/12 py-4 flex items-center justify-center pl-3">
            <button class="text-white font-bold text-center" @click="$router.push('/dashboard/patient/shopping/cart')">
              Continue to cart
            </button>
          </div>
        </div>
      </div>
    </div>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import { CornieUser } from "@/types/user";

import moment from "moment";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import ChevronWhiteDown from "@/components/icons/chevronwhitedown.vue";
import ChevronWhiteUp from "@/components/icons/chevronwhiteup.vue";

import InStore from "@/components/icons/in-store.vue"
import SameDay from "@/components/icons/same-day.vue"
import StandardShipping from "@/components/icons/standard-shipping.vue"
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";

const account = namespace("user");

@Options({
  components: {
    CornieDialog,
    ...CornieCard,
    CornieSelect,
    CornieBtn,
    InStore,
    SameDay,
    StandardShipping,
    CancelRedBg,
    ChevronWhiteDown,
    ChevronWhiteUp,
  },
})
export default class DoctorsPage extends Vue {
  loading: Boolean = false;

  @account.Getter
  cornieUser!: CornieUser;

  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: "";

  @Prop({ type: Object, default: {} })
  item!: any;

 
  get userId() {
    return this.cornieUser?.id;
  }

  async created() {
  }
}
</script>

<style scoped>
.info-container {
  background: #ffffff;
  border: 0.2px solid #c2c7d6;
  box-sizing: border-box;
  box-shadow: 0px 15px 40px rgba(20, 23, 31, 0.08);
  border-radius: 16px;
}

.small-p-10 {
    font-size: 10px;
}

.text-accent-blue{
    color:#114FF5;
}
</style>
