<template>
  <div>
    <cornie-dialog v-model="show" right class="w-1/2 h-full">
      <cornie-card height="100%" class="flex flex-col">
        <cornie-card-title class="w-full">
          <cornie-icon-btn @click="show = false" class="">
            <arrow-left-icon />
          </cornie-icon-btn>
          <div class="w-full border-l-2 border-gray-100">
            <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
              New Location
            </h2>
            <cancel-icon
              class="float-right cursor-pointer"
              @click="show = false"
            />
          </div>
        </cornie-card-title>

        <cornie-card-text class="flex-grow scrollable">
          <v-form ref="form">
            <div class="grid grid-cols-2 gap-6">
              <cornie-select
                class="required"
                :rules="required"
                :items="displayLocations"
                label="Location"
                placeholder="--Select--"
                v-model="temp.chosenLocation"
              />
              <practioner-select
                class="w-full mb-2"
                label="Manager"
                v-model="temp.manager"
              />
              <phone-input
                v-model:code="temp.phone.dialCode"
                v-model="temp.phone.number"
                :rules="phoneRule"
                class="w-full mb-4"
                label="Phone Number"
              />

              <cornie-input
                label="Email"
                placeholder="--Enter--"
                class="w-full"
                v-model="temp.email"
                :rules="emailRule"
              />
            </div>
            <div class="flex w-full items-center justify-end">
              <div
                @click="addLocationP"
                class="px-5 py-2 space-x-2 capitalize cursor-pointer items-center font-bold text-primary border-primary rounded-full border-2 flex"
              >
                <add-icon />
                <div>Add</div>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-6">
              <div
                v-for="(l, i) in locationsPayload"
                :key="i"
                class="flex items-center p-3 shadow-md rounded-md"
              >
                <div class="flex-1">
                  <div class="flex flex-col">
                    <div class="font-bold text-sm">{{ l.chosenLocation }}</div>
                    <div class="text-xxs">{{ l.manager }}</div>
                  </div>
                </div>
                <div class="flex-none bg-gray-100 p-4 rounded-md">
                  <delete-icon @click="removeLocationP(i)" />
                </div>
              </div>
            </div>
            <!-- <div class="border-b-2 pb-5 border-dashed border-gray-200">
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
                <cornie-input
                  label="Address"
                  placeholder="--Enter--"
                  class="w-full"
                  v-model="address"
                />
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
                    <template
                      v-slot:tag="{ option, handleTagRemove, disabled }"
                    >
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
            </div> -->
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
  import AutoComplete from "@/components/autocomplete.vue";
  import CornieCard from "@/components/cornie-card";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieIconBtn from "@/components/CornieIconBtn.vue";
  import CornieInput from "@/components/cornieinput.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import FhirInput from "@/components/fhir-input.vue";
  import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
  import CancelIcon from "@/components/icons/CloseIcon.vue";
  import DeleteRed from "@/components/icons/delete-red.vue";
  import DeleteIcon from "@/components/icons/deleteorange.vue";
  import AddIcon from "@/components/icons/plus.vue";
  import PhoneInput from "@/components/phone-input.vue";
  import PractionerSelect from "@/components/practitioner-select.vue";
  import { getCountries, getStates } from "@/plugins/nation-states";
  import ICategory from "@/types/ICategory";
  import Multiselect from "@vueform/multiselect";
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync, Watch } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { string } from "yup";
  import InventoryModal from "../inventory-category/inventoryModal.vue";

  const countries = getCountries();
  const location = namespace("location");
  const inventory = namespace("inventorysettings");
  const practitioners = namespace("practitioner");
  const phoneRegex =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

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
      AddIcon,
      DeleteIcon,
      PhoneInput,
    },
  })
  export default class InventoryLocationModal extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @Prop({ type: Object, default: undefined })
    selectedItem!: any;

    countries = countries;
    states = [] as any;

    categoryPayload = [];

    showInventoryRequest = false;
    name = "";
    type = "";

    address = "";
    country = "";
    state = "";
    city = "";
    zip = "";
    category = [];
    required = string().required();
    emailRule = string().email("A valid email is required").required();
    phoneRule = string().matches(
      phoneRegex,
      "A valid phone number is required"
    );
    dialCode = "+234";
    loading = false;
    temp = {
      chosenLocation: "",
      manager: "",
      phone: {
        dialCode: "+234",
        number: "",
      },
      email: "",
    };

    @inventory.Action
    createLocation!: (data: any) => Promise<void>;

    @inventory.Action
    updateLocation!: (data: any) => Promise<void>;

    @inventory.State
    categories!: ICategory[];

    @location.Action
    fetchLocations!: () => Promise<void>;

    @location.State
    locations!: any[];

    @practitioners.Action
    getPractitionerById!: (id: string) => any;

    locationsPayload: any = [];

    @Watch("selectedItem", { immediate: true })
    setItems() {
      if (!this.selectedItem || this.selectedItem == "") {
        return;
      }

      // this.name = this.selectedItem.name;
      // this.type = this.selectedItem.type;
      // this.manager = this.selectedItem.manager;
      // this.address = this.selectedItem.address;
      // this.country = this.selectedItem.country;
      // this.state = this.selectedItem.state;
      // this.city = this.selectedItem.city;
      // this.zip = this.selectedItem.zip;
      // this.category = this.selectedItem.classes;
    }

    async submit() {
      if (this.locationsPayload.length == 0) return;
      this.loading = true;
      let p = this.locationsPayload.map((x: any) => {
        return {
          locationId: this.getLocation(x.chosenLocation).id,
          manager: x.managerId,
          phone: x.phone,
          email: x.email,
          address: this.getLocation(x.chosenLocation)?.address,
          city: this.getLocation(x.chosenLocation)?.city,
          state: this.getLocation(x.chosenLocation)?.state,
          country: this.getLocation(x.chosenLocation)?.country,
        };
      });
      if (this.selectedItem == undefined || !this.selectedItem) {
        try {
          await this.createLocation(p);
          window.location.reload();
        } catch (error) {
          console.log("create location error", error);
        }
      } else {
        await this.updateLocation({
          id: this.selectedItem.id,
          data: {
            // name: this.name,
            // type: this.type,
            // manager: this.manager,
            // address: this.address,
            // country: this.country,
            // state: this.state,
            // city: this.city,
            // zipCode: this.zip,
            // classes: this.category,
          },
        });
      }

      this.loading = false;
    }

    getLocation(y: string) {
      return this.locations.find((x) => x.name == y);
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

    get displayLocations() {
      return this.locations.length > 0 ? this.locations.map((x) => x.name) : [];
    }

    async addLocationP() {
      if (
        !this.temp.chosenLocation ||
        !this.temp.manager ||
        !this.temp.phone ||
        !this.temp.email
      )
        return;

      const pracId = this.temp.manager;
      const pracDisplay = await this.getPractitionerById(this.temp.manager);

      let p = {
        ...this.temp,
        manager: pracDisplay.firstName + " " + pracDisplay.lastName,
        managerId: pracId,
      };

      this.locationsPayload.push(p);
      this.temp = {
        chosenLocation: "",
        manager: "",
        phone: {
          dialCode: "",
          number: "",
        },
        email: "",
      };
    }

    removeLocationP(i: any) {
      this.locationsPayload.splice(i, 1);
    }
    async mounted() {
      await this.fetchLocations();
      console.log("locariont", this.locations);
    }
  }
</script>
