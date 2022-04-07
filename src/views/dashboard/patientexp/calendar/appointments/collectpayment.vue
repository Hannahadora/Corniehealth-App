<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
          Collect Payment
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
         <v-form ref="form">
             <cornie-input
                    label="Amount to Due (NGN)"
                    class="w-full mt-5"
                    :placeholder="'Autoloaded'"
                    :disabled="true"
                    v-model="bill.total"
            />
           <!-- <cornie-input
                    label="Payment Type"
                    class="w-full mt-5"
                    :placeholder="'Point of sale'"
                    :disabled="true"
            /> -->
             <cornie-select
                    :items="['Cash','POS','Transfer','Wallet','Card on file']"
                    :placeholder="'Select'"
                    :label="'Payment Type'"
                    class="w-full mt-5"
              />
               <text-area :label="'Note'" v-model="note" placeholder="Type here" class="w-full"/>
       
        </v-form>
      </cornie-card-text>
      
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2  mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
             @click="submit"
            class="text-white bg-danger px-2 rounded-xl"
           >
            Submit
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  <new-practitioner v-model="showPractitionerModal"    :specilatyId="specilatyId"/>

  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { cornieClient } from "@/plugins/http";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CloseIcon from "@/components/icons/whitecancel.vue";
import { namespace } from "vuex-class";
import Multiselect from "@vueform/multiselect";
import CornieSelect from "@/components/cornieselect.vue";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import Avatar from "@/components/avatar.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import ISpecial from "@/types/ISpecial";
import SelectOption from "@/components/custom-checkbox.vue";
import search from "@/plugins/search";
import TextArea from "@/components/textarea.vue";
import CornieInput from "@/components/cornieinput.vue";

const practitioner = namespace("practitioner");
const special = namespace("special");

type Sorter = (a: any, b: any) => number;


function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "collectPayment",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    Multiselect,
    CancelIcon,
    CornieDialog,
    Avatar,
    SelectOption,
    SearchIcon,
    TextArea,
    DeleteIcon,
    IconInput,
     CornieInput,
    CornieBtn,
    CornieSelect,
    CloseIcon
  },
})
export default class collectPayment extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  specilatyId!: string;


  loading = false;
  showPractitionerModal = false;
  aPractitioner = [];
  localSrc = require("../../../../../assets/img/placeholder.png");
  query = "";
  orderBy: Sorter = () => 1;
  bill = [] as any;
  note = "";


 @practitioner.State
  practitioners!: IPractitioner[];


  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

   @Watch("id")
  idChanged() {
    this.fetchBill();
  }

 get filteredItems() {
    return this.practitioners
      .filter((item: any) => this.filter(item, this.query))
      .sort(this.orderBy);
  }

  async fetchBill() {
     try {
      const response = await cornieClient().post(
      `/api/v1/appointment/bill/generate/${this.id}`,{note: this.note}
      );
      if (response.success) {
         this.bill = response.data;
      }
    } catch (error:any) {
     window.notify({ msg: error.response.data.message, status: "error" });
    }
  }

   async submit() {
    this.loading = true;
    if (this.id) await this.createPayment();
    this.loading = false;
  }

  async createPayment() {
     try {
      const response = await cornieClient().post(
      `/api/v1/appointment/bill/collect/${this.id}`,{note: this.note}
      );
      if (response.success) {
        window.notify({ msg: "Payment collected succesfully", status: "success" });
        this.show = false;  
      }
    } catch (error:any) {
     window.notify({ msg: error.response.data.message, status: "error" });
    }
    
   // this.bill = response[0].data;
  }
  mounted(){
     if (this.id)  this.fetchBill();
  }
  async created() {
    await this.fetchPractitioners();
    if (this.id)  await this.fetchBill();
  }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.dflex {
  display: -webkit-box;
}
</style>
