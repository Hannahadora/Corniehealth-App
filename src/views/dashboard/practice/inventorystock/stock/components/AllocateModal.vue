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
            Allocate Stock
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
            label="Item Name"
            class="w-full mb-4"
            placeholder="--Autofilled--"
            :disabled="true"
            v-model="item.name"
          />
          <cornie-input
            label="Item Code"
            class="w-full mb-4"
            placeholder="--Autofilled--"
            :disabled="true"
            v-model="item.code"
          />
          <cornie-input
            label="Available Quantity"
            class="w-full mb-4"
            placeholder="--Autofilled--"
            :disabled="true"
            v-model="item.balance"
          />
          <cornie-input
            label="Quantity to Allocate"
            class="w-full mb-4"
            placeholder="--Enter--"
            :type="'number'"
            :rules="isRequired"
            v-model="quantity"
          />
          <!-- <cornie-select
            class="w-full"
            :items="allLocations"
            label="Allocate To"
            placeholder="--Select---"
            v-model="recipient.locationId"
          >
          </cornie-select> -->
          <cornie-select
            class="w-full"
            placeholder="--Select---"
            :items="['holding', 'pharmacy', 'diagnostics', 'in-patient']"
            label="Inventory Category"
            v-model="recipient.category"
          >
          </cornie-select>
          <!-- <accordion-component
            title="New Storage Information"
            :grayCaption="true"
           :opened="false"
          >
          <template v-slot:default>
            <div class="mt-5">
                <cornie-input
                    label="Location"
                    class="w-full mb-4"
                    placeholder="--Autofilled--"
                    :disabled="true"
                />
                <cornie-input
                    label="Building No"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                />
                <cornie-input
                    label="Room No"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                />
                <cornie-input
                    label="Shelf No"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                />
                <cornie-input
                    label="Rack No"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                />
                <cornie-input
                    label="Bin No"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                />
            </div>
          </template>
          </accordion-component>
        -->
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
import { number, date } from "yup";

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

const location = namespace("location");
const inventorystock = namespace("inventorystock");
const user = namespace("user");

@Options({
  name: "AllocateModal",
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
  },
})
export default class AllocateModal extends Vue {
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

  @user.Getter
  authCurrentLocation!: string;

  loading = false;

  sourceId = "";
  quantity = 0;
  recipient = {
    locationId: "",
    category: "",
    productId: "",
  };

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
    this.recipient = stock.recipient;
  }

  get payload() {
    return {
      sourceId: this.item.id,
      quantity: this.quantity,
      recipient: this.recipient,
    };
  }

  get isRequired(){
      return number().max((+this.item.balance),
       "Quantity must be not be greater than avaialable quantity."); 
  

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
    this.payload.recipient.productId = this.item.productId;
    this.payload.recipient.locationId = this.authCurrentLocation;
    try {
      const response = await cornieClient().post(
        "/api/v1/inventory/stock/allocate",
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
  }
  async created() {
    await this.fetchLocations();
  }
}
</script>

<style></style>
