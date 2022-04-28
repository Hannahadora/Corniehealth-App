<template>
  <cornie-dialog v-model="show" right class="w-1/2 h-full">
    <cornie-card
      v-if="type === 'Post Bill'"
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll"
    >
      <post-bill :request="request" :bill="bill" @closeModal="show = false" />
    </cornie-card>

    <cornie-card
      v-if="type === 'Post Claim'"
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll"
    >
     <post-claim :request="request" :bill="bill" /> 
    </cornie-card>

    <cornie-card
      v-if="type === 'Share Pay Link'"
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll"
    >
     <share-pay-link :request="request" :bill="bill" /> 
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieBtn from "@/components/CornieBtn.vue";
import { namespace } from "vuex-class";
import { CornieUser } from "@/types/user";
import { string } from "yup";
import { cornieClient } from "@/plugins/http";
import CornieRadio from "@/components/cornieradio.vue";
import IDispenseInfo from "@/types/IDispenseInfo";
import IBill from "@/types/IBill";

import PostBill from "./components/PostBill.vue";
import PostClaim from "./components/PostClaim.vue";
import SharePayLink from "./components/SharePayLink.vue";

import { first, getTableKeyValue } from "@/plugins/utils";

import { debounce } from "lodash";

const orgFunctions = namespace("OrgFunctions");
const user = namespace("user");

@Options({
  name: "CollectPayment",
  components: {
    CornieDialog,
    ...CornieCard,
    ArrowLeft,
    IconBtn,
    CornieInput,
    CornieSelect,
    CustomCheckbox,
    CornieBtn,
    CornieRadio,
    CancelIcon,
    IconInput,
    SearchIcon,
    PostBill,
    PostClaim,
    SharePayLink
  },
})
export default class CollectPayment extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, default: "" })
  request!: IDispenseInfo;

  @Prop({ type: String, default: "" })
  type!: string;

  @Prop({ type: Object, default: "" })
  bill!: any;


  loading = false;


  @user.Getter
  authCurrentLocation!: any;

  get locationId() {
    // return this.authCurrentLocation;
    return "21b84341-2051-4cad-b6b6-feae04f81215";
  }

  postBill() {

  }

  sharePayLink() {

  }

}
</script>

<style scoped>
</style>
