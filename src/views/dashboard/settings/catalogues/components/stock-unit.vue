<template>
  <div class="container-fluid px-3">
    <div class="w-full grid grid-cols-12 gap-3">
      <div class="w-full my-1 col-span-6">
        <cornie-select
          :label="'Purchase UOM'"
          style="width: 100%"
          :items="['Option 1']"
          v-model="stock.purchase"
        />
      </div>

      <div class="w-full my-1 col-span-6">
        <cornie-input
          :label="'Item Quantity/Purchase UOM'"
          style="width: 100%"
          v-model="stock.quantity"
        />
      </div>

      <div class="w-full my-1 col-span-6">
        <cornie-select
          :label="'Inventory UOM'"
          style="width: 100%"
          :items="['Option 1']"
          v-model="stock.inventory"
        />
      </div>

      <div class="w-full my-1 col-span-6">
        <cornie-input
          :label="'Item Quantity/Inventory UOM'"
          style="width: 100%"
          v-model="stock.itemInventory"
        />
      </div>

      <div class="w-full my-1 col-span-6">
        <cornie-select
          :label="'Sales UOM'"
          style="width: 100%"
          :items="['Option 1']"
          v-model="stock.sales"
        />
      </div>

      <div class="w-full my-1 col-span-6">
        <cornie-input
          :label="'Item Quantity/Sales UOM'"
          style="width: 100%"
          v-model="stock.itemSales"
        />
      </div>
    </div>
    <button
      class="w-full my-2 flex justify-end font-bold text-red-500"
      @click="add"
    >
      <span class="inline-block mr-1">Add</span><add-icon />
    </button>

    <span class="w-full bg-danger">
      <span class="flex justify-end w-full m4-5">
        <cornie-btn
          class="m-5 font-semibold rounded-full"
          style="color: #080056; border: 1px solid #080056"
          @click="$emit('closesidemodal')"
        >
          Cancel
        </cornie-btn>

        <cornie-btn
          class="bg-danger px-2 text-white my-5 mx-4 font-semibold rounded-full"
          @click="$emit('closesidemodal')"
        >
          Save
        </cornie-btn>
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieSelect from "@/components/cornieselect.vue";
import CornieInput from "@/components/cornieinput.vue";
import AddIcon from "@/components/icons/add-orange.vue";

@Options({
  components: {
    CornieSelect,
    CornieInput,
    AddIcon,
  },
  emits: ["added"],
})
export default class StockMeasurement extends Vue {
  stock = {
    purchase: "",
    quantity: "",
    inventory: "",
    itemInventory: "",
    sales: "",
    itemSales: "",
  } as any;

  add() {
    const { purchase, quantity, inventory, itemInventory, sales, itemSales } =
      this.stock;
    if (
      purchase === "" ||
      quantity === "" ||
      inventory === "" ||
      itemInventory === "" ||
      sales === "" ||
      itemSales === ""
    )
      return;

    this.$emit("added", this.stock);

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

<style scoped></style>
