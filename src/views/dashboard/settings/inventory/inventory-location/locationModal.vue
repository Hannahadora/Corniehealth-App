<template>
  <div>
    <cornie-dialog v-model="show" right class="w-8/12 h-full">
      <cornie-card height="100%" class="flex flex-col">
        <cornie-card-title class="w-full">
          <cornie-icon-btn @click="show = false" class="">
            <arrow-left-icon />
          </cornie-icon-btn>
          <div class="w-full border-l-2 border-gray-100">
            <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
              New Location
            </h2>
            <cancel-icon class="float-right cursor-pointer" @click="show = false" />
          </div>
        </cornie-card-title>

        <cornie-card-text class="flex-grow scrollable">
          <v-form ref="form">
            <div class="border-b-2 pb-5 border-dashed border-gray-200">
              <div class="w-full grid grid-cols-2 gap-5 mt-5 pb-5">
                <cornie-input
                  label="Location Name"
                  placeholder="--Enter--"
                  class="w-full"
                  v-model="name"
                />
                <cornie-select
                  class="required"
                  :rules="required"
                  :items="['Hospital', 'Labs', 'Pharmacy']"
                  label="Location Type"
                  placeholder="--Select--"
                  v-model="type"
                >
                </cornie-select>
                <!-- <fhir-input reference="http://hl7.org/fhir/ValueSet/v3-ServiceDeliveryLocationRoleType"
                  class="required w-full" v-model="type" label="Type" placeholder="--Select--" required /> -->
                <!-- <cornie-select class="required" :rules="required" :items="[
                'CarePlan',
                'MedicationRequest',
                'ServiceRequest',
                'ImmunizationRecommendation',
              ]" label="Location Manager" placeholder="--Select--" v-model="manager">
              </cornie-select> -->
                <practioner-select
                  class="w-full mb-2"
                  label="Location Manager"
                  v-model="manager"
                >
                </practioner-select>
                <cornie-input
                  label="Address"
                  placeholder="--Enter--"
                  class="w-full"
                  v-model="address"
                />
                <!-- <cornie-select class="required" :rules="required" :items="[
                'CarePlan',
                'MedicationRequest',
                'ServiceRequest',
                'ImmunizationRecommendation',
              ]" label="Country" placeholder="--Select--" v-model="country">
              </cornie-select> -->
                <auto-complete
                  :rules="required"
                  v-model="country"
                  required
                  label="Country"
                  :items="countries"
                  class="w-full"
                />
                <auto-complete
                  required
                  :rules="required"
                  :items="states"
                  v-model="state"
                  label="State"
                  class="w-full"
                />
                <!-- <cornie-select class="required" :rules="required" :items="[
                'CarePlan',
                'MedicationRequest',
                'ServiceRequest',
                'ImmunizationRecommendation',
              ]" label="State" placeholder="--Select--" v-model="state">
              </cornie-select> -->
                <cornie-input
                  label="City"
                  :rules="required"
                  placeholder="--Enter--"
                  class="w-full"
                  v-model="city"
                />

                <cornie-input
                  label="Postal/Zip Code *"
                  placeholder="--Enter--"
                  class="w-full"
                  v-model="zip"
                />
                <!-- <cornie-select class="required" :rules="required" :items="[
                  'CarePlan',
                  'MedicationRequest',
                  'ServiceRequest',
                  'ImmunizationRecommendation',
                ]" label="Inventory Category" placeholder="--Select--" v-model="category">
                </cornie-select> -->
                <div class="flex flex-col space-y-2">
                  <div
                    class="flex capitalize items-center mb-1 text-black text-sm font-semibold"
                  >
                    Inventory Category
                  </div>
                  <Multiselect
                    label="Inventory Category"
                    v-model="category"
                    mode="tags"
                    :hide-selected="true"
                    :options="allInventoryCategories"
                    placeholder="--Select--"
                    class="w-full"
                  >
                    <template v-slot:tag="{ option, handleTagRemove, disabled }">
                      <div class="multiselect-tag is-user">
                        {{ option.label }}
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
                      <span class="w-full text-sm">{{ option.label }}</span>
                    </template>
                  </Multiselect>
                </div>
              </div>
              <span
                @click="showInventoryRequest = true"
                class="text-red-600 cursor-pointer"
              >
                + Add New Category
              </span>

              <div class="grid grid-cols-3 w-full">
                <div
                  v-for="(c, i) in displaySelectedCategories"
                  :key="i"
                  class="col-span-1"
                >
                  <div class="flex flex-row">
                    <div class="flex flex-col">
                      <div class="font-bold text-lg">{{ c.name }}</div>
                      <div class="text-xxs">{{ c.description }}</div>
                    </div>
                    <div>
                      <DeleteRed />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-form>
        </cornie-card-text>

        <cornie-card>
          <cornie-card-text class="flex justify-end">
            <cornie-btn
              @click="show = false"
              class="border-primary border-2 mr-3 rounded-xl text-primary"
            >
              Cancel
            </cornie-btn>
            <cornie-btn
              :loading="loading"
              @click="submit"
              class="text-white bg-danger px-2 rounded-xl"
            >
              Save
            </cornie-btn>
          </cornie-card-text>
        </cornie-card>
      </cornie-card>
    </cornie-dialog>
    <inventory-modal v-model="showInventoryRequest" />
  </div>
</template>
<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { string } from "yup";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import { getCountries, getStates } from "@/plugins/nation-states";
import { namespace } from "vuex-class";
import AutoComplete from "@/components/autocomplete.vue";
import ILocation from "@/types/ILocation";
import ICategory from "@/types/ICategory";
import FhirInput from "@/components/fhir-input.vue";
import PractionerSelect from "@/components/practitioner-select.vue";
import InventoryModal from "../inventory-category/inventoryModal.vue";
import Multiselect from "@vueform/multiselect";
import DeleteRed from "@/components/icons/delete-red.vue";

const countries = getCountries();
const location = namespace("location");
const inventory = namespace("inventorysettings");

@Options({
  name: "Inventory Modal",
  components: {
    ...CornieCard,
    CornieDialog,
    CornieInput,
    CornieSelect,
    CornieIconBtn,
    ArrowLeftIcon,
    CancelIcon,
    AutoComplete,
    FhirInput,
    PractionerSelect,
    InventoryModal,
    Multiselect,
    DeleteRed,
  },
})
export default class InventoryLocationModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Object, default: undefined })
  selectedItem!: any;

  countries = countries;
  states = [] as any;

  showInventoryRequest = false;
  name = "";
  type = "";
  manager = "";
  address = "";
  country = "";
  state = "";
  city = "";
  zip = "";
  category = [];
  required = string().required();
  loading = false;

  @inventory.Action
  createLocation!: (data: any) => Promise<void>;

  @inventory.Action
  updateLocation!: (data: any) => Promise<void>;

  @inventory.State
  categories!: ICategory[];

  @Watch("selectedItem", { immediate: true })
  setItems() {
    if (!this.selectedItem || this.selectedItem == "") {
      return;
    }

    this.name = this.selectedItem.name;
    this.type = this.selectedItem.type;
    this.manager = this.selectedItem.manager;
    this.address = this.selectedItem.address;
    this.country = this.selectedItem.country;
    this.state = this.selectedItem.state;
    this.city = this.selectedItem.city;
    this.zip = this.selectedItem.zip;
    this.category = this.selectedItem.classes;
  }

  async submit() {
    this.loading = true;
    if (this.selectedItem == undefined || !this.selectedItem) {
      await this.createLocation({
        name: this.name,
        type: this.type,
        manager: this.manager,
        address: this.address,
        country: this.country,
        state: this.state,
        city: this.city,
        zipCode: this.zip,
        classes: this.category,
      });
    } else {
      await this.updateLocation({
        id: this.selectedItem.id,
        data: {
          name: this.name,
          type: this.type,
          manager: this.manager,
          address: this.address,
          country: this.country,
          state: this.state,
          city: this.city,
          zipCode: this.zip,
          classes: this.category,
        },
      });
    }

    this.loading = false;
  }

  getCategoryDetails(id: string) {
    const data = this.categories.filter((x) => x.id == id)[0];
    return {
      name: data.name,
      description: data.description,
    };
  }

  @Watch("country")
  async countryPicked(country: string) {
    const states = await getStates(country);
    this.states = states;
  }

  get allInventoryCategories() {
    return this.categories.map((x) => {
      return {
        label: x.name,
        value: x.id,
      };
    });
    // return []
  }

  get displaySelectedCategories() {
    return this.category.map((x) => {
      return this.getCategoryDetails(x);
    });
  }

  async mounted() {
    // await this.fetchLocations()
    console.log("frddfd", this.categories);
  }
}
</script>
