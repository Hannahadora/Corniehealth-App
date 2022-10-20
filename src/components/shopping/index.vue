<template>
  <div class="bg-white mb-auto shadow-lg p-3 mt-2 rounded-lg w-full">
    <div class="w-full">
      <span
        class="flex flex-row w-full justify-between border-b-2 font-bold mb-10 text-xl text-primary py-2"
      >
        {{ title }}</span
      >
    </div>

    <div class="grid grid-cols-4 gap-6">
      <div class="bg-white mb-auto h-full shadow-lg p-3 mt-2 rounded-lg w-full">
        <slot name="sidebar"></slot>"
        <!-- <medication-shopping-sidebar /> -->
      </div>

      <div class="col-span-3">
        <div class="bg-white shadow-lg px-4 py-6 mt-2 rounded w-full mb-10">
          <div class="w-full grid grid-cols-4 items-center">
            <div class="col-span-3 flex mr-2">
              <span class="w-full rounded">
                <icon-input
                  autocomplete="off"
                  class="border border-gray-200 rounded py-4 focus:outline-none"
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
                style="white-space: nowrap"
              >
                Search best prices
              </cornie-btn>
            </div>
          </div>
        </div>

        <slot :itemprops="$props">
          <div class="bg-white mb-auto h-full shadow-lg p-4 rounded w-full">
            <div class="w-full grid grid-cols-3 gap-2">
              <div class="border px-2 py-5 flex">
                <quality-badge />
                <div class="ml-5">
                  <p class="mb-2 text-sm font-semibold">100% Top Quality</p>
                  <p class="text-xs">Quality guaranteed.</p>
                </div>
              </div>
              <div class="border px-2 py-5 flex">
                <delivery-badge />
                <div class="ml-5">
                  <p class="mb-2 text-sm font-semibold">Free Delivery</p>
                  <p class="text-xs">For orders above ₦10,000.</p>
                </div>
              </div>
              <div class="border px-2 py-5 flex">
                <savings-badge />
                <div class="ml-5">
                  <p class="mb-2 text-sm font-semibold">
                    Amazing Saving Options
                  </p>
                  <p class="text-xs">Explore saving options</p>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between py-4">
              <p class="text-xl font-bold">Shop our Best-selling Categories</p>
              <hr class="w-1/2" />
              <p class="text-red-400">View All</p>
            </div>

            <div class="flex items-end bg-danger mb-4">
              <div class="p-4">
                <arrow-left-white />
              </div>
              <div class="mb-4 w-11/12 grid grid-cols-4">
                <div class="p-4 text-white border-r-2 border-white">
                  <calendar-white />
                  <p class="my-2">Malaria</p>
                  <p>200 Products</p>
                </div>
                <div class="p-4 text-white border-r-2 border-white">
                  <doctor-white />
                  <p class="my-2">Cold and Cough</p>
                  <p>300 Products</p>
                </div>
                <div class="p-4 text-white border-r-2 border-white">
                  <drug-white />
                  <p class="my-2">Erectile</p>
                  <p>50 Products</p>
                </div>
                <div class="p-4 text-white">
                  <note-white />
                  <p class="my-2">Blood Pressure</p>
                  <p>50 Products</p>
                </div>
              </div>
              <div class="p-4">
                <arrow-right-white />
              </div>
            </div>
            <div class="grid grid-cols-3 gap-5">
              <div
                @click="viewItem(item)"
                v-for="(item, idx) in items"
                :key="idx"
                class="relative shadow w-full px-6 py-8 cursor-pointer"
              >
                <div class="">
                  <div class="flex">
                    <p class="mr-4 text-center w-10 h-10 flex items-center justify-center rounded-full text-white bg-gray-700 font-bold text-lg">
                        {{ getInitial(item.organizationName) }}
                      </p>
                    <div>
                      <p class="font-medium text-primary">
                        {{ item.organizationName }}
                      </p>
                      <p class="" style="font-size: 10px">
                        {{ item.address }} {{ item.city }}, {{ item.state }}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div class="flex items-center justify-center">
                      <img
                        :src="item.image"
                        alt=""
                        class="sample-img mt-5 mb-4"
                      />
                    </div>
                    <div class="h-16">
                      <p class="font-bold text-primary">{{ item.genericName }}</p>
                    </div>
                    <p class="text-sm text-primary">{{ item.form }}</p>
                    <p class="mt-5 flex">
                      <img src="@/assets/5star.png" alt="5-star" class="mr-4" />
                      <span>({{ item.noOfReviews }})</span>
                    </p>
                    <p class="mt-3 mb-4">
                      <span class="line-through text-danger text-sm mr-3">{{
                        item.productPrice
                      }}</span
                      ><span class="font-semibold text-sm">
                        {{ item.productPrice }}</span
                      >
                    </p>

                    <div>
                      <div
                        class="flex mb-2"
                        v-for="(type, idx) in deliveryTypes"
                        :key="idx"
                      >
                        <check v-if="type.mode" class="mr-3" />
                        <cancel v-else class="mr-3" />
                        <p class="text-xs">{{ type.type }}</p>
                      </div>
                    </div>

                    <div class="absolute bottom-6 w-11/12 mx-auto flex bg-danger rounded-xl mt-4 px-3">
                      <div
                        v-if="cartQuantity"
                        class="flex items-center justify-center text-white font-bold border-r border-white pr-3 py-2"
                      >
                        <p class="mr-2 font-bold text-xs">
                          {{ item.quantity }}
                        </p>
                        <div class="flex flex-col justify-center">
                          <chevron-white-up
                            class="cursor-pointer"
                            @click="increaseQuantity(item)"
                          />
                          <chevron-white-down
                            class="cursor-pointer"
                            @click="decreaseQuantity(item)"
                          />
                        </div>
                      </div>
                      <div
                        class="w-11/12 py-2 flex items-center justify-center"
                      >
                        <button
                          class="text-white font-bold text-center"
                          @click.stop="openCartConfirmation(item)"
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </slot>
      </div>
    </div>

    <add-to-cart-confirmation
      v-model="addToCartModal"
      :item="selectedItem"
      :id="selectedItem.productId"
    />
  </div>
</template>

<script lang="ts">
import CornieBtn from "@/components/CornieBtn.vue";
import CornieCheckbox from "@/components/custom-checkbox.vue";
import IconInput from "@/components/IconInput.vue";
import ArrowLeftWhite from "@/components/icons/arrow-left-white.vue";
import ArrowRightWhite from "@/components/icons/arrow-right-white.vue";
import CalendarWhite from "@/components/icons/calendar-white.vue";
import Cancel from "@/components/icons/cancel-red-stroke.vue";
import Check from "@/components/icons/check-green-stroke.vue";
import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";
import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
import ChevronWhiteDown from "@/components/icons/chevronwhitedown.vue";
import ChevronWhiteUp from "@/components/icons/chevronwhiteup.vue";
import DeliveryBadge from "@/components/icons/delivery-badge.vue";
import DoctorWhite from "@/components/icons/doctor-white.vue";
import DrugWhite from "@/components/icons/drug-white.vue";
import FiveStar from "@/components/icons/five-star.vue";
import NoteWhite from "@/components/icons/note-white.vue";
import QualityBadge from "@/components/icons/quality-badge.vue";
import SavingsBadge from "@/components/icons/savings-badge.vue";
import { namespace } from "vuex-class";
import {
  default as Search,
  default as SearchIcon,
} from "@/components/icons/search.vue";
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

// import AddToCartConfirmation from "./components/add-to-cart-confirmation.vue";
const cartStore = namespace("cart");

@Options({
  name: "ShoppingPageComponent",
  components: {
    ChevronRightIcon,
    ChevronLeftIcon,
    CornieBtn,
    Search,
    QualityBadge,
    DeliveryBadge,
    SavingsBadge,
    CalendarWhite,
    DoctorWhite,
    DrugWhite,
    NoteWhite,
    FiveStar,
    Cancel,
    Check,
    ArrowLeftWhite,
    ArrowRightWhite,
    ChevronWhiteDown,
    ChevronWhiteUp,
    CornieCheckbox,
    IconInput,
    SearchIcon,
    // AddToCartConfirmation,
  },
})
export default class ShoppingPageComponent extends Vue {
  loading: Boolean = false;
  searchQuery: any = "";
  addToCartModal: Boolean = false;
  selectedItem: any = {};

  @Prop()
  detailsUrl!: string;

  @Prop()
  items!: Array<any>;

  @Prop()
  deliveryTypes!: Array<any>;

  @Prop()
  title!: string;

  @Prop({ type: Boolean, default: true })
  cartQuantity!: boolean;

  @cartStore.Mutation
  setSelecteditem!: (item: any) => void;

  @Watch("searchQuery")
  handleQuery() {
    this.$emit("searchQuery", this.searchQuery);
  }

  openCartConfirmation(item: any) {
    this.selectedItem = item;
    this.addToCartModal = true;
  }

  getInitial(str?: any) {
    return str?.charAt(0) || "";
  }

  viewItem(item: any) {
    this.setSelecteditem(item);
    this.$router.push(`${this.detailsUrl}/${item.productId}`);
  }

  increaseQuantity(item: any) {
    let qty
    if(item.quantity){
      qty = item.quantity 
    } else {
      qty = 1
    }
    qty++
  }
  decreaseQuantity(item: any) {
    let qty
    if(item.quantity){
      qty = item.quantity 
    } else {
      qty = 1
    }
    qty--
  }

  async created() {}
}
</script>

<style scoped>
.sample-img {
  height: 110px;
  width: 200px;
}
</style>
