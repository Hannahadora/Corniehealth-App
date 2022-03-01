<template>
  <cornie-dialog v-model="show" right class="w-3/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
         Add Services
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
            <div class="border-b-2 border-dashed border-gray-100 pb-5">
                <span>
                    <icon-input
                        class="border w-full border-gray-600 rounded-full focus:outline-none"
                        placeholder="Search Table"
                        v-model="query"
                    >
                        <template v-slot:prepend>
                        <search-icon />
                        </template>
                    </icon-input>
                </span>
            </div>
            <div class="w-full mb-10 mt-5 justify-center"  v-for="(item, index) in services" :key="index">
                <select-option @click="setService(item.id)" :label="item.name"/>
                <div class="float-right flex justify-end -mt-6">

                <span class="text-gray-400 text-xs">₦ {{ item?.cost?.toLocaleString() }}</span>
                </div>
            </div>
        </v-form>
    </cornie-card-text>
      
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2  mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="submit"
            class="text-white bg-danger px-2 rounded-xl"
           >
            Add
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
    </cornie-card>

  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { cornieClient } from "@/plugins/http";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CloseIcon from "@/components/icons/whitecancel.vue";
import { namespace } from "vuex-class";
import CornieSelect from "@/components/cornieselect.vue";
import Multiselect from "@vueform/multiselect";
import ILocation from "@/types/ILocation";
import SelectOption from "@/components/custom-checkbox.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import CircleIcon from "@/components/icons/circle.vue";
import ICatalogueService from "@/types/ICatalogue";
import search from "@/plugins/search";

const location = namespace("location");
const catalogue = namespace("catalogues");

type Sorter = (a: any, b: any) => number;

function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}
@Options({
  name: "ServicesModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CancelIcon,
    SelectOption,
    Multiselect,
    AccordionComponent,
    CornieDialog,
    CircleIcon,
    SearchIcon,
    IconInput,
    CornieBtn,
    CornieSelect,
    CloseIcon
  },
})
export default class ServicesModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  name!: string;

  @Prop({ type: String, default: "" })
  directorId!: string;

 @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  


 @catalogue.State
  services!: ICatalogueService[];

  @catalogue.Action
  getServices!: () => Promise<void>;

  loading = false;
  specialarray = [] as any;
  special = '';
  accounts = [];
  query = "";
  orderBy: Sorter = () => 1;

  remove = [];
  add = [] as any;


   async submit() {
    this.loading = true;
    if(this.id) await this.saveService();
    else await this.save();
    this.loading = false;
  }

   get spaciallItems() {
    return {
      text: this.special,
    };
  }
  setService(value:string){
    this.add.push(value);
  }
   removearray(index: number) {
    this.accounts.splice(index, 1);
  }

   get filteredItems() {
    return this.services
      .filter((item: any) => this.filter(item, this.query))
      .sort(this.orderBy);
  }


  get payload() {
    return {
      remove: this.remove,
      add: this.add,
      
    };
  }
   get payload2() {
    return this.remove, this.add;
      
  }

  get newaction() {
    return this.id ? "Update" : "Add";
  }


 
 
  async saveService() {
      try {
      const response = await cornieClient().patch(
        `/api/v1/practitioner/services/${this.id}`,
        this.payload
      );
      if(response.success){
          this.done();
        window.notify({ msg: "Services added successfully", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Services not added", status: "error" });
    }
  }
  async save() {
    this.$emit("add-services", this.payload2);
    this.show = false;
  }
  

  done() {
    this.$emit("director-added");
    this.show = false;
  }


  async created() {
    await this.getServices();
  }
}
</script>

