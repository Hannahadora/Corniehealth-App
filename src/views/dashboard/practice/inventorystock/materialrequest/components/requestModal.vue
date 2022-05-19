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
            New Request
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
            <accordion-component title="Request Info" :opened="true">
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
                  <date-picker
                    label="Validity"
                    class="w-full"
                    placeholder="--Autoloaded--"
                    v-model="validity"
                  />
                </div>
                <div class="w-full">
                  <Textarea
                    :label="'Description'"
                    class="w-full"
                    placeholder="Enter"
                    v-model="description"
                    :rows="'2'"
                    :cols="'2'"
                  />
                </div>
                <!-- <div class="grid grid-cols-2 gap-4 w-full">
                  <cornie-input
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
                  />
                </div> -->
              </template>
            </accordion-component>
          </div>
          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="Requisitioner" :opened="false">
              <template v-slot:default>
                <div class="mt-5 grid grid-cols-2 gap-4 w-full">
                  <cornie-input
                    label="Name"
                    class="w-full"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="requestedBy.name"
                  />
                  <cornie-phone-input
                    label="Phone Number"
                    class="w-full"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="requestedBy.phone.number"
                    v-model:code="requestedBy.phone.dialCode"
                  />
                  <cornie-input
                    label="Email"
                    class="w-full"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="requestedBy.email"
                  />
                  <date-picker
                    label="Date"
                    class="w-full"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="dateRequested"
                  />
                  <cornie-input
                    label="Department"
                    class="w-full"
                    placeholder="--Autoloaded--"
                    :disabled="true"
                    v-model="department"
                  />
                  <cornie-select
                    class="w-full"
                    placeholder="--Select---"
                    :items="[
                      'holding',
                      'pharmacy',
                      'diagnostics',
                      'in-patient',
                    ]"
                    label="Delivery Category"
                    v-model="requesterCategory"
                    :rules="requiredRule"
                  >
                  </cornie-select>
                  <cornie-select
                    class="w-full"
                    placeholder="--Select---"
                    :items="allLocations"
                    label="Delivery Location"
                    v-model="requesterLocationId"
                    :rules="requiredRule"
                  >
                  </cornie-select>
                </div>
              </template>
            </accordion-component>
          </div>
          <div class="border-b-2 pb-5 border-dashed border-gray-200">
            <accordion-component title="Supplier" :opened="false">
              <template v-slot:default>
                <div class="mt-5 grid grid-cols-2 gap-4 w-full"></div>
                <div class="mt-5 grid grid-cols-2 gap-4 w-full">
                  <cornie-select
                    class="w-full"
                    placeholder="--Select--"
                    :items="[
                      'holding',
                      'pharmacy',
                      'diagnostics',
                      'in-patient',
                    ]"
                    label="Supply Category"
                    v-model="supplyCategory"
                    :rules="requiredRule"
                  >
                  </cornie-select>
                  <cornie-select
                    class="w-full"
                    placeholder="--Select--"
                    :items="allLocations"
                    label="Supplier Location"
                    v-model="supplyLocationId"
                  >
                  </cornie-select>
                  <cornie-input
                    label="Supplier Contact"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplyContactName"
                    :rules="requiredRule"
                  />
                  <cornie-phone-input
                    label="Phone Number"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplyContactPhone.number"
                    v-model:code="supplyContactPhone.dialCode"
                    :rules="requiredRule"
                  />
                  <cornie-input
                    label="Email"
                    class="w-full mb-4"
                    placeholder="--Enter--"
                    v-model="supplyContactEmail"
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
  <item-modal v-model="showItem" @item-supplier="itemsupplier"/>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import { string, date } from "yup";
import search from "@/plugins/search";

import IMaterialRequest, { Items } from "@/types/IMaterialRequest";
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

const materialrequest = namespace("materialrequest");
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
  },
})
export default class requestModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  loading = false;

  @user.Getter
  authCurrentLocation!: string;

  @user.Getter
  authPractitioner!: IPractitioner;


  @materialrequest.State
  materialrequests!: IMaterialRequest[];

  @materialrequest.Action
  fetchMaterialRequestsIncoming!: (locationId: string) => Promise<void>;

  @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;

  @materialrequest.Action
  getMaterialRequestById!: (id: string) => Promise<IMaterialRequest>;


  required = string().required();
  emailRule = string().email().required();
  requiredRule = string().required();

  showItem = false;
  valid = "";
  identifier = "";

  validity = "";
  status = false;
  requesterId = "";
  requesterLocationId = "";
  requesterCategory = "";
  supplyCategory = "";
  supplyLocationId = "";
  supplyContactName = "";
  supplyContactEmail = "";
  supplyContactPhone = {
    number: "",
    dialCode: "+234",
  };
  description = "";
  dateRequested = new Date();
  dateApproved = "";
  department = "";
  requestedBy = {
    name: "",
    email: "",
    phone: {
      number: "",
      dialCode: "+234",
    } as any,
  };
  item = [] as Items[];
  query = "";

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
      title: "description",
      key: "description",
      show: true,
    },
    {
      title: "uofm",
      key: "uofm",
      show: true,
    },
    {
      title: "Available QTy",
      key: "avQty",
      show: true,
    },
    {
      title: "qty requested",
      key: "qty",
      show: true,
    },
  ];

  @Watch("id")
  idChanged() {
    this.setRequest();
  }

   async setRequest() {
    const request = await this.getMaterialRequestById(this.id);
    if (!request) return;
    this.description = request.description;
    this.validity = request.validity;
    this.identifier = request.identifier;
    this.status = request.status;
    this.requesterId = request.requesterId;
    this.requesterLocationId = request.requesterLocationId;
    this.requesterCategory = request.requesterCategory;
    this.supplyCategory = request.supplyCategory;
    this.supplyLocationId = request.supplyLocationId;
    this.supplyContactName = request.supplyContactName;
    this.supplyContactEmail = request.supplyContactEmail;
    this.supplyContactPhone = request.supplyContactPhone;
    this.dateRequested = request.dateRequested || new Date();
    this.dateApproved = request.dateApproved;
    this.department = request.department;
    this.requestedBy = request.requestedBy;
    this.item = request.items;

  
  }

   get items() {
    const supplys = this.item.map((supply: any) => {
      this.quantities[supply.productId] = 1;
      return {
        ...supply,
        description: this.description,
      };
    });

    if (!this.query) return supplys;
    return search.searchObjectArray(supplys, this.query);
  }

  quantities = {} as Record<string, number>;

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
  getTotal(quantity: number, unityCost: number) {
    return (quantity * unityCost).toFixed(2);
  }

  itemsupplier(value: any) {
    this.item.push(value);
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
  buildPayload(item: any) {
    return {
      quantity: this.quantities[item.productId],
      productId: item.productId,
      name: item.name,
      code: item.code,
      brand: item.brand,
      form: item.form,
      strength: item.strength,
      uofm: item.uofm,
      packSize: item.packSize,
    };
  }
  get payload() {
    return {
      description: this.description,
      requesterLocationId: this.requesterLocationId,
      requesterCategory: this.requesterCategory,
      supplyCategory: this.supplyCategory,
      supplyLocationId: this.supplyLocationId,
      supplyContactName: this.supplyContactName,
      supplyContactEmail: this.supplyContactEmail,
      supplyContactPhone: this.supplyContactPhone,
      dateRequested: this.dateRequested,
      dateApproved: this.dateApproved,
      requestedBy: this.requestedBy,
      validity: this.validity,
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

    try {
      const response = await cornieClient().post(
        "/api/v1/inventory/material-request/draft",
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

    try {
      const response = await cornieClient().post(
        "/api/v1/inventory/material-request",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Material Requests Saved", status: "success" });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }
  async updateRequest() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;
    const id = this.id;
    const url = `/api/v1/inventory/material-request/draft/${id}`;
    const payload = this.payload;
    try {
      const response = await cornieClient().put(url, this.payload);
      if (response.success) {
        window.notify({
          msg: "Material Request Updated",
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
    const url = `/api/v1/inventory/material-request/draft/complete/${id}`;
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

  done() {
    this.show = false;
    this.$emit("requestAdded");
  }

  receiverInfo(){
    this.requestedBy.name = this.authPractitioner.firstName +''+ this.authPractitioner.lastName;
     this.requestedBy.phone  = this.authPractitioner?.phone;
     this.requestedBy.email = this.authPractitioner.email;
  }

  async created() {
    this.receiverInfo();
    if (this.authCurrentLocation)
    await this.fetchMaterialRequestsIncoming(this.authCurrentLocation);
    await this.fetchLocations();

  }
}
</script>

<style></style>
