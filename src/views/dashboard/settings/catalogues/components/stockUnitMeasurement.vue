<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col h-full bg-white">
      <cornie-card-title class="">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full border-l-2 border-gray-300">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
           Stock Unit of Measurement (UoM)
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
        <cornie-card-text class="flex-grow scrollable">
            <v-form ref="form">
                <div class="w-full grid grid-cols-2 gap-4">
                        <cornie-select
                        :label="'Purchase UOM'"
                        style="width: 100%"
                        :items="['Option 1']"
                        placeholder="Select"
                        v-model="stock.purchase"
                        />
                        <cornie-input
                        :label="'Item Quantity/Purchase UOM'"
                        style="width: 100%"
                        v-model="stock.quantity"
                        placeholder="Enter"
                        />
                        <cornie-select
                        :label="'Inventory UOM'"
                        style="width: 100%"
                        :items="['Option 1']"
                        v-model="stock.inventory"
                        placeholder="Select"
                        />
                        <cornie-input
                        :label="'Item Quantity/Inventory UOM'"
                        style="width: 100%"
                        v-model="stock.itemInventory"
                        placeholder="Enter"
                        />
                        <cornie-select
                        :label="'Sales UOM'"
                        style="width: 100%"
                        :items="['Option 1']"
                        v-model="stock.sales"
                        placeholder="Select"
                        />
                        <cornie-input
                        :label="'Item Quantity/Sales UOM'"
                        style="width: 100%"
                        v-model="stock.itemSales"
                        placeholder="Enter"
                        />
                </div>
            </v-form>
        </cornie-card-text>
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="submit"
            class="text-white bg-danger px-6 rounded"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CornieInput from "@/components/cornieinput.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import IconBtn from "@/components/CornieIconBtn.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";


@Options({
  components: {
    ArrowLeft,
    CornieInput,
    ...CornieCard,
    CornieDialog,
    IconBtn,
    CornieSelect,
    CancelIcon,
  },
})
export default class stockUnitMeasuremnt extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;


  loading = false;

  stock = {
    purchase: "",
    quantity: "",
    inventory: "",
    itemInventory: "",
    sales: "",
    itemSales: "",
  } as any;
 

    submit() {
        this.loading = true;

        this.$emit("added-stockunit", this.stock);

        this.loading = false;
        this.reset();
    }


  
 reset() {
    this.stock = {
      purchase: "",
      quantity: "",
      inventory: "",
      itemInventory: "",
      sales: "",
      itemSales: "",
    };
  }
}
</script>
<style scoped>

</style>
