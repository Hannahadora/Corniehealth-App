<template>
    <div class="w-full bg-white shadow">
        <tabs :items="tabLinks" v-model="currentTab" class="p-3"> 
            <in-app/>
            <email-module/>
      </tabs>
    </div>
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

@Options({
  components: {
    CornieTable,
    CornieSelect,
    Tabs,
    CornieInput,
    SortIcon,
    SelectOption,
    // AddFunction,
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
export default class NotificationTemplate extends Vue {


   @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: '' })
  id!: string

 tabLinks = ["InApp", "Email Notification"];
  currentTab = 0;



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