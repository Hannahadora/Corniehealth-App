<template>
  <div class="container-fluid p-2 h-screen overflow-y-scroll">
    <div class="w-full mb-6">
      <div
        class="w-full p-2 px-4 stock"
        v-if="!$route.path.includes('variant')"
      >
        <collapse-section
          :title="'New Product'"
          :show="true"
          :underlined="true"
          :color="'#080056'"
          :height="reqBody.type?.toLowerCase() === 'medication' ? 400 : 420"
        >
          <template #form>
            <div class="w-full mb-5">
              <p class="v-xteristics mb-4">Select Product Type</p>
              <div class="my-2 flex">
                <span
                  ><cornieradio
                    v-model="reqBody.type"
                    :label="'Medication Product'"
                    :value="'medication'"
                  />
                </span>
                <span class="ml-8"
                  ><cornieradio
                    v-model="reqBody.type"
                    :label="'Other Health Product'"
                    :value="'other'"
                  />
                </span>
              </div>
            </div>

            <div class="w-full" v-if="reqBody.type?.toLowerCase() === 'other'">
              <div class="container">
                <span class="flex items-center my-6">
                  <avatar class="mr-2" v-if="img.url" :src="img.url" />
                  <avatar
                    class="mr-2 h-20 w-20"
                    v-else
                    :src="img.placeholder"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    id="file"
                    @change="img.onChange"
                    hidden
                  />
                </span>
              </div>
            </div>

            <div class="w-full flex items-center my-3">
              <div class="w-4/12">
                <cornie-select
                  v-model="reqBody.category"
                  :label="'Category'"
                  :items="['Option 1']"
                />
              </div>
              <div class="w-4/12">
                <cornie-select
                  v-model="reqBody.genericName"
                  :label="'Generic Name'"
                  :items="['Option 1']"
                />
              </div>
              <div class="w-4/12">
                <cornie-select
                  v-model="reqBody.brand"
                  :label="'Brand/Manufacturer'"
                  :items="['Option 1']"
                />
              </div>
            </div>
            <div class="w-full flex items-center my-3">
              <div
                class="w-4/12"
                v-if="reqBody.type?.toLowerCase() === 'medication'"
              >
                <cornie-input
                  v-model="reqBody.ingredient"
                  :label="'Ingrdient'"
                  placeholder="--Autoloaded--"
                />
              </div>
              <div
                class="w-4/12"
                v-if="reqBody.type?.toLowerCase() === 'medication'"
              >
                <p
                  class="flex capitalize mb-5 text-black text-sm font-semibold"
                >
                  Ingredient Status
                </p>
                <div class="flex items-end -mb-2">
                  <span class="mr-14"
                    ><cornieradio
                      v-model="reqBody.ingredientStatus"
                      :label="'Active'"
                      :value="'active'"
                  /></span>
                  <cornieradio
                    :label="'Inactive'"
                    v-model="reqBody.ingredientStatus"
                    :valu="'inactive'"
                  />
                </div>
              </div>
              <div class="w-4/12">
                <cornie-input
                  :label="'Description'"
                  v-model="reqBody.description"
                  placeholder="Enter"
                />
              </div>
              <div
                class="w-4/12"
                v-if="reqBody.type?.toLowerCase() === 'other'"
              >
                <cornie-input
                  :label="'Container | Size'"
                  v-model="reqBody.size"
                  placeholder="Enter"
                />
              </div>
              <div
                class="w-4/12"
                v-if="reqBody.type?.toLowerCase() === 'other'"
              >
                <cornie-input
                  :label="'NAFDAC Registration No.'"
                  v-model="reqBody.regNo"
                  placeholder="--Autoloaded--"
                />
              </div>
            </div>
            <div
              class="w-full flex items-center mt-8 mb-3"
              v-if="reqBody.type?.toLowerCase() === 'medication'"
            >
              <div class="w-4/12">
                <cornie-input
                  :label="'NAFDAC Registration No.'"
                  v-model="reqBody.regNo"
                  placeholder="--Autoloaded--"
                />
              </div>
              <div class="w-4/12"></div>
              <div class="w-4/12"></div>
            </div>

            <div class="w-full my-6">
              <a
                class="v-xteristics flex cursor-pointer"
                @click="() => (showNewVariant = true)"
              >
                <span class="mr-3"><add-icon /> </span>
                <span>Variant Characteristics</span>
              </a>
            </div>
          </template>
        </collapse-section>
      </div>
      <div class="w-full p-2 px-4 stock" v-if="$route.path.includes('variant')">
        <collapse-section
          :title="'New Variant'"
          :show="true"
          :underlined="true"
          :color="'#080056'"
          :height="240"
        >
          <template #form>
            <div class="w-full flex items-center mb-3">
              <div class="w-4/12">
                <cornie-select :label="'Form'" :items="['Option 1']" />
              </div>
              <div class="w-4/12">
                <cornie-select :label="'Pack'" :items="['Option 1']" />
              </div>
              <div class="w-4/12">
                <cornie-select :label="'Pack Quantity'" :items="['Option 1']" />
              </div>
            </div>
            <div class="w-full flex items-center my-3">
              <div class="w-4/12">
                <cornie-select :label="'Strength'" :items="['Option']" />
              </div>
              <div class="w-4/12"></div>
              <div class="w-4/12"></div>
            </div>

            <div class="w-full my-6">
              <a
                class="v-xteristics flex cursor-pointer"
                @click="() => (showNewVariant = true)"
              >
                <span class="mr-3"><add-icon /> </span>
                <span>Add New Characteristics</span>
              </a>
            </div>
          </template>
        </collapse-section>
      </div>

      <div class="w-full my-5">
        <div
          class="stock py-5 cursor-pointer px-2"
          @click="() => (showNewStock = true)"
        >
          <p class="flex justify-between px-2 sub-header">
            <span>Stock Unit of Measurement (UoM)</span>
            <span><add-icon /></span>
          </p>
        </div>
      </div>

      <div class="w-full stock p-2 px-4">
        <collapse-section
          :title="'Cost Information'"
          :height="suppliers?.length > 1 ? suppliers?.length * 60 + 210 : 210"
        >
          <template #form>
            <div class="w-full mb-5 mt-2">
              <div class="mb-2 flex">
                <span
                  ><cornieradio
                    :label="'Purchase item'"
                    :value="'purchase'"
                    v-model="reqBody.purchaseType"
                  />
                </span>
                <span class="ml-8"
                  ><cornieradio
                    :label="'Non Purchase item'"
                    :value="'non purchase'"
                    v-model="reqBody.purchaseType"
                  />
                </span>
              </div>
            </div>
            <div class="w-full">
              <div class="w-full">
                <div class="w-full flex ths py-4">
                  <div
                    class="th py-4 flex items-center"
                    v-if="
                      reqBody.purchaseType?.toLowerCase() === 'purchase item'
                    "
                  >
                    <span class="pl-5">Default</span>
                  </div>
                  <div
                    class="th py-4 flex items-center"
                    v-if="
                      reqBody.purchaseType?.toLowerCase() === 'purchase item'
                    "
                  >
                    <span>Supplier Name</span>
                  </div>
                  <div class="th py-4 flex items-center">
                    <span
                      :class="{
                        'px-2':
                          reqBody.purchaseType?.toLowerCase() !==
                          'purchase item',
                      }"
                    >
                      {{
                        reqBody.purchaseType?.toLowerCase() === "purchase item"
                          ? "Purchase UOM"
                          : "UOM"
                      }}
                    </span>
                  </div>
                  <div class="th py-4 flex items-center">
                    <span>Item Quantity/Unit</span>
                  </div>
                  <div class="th py-4 flex items-center">
                    <span>Unit Cost</span>
                  </div>
                  <div class="th py-4 flex items-center">
                    <span>Available QTY</span>
                  </div>
                  <div class="th py-4 flex items-center">
                    <span> % availability</span>
                  </div>
                  <div class="th py-4 flex items-center">
                    <span>weighted av. cost</span>
                  </div>
                </div>
                <div
                  class="w-full flex tbs py- mb-3"
                  v-for="(supplier, index) in suppliers"
                  :key="index"
                >
                  <div
                    class="th flex items-center"
                    v-if="
                      reqBody.purchaseType?.toLowerCase() === 'purchase item'
                    "
                  >
                    <span class="pl-5"
                      ><cornieradio v-model="supplier.default" />
                    </span>
                  </div>
                  <div
                    class="th flex items-center"
                    v-if="
                      reqBody.purchaseType?.toLowerCase() === 'purchase item'
                    "
                  >
                    <span><cornie-input v-model="supplier.supplier" /></span>
                  </div>
                  <div class="th flex items-center">
                    <span
                      class="small-text capitalize"
                      :class="{
                        'pl-2':
                          reqBody.purchaseType?.toLowerCase() !==
                          'purchase item',
                      }"
                      >Carton</span
                    >
                  </div>
                  <div class="th flex items-center">
                    <span class="small-text capitalize">90</span>
                  </div>
                  <div class="th flex items-center">
                    <span><cornie-input v-model="supplier.unitCost" /></span>
                  </div>
                  <div class="th flex items-center">
                    <span
                      ><cornie-input v-model="supplier.availableQuantity"
                    /></span>
                  </div>
                  <div class="th flex items-center">
                    <span class="small-text capitalize">Autoloaded</span>
                  </div>
                  <div class="th flex items-center">
                    <span class="small-text capitalize">Autoloaded</span>
                  </div>
                </div>
              </div>
              <div class="w-full my-6">
                <a
                  class="v-xteristics flex cursor-pointer"
                  @click="addAnotherSupplier"
                >
                  <span class="mr-3"><add-icon /> </span>
                  <span>Add Another Supplier</span>
                </a>
              </div>
            </div>
          </template>
        </collapse-section>
      </div>

      <div class="w-full stock p-2 px-4 my-5">
        <collapse-section :title="'Sales Information'" :height="430">
          <template #form>
            <div class="w-full mt-2 mb-6 flex justify-between">
              <div
                class="w-4/12 p-4"
                style="
                  border: 1px solid #c2c7d6;
                  border-radius: 8px;
                  width: 32%;
                "
              >
                <p class="flex flex-col">
                  <span class="sales-label">Sales Information</span>
                  <span class="sales-value">--Autoloaded--</span>
                </p>
              </div>
              <div
                class="w-4/12 p-4"
                style="
                  border: 1px solid #c2c7d6;
                  border-radius: 8px;
                  width: 32%;
                "
              >
                <p class="flex flex-col">
                  <span class="sales-label">Sales Information</span>
                  <span class="sales-value">--Autoloaded--</span>
                </p>
              </div>
              <div
                class="w-4/12 p-4"
                style="
                  border: 1px solid #c2c7d6;
                  border-radius: 8px;
                  width: 32%;
                "
              >
                <p class="flex flex-col">
                  <span class="sales-label">Sales Information</span>
                  <span class="sales-value">--Autoloaded--</span>
                </p>
              </div>
            </div>
            <div class="w-full">
              <div class="w-full overflow-x-scroll">
                <div class="w-full flex ths py-2" style="min-width: 1330px">
                  <div class="th flex items-center">
                    <span>Sales Unit</span>
                  </div>
                  <div class="th flex items-center">
                    <span>QTY</span>
                  </div>
                  <div class="th flex items-center">
                    <span>service cost</span>
                  </div>
                  <div class="th flex items-center">
                    <span>Fee markup</span>
                  </div>
                  <div class="th flex items-center">
                    <span>Service fee</span>
                  </div>
                  <div class="th flex items-center">
                    <span>margin (ngn)</span>
                  </div>
                  <div class="th flex items-center">
                    <span>margin (%)</span>
                  </div>
                  <div class="th flex items-center">
                    <span>discount limit</span>
                  </div>
                  <div class="th flex items-center">
                    <span>Service fee (discounted)</span>
                  </div>
                  <div class="th flex items-center">
                    <span>DISCOUNTED margin (ngn)</span>
                  </div>
                  <div class="th flex items-center">
                    <span>DISCOUNTED margin(%)</span>
                  </div>
                </div>
                <div
                  class="w-full flex tbs py-2"
                  style="min-width: 1330px"
                  v-for="(sale, index) in sales"
                  :key="index"
                >
                  <div class="th flex items-center">
                    <span class="small-text">{{ sale.unitName }}</span>
                  </div>
                  <div class="th flex items-center">
                    <span class="small-text">900</span>
                  </div>
                  <div class="th flex items-center">
                    <span class="small-text">₦ 120,000.00</span>
                  </div>
                  <div class="th flex items-center">
                    <span class="small-text"
                      ><cornie-input v-model="sale.markup"
                    /></span>
                  </div>
                  <div class="th flex items-center">
                    <span class="small-text">₦ 240,000.00</span>
                  </div>
                  <div class="th flex items-center">
                    <span class="small-text">₦ 240,000.00</span>
                  </div>
                  <div class="th flex items-center">
                    <span class="small-text">50%</span>
                  </div>
                  <div class="th flex items-center">
                    <span class="small-text"
                      ><cornie-input v-model="sale.discountLimit"
                    /></span>
                  </div>
                  <div class="th flex items-center">
                    <span class="small-text">₦ 216,000.00</span>
                  </div>
                  <div class="th flex items-center">
                    <span class="small-text"> ₦ 86,000.00</span>
                  </div>
                  <div class="th flex items-center">
                    <span class="small-text">43%</span>
                  </div>
                </div>
                <!-- <div class="w-full flex tbs py-2" style="min-width:1330px">
                                    <div class="th flex items-center">
                                        <span class="small-text">Carton</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text">900</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text">₦ 120,000.00</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text"><cornie-input /></span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text">₦ 240,000.00</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text">₦ 240,000.00</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text">50%</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text"><cornie-input /></span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text">₦ 216,000.00</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text"> ₦ 86,000.00</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text">43%</span>
                                    </div>
                                </div> -->
              </div>
            </div>

            <div class="w-full my-5">
              <a class="v-xteristics">Tax Information</a>
              <span class="flex mt-4">
                <label class="inline-flex items-center">
                  <input
                    type="checkbox"
                    v-model="reqBody.applyVAT"
                    class="form-radio h-3 w-3"
                    :value="'Apply VAT to this service item'"
                  />
                  <span class="ml-2 noraml-text text-sm font-normal"
                    >Apply VAT to this service item</span
                  >
                </label>
              </span>
            </div>
          </template>
        </collapse-section>
      </div>

      <div class="w-full my-5 stock p-2 px-4">
        <collapse-section
          :title="'Inventory Information'"
          :height="280"
          :overflow="true"
        >
          <template #form>
            <div class="w-full flex mt-2 mb-3">
              <div class="w-4/12">
                <cornie-input
                  v-model="reqBody.inventory.itemCode"
                  :label="'Item Code'"
                  placeholder="--Autoloaded--"
                />
              </div>
              <div class="w-4/12">
                <cornie-input
                  :disabled="true"
                  placeholder="--Autoloaded--"
                  :label="'Primary Variant Characteristics'"
                />
              </div>
              <div class="w-4/12">
                <cornie-select
                  :label="'Valuation Method'"
                  v-model="reqBody.inventory.valuationMethod"
                  :items="['Weighted Average Cost', 'LIPO', 'FIPO']"
                />
              </div>
            </div>
            <div class="w-full flex my-3">
              <div class="w-4/12">
                <cornie-input
                  :disabled="true"
                  :label="'Opning Balance'"
                  v-model="reqBody.inventory.openingBalance"
                  placeholder="--Autoloaded--"
                />
              </div>
              <div class="w-4/12">
                <cornie-input
                  :label="'Reorder Level'"
                  v-model="reqBody.inventory.reorderLevel"
                  placeholder="Enter"
                />
              </div>
              <div class="w-4/12">
                <cornie-input
                  :label="'Batch No'"
                  v-model="reqBody.inventory.batchNo"
                  placeholder="Enter"
                />
              </div>
            </div>
            <div class="w-full flex mt-8 my-3">
              <div class="w-4/12">
                <DatePicker
                  :label="'Expiry Date'"
                  v-model="reqBody.inventory.expiryDate"
                />
              </div>
              <div class="w-4/12"></div>
              <div class="w-4/12"></div>
            </div>
          </template>
        </collapse-section>
      </div>

      <div class="w-full my-5 stock p-2 px-4">
        <collapse-section
          :title="'Storage Information'"
          :height="200"
          :overflow="true"
        >
          <template #form>
            <div class="w-full flex my-3">
              <div class="w-4/12">
                <cornie-select
                  :label="'Location'"
                  :items="locationsList"
                  v-model="reqBody.storage.locationId"
                  placeholder="Enter"
                />
              </div>
              <div class="w-4/12">
                <cornie-select
                  :label="'Room #'"
                  :items="locationsList"
                  v-model="reqBody.storage.room"
                  placeholder="Enter"
                />
              </div>
              <div class="w-4/12">
                <cornie-input :label="'Shelf #'" placeholder="Enter" />
              </div>
            </div>
            <div class="w-full flex mt-5 mb-3">
              <div class="w-4/12">
                <cornie-input
                  :label="'Rack #'"
                  v-model="reqBody.storage.rack"
                  placeholder="Enter"
                />
              </div>
              <div class="w-4/12">
                <cornie-input
                  placeholder="Enter"
                  v-model="reqBody.storage.bin"
                  :label="'Bin #'"
                />
              </div>
              <div class="w-4/12">
                <cornie-input
                  :label="'Storage Condition'"
                  v-model="reqBody.storage.condition"
                  :placeholder="'Enter'"
                />
              </div>
            </div>
          </template>
        </collapse-section>
      </div>

      <span class="w-full bg-danger">
        <span class="flex justify-end w-full m4-5">
          <cornie-btn
            class="m-5 px-5 font-semibold rounded-full"
            style="color: #080056; border: 1px solid #080056"
          >
            Cancel
          </cornie-btn>

          <cornie-btn
            class="bg-danger px-8 text-white my-5 mx-4 font-semibold rounded-full"
            @click="onSave"
            :loading="loading"
          >
            Save
          </cornie-btn>
        </span>
      </span>
    </div>

    <!-- <div style="height: 400px">

        </div> -->
    <side-modal
      :visible="showNewVariant"
      :header="'Variant Characteristics'"
      :width="550"
      @closesidemodal="() => (showNewVariant = false)"
    >
      <new-variant
        @added="variantAdded"
        @closesidemodal="() => (showNewVariant = false)"
      />
    </side-modal>

    <side-modal
      :visible="showNewStock"
      :header="'Stock Unit of Measurement (UoM)'"
      :width="550"
      @closesidemodal="() => (showNewStock = false)"
    >
      <stock-unit @closesidemodal="() => (showNewStock = false)" />
    </side-modal>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import CollapseSection from "./dropdown.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieRadio from "@/components/cornieradio.vue";
import Cornieradio from "@/views/dashboard/ehr/progressnotes/cornieradio.vue";
import AddIcon from "@/components/icons/add-orange.vue";
import CornieCheckbox from "@/components/corniecheckbox.vue";
import DatePicker from "@/components/datepicker.vue";
import Avatar from "@/components/avatar.vue";
import { useHandleImage } from "@/composables/useHandleImage";
import SideModal from "@/views/dashboard/schedules/components/side-modal.vue";
import NewVariant from "./new-variant.vue";
import StockUnit from "./stock-unit.vue";
import {
  ICatalogueProduct,
  IInventory,
  IIStorage,
  IProductVariant,
} from "@/types/ICatalogue";
import { namespace } from "vuex-class";
import ILocation from "@/types/ILocation";

const location = namespace("location");
const catalogue = namespace("catalogues");

@Options({
  components: {
    CollapseSection,
    CornieInput,
    CornieSelect,
    CornieRadio,
    Cornieradio,
    AddIcon,
    CornieCheckbox,
    DatePicker,
    Avatar,
    SideModal,
    NewVariant,
    StockUnit,
  },
})
export default class NewProuct extends Vue {
  @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;

  @catalogue.Action
  createProduct!: (data: ICatalogueProduct) => Promise<boolean>;

  reqBody = {
    type: "medication",
    purchaseType: "purchase",
    variants: [] as IProductVariant[],
    inventory: {} as IInventory,
    storage: {} as IIStorage,
    status: "active",
  } as ICatalogueProduct;

  suppliers = [
    {
      type: "purchase",
      unitCost: 0,
      availableQuantity: 0,
      supplier: "string",
      default: true,
    },
  ] as any[];

  sales = [
    {
      unitName: "Carton",
      itemQuantity: 0,
      markup: 0,
      discountLimit: 0,
    },
    {
      unitName: "Carton",
      itemQuantity: 0,
      markup: 0,
      discountLimit: 0,
    },
  ] as any[];
  costInformationType = "";

  img = setup(() => useHandleImage());
  showNewVariant = false;
  showNewStock = false;
  loading = false;

  get locationsList() {
    if (this.locations?.length <= 0) return [];
    return this.locations?.map((location) => {
      return {
        code: location.id,
        display: location.name,
      };
    });
  }

  addAnotherSupplier() {
    this.suppliers.push({});
  }

  variantAdded(variant: IProductVariant) {
    this.reqBody.variants?.push(variant);
  }

  async onSave() {
    try {
      this.loading = true;
      if (this.img?.url) {
        this.reqBody.image = this.img.url;
      }
      this.reqBody.costInformation = this.suppliers.map((i) => {
        i.type = this.reqBody.purchaseType;
        return i;
      });

      this.reqBody.salesUOMs = this.sales;
      const created = await this.createProduct(this.reqBody);

      if (created) {
        window.notify({
          msg: `Prodcut ${this.reqBody?.id ? "updated" : "saved"} successfully`,
          status: "success",
        });
        this.$router.go(-1);
      } else {
        window.notify({
          msg: "There was an error, please check the form and try again",
          status: "error",
        });
      }
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
      window.notify({
        msg: "There was an error, please check the form and try again",
        status: "error",
      });
    }
  }

  async created() {
    if (this.locations?.length <= 0) await this.fetchLocations();
    console.log(this.locations, "LOCATIONS");
  }
}
</script>

<style scoped>
.v-xteristics {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #fe4d3c;
}

.stock {
  background: #ffffff;
  /* Buttons & Cards */
  box-shadow: 0px 1px 2px rgba(46, 41, 78, 0.02),
    0px 4px 8px rgba(46, 41, 78, 0.08);
  border-radius: 8px;
}

.sub-header {
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  color: #14171f;
}

.th {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 19px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #080056;
  min-width: 120px;
  width: 16.6%;
  padding: 0.55rem 0.25rem;
}

.ths {
  background: #f0f4fe;
  border-radius: 8px 8px 0px 0px;
  padding: 0.25rem;
}

.tbs {
  background: #ffffff;
  border: 1px solid #c2c7d6;
  box-sizing: border-box;
  border-radius: 0px 0px 8px 8px;
}

.small-text {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #14171f;
}

.sales-value {
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 27px;
  color: #141f15;
}

.sales-label {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #667499;
}

.small-text {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #14171f;
}

input[type="checkbox"]:after {
  border: 1px solid #c4bdbd !important;
}
input[type="checkbox"]:checked:after {
  background-color: #ff0000 !important;
}
</style>
