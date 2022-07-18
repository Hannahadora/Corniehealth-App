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
            New Return
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
            <accordion-component title="Return Info" :opened="true">
              <template v-slot:default>
                <div class="mt-5 grid grid-cols-2 gap-4 w-full">
                  <cornie-input
                   v-if="identifier"
                    label="Request #"
                    class="w-full"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="identifier"
                  />
                  <!-- <cornie-select
                    class="w-full"
                    placeholder="--Select--"
                    :items="[
                      'holding',
                      'pharmacy',
                      'diagnostics',
                      'in-patient',
                    ]"
                    label="Category"
                    v-model="category"
                    :rules="requiredRule"
                    required
                  >
                  </cornie-select> -->
                  <date-time-picker
                    class="w-full"
                    label="Start Date/Time"
                    v-model:date="startDateTime"
                    v-model:time="startDate"
                  />
                  <date-time-picker
                    class="w-full"
                    label="End Date/time"
                    v-model:date="endDateTime"
                    v-model:time="endDate"
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
            <accordion-component title="Processed By" :opened="false">
              <template v-slot:default>
                <div class="mt-5 grid grid-cols-2 gap-4 w-full">
                  <cornie-input
                    label="Name"
                    class="w-full"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="processedBy.name"
                  />
                  <cornie-phone-input
                    label="Phone Number"
                    class="w-full"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="processedBy.phone.number"
                    v-model:code="processedBy.phone.dialCode"
                  />
                  <cornie-input
                    label="Email"
                    class="w-full"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="processedBy.email"
                  />
                  <date-picker
                    label="Date"
                    class="w-full"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="processedOn"
                  />
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
            <accordion-component title="Return Delivery" :opened="false">
              <template v-slot:default>
                <div class="mt-5 grid grid-cols-2 gap-4 w-full">
                  <list-select label="Supplier Name"  :placeholder="'--Select--'" @setValue="setValue"/>
                  <!-- <cornie-input
                    label="Supplier Name"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplyName"
                    :rules="requiredRule"
                    required
                  /> -->
                  <cornie-select
                   v-if="valueType == 'category'"
                    :readonly="true"
                    label="Country"
                    class="w-full mb-4"
                    placeholder="--Select--"
                    :items="nationState.countries"
                    v-model="nationState.country"
                    :rules="requiredRule"
                  />
                  <cornie-select
                  v-else
                    label="Country"
                    class="w-full mb-4"
                    placeholder="--Select--"
                    :items="nationState.countries"
                    v-model="nationState.country"
                    :rules="requiredRule"
                    required
                  />
                  <cornie-select
                   v-if="valueType == 'category'"
                    :readonly="true"
                    label="State or Region"
                    class="w-full mb-4"
                    placeholder="--Select--"
                    :items="nationState.states"
                    v-model="state"
                    :rules="requiredRule"
                  />
                  <cornie-select
                  v-else
                    label="State or Region"
                    class="w-full mb-4"
                    placeholder="--Select--"
                    :items="nationState.states"
                    v-model="state"
                    :rules="requiredRule"
                    required
                  />
                  <cornie-input
                   v-if="valueType == 'category'"
                    :disabled="true"
                    label="City"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplyCity"
                  />
                  <cornie-input
                   v-else
                    label="City"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplyCity"
                    :rules="requiredRule"
                    required
                  />
                  <cornie-input
                   v-if="valueType == 'category'"
                    :disabled="true"
                    label="Zip or Post Code"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplyZipCode"
                  />
                   <cornie-input
                   v-else
                    label="Zip or Post Code"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplyZipCode"
                    :rules="requiredRule"
                    required
                  />
                  <cornie-input
                   v-if="valueType == 'category'"
                    :disabled="true"
                    label="Street Name"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplyStreetName"
                  />
                   <cornie-input
                   v-else
                    label="Street Name"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplyStreetName"
                    :rules="requiredRule"
                    required
                  />
                  <cornie-input
                   v-if="valueType == 'category'"
                    :disabled="true"
                    label="Apartment or House Number"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplyAppartment"
                  />
                   <cornie-input
                   v-else
                    label="Apartment or House Number"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplyAppartment"
                    :rules="requiredRule"
                    required
                  />
                  <cornie-input
                   v-if="valueType == 'category'"
                    :disabled="true"
                    label="Contact Person"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplyContactName"
                  />
                  <cornie-input
                  v-else
                    label="Contact Person"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplyContactName"
                    :rules="requiredRule"
                    required
                  />
                   <cornie-input
                   v-if="valueType == 'category'"
                     label="Phone Number"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    :modelValue="supplyContactPhone.dialCode +' '+ supplyContactPhone.number"
                    :disabled="true"
                  />
                  <cornie-phone-input
                  v-else
                    label="Phone Number"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplyContactPhone.number"
                    v-model:code="supplyContactPhone.dialCode"
                    :rules="requiredRule"
                    required
                  />
                  <cornie-input
                   v-if="valueType == 'category'"
                    label="Email"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplyContactEmail"
                    :disabled="true"
                  />
                   <cornie-input
                   v-else
                    label="Email"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplyContactEmail"
                    :rules="emailRule"
                    required
                  />
                </div>
              </template>
            </accordion-component>
          </div>
          <div class="mt-12">
            <div>
              <span class="text-sm font-semibold mb-3">Preferred Process</span>
              <div class="flex space-x-4 w-full mt-5">
                <cornie-radio
                  :label="'Replacement'"
                  :value="'replacement'"
                  v-model="preferredProcess"
                  name="Needed"
                />
                <cornie-radio
                  :label="'Repair'"
                  :value="'repair'"
                  v-model="preferredProcess"
                  name="Needed"
                />
                <cornie-radio
                  :label="'Credit Account'"
                  :value="'credit-account'"
                  v-model="preferredProcess"
                  name="Needed"
                />
                <cornie-radio
                  :label="'Refund'"
                  :value="'refund'"
                  v-model="preferredProcess"
                  name="Needed"
                />
              </div>
            </div>
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
  <item-modal v-model="showItem" @item-supplier="itemsupplier" />
</template>

<script lang="ts">
import { Vue, Options, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import { string, date } from "yup";
import search from "@/plugins/search";
import { useCountryStates } from "@/composables/useCountryStates";

import IMaterialReturn, { Items } from "@/types/IMaterialReturn";
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
import DateTimePicker from "@/components/date-time-picker.vue";

import ItemModal from "./itemModal.vue";
import ListSelect from "./listSelect.vue";

const materialreturn = namespace("materialreturn");
const user = namespace("user");
const location = namespace("location");

@Options({
  name: "requestModal",
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
    DateTimePicker,
    ListSelect,
  },
})
export default class requestModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @user.Getter
  authCurrentLocation!: string;

  @user.Getter
  authPractitioner!: IPractitioner;

  @materialreturn.State
  materialreturns!: IMaterialReturn[];

  @materialreturn.Action
  fetchMaterialReturnOutgoing!: (locationId: string) => Promise<void>;

  @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;

  @materialreturn.Action
  getMaterialReturnById!: (id: string) => Promise<IMaterialReturn>;

  required = string().required();
  emailRule = string().email().required();
  requiredRule = string().required();

  nationState = setup(() => useCountryStates());

  state = "";
  loading = false;
  showItem = false;
  valid = "";
  query = "";
  identifier = "";


  startDateTime = "";
  startDate = "";
  endDate = "";
  endDateTime = "";
  status = "";
  processedOn = new Date();
  processedById = "";
  organizationId = "";
  processedBy = {
    name: "",
    email: "",
    phone: {
      number: "",
      dialCode: "+234",
    } as any,
  };
  locationId = "";
  category = "";
  supplyName = "";
  supplyLocationId = "";
  supplyCategory = "";
  supplyContactName = "";
  supplyContactEmail = "";
  supplyContactPhone = {
    number: "",
    dialCode: "+234",
  };
  supplyCountry = "";
  supplyState = "";
  supplyCity = "";
  supplyZipCode = "";
  supplyStreetName = "";
  supplyAppartment = "";
  preferredProcess = "";
  item = [] as Items[];

  valueType = "category";
  supplyHouseNumber = "";

  @Watch("id")
  idChanged() {
    this.setRequest();
  }

  async setRequest() {
    const request = await this.getMaterialReturnById(this.id);
    if (!request) return;
    this.status = request.status;
    this.identifier = request.identifier;
    this.supplyLocationId = request.supplyLocationId;
    this.supplyContactName = request.supplyContactName;
    this.supplyContactEmail = request.supplyContactEmail;
    this.supplyContactPhone = request.supplyContactPhone;
    this.item = request.items;
    this.startDateTime = request.startDateTime;
    this.endDateTime = request.endDateTime;
    this.processedOn = request.processedOn || new Date();
    this.processedById = request.processedById;
    this.organizationId = request.organizationId;
    this.processedBy = request.processedBy;
    this.locationId = request.locationId;
    this.category = request.category;
    this.supplyName = request.supplyName;
    this.supplyLocationId = request.supplyLocationId;
    this.supplyCategory = request.supplyCategory;
    this.supplyContactName = request.supplyContactName;
    this.supplyContactEmail = request.supplyContactEmail;
    this.supplyContactPhone = request.supplyContactPhone;
    this.state = request.supplyState;
    this.supplyCountry = request.supplyCountry;
    this.supplyState = request.supplyState;
    this.supplyCity = request.supplyCity;
    this.supplyZipCode = request.supplyZipCode;
    this.supplyStreetName = request.supplyStreetName;
    this.supplyAppartment = request.supplyAppartment;
    this.preferredProcess = request.preferredProcess;
  }

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
      title: "batch #",
      key: "batchNumber",
      show: true,
    },
    {
      title: "available  qty",
      key: "availableQuantity",
      show: true,
    },
    {
      title: "Return QTy",
      key: "qty",
      show: true,
    },
    {
      title: "reason for return",
      key: "reasonForReturn",
      show: true,
    },
  ];

  itemsupplier(value: any) {
    this.item.push(value);
  }

  get items() {
    const supplys = this.item.map((supply: any) => {
      this.quantities[supply.productId] = 1;
      return {
        ...supply,
      };
    });

    if (!this.query) return supplys;
    return search.searchObjectArray(supplys, this.query);
  }

  quantities = {} as Record<string, number>;

  reset(){
     this.supplyCountry = '';
      this.nationState.country = '';
      this.supplyName = '';
      this.supplyAppartment = '';
      this.state = '';
      this.supplyCity = '';
      this.supplyZipCode = '';
      this.supplyHouseNumber = '';
      this.supplyStreetName = '';
      this.supplyContactName = '';
      this.supplyContactPhone.dialCode = '';
      this.supplyContactPhone.number = '';
      this.supplyContactEmail = '';
      this.supplyContactName = '';
      this.supplyLocationId = '';
      this.supplyCategory = '';
      this.category = this.supplyCategory;
        this.startDateTime = "";
        this.startDate = "";
        this.endDate = "";
        this.endDateTime = "";
        this.status = "";
        this.processedOn = new Date();
        this.processedById = "";
        this.organizationId = "";
  }
   setValue(value:string, item:any, locationId:string){
    this.valueType = value;
    console.log({item})
    if(value == 'category'){
      this.supplyCountry = 'Nigeria';
      this.supplyName = locationId;
      this.supplyAppartment = item.address;
      this.nationState.country = 'Nigeria';
      this.state = item.state;
      this.supplyCity = item.city;
      this.supplyZipCode = 'Not available';
      this.supplyHouseNumber = 'Not available';
      this.supplyStreetName = item.address;
      this.supplyContactName = item.manager;
      this.supplyContactPhone.dialCode = item.phone.dialCode;
      this.supplyContactPhone.number = item.phone.number;
    this.supplyContactEmail = item.email;
    this.supplyContactName = item.manager;
    this.supplyLocationId = locationId;
    this.supplyCategory = item.category;
    this.category = item.category;
    //this.receiverCategory = item.category;
    } else{
      this.supplyCountry = '';
      this.nationState.country = '';
      this.supplyName = '';
      this.supplyAppartment = '';
      this.state = '';
      this.supplyCity = '';
      this.supplyZipCode = '';
      this.supplyHouseNumber = '';
      this.supplyStreetName = '';
      this.supplyContactName = '';
      this.supplyContactPhone.dialCode = '';
      this.supplyContactPhone.number = '';
      this.supplyContactEmail = '';
      this.supplyContactName = '';
      this.supplyLocationId = '';
      this.supplyCategory = '';
      this.category = this.supplyCategory;
      //this.receiverCategory = 'pharmacy';
    }

  }


  buildPayload(item: any) {
    return {
      quantity: this.quantities[item.productId],
      name: item.name,
      productId: item.productId,
      code: item.code,
      batchNumber: item.batchNumber,
      expiry: item.expiry,
      availableQuantity: item.availableQuantity,
      reasonForReturn: item.reasonForReturn,
    };
  }
  get payload() {
    return {
      startDateTime: this.startDateTime,
      endDateTime: this.endDateTime,
      supplyName: this.supplyName,
      supplyLocationId: this.supplyLocationId,
      supplyCategory: this.supplyCategory,
      supplyContactName: this.supplyContactName,
      supplyContactEmail: this.supplyContactEmail,
      supplyContactPhone: this.supplyContactPhone,
      supplyCountry: this.supplyCountry,
      supplyState: this.supplyState,
      supplyCity: this.supplyCity,
      supplyZipCode: this.supplyZipCode,
      supplyStreetName: this.supplyStreetName,
      supplyAppartment: this.supplyAppartment,
      preferredProcess: this.preferredProcess,
      locationId: this.authCurrentLocation,
      category: this.category,
      items: this.item.map(this.buildPayload),
    };
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.updateRequest();
    else await this.createRequest();
    this.loading = false;
  }

  async SaveDraftGrn() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;

    this.supplyCountry = this.nationState.country;
    this.supplyState = this.state;

    try {
      const response = await cornieClient().post(
        "/api/v1/inventory/material-return/draft",
        this.payload
      );
      if (response.success) {
        window.notify({
          msg: "Material request draft saved",
          status: "success",
        });
        this.done();

      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }

  async createRequest() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;

    this.supplyCountry = this.nationState.country;
    this.supplyState = this.state;

    try {
      const response = await cornieClient().post(
        "/api/v1/inventory/material-return",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Material Return Saved", status: "success" });
        this.done();
        this.reset();
      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }
  async updateRequest() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;
    const id = this.id;
    const url = `/api/v1/inventory/material-return/draft/${id}`;
    const payload = this.payload;
    try {
      const response = await cornieClient().put(url, this.payload);
      if (response.success) {
        window.notify({
          msg: "Material Return Updated",
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
    const url = `/api/v1/inventory/material-return/draft/complete/${id}`;
    const payload = this.payload;
    try {
      const response = await cornieClient().put(url, this.payload);
      if (response.success) {
        window.notify({
          msg: "Material Request draft completed",
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
    this.$emit("returnAdded");
  }

   receiverInfo(){
    this.processedBy.name = this.authPractitioner.firstName +''+ this.authPractitioner.lastName;
     this.processedBy.phone  = this.authPractitioner?.phone;
     this.processedBy.email = this.authPractitioner.email;
  }

  async created() {
     this.receiverInfo();
    await this.fetchMaterialReturnOutgoing(this.authCurrentLocation);
    await this.fetchLocations();
  }
}
</script>

<style></style>
