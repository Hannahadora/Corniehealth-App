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
            New Waybill
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
            <accordion-component title="Waybill Info" :opened="true">
              <template v-slot:default>
                <div class="mt-5 grid grid-cols-2 gap-4 w-full">
                  <cornie-input
                    label="Waybill #"
                    class="w-full"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="identifier"
                  />
                  <cornie-input
                    label="Reference #"
                    class="w-full"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="identifier"
                  />
                  <!-- <cornie-input
                    label="Approval Status"
                    class="w-full"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="status"
                  />
                  <cornie-input
                    label="Issue Status"
                    class="w-full"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="status"
                  /> -->
                </div>
              </template>
            </accordion-component>
          </div>
          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="Issuing Agent" :opened="false">
              <template v-slot:default>
                <div class="mt-5 grid grid-cols-2 gap-4 w-full">
                  <cornie-input
                    label="Name"
                    class="w-full"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="issuer.name"
                  />
                  <cornie-phone-input
                    label="Phone Number"
                    class="w-full"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="issuer.phone.number"
                    v-model:code="issuer.phone.dialCode"
                  />
                  <cornie-input
                    label="Email"
                    class="w-full"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="issuer.email"
                  />
                  <date-picker
                    label="Date"
                    class="w-full"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="submittedOn"
                  />
                  <cornie-select
                    class="w-full"
                    placeholder="--Select--"
                    :items="[
                      'holding',
                      'pharmacy',
                      'diagnostics',
                      'in-patient',
                    ]"
                    label="Department"
                    v-model="issuerCategory"
                    :rules="requiredRule"
                    required
                  >
                  </cornie-select>
                  <!-- <cornie-input
                    label="Department"
                    class="w-full"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="department"
                  /> -->
                </div>
              </template>
            </accordion-component>
          </div>
          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="Recipient" :opened="false">
              <template v-slot:default>
                <div class="mt-5 grid grid-cols-2 gap-4 w-full">
                  <cornie-input
                    label="Name"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="receiverName"
                    :rules="requiredRule"
                    required
                  />
                  <cornie-select
                    class="w-full"
                    placeholder="--Select--"
                    :items="[
                      'holding',
                      'pharmacy',
                      'diagnostics',
                      'in-patient',
                    ]"
                    label="Category"
                    v-model="receiverCategory"
                    :rules="requiredRule"
                    required
                  >
                  </cornie-select>
                  <cornie-select
                    class="w-full"
                    placeholder="--Select--"
                    :items="allLocations"
                    label="Receiver Location"
                    v-model="receiverLocationId"
                    :rules="requiredRule"
                    required
                  >
                  </cornie-select>
                  <cornie-select
                    label="Country"
                    class="w-full mb-4"
                    placeholder="--Select--"
                    :items="nationState.countries"
                    v-model="nationState.country"
                    :rules="requiredRule"
                    required
                  />
                  <cornie-select
                    label="State or Region"
                    class="w-full mb-4"
                    placeholder="--Select--"
                    :items="nationState.states"
                    v-model="state"
                    :rules="requiredRule"
                    required
                  />
                  <cornie-input
                    label="City"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="receiverCity"
                    :rules="requiredRule"
                    required
                  />
                  <cornie-input
                    label="Zip or Post Code"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="receiverZipCode"
                    :rules="requiredRule"
                    required
                  />
                  <cornie-input
                    label="Street Name"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="receiverStreetName"
                    :rules="requiredRule"
                    required
                  />
                  <cornie-input
                    label="Apartment or House Number"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="receiverHouseNumber"
                    :rules="requiredRule"
                    required
                  />
                  <cornie-input
                    label="Contact Person"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="receiverContactName"
                    :rules="requiredRule"
                    required
                  />
                  <cornie-phone-input
                    label="Phone Number"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="receiverContactPhone.number"
                    v-model:code="receiverContactPhone.dialCode"
                    :rules="requiredRule"
                    required
                  />
                  <cornie-input
                    label="Email"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="receiverContactEmail"
                    :rules="emailRule"
                    required
                  />
                </div>
              </template>
            </accordion-component>
          </div>
          <div class="mt-5">
            <div class="mt-5">
              <span
                class="text-danger font-bold m flex justify-end float-right mt-5 w-full cursor-pointer"
                @click="showItem = true"
              >
                <span class="text-xl -mt-1 mr-2">+</span>Add Item
              </span>
            </div>
          </div>

          <div class="mt-20 pb-40">
            <cornie-table
              :menu="false"
              v-model="items"
              :columns="headers"
              :deleteRow="true"
              @delete="removeItem"
            >
              <template #qty="{ item }">
                <div class="w-12">
                  <cornie-input v-model="quantities[item.productId]" />
                </div>
              </template>
              <template #unitCost="{ item }">
                <div class="w-12">
                  <cornie-input v-model="unitCosts[item.productId]" />
                </div>
              </template>
              <template  #totalCost="{ item }">
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
            class="text-sm font-bold text-danger float-left flex justify-start w-full cursor-pointer"
            @click="SaveDraftGrn"
          >
            Save as draft
          </span>
          <span
            v-else
            class="text-sm font-bold text-danger float-left flex justify-start w-full cursor-pointer"
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
  <item-modal v-model="showItem" @item-supplier="itemsupplier"/>
</template>

<script lang="ts">
import { Vue, Options, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import { string, date } from "yup";
import search from "@/plugins/search";
import { useCountryStates } from "@/composables/useCountryStates";

import IWaybill, { Items } from "@/types/IWaybill";
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
import AccordionComponent from "@/components/form-accordion.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";

import ItemModal from "./itemModal.vue";

const waybill = namespace("waybill");
const user = namespace("user");
const location = namespace("location");

@Options({
  name: "waybillModal",
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
  },
})
export default class waybillModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  requestId!: string;

  @Prop({ type: String, default: "" })
  returnId!: string;


  @user.Getter
  authCurrentLocation!: string;

  @user.Getter
  authPractitioner!: IPractitioner;

  @waybill.State
  waybills!: IWaybill[];

  @waybill.Action
  fetchWaybillIncoming!: (locationId: string) => Promise<void>;

  @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;

  @waybill.Action
  getWaybillById!: (id: string) => Promise<IWaybill>;

  loading = false;
  showItem = false;
  valid = "";
  query = "";
  state = "";

  identifier = "";
  issuerLocationId = "";
  issuerCategory = "";
  status = "";
  issuerId = "";
  organizationId = "";
  issuer = {
    name: "",
    email: "",
    phone: {
      number: "",
      dialCode: "+234",
    } as any,
  };
  locationId = "";
  category = "";
  receiverName = "";
  receiverLocationId = "";
  receiverCategory = "";
  receiverCountry = "";
  receiverState = "";
  receiverContactPhone = {
    number: "",
    dialCode: "+234",
  };
  receiverCity = "";
  receiverZipCode = "";
  receiverStreetName = "";
  receiverHouseNumber = "";
  receiverContactName = "";
  receiverContactEmail = "";
  submittedOn = new Date();
  item = [] as Items[];
    materialRequestId = "";
    materialReturnId = "";
    referenceIdentifier = "";

  required = string().required();
  emailRule = string().email().required();
  requiredRule = string().required();

  nationState = setup(() => useCountryStates());

  headers = [
    {
      title: "item code",
      key: "itemCode",
      show: true,
    },
    {
      title: "item name",
      key: "itemName",
      show: true,
    },
    {
      title: "uofm",
      key: "uofm",
      show: true,
    },
    {
      title: "reference qty",
      key: "referenceqty",
      show: true,
    },
    {
      title: "issue qty",
      key: "qty",
      show: true,
    },
    {
      title: "unit cost",
      key: "unitCost",
      show: true,
    },
    {
      title: "total cost",
      key: "totalCost",
      show: true,
      noOrder: true,
    },
  ];


  get items() {
    const supplys = this.item.map((supply: any) => {
      this.unitCosts[supply.productId] = 1;
      this.quantities[supply.productId] = 1;
      return {
        ...supply,
      };
    });

    if (!this.query) return supplys;
    return search.searchObjectArray(supplys, this.query);
  }
    itemsupplier(value: any) {
    this.item.push(value);
  }

    @Watch("id")
  idChanged() {
    this.setRequest();
  }

  async setRequest() {
    const waybill = await this.getWaybillById(this.id);
    if (!waybill) return;
    this.status = waybill.status;
    this.state = waybill.receiverState;
    this.identifier = waybill.identifier;
    this.issuerLocationId = waybill.issuerLocationId;
    this.issuerCategory = waybill.issuerCategory;
    this.issuerId = waybill.issuerId;
    this.issuer = waybill.issuer;
    this.locationId = waybill.locationId;
    this.category = waybill.category;
    this.receiverName = waybill.receiverName;
    this.receiverLocationId = waybill.receiverLocationId;
    this.receiverCategory = waybill.receiverCategory;
    this.receiverCountry = waybill.receiverCountry;
    this.receiverState = waybill.receiverState;
    this.receiverContactPhone = waybill.receiverContactPhone;
    this.receiverCity = waybill.receiverCity;
    this.receiverZipCode = waybill.receiverZipCode;
    this.receiverStreetName = waybill.receiverStreetName;
    this.receiverHouseNumber = waybill.receiverHouseNumber;
    this.receiverContactName = waybill.receiverContactName;
    this.receiverContactEmail = waybill.receiverContactEmail;
    this.submittedOn = waybill.submittedOn || new Date();
    this.item = waybill.items;
    this.requestId = waybill.materialRequestId;
    this.returnId = waybill.materialReturnId;
    this.referenceIdentifier = waybill.referenceIdentifier;

  }

  quantities = {} as Record<string, number>;
  unitCosts = {} as Record<string, number>;

  buildPayload(item: any) {
    return {
      quantity: this.quantities[item.productId],
      unitCost: item.unitCost,
      itemName: item.itemName,
      itemCode: item.itemCode,
      brand: item.brand,
      form: item.form,
      strength: item.strength,
      batchNumber: item.batchNumber,
      expiry: item.expiry,
      uom: item.uom,
      packSize: item.packSize,
      productId: item.productId,
    };
  }
  get payload() {
    return {
      receiverName: this.receiverName,
      receiverLocationId: this.receiverLocationId,
      receiverCategory: this.receiverCategory,
      receiverCountry: this.receiverCountry,
      receiverState: this.receiverState,
      receiverCity: this.receiverCity,
      receiverZipCode: this.receiverZipCode,
      receiverStreetName: this.receiverStreetName,
      receiverHouseNumber: this.receiverHouseNumber,
      receiverContactName: this.receiverContactName,
      receiverContactPhone: this.receiverContactPhone,
      receiverContactEmail: this.receiverContactEmail,
      submittedOn: this.submittedOn,
      issuerLocationId: this.authCurrentLocation,
      issuerCategory: this.issuerCategory,
      issuerId: this.authPractitioner.id,
      items: this.item.map(this.buildPayload),
      materialRequestId: this.requestId || undefined,
      materialReturnId: this.returnId || undefined
    };
  }

   getTotal(quantity: number, unityCost: number) {
    return (quantity * unityCost).toFixed(2);
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.updatebill();
    else await this.createwaybill();
    this.loading = false;
  }

  async SaveDraftGrn() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;

    this.receiverCountry = this.nationState.country;
    this.receiverState = this.state;

    try {
      const response = await cornieClient().post(
        "/api/v1/inventory/waybill/draft",
        this.payload
      );
      if (response.success) {
        window.notify({
          msg: "Waybill draft saved",
          status: "success",
        });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }

  async createwaybill() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;

   this.receiverCountry = this.nationState.country;
    this.receiverState = this.state;

    try {
      const response = await cornieClient().post(
        "/api/v1/inventory/waybill",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Waybill Saved", status: "success" });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }
  async updatebill() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;
    const id = this.id;
    const url = `/api/v1/inventory/waybill/update-draft/${id}`;
    const payload = this.payload;
    try {
      const response = await cornieClient().put(url, this.payload);
      if (response.success) {
        window.notify({
          msg: "Waybill Updated",
          status: "success",
        });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: "Waybill not Updated", status: "error" });
    }
  }
  async completeDraft() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;
    const id = this.id;
    const url = `/api/v1/inventory/waybill/complete-draft/${id}`;
    const payload = this.payload;
    try {
      const response = await cornieClient().put(url, this.payload);
      if (response.success) {
        window.notify({
          msg: "Waybill draft completed",
          status: "success",
        });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }

  async removeItem(index: number) {
    //this.item.splice(index, 1);
    try {
      const confirmed = await window.confirmAction({
        message: "Are you sure you want to delete this item?",
        title: "Delete Item",
      });
      if (confirmed) {
        this.item.splice(index, 1);
      }
    } catch (error) {}
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

  done() {
    this.show = false;
    this.$emit("waybillAdded");
  }

  receiverInfo(){
    this.issuer.name = this.authPractitioner.firstName +''+ this.authPractitioner.lastName;
     this.issuer.phone  = this.authPractitioner?.phone;
     this.issuer.email = this.authPractitioner.email;
  }

  async created() {
    this.receiverInfo();
    await this.fetchWaybillIncoming(this.authCurrentLocation);
  }
}
</script>

<style></style>
