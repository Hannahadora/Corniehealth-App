<template>
  <div class="container-fluid p-4 bg-white">
    <div class="w-full">
      <!-- <div class="w-full" style="border-bottom: 1px solid #c2c7d6">
        <span
          class="flex flex-col w-full justify-center font-bold text-xl text-primary py-2"
        >
          New Service
        </span>
      </div> -->

      <accordion-component
        :title="id ? 'Edit Service' : 'New Service'"
        class="text-primary capitalize"
        :opened="true"
      >
        <template v-slot:default>
          <div>
            <div class="w-full py-5">
              <span class="flex items-center">
                <cornie-avatar-field v-model="img.url" :rules="required" />
              </span>
            </div>

            <div class="w-full grid grid-cols-3 gap-4">
              <fhir-input
                reference="http://hl7.org/fhir/ValueSet/service-category"
                class="w-full"
                v-model="category"
                label="category"
                placeholder="--Select--"
                :rules="required"
                required
              />
              <cornie-select
                :items="allSpeciality"
                class="w-full"
                v-model="specialtyId"
                label="Medical Specialty"
                placeholder="--Select--"
                :rules="required"
                required
              />
              <fhir-input
                reference="http://hl7.org/fhir/ValueSet/service-type"
                class="w-full"
                v-model="type"
                label="Type"
                placeholder="--Select--"
                :rules="required"
                required
              />
              <cornie-input
                :label="'Service Name'"
                v-model="name"
                placeholder="--Enter--"
                :rules="required"
                required
              />
              <cornie-input
                v-model="description"
                :label="'Description'"
                placeholder="--Enter--"
                :rules="required"
                required
              />
              <div class="w-full">
                <span class="text-dark font-semibold capitalize text-sm mb-5"
                  >Insourced or Outsourced</span
                >
                <div class="w-full flex space-x-4 mt-4">
                  <cornie-radio
                    v-model="source"
                    :label="'Insourced'"
                    :value="'insourced'"
                    name="insourced"
                    @update:modelValue="updateSource"
                    checked
                  />
                  <cornie-radio
                    v-model="source"
                    :label="'Outsourced'"
                    :value="'outsourced'"
                    @update:modelValue="updateSource"
                    name="outsourced"
                  />
                </div>
              </div>
              <cornie-input
                v-model="supplier"
                :label="'Supplier'"
                placeholder="--Enter--"
                v-if="source === 'outsourced'"
              />
              <cornie-select
                :items="['hours', 'minutes', 'sessions']"
                placeholder="Select"
                :label="'Unit of Service'"
                class="w-full"
                v-model="serviceUOM"
                :rules="required"
                required
              />

              <div class="w-full">
                <span class="text-dark font-semibold capitalize text-sm mb-5"
                  >Do you want this service to be Priced?</span
                >
                <div class="w-full flex space-x-4 mt-4">
                  <cornie-radio
                    v-model="priced"
                    :label="'Yes'"
                    :value="true"
                    name="price"
                    checked
                  />
                  <cornie-radio
                    v-model="priced"
                    :label="'No'"
                    :value="false"
                    name="price"
                  />
                </div>
              </div>
              <cornie-input
                v-if="priced == true"
                v-model="cost"
                :label="'Cost Per Unit(NGN)'"
                placeholder="--Enter--"
              />
              <div class="w-full">
                <span class="text-dark font-semibold capitalize text-sm mb-3"
                  >Discount Applicable?</span
                >
                <div class="w-full flex space-x-4 mt-4">
                  <cornie-radio
                    v-model="apply"
                    :label="'Yes'"
                    :value="'yes'"
                    name="newstatus"
                    checked
                  />
                  <cornie-radio
                    v-model="apply"
                    :label="'No'"
                    :value="'no'"
                    name="newstatus"
                  />
                </div>
              </div>

              <cornie-input
                v-if="id"
                :label="'Item Code'"
                v-model="itemCode"
                placeholder="--DNS Generated--"
                :disabled="true"
              />
            </div>
          </div>
        </template>
      </accordion-component>

      <accordion-component
        v-if="priced == true"
        title="Fee Information"
        class="text-primary capitalize"
        :opened="true"
      >
        <template v-slot:default>
          <div class="mt-5">
            <div class="w-full grid grid-cols-3 gap-4">
              <cornie-input
                v-model.number="cost"
                :label="'Service Cost (NGN)'"
                placeholder="--Autoloaded--"
                :disabled="true"
              />
              <cornie-input
                :label="'Fee Markup'"
                v-model.number="markup"
                :disabled="true"
                placeholder="200%"
              />
              <cornie-input
                v-if="apply == 'yes'"
                :label="'Maximum Discount'"
                placeholder="--10%--"
                v-model="discountLimit"
                :disabled="true"
              />
            </div>

            <div class="w-full mb-8 mt-3">
              <div class="w-full overflow-x-scroll">
                <div class="w-full flex ths py-2" style="min-width: 1330px">
                  <div class="th flex items-center">
                    <span>unit of Service</span>
                  </div>
                  <div class="th hidden items-center">
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
                  <div class="th flex items-center" v-if="apply == 'yes'">
                    <span>discount limit</span>
                  </div>
                  <div class="th flex items-center" v-if="apply == 'yes'">
                    <span>Service fee (discounted)</span>
                  </div>
                  <div class="th flex items-center" v-if="apply == 'yes'">
                    <span>DISCOUNTED margin (ngn)</span>
                  </div>
                  <div class="th flex items-center" v-if="apply == 'yes'">
                    <span>DISCOUNTED margin(%)</span>
                  </div>
                </div>
                <div class="w-full flex tbs py-2" style="min-width: 1330px">
                  <div class="th flex items-center">
                    <span class="small-text capitalize">{{ serviceUOM }}</span>
                  </div>
                  <div class="th items-center hidden">
                    <span class="small-text">{{ quantity }}</span>
                  </div>
                  <div class="th flex items-center">
                    <span class="small-text">₦ {{ cost }}</span>
                  </div>
                  <div class="th flex items-center">
                    <span class="small-text"
                      ><cornie-input v-model="markup" palceholder="100%"
                    /></span>
                  </div>
                  <div class="th flex items-center">
                    <span class="small-text">₦ {{ cdmPrice }}</span>
                  </div>
                  <div class="th flex items-center">
                    <span class="small-text">₦ {{ marginNGN }}</span>
                  </div>
                  <div class="th flex items-center">
                    <span class="small-text">{{ marginPercent }}% </span>
                  </div>
                  <div class="th flex items-center" v-if="apply == 'yes'">
                    <span class="small-text"
                      ><cornie-input
                        v-model="discountLimit"
                        class="w-12"
                        palceholder="0%"
                    /></span>
                  </div>
                  <div class="th flex items-center" v-if="apply == 'yes'">
                    <span class="small-text">{{ ItemCostDiscounted }}</span>
                  </div>
                  <div class="th flex items-center" v-if="apply == 'yes'">
                    <span class="small-text">₦ {{ discountedMarginNGN }}</span>
                  </div>
                  <div class="th flex items-center" v-if="apply == 'yes'">
                    <span class="small-text"
                      >{{ discountedMarginPercent }}%</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full mt-5">
              <div class="w-full flex">
                <label class="inline-flex items-center">
                  <input
                    v-model="applyVat"
                    type="checkbox"
                    class="form-radio h-3 w-3"
                    :value="true"
                  />
                  <span class="ml-2 noraml-text text-sm font-normal"
                    >Apply VAT to this service item</span
                  >
                </label>
              </div>
            </div>
          </div>
        </template>
      </accordion-component>

      <accordion-component
        title="Others"
        class="text-primary capitalize"
        :opened="true"
      >
        <template v-slot:default>
          <div
            class="w-full grid grid-cols-3 gap-4 mt-5 border-dashed border-gray-100 pb-5"
          >
            <!-- <fhir-input
              reference="http://hl7.org/fhir/ValueSet/service-referral-method"
              class="w-full mb-5"
              v-model="referralMethod"
              label="referral method"
              placeholder="--Select--"
              :rules="required"
              required
            /> -->
            <div>
              <span class="text-sm font-semibold mb-1">Referral Methods</span>
              <Multiselect
                v-model="referralMethod"
                mode="multiple"
                :close-on-select="true"
                :options="allRefferalMethod"
                :searchable="true"
                label-prop="name"
                value-prop="name"
                trackBy="name"
                label="name"
                placeholder="--Select--"
                class="w-full"
              >
                <template v-slot:tag="{ option, handleTagRemove, disabled }">
                  <div class="multiselect-tag is-user">
                    {{ option.name }}
                    <span
                      v-if="!disabled"
                      class="multiselect-tag-remove"
                      @mousedown.prevent="handleTagRemove(option, $event)"
                    >
                      <span class="multiselect-tag-remove-icon"></span>
                    </span>
                  </div>
                </template>
                <template v-slot:option="{ option }">
                  <!-- <select-option :value="true" v-model="setValue" @click="sendValue(option.value,option)"/> -->
                  {{ option.name }}
                </template>
              </Multiselect>
            </div>
            <div>
              <span class="text-sm font-semibold mb-1">Visit Type</span>
              <Multiselect
                v-model="channelOfService"
                mode="multiple"
                :close-on-select="true"
                :options="[
                  'Hospital/Clinic',
                  'In-Patient',
                  'Virtual',
                  'Home Care',
                ]"
                :searchable="true"
                label-prop="name"
                value-prop="name"
                trackBy="name"
                label="name"
                placeholder="--Select--"
                class="w-full"
              >
                <template v-slot:tag="{ option, handleTagRemove, disabled }">
                  <div class="multiselect-tag is-user">
                    {{ option.name }}
                    <span
                      v-if="!disabled"
                      class="multiselect-tag-remove"
                      @mousedown.prevent="handleTagRemove(option, $event)"
                    >
                      <span class="multiselect-tag-remove-icon"></span>
                    </span>
                  </div>
                </template>
                <template v-slot:option="{ option }">
                  <!-- <select-option :value="true" v-model="setValue" @click="sendValue(option.value,option)"/> -->
                  {{ option.name }}
                </template>
              </Multiselect>
            </div>

            <!-- <cornie-select
              v-model="channelOfService"
              label="Channel of Service"
              :items="['dental', 'hospice']"
              placeholder="--Select--"
              class="w-full mb-5"
              :rules="required"
              required
            /> -->
            <div class="w-full -mt-1">
              <span class="text-sm font-semibold mb-3">Telecom</span>
              <div class="flex space-x-2 w-full">
                <cornie-select
                  :items="[
                    'Fax',
                    'Phone',
                    'Email',
                    'Secure Messaging',
                    'Secure Email',
                    'Mail',
                  ]"
                  placeholder="Days"
                  class="w-32 mt-0.5 flex-none"
                  :setPrimary="true"
                  v-model="telecomunit"
                />
                <cornie-input
                  placeholder="--Enter--"
                  class="grow w-full"
                  :setfull="true"
                  v-model="telecom"
                />
              </div>
            </div>
            <!-- <cornie-select
              :items="dropdown.CommunicationLanguage"
              v-model="telecom"
              label="Telecom"
              placeholder="--Select--"
              class="w-full"
              :rules="required"
              required
            /> -->
            <cornie-input
              label="Location & Days"
              placeholder="Select"
              class="w-full"
              :disabled="true"
            >
              <template #append-inner>
                <plus-icon
                  class="fill-current text-danger cursor-pointer"
                  @click="showLocationSidebar = true"
                />
              </template>
            </cornie-input>
            <div>
              <div class="w-full mb-8">
                <span class="text-dark capitalize font-semibold text-sm mb-3"
                  >Appointment required?</span
                >
                <div class="w-full flex space-x-4 mt-4">
                  <cornie-radio
                    v-model="requiresAppointment"
                    :label="'Yes'"
                    :value="true"
                    name="required"
                    checked
                  />
                  <cornie-radio
                    v-model="requiresAppointment"
                    :label="'No'"
                    :value="false"
                    name="required"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-4" v-if="id">
            <div
              class="bg-white shadow-md p-1 w-full mt-5 rounded-lg"
              v-for="(item, index) in locations"
              :key="index"
            >
              <div class="flex space-x-4 w-full">
                <span class="flex items-center">
                  <avatar :src="localSrc" class="mr-1" />
                </span>
                <div class="w-full">
                  <p class="font-bold text-sm">
                    {{
                      item.locationName
                        ? item.locationName
                        : getLocationName(item?.locationId)
                    }}
                  </p>
                  <span
                    class="text-gray-400 text-xs font-light"
                    v-if="checkArray(item?.days)"
                  >
                    {{ item?.days?.join(" ") }}
                  </span>
                  <span class="text-gray-400 text-xs font-light" v-else>
                    {{ item?.days?.mon }} {{ item?.days?.tue }}
                    {{ item?.days?.wed }} {{ item?.days?.thu }}
                    {{ item?.days?.fri }} {{ item?.days?.sat }}
                    {{ item?.days?.sun }}
                  </span>
                </div>
                <div class="float-right flex justify-end w-full">
                  <div class="bg-blue-50 p-3 -m-1 rounded-r-lg">
                    <delete-red
                      class="mt-1"
                      @click="deleteLocationDays(index)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-4" v-else>
            <div
              class="bg-white shadow-md p-1 w-full mt-5 rounded-lg"
              v-for="(item, index) in locations"
              :key="index"
            >
              <div class="flex space-x-4 w-full">
                <span class="flex items-center">
                  <avatar :src="localSrc" class="mr-1" />
                </span>
                <div class="w-full">
                  <p class="font-bold text-sm">
                    {{ getLocationName(item.locationId) }}
                  </p>
                  <span class="text-gray-400 text-xs font-light">
                    {{ item?.days?.mon }} {{ item?.days?.tue }}
                    {{ item?.days?.wed }} {{ item?.days?.thu }}
                    {{ item?.days?.fri }} {{ item?.days?.sat }}
                    {{ item?.days?.sun }}
                  </span>
                </div>
                <div class="float-right flex justify-end w-full">
                  <div class="bg-blue-50 p-3 -m-1 rounded-r-lg">
                    <delete-red
                      class="mt-1"
                      @click="deleteLocationDays(index)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </accordion-component>

      <!-- <accordion-component
        title="Availability"
        class="text-primary capitalize"
        :opened="true"
      >
        <template v-slot:default>
          <div class="mt-5 w-full">
            <operation-hours v-model="availableTimes" />
          </div>
        </template>
      </accordion-component> -->
      <div class="w-full">
        <span class="w-full bg-danger">
          <span class="flex justify-end w-full my-5">
            <cornie-btn
              class="m-5 px-6 font-semibold rounded"
              style="color: #080056; border: 1px solid #080056"
              @click="() => $router.go(-1)"
            >
              Cancel
            </cornie-btn>

            <cornie-btn
              class="bg-danger px-6 text-white my-5 mx-4 font-semibold rounded"
              :loading="loading"
              @click="submit"
            >
              {{ $route.params.serviceId ? "Update" : "Save" }}
            </cornie-btn>
          </span>
        </span>
      </div>
    </div>

    <modal :visible="addNew">
      <div class="w-full p-4 bg-white" style="min-width: 400px">
        <div class="w-full">
          <p class="modal-header flex justify-between">
            <span>Add New</span>
            <span class="cursor-pointer" @click="() => (addNew = false)"
              ><close-icon
            /></span>
          </p>
          <p class="my-3 modal-text">Some modal text if necessary</p>
        </div>

        <div class="w-full my-4">
          <cornie-input
            :label="'Name'"
            v-model="reqBody.name"
            style="width: 100%"
          />
        </div>

        <div class="w-full my-4">
          <cornie-input
            :label="'Code'"
            v-model="reqBody.itemCode"
            style="width: 100%"
          />
        </div>

        <div class="w-full">
          <span class="w-full bg-danger">
            <span class="flex justify-end w-full my-5">
              <cornie-btn
                class="bg-danger text-white mx-4 font-semibold rounded-full"
                @click="submit"
              >
                Save
              </cornie-btn>
            </span>
          </span>
        </div>
      </div>
    </modal>
  </div>
  <location-modal
    v-model="showLocationSidebar"
    @close-location-diag="showLocationSidebar = false"
    @location-days="addLocations"
  />
</template>

<script lang="ts">
  import { Options, setup, Vue } from "vue-class-component";
  import { string } from "yup";

  import Avatar from "@/components/avatar.vue";
  import CornieAvatarField from "@/components/cornie-avatar-field/CornieAvatarField.vue";
  import CornieCheckbox from "@/components/corniecheckbox.vue";
  import CornieInputIcon from "@/components/cornieinput-plus-icon.vue";
  import CornieInput from "@/components/cornieinput.vue";
  import CornieRadio from "@/components/cornieradio.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import SelectOption from "@/components/custom-checkbox.vue";
  import FhirInput from "@/components/fhir-input.vue";
  import AccordionComponent from "@/components/form-accordion.vue";
  import CloseIcon from "@/components/icons/close.vue";
  import DeleteRed from "@/components/icons/delete-red.vue";
  import PlusIcon from "@/components/icons/plus.vue";
  import Modal from "@/components/modal.vue";
  import OperationHours from "@/components/new-operation-hours.vue";
  import { useCountryStates } from "@/composables/useCountryStates";
  import { useHandleImage } from "@/composables/useHandleImage";
  import { cornieClient } from "@/plugins/http";
  import ICatalogueService, { AvailableTimes } from "@/types/ICatalogue";
  import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
  import ISpecial from "@/types/ISpecial";
  import { CornieUser } from "@/types/user";
  import ComboInput from "@/views/dashboard/ehr/vitals/components/split-input.vue";
  import Multiselect from "@vueform/multiselect";
  import { Prop, Watch } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import LocationModal from "./location-days.vue";
  import ServiceDropdown from "./service-name.vue";

  const dropdown = namespace("dropdown");
  const catalogue = namespace("catalogues");
  const userStore = namespace("user");
  const markup = namespace("markup");
  const special = namespace("special");

  @Options({
    components: {
      LocationModal,
      CornieAvatarField,
      CornieSelect,
      AccordionComponent,
      CornieInput,
      ComboInput,
      CornieCheckbox,
      ServiceDropdown,
      Modal,
      CloseIcon,
      DeleteRed,
      Avatar,
      FhirInput,
      CornieRadio,
      OperationHours,
      Multiselect,
      PlusIcon,
      CornieInputIcon,
      SelectOption,
    },
  })
  export default class NewService extends Vue {
    @Prop({ type: String, default: "" })
    id!: string;

    @catalogue.Action
    createService!: (service: ICatalogueService) => Promise<boolean>;

    @catalogue.Action
    getServices!: () => Promise<void>;

    @catalogue.Action
    updateService!: (service: ICatalogueService) => Promise<boolean>;

    @special.State
    specials!: ISpecial[];

    @special.Action
    fetchSpecials!: () => Promise<void>;

    @catalogue.State
    services!: ICatalogueService[];

    @userStore.Getter
    authPractitioner!: IPractitioner;

    @userStore.Getter
    cornieUser!: CornieUser;

    @userStore.State
    authCurrentLocation!: string;

    @markup.State
    markups!: any[];

    @markup.Action
    fetchMarkups!: () => Promise<void>;

    source = "insourced";
    supplier = "";
    unitOfService = 0;
    unitOfServicePer = "";
    image = "";
    category = "";
    subcategory = "subcategory";
    name = "";
    description = "";
    itemCode = "code";
    serviceUOM = "";
    quantity = 0;
    cost = 0;
    markup = 0;
    availabilityExceptions = [];
    discountLimit = 0;
    applyVat = false;
    status = "active";
    organizationId = "";
    specialty = "";
    type = "";
    coverageArea = "coverageArea";
    providedBy = "coverageArea";
    priced = true;
    channelOfService = [];
    telecom = "";
    specialtyId = "";
    showLocationSidebar = false;
    localSrc = require("../../../../../assets/img/placeholder.png");
    telecomunit = "Email";

    referralMethod = [] as any;
    requiresAppointment = false;
    locations = [] as any;
    newlocations = [] as any;
    availableTimes: AvailableTimes[] = [];
    hoursOfOperation: HoursOfOperation[] = [];

    img = setup(() => useHandleImage());
    required = string().required();
    nationState = setup(() => useCountryStates());
    addNew = false;
    loading = false;
    // markupData = {} as any;
    dropdown = {} as IIndexableObject;
    location = [] as any;
    locationsId = [] as any;
    apply = "yes";
    reqBody = {
      quantity: 1,
      cost: 10,
      status: "active",
    } as ICatalogueService;
    setValue = false;

    get cdmPrice() {
      let total = 0;
      total += +this.cost + (+this.markup * +this.cost) / 100;
      return total.toFixed(2);
    }
    get marginNGN() {
      let total = 0;
      total += +this.cdmPrice - +this.cost;

      return total.toFixed(2);
    }

    get marginPercent() {
      let total = 0;
      total += (+this.marginNGN / +this.cdmPrice) * 100;

      return total.toFixed(2);
    }

    get ItemCostDiscounted() {
      let total = 0;
      total += +this.cdmPrice - (+this.discountLimit * +this.cdmPrice) / 100;

      return total.toFixed(2);
    }
    get discountedMarginNGN() {
      let total = 0;
      total += +this.ItemCostDiscounted - +this.cost;

      return total.toFixed(2);
    }
    get discountedMarginPercent() {
      let total = 0;
      total += (+this.discountedMarginNGN / +this.ItemCostDiscounted) * 100;

      return total.toFixed(2);
    }

    get dropdwonOptions() {
      return [
        "Acre-Foot",
        "Are",
        "Bag",
        "Bale",
        "Barrel",
        "Box",
        "Bucket",
        "Bushel",
        "Bundle",
        "Bottle",
        "Can",
        "Carton",
        "Crate",
        "Case",
        "Chain",
        "Calorie",
        "Centigrade",
        "Centiliter",
        "Centimeter",
        " Cubic Foot",
        "Cubic Inch",
        "Cubic Meter",
        "Cubic Yard",
        "Cup",
        "Day",
        "Decigrams",
        "Deciliter",
        "Decimeter",
        "Degree",
        "Density",
        "Drum",
        "Dozen",
        "Dram",
        "Each",
        "Fahrenheit",
        "Farad",
        "Feet per second",
        "Fluid ounce",
        "Foot",
        "Gallon",
        "Gill",
        "Grain",
        "Grams",
        "Gravity Imperial",
        "Gravity Metric",
        "Gross",
        "Hectare",
        "Hectoliter",
        "Horsepower",
        "Hour",
        "Hundredweight",
        "Inch",
        "Joule",
        "Kelvin",
        "Kilogram",
        "Kilogram meters per second",
        "Kilometer",
        "Kilopond",
        "Kit	kit",
        "Kilowatt",
        "Linear Foot",
        "Light Year",
        "Liter",
        "Lumen",
        "Lumen Seconds",
        "Lux",
        "Meter",
        "Meters per second",
        "Mile",
        "Miles per hour",
        "Milliliter",
        "Millimeter",
        "Minute",
        "Month",
        "Ounce",
        "Pack",
        "Pad",
        "Pair",
        "Pallet",
        "Piece",
        "Pint",
        "Pond",
        "Pound",
        "Pounds per square inch",
        "Quart",
        "Rack",
        "Ream",
        "Roll",
        "Second",
        "Sheet",
        "Square",
        "Square Decimeter",
        "Square centimeter",
        "Square feet",
        "Square inches",
        "Square kilometer",
        "Square meter",
        "Square miles",
        "Square millimeter",
        "Square yards",
        "Tablespoon",
        "Teaspoon",
        "Ton",
        "Tonne",
        "Volt",
        "Watt",
        "Week",
        "Yard",
        "Year",
      ];
    }

    get allRefferalMethod() {
      return [
        "All",
        "Electronic Referral",
        "Email",
        "Phone",
        "Paper Referral",
        "Not Applicable",
      ];
    }

    options = [
      { value: "holidays", label: "Holidays" },
      { value: "weekends", label: "Weekends" },
      { value: "Fridays", label: "Fridays" },
      { value: "sundays", label: "Sundays" },
    ];

    @dropdown.Action
    getDropdowns!: (a: string) => Promise<IIndexableObject>;

    @catalogue.Action
    getServicesById!: (id: string) => Promise<ICatalogueService>;

    @Watch("id")
    idChanged() {
      this.setServices();
    }

    checkArray(days: any) {
      return Array.isArray(days);
    }

    addLocations(value: any, newvalue: any, locationValue: any) {
      this.locations.push(...value);
      this.newlocations = newvalue;
      this.locationsId = locationValue;
    }

    async setServices() {
      const service = await this.getServicesById(this.id);
      if (!service) return;
      this.img.url = service.image;
      this.category = service.category;
      this.subcategory = service.subcategory;
      this.name = service.name;
      this.description = service.description;
      this.itemCode = service.itemCode;
      this.serviceUOM = service.serviceUOM;
      this.specialtyId = service.specialtyId;
      this.quantity = service.quantity;
      this.discountLimit = service.discountLimit;
      this.applyVat = service.applyVat;
      this.status = service.status;
      this.specialty = service.specialty;
      this.type = service.type;
      this.coverageArea = service.coverageArea;
      this.providedBy = service.providedBy;
      this.priced = service.priced;
      this.availabilityExceptions = service.availabilityExceptions;
      this.referralMethod = service.referralMethods;
      this.channelOfService = service.channelsOfService;
      this.telecom = service.telecom;
      this.requiresAppointment = service.requiresAppointment;
      this.locations = service.locationAvailabilities as any;
      this.availableTimes = service.availableTimes;
      this.cost = service.cost;
    }
    get payload() {
      return {
        image: this.img?.url || undefined,
        category: this.category,
        name: this.name,
        description: this.description,
        itemCode: this.itemCode,
        serviceUOM: this.serviceUOM,
        // subcategory : this.subcategory,
        //quantity: this.quantity,
        cost: this.cost,
        markup: this.markup,
        discountLimit: this.discountLimit,
        applyVat: this.applyVat,
        status: this.status,
        // organizationId: this.organizationId,
        type: this.type,
        coverageArea: this.coverageArea,
        providedBy: this.providedBy,
        priced: this.priced,
        availabilityExceptions: this.availabilityExceptions,
        referralMethods: this.referralMethod,
        channelsOfService: this.channelOfService,
        telecom: this.telecom,
        requiresAppointment: this.requiresAppointment,
        locationAvailabilities: this.newlocations,
        availableTimes: this.availableTimes,
        specialtyId: this.specialtyId,
      };
    }

    sendValue(value: string, option: any) {
      const { value: _, ...newObj } = option;
      if (value == "all") {
        this.referralMethod.push(newObj);
      } else {
        this.setValue = true;
        this.referralMethod.push(value);
      }
    }

    async submit() {
      this.loading = true;
      if (this.id) await this.update();
      else await this.create();
      this.loading = false;
    }

    async create() {
      // const { valid } = await (this.$refs.form as any).validate();
      // if (!valid) return;
      try {
        const response = await cornieClient().post(
          "/api/v1/catalogue-service",
          this.payload
        );
        if (response.success) {
          window.notify({
            msg: "Catalogue service Created",
            status: "success",
          });
          this.$router.go(-1);
        }
      } catch (error: any) {
        window.notify({
          msg: "Catalogue service not Created",
          status: "error",
        });
      }
    }

    async update() {
      const url = `/api/v1/catalogue-service/${this.id}`;
      const payload = { ...this.payload };
      try {
        const response = await cornieClient().put(url, payload);
        window.notify({ msg: "Catalogue service Updated", status: "success" });
        this.$router.go(-1);
      } catch (error: any) {
        window.notify({
          msg: "Catalogue service not updated",
          status: "error",
        });
      }
    }

    async onSave() {
      if (!this.img?.url) {
        window.notify({ msg: "Please add an image", status: "info" });
        return false;
      }
      try {
        this.loading = true;
        this.reqBody.image = this.img?.url;
        let done = false;

        if (this.reqBody?.id) {
          done = await this.updateService(this.reqBody);
        } else {
          done = await this.createService(this.reqBody);
        }

        if (done) {
          window.notify({
            msg: `Service ${
              this.reqBody?.id ? "updated" : "saved"
            } successfully`,
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
        window.notify({
          msg: "There was an error, please check the form and try again",
          status: "error",
        });
        this.loading = false;
      }
    }

    updateSource(val: any) {
      this.source = val;
    }

    getLocationName(id: string) {
      const pt = this.location.find((i: any) => i.id === id);
      return pt ? `${pt.name}` : "";
    }

    get allLocation() {
      if (!this.location || this.location.length === 0) return [];
      return this.location.map((i: any) => {
        return {
          code: i.id,
          display: i.name,
        };
      });
    }
    get allSpeciality() {
      if (!this.specials || this.specials.length === 0) return [];
      return this?.specials?.map((i: any) => {
        return {
          code: i.id,
          display: i.name,
        };
      });
    }

    async deleteLocationDays(index: number) {
      this.locations.splice(index, 1);
    }

    async fetchLocation() {
      const AllLocation = cornieClient().get(
        "/api/v1/location/myOrg/getMyOrgLocations"
      );
      const response = await Promise.all([AllLocation]);
      this.location = response[0].data;
    }
    async setDropdown() {
      const data = await this.getDropdowns("practitioner");
      this.dropdown = data;
    }

    get allP() {
      return this.cornieUser;
    }

    get markupData() {
      const pt = this.markups.find(
        (i: any) => i.locationId == this.authCurrentLocation
      );
      return pt;
    }
    async created() {
      await this.setServices();

      await this.fetchMarkups();
      await this.fetchSpecials();
      await this.setDropdown();
      await this.fetchLocation();
      this.discountLimit = this.markupData?.maxAllowedDiscount;
      this.markup = this.markupData?.markupPercentage;
    }
  }
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
  .sub-headers {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    color: #fe4d3c;
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
    padding: 0.25rem;
  }

  .ths {
    background: #f0f4fe;
    border-radius: 8px 8px 0px 0px;
    padding: 0.25rem;
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

  .tbs {
    background: #ffffff;
    border: 1px solid #c2c7d6;
    box-sizing: border-box;
    border-radius: 0px 0px 8px 8px;
  }

  input[type="checkbox"]:after {
    border: 1px solid #c4bdbd !important;
  }
  input[type="checkbox"]:checked:after {
    background-color: #ff0000 !important;
  }

  .modal-header {
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 28px;
    color: #080056;
  }

  .modal-text {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #14171f;
  }
  .small-text {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #14171f;
  }
  /* .multiselect-clear-icon {
      -webkit-mask-image: url("/components/icons/chevrondownprimary.vue");
      mask-image: url("/components/icons/chevrondownprimary.vue");
      background-color: #080056;
      display: inline-block;
      transition: .3s;
  } */

  .multiselect-placeholder {
    font-size: 0.8em;
    font-weight: 400;
    font-style: italic;
    color: #667499;
  }

  .multiselect-caret {
    transform: rotate(0deg);
    transition: transform 0.3s;
    -webkit-mask-image: url("../../../../../assets/img/Chevron.png");
    mask-image: url("../../../../../assets/img/Chevron.png");
    background-color: #080056;
    margin: 0 var(--ms-px, 0.875rem) 0 0;
    position: relative;
    z-index: 10;
    flex-shrink: 0;
    flex-grow: 0;
    pointer-events: none;
  }

  .multiselect-tag.is-user img {
    width: 18px;
    border-radius: 50%;
    height: 18px;
    margin-right: 8px;
    border: 2px solid #ffffffbf;
  }

  .multiselect-tag.is-user i:before {
    color: #ffffff;
    border-radius: 50%;
  }

  .multiselect-tag-remove {
    display: flex;
    align-items: center;
    /* border: 1px solid #fff;
    background: #fff; */
    border-radius: 50%;
    color: #fff;
    justify-content: center;
    padding: 0.77px;
    margin: var(--ms-tag-remove-my, 0) var(--ms-tag-remove-mx, 0.5rem);
  }
</style>
