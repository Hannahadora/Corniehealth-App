<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <icon-btn @click="show = false" class="mr-2 cursor-pointer">
          <arrow-left-icon stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Accounts
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <div class="flex space-x-4 w-full justify-between" v-for="(item, index) in accounts" :key="index">
         <p class="text-lg text-gray-500">{{ getBankName(item.bank) }}</p>
         <p class="text-lg">
            {{ item.accountNumber }}
            <span class="text-sm text-green-300" v-if="item.defaultAccount">Default</span>
         </p>
        </div>
      </cornie-card-text>
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Close
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
  import CornieSelect from "@/components/autocomplete.vue";
  import CornieCard from "@/components/cornie-card";
  import CornieBtn from "@/components/CornieBtn.vue";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieIconBtn from "@/components/CornieIconBtn.vue";
  import CornieInput from "@/components/cornieinput.vue";
  import CornieRadio from "@/components/cornieradio.vue";
  import SelectOption from "@/components/custom-checkbox.vue";
  import IconInput from "@/components/IconInput.vue";
  import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
  import BluecheckIcon from "@/components/icons/bluecheck.vue";
  import CancelIcon from "@/components/icons/CloseIcon.vue";
  import FailIcon from "@/components/icons/fail.vue";
  import InfoIcon from "@/components/icons/info.vue";
  import SearchIcon from "@/components/icons/search.vue";
  import CornieMultiselect from "@/components/multiselect.vue";
  import CorniePhoneInput from "@/components/phone-input.vue";
  import { cornieClient } from "@/plugins/http";
  import IAssociate from "@/types/IAssociate";
  import ICollection from "@/types/ICollection";
  import Multiselect from "@vueform/multiselect";
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync, Watch } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { string } from "yup";

  const associations = namespace("associations");
  const collections = namespace("collections");

  @Options({
    name: "associationModal",
    components: {
      ...CornieCard,
      CornieIconBtn,
      Multiselect,
      ArrowLeftIcon,
      FailIcon,
      BluecheckIcon,
      CancelIcon,
      SelectOption,
      InfoIcon,
      CornieDialog,
      SearchIcon,
      IconInput,
      CornieInput,
      CornieSelect,
      CorniePhoneInput,
      CornieRadio,
      CornieBtn,
      CornieMultiselect,
    },
  })
  export default class AssociaitonModal extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @Prop({ type: String, default: "" })
    id!: string;

    @Prop({ type: Object, default: [] })
    accounts!: any;

    allBanks = [] as any;

     getBankName(code:string){
        const pt = this.allBanks.find((x:any) => x.code == code);
        return pt ? `${pt?.name}` : ''
    }
      async fetchDropDown() {
      try {
        const response = await cornieClient().get(
          "https://api.paystack.co/bank"
        );
        this.allBanks = response.data || {};
      } catch (error) {
        window.notify({ msg: "Could not fetch banks", status: "error" });
      }
    }
        async created(){
            await this.fetchDropDown();
        }

  }
</script>

<style>
 
</style>
