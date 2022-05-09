<template>
  <cornie-dialog v-model="show" right class="w-1/4 h-full">
    <cornie-card height="100%" width="100%" class="flex flex-col">

      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            New Inventory Category
          </h2>
          <cancel-icon class="float-right cursor-pointer" @click="show = false" />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
          <div class="flex flex-col space-y-4">
            <div>
              <cornie-input label="Name" placeholder="--Enter--" class="w-full" v-model="Cname" />
            </div>
            <div>
              <cornie-input label="Description" placeholder="--Enter--" class="w-full" v-model="Cdescription" />
            </div>
            <div class="flex flex-col space-y-2">
              <div class="flex capitalize items-center mb-1 text-black text-sm font-semibold">Assign to Other
                Location(s) (optional)</div>
              <Multiselect label="Assign to Other Location(s) (optional)" v-model="Clocation" mode="tags"
                :hide-selected="true" :options="allLocationNames" placeholder="--Select--" class="w-full">
                <template v-slot:tag="{ option, handleTagRemove, disabled }">
                  <div class="multiselect-tag is-user">
                    {{ option.label }}
                    <span v-if="!disabled" class="multiselect-tag-remove"
                      @mousedown.prevent="handleTagRemove(option, $event)">
                      <span class="multiselect-tag-remove-icon"></span>
                    </span>
                  </div>
                </template>
                <template v-slot:option="{ option }">
                  <span class="w-full text-sm">{{ option.label }}</span>
                </template>
              </Multiselect>
              <!-- <cornie-select class="required" :rules="required" :items="allLocationNames"
                label="Assign to Other Location(s) (optional)" v-model="Clocation" placeholder="--Select--">
              </cornie-select> -->
            </div>
          </div>
        </v-form>
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
import { namespace } from "vuex-class";
import ILocation from "@/types/ILocation";
import Multiselect from "@vueform/multiselect";
import ICategory from "@/types/ICategory";


const location = namespace("location");
const inventory = namespace('inventorysettings')

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
    Multiselect,

  }
})

export default class InventoryModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Object, default: undefined })
  selectedId!: string;


  Cname = ''
  Cdescription = ''
  Clocation: any = []
  required = string().required();
  loading = false

  @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;

  @inventory.Action
  createCategory!: (data: any) => Promise<void>

  @inventory.State
  categories!: ICategory[]

  @Watch('selectedId', { immediate: true })
  setItems() {
    if (!this.selectedId || this.selectedId == '') {
      return
    }
    let data = this.getCategoryDetails(this.selectedId)
    this.Cname = data.name
    this.Cdescription = data.description
    this.Clocation = data.locations

  }

  getCategoryDetails(id: string) {
    return this.categories.filter(x => x.id == id)[0]
  }

  // @inventory.State
  // categories!: any

  async submit() {
    this.loading = true;

    await this.createCategory({
      name: this.Cname,
      description: this.Cdescription,
      locations: this.Clocation
    }).then(() => {
      console.log("fdcxcx")
    }).catch((e) => {
      console.log("error cat", e)
    })
    this.loading = false
  }


  get allLocationNames() {
    return this.locations.map(x => {
      return {
        label: x.name,
        value: x.id
      }
    })
  }

  mounted() {
    //@ts-ignore
    // console.log('mmmm', this.$store.state.inventorysettings)
  }
}
</script>
<style src="@vueform/multiselect/themes/default.css">
</style>

