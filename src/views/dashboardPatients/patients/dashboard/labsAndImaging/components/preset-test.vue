<template>
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
          <p class="mb-2 text-sm font-semibold">Amazing Saving Options</p>
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
        @click="$router.push(`${detailsUrl}/${item.id}`)"
        v-for="(item, idx) in displayServices"
        :key="idx"
        class="shadow w-full px-6 py-8 cursor-pointer capitalize"
      >
        <div>
          <div class="flex">
            <img :src="item.logo" alt="shop-logo" class="mr-3" />
            <div>
              <p class="text-xs font-medium text-primary">
                {{ item.shopName }}
              </p>
              <p class="capitalize" style="font-size: 10px">
                {{ item.location }}
              </p>
            </div>
          </div>
          <div>
            <div class="flex items-center justify-center">
              <img :src="item.photo" alt="" class="sample-img mt-5 mb-4 h-" />
            </div>
            <p class="font-bold text-primary">{{ item.name }}</p>
            <p class="text-sm text-primary">{{ item.form }}</p>
            <p class="mt-5 flex">
              <img src="@/assets/5star.png" alt="5-star" class="mr-4" />
              <span v-if="item?.noOfReviews">({{ item.noOfReviews }})</span>
            </p>
            <p class="mt-3 mb-4">
              <span class="line-through text-danger text-sm mr-3">{{
                item.oldPrice
              }}</span
              ><span class="font-semibold text-sm"> {{ item.newPrice }}</span>
            </p>

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

            <div class="w-full flex bg-danger rounded-xl mt-4 px-3">
              <div
                v-if="cartQuantity"
                class="flex items-center justify-center text-white font-bold border-r border-white pr-3 py-2"
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
              <div class="w-11/12 py-2 flex items-center justify-center">
                <button
                  class="text-white font-bold text-center"
                  @click.stop="openCartConfirmation"
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
  import {
    default as Search,
    default as SearchIcon,
  } from "@/components/icons/search.vue";
  import { Options, Vue } from "vue-class-component";
  import { Prop, Watch } from "vue-property-decorator";

  import AddToCartConfirmation from "@/components/shopping/components/add-to-cart-confirmation.vue";

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
      AddToCartConfirmation,
    },
  })
  export default class ShoppingPageComponent extends Vue {
    loading: Boolean = true;
    searchQuery: any = "";
    addToCartModal: Boolean = false;
    selectedItem: any = {};

    @Prop()
    detailsUrl!: string;

    @Prop({ type: Array, default: [] })
    items!: Array<any>;

    @Prop()
    title!: string;

    @Prop({ type: Boolean, default: true })
    cartQuantity!: boolean;

    @Watch("searchQuery")
    handleQuery() {
      this.$emit("searchQuery", this.searchQuery);
    }

    openCartConfirmation(item: any) {
      this.selectedItem = item;
      this.addToCartModal = true;
    }

    get displayServices() {
      return this.items.length > 0
        ? this.items
            .filter((item) => true)
            .map((item) => {
              const { address, city, state } = item?.providerAddresses[0];
              return {
                logo: item?.image || require("@/assets/img/item-logo.svg"),
                shopName: item?.provider,
                photo: item?.image || require("@/assets/img/prostate-test.png"),
                location: `${address}, ${city}, ${state}`,
                oldPrice: item?.originalPrice,
                newPrice: item?.discountedPrice,
                name: item?.name,
                deliveryType: item?.channelsOfService,
                description: item?.description,
              };
            })
        : [];
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
