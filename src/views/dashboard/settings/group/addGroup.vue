<template>
  <div class="bg-white rounded p-5 mt-5">
    <span
      class="
        flex
        border-b-2
        w-full
        font-semibold
        text-xl text-primary
        py-2
        mx-auto
      "
    >
      {{ allaction }} Group
    </span>
    <div class="w-full h-screen overflow-auto">
      <form class="mt-5 w-full" @submit.prevent="submit">
        <div class="border mb-44">
          <accordion-component title="Basic info" v-model="opened" :opened="true">
            <template v-slot:default>
              <div class="w-full grid grid-cols-3 gap-5 p-5">
                <cornie-input
                  label="Identifier"
                  placeholder="XXXX"
                  disabled
                />
                <cornie-select
                  :rules="required"
                  :items="['state']"
                  v-model="state"
                  label="State"
                  placeholder="--Select--"
                >                 
                </cornie-select>
               
                <cornie-select
                  :onChange="setValue(options.text)"
                  :items="items"
                  :rules="required"
                  v-model="status"
                  label="Status"
                  placeholder="--Select--"
                >
                </cornie-select>
                
                <!-- <cornie-select
                  :rules="required"
                  :items="['type']"
                  v-model="type"
                  label="Type"
                  placeholder="--Select--"
                >
                </cornie-select> -->
                 <fhir-input
                  reference="http://hl7.org/fhir/ValueSet/group-type"
                  class="w-full"
                  :rules="required"
                  v-model="state"
                  label="Type"
                  placeholder="--Select--"
                />
                <cornie-input
                  label="Name"
                  placeholder="--Enter--"
                  v-model="name"
                />
                <cornie-input
                  label="Code"
                  placeholder="--Enter--"
                  v-model="code"
                />
                <cornie-input
                  label="Quantity"
                  placeholder="--Enter--"
                  v-model="quantity"
                />
                <!-- <cornie-select
                  :rules="required"
                  :items="['quantity']"
                  v-model="quantity"
                  label="Quantity"
                  placeholder="--Select--"
                ></cornie-select> -->
                <cornie-select
                  :rules="required"
                  :items="['Organization', 'RelatedPerson', 'Practitioner', 'PractitionerRole']"
                  v-model="managingEntity"
                  label="Managing Entity"
                  placeholder="--Select--"
                ></cornie-select>
                <span
                  class="
                    flex
                    border-b-2
                    w-full
                    text-sm text-dark
                    py-2
                    mx-auto
                    font-semibold
                    col-span-full
                    mb-2
                    mt-4
                  "
                >
                  Charateristics
                </span>
                <cornie-input
                  label="Code"
                  placeholder="--Enter--"
                  v-model="characteristicsCode"
                />
              </div>
            </template>
          </accordion-component>
          <accordion-component title="Value" v-model="openedR">
            <template v-slot:default>
              <div class="w-full grid grid-cols-3 gap-5 p-5">
                <cornie-select
                  :rules="required"
                  :items="['value Boolean']"
                  v-model="valueBoolean"
                  label="Value Boolean"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-input
                  label="value codeable concept"
                  placeholder="--Enter--"
                  v-model="valueCodeableConcept"
                />
                <cornie-select
                  :rules="required"
                  :items="['Value Quantity']"
                  v-model="valueQuantity"
                  label="Value Quantity"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  :rules="required"
                  :items="['Value Range']"
                  v-model="valueRange"
                  label="Value Range"
                  placeholder="--Select--"
                >
                </cornie-select>

                <cornie-select
                  :rules="required"
                  :items="['exclude']"
                  v-model="exclude"
                  label="exclude"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-input
                  label="value reference"
                  placeholder="--Enter--"
                  v-model="valueRef"
                />

                <date-picker
                  label="Period"
                  v-model="period"
                  placeholder="--Enter--"
                  :rules="required"
                />
              </div>
            </template>
          </accordion-component>
          <accordion-component title="Member" v-model="openedT">
            <template v-slot:default>
            <div class="col-span-full mb-5">
             <!-- <div>
                <div class="grid grid-cols-7 gap-2 col-span-full mb-4" v-for="(input, index) in groupmembers" :key="`-${index}`">
                  <div>
                    <p class="text-xs text-dark font-semibold">{{ input.name }}</p>
                    <p class="text-xs text-gray font-light">{{ input.status }}</p>
                  </div>
                  <d-edit class="ml-20 cursor-pointer" @click="editGroupMember(input.groupId, index, groupmembers)"/>
                  <c-delete @click="removeGroupMember(index, groupmembers)" class="cursor-pointer"/>
                </div>
              </div>-->
            </div>
              <div class="w-full grid grid-cols-3 gap-5 p-5">
                <cornie-select
                  :rules="required"
                  :items="['Member Entity']"
                  v-model="memberEntity"
                  label="entity"
                  placeholder="--Select--"
                >
                </cornie-select>
                <single-date-picker
                  label="Member Period"
                  v-model="memberPeriod"
                  placeholder="--Enter--"
                  :rules="required"
                />
                <cornie-select
                  :rules="required"
                  :items="['Member Status']"
                  v-model="memberStatus"
                  label="Status"
                  placeholder="--Select--"
                >
                </cornie-select>
              </div>
              <!-- <span>
                  <div class="cursor-pointer text-danger mt-8 font-bold" @click="addGroupMember">Add</div>
               </span>-->
            </template>
          </accordion-component>
        </div>
        <span class="flex justify-end w-full pb-96">
          <button
            @click="$router.push('/dashboard/provider/settings/group')"
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
//import IGroup , { GroupMembers } from "@/types/IGroup";
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
import SingleDatePicker from "./datepicker.vue";
import Period from "@/types/IPeriod";

import FhirInput from "@/components/fhir-input.vue";


const group = namespace("group");
const dropdown = namespace("dropdown");

// const emptyMember: GroupMembers = {
//   name: "",
//   type: "",
// };

@Options({
  components: {
    CornieInput,
    CornieSelect,
    OrgSelect,
    ColumnFilter,
    SingleDatePicker,
    Textarea,
    DEdit,
    CDelete,
    CAdd,
    AddIcon,
    PhoneInput,
    DatePicker,
    AccordionComponent,


    FhirInput,
  },
})
export default class AddGroup extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  @group.Action
  getGroupById!: (id: string) => IGroup;
  loading = false;
  expand = false;
  isVisible = "";
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
  period = {} as Period;
  memberPeriod = "";
 // period: { start: "2011/12/15", end: "2017/12/19" };
 // memberPeriod: { start: "2011/12/15", end: "2017/12/19" };
  memberStatus = "";
  memberEntity = "";
  aoption = "Active";
  // groupmember = { ...emptyMember };
  // groupmembers: GroupMembers[] = [];
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
      state: this.state,
      status: this.status,
      type: this.type,
      name: this.name,
      code: this.code,
      quantity: this.quantity,
      managingEntity: this.managingEntity,
      characteristicsCode: this.characteristicsCode,
      valueCodeableConcept: this.valueCodeableConcept,
      valueBoolean: this.valueBoolean,
      valueQuantity: this.valueQuantity,
      valueRange: this.valueRange,
      valueRef: this.valueRef,
      exclude: this.exclude,
      period: this.period,
      memberPeriod: this.memberPeriod,
      memberStatus: this.memberStatus,
      memberEntity: this.memberEntity,
    };
  }
  get allaction() {
    return this.id ? "Edit" : "Add a";
  }

  //   async reset(){
  //     this.groupmember = {...emptyMember};
  //   }
  //  async addGroupMember() {
  //     this.groupmembers.push({ ...this.groupmember });
  //     window.notify({ msg: "Group Member added", status: "success" });
  //     this.reset();
  //   }
  // async editGroupMember(id: string, index: number, fieldType: object) {
  //   this.groupmember = this.groupmembers[index];
  // }
  // async removeGroupMember(id: string, index: number, fieldType: object) {
  //   this.groupmembers.splice(index, 1);
  //   window.notify({ msg: "Group Member deleted", status: "success" });
  // }
  async setValue(value: string) {
    if (value == "Active") {
      this.status = true;
    } else {
      this.status = false;
    }
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.updateGroup();
    else await this.createGroup();
    this.loading = false;
  }
  async createGroup() {
     this.payload.memberPeriod = new Date(this.payload.memberPeriod).toISOString()
    try {
      const response = await cornieClient().post("/api/v1/group", this.payload);
      if (response.success) {
        window.notify({ msg: "Group created", status: "success" });
        this.$router.push('/dashboard/provider/settings/group')
      }
    } catch (error) {
      window.notify({ msg: "Group not created", status: "error" });
      //this.$router.push('/dashboard/provider/settings/group')
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
.outline-primary {
  border: 2px solid #080056;
}
</style>
