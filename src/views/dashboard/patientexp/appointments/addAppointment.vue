<template>
  <div class="w-full h-full">
    <span class="flex w-full font-bold text-lg text-primary py-2 mx-auto">
      Create Appointment
      <span class="text-danger text-xs mt-2 ml-2 font-normal"
        >(Items with asterisk are required for filling)</span
      >
    </span>
    <div>
      <div class="w-full h-screen">
        <form class="mt-5 w-full" @submit.prevent="submit">
          <div class="mb-44 pb-96">
            <accordion-component title="Appointment Details" v-model="opened">
              <template v-slot:default>
                <div class="w-full grid grid-cols-3 gap-5 mt-5">
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['state']"
                    v-model="state"
                 
                    label="service category"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['state']"
                    v-model="state"
                 
                    label="service type"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['state']"
                    v-model="state"
                 
                    label="specialty"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['state']"
                    v-model="state"
                 
                    label="APPOINTMENT TYPE"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    :rules="required"
                    :items="['state']"
                    v-model="state"
                 
                    label="REason code"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    :rules="required"
                    :items="['state']"
                    v-model="state"
                 
                    label="reason reference"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    :rules="required"
                    :items="['state']"
                    v-model="state"
                 
                    label="priority"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-input
                    label="description"
                    placeholder="--Enter--"
                    v-model="name"
                  />
                  <cornie-input
                    label="supporting information"
                    placeholder="--Enter--"
                    v-model="name"
                  />
                  <cornie-input
                    label="slot"
                    placeholder="choose slot"
                    v-model="code"
                  />
                  <date-picker
                    label="start date"
                    v-model="period"
                    :rules="required"
                  />
                  <date-picker
                    label="end date"
                    v-model="period"
                    :rules="required"
                  />
                  <cornie-input
                    label="duration (minutes)"
                    placeholder="--Enter--"
                    v-model="name"
                  />
                  <cornie-input
                    class="required"
                    label="comments"
                    placeholder="--Enter--"
                    v-model="name"
                  />
                  <cornie-input
                    class="required"
                    label="patient’s instruction"
                    placeholder="--Enter--"
                    v-model="name"
                  />
                </div>
              </template>
            </accordion-component>
            <accordion-component title="Add Participants" v-model="openedR">
              <template v-slot:default>
                <div class="p-5">
                  <span
                    class="
                      flex
                      border-b-2 border-dashed
                      w-full
                      text-sm text-primary
                      py-2
                      mx-auto
                      font-semibold
                      col-span-full
                      mb-2
                      mt-4
                    "
                  >
                    Practitioner
                  </span>
                  <div class="grid grid-cols-2 gap-2 col-span-full mt-4 p-5">
                    <div class="flex space-x-4">
                        <avatar class="mr-2" />
                     <!--   <avatar class="mr-2" v-else :src="img.placeholder" />-->
                        <div>
                            <p class="text-xs text-dark font-semibold">ghgh</p>
                            <p class="text-xs text-gray font-light">hjhh</p>
                      </div>
                    </div>
                    <div class="float-right">
                      <c-delete class="ml-20 cursor-pointer float-right" />
                      <d-edit class="cursor-pointer float-right" />
                    </div>
                  </div>
                </div>
                <div class="p-5">
                  <span
                    class="
                      flex
                      border-b-2 border-dashed
                      w-full
                      text-sm text-primary
                      py-2
                      mx-auto
                      font-semibold
                      col-span-full
                      mb-2
                    "
                  >
                    Device
                  </span>
                  <div class="grid grid-cols-2 gap-2 col-span-full p-5">
                    <div>
                      <p class="text-xs text-dark font-semibold">ghgh</p>
                      <p class="text-xs text-gray font-light">hjhh</p>
                    </div>
                    <div class="float-right">
                      <c-delete class="ml-20 cursor-pointer float-right" />
                      <d-edit class="cursor-pointer float-right" />
                    </div>
                  </div>
                </div>
                <div class="w-full grid grid-cols-3 gap-4 p-5">
                  <cornie-select
                   :onChange="setValue(participantitem)"
                    class="required"
                    :rules="required"
                    :items="items"
                    v-model="participantitem"
                    label="TYPE"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['state']"
                    v-model="state"
                    label="actor"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['state']"
                    v-model="state"
                    label="required"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <date-picker
                    label="period"
                    v-model="period"
                    :rules="required"
                  />
                  <cornie-select
                    class="required"
                    :rules="required"
                    :items="['state']"
                    v-model="state"
                 
                    label="consultation medium"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                </div>
              </template>
            </accordion-component>
            <span class="flex justify-end w-full">
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
                  pr-14
                  pl-14
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
                  pr-14
                  pl-14
                  focus:outline-none
                  hover:opacity-90
                "
              >
                Save
              </cornie-btn>
            </span>
          </div>
        </form>
            <practitioners-filter
                :columns="practitioners"
                v-model:preferred="preferredHeaders"
                v-model:visible="participantFilter"
            />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AccordionComponent from "@/components/accordion-extended-component.vue";
import CornieInput from "@/components/CornieInput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import Textarea from "@/components/textarea.vue";
import PhoneInput from "@/components/phone-input.vue";
//import IGroup , { GroupMembers } from "@/types/IGroup";
import IGroup from "@/types/IGroup";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";
import PractitionersFilter from "@/components/practitioner.vue";
import DEdit from "@/components/icons/aedit.vue";
import CDelete from "@/components/icons/adelete.vue";
import CAdd from "@/components/icons/cadd.vue";
import AddIcon from "@/components/icons/add.vue";
import DatePicker from "@/components/daterangepicker.vue";
import Avatar from "@/components/avatar.vue";

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
    PractitionersFilter,
    Textarea,
    DEdit,
    CDelete,
    Avatar,
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
  isVisible = "";
  rule = true;
  opened = true;
  openedR = true;
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


participantFilter = false;
  participantitem = "";
  practitioners: any [] = [];
  preferredHeaders = [];
 items = ['Patient','Practitioner','Practitioner Role','Device',];

  memberStatus = "";
  memberEntity = "";
  aoption = "Active";
  // groupmember = { ...emptyMember };
  // groupmembers: GroupMembers[] = [];
  options = [
    { text: "Active", value: true },
    { text: "Inactive", value: false },
  ];
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
    get selectedItem(){
        return this.participantitem
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
    if(value == 'Practitioner'){
        this.participantFilter = true;
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
      const response = await cornieClient().post("/api/v1/group", this.payload);
      if (response.success) {
        window.notify({ msg: "Group created", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Group not created", status: "error" });
      this.$router.push("/dashboard/provider/settings/group");
    }
  }

  async updateGroup() {
    const url = `/api/v1/group/${this.id}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Group updated", status: "success" });
        this.$router.push("/dashboard/provider/settings/group");
      }
    } catch (error) {
      window.notify({ msg: "Group not updated", status: "error" });
    }
  }
   async fetchPractitioners() {
        const AllPractitioners = cornieClient().get(
        "/api/v1/practitioner"
      );
      const response = await Promise.all([AllPractitioners]);
      this.practitioners = response[0].data;
        console.log(response);
    
    }
  async created() {
    this.setGroup();
     this.fetchPractitioners();
    const data = await this.getDropdowns("group");
    this.dropdowns = data;
  }
}
</script>
<style>
::placeholder {
  font-size: 0.8em;
  font-weight: 300;
  color: #667499;
  font-style: italic;
}
.outline-primary {
  border: 2px solid #080056;
}
.required label::after {
  content: "*";
  color: #fe4d3c;
  margin-left: 5px;
}
</style>
