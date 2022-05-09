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
                        :items="dropdwonOptions"
                        placeholder="Select"
                        v-model="returnedStock.purchase"
                        />
                        <cornie-input
                        :label="'Item Quantity/Purchase UOM'"
                        style="width: 100%"
                        v-model="returnedStock.quantity"
                        placeholder="Enter"
                        />
                        <cornie-select
                        :label="'Inventory UOM'"
                        style="width: 100%"
                        :items="dropdwonOptions"
                        v-model="returnedStock.inventory"
                        placeholder="Select"
                        />
                        <cornie-input
                        :label="'Item Quantity/Inventory UOM'"
                        style="width: 100%"
                        v-model="returnedStock.itemInventory"
                        placeholder="Enter"
                        />
                        <cornie-select
                        :label="'Sales UOM'"
                        style="width: 100%"
                        :items="dropdwonOptions"
                        v-model="returnedStock.sales"
                        placeholder="Select"
                        />
                        <cornie-input
                        :label="'Item Quantity/Sales UOM'"
                        style="width: 100%"
                        v-model="returnedStock.itemSales"
                        placeholder="Enter"
                        />
                </div>
                <span class="text-danger font-semibold flex justify-end cursor-pointer" @click="addSales"><span class="text-xl mr-3 -mt-1">+</span> Add</span>
                <div class="border-t-2 border-dashed  mt-5">
                  <div class="pt-3" v-for="(sale, index) in salesUOMs" :key="index">
                      <p>{{  sale.unitName }}</p>
                      <span class="text-gray-300 text-xs">{{ sale. itemQuantity}}</span>
                  </div>
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

  @Prop({ type: Object, default: {}})
  returnedStock!: any;

  @Prop({ type: Array, default: []})
  salesUOMs!: any;

  loading = false;

  PercentageMarkup = 200;
  MaxDiscount = 10;


@Watch("returnedStock")
    stockChanged() {
      this.setStock();
    }

  @Watch("id")
    idChanged() {
      this.setStock();
    }

async setStock(){
  const newstock = this.returnedStock;
  if (!newstock) return;
  this.stock.purchase = newstock.purchase;
  this.stock.quantity = newstock.quantity;
  this.stock.inventory = newstock.inventory;
  this.stock.itemInventory = newstock.itemInventory;
  this.stock.sales = newstock.sales;
  this.stock.itemSales = newstock.itemSales;

  this.salesUOMs = this.salesStock;

 
}
  

  stock = {
    purchase: "",
    quantity: "",
    inventory: "",
    itemInventory: "",
    sales: "",
    itemSales: "",
  } as any;

  salesStock = [] as any;
 

    submit() {
    if(this.salesStock === 0){
       return 
    }else{

      this.loading = true;
 
         this.$emit("added-stockunit", this.returnedStock, this.salesUOMs);
 
         this.loading = false;
         this.reset();
         this.show = false;
    }
    }

  addSales(){
    this.salesUOMs.push({ unitName: this.returnedStock.sales,
      itemQuantity: this.returnedStock.itemSales,
      markup: this.PercentageMarkup,
      discountLimit: this.MaxDiscount,})
  }

   get dropdwonOptions(){
     return [
        'Acre-Foot'	,
        'Are',
        'Bag',	
        'Bale',
        'Barrel',
        'Box',
        'Bucket',
        'Bushel',
        'Bundle',
        'Bottle',
        'Can',
        'Carton',
        'Crate',
        'Case',	
        'Chain',
        'Calorie',
        'Centigrade',	
        'Centiliter',	
        'Centimeter',	
       ' Cubic Foot',	
        'Cubic Inch',
        'Cubic Meter',
        'Cubic Yard',
        'Cup',
        'Day',
        'Decigrams',
        'Deciliter',
        'Decimeter',
        'Degree',	
        'Density',
        'Drum',	
        'Dozen',
        'Dram',
        'Each',	
        'Fahrenheit',
        'Farad',
        'Feet per second',	
        'Fluid ounce',	
        'Foot',	
        'Gallon',	
        'Gill',	
        'Grain',
        'Grams',
        'Gravity Imperial',	
        'Gravity Metric',	
        'Gross', 
        'Hectare',	
        'Hectoliter',	
        'Horsepower',
        'Hour',
        'Hundredweight',
        'Inch', 	
        'Joule',
        'Kelvin',	
        'Kilogram', 
        'Kilogram meters per second',	
        'Kilometer',
        'Kilopond', 
        'Kit	kit',
        'Kilowatt', 	
        'Linear Foot',
        'Light Year',	
        'Liter',	
        'Lumen',
        'Lumen Seconds',
        'Lux',
        'Meter', 
       'Meters per second', 
        'Mile', 
        'Miles per hour',
        'Milliliter',
        'Millimeter',
        'Minute',
        'Month', 	
        'Ounce', 
        'Pack', 
        'Pad',
        'Pair',	
        'Pallet',
        'Piece', 
        'Pint',	
        'Pond',	
        'Pound', 
        'Pounds per square inch',
        'Quart',
        'Rack',	
        'Ream',	
        'Roll',	
        'Second',
        'Sheet',
        'Square',
        'Square Decimeter',	
        'Square centimeter',
        'Square feet',
        'Square inches',
        'Square kilometer',	
        'Square meter',	
        'Square miles', 
        'Square millimeter', 
        'Square yards',	
        'Tablespoon',
        'Teaspoon', 
        'Ton',	
        'Tonne',
        'Volt',
        'Watt',	
        'Week',
        'Yard',
        'Year',	
     ]
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
