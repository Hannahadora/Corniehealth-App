<template>
  <cornie-dialog v-model="show" right class="w-9/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <span class="pr-2 flex items-center cursor-pointer border-r-2">
          <cornie-icon-btn @click="show = false">
            <arrow-left-icon />
          </cornie-icon-btn>
        </span>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
           Goods Received Note
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
            <div class="border-dashed border-b-2 border-gray-200 pb-5">
                <div class=" mt-5 grid grid-cols-2 gap-4 w-full">
                    <cornie-input
                        label="GRN ID"
                        class="w-full mb-4"
                        placeholder="--Autoloaded--"
                        :disabled="true"
                    />
                    <cornie-input
                        label="Currency"
                        class="w-full mb-4"
                        placeholder="--Autoloaded--"
                        :disabled="true"
                    />
                    <cornie-select
                    class="w-full"
                    placeholder="--Select---"
                    :items="['Active', 'Inactive', 'Resolved']"
                    label="Received From"
                    :labelText="true"
                    :innerlabel="'Add new'"
                    >
                    </cornie-select>
                    <cornie-input
                        label="Description"
                        class="w-full mb-4"
                        placeholder="--Autoloaded--"
                        :disabled="true"
                    />
                    <date-picker
                        label="Date"
                        class="w-full"
                    />
                        <cornie-input
                        label="Processed By"
                        class="w-full mb-4"
                        placeholder="--Autoloaded--"
                        :disabled="true"
                    />
                </div>
            </div>
          <div class="mt-5">
              <div class="w-full grid grid-cols-3 gap-4">
                  <p class="font-bold text-blue-600">Add Stock to:</p>
                  <cornie-select
                    class="w-full"
                    placeholder="--Select---"
                    :items="['Active', 'Inactive', 'Resolved']"
                    label="Select Inventory Location"
                    :labelText="true"
                    :innerlabel="'Add new'"
                    >
                  </cornie-select>
                  <cornie-select
                    class="w-full"
                    placeholder="--Select---"
                    :items="['Active', 'Inactive', 'Resolved']"
                    label="Select Inventory Category"
                    :labelText="true"
                    :innerlabel="'Add new'"
                    >
                  </cornie-select>

              </div>
          </div>
            <div class="border-dashed border-t-2 border-gray-200 mb-5 mt-5">
                <span class="text-danger font-bold m flex justify-end float-right mt-5 w-full cursor-pointer" @click="showItem = true"> 
                    <span class="text-xl -mt-1 mr-2">+</span>Add Item
            </span>
            </div>

            <div class="mt-12">
                <cornie-table v-model="items" :columns="headers" :deleteRow="true">
                    <template #received>
                            <div class="w-12">
                                <cornie-input placeholder="6"/>
                            </div>
                    </template>
                </cornie-table>
            </div>
        </v-form>
      </cornie-card-text>

      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <p class="text-sm font-bold text-danger float-left flex justify-start w-full">Save as draft</p>
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
  <item-modal v-model="showItem"/>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";

import ICatalogueService, { ICatalogueProduct } from "@/types/ICatalogue";

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
import DatePicker from "@/components/datepicker.vue";
import CDelete from "@/components/icons/adelete.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";

import ItemModal from "./itemModal.vue";



const catalogue = namespace("catalogues");

@Options({
  name: "grnModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    ArrowLeftIcon,
    DatePicker,
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
    MainCornieSelect,
    CornieTable,
    ItemModal
  },
})
export default class grnModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  loading = false;
  @catalogue.State
  products!: ICatalogueProduct[];

  @catalogue.Action
  getProducts!: () => Promise<void>;

  showItem = false;

  headers = [
    {
      title: "item code",
      key: "genericName",
      show: true,
    },
    {
      title: "item name",
      key: "code",
      show: true,
    },
    {
      title: "pack size",
      key: "category",
      show: true,
    },
    {
      title: "uofm",
      key: "description",
      show: true,
    },
    {
      title: "qty ordered",
      key: "received",
      show: true,
    },
    {
      title: "qty received",
      key: "received",
      show: true,
    },
    {
      title: "outstanding qty",
      key: "qty",
      show: true,
    },
  ];

  get items() {
    const products = this.products.map((product: any) => {
      return {
        ...product,
        action: product.id,
        keydisplay: "XXXXXXX",
        code: "xxxxxxx",
        createdAt: "19-07-21",
        condition: "Accident Prone",
        deceased: "No",
        qty: "24"
      };
    });
    return products;
  }

  created() {
    this.getProducts();
  }
}
</script>

<style></style>
