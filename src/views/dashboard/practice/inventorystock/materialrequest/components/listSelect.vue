<template>
  <div class="flex flex-col items-center mb-5">
    <div class="w-full flex flex-col items-center">
      <div class="w-full">
        <div class="flex flex-col items-center relative" :id="id">
          <div class="w-full" @click="toggle">
            <label
              v-if="label || $slots.label"
              class="flex space-x-55 w-full capitalize mb-1 text-black text-sm font-semibold"
              :for="`${id}-inputfield`"
            >
              <slot name="label" v-if="$slots.label" />
              <template v-else>
                {{ label }}
              </template>
              <div class="float-right cursor-pointer fill-current text-primary">
                <slot name="misc" />
              </div>
              <span class="text-danger ml-1" v-if="required"> * </span>
              <span class="ml-1 mb-1" v-if="$slots.labelicon">
                <slot name="labelicon" />
              </span>
              <span
                class="float-right flex justify-end w-full text-blue-500"
                v-if="labelText"
              >
                {{ innerlabel }}
              </span>
            </label>
            <field
              v-slot="{ errorMessage, meta, handleChange }"
              :rules="rules"
              v-model="modelValueSync"
              :name="inputName"
            >
              <div
                v-bind="$attrs"
                :class="{
                  'border-red-500': Boolean(errorMessage),
                  'border-green-400': meta.valid && meta.touched,
                  'bg-gray-50 border-gray-50': disabled || readonly,
                  'bg-primary border-primary': setPrimary,
                  'bg-white  border-gray-300': !setPrimary,
                }"
                class="p-1 flex border-1 rounded-md"
              >
                <span
                  v-if="Boolean($slots.selected)"
                  :class="{
                    'text-gray-800': !setPrimary,
                    'text-white': setPrimary,
                  }"
                  class="p-1 pl-2 bg-transparent appearance-none outline-none w-full"
                >
                  <slot name="selected" :item="selectedItem" />
                </span>
                <input
                  v-else
                  :placeholder="$attrs.placeholder"
                  :readonly="readonly || disabled"
                  :value="displayVal"
                  :class="{
                    'bg-gray-50 border-gray-50': disabled || readonly,
                    'bg-primary border-primary text-white': setPrimary,
                    'text-gray-800': !setPrimary,
                  }"
                  class="p-1 pl-2 bg-transparent appearance-none outline-none w-full"
                  @change="handleChange"
                />

                <div
                  class="text-gray-300 py-1 pr-1 flex items-center border-gray-200"
                >
                  <chevron-down-icon v-if="!setPrimary" />
                  <chevron-white-icon v-else />
                </div>
              </div>
              <span v-if="errorMessage" class="text-xs text-red-500 block">
                {{ errorMessage }}
              </span>
            </field>
          </div>
          <div
            v-if="!disabled"
            :class="{ hidden: !showDatalist }"
            class="absolute shadow bg-white top-100 z-40 w-full lef-0 border border-gray-400 rounded max-h-select overflow-y-auto mt-2 svelte-5uyqqj"
          >
            <div class="flex flex-col w-full p-2">
              <div  class="cursor-pointer w-full border-gray-100 rounded-xl hover:bg-white-cotton-ball">
                <div class=" w-full items-center p-2 pl-2 border-transparent border-l-2 relative capitalize">
                    <div class="w-full mb-4">
                        <cornie-radio class="w-full" :label="'Internal (Location)'" :value="'location'" v-model="recorderType"/>
                        <cornie-select class="w-full" :items="allLocations" @click="sendValue" v-model="locationId" v-if="recorderType == 'location'" :placeholder="'--Select--'"/>
                    </div>
                    <div class="w-full mb-4">
                        <cornie-radio class="w-full" :label="'Internal (Category)'" :value="'category'" v-model="recorderType"/>
                        <cornie-select class="w-full" @click="setCategory" v-if="recorderType == 'category'" :items="allSetCategoreis" v-model="categoryId" :placeholder="'--Select--'"/>
                    </div>
                    <div class="w-full mb-4" v-if="!receiver">
                        <cornie-radio class="w-full" :label="'Supplier'" @click="setSupplier('supplier')" :value="'supplier'" v-model="recorderType"/>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { clickOutside } from "@/plugins/utils";
import { nextTick } from "vue";
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import ChevronDownIcon from "@/components/icons/chevrondownprimary.vue";
import ChevronWhiteIcon from "@/components/icons/chevronwhitedown.vue";
import { Field } from "vee-validate";
import SelectOption from "@/components/custom-checkbox.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieSelect from "@/components/cornieselect.vue";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import ILocation from "@/types/ILocation";

const location = namespace("location");

@Options({
  components: {
    ChevronDownIcon,
    ChevronWhiteIcon,
    Field,
    SelectOption,
    CornieRadio,
    CornieSelect,
  },
})
export default class listSelect extends Vue {
  @Prop({ type: Array, default: [] })
  items!: any[];

  @Prop({ type: Object })
  rules!: any;

  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  modelValueSync!: string;

  @Prop({ type: Boolean, default: false })
  required!: boolean;

  @Prop({ type: Boolean, default: false })
  readonly!: boolean;

  @Prop({ type: Boolean, default: false })
  setPrimary!: boolean;

  @Prop({ type: Boolean, default: false })
  receiver!: boolean;

  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  @Prop({ type: Boolean, default: false })
  labelText!: boolean;

  @Prop({ type: Boolean, default: false })
  setCheck!: boolean;

  @Prop({ type: Boolean, default: false })
  addCheck!: boolean;

  @Prop({ type: String, default: "" })
  innerlabel!: string;

  @Prop({ type: String })
  label!: string;

  @Prop({ type: String, default: "" })
  labelicon!: string;

  
  @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;

  showDatalist = false;
  id = "";
  recorderType = "";
  locationsDropdown = [];
  locationId = "";
  categoryId = "";
  categoriesDropdown = [];

  get displayVal() {
    if (!this.modelValue || this.items.length < 1) return;

    const selected = this.selectedItem;
    return selected?.display || selected || "";
  }

  get selectedItem() {
    const selected = this.items.find(
      (item) => item.code == this.modelValue || item == this.modelValue
    );
    return selected;
  }

  toggle() {
    if (this.readonly) return;
    this.showDatalist = !this.showDatalist;
  }

  selected(item: any) {
    nextTick(() => {
      this.showDatalist = false;
      this.modelValueSync = item.code ?? item;
    });

    this.$emit("selected", item);
  }
  get inputName() {
    const id = Math.random().toString(36).substring(2, 9);
    return `select-${id}`;
  }

  @Watch("items")
  update() {
    this.$emit("change");
  }

  mounted() {
    clickOutside(this.id, () => {
      this.showDatalist = false;
    });
  }

   async fetchLocationDropdowns() {
        try {
          const { data } = await cornieClient().get(
            `/api/v1/inventory/settings/location/dropdown`
          );
          this.locationsDropdown = data;
        } catch (error) {
          window.notify({
            msg: "There was an error when fetching locations dropdown",
            status: "error",
          });
        }
    }

    sendValue(){
        this.allCategories()
    }

    setSupplier(value:string){
        this.$emit('setValue', value);
         this.showDatalist = false;
    }

    get allLocations(){
        return this.locationsDropdown.map((i: any) => {
        return {
            code: i.locationId,
            display: this.getLocationName(i.locationId),
        };
        });
    }
     get allSetCategoreis(){
        return this.categoriesDropdown.flatMap((i: any) => i.categories.map((cat:any) => {
            return {
                code: cat.id,
               display: cat.category,
            }
        }));
        
    }

    allCategories(){
        if(this.locationId){
            const pt = this.locationsDropdown.filter((i: any) => i.locationId === this.locationId);
            this.categoriesDropdown = pt
            return pt;
        }
    }

    getLocationName(id: string) {
        const pt = this.locations.find((i: any) => i.id === id);
        return pt ? `${pt.name}` : "";
    }
   

    setCategory(){
         if(this.categoryId){
            const pt = this.categoriesDropdown.filter((i: any) => i.locationId == this.locationId).flatMap((location:any) => location.categories.find((category:any) => category.id == this.categoryId));
            console.log({pt})
            this.$emit('setValue', 'category', pt[0], this.locationId);
            this.showDatalist = false;
            return pt
         }
          
    }



  async created() {
    await this.fetchLocationDropdowns();
    await this.fetchLocations();
    const slug = String(Math.random());
    this.id = `click-box-${slug}`;
  }
}
</script>
<style scoped>
.top-100 {
  top: 100%;
}
.bottom-100 {
  bottom: 100%;
}
.max-h-select {
  max-height: 300px;
}
::placeholder {
  font-size: 0.8em;
  font-weight: 400;
  font-style: italic;
  color: #667499;
}
</style>
