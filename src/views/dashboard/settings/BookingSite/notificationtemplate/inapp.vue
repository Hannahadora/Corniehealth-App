<template>
    <div class="w-full">
        <div class="grid grid-cols-2 gap-4">
            <div class="p-5 mt-8">
                <div class="flex justify-between p-1 -mb-4">
                    <newview-icon class="text-primary-500 fill-current" />
                    <div class="flex justify-between text-xs" >
                    <refer-icon class="mr-2"/> Reset      
                    <edit-icon class="text-primary fill-current ml-5 -mt-1 pt-1 mr-2" /> Edit
                    </div>
                </div>
                <div class="my-4 bg-blue-50 border border-gray-300 px-4 py-4 rounded-md" >
                    <div>
                       <p class="text-black text-xs mb-3">Dear <span class="text-gray-500 ">(Patient)</span> , </p> 
                         <p class="text-black text-xs mb-5"> You have an appointment with <span class="text-gray-500"> (Dr. physicians name)</span> at <span class="text-gray-500">  (Practice name)</span> on <span class="text-gray-500">(Day)</span>,  <span class="text-gray-500">(Date & Time)</span>. </p>

                           <p class="text-black text-xs">Kindly confirm availability.</p> 
                    </div>
                    <div class="mt-3 mb-4 flex justify-end">
                    <button
                    @click="showBack"
                    class="
                        text-black
                        ml-2
                        px-5
                        mx-3
                        font-semibold
                        text-sm
                    "
                    >
                    Cancel
                    </button>
                    <button
                    @click="showAlert"
                    class="
                        bg-primary
                        rounded-full
                        text-white
                        py-2
                        px-5
                        text-sm
                        font-semibold
                        focus:outline-none
                        hover:opacity-90
                    "
                    >
                    Confirm
                    </button>
                </div>
                </div>
                <div class="mt-12 flex justify-end">
                    <button
                    class="
                        bg-danger
                        rounded-full
                        text-white
                        py-2 text-sm
                        px-8
                        focus:outline-none
                        hover:opacity-90
                    "
                    >
                    <!-- <img src="@/assets/img/plus.svg" class="inline-block mr-2" /> -->
                    Save
                    </button>
                </div>
            </div>
        </div>


    </div>
    <new-back-modal v-model="showBackModal"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import TableOptions from "@/components/table-options.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import Textarea from "@/components/textarea.vue";
import PhoneInput from "@/components/phone-input.vue";
import PlusIcon from "@/components/icons/add.vue";
import StarIcon from "@/components/icons/stars.vue";
import ShareIcon from "@/components/icons/sharewhite.vue";
import ViewIcon from "@/components/icons/eyegreen.vue";
import SelectOption from "@/components/custom-checkbox.vue";
import { Prop } from "vue-property-decorator";
import InApp from "./inapp.vue";
import EmailModule from "./email.vue"
// import AddFunction from "./add-function.vue";
import {  Watch, PropSync } from "vue-property-decorator";
import { HoursOfOperation } from "@/types/ILocation";
import { Field } from "vee-validate";
import Avatar from "@/components/avatar.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EditIcon from "@/components/icons/aedit.vue";
import Tabs from "././../tabs.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import ReferIcon from "@/components/icons/newreset.vue";
import NewBackModal from "./backModal.vue"

@Options({
  components: {
    CornieTable,
    CornieSelect,
    NewviewIcon,
    ReferIcon,
    Tabs,
    CornieInput,
    SortIcon,
    SelectOption,
    // AddFunction,
    NewBackModal,
    InApp,
    Avatar,
    EmailModule,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    CornieBtn,
    TableRefreshIcon,
    ShareIcon,
    FilterIcon,
    PlusIcon,
    StarIcon,
    PhoneInput,
    IconInput,
    DeleteIcon,
    EditIcon,
    ColumnFilter,
    TableOptions,
    AccordionComponent,
    Textarea,
    ViewIcon,
    Field
  },
})
export default class Inapp extends Vue {

   @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: '' })
  id!: string

 showBackModal= false;
 
showAlert(){
    window.notify({ msg: "Appointment Successfully Confirmed", status: "success" });
}
showBack(){
  this.showBackModal = true;
}

  created() {
   
  }
}
</script>

<style scoped>
.day-grid {
  grid-template-columns: 20% 75%;
}

.small-font{
  font-size: 10px;
  color: #14171F;
}

.message-font{
  color: red;
  font-size: 6px;
  margin-left:6px;
}
</style>