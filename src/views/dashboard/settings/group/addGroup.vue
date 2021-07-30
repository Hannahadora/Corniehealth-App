<template>
<div class="bg-white rounded p-5 mt-5">
<span class="flex border-b-2 w-full font-semibold text-xl text-primary py-2 mx-auto">
    {{ allaction }} Group
</span>
  <div class="w-full h-screen">
    <v-form class="mt-5 w-full" @submit.prevent="submit">
        <div class="border mb-56">
            <accordion-component title="Basic info" opened>
                <template v-slot:default>
                    <div class="w-full grid grid-cols-3 gap-5 p-5">
                      <cornie-input label="Identifier"  placeholder="XXXX" class="bg-gray-200" disabled/>
                      <cornie-select
                      :rules="required"
                      :items="['Active', 'Inactive']"
                      v-model="state"
                      label="State"
                      placeholder="--Select--"
                      >
                      </cornie-select>
                      <cornie-select
                      :onChange = "setValue(options.text)"
                      :items="items"
                      :rules="required"
                      v-model="status"
                      label="Status"
                      placeholder="--Select--"
                      >
                      </cornie-select>
                      <cornie-select
                          :rules="required"
                          :items="['Active', 'Inactive']"
                          v-model="type"
                          label="Type"
                          placeholder="--Select--"
                          >
                      </cornie-select>
                      <cornie-input label="Name"  placeholder="--Enter--" v-model="name"/>
                      <cornie-input label="Code"  placeholder="--Enter--" v-model="code"/>
                          <cornie-select
                          :rules="required"
                          :items="['Active', 'Inactive']"
                          v-model="quantity"
                          label="Quantity"
                          placeholder="--Select--"
                          ></cornie-select>
                          <cornie-select
                          :rules="required"
                          :items="['Active', 'Inactive']"
                          v-model="managingEntity"
                          label="Managing Entity"
                          placeholder="--Select--"
                          ></cornie-select>
                          <span class="flex border-b-2 w-full text-sm text-dark py-2 mx-auto font-semibold col-span-full mb-2 mt-4">
                              Charateristics
                          </span>
                          <cornie-input label="Code"  placeholder="--Enter--" v-model="characteristicsCode"/>
                    </div>
                </template>        
            </accordion-component>
            <accordion-component  title="Value">
                <template>
                    <div class="w-full grid grid-cols-3 gap-5 p-5">
                        <cornie-select
                        :rules="required"
                        :items="['Active', 'Inactive']"
                        v-model="memberEntity"
                        label="entity"
                        placeholder="--Select--"
                        >
                        </cornie-select>
                            <date-picker
                            label="Period"
                            v-model="memberPeriod"
                            placeholder="--Enter--" :rules="required"
                            />
                        <cornie-select
                        :rules="required"
                        :items="['Active', 'Inactive']"
                        v-model="memberStatus"
                        label="Status"
                        placeholder="--Select--"
                        >
                        </cornie-select>
                    </div>
                </template>
            </accordion-component>
            <accordion-component title="Member">
                <template>
                    <div class="w-full grid grid-cols-3 gap-5 p-5">
                        <cornie-select
                        :rules="required"
                        :items="['Active', 'Inactive']"
                        v-model="memberEntity"
                        label="entity"
                        placeholder="--Select--"
                        >
                        </cornie-select>
                            <date-picker
                            label="Period"
                            v-model="memberPeriod"
                            placeholder="--Enter--" :rules="required"
                            />
                        <cornie-select
                        :rules="required"
                        :items="['Active', 'Inactive']"
                        v-model="memberStatus"
                        label="Status"
                        placeholder="--Select--"
                        >
                        </cornie-select>
                    </div>
                </template>
            </accordion-component>
        </div>
        <span class="flex justify-end w-full">
        <button
        @click="$router.push('group')"
        type="button"
        class="
            outline-primary
            rounded-full
            text-black
            mt-5
            mr-3
            py-2
            pr-8
            pl-8
            px-3
            focus:outline-none
            hover:bg-primary
            hover:text-white

            "
        >
            Cancel
        </button>

        <cornie-btn
        :loading="loading"
        type="submit"
            class="
            bg-danger
            rounded-full
            text-white
            mt-5
            
            pr-10
            pl-10
            focus:outline-none
            hover:opacity-90
            "
        >
            Save
        </cornie-btn>
        
        </span>
    </v-form>
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
import DatePicker from "@/components/single-datepicker.vue";

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

  
  @group.Action
  getGroupById!: (id: string) => IGroup;

  loading = false;
  expand = false;
  isVisible = '';
opened = true;


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
expandAcc = true;
expandAcca = false;
expandAccb = false;

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
      }
    } catch (error) {
      window.notify({ msg: "Group not created", status: "error" });
    }
  }
 

  async updateGroup() {
    const url = `/api/v1/group/${this.id}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Group updated", status: "success" });
      }
    } catch (error) {
       window.notify({ msg: "Group not updated", status: "error" });
    }
  }


  async created() {
    this.setGroup();
     const data = await this.getDropdowns("groups");
    this.dropdowns = data;
    console.log(data);
  }

}
</script>
<style>
.outline-primary{
    border: 2px solid #0A4269;
}
</style>