<template>
  <div class="bg-white mb-auto shadow-lg p-3 mt-2 rounded-lg w-full">
    <div class="w-full xl:px-16">
      <span
        class="flex flex-row w-full justify-between border-b-2 font-bold mb-10 text-xl text-primary py-2"
      >
        Cart
      </span>
    </div>

    <div
      class="my-10 xl:px-16 flex items-center cursor-pointer"
      @click="$router.go(-1)"
    >
      <chevronleft-blue class="mr-2" />
      <p class="font-medium text-accent-blue text-sm">Continue Shopping</p>
    </div>

    <div class="flex items-center justify-center mt-9 mb-2">
      <circle-red-bg
        class="cursor-pointer"
        @click="
          $router.push(
            `/dashboard/patient/shopping/checkout/delivery-info?type=${$route.query?.type}`
          )
        "
      />
      <hr class="w-36 border-danger" />
      <circle-red-bg
        class="cursor-pointer"
        @click="
          $router.push(
            `/dashboard/patient/shopping/checkout/review?type=${$route.query?.type}`
          )
        "
      />
      <hr class="w-36 border-danger" />
      <circle-red />
    </div>
    <div class="flex items-center justify-center mb-11">
      <div
        class="mr-28 cursor-pointer"
        @click="
          $router.push(
            `/dashboard/patient/shopping/checkout/delivery-info?type=${$route.query?.type}`
          )
        "
      >
        <p class="text-center text-xs font-medium">Delivery Info</p>
      </div>
      <div
        class="mr-28 cursor-pointer"
        @click="
          $router.push(
            `/dashboard/patient/shopping/checkout/review?type=${$route.query?.type}`
          )
        "
      >
        <p class="text-center text-xs font-medium">Review</p>
      </div>
      <div class="">
        <p class="text-danger text-center text-xs font-medium">Payment</p>
      </div>
    </div>

    <div class="xl:w-1/3 lg:w-2/3 w-11/12 mx-auto">
      <div class="">
        <p class="font-bold text-xl mb-11 text-center">Order Summary</p>
        <div class="delivery-info-container w-full xl:px-24">
          <div class="flex justify-between mb-8">
            <p>Item Total</p>
            <p class="text-right">₦ {{ orderSummary.itemsTotal || 0 }}</p>
          </div>
          <div class="flex justify-between mb-8">
            <p>Shipping</p>
            <p class="text-right">₦ 0</p>
          </div>
          <div class="flex justify-between mb-8">
            <p>Discounts</p>
            <p class="text-right">₦ {{orderSummary.discounts}}</p>
          </div>
          <div class="flex justify-between mb-6">
            <p>Sales Tax</p>
            <p class="text-right">₦ 0</p>
          </div>
          <div class="flex justify-between py-6 border-t">
            <p class="font-bold">Total</p>
            <p class="font-bold text-right">₦ {{ grandTotal }}</p>
          </div>
          <p class="text-sm">Promo code</p>

          <div class="w-full mb-8 flex space-x-3">
            <cornie-input
              v-model="promoCode"
              placeholder="Enter code"
              class=""
            />
            <div>
              <button class="bg-primary px-12 py-3 text-white rounded-xl">
                Apply
              </button>
            </div>
          </div>

          <div class="flex items-center">
            <CheckPurpleBg class="mr-2" />
            <p class="text-xs">
              You’ve saved N3,000 on your order.
              <span class="text-danger cursor-pointer">See Details</span>
            </p>
          </div>

          <div class="my-8">
            <div
              @click="setbillPayload"
              class="flex items-center justify-center bg-danger hover:bg-red-100 p-3 text-white text-center cursor-pointer"
            >
              <bill-icon class="text-yellow-400 fill-current" />
              <span class="ml-3 text-xs">Pay</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <billing-modal
      v-model="showPayBillDialog"
      :paybillPayload="paybillPayload"
    />
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
import CornieCheckbox from "@/components/custom-checkbox.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieInput from "@/components/cornieinput.vue";
import CheckPurpleBg from "@/components/icons/check-purple-bg.vue";
import BillIcon from "@/components/icons/billpayment.vue";
import { date, string } from "yup";

import CircleRed from "@/components/icons/circle-red.vue";
import CircleRedBg from "@/components/icons/circle-red-bg.vue";
import CircleGray from "@/components/icons/circle-gray.vue";
import ChevronleftBlue from "@/components/icons/chevronleft-blue.vue";
import BillingModal from "../components/Billingmodal.vue";

const cartStore = namespace("cart");

@Options({
  name: "Review",
  components: {
    ChevronRightIcon,
    ChevronLeftIcon,
    CornieBtn,
    Search,
    CornieCheckbox,
    CornieRadio,
    CornieInput,
    CheckPurpleBg,
    CircleRedBg,
    CircleRed,
    CircleGray,
    ChevronleftBlue,
    BillingModal,
    BillIcon,
  },
})
export default class Review extends Vue {
  required = string().required();

  loading: Boolean = true;
  item: any = {};
  promoCode = "";
  showPayBillDialog = false;
  selectedPaymentMethod: any = "";
  paymentMethods: any = [
    "Health Wallet",
    "Flutterwave",
    "Paystack",
    "Card (on file)",
  ];
  paybillPayload: any = {};
  orderSummary: any = {};
  bill: any = {};
  prescription: any = {};

  @cartStore.State
  prescriptionCartItems: any;

  @cartStore.State
  prescriptionUpload: any;

  @cartStore.Action
  fetchPrescriptionCart!: () => Promise<void>;

  @cartStore.Action
  fetchPrescriptionUpload!: () => Promise<void>;

  @cartStore.State
  cartItems: any;

  @cartStore.Action
  fetchCartItems!: () => Promise<void>;

  get items() {
    let routeQuery = this.$route.query.type;
    if (routeQuery === "prescriptions") {
      return this.prescriptionCartItems || [];
    } else return this.cartItems || [];
  }

  get totalCost() {
    const x = this.items.map(
      (el: any) => el.productPrice ?? 0 * el.quantity ?? 1
    );
    return x.reduce((a: any, b: any) => Number(a) + Number(b), 0);
  }

  get grandTotal() {
    return this.totalCost;
  }

  async setbillPayload() {
    if (this.$route.query?.type === "prescriptions") {
      await this.createPrescription();
      await this.generateBill();
    } else {
      await this.createMedicationOrder();
    }
    this.paybillPayload.billAmount = this.grandTotal;
    this.paybillPayload.billDisplay = this.bill.id;
    this.showPayBillDialog = true;
  }

  get payload() {
    return {
      deliveryPreferencesId: this.$route.query.dID,
      prescriptionImageUrl:
        this.$route.query.type === "prescriptions"
          ? this.prescriptionUpload.file
          : undefined,
      prescriber_name:
        this.$route.query.type === "prescriptions"
          ? this.prescriptionUpload.prescriberName
          : undefined,
      prescriber_email:
        this.$route.query.type === "prescriptions"
          ? this.prescriptionUpload.email
          : undefined,
      prescribedMedications: this.items.map((med: any) => {
        return {
          productId: med.productId,
          quantity: med.quantity.toString(),
          cost: med.cost,
          locationId: med.locationId,
          organizationId: med.organizationId,
        };
      }),
    };
  }

  async createPrescription(value?: any) {
    this.loading = true;
    try {
      const { data } = await cornieClient().post(
        "/api/v1/patient-portal/prescription/create",
        { ...this.payload }
      );
      this.loading = false;
      window.notify({
        msg: "Prescription Added",
        status: "success",
      });
      this.prescription = data;
    } catch (error) {
      this.loading = false;
      window.notify({
        msg: "An error occured",
        status: "error",
      });
    }
  }
  async generateBill(value?: any) {
    try {
      this.loading = true;
      const { data } = await cornieClient().post(
        "/api/v1/patient-portal/prescription/generate-prescription-bill",
        {
          deliveryPreferencesId: this.$route.query.dID,
          prescriptionId: this.prescription.id,
        }
      );
      this.loading = false;
      window.notify({
        msg: "Prescription Added",
        status: "success",
      });
      this.bill = data;
    } catch (error) {
      this.loading = false;
      window.notify({
        msg: "An error occured",
        status: "error",
      });
    }
  }

  async createMedicationOrder(value?: any) {
    this.loading = true;
    try {
      const { data } = await cornieClient().post(
        "/api/v1/patient-portal/medication-shop/create",
        {
          deliveryPreferencesId: this.$route.query.dID,
          shopMedications: this.items.map((med: any) => {
            return {
              productId: med.productId,
              quantity: med.quantity.toString(),
              cost: med.cost,
              locationId: med.locationId,
              organizationId: med.organizationId,
            };
          }),
        }
      );
      this.loading = false;
      window.notify({
        msg: "Medication Added",
        status: "success",
      });
      this.prescription = data;
    } catch (error) {
      this.loading = false;
      window.notify({
        msg: "An error occured",
        status: "error",
      });
    }
  }
  async getOrderSummary(value?: any) {
    this.loading = true;
    try {
      const { data } = await cornieClient().post(
        "/api/v1/patient-portal/medication-shop/get-order-summary",
        {
          shoppedMedications: this.items.map((med: any) => {
            return {
              productId: med.productId,
              quantity: med.quantity.toString(),
              cost: med.cost,
              locationId: med.locationId,
              organizationId: med.organizationId,
            };
          }),
        }
      );
      this.loading = false;
      this.orderSummary = data;
    } catch (error) {
      this.loading = false;
      window.notify({
        msg: "An error occured while generating order",
        status: "error",
      });
    }
  }

  async created() {
    this.fetchPrescriptionCart();
    this.fetchPrescriptionUpload();
    this.fetchCartItems();
    await this.getOrderSummary()
  }
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

.delivery-info-container {
  background: #ffffff;
  /* Greys/Etherium */

  border: 0.5px solid #c2c7d6;
  /* Modals & Pickers */

  box-shadow: 0px 1px 4px rgba(46, 41, 78, 0.02),
    0px 8px 12px rgba(46, 41, 78, 0.08);
  border-radius: 5px;
}

.bg-cotton-ball {
  background: #f0f4fe;
}
.text-eth-gray {
  color: #c2c7d6;
}
</style>
