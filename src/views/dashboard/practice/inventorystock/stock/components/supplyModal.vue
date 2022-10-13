<template>
    <cornie-dialog v-model="show" right class="w-6/12 h-full">
      <cornie-card height="100%" class="flex flex-col">
        <cornie-card-title class="w-full">
          <span class="pr-2 flex items-center cursor-pointer border-r-2">
            <cornie-icon-btn @click="show = false">
              <arrow-left-icon />
            </cornie-icon-btn>
          </span>
          <div class="w-full">
            <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
              Supply Info
            </h2>
            <cancel-icon
              class="float-right cursor-pointer"
              @click="show = false"
            />
          </div>
        </cornie-card-title>
  
        <cornie-card-text class="flex-grow scrollable">
          <div>
            <div class="bg-primary p-5 w-full flex mb-5">
                <p class="float-left text-white w-full">Inventory Unit Cost: <span class="font-semibold">{{ item.unitPrice }}</span></p>
                <p class="text-center text-white w-full">Inventory Value: <span class="font-semibold">{{ item.opening }}</span></p>
                <p class="float-right text-white w-full">Balance to Date: <span class="font-semibold">{{ item.balance }}</span></p>
            </div>
            <div class="bg-blue-50 p-2 mb-5">
              <div class="flex justify-between w-full mb-5">
                  <p class="text-gray-600">Item Code</p>
                  <p class="text-black">{{ item.code }}</p>
              </div>
              <div class="flex justify-between w-full mb-5">
                  <p class="text-gray-600">Item Name</p>
                  <p class="text-black">{{ item.name }}</p>
              </div>
              <div class="flex justify-between w-full mb-5">
                  <p class="text-gray-600">Brand</p>
                  <p class="text-black">{{ item.brand }}</p>
              </div>
              <div class="flex justify-between w-full mb-5">
                  <p class="text-gray-600">Form</p>
                  <p class="text-black">{{ item.form }}</p>
              </div>
              <div class="flex justify-between w-full mb-5">
                  <p class="text-gray-600">Strength</p>
                  <p class="text-black">{{ item.strength }}</p>
              </div>
              <div class="flex justify-between w-full mb-5">
                  <p class="text-gray-600">Unit</p>
                  <p class="text-black">{{ item.uom }}</p>
              </div>
              <div class="flex justify-between w-full mb-5">
                  <p class="text-gray-600">Pack Size</p>
                  <p class="text-black">{{ item.form }}</p>
              </div>
              <div class="flex justify-between w-full mb-5">
                  <p class="text-gray-600">Balance to Date</p>
                  <p class="text-black">{{ item.balance }}</p>
              </div>
             
            </div>
            <div>
              <cornie-table
              v-model="items"
              :columns="headers"
              :search="true"
              :menushow="true"
            >
              <template #qty="{ item }">
                <div class="w-12">
                  <cornie-input placeholder="6" :rules="isRequired" v-model="quantities[item.id]" />
                </div>
              </template>
              <template #name="{ item }">
                <p>{{ item.name }}</p>
                <span class="text-gray-400 text-xs">{{
                  item.form + " . " + item.balance + item.uom
                }}</span>
              </template>
              <template #status="{ item }">
            <span class="bg-green-100 text-green-600 rounded-lg p-2 text-xs" v-if="item.status == 'active'">
               Active
            </span>
             <span class="bg-red-100 text-red-600 rounded-lg p-2 text-xs" v-if="item.status == 'inactive'">
               Inactive
            </span>
          </template>
            </cornie-table>
            </div>
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
            <cornie-btn
            @click="show = false"
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
  import search from "@/plugins/search";
  import { number, string } from "yup";
  
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
  import CornieSelect from "@/components/autocomplete.vue";
  import MainCornieSelect from "@/components/cornieselect.vue";
  import CorniePhoneInput from "@/components/phone-input.vue";
  import CornieBtn from "@/components/CornieBtn.vue";
  import NoteIcon from "@/components/icons/graynote.vue";
  import DEdit from "@/components/icons/aedit.vue";
  import RangeSlider from "@/components/range.vue";
  import CDelete from "@/components/icons/adelete.vue";
  import IconInput from "@/components/IconInput.vue";
  import SearchIcon from "@/components/icons/search.vue";
  import AccordionComponent from "@/components/dialog-accordion.vue";
  import CancelIcon from "@/components/icons/CloseIcon.vue";
  import CornieTable from "@/components/cornie-table/CornieTable.vue";
  
  import LocationIcon from "../icons/location.vue";
  
  const location = namespace("location");
  const inventorystock = namespace("inventorystock");
  const user = namespace("user");
  
  @Options({
    name: "SupplyInfoModal",
    components: {
      ...CornieCard,
      CornieIconBtn,
      NoteIcon,
      ArrowLeftIcon,
      RangeSlider,
      DEdit,
      CDelete,
      CornieTable,
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
    },
  })
  export default class SupplyInfoModal extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;
  
    @Prop({ type: String, default: "" })
    id!: string;
  
    @Prop({ type: Array, default: {} })
    item!: any;

    @Prop({ type: Array, default: [] })
    bactchitem!: any;
  
    @location.State
    locations!: ILocation[];
  
    @location.Action
    fetchLocations!: () => Promise<void>;
  
    @inventorystock.Action
    getInventoryStockById!: (id: string) => IInventroyStock;
  
    @user.Getter
    authCurrentLocation!: string;
  
    @inventorystock.State
    inventorystocks!: IInventroyStock[];
  
    @inventorystock.Action
    fetchInventorystocks!: (locationId: string) => Promise<void>;
  
    loading = false;
    query = "";
  
    sourceId = "";
    quantity = 0;
    category = "";
  
  
    headers = [
    {
      title: "item code",
      key: "code",
      show: true,
    },
    {
      title: "item name",
      key: "name",
      show: true,
    },
    {
      title: "brand",
      key: "brand",
      show: true,
    },
    {
      title: "pack size",
      key: "sales",
      show: true,
    },
    {
      title: "uofm",
      key: "uom",
      show: true,
    },
    {
      title: "Available QTy",
      key: "balance",
      show: true,
    },
    {
      title: "qty to allocate",
      key: "qty",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
  ];

  
    get items() {
      const inventorystocks = this.bactchitem.map((inventorystock: any) => {
      this.quantities[inventorystock.id] = 1;
      return {
        ...inventorystock,
        unitPrice: "₦" + (+inventorystock.unitPrice).toFixed(2),
        
      };
    });

    if (!this.query) return inventorystocks;
    return search.searchObjectArray(inventorystocks, this.query);
    }
    quantities = {} as Record <string, number>;
  
    required = string().required();
    get isRequired(){
       const value = this.bactchitem.map((c:any) => c.balance)
        return number().max((value),
         "Quantity must be not be greater than avaialable quantity."); 
    
  
    }
  
    buildPayload(item:any){
      return {
        sourceId: item.id,
        quantity: this.quantities[item.id],
        recipient:{
          locationId: this.authCurrentLocation,
          category: this.category,
          productId: item.productId,
        }
  
      }
    }
    
  
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
      this.sourceId = stock.sourceId;
      this.quantity = stock.quantity;
  
    }
  
    get payload() {
      return this.items.map(this.buildPayload);
    }
    async submit() {
      this.loading = true;
      if (this.id) await this.updateStock();
      else await this.createStock();
      this.loading = false;
    }
  
    async createStock() {
      const { valid } = await (this.$refs.form as any).validate();
      if (!valid) return;
     
      try {
        const response = await cornieClient().post(
          "/api/v1/inventory/stock/allocate-bulk",
          this.payload
        );
        if (response.success) {
          window.notify({ msg: "Stock Allocation Saved", status: "success" });
          this.done();
        }
      } catch (error: any) {
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
      } catch (error: any) {
        window.notify({ msg: error.response.data.message, status: "error" });
      }
    }
  
    done() {
      this.show = false;
      this.$emit("stockAdded");
  
      this.item = [];
    }
    async created() {
      await this.fetchLocations();
      if (this.authCurrentLocation)
        await this.fetchInventorystocks(this.authCurrentLocation);
    }
  }
  </script>
  
  <style></style>
  