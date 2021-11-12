<template>
 <accordion-component class="shadow-none rounded-none border-none  text-primary" title="Practice Information" expand="true" v-model="opened" :opened="false">
        
             
       <div class="grid grid-cols-3 mt-3 pb-3">
          <cornie-input
            label="Email"
            class=""
            placeholder="--Enter--"
          />
          <phone-input
            class="w-full mt-1 bold"
            label="Contact Number"
            v-model:code="DialCode"
            v-model="PhoneNumber"
            :rules="requiredRule"
          />
           <cornie-input
            label="Address"
            class=""
            placeholder="--Enter--"
          />
        </div>
        <div>
            <label for="ecounter" class="flex uppercase mb-1 text-black text-xs font-bold">Site Message</label>
                <div class="my-2  w-full">
                      <Textarea
                          class="w-full text-xs"    
                                placeholder="Text Area"
                                :rules="required"
                              />
                          </div>
                      </div>         
           <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="apply"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>  
        </accordion-component>
  <accordion-component class="shadow-none rounded-none border-none  text-primary" title="Practice Hours" expand="true" v-model="opened" :opened="false">         
           <div class="grid grid-cols-1 mt-4 gap-y-6 w-full">
    <label class="flex items-center">
      <input type="checkbox" class="mr-3" v-model="all" />
      All days
    </label>
    <div class="day-grid grid w-full">
      <span class="font-bold block"></span>
      <span class="font-bold uppercase text-sm">
        <span>Start Time</span>
        <span class="ml-14">End Time</span>
      </span>
    </div>
    <div class="grid day-grid w-full" v-for="(opHour, i) in opHours" :key="i">
      <label class="flex items-center">
        <input
          @change="changed"
          v-model="opHour.selected"
          type="checkbox"
          class="mr-3"
        />
        {{ opHour.day }}:
      </label>

      <div class="flex items-center">
        <span class="flex">
          <cornie-select
            @update:modelValue="changed"
            v-model="opHour.openTime"
            :items="wholeDay"
            class="w-24 mr-1"
          />
        </span>
        <span class="mr-3">to</span>
        <span class="flex">
          <cornie-select
            @update:modelValue="changed"
            v-model="opHour.closeTime"
            :items="wholeDay"
            class="w-24 mr-1"
          />
        </span>
      </div>
    </div>
  </div>
           <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="apply"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>  
        </accordion-component>
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
import TableOptions from "@/components/table-options.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import Textarea from "@/components/textarea.vue";
import PhoneInput from "@/components/phone-input.vue";
import PlusIcon from "@/components/icons/add.vue";
import IFunction from "@/types/IFunction";
import { Prop } from "vue-property-decorator";
import AddFunction from "./add-function.vue";
import {  Watch } from "vue-property-decorator";
import { HoursOfOperation } from "@/types/ILocation";
import { Field } from "vee-validate";

import DeleteIcon from "@/components/icons/delete.vue";
import EditIcon from "@/components/icons/edit.vue";

const orgFunctions = namespace("OrgFunctions");
const opHours = [
  {
    selected: true,
    day: "Monday",
    openTime: "08:00",
    closeTime: "16:00",
  },
  {
    selected: true,
    day: "Tuesday",
    openTime: "08:00",
    closeTime: "16:00",
  },
  {
    selected: true,
    day: "Wednesday",
    openTime: "08:00",
    closeTime: "16:00",
  },
  {
    selected: true,
    day: "Thursday",
    openTime: "08:00",
    closeTime: "16:00",
  },
  {
    selected: true,
    day: "Friday",
    openTime: "08:00",
    closeTime: "16:00",
  },
  {
    selected: true,
    day: "Saturday",
    openTime: "08:00",
    closeTime: "16:00",
  },
  {
    selected: true,
    day: "Sunday",
    openTime: "08:00",
    closeTime: "16:00",
  },
];

const pad = (x: number) => {
  if (x < 10) return `0${x}00`;
  return `${x}000`;
};
const splitTime = (time: string) => {
  const hour = time.slice(0, 2);
  const minutes = time.slice(2, 4);
  return `${hour}:${minutes}`;
};

const workHours = Array.from(Array(24), (_, x) => splitTime(pad(x)));
@Options({
  components: {
    CornieTable,
    CornieSelect,
    CornieInput,
    SortIcon,
    AddFunction,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    CornieBtn,
    TableRefreshIcon,
    FilterIcon,
    PlusIcon,
    PhoneInput,
    IconInput,
    DeleteIcon,
    EditIcon,
    ColumnFilter,
    TableOptions,
    AccordionComponent,
    Textarea,
    Field
  },
})
export default class CarePartnersExistingState extends Vue {
  @Prop({ type: Array, default: [], required: true })
  functions!: IFunction[];

 @Prop({ type: Array, default: opHours })
  modelValue!: HoursOfOperation[];
 @Watch("all")
  opHours = opHours;

  all = true;
  functionToEdit = {} as IFunction;
  editingFunction = false;

  @orgFunctions.Action
  removeFunction!: (id: string) => Promise<void>;
  expand=false;
  opened=true;
  rawHeaders = [
    {
      title: "ROOM NAME",
      key: "name",
      show: true,
    },
    {
      title: "ROOM NUMBER",
      key: "hierarchy",
      show: true,
    },
    {
      title: "LOCATION",
      key: "supervisor",
      show: true,
    },
    {
      title: "CUSTODIAN",
      key: "supervisor",
      show: true,
    },
    {
      title: "STATUS",
      key: "supervisor",
      show: true,
    },
  ];

  get items() {
    return this.functions.map((f) => ({
      ...f,
      hierarchy: f.hierarchy || "N/A",
      supervisor: f.reportsTo?.name || "N/A",
    }));
  }

  async remove(id: string) {
    await this.removeFunction(id);
  }
  get operationHours() {
    return this.modelValue;
  }
  set operationHours(val: HoursOfOperation[]) {
    this.$emit("update:modelValue", val);
  }

  changed() {
    this.operationHours = this.operationHours;
  }
  
  allWeek(all: boolean) {
    if (!all) return;
    const opHours = [...this.operationHours].map((opHour) => ({
      ...opHour,
      selected: true,
    }));
    this.operationHours = opHours;
  }

  wholeDay = workHours;
  editFunction(id: string) {
    const func = this.functions.find((f) => f.id == id);
    if (!func) return;
    this.functionToEdit = func;
    this.editingFunction = true;
  }

  created() {
    if (!this.modelValue || this.modelValue.length < 1)
      this.operationHours = opHours;
  }
}
</script>

<style scoped>
.day-grid {
  grid-template-columns: 20% 75%;
}
</style>
