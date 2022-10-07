<template>
  <cornie-dialog v-model="show" right class="w-8/12 h-full">
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
          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="GRN Info" :opened="true">
              <template v-slot:default>
                <div class="mt-5 grid grid-cols-2 gap-4 w-full">
                  <cornie-input
                  v-if="identifier"
                    label="Request #"
                    class="w-full mb-4"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="identifier"
                  />
                  <!-- <cornie-input
                    label="Reference #"
                    class="w-full mb-4"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="referenceNumber"
                  /> -->
                 
                </div>
                <div class="w-full">
                   <Textarea
                    label="Description"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="description"
                     :rows="'2'"
                    :cols="'2'"
                    :rules="requiredRule"
                  ></Textarea>
                </div>
              </template>
            </accordion-component>
          </div>
          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="Receiver" :opened="false">
              <template v-slot:default>
                <div class="mt-5 grid grid-cols-2 gap-4 w-full">
                  <cornie-input
                    label="Name"
                    class="w-full mb-4"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="receivedBy.name"
                  />
                  <cornie-phone-input
                    label="Phone Number"
                    class="w-full mb-4"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="receivedBy.phone.number"
                    v-model:code="receivedBy.phone.dialCode"
                  />
                  <cornie-input
                    label="Email"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    :disabled="true"
                    v-model="receivedBy.email"
                  />
                  <date-picker
                    label="Date"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    :disabled="true"
                    v-model="dateReceived"
                  />
                  <cornie-input
                    class="w-full"
                    placeholder="Autoloaded"
                    label="Department"
                    v-model="authPractitioner.department"
                    :disabled="true"
                  >
                  </cornie-input>
                   <list-select label="Receive To" v-model="receiverLocationId"  :items="allLocations" :receiver="true" :placeholder="'--Select--'" @setValue="setRecevier"/>
                  <!-- <cornie-select
                    class="w-full"
                    placeholder="--Select--"
                    :items="allLocations"
                    label="Receive To"
                    v-model="receiverLocationId"
                    :rules="requiredRule"
                  >
                  </cornie-select> -->
                </div>
              </template>
            </accordion-component>
          </div>
          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="Supplier" :opened="false">
              <template v-slot:default>
                <div class="mt-5 grid grid-cols-2 gap-4 w-full">
                  <list-select label="Recorder" v-model="supplierType" :items="['Internal Supplier','External Supplier']"  :placeholder="'--Select--'" @setValue="setValue"/>
                    <cornie-input
                   v-if="valueType !== 'category'"
                    label="Supplier Name"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplierName"
                    :rules="requiredRule"
                  />
                  <cornie-select
                    v-if="valueType == 'category'"
                    label="Country"
                    class="w-full mb-4"
                    placeholder="--Select--"
                    :items="nationState.countries"
                    v-model="nationState.country"
                    :rules="requiredRule"
                     :readonly="true"
                  />
                  <cornie-select
                  v-else
                    label="Country"
                    class="w-full mb-4"
                    placeholder="--Select--"
                    :items="nationState.countries"
                    v-model="nationState.country"
                    :rules="requiredRule"
                  />
                  <cornie-select
                   v-if="valueType == 'category'"
                    label="State or Region"
                    class="w-full mb-4"
                    placeholder="--Select--"
                    :items="nationState.states"
                    v-model="state"
                    :rules="requiredRule"
                    :readonly="true"
                  />
                  <cornie-select
                  v-else
                    label="State or Region"
                    class="w-full mb-4"
                    placeholder="--Select--"
                    :items="nationState.states"
                    v-model="state"
                    :rules="requiredRule"
                  />
                  <cornie-input
                   v-if="valueType == 'category'"
                    label="City"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplierCity"
                    :rules="requiredRule"
                    :readonly="true"
                  />
                   <cornie-input
                   v-else
                    label="City"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplierCity"
                    :rules="requiredRule"
                  />
                  <cornie-input
                   v-if="valueType == 'category'"
                    label="Zip or Post Code"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplierZipCode"
                    :rules="requiredRule"
                     :readonly="true"
                  />
                   <cornie-input
                   v-else
                    label="Zip or Post Code"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplierZipCode"
                    :rules="requiredRule"
                  />
                  <cornie-input
                   v-if="valueType == 'category'"
                    label="Street Name"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplierStreetName"
                    :rules="requiredRule"
                     :readonly="true"
                  />
                   <cornie-input
                   v-else
                    label="Street Name"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplierStreetName"
                    :rules="requiredRule"
                  />
                  <cornie-input
                    v-if="valueType == 'category'"
                    label="Apartment or House Number"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplierHouseNumber"
                    :rules="requiredRule"
                     :readonly="true"
                  />
                    <cornie-input
                    v-else
                    label="Apartment or House Number"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplierHouseNumber"
                    :rules="requiredRule"
                  />
                  <cornie-input
                   v-if="valueType == 'category'"
                    label="Delivery Contact"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplierContactPerson"
                    :rules="requiredRule"
                    :readonly="true"
                  />
                  <cornie-input
                  v-else
                    label="Delivery Contact"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplierContactPerson"
                    :rules="requiredRule"
                  />
                   <cornie-input
                   v-if="valueType == 'category'"
                     label="Phone Number"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    :modelValue="supplierPhone.dialCode +' '+ supplierPhone.number"
                    :disabled="true"
                  />
                  <cornie-phone-input
                  v-else
                    label="Phone Number"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplierPhone.number"
                    v-model:code="supplierPhone.dialCode"
                    :rules="requiredRule"
                  />
                  <cornie-input
                  v-if="valueType == 'category'"
                    label="Email"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplierEmail"
                    :rules="emailRule"
                     :readonly="true"
                  />
                  <cornie-input
                  v-else
                    label="Email"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplierEmail"
                    :rules="emailRule"
                  />
                </div>
              </template>
            </accordion-component>
          </div>
            <div class="mb-12 mt-5">
              <span
                class="
                  text-danger
                  font-bold
                  m
                  flex
                  justify-end
                  float-right
                  mt-5
                  w-full
                  cursor-pointer
                "
                @click="showItem = true"
              >
                <span class="text-xl -mt-1 mr-2">+</span>Add Item
              </span>
            </div>

          <div class="mt-20">
            <cornie-table
              :menu="false"
              v-model="items"
              :columns="headers"
              :deleteRow="true"
              @delete="removeItem"
            >
              <template #delieveredquanitity="{ item }">
                <div class="w-12">
                  <cornie-input v-model="quantities[item.productId]" />
                </div>
              </template>
              <template #unitCost="{ item }">
                <div class="w-12">
                  <cornie-input v-model="unitCosts[item.productId]" />
                </div>
              </template>
              <template #totalCost="{ item }">
                ₦
                {{
                  getTotal(
                    quantities[item.productId],
                    unitCosts[item.productId]
                  )
                }}
              </template>
            </cornie-table>
          </div>
        </v-form>
      </cornie-card-text>

      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <span
            v-if="!id"
            class="
              text-sm
              font-bold
              text-danger
              float-left
              flex
              justify-start
              w-full
              cursor-pointer
            "
            @click="SaveDraftGrn"
          >
            Save as draft
          </span>
          <span
           v-else
            class="
              text-sm
              font-bold
              text-danger
              float-left
              flex
              justify-start
              w-full
              cursor-pointer
            "
            @click="completeDraft"
          >
            Complete draft
          </span>

            <cornie-btn
              @click="show = false"
              class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
            >
              Cancel
            </cornie-btn>
            <cornie-btn
            v-if="!id"
              :loading="loading"
              @click="submit"
              class="text-white bg-danger px-6 rounded-xl"
            >
              Save
            </cornie-btn>
             <cornie-btn
             v-else
              :loading="loading"
              @click="submit"
              class="text-white bg-danger px-6 rounded-xl"
            >
              Update
            </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
  <item-modal
    v-model="showItem"
    :supplierName="supplierName"
    @item-supplier="itemsupplier"
  />
</template>

<script lang="ts">
import { Vue, Options, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import { string, date } from "yup";
import { useCountryStates } from "@/composables/useCountryStates";

import ICatalogueService, { ICatalogueProduct } from "@/types/ICatalogue";
import IGrn, { SupplyItems } from "@/types/IGrn";
import ILocation from "@/types/ILocation";
import IPractitioner from "@/types/IPractitioner";


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
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import ListSelect from "./listSelect.vue";

import ItemModal from "./itemModal.vue";
import { watch } from "@vue/runtime-core";

const catalogue = namespace("catalogues");
const user = namespace("user");
const location = namespace("location");
const grn = namespace("grn");
const practitioner = namespace("practitioner");

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
    ItemModal,
    ListSelect
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

  @user.Getter
  authCurrentLocation!: string;

  @user.Getter
  authPractitioner!: IPractitioner;

  @location.State
  locations!: ILocation[];

  @Prop({ type: Object, default: {} })
  selectedItem!: any;

  @location.Action
  fetchLocations!: () => Promise<void>;

  @grn.Action
  getGrnById!: (id: string) => Promise<IGrn>;

  @Prop({ type: String, default: "" })
  requestId!: string;

  @Prop({ type: String, default: "" })
  returnId!: string;

  @Prop({ type: String, default: "" })
  waybillId!: string;

  @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;



  showItem = false;
  nationState = setup(() => useCountryStates());

  state = "";
  requestNumber = "";
  referenceNumber = "";
  description = "";
  receivedBy = {
    name: "",
    email: "",
    phone: {
      number: "8188281176",
      dialCode: "+234",
    } as any,
  };
  identifier = "";

receiverCategory = "";
  receiverLocationId = "";
  dateReceived = new Date();
  supplierCategory = "";
  supplierLocationId = "";
  supplierCountry = "";
  supplierState = "";
  supplierCity = "";
  supplierZipCode = "";
  supplierHouseNumber = "";
  supplierContactPerson = "";
  supplierPhone = {
    number: "",
    dialCode: "+234",
  };
  supplierEmail = "";
  supplyItems = [] as SupplyItems[];
  supplyStatus = "";
  supplierStreetName = "";

  quantity = 0;
  expiryDate = "";
  supplierName = "";
  query = "";
  valueType = 'category'
  supplierType = "";

  required = string().required();
  emailRule = string().email().required();
  requiredRule = string().required();

  headers = [
    {
      title: "item code",
      key: "itemCode",
      show: true,
      noOrder: true,
    },
    {
      title: "item name",
      key: "itemName",
      show: true,
      noOrder: true,
    },
    {
      title: "uofm",
      key: "uofm",
      show: false,
      noOrder: true,
    },
    {
      title: "batch #",
      key: "batch",
      show: false,
      noOrder: true,
    },
    {
      title: "expiry",
      key: "expiryDate",
      show: true,
      noOrder: true,
    },
    {
      title: "available qty",
      key: "avQty",
      show: true,
      noOrder: true,
    },
    {
      title: "deleivered qty",
      key: "delieveredquanitity",
      show: true,
      noOrder: true,
    },
    {
      title: "unit cost",
      key: "unitCost",
      show: true,
      noOrder: true,
    },
    {
      title: "total cost",
      key: "totalCost",
      show: true,
      noOrder: true,
    },
  ];

  get items() {
    const supplys = this.supplyItems.map((supply: any) => {
      this.unitCosts[supply.productId] = 1;
      this.quantities[supply.productId] = supply.quantity;
      return {
        ...supply,
        // totalCost: this.getTotal(+this.unitCosts[supply.productId], +this.quantities[supply.productId]),
        supplier: this.supplierName || undefined,
      };
    });

    if (!this.query) return supplys;
    return search.searchObjectArray(supplys, this.query);
  }

  @Watch("selectedItem")
  changeItem(){
    this.setWaybill();
  }
  


  @Watch("id")
  idChanged() {
    this.setGrn();
  }

   async setGrn() {
    const grn = await this.getGrnById(this.id);
    if (!grn) return;
    this.requestNumber = grn.requestNumber;
    this.identifier = grn.identifier;
    this.referenceNumber = grn.referenceNumber;
    this.description = grn.description;
    this.receivedBy = grn.receivedBy;
    this.receiverCategory = grn.receiverCategory;
    this.receiverLocationId = grn.receiverLocationId;
    this.supplierCountry = grn.supplierCountry;
    this.dateReceived = grn.dateReceived || new Date();
    this.supplierCategory = grn.supplierCategory;
    this.supplierLocationId = grn.supplierLocationId;
    this.supplierState = grn.supplierState;
    this.state = grn.supplierState;
    this.supplierCity = grn.supplierCity;
    this.supplierZipCode = grn.supplierZipCode;
    this.supplierHouseNumber = grn.supplierHouseNumber;
    this.supplierContactPerson = grn.supplierContactPerson;
    this.supplierPhone = grn.supplierPhone;
    this.supplierEmail = grn.supplierEmail;
    this.supplyItems = grn.supplyItems;
    this.supplyStatus = grn.supplyStatus;
    this.supplierName = grn.supplyItems[0].supplier;
    

  
  }

  async setWaybill(){
    
  }
  getTotal(quantity: number, unityCost: number) {
    return (quantity * unityCost).toFixed(2);
  }

  itemsupplier(value: any, exipry: string) {
    this.supplyItems.push(value);
    this.expiryDate = exipry;
  }
  quantities = {} as Record<string, number>;
  unitCosts = {} as Record<string, number>;

  buildPayload(item: any) {
    return {
      type: "purchase",
      unitCost: this.unitCosts[item.productId],
      quantity: this.quantities[item.productId],
      supplier: this.supplierName || undefined,
      expiryDate: item.expiryDate,
      default: false,
      productId: item.productId,
      locationId: this.authCurrentLocation,
    };
  }
  get payload() {
    return {
      description: this.description,
      receiverCategory: this.receiverCategory,
      receiverLocationId: this.receiverLocationId,
      supplierCategory: this.supplierCategory || undefined,
      supplierLocationId: this.supplierLocationId || undefined,
      supplierContactPerson: this.supplierContactPerson,
      supplierPhone: this.supplierPhone,
      supplierEmail: this.supplierEmail,
      supplierCountry: this.supplierCountry,
      supplierState: this.supplierState,
      supplierCity: this.supplierCity,
      supplierZipCode: this.supplierZipCode,
      supplierHouseNumber: this.supplierHouseNumber,
      supplyItems: this.items.map(this.buildPayload),
      materialReturnId : this.returnId || null,
      materialRequestId : this.requestId || null,
      waybillId: this.waybillId || null,
    };
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
  get checkstatus() {
    return this.supplyStatus === 'draft' ? "Complete draft" : "Save";
  }
  getPractitionerName(id: string) {
    const pt = this.practitioners.find((i: any) => i.organizationId === id);
    return pt ? `${pt.firstName} ${pt.lastName}` : "";
  }
  setRecevier(value:string, item:any, locationId:string){
    this.receiverLocationId = locationId;
    this.receiverCategory = item.category;

  }
  setValue(value:string, item:any, locationId:string){
    this.valueType = value;

    console.log({item})
    if(value == 'category'){
      this.supplierType = 'Internal Supplier';
      this.supplierCountry = 'Nigeria';
      this.supplierState = item.state;
      this.nationState.country = 'Nigeria';
      this.state = item.state;
      this.supplierCity = item.city;
      this.supplierZipCode = 'Not available';
      this.supplierHouseNumber = 'Not available';
      this.supplierStreetName = item.address;
      this.supplierContactPerson = item.manager;
      this.supplierPhone.dialCode = item.phone.dialCode;
      this.supplierPhone.number = item.phone.number;
    this.supplierEmail = item.email;
    this.supplierName = item.manager;
    this.supplierLocationId = locationId;
    this.supplierCategory = item.category;
    //this.receiverCategory = item.category;
    } else{
      this.supplierType = 'External Supplier'
      this.supplierCountry = 'Nigeria';
      this.supplierState = '';
      this.nationState.country = 'Nigeria';
      this.state = '';
      this.supplierCity = '';
      this.supplierZipCode = '';
      this.supplierHouseNumber = '';
      this.supplierContactPerson = '';
      this.supplierPhone.dialCode = '+234';
      this.supplierPhone.number = '';
      this.supplierEmail = '';
      this.supplierName = '';
      this.supplierLocationId = '';
      this.supplierStreetName = '';
      //this.receiverCategory = 'pharmacy';
    }

  }
  async submit() {
    this.loading = true;
    if (this.id) await this.updateGrn();
    else await this.createGrn();
    this.loading = false;
  }


  async SaveDraftGrn() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;

    this.supplierCountry = this.nationState.country;
    this.supplierState = this.state;

    try {
      const response = await cornieClient().post(
        "/api/v1/inventory/grn/draft",
        this.payload
      );
      if (response.success) {
        window.notify({
          msg: "Goods received notes draft saved",
          status: "success",
        });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }
   async removeItem(index: number) {
    try {
      const confirmed = await window.confirmAction({
        message: "Are you sure you want to delete this item?",
        title: "Delete Item",
      });
      if (confirmed) {
       this.supplyItems.splice(index, 1);
      }
    } catch (error) {}
  
   
  }


  async createGrn() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;

    this.supplierCountry = this.nationState.country;
    this.supplierState = this.state;

    try {
      const response = await cornieClient().post(
        "/api/v1/inventory/grn",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Goods received notes Saved", status: "success" });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }
  async updateGrn() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;
    const id = this.id;
    const url = `/api/v1/inventory/grn/update-draft/${id}`;
    const payload = this.payload;
    try {
      const response = await cornieClient().put(url, this.payload);
      if (response.success) {
        window.notify({
          msg: "Goods received note Updated",
          status: "success",
        });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }
   async completeDraft() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;
    const id = this.id;
    const url = `/api/v1/inventory/grn/complete-draft/${id}`;
    const payload = this.payload;
    try {
      const response = await cornieClient().put(url, this.payload);
      if (response.success) {
        window.notify({
          msg: "Goods received note draft completed",
          status: "success",
        });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }

  done() {
    this.show = false;
    this.$emit("grnAdded");
  }
  receiverInfo(){
    this.receivedBy.name = this.authPractitioner.firstName +''+ this.authPractitioner.lastName;
     this.receivedBy.phone  = this.authPractitioner?.phone;
     this.receivedBy.email = this.authPractitioner.email;
    //  this.receiverCategory = this.authPractitioner.department;
  }

  created() {
    this.getProducts();
    this.fetchLocations();
    this.setGrn();
    this.receiverInfo();
    this.fetchPractitioners();
  }
}
</script>

<style></style>
