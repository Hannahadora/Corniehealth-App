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

    <div class="flex items-center justify-center mt-9 mb-2">
      <circle-red />
      <hr class="w-36" />
      <circle-gray />
      <hr class="w-36" />
      <circle-gray />
    </div>
    <div class="flex items-center justify-center mb-11">
      <div class="mr-28">
        <p class="text-danger text-center text-xs font-medium">Delivery Info</p>
      </div>
      <div class="mr-28">
        <p class="text-eth-gray text-center text-xs font-medium">Review</p>
      </div>
      <div class="">
        <p class="text-eth-gray text-center text-xs font-medium">Payment</p>
      </div>
    </div>

    <div class="px-16 grid grid-cols-3 gap-6">
      <div class="col-span-2 p-3">
        <p class="font-bold text-xl mb-11">Delivery Information</p>

        <div class="delivery-info-container px-4 py-6">
          <div class="pb-5 border-b">
            <div v-if="!contactInfoForm">
              <div class="flex items-center mb-6">
                <p class="font-semibold text-sm">Contact Information</p>
                <div
                  class="cursor-pointer ml-5 flex items-center"
                  @click="contactInfoForm = true"
                >
                  <p class="font-semibold text-danger text-sm mr-2">Edit</p>
                  <edit-pen-red />
                </div>
              </div>
              <div class="">
                <p>{{ contact.fullName }}</p>
                <p>{{ contact.email }}</p>
                <p>{{ contact.dialCode }}{{ contact.phone }}</p>
              </div>
            </div>
            <div v-else>
              <div class="flex items-center mb-6">
                <p class="font-semibold text-sm">Contact Information</p>
                <p
                  class="cursor-pointer font-semibold text-danger ml-5 text-sm"
                  @click="saveContactInfo"
                >
                  Save
                </p>
              </div>
              <div>
                <cornie-input
                  v-model="contact.fullName"
                  label="Full Name"
                  class="mb-6"
                />
                <cornie-input
                  v-model="contact.email"
                  label="Email"
                  class="mb-6"
                />
                <phone-input
                  v-model="contact.phone"
                  v-model:code="contact.dialCode"
                  :rules="required"
                  :required="true"
                  label="Phone Number"
                  placeholder="--Enter--"
                />
              </div>
            </div>
          </div>

          <div class="py-5 border-b">
            <div v-if="!shippingInfoForm">
              <div class="flex items-center mb-6">
                <p class="font-semibold text-sm">Shipping Information</p>
                <div
                  class="cursor-pointer ml-5 flex items-center"
                  @click="shippingInfoForm = true"
                >
                  <p class="font-semibold text-danger text-sm mr-2">Edit</p>
                  <edit-pen-red />
                </div>
              </div>
              <div class="mb-5">
                <cornie-radio
                  v-model="shipToMe"
                  value="yes"
                  name="shipping-method"
                  class="bg-danger float-right focus-within:bg-danger px-6 shadow"
                  label="Ship to me"
                />
              </div>
              <div class="mb-5">
                <p>{{ shipping.fullName }}</p>
                <p>{{ shipping.address }}</p>
                <p>{{ shipping.apartment }}</p>
              </div>
              <div class="bg-cotton-ball px-3 py-2">
                <CornieCheckbox label="Save as preferred address" />
              </div>
            </div>

            <div v-else>
              <div class="flex items-center mb-6">
                <p class="font-semibold text-sm">Shipping Information</p>
                <p
                  class="cursor-pointer font-semibold text-danger ml-5 text-sm"
                  @click="saveShippingInfo"
                >
                  Save
                </p>
              </div>
              <div class="mb-5 flex items-center space-x-8">
                <cornie-radio
                  v-model="shipToMe"
                  value="yes"
                  name="shipping-method"
                  class="bg-danger float-right focus-within:bg-danger px-6 shadow"
                  label="Ship to me"
                />
                <cornie-radio
                  v-model="shipToMe"
                  value="no"
                  name="shipping-method"
                  class="bg-danger float-right focus-within:bg-danger px-6 shadow"
                  label="Ship to store for free"
                />
              </div>
              <div>
                <cornie-input
                  v-model="shipping.fullName"
                  label="Full Name"
                  class="mb-6"
                />
                <cornie-input
                  v-model="shipping.address"
                  label="Address"
                  class="mb-6"
                />
                <cornie-input
                  v-model="shipping.apartment"
                  label="Apartment/Suite/Others (Optional)"
                  class="mb-6"
                />
              </div>
              <div class="bg-cotton-ball px-3 py-2">
                <CornieCheckbox label="Save as preferred address" />
              </div>
            </div>
          </div>

          <div class="pt-5">
            <div>
              <div class="flex items-center mb-6">
                <p class="font-semibold text-sm">Shipping Method</p>
              </div>
              <div class="">
                <p class="text-sm font-medium">
                  Standard Shipping
                  <span class="cursor-pointer underline text-accent-blue"
                    >Change</span
                  >
                </p>
                <div class="flex items-center">
                  <p
                    class="text-danger text-sm underline font-medium cursor-pointer mt-1 mr-2"
                  >
                    See Shipping Policy
                  </p>
                  <external-link-red />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ml-20 px-3">
        <order-summary
          :items="items"
          @checkout="
            $router.push(
              `/dashboard/patient/shopping/checkout/review?type=${$route.query?.type}$dID=${deliveryId}`
            )
          "
        />
      </div>
    </div>

    <delivery-preference v-model="shippingInfoForm" @preference-added="updateShipping" />
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
import PhoneInput from "@/components/phone-input.vue";
import { date, string } from "yup";

import OrderSummary from "../components/order-summary.vue";
import ChevronleftBlue from "@/components/icons/chevronleft-blue.vue";
import EditPenRed from "@/components/icons/edit-pen-red.vue";
import ExternalLinkRed from "@/components/icons/external-link-red.vue";
import CircleRed from "@/components/icons/circle-red.vue";
import CircleGray from "@/components/icons/circle-gray.vue";
import CircleRedBg from "@/components/icons/circle-red-bg.vue";
import { CornieUser } from "@/types/user";

import DeliveryPreference from '../../medications/prescription/DeliveryPeference.vue'

const cartStore = namespace("cart");
const account = namespace("user");

@Options({
  name: "ShoppingCart",
  components: {
    ChevronRightIcon,
    ChevronLeftIcon,
    CornieBtn,
    Search,
    CornieCheckbox,
    OrderSummary,
    CornieRadio,
    CornieInput,
    ChevronleftBlue,
    PhoneInput,
    EditPenRed,
    ExternalLinkRed,
    CircleRed,
    CircleGray,
    CircleRedBg,
    DeliveryPreference,
  },
})
export default class ShoppingCart extends Vue {
  required = string().required();

  @account.State
  cornieData!: any;

  @account.Getter
  cornieUser!: CornieUser;

  @account.Getter
  corniePatient!: any;

  @cartStore.State
  prescriptionCartItems: any;

  @cartStore.State
  cartItems: any;

  @cartStore.Action
  fetchPrescriptionCart!: () => Promise<void>;

  @cartStore.Action
  fetchCartItems!: () => Promise<void>;


  loading: Boolean = true;
  item: any = {};
  shipToMe = "yes";
  contactInfoForm = false;
  shippingInfoForm = false;

  contact: any = {
    fullName: "",
    email: "",
    phone: "",
    dialCode: "",
  };
  shipping: any = {
    fullName: "",
    address: "",
    apartment: "",
  };
  deliveryId = "";

  get userId() {
    return this.cornieUser?.id;
  }
  setDetails(details: CornieUser) {
    let firstName = details?.firstName;
    let lastName = details?.lastName;
    let middleName = details?.middleName as any;
    this.contact.email = details?.email;
    this.contact.phone = details?.phone.number;
    this.contact.dialCode = details?.phone.dialCode;

    this.contact.fullName = `${firstName} ${middleName} ${lastName}`;
  }
  setPatientDetails(details: any) {}

  get items() {
    let routeQuery = this.$route.query.type;
    if (routeQuery === "prescriptions") {
      return this.prescriptionCartItems || [];
    } else return this.cartItems || [];
  }

  saveContactInfo() {
    this.contactInfoForm = false;
  }
  saveShippingInfo() {
    this.shippingInfoForm = false;
  }

  updateShipping(data: any) {
    this.shipping.fullName = `${this.cornieUser.firstName} ${this.cornieUser.middleName} ${this.cornieUser.lastName}`
    this.shipping.address = `${data.houseNumber} ${data.address} ${data.city}`
    this.shipping.apartment = data.houseNumber
    this.deliveryId = data.id
  }

  async created() {
    this.setDetails(this.cornieUser);
    this.setPatientDetails(this.corniePatient);
    this.fetchPrescriptionCart()
    this.fetchCartItems()
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
