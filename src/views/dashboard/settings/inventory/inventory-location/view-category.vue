<template>
  <div>
    <cornie-dialog v-model="show" right class="w-1/4 h-full">
      <cornie-card height="100%" width="100%" class="flex flex-col">

        <cornie-card-title class="w-full">
          <cornie-icon-btn @click="show = false" class="">
            <arrow-left-icon />
          </cornie-icon-btn>
          <div class="w-full border-l-2 border-gray-100">
            <div class="flex flex-col space-y-1">
              <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
                Inventory Category(s) </h2>
              <p class="text-xxs">Edit or Remove Inventory Category(s)</p>
            </div>
            <cancel-icon class="float-right cursor-pointer" @click="show = false" />
          </div>
        </cornie-card-title>

        <cornie-card-text class="flex-grow scrollable">
          <div class="flex flex-col">
            <div v-for="(c, i) in categoryDetails" :key="i" class="flex flex-row">
              <div class="flex-1">
                <div class="flex flex-col">
                  <div class="font-bold text-lg">{{ c.name }}</div>
                  <div class="text-xxs">{{ c.description }}</div>
                </div>
              </div>
              <div class="flex flex-row">
                <div @click="editCategory(c.id)">
                  <edit-icon class="text-purple-500 fill-current" />
                </div>
                <div></div>
              </div>
            </div>
          </div>
          <div>
            <p @click="showEditModal = true" class="flex items-center justify-start text-red-600 cursor-pointer">
              + Add New Category
            </p>
          </div>
        </cornie-card-text>

        <cornie-card>
          <cornie-card-text class="flex justify-end">
            <cornie-btn @click="show = false" class="border-primary border-2  mr-3 rounded-xl text-primary">
              Cancel
            </cornie-btn>
            <cornie-btn :loading="loading" @click="submit" class="text-white bg-danger px-2 rounded-xl">
              Save
            </cornie-btn>

          </cornie-card-text>
        </cornie-card>
      </cornie-card>

    </cornie-dialog>

    <inventory-modal v-model="showEditModal" :selectedId="selectedId" />
  </div>

</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import ICategory from "@/types/ICategory";
import EditIcon from "@/components/icons/edit.vue";
import InventoryModal from "../inventory-category/inventoryModal.vue";

const inventory = namespace('inventorysettings')
@Options({
  name: "View inventory classes",
  components: {
    ...CornieCard,
    CornieDialog,
    CornieInput,
    CornieSelect,
    CornieIconBtn,
    ArrowLeftIcon,
    CancelIcon,
    EditIcon,
    InventoryModal
  }
})

export default class viewCategory extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Object, default: {} })
  selectedItem!: any[];

  loading = false
  showEditModal = false
  selectedId = ""

  @inventory.State
  categories!: ICategory[]

  getCategoryDetails(id: string) {
    return this.categories.filter(x => x.id == id)[0]
  }

  editCategory(id: string) {
    this.selectedId = id
    this.showEditModal = true
  }

  submit() {

  }

  get categoryDetails() {
    return this.selectedItem.map(x => {
      return this.getCategoryDetails(x)
    })
  }
}
</script>