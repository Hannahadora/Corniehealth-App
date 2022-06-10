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
              View Location
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
              <div class="flex flex-col">
                <div class="font-bold text-sm">Location</div>
                <div class="text-lg">
                  {{ temp.chosenLocation }}
                </div>
              </div>

              <div class="flex flex-col">
                <div class="font-bold text-sm">Manager</div>
                <div class="text-lg">
                  {{ selectedItem.manager }}
                </div>
              </div>

              <div class="flex flex-col">
                <div class="font-bold text-sm">Phone Number</div>
                <div class="text-lg">
                  {{ temp.phone.dialCode }}{{ temp.phone.number }}
                </div>
              </div>

              <div class="flex flex-col">
                <div class="font-bold text-sm">Email</div>
                <div class="text-lg">
                  {{ selectedItem.email }}
                </div>
              </div>
            </div>
          </v-form>
        </cornie-card-text>
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
  import IPractitioner from "@/types/IPractitioner";
  import ClinicalDialog from "@/views/dashboard/ehr/conditions/clinical-dialog.vue";
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
      ClinicalDialog,
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

    @inventory.Action
    getAllLocations!: () => Promise<void>;

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

    @practitioners.Action
    fetchPractitioners!: () => Promise<void>;

    @practitioners.State
    practitioners!: IPractitioner[];

    locationsPayload: any = [];

    @Watch("selectedItem", { immediate: true })
    setItems() {
      if (!this.selectedItem || this.selectedItem == "") {
        return;
      }

      console.log("selectedITem", this.selectedItem);
      this.temp.chosenLocation = this.findLocationName(
        this.selectedItem.locationId
      ).name;

      this.temp.manager = this.findPractioner(this.selectedItem.manager) as any;
      this.temp.phone = this.selectedItem.phone;
      this.temp.email = this.selectedItem.email;
    }

    findLocationName(y: any) {
      return this.locations.find((x) => x.id == y);
    }

    findPractioner(y: string) {
      let a = this.practitioners.find(
        (x) => x.firstName + " " + x.lastName == y
      );
      console.log("found P", a);
      return a?.id;
    }

    async submit() {
      if (this.locationsPayload.length == 0 && !this.selectedItem) return;
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
          country: this.getLocation(x.chosenLocation)?.country || null,
        };
      });
      if (this.selectedItem == undefined || !this.selectedItem) {
        try {
          await this.createLocation(p);
          // window.location.reload();
          this.loading = false;
          this.show = false;
          notify({ msg: "Location created successfully", status: "success" });
          await this.getAllLocations();
        } catch (error) {
          console.log("create location error", error);
          notify({
            msg: "There was an error creating location",
            status: "error",
          });
        }
      } else {
        await this.updateLocation({
          id: this.selectedItem.id,
          data: {
            locationId: this.getLocation(this.temp.chosenLocation).id,
            manager: this.temp.manager,
            phone: this.temp.phone,
            email: this.temp.email,
            address: this.getLocation(this.temp.chosenLocation)?.address,
            city: this.getLocation(this.temp.chosenLocation)?.city,
            state: this.getLocation(this.temp.chosenLocation)?.state,
            country:
              this.getLocation(this.temp.chosenLocation)?.country || null,
          },
        })
          .then(async () => {
            notify({ msg: "Location updated successfully", status: "success" });
            // window.location.reload();
            this.loading = false;
            this.show = false;
            await this.getAllLocations();
          })
          .catch(() => {
            notify({
              msg: "There was an error updating location",
              status: "error",
            });
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
      await this.fetchPractitioners();
      console.log("locariont", this.locations);
    }
  }
</script>
