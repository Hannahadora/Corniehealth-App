<template>
  <cornie-dialog v-model="show" center class="w-3/12 h-3/12">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Share Bill
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
            <span class="text-xs mb-4">
                You are only authorized to access patients data for the purpose of providing care. 
           </span>    
           <span  class="text-xs mb-4">
               Please note that this activity is monitored and logged for data security purposes
           </span>
       
        </v-form>
      </cornie-card-text>
      
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
             @click="show = false"
            class="text-white bg-danger px-2 rounded-xl"
           >
            Proceed
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  <new-practitioner v-model="showPractitionerModal"  :specilatyId="specilatyId"/>

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
import Multiselect from "@vueform/multiselect";
import CornieSelect from "@/components/cornieselect.vue";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import Avatar from "@/components/avatar.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import ISpecial from "@/types/ISpecial";
import SelectOption from "@/components/custom-checkbox.vue";
import search from "@/plugins/search";
import TextArea from "@/components/textarea.vue";
import CornieInput from "@/components/cornieinput.vue";

const practitioner = namespace("practitioner");
const special = namespace("special");

type Sorter = (a: any, b: any) => number;


function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "managePractitioner",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    Multiselect,
    CancelIcon,
    CornieDialog,
    Avatar,
    SelectOption,
    SearchIcon,
    TextArea,
    DeleteIcon,
     CornieInput,
    IconInput,
    CornieBtn,
    CornieSelect,
    CloseIcon
  },
})
export default class managePractitioner extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  specilatyId!: string;


  loading = false;
  showPractitionerModal = false;
  aPractitioner = [];
  query = "";
 orderBy: Sorter = () => 1;


 @practitioner.State
  practitioners!: IPractitioner[];


  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

 get filteredItems() {
    return this.practitioners
      .filter((item: any) => this.filter(item, this.query))
      .sort(this.orderBy);
  }

  async created() {
    await this.fetchPractitioners();
  }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.dflex {
  display: -webkit-box;
}
</style>
