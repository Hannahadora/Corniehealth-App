<template>
  <cornie-dialog :modelValue="show" right class="w-1/3 h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll py-6"
    >
      <cornie-card-title class="flex items-center justify-end">
        <icon-btn @click="show = false">
          <arrow-left-icon stroke="#000" />
        </icon-btn>
        <div class="w-full">
          <h2
            class="font-bold float-left text-2xl text-primary ml-3 -mt-1 capitalize"
          >
            Supply History
          </h2>
          <cancel-red-bg
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <div>
        <div class="border p-4 flex items-center justify-between mb-6">
            <div class="">
              <p class="text-xs">
                Panadol <span class="text-gray-300">Tablet (10mg)</span>
              </p>
              <p class="text-xs">30 Tablets</p>
            </div>
          <p class="border border-gray-100 px-4 py-2">2 Packs</p>
          <p class="text-sm">1st July, 2022</p>
        </div>
      </div>

      <div class="absolute bottom-6 right-6">
        <div class="w-full mx-auto mt-12 flex items-center justify-end">
          <cornie-btn
            class="xl:mr-2 xl:mb-0 mb-6 xl:w-auto w-full bg-white px-6 py-1 text-primary border-primary border-2 rounded-xl"
            @click="show = false"
          >
            Close
          </cornie-btn>
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
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";

import InStore from "@/components/icons/in-store.vue";
import SameDay from "@/components/icons/same-day.vue";
import StandardShipping from "@/components/icons/standard-shipping.vue";
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
    ArrowLeftIcon,
  },
})
export default class SupplyHistory extends Vue {
  loading: Boolean = false;
  shippingMethod = "standard-shipping";

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

  async created() {}
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

.text-accent-blue {
  color: #114ff5;
}
</style>
