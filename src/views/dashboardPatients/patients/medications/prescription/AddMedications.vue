<template>
  <div>
    <v-form ref="form">
      <div class="">
        <div class="mt-6">
          <span
            class="mb-2 w-full rounded-full"
            @click="showDatalist = !showDatalist"
          >
            <icon-input
              autocomplete="off"
              class="border py-2 border-gray-600 rounded-full focus:outline-none"
              type="search"
              placeholder="Search and add"
              v-model="query"
            >
              <template v-slot:prepend>
                <search-icon />
              </template>
            </icon-input>
          </span>
          <div
            class=" w-full absolute shadow bg-white px-4 mx-4 bg-white border-gray-400 border top-100 left-0 m-3 rounded overflow-auto mt-2 svelte-5uyqqj"
            :class="[
              !showDatalist ? 'hidden' : 'o',
              filteredItems.length === 0 ? 'h-20' : 'h-auto',
            ]"
          >
            <div
              :class="[
                filteredItems.length === 0 ? 'h-20' : 'h-600 overflow-y-scroll',
              ]"
              style="width: 100%"
            >
              <div
                v-for="(group, i) in groupedMedications"
                :key="i"
                class="cursor-pointer mb-10 w-full border-gray-100 rounded-xl hover:bg-white-cotton-ball"
              >
                <div class="flex items-start bg-white shadow px-3 py-4">
                  <img :src="group.groupImg" alt="" class="mr-8 w-32 h-24" />
                  <div>
                    <p class="mb-8 font-bold">{{ group.name }}</p>
                    <p>{{ group.groupDesc }}</p>
                  </div>
                </div>

                <div class="bg-white shadow px-6 py-5 mt-4">
                  <div
                    v-for="(item, idx) in group.groupedItems"
                    :key="idx"
                    class="py-2 border-b border-b-gray-500 mb-1"
                    :class="{
                      'border-b-0': idx === group.groupedItems.length - 1,
                    }"
                  >
                    <div class="w-full flex items-center justify-between">
                      <div
                        class="w-6 h-6 rounded-full uppercase font-bold text-xs text-white text-center flex items-center justify-center bg-blue-500 mr-4"
                      >
                        {{ getInitial(item.organizationName) }}
                      </div>
                      <div class="w-10/12 grid grid-cols-3 space-x-4">
                        <div>
                          <p class="font-medium text-primary">
                            {{ item.organizationName }}
                          </p>
                          <p class="" style="font-size: 10px">
                            {{ item.address }}, {{ item.city }}
                          </p>
                          <p class="" style="font-size: 10px">
                            {{ item.state }}
                          </p>
                        </div>

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

                        <div>
                          <p class="line-through text-danger text-sm mr-3">
                            {{ item.productPrice }}
                          </p>
                          <p class="mb-2 font-semibold text-sm">
                            {{ item.productPrice }}
                          </p>
                        </div>
                      </div>

                      <cornie-radio name="search" @click="selected(item)" />
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="filteredItems.length === 0">
                <span
                  class="py-2 px-5 text-sm text-gray-600 text-center flex justify-center"
                  >No result found!</span
                >
              </div>
            </div>
            <div class="bg-white p-6 w-full flex justify-end absolute bottom-0 right-6" v-if="showDatalist">
              <cornie-btn
                @click="showDatalist = false"
                class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
              >
                Cancel
              </cornie-btn>
              <cornie-btn
                v-if="filteredItems.length > 0"
                :loading="loading"
                @click.prevent="handleSubmit"
                class="text-white bg-danger font-semibold px-6 rounded-xl"
              >
                Add to Cart
              </cornie-btn>
            </div>
          </div>
        </div>
      </div>
    </v-form>

    <add-to-cart-confirmation
      v-model="addToCartModal"
      :item="chosenMedication"
      @close="itemAdded"
    />
    <!-- <cornie-card> -->
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";

import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
import DescInput from "@/views/dashboard/ehr/vitals/components/input-desc-rounded.vue";
import Cancel from "@/components/icons/cancel-red-stroke.vue";
import Check from "@/components/icons/check-green-stroke.vue";
import AddToCartConfirmation from "./add-to-cart-confirmation.vue";

const user = namespace("user");

type Sorter = (a: any, b: any) => number;
function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "addMedications",
  components: {
    CornieIconBtn,
    ArrowLeftIcon,
    CancelIcon,
    CornieDialog,
    SearchIcon,
    IconInput,
    CornieRadio,
    CornieBtn,
    CancelRedBg,
    Cancel,
    Check,
    AddToCartConfirmation,
  },
})
export default class addMedications extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @user.Getter
  authCurrentLocation!: any;

  addToCartModal = false;
  medicationId = "";
  chosenMedication = {} as any;

  medicationDetails = [] as any;
  query = "";
  showDatalist = false;
  loading = false;

  deliveryTypes: any = [
    { type: "Pickup", mode: false },
    { type: "Same Day Delivery", mode: true },
    { type: "Standard Shipping", mode: false },
  ];

  selected(value: any) {
    this.chosenMedication = value;
  }

  get locationId() {
    return "21b84341-2051-4cad-b6b6-feae04f81215";
  }

  itemAdded() {
    this.showDatalist = false;
  }

  handleSubmit() {
    this.$emit("addMedication", this.chosenMedication);
    this.show = false;
    this.addToCartModal = true;
  }

  orderBy: Sorter = () => 1;

  get filteredItems() {
    return this.medicationDetails
      .filter((item: any) => this.filter(item, this.query))
      .sort(this.orderBy);
  }

  get groupedMedications() {
    const groups = this.filteredItems.reduce((item: any, obj: any) => {
      const key = obj.genericName;
      if (!item[key]) {
        item[key] = [];
      }
      item[key].push(obj);
      return item;
    }, {});

    const groupArrays = Object.keys(groups).map((name) => {
      return {
        name,
        groupedItems: groups[name],
        groupImg: this.filteredItems[0].image,
        groupDesc: this.filteredItems[0].description,
      };
    });

    return groupArrays || [];
  }

  async fetchMedications(
    query?: string,
    pharmacies?: string,
    classifications?: string,
    subClassifications?: string,
    locations?: string
  ) {
    try {
      const { data } = await cornieClient().get(
        `/api/v1/patient-portal/catalogue-product/search-catalogue?query=${query}`
      );
      this.medicationDetails = data || [];
    } catch (error) {
      window.notify({
        msg: "There was an error fetching medications",
        status: "error",
      });
    }
  }

  getInitial(str?: any) {
    return str?.charAt(0) || "";
  }

  @Watch("query")
  typed(query: string) {
    this.fetchMedications(query);
  }

  @Watch("showDatalist")
  change() {
    this.$emit("dropdownState", this.showDatalist);
  }

  async created() {
    this.$emit("dropdownState", this.showDatalist);
  }
}
</script>

<style scoped>
.h-600 {
  height: 600px;
}
</style>
