<template>
  <div class="bg-white mb-auto shadow-lg p-3 mt-2 rounded-lg w-full">
    <div class="w-full">
      <span
        class="flex flex-row w-full justify-between border-b-2 font-bold mb-10 text-xl text-primary py-2"
      >
        Shop Medications
      </span>
    </div>

    <div class="grid grid-cols-4 gap-6">
      <div class="bg-white mb-auto h-full shadow-lg p-3 mt-2 rounded-lg w-full">
        <medication-shopping-sidebar />
      </div>

      <div class="col-span-3">
        <div class="bg-white shadow-lg px-4 py-6 mt-2 rounded w-full mb-10">
          <div class="w-full grid grid-cols-4 items-center">
            <div class="col-span-3 flex mr-2">
              <span class="w-full rounded">
                <icon-input
                  autocomplete="off"
                  class="border border-gray-600 rounded py-4 focus:outline-none"
                  type="search"
                  placeholder="Search"
                  v-model="searchQuery"
                >
                  <template v-slot:prepend>
                    <search-icon />
                  </template>
                </icon-input>
              </span>
            </div>
            <div>
              <cornie-btn
                :loading="loading"
                type="submit"
                class="text-white bg-primary px-3 py-2 rounded font-bold"
              >
                Search best prices
              </cornie-btn>
            </div>
          </div>
        </div>

        <div class="bg-white mb-auto shadow-lg px-4 pt-3 rounded w-full">
          <div class="flex">
            <div class="mr-2">
              <img class="sample-img" :src="item.photo" alt="" />
            </div>
            <div>
              <div>
                <p class="text-xl font-bold mb-7">{{ item.name }}</p>
                <p>{{ item.description }}</p>
              </div>
              <div class="mt-6 flex">
                <cornie-select
                  v-model="item.brand"
                  :items="['Meijer', 'Kirkland', 'Her', 'Generic']"
                  class="w-24 mr-1"
                />
                <cornie-select
                  v-model="item.brand"
                  :items="['Tablet', 'Syrup', 'Gel', 'Capsule']"
                  class="w-24 mr-1"
                />
                <cornie-select
                  v-model="item.strength"
                  :items="['Tablet', 'Syrup', 'Gel', 'Capsule']"
                  class="w-24 mr-1"
                />
                <cornie-select
                  v-model="item.quantity"
                  :items="['Tablet', 'Syrup', 'Gel', 'Capsule']"
                  class="w-24 mr-1"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-10 bg-white mb-auto shadow-lg p-4 rounded w-full">
          <div class="w-full grid grid-cols-3 gap-2">
            <div class="border px-2 py-5 flex">
              <price-tag />
              <div class="ml-5">
                <p class="text-grey-blue mb-2 text-xs">
                  Cornie Health Lowest Price
                </p>
                <p class="font-bold">N4,000 (save 46%)</p>
              </div>
            </div>
            <div class="border px-2 py-5 flex">
              <retail-price />
              <div class="ml-5">
                <p class="text-grey-blue mb-2 text-xs">Average Retail Price</p>
                <p class="font-bold">N6,700</p>
              </div>
            </div>
            <div class="border px-2 py-5 flex">
              <availability-tag />
              <div class="ml-5">
                <p class="text-grey-blue mb-2 text-xs">Availability</p>
                <p class="font-bold">Generic & Brand</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-10 bg-white mb-auto shadow-lg p-4 rounded w-full flex">
          <p class="text-sm mr-4">Related Tags:</p>
          <div class="flex">
            <span class="related-tag mr-4">Pain</span>
            <span class="related-tag mr-4">Lekki, Lagos</span>
            <span class="related-tag mr-4"
              >Over-the-counter medication (OTC)</span
            >
          </div>
        </div>

        <div class="mt-10 bg-white mb-auto shadow-lg p-4 rounded w-full flex">
          <div class="w-full">
            <table class="w-full">
              <tr>
                <th>Lekki, Lagos</th>
                <th>Fulfillment</th>
                <th>Price</th>
                <th></th>
              </tr>
              <tr>
                <td>
                  <div class="flex">
                    <img :src="item.logo" alt="shop-logo" class="mr-3" />
                    <div>
                      <p class="text-xs font-medium text-primary">
                        {{ item.shopName }}
                      </p>
                      <p class="" style="font-size: 10px">
                        {{ item.location }}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div
                      class="flex mb-2"
                      v-for="(type, idx) in item.deliveryType"
                      :key="idx"
                    >
                      <check v-if="type.mode" class="mr-3" />
                      <cancel v-else class="mr-3" />
                      <p class="text-xs">{{ type.type }}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="line-through text-danger text-sm mr-3">
                    {{ item.oldPrice }}
                  </p>
                  <p class="mb-2 font-semibold text-sm">
                    {{ item.newPrice }}
                  </p>
                </td>
                <td>
                  <div class="w-full flex bg-danger rounded-xl mt-4 px-3">
                    <div
                      class="flex items-center justify-center text-white font-bold border-r border-white pr-3 py-3"
                    >
                      <p class="mr-2 font-bold text-xs">{{ item.quantity }}</p>
                      <div class="flex flex-col items-center justify-center">
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
                    <div class="w-11/12 py-3 flex items-center justify-center">
                      <button class="text-white font-bold text-center" @click="openCartConfirmation">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div class="mt-10 bg-white mb-auto shadow-lg p-4 rounded w-full">
          <p class="font-bold text-lg mb-2">Ways to Save on {{ item.name }}</p>
          <p class="mb-5">
            These programs and tips can help make your prescription more
            affordable
          </p>

          <FilterAccordion
            showText
            class="border-t"
            title="Use our Medication Subscription Service"
          >
            <div class="my-2">
              <p class="text-blue-400 text-sm mb-10">
                we source directly from manufacturers & distributors and pass
                the savings to you.
              </p>
              <p class="mb-6 text-sm">
                Signup for CornieHealth Medication Subscription
              </p>
              <div class="flex items-end justify-between py-5 px-3 bg-s-blue">
                <div class="flex">
                  <div class="mr-2">
                    <img class="sample-img" :src="item.photo" alt="" />
                  </div>
                  <div>
                    <div>
                      <p class="text-xl font-bold mb-2">{{ item.name }}</p>
                      <p class="text-xs">
                        Subscription Price:
                        <span class="text-blue-400">N3,000</span><br /><br />
                        Standard Shipping:
                        <span class="text-blue-400">Free</span><br /><br />
                        Delivery Time:
                        <span class="text-blue-400">3 - 7 business days</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <p class="cursor-pointer text-red-500 underline text-sm mr-1 font-bold">
                    Subscribe
                  </p>
                </div>
              </div>
              <p class="mt-6 text-sm">
                Cornie Health offers quality, affordable medications delivered
                to your home at your convenience on preset times.
              </p>
            </div>
          </FilterAccordion>
          <FilterAccordion
            showText
            class="border-t"
            title="Use our Medication Subscription Service"
          >
            <div class="my-2">
              <p class="text-blue-400 text-sm mb-10">
                we source directly from manufacturers & distributors and pass
                the savings to you.
              </p>
              <p class="mb-6 text-sm">
                Signup for CornieHealth Medication Subscription
              </p>
              <div class="flex items-end justify-between py-5 px-3 bg-s-blue">
                <div class="flex">
                  <div class="mr-2">
                    <img class="sample-img" :src="item.photo" alt="" />
                  </div>
                  <div>
                    <div>
                      <p class="text-xl font-bold mb-2">{{ item.name }}</p>
                      <p class="text-xs">
                        Subscription Price:
                        <span class="text-blue-400">N3,000</span><br /><br />
                        Standard Shipping:
                        <span class="text-blue-400">Free</span><br /><br />
                        Delivery Time:
                        <span class="text-blue-400">3 - 7 business days</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <p class="cursor-pointer text-red-500 underline text-sm mr-1 font-bold">
                    Subscribe
                  </p>
                </div>
              </div>
              <p class="mt-6 text-sm">
                Cornie Health offers quality, affordable medications delivered
                to your home at your convenience on preset times.
              </p>
            </div>
          </FilterAccordion>
          <FilterAccordion
            showText
            class="border-t"
            title="Use our Medication Subscription Service"
          >
            <div class="my-2">
              <p class="text-blue-400 text-sm mb-10">
                we source directly from manufacturers & distributors and pass
                the savings to you.
              </p>
              <p class="mb-6 text-sm">
                Signup for CornieHealth Medication Subscription
              </p>
              <div class="flex items-end justify-between py-5 px-3 bg-s-blue">
                <div class="flex">
                  <div class="mr-2">
                    <img class="sample-img" :src="item.photo" alt="" />
                  </div>
                  <div>
                    <div>
                      <p class="text-xl font-bold mb-2">{{ item.name }}</p>
                      <p class="text-xs">
                        Subscription Price:
                        <span class="text-blue-400">N3,000</span><br /><br />
                        Standard Shipping:
                        <span class="text-blue-400">Free</span><br /><br />
                        Delivery Time:
                        <span class="text-blue-400">3 - 7 business days</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <p class="cursor-pointer text-red-500 underline text-sm mr-1 font-bold">
                    Subscribe
                  </p>
                </div>
              </div>
              <p class="mt-6 text-sm">
                Cornie Health offers quality, affordable medications delivered
                to your home at your convenience on preset times.
              </p>
            </div>
          </FilterAccordion>
        </div>
      </div>
    </div>
    
    <add-to-cart-confirmation v-model="addToCartModal" :item="item" :id="item.id" />
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
import CornieCheckbox from "@/components/custom-checkbox.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CornieSelect from "@/components/cornieselect.vue";
import PriceTag from "@/components/icons/price-tag.vue";
import RetailPrice from "@/components/icons/retail-price.vue";
import AvailabilityTag from "@/components/icons/availability-tag.vue";
import FilterAccordion from "../components/filter-accordion.vue";

import MedicationShoppingSidebar from "../components/medication-shoppings-sidebar.vue";
import AddToCartConfirmation from "../components/add-to-cart-confirmation.vue";

@Options({
  name: "ShopDetailsPage",
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
    MedicationShoppingSidebar,
    CornieCheckbox,
    IconInput,
    SearchIcon,
    CornieSelect,
    PriceTag,
    RetailPrice,
    AvailabilityTag,
    FilterAccordion,
    AddToCartConfirmation,
  },
})
export default class ShopDetailsPage extends Vue {
  appointments: any = [];
  appointmentModal: Boolean = false;
  loading: Boolean = true;
  searchQuery: any = "";
  addToCartModal: Boolean = false;

  item: any = {
    id: '657gfhjcgtdfghbvcfghjgfyytytyutyu',
    logo: require("@/assets/img/item-logo.svg"),
    location: "23, Admiralty Way, Lekki, Lagos",
    shopName: "MedPlus",
    name: "Anti-malaria  bundle",
    form: "Tablet 10mg (30 Tabs Per pack)",
    oldPrice: "N13, 950.00",
    newPrice: "N13, 950.00",
    deliveryType: [
      { type: "Pickup", mode: false },
      { type: "Same Day Delivery", mode: true },
      { type: "Standard Shipping", mode: false },
    ],
    noOfReviews: "14",
    photo: require("@/assets/img/panadol-item.svg"),
    quantity: 0,
    description:
      "Ibuprofen is used to reduce fever and to relieve minor aches and pain from headaches, muscle aches, arthristis, menstrual periods, and the common cold. See more",
  };

  async fetchAppointments() {
    try {
      this.loading = true;
      const { data } = await cornieClient().get(
        "/api/v1/patient-portal/appointment/get-all-user-appointment"
      );
      this.appointments = data;
    } catch (error) {
      window.notify({
        msg: "There was an error fetching appointments",
        status: "error",
      });
    } finally {
      this.loading = false;
    }
  }

  openCartConfirmation(item: any) {
    this.item = item;
    this.addToCartModal = true
  }


  async created() {
    await this.fetchAppointments();
  }
}
</script>

<style scoped>
.sample-img {
  height: 143px;
  width: 175px;
}
.bg-s-blue {
  background: #F0F4FE
}
.related-tag {
  background: #f6f8f9;
  padding: 4px 16px;
  border-radius: 100px;
}
.text-grey-blue {
  color: #667499;
}

th {
  background: #f0f4fe;
  text-align: left;
  padding: 10px 12px;
  border-radius: 4px 4px 0px 0px;
  color: #080056;
  font-size: 12px;
}

td {
  padding: 10px 12px;
}
</style>
