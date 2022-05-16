<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
         <span class="pr-2 flex items-center cursor-pointer border-r-2">
            <cornie-icon-btn @click="show = false">
            <arrow-left-icon />
            </cornie-icon-btn>
          </span>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
           Withdrawal Instruction
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
                label="Item"
                class="w-full mb-4"
                placeholder="--Autoloaded--"
                :disabled="true"
                v-model="item.name"
              />
               <cornie-input
                label="Item Code"
                class="w-full mb-4"
                 placeholder="--Autoloaded--"
                :disabled="true"
                 v-model="item.code"
              />
               <cornie-input
                label="Batch No"
                class="w-full mb-4"
                 placeholder="--Autoloaded--"
                 v-model="batchNumber"
              />
               <cornie-datepicker
                label="Expiry Date"
                class="w-full"
                 placeholder="--Autoloaded--"
                 v-model="expiryDate"
              />
              <cornie-input
                label="Supply Quantity"
                class="w-full mb-4 mt-4"
                 placeholder="--Autoloaded--"
                :disabled="true"
                 v-model="item.balance"
              />
               <cornie-select
                label="Reason for Withdrawal"
                class="w-full mb-4"
                placeholder="--Select--"
                :items="['Keep in Reserve','Faulty','Damaged','Quality Issue','Expired','Others']"
                v-model="reasonForWithdrawal"
              />
           <p class="bg-blue-50 text-dark text-sm p-3 rounded">
               Notifications will be sent to all locations & categories
           </p>

        </v-form>
      </cornie-card-text>
      
      <cornie-card>
        <cornie-card-text class="flex justify-end">

          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="submit"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
    </cornie-card>
   
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";


import ILocation from "@/types/ILocation";
import IInventroyStock from "@/types/IInventroyStock";


import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from "@/components/icons/info.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import NoteIcon from "@/components/icons/graynote.vue";
import DEdit from "@/components/icons/aedit.vue";
import RangeSlider from "@/components/range.vue";
import CDelete from "@/components/icons/adelete.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CornieDatepicker from "@/components/datepicker.vue";


const location = namespace("location");
const inventorystock = namespace("inventorystock");


@Options({
  name: "withdrawlInstruction",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    ArrowLeftIcon,
    RangeSlider,
    DEdit,
    CDelete,
    CancelIcon,
    InfoIcon,
    CornieDialog,
    SearchIcon,
    AccordionComponent,
    IconInput,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieRadio,
    CornieBtn,
    CornieDatepicker,
  },
})
export default class withdrawlInstruction extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, default: {} })
  item!: any;

   @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;


    @inventorystock.Action
    getInventoryStockById!: (id: string) => IInventroyStock;



  loading = false;

  productId = "";
  batchNumber = "";
  expiryDate = "";
  reasonForWithdrawal = "";
 
  get allLocations() {
    if (!this.locations || this.locations.length === 0) return [];
    return this.locations.map((i: any) => {
      return {
        code: i.id,
        display: i.name,
      };
    });
  }
  
    async setStock() {
        const stock = await this.getInventoryStockById(this.id);
        if (!stock) return;
       
    }

    get payload() {
        return {
            productId: this.item.productId,
            batchNumber: this.batchNumber,
            expiryDate : this.expiryDate,
            reasonForWithdrawal: this.reasonForWithdrawal
          
        };
   }
  async submit() {
    this.loading = true;
    if (this.id) await this.updateStock();
    else await this.createWithdrawl();
    this.loading = false;
  }

  async createWithdrawl() {
  const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;
    try {
      const response = await cornieClient().post(
        "/api/v1/inventory/withdrawal-instruction",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Stock withdrawn Successfully", status: "success" });
        this.done();
      }
    } catch (error:any) {
        window.notify({ msg: error.response.data.message, status: "error" });
    }
  }
  async updateStock() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;
    const id = this.id;
    const url = `/api/v1/medication-requests/${id}`;
    const payload = this.payload;
    try {
      const response = await cornieClient().put(url, this.payload);
      if (response.success) {
        window.notify({ msg: "Stock Allocation Updated", status: "success" });
        this.done();
      }
    } catch (error:any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }

done(){
  this.show = false;
  this.$emit('stockAdded')
}
 async created() {
   await this.fetchLocations();
  }
}
</script>

<style></style>
