<template>
<div class="bg-white rounded p-5 mt-5 max-h-96 overflow-y-auto">
<span class="flex border-b-2 w-full font-semibold text-xl text-primary py-2 mx-auto">
    Blank Form
</span>
  <div class="flex w-full justify-between mt-5 items-center">
      <span class="flex justify-end w-full">
        <button type="button" class="flex outline-primary rounded-full text-black mt-5 mr-3 py-2 pr-5 pl-5 px-3 focus:outline-none hover:bg-primary hover:text-white">
            <plus-icon class="mt-1 mr-2" />  Add Question
        </button>
        <button class="bg-danger rounded-full text-white mt-5 py-1 pr-8 pl-8 px-2 focus:outline-none hover:opacity-90" @click="$router.push('/dashboard/provider/add-group')">
            Save Form
        </button>

      
    </span>
      <span class="flex justify-between items-center">
        <print-icon class="mr-7" />
        <table-refresh-icon class="mr-7" />
        <filter-icon class="cursor-pointer" @click="showColumnFilter = true" />
      </span>
    </div>
  <div class="w-full h-screen">
    <form class="mt-5 w-full" @submit.prevent="submit">
        <div class="w-full order-first mt-5 hover:max-h-40 overflow-y-auto">
            <cornie-input  placeholder="FORM TITLE: Blank Form" class="w-full mb-6 text-black" v-model="valueCodeableConcept"/>
            <cornie-input  placeholder="DESCRIPTION: Kindly tell us about your medical history!" class="w-full mb-6 text-black" v-model="valueCodeableConcept"/>
           <div class="grid  grid-cols-1 grid-flow-col gap-4">
                <div>
                    <div  class="h-11 w-full flex items-center justify-between px-3 border-2 border-0 rounded-t-xl bg-primary border-primary">
                        <div class="font-semibold text-white">
                        Others
                        </div>
                        <span class="flex items-center">
                        <p class="text-white">Export to Habits</p>
                        <span class="mr-3 cursor-pointer" :class="{ 'fill-current text-white': expand }">
                            <slot name="misc" />
                        </span>
                        <info-icon  class="cursor-pointer fill-current text-white">
                        </info-icon>
                        </span>
                    </div>
                    <div class="border-2 border-gray-200">
                            <div class="w-full grid grid-cols-2 gap-4 p-5">
                                <cornie-input  label="Question"  placeholder="--Type question here--" class="mb-6 text-black col-span-2" v-model="valueCodeableConcept"/>
                                <cornie-select :rules="required" :items="['Paragraph','Radio','Select']" v-model="memberStatus" label="Answer Type" placeholder="Paragraph">
                                </cornie-select>
                                <cornie-input  label="Answer"  placeholder="--Placeholder--" class="mb-6 text-black col-span-2" v-model="valueCodeableConcept"/>
                                 <div>
                                    <cornie-radio  label="Paragraph"  placeholder="--Placeholder--" class="mb-6 text-black col-span-2" v-model="valueCodeableConcept"/>
                                    <cornie-radio  label="Radio"  placeholder="--Placeholder--" class="mb-6 text-black col-span-2" v-model="valueCodeableConcept"/>
                                    <cornie-radio  label="Select"  placeholder="--Placeholder--" class="mb-6 text-black col-span-2" v-model="valueCodeableConcept"/>
                                </div>
                                <div class="flex flex-col">
                                    <label class="inline-flex items-center mt-3">
                                        <input type="checkbox" class="form-checkbox h-5 w-5" checked><span class="ml-2 text-gray-700">Paragraph</span>
                                    </label>
                                    <label class="inline-flex items-center mt-3">
                                        <input type="checkbox" class="form-checkbox h-5 w-5"><span class="ml-2 text-gray-700">Radio</span>
                                    </label>
                                    <label class="inline-flex items-center mt-3">
                                        <input type="checkbox" class="form-checkbox h-5 w-5"><span class="ml-2 text-gray-700">Select</span>
                                    </label>
                                    
                                </div>
                            <span class="cursor-pointer text-danger mt-5 mr-2 font-bold float-right">Delete</span>
                            </div>
                       
                    </div>
                </div>
                <move-icon class="cursor-pointer mt-3"/>
           </div>
        </div>
    </form>
  </div>
</div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AccordionComponent from "@/components/accordion-component.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieCheckbox from "@/components/custom-checkbox.vue";
import CornieSelect from "@/components/cornieselect.vue";
import Textarea from "@/components/textarea.vue";
import PhoneInput from "@/components/phone-input.vue";
import IGroup from "@/types/IGroup";
import InfoIcon from "@/components/icons/info.vue";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";
import OrgSelect from "@/components/orgSelect.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import DEdit from "@/components/icons/dedit.vue";
import CDelete from "@/components/icons/cdelete.vue";
import PlusIcon from "@/components/icons/plus.vue";
import CAdd from "@/components/icons/cadd.vue";
import AddIcon from "@/components/icons/add.vue";
import MoveIcon from "@/components/icons/move.vue";
import DatePicker from "@/components/single-datepicker.vue";

const group = namespace("group");
const dropdown = namespace("dropdown");


@Options({
  components: {
    InfoIcon,
    CornieRadio,
    CornieCheckbox,
    MoveIcon,
    CornieInput,
    CornieSelect,
    PlusIcon,
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

  
  @group.Action
  getGroupById!: (id: string) => IGroup;

  loading = false;
  expand = false;
  isVisible = '';
opened = true;
openedR = false;
openedT = false;


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

  get allaction() {
    return this.id ? "Edit" : "Add a";
  }
 

//   async reset(){
//     this.participant = {...emptyParticipant};
//   }
    async setValue(value:string){
        if(value == 'Active'){
          this.status = true
        }else{
          this.status = false
        }
    }
   
   async submit() {
    this.loading = true;
    if (this.id) await this.updateGroup();
    else await this.createGroup();
    this.loading = false;
  }

  async createGroup() {
    // this.payload.period.start = new Date(this.payload.period.start).toISOString()
 this.payload.period = new Date(this.payload.period).toISOString();
    try {
      const response = await cornieClient().post(
        "/api/v1/group",
        this.payload
      );
      if (response.success) {
          window.notify({ msg: "Group created", status: "success" });
          this.$router.push('/dashboard/provider/settings/group')
      }
    } catch (error) {
      window.notify({ msg: "Group not created", status: "error" });
      this.$router.push('/dashboard/provider/settings/group')
    }
  }
 

  async updateGroup() {
    const url = `/api/v1/group/${this.id}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Group updated", status: "success" });
        this.$router.push('/dashboard/provider/settings/group')
      }
    } catch (error) {
       window.notify({ msg: "Group not updated", status: "error" });
       this.$router.push('/dashboard/provider/settings/group')
    }
  }


  async created() {
    this.setGroup();
     const data = await this.getDropdowns("group");
    this.dropdowns = data;
    console.log("data");
    console.log(data);
  }

}
</script>
<style>
.outline-primary{
    border: 2px solid #211F45;
}
</style>