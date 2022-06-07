<template>
  <div>
    <cornie-dialog v-model="show" right class="w-1/3 h-full">
      <cornie-card height="100%" class="flex flex-col">
        <cornie-card-title class="w-full">
          <div class="w-full border-l-2 border-gray-100">
            <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
              Inventory Category
            </h2>
            <cancel-icon
              class="float-right cursor-pointer"
              @click="show = false"
            />
          </div>
        </cornie-card-title>
        <cornie-card class="flex-grow scrollable">
          <div class="flex flex-col">
            <div class="flex flex-col space-y-1">
              <div>2 selected</div>
              <div>
                <icon-input
                  class="border border-gray-600 py-2 rounded-full focus:outline-none"
                  placeholder="Search Table"
                  v-model="filterQ"
                >
                  <template v-slot:prepend>
                    <search-icon />
                  </template>
                </icon-input>
              </div>
            </div>
            <div class="flex flex-col">
              <div
                v-for="(l, i) in LocationCategories"
                :key="i"
                class="flex flex-row space-x-2"
              >
                <div class="flex-none">
                  <cornie-checkbox
                    @click="select(l.id)"
                    :checked="isSelected(l.id)"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex flex-col">
                    <div class="text-lg">{{ l.name }}</div>
                    <div class="text-sm">{{ l.description }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </cornie-card>
      </cornie-card>
    </cornie-dialog>
  </div>
</template>
<script lang="ts">
  import AutoComplete from "@/components/autocomplete.vue";
  import CornieCard from "@/components/cornie-card";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieIconBtn from "@/components/CornieIconBtn.vue";
  import CornieInput from "@/components/cornieinput.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import CornieCheckbox from "@/components/custom-checkbox.vue";
  import FhirInput from "@/components/fhir-input.vue";
  import IconInput from "@/components/IconInput.vue";
  import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
  import CancelIcon from "@/components/icons/CloseIcon.vue";
  import DeleteRed from "@/components/icons/delete-red.vue";
  import SearchIcon from "@/components/icons/search.vue";
  import PractionerSelect from "@/components/practitioner-select.vue";
  import { getCountries } from "@/plugins/nation-states";
  import ICategory from "@/types/ICategory";
  import Multiselect from "@vueform/multiselect";
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import InventoryModal from "../inventory-category/inventoryModal.vue";

  const countries = getCountries();
  const location = namespace("location");
  const inventory = namespace("inventorysettings");

  @Options({
    name: "Add Category Modal",
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
      IconInput,
      SearchIcon,
      CornieCheckbox,
    },
  })
  export default class addCategoryModal extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @Prop({ type: Object, default: undefined })
    selectedItem!: any;

    @inventory.State
    locations!: any[];

    @inventory.State
    categories!: ICategory[];

    @inventory.Action
    updateLocation!: (data: any) => Promise<void>;

    filterQ = "";
    selectedItems: string[] = [];
    get allLocationClass(): string[] {
      const { id }: { id: string } = this.selectedItem;
      return this.locations.filter((x) => x.id == id)[0].classes;
    }

    get LocationCategories() {
      return this.allLocationClass.map((x) => {
        return this.getCategoryDetails(x);
      });
    }

    getCategoryDetails(id: string) {
      const data = this.categories.filter((x) => x.id == id)[0];
      return {
        name: data.name,
        description: data.description,
        id: data.id,
      };
    }

    isSelected(id: any): boolean {
      // const { data }: { data: string[] } = this.selectedItem
      return this.selectedItems.includes(id);
    }

    select(id: any) {
      if (this.isSelected(id)) {
        this.selectedItems = this.selectedItems.filter((x) => x !== id);
      } else this.selectedItems.push(id);
    }

    mounted() {
      const { data }: { data: string[] } = this.selectedItem;
      this.selectedItems = data;
    }
  }
</script>
