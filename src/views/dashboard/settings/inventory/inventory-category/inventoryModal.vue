<template>
  <cornie-dialog v-model="show" right class="w-1/2 h-full">
    <cornie-card height="100%" width="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            New Category(s)
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
              :items="['Pharmacy', ' Diagnostics', 'In-patient']"
              label="Category"
              placeholder="--Select--"
              v-model="temp.category"
            />
            <cornie-select
              class="required"
              :rules="required"
              :items="allLocationNames"
              label="Location"
              placeholder="--Select--"
              v-model="temp.location"
            />
            <div class="">
              <div class="flex flex-row items-center justify-between">
                <div class="font-semibold">Manager</div>
                <div class="flex items-center space-x-1">
                  <check-box v-model="managerCheck" class="mr-1" />
                  <div class="text-xs">Same as location manager</div>
                </div>
              </div>
              <practioner-select
                v-model="manager.id"
                v-if="!managerCheck"
                class="w-full"
              >
              </practioner-select>
              <cornie-input
                v-if="managerCheck"
                class="-mt-1 w-full"
                placeholder="Autoloaded"
                :disabled="true"
              >
              </cornie-input>
            </div>

            <cornie-input
              v-if="managerCheck"
              class="mt-3 w-full"
              placeholder="Autoloaded"
              :disabled="true"
              label="Phone number"
            >
            </cornie-input>
            <phone-input
              v-if="!managerCheck"
              v-model:code="manager.phone.dialCode"
              v-model="manager.phone.number"
              :rules="phoneRule"
              class="w-full mt-4"
              label="Phone number"
              :disabled="true"
            />

            <cornie-input
              v-if="managerCheck"
              class="mt-3 w-full"
              placeholder="Autoloaded"
              :disabled="true"
              label="Email"
            >
            </cornie-input>

            <cornie-input
              v-if="!managerCheck"
              label="Email"
              placeholder="--Enter--"
              class="w-full"
              v-model="manager.email"
              :rules="emailRule"
            />
          </div>
          <div
            class="flex w-full items-center justify-end border-dashed border-b-2 pb-4"
          >
            <div
              @click="addCategory"
              class="px-5 py-2 space-x-2 capitalize cursor-pointer items-center font-bold text-primary border-primary rounded-full border-2 flex"
            >
              <add-icon />
              <div>Add</div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-6">
            <div
              v-for="(c, i) in categoryPayload"
              class="flex items-center p-3 shadow-md rounded-md"
            >
              <div class="flex-1">
                <div class="flex flex-col">
                  <div class="font-bold text-sm capitalize">
                    {{ c.category }} Inventory
                  </div>
                  <div class="text-xxs">{{ c.locationN }}</div>
                </div>
              </div>
              <div class="flex-none bg-gray-100 p-4 rounded-md">
                <delete-icon @click="removeCategory(i)" />
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
</template>
<script lang="ts">
  import CornieCard from "@/components/cornie-card";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieIconBtn from "@/components/CornieIconBtn.vue";
  import CornieInput from "@/components/cornieinput.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import CheckBox from "@/components/custom-checkbox.vue";
  import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
  import CancelIcon from "@/components/icons/CloseIcon.vue";
  import DeleteIcon from "@/components/icons/deleteorange.vue";
  import AddIcon from "@/components/icons/plus.vue";
  import PhoneInput from "@/components/phone-input.vue";
  import PractionerSelect from "@/components/practitioner-select.vue";
  import ICategory from "@/types/ICategory";
  import ILocation from "@/types/ILocation";
  import Multiselect from "@vueform/multiselect";
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync, Watch } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { string } from "yup";

  const location = namespace("location");
  const inventory = namespace("inventorysettings");

  const phoneRegex =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  @Options({
    name: "Inventory Modal",
    components: {
      ...CornieCard,
      CornieDialog,
      CornieInput,
      AddIcon,
      CornieSelect,
      CornieIconBtn,
      ArrowLeftIcon,
      CancelIcon,
      Multiselect,
      CheckBox,
      PhoneInput,
      PractionerSelect,
      DeleteIcon,
    },
  })
  export default class InventoryModal extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @Prop({ type: Object, default: undefined })
    selectedId!: string;

    Cname = "";
    Cdescription = "";
    Clocation: any = [];
    required = string().required();
    emailRule = string().email("A valid email is required").required();
    phoneRule = string().matches(
      phoneRegex,
      "A valid phone number is required"
    );

    loading = false;
    dialCode = "+234";

    @inventory.State
    inventoryLocations!: any[];

    @location.State
    locations!: ILocation[];

    @location.Action
    fetchLocations!: () => Promise<void>;

    @inventory.Action
    createCategory!: (data: any) => Promise<void>;

    @inventory.Action
    getAllLocations!: () => Promise<void>;

    @inventory.State
    categories!: ICategory[];

    displayL: any = [];
    managerCheck = false;
    categoryPayload: any[] = [];

    temp = {
      category: "",
      location: "",
    };

    manager = {
      id: "",
      phone: {
        dialCode: "+234",
        number: "",
      },
      email: "",
    };

    addCategory() {
      if (!this.temp.category || !this.temp.location) {
        return;
      }
      let chosenLocationId = this.getLocation(this.temp.location).id;
      let p;
      if (this.managerCheck) {
        p = {
          inventoryLocationId: chosenLocationId,
          locationN: this.temp.location,
          category: this.temp.category.trim().toLocaleLowerCase(),
          manager: this.getFormerDetails(chosenLocationId).manager,
          phone: this.getFormerDetails(chosenLocationId).phone,
          email: this.getFormerDetails(chosenLocationId).email,
          address: this.getFormerDetails(chosenLocationId).address,
          city: this.getFormerDetails(chosenLocationId).city,
          state: this.getFormerDetails(chosenLocationId).state,
          country: this.getFormerDetails(chosenLocationId).country,
        };
      } else {
        p = {
          inventoryLocationId: chosenLocationId,
          locationN: this.temp.location,
          category: this.temp.category.trim().toLocaleLowerCase(),
          manager: this.manager.id,
          phone: this.manager.phone,
          email: this.manager.email,
          address: this.getCurrentDetails(chosenLocationId)?.address,
          city: this.getCurrentDetails(chosenLocationId)?.city,
          state: this.getCurrentDetails(chosenLocationId)?.state,
          country: this.getCurrentDetails(chosenLocationId)?.country,
        };
      }
      console.log("pushed", p);
      this.categoryPayload.push(p);
      this.temp = {
        category: "",
        location: "",
      };

      this.manager = {
        id: "",
        phone: {
          dialCode: "+234",
          number: "",
        },
        email: "",
      };
    }

    removeCategory(i: any) {
      this.categoryPayload.splice(i, 1);
    }

    @Watch("selectedId", { immediate: true })
    setItems() {
      if (!this.selectedId || this.selectedId == "") {
        return;
      }
      let data = this.getCategoryDetails(this.selectedId);
      this.Cname = data.name;
      this.Cdescription = data.description;
      this.Clocation = data.locations;
    }

    getCategoryDetails(id: string) {
      return this.categories.filter((x) => x.id == id)[0];
    }

    getLocation(y: string): any {
      //@ts-ignore
      return this.locations.find((x) => x.name == y);
    }

    async submit() {
      this.loading = true;
      if (this.categoryPayload.length == 0) return;
      let y = this.categoryPayload.map((c: any) => {
        return {
          inventoryLocationId: c.inventoryLocationId,
          category: c.category.toLocaleLowerCase().trim(),
          address: c.address ? c.address : undefined,
          city: c.city ? c.city : undefined,
          state: c.state ? c.state : undefined,
          ...c,
        };
      });
      await this.createCategory(y)
        .then(() => {
          console.log("fdcxcx");
        })
        .catch((e) => {
          console.log("error cat", e);
        });
      this.loading = false;
    }

    getFormerDetails(locationId: string) {
      return this.inventoryLocations.find((x) => x.locationId == locationId);
    }

    getCurrentDetails(id: any) {
      //@ts-ignore
      let a = this.locations.find((location) => location.id == id);
      return a;
    }

    get allLocationNames() {
      console.log("locationNNN", this.inventoryLocations);
      return this.inventoryLocations.map((x) => {
        //@ts-ignore
        let a = this.locations.find((location) => location.id == x.locationId);
        return a?.name;
      });
    }

    async mounted() {
      await this.getAllLocations();
      await this.fetchLocations();
      // console.log("locationss", this.inventoryLocations);
    }
  }
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
