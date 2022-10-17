<template>
  <div class="bg-white mb-auto shadow-lg p-3 mt-2 rounded-lg w-full">
    <div class="w-full px-16">
      <span
        class="flex flex-row w-full justify-between border-b-2 font-bold mb-10 text-xl text-primary py-2"
      >
        Cart
      </span>
    </div>

    <div
      class="my-10 px-16 flex items-center cursor-pointer"
      @click="$router.go(-1)"
    >
      <chevronleft-blue class="mr-2" />
      <p class="font-medium text-accent-blue text-sm">Continue Shopping</p>
    </div>

    <div class="px-16 grid grid-cols-3">
      <div class="col-span-2 p-3">
        <p class="font-bold text-xl mb-11">Items</p>

        <div class="shipping-info-container px-6 py-4">
          <div class="flex items-center">
            <delivery-van class="mr-2" />
            <p class="font-bold text=primary">Shipping ({{items.length}})</p>
          </div>
          <p class="mt-2 text-sm text=primary">
            You qualify for free shipping.
            <span class="text-danger cursor-pointer"> See shipping terms</span>
          </p>
        </div>

        <div class="mt-5" v-for="(item, i) in items" :key="i">
          <div class="px-4 py-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <img src="" class="w-12 h-12 mr-5" alt="item-photo" />
                <div class="">
                  <p class="text-sm">
                    {{item.genericName}}
                    <span class="text-xs text-gray-600">{{item.form}} ({{item.strength}})</span>
                  </p>
                  <p class="text-xs">{{item.size}} {{item.form}}</p>
                </div>
              </div>
              <div class="flex items-center">
                <input
                  type="number"
                  class="w-max border px-8 py-2 bg-transparent focus:outline-none mr-5"
                  :modelValue="item.quantity"
                    @input="
                      (evt) => changeQuantity(item.id, Number(evt.data || 1))
                    "
                />
                <p class="font-bold text-sm mr-5">N{{item.productPrice}}</p>
                <small-delete-red class="cursor-pointer" />
              </div>
            </div>

            <p
              class="cursor-pointer flex items-center text-danger mt-5 text-xs"
            >
              Save on more
              <QuestionCircleRed class="ml-1" />
            </p>
          </div>
          <div class="bg-cotton-ball px-3 py-3 flex items-center justify-between">
            <div>
              <p class="text-sm font-semibold">
                Ship to Home or Store
                <span class="text-accent-blue cursor-pointer underline"
                  >Change</span
                >
              </p>
              <p class="text-sm">Arrives in 3-7 business days</p>
            </div>

            <div>
              <CornieCheckbox label="Subscribe and save up to 20%" />
            </div>
          </div>
        </div>
      </div>

      <div class="ml-20 px-3">
        <order-summary :items="items" @checkout="$router.push('/dashboard/patient/shopping/checkout/delivery-info')" />
      </div>
    </div>

    <div class="mt-9 px-16">
      <div class="grid grid-cols-3 gap-6">
        <div class="bg-l-blue col-span-2 flex items-center">
          <div class="px-9 py-5">
            <p class="font-bold mb-2">TAKE CHARGE OF YOUR HEALTH, TODAY.</p>
            <p class="text-xs mb-2">
              Sign Up to the Cornie Health and enjoy better healthcare outcomes.
              Engage with doctors, shop medicines, book diagnostic tests, etc.
              available 24/7, from anywhere.
            </p>
            <button class="text-sm bg-danger text-white rounded-3xl py-2 px-12">
              SignUp
            </button>
          </div>
          <div>
            <cart-health-frame />
          </div>
        </div>

        <div class="ml-20 flex items-center">
          <div class="pt-7 pb-6 px-5">
            <p class="text-xs mb-2">
              Have your personal and family health information at your
              fingertips with Cornie Health. You can message your doctors, book
              & manage appointments, and be more involved in managing your
              health.
            </p>
            <p class="text-xs text-danger underline cursor-pointer">Learn More</p>
          </div>
          <div>
            <cart-health-frame-two />
          </div>
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
import FiveStar from "@/components/icons/five-star.vue";
import Cancel from "@/components/icons/cancel-red-stroke.vue";
import Check from "@/components/icons/check-green-stroke.vue";
import ChevronWhiteDown from "@/components/icons/chevronwhitedown.vue";
import ChevronWhiteUp from "@/components/icons/chevronwhiteup.vue";
import ChevronleftBlue from "@/components/icons/chevronleft-blue.vue";
import CornieCheckbox from "@/components/custom-checkbox.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import DeliveryVan from "@/components/icons/delivery-van.vue";
import SmallDeleteRed from "@/components/icons/small-delete-red.vue";
import QuestionCircleRed from "@/components/icons/question-circle-red.vue";
import CartHealthFrame from "@/components/icons/cart-health-frame.vue";
import CartHealthFrameTwo from "@/components/icons/cart-health-frame-two.vue";

import AddToCartConfirmation from "./components/add-to-cart-confirmation.vue";
import OrderSummary from "./components/order-summary.vue";

const cartStore = namespace("cart");

@Options({
  name: "ShoppingCart",
  components: {
    ChevronRightIcon,
    ChevronLeftIcon,
    CornieBtn,
    Search,
    FiveStar,
    Cancel,
    Check,
    ChevronWhiteDown,
    ChevronWhiteUp,
    ChevronleftBlue,
    CornieCheckbox,
    IconInput,
    SearchIcon,
    AddToCartConfirmation,
    OrderSummary,
    DeliveryVan,
    SmallDeleteRed,
    QuestionCircleRed,
    CartHealthFrame,
    CartHealthFrameTwo,
  },
})
export default class ShoppingCart extends Vue {
  loading: Boolean = true;

  @cartStore.State
  prescriptionCartItems: any;

  get items() {
    let routeQuery = this.$route.query.type
    if(routeQuery === 'prescriptions') {
      return this.prescriptionCartItems
    }
  }

  changeQuantity(itemId: string, quantity: number) {
    const medication = this.items.find(({ id }: any) => id == itemId);
    if (!medication) return;
    medication.quantity = quantity;
  }

  async created() {}
}
</script>

<style scoped>
.sample-img {
  height: 110px;
  width: 200px;
}

.text-accent-blue {
  color: #114ff5;
}

.shipping-info-container {
  background: rgba(194, 199, 214, 0.3);
}

.bg-cotton-ball {
  background: #f0f4fe;
}

.bg-l-blue {
  background: #eef9ff;
}
</style>
