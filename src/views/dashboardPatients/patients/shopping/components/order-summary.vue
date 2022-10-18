<template>
  <div>
    <p class="font-bold text-xl mb-11">Order Summary</p>
    <div class="w-full">
      <div class="flex justify-between mb-8">
        <p>Item Total</p>
        <p class="text-right">₦ {{totalCost}}</p>
      </div>
      <div class="flex justify-between mb-8">
        <p>Shipping</p>
        <p class="text-right">₦ 0</p>
      </div>
      <div class="flex justify-between mb-8">
        <p>Discounts</p>
        <p class="text-right">₦ 0</p>
      </div>
      <div class="flex justify-between mb-6">
        <p>Sales Tax</p>
        <p class="text-right">₦ 0</p>
      </div>
      <div class="flex justify-between py-6 border-t">
        <p class="font-bold">Total</p>
        <p class="font-bold text-right">₦ {{grandTotal}}</p>
      </div>
      <p class="text-sm">Promo code</p>

      <div class="w-full mb-8 flex space-x-3">
        <cornie-input v-model="promoCode" placeholder="Enter code" class="w-2/3" />
        <div class="w-1/3">
          <button class="bg-primary px-12 py-3 text-white rounded-xl">Apply</button>
        </div>
      </div>

      <div class="flex items-center">
        <CheckPurpleBg class="mr-2" />
      <p class="text-xs">
        You’ve saved N3,000 on your order.
        <span class="text-danger cursor-pointer">See Details</span>
      </p>
      </div>

      <div class=",mt-8">
        <div
          class="w-full mx-auto mt-12 flex flex-col items-center justify-center"
        >
          <cornie-btn
            class="w-full mb-5 bg-red-500 px-6 py-1 text-white rounded-xl"
            @click="$emit('checkout')"
          >
            Continue to Checkout
          </cornie-btn>

          <cornie-btn
            class="w-full bg-white px-6 py-1 text-primary border-primary border-2 rounded-xl"
            @click="$router.push('/dashboard/patient/shopping')"
          >
            Continue Shopping
          </cornie-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieBtn from "@/components/CornieBtn.vue";
import Search from "@/components/icons/search.vue";
import ChevrondownRed from "@/components/icons/chevrondown-red.vue";
import ChevronrightRed from "@/components/icons/chevronright-red.vue";
import Plus from "@/components/icons/plus-icon-red.vue";
import Minus from "@/components/icons/minus-black.vue";
import CheckPurpleBg from "@/components/icons/check-purple-bg.vue";
import CornieInput from "@/components/cornieinput.vue";

@Options({
  name: "OrderSummary",
  components: {
    ChevronRightIcon,
    ChevronLeftIcon,
    CornieBtn,
    Search,
    ChevrondownRed,
    ChevronrightRed,
    Plus,
    Minus,
    CornieInput,
    CheckPurpleBg,
  },
})
export default class OrderSummary extends Vue {
  @Prop({ type: Object, default: [] })
  items!: any;

  loading: Boolean = true;
  promoCode = "";

  get totalCost() {
    return this.items.reduce((a: any, b: any) => Number(a.productPrice) + Number(b.productPrice), 0)
  }

  get grandTotal() {
    return this.totalCost
  }
}
</script>

<style scoped>
.sample-img {
  height: 110px;
  width: 200px;
}
</style>
