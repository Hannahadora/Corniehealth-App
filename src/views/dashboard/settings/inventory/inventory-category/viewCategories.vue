<template>
  <cornie-dialog v-model="show" right class="w-1/2 h-full">
    <cornie-card height="100%" width="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            View Category
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
              <div class="font-bold text-sm">Category</div>
              <div class="text-lg">
                {{ temp.category }}
              </div>
            </div>

            <div class="flex flex-col">
              <div class="font-bold text-sm">Location</div>
              <div class="text-lg">
                {{ temp.location }}
              </div>
            </div>

            <div class="flex flex-col">
              <div class="font-bold text-sm">Manager</div>
              <div class="text-lg">
                {{ findPractioner(manager.id) }}
              </div>
            </div>

            <div class="flex flex-col">
              <div class="font-bold text-sm">Phone Number</div>
              <div class="text-lg">
                {{ manager.phone.dialCode }} {{ manager.phone.number }}
              </div>
            </div>

            <div class="flex flex-col">
              <div class="font-bold text-sm">Email</div>
              <div class="text-lg">
                {{ manager.email }}
              </div>
            </div>
          </div>
        </v-form>
      </cornie-card-text>
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
  import IPractitioner from "@/types/IPractitioner";
  import Multiselect from "@vueform/multiselect";
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync, Watch } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { string } from "yup";

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

    @Prop({ type: Object, default: {} })
    selectedItem!: any;

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
    getCategory!: () => Promise<void>;

    @inventory.Action
    updateCategory!: (data: any) => Promise<void>;

    @inventory.Action
    getAllLocations!: () => Promise<void>;

    @practitioners.Action
    fetchPractitioners!: () => Promise<void>;

    @practitioners.State
    practitioners!: IPractitioner[];

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
      // let chosenLocationId = this.getLocation(this.temp.location).id;
      let chosenLocationId = this.inventoryLocations.find(
        (x) => x.locationId == this.getLocation(this.temp.location).id
      ).id;
      console.log(
        "chosen id",
        chosenLocationId,
        this.getFormerDetails(chosenLocationId),
        this.inventoryLocations
      );
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

    findPractioner(y: string) {
      let a = this.practitioners.find((x) => x.id == y);
      console.log("found P", a);
      return a?.firstName + " " + a?.lastName;
    }

    @Watch("selectedItem", { immediate: true })
    setItems() {
      console.log("selectedC", this.selectedItem);
      console.log("inv l", this.inventoryLocations);
      const { id, category, manager } = this.selectedItem;
      if (!id) {
        return;
      }

      this.temp.category = category;
      this.temp.location = this.findLocationName(
        this.selectedItem.inventoryLocationId
      )?.name as any;
      this.manager.id = manager;
      this.manager.phone = this.selectedItem.phone;
      this.manager.email = this.selectedItem.email;
    }

    getCategoryDetails(id: string) {
      return this.categories.filter((x) => x.id == id)[0];
    }
    findLocationName(y: any) {
      let z = this.inventoryLocations.find((x) => x.id == y).locationId;
      return this.locations.find((x) => x.id == z);
    }

    getLocation(y: string): any {
      //@ts-ignore
      return this.locations.find((x) => x.name == y);
    }

    async submit() {
      if (this.selectedItem.id) {
        if (
          !this.temp.location ||
          !this.temp.category ||
          !this.manager.phone ||
          !this.manager.email
        )
          return;
        console.log("id yes", this.manager.id);
        this.loading = true;
        let chosenLocationId = this.inventoryLocations.find(
          (x) => x.locationId == this.getLocation(this.temp.location).id
        ).id;
        console.log(
          "chosenn id",
          chosenLocationId,
          this.getFormerDetails(chosenLocationId),
          this.locations
        );
        let x = {
          inventoryLocationId: chosenLocationId,
          locationN: this.temp.location,
          category: this.temp.category.trim().toLocaleLowerCase(),
          manager: this.manager.id,
          phone: this.manager.phone,
          email: this.manager.email,
          address: this.getCurrentDetails(chosenLocationId)?.address
            ? this.getCurrentDetails(chosenLocationId)?.address
            : "not available",
          city: this.getCurrentDetails(chosenLocationId)?.city
            ? this.getCurrentDetails(chosenLocationId)?.city
            : "not available",
          state: this.getCurrentDetails(chosenLocationId)?.state
            ? this.getCurrentDetails(chosenLocationId)?.state
            : "not available",
          country: this.getCurrentDetails(chosenLocationId)?.country
            ? this.getCurrentDetails(chosenLocationId)?.country
            : "not available",
        };

        await this.updateCategory({ id: this.selectedItem.id, data: x })
          .then(async () => {
            this.show = false;
            notify({ msg: "Category updated successfully", status: "success" });
            await this.getCategory();
          })
          .catch((e) => {
            notify({
              msg: "There was an error updating categories",
              status: "error",
            });
          });
        this.loading = false;

        return;
      }
      if (this.categoryPayload.length == 0) return;
      this.loading = true;
      let y = this.categoryPayload.map((c: any) => {
        return {
          ...c,
          inventoryLocationId: c.inventoryLocationId,
          category: c.category.toLocaleLowerCase().trim(),
          address: c.address ? c.address : "not available",
          city: c.city ? c.city : "not available",
          state: c.state ? c.state : "not available",
        };
      });
      await this.createCategory(y)
        .then(async () => {
          notify({ msg: "Category created successfully", status: "success" });
          this.show = false;
          await this.getCategory();
        })
        .catch((e) => {
          notify({
            msg: "There was an error creating categories",
            status: "error",
          });
        });
      this.loading = false;
    }

    getFormerDetails(locationId: string) {
      return this.inventoryLocations.find((x) => x.id == locationId);
    }

    getCurrentDetails(id: any) {
      //@ts-ignore
      let a = this.locations.find((location) => location.id == id);
      return a;
    }

    get allLocationNames() {
      console.log("locationNNN", this.locations);
      return this.inventoryLocations.map((x) => {
        //@ts-ignore
        let a = this.locations.find((location) => location.id == x.locationId);
        return a?.name;
      });
    }

    async mounted() {
      await this.getAllLocations();
      await this.fetchLocations();
      console.log("locationIn", this.inventoryLocations);
    }
  }
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
