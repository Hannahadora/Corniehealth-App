<template>
<div class="bg-white rounded p-5 mt-5">
<span class="flex border-b-2 w-full font-semibold text-xl text-primary py-2 mx-auto">
   View a Group
</span>
  <div class="w-full h-screen">
    <form class="mt-5 w-full" @submit.prevent="submit">
        <div class="border mb-37">
            <div class="w-full grid grid-cols-3 gap-5 p-5">

                <span>
                    <label class="block uppercase mb-1 text-xs font-bold">State</label>
                    <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">{{ state }}</div>
                </span>
              <!--  <span>
                    <label class="block uppercase mb-1 text-xs font-bold">Status</label>
                    <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">{{ status }}</div>
                </span>-->
                <span>
                    <label class="block uppercase mb-1 text-xs font-bold">Type</label>
                    <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">{{ type }}</div>
                </span>
                <span>
                    <label class="block uppercase mb-1 text-xs font-bold">Name</label>
                    <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">{{ name }}</div>
                </span>
                <span>
                    <label class="block uppercase mb-1 text-xs font-bold">Managing Entity</label>
                    <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">{{ managingEntity }}</div>
                </span>
                <span>
                    <label class="block uppercase mb-1 text-xs font-bold">Characteristics Code</label>
                    <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">{{ characteristicsCode }}</div>
                </span>
                <span>
                    <label class="block uppercase mb-1 text-xs font-bold">Value Codeable Concept</label>
                    <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">{{ valueCodeableConcept }}</div>
                </span>
                <span>
                    <label class="block uppercase mb-1 text-xs font-bold">Value Boolean</label>
                    <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">{{ valueBoolean }}</div>
                </span>
                <span>
                    <label class="block uppercase mb-1 text-xs font-bold">Value Quantity</label>
                    <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">{{ valueQuantity }}</div>
                </span>
                <span>
                    <label class="block uppercase mb-1 text-xs font-bold">Value Range</label>
                    <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">{{ valueRange }}</div>
                </span>
                <span>
                    <label class="block uppercase mb-1 text-xs font-bold">Value Reference</label>
                    <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">{{ valueRef }}</div>
                </span>
                <span>
                    <label class="block uppercase mb-1 text-xs font-bold">Exclude</label>
                    <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">{{ exclude }}</div>
                </span>
                <span>
                    <label class="block uppercase mb-1 text-xs font-bold">Period</label>
                    <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">{{ period }}</div>
                </span>
                <span>
                    <label class="block uppercase mb-1 text-xs font-bold">Member Period</label>
                    <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">{{ memberPeriod }}</div>
                </span>
                <span>
                    <label class="block uppercase mb-1 text-xs font-bold">Member Status</label>
                    <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">{{ memberStatus }}</div>
                </span>
                <span>
                    <label class="block uppercase mb-1 text-xs font-bold">Member Entity</label>
                    <div class="bg-gray-100 py-3 px-2 mt-5 rounded-md font-bold">{{ memberEntity }}</div>
                </span>
                
            </div>
        </div>
        <span class="flex justify-end w-full">
        <cornie-btn
        @click="$router.push('/dashboard/provider/settings/group')"
        type="button"
        class="
            bg-danger
            rounded-full
            text-white
            mt-5   
            px-4
            py-2
            pr-10
            pl-10
            focus:outline-none
            hover:opacity-90
            "
        >
            Close
        </cornie-btn>

        
        </span>
    </form>
  </div>
</div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AccordionComponent from "@/components/accordion-component.vue";
import CornieInput from "@/components/CornieInput.vue";
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

  loading = false;



  state = "";
  status = false;
  type = "";
  name = "";
  code = "";
  quantity = "";
  managingEntity = "";
  characteristicsCode = "";
  valueCodeableConcept = "";
  valueBoolean = "";
  valueQuantity = "";
  valueRange = "";
  valueRef = "";
  exclude = "";
  period = "";
  memberPeriod = "";
  memberStatus = "";
  memberEntity = "";

  aoption = "Active";
options = [
  {text: 'Active' , value: true},
  {text: 'Inactive' , value: false},
];
items = ['Active', 'Inactive'];

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
    this.status = group.status;
    this.type = group.type;
    this.name = group.name;
    this.code = group.code;
    this.quantity = group.quantity;
    this.managingEntity = group.managingEntity;
    this.characteristicsCode = group.characteristicsCode;
    this.valueCodeableConcept = group.valueCodeableConcept;
    this.valueBoolean = group.valueBoolean;
    this.valueQuantity = group.valueQuantity;
    this.valueRange = group.valueRange;
    this.valueRef = group.valueRef;
    this.exclude = group.exclude;
    this.period = group.period;
    this.memberPeriod = group.memberPeriod;
    this.memberStatus = group.memberStatus;
    this.memberEntity = group.memberEntity;

 }
   get payload() {
    return {
        state:  this.state,
        status:  this.status,
        type: this.type,
        name:  this.name ,
        code:  this.code ,
        quantity:  this.quantity ,
        managingEntity:  this.managingEntity ,
        characteristicsCode:  this.characteristicsCode ,
        valueCodeableConcept:  this.valueCodeableConcept ,
        valueBoolean:  this.valueBoolean ,
        valueQuantity:  this.valueQuantity ,
        valueRange:  this.valueRange ,
        valueRef:  this.valueRef ,
        exclude:  this.exclude ,
        period:  this.period ,
        memberPeriod:  this.memberPeriod ,
        memberStatus:  this.memberStatus ,
        memberEntity:  this.memberEntity ,
    }
   }

    async setValue(value:string){
        if(value == 'Active'){
          this.status = true
        }else{
          this.status = false
        }
    }
   
  
  async created() {
    this.setGroup();
     const data = await this.getDropdowns("groups");
    this.dropdowns = data;
  }

}
</script>
<style>
.outline-primary{
    border: 2px solid #080056;
}
</style>