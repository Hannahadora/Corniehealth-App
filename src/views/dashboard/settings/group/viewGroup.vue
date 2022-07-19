<template>
  <div class="bg-white rounded p-5 mt-5">
    <span
      class="flex border-b-2 w-full font-semibold text-xl text-primary py-2 mx-auto"
    >
      View a Group
    </span>
    <div class="w-full h-screen">
      <form class="mt-5 w-full">
        <div class="border mb-37">
          <div class="w-full grid grid-cols-3 gap-5 p-5">
            <span>
              <label class="block uppercase mb-1 text-xs font-bold"
                >State</label
              >
              <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">
                {{ state }}
              </div>
            </span>
            <!--  <span>
                    <label class="block uppercase mb-1 text-xs font-bold">Status</label>
                    <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">{{ status }}</div>
                </span>-->
            <span>
              <label class="block uppercase mb-1 text-xs font-bold">Type</label>
              <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">
                {{ type }}
              </div>
            </span>
            <span>
              <label class="block uppercase mb-1 text-xs font-bold">Name</label>
              <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">
                {{ name }}
              </div>
            </span>
            <span>
              <label class="block uppercase mb-1 text-xs font-bold"
                >Managing Entity Type</label
              >
              <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">
                {{ managingEntityType }}
              </div>
            </span>
            <span>
              <label class="block uppercase mb-1 text-xs font-bold"
                > Code</label
              >
              <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">
                {{ code }}
              </div>
            </span>
          
          
            <!-- <span>
              <label class="block uppercase mb-1 text-xs font-bold"
                >Member Status</label
              >
              <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">
                {{ memberStatus }}
              </div>
            </span>
            <span>
              <label class="block uppercase mb-1 text-xs font-bold"
                >Member Entity</label
              >
              <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">
                {{ memberEntity }}
              </div>
            </span> -->
          </div>
        </div>
        <span class="flex justify-end w-full">
            <button
            @click="$router.push('/dashboard/provider/settings/group')"
            type="button"
            class="border border-primary rounded-md text-black mt-5 mr-3 py-2 px-8 focus:outline-none hover:bg-primary hover:text-white"
          >
            Close
          </button>
        
        </span>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AccordionComponent from "@/components/accordion-component.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import Textarea from "@/components/textarea.vue";
import PhoneInput from "@/components/phone-input.vue";
import IGroup from "@/types/IGroup";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";
import OrgSelect from "@/components/orgSelect.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import DEdit from "@/components/icons/dedit.vue";
import CDelete from "@/components/icons/cdelete.vue";
import CAdd from "@/components/icons/cadd.vue";
import AddIcon from "@/components/icons/add.vue";
import DatePicker from "@/components/daterangepicker.vue";
import Period from "@/types/IPeriod";

const group = namespace("group");
const dropdown = namespace("dropdown");

@Options({
  components: {
    CornieInput,
    CornieSelect,
    OrgSelect,
    ColumnFilter,
    Textarea,
    DEdit,
    CDelete,
    CAdd,
    AddIcon,
    PhoneInput,
    DatePicker,
    AccordionComponent,
  },
})
export default class AddGroup extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Boolean, default: "" })
  expand!: boolean;

  @group.Action
  getGroupById!: (id: string) => IGroup;

  @Prop({ type: Object, default: {} })
  selectedItem!: any;

  loading = false;

  state = "";
  status = "Active";
  type = "";
  name = "";
  code = null;
  quantity = "";
  managingEntity = "";
  characteristicsCode = "";
  valueCodeableConcept = "";
  valueBoolean = "";
  valueQuantity = "";
  valueRange = "";
  valueRef = "";
  exclude = "";
  period = {} as Period;
  memberPeriod = "";
  memberStatus = "";
  memberEntity = "";
  managingEntityType = "";
  managingOrganizationId = undefined;
  managingPractitionerId = undefined;
  actorsList = [] as any;

  aoption = "Active";
  options = [
    { text: "Active", value: true },
    { text: "Inactive", value: false },
  ];
  items = ["Active", "Inactive"];

  required = string().required();

  dropdowns = {} as IIndexableObject;
  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  @Watch("id")
  idChanged() {
    this.setGroup();
  }
  async setGroup() {
    const group = await this.getGroupById(this.id);
    if (!group) return;
    this.state = group.state;
    (this.status as any) = group.status;
    this.type = group.type;
    this.name = group.name;
    (this.code as any) = group.code;
    this.quantity = group.quantity;
    this.managingEntity = group.managingEntityName;
    this.actorsList = group.members;
    this.managingEntityType = group.managingEntityType;
    this.managingPractitionerId = group.managingPractitionerId;
    this.managingOrganizationId = group.managingOrganizationId;
  }



  async created() {
    this.setGroup();
    const data = await this.getDropdowns("groups");
    this.dropdowns = data;
  }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
</style>
