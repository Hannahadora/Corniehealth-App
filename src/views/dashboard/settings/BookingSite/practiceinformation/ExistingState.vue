<template>
  <accordion-component
    class="shadow-none rounded-none border-none text-primary"
    title="Practice Information"
    expand="true"
    v-model="opened"
    :opened="true"
  >
    <div>
      <div class="flex space-x-4 w-full justify-between mt-3">
        <p class="text-sm mt-3 text-black">
          The information contained below will appear in the CornieHealth
          booking site, if you have embedded the link. This information does not
          affect <br />
          other related data in your practice settings
        </p>
        <div
          class="flex space-x-4 text-primary font-semibold text-sm mt-3 cursor-pointer"
          v-if="showEdit"
        >
          <edit-icon class="fill-current text-primary mr-4" /> Edit
        </div>
        <div
          v-else
          class="flex space-x-4 text-danger font-semibold text-sm mt-3 cursor-pointer"
          @click="showEditSection"
        >
          <edit-icon class="fill-current text-danger mr-4" /> Edit
        </div>
      </div>
    </div>
    <div
      class="grid grid-cols-3 w-full justify-between gap-4 mt-5"
      v-if="showEdit"
    >
      <cornie-input label="Email" placeholder="--Enter--" class="w-full mb-4" />
      <cornie-input
        label="Address"
        placeholder="--Enter--"
        class="w-full mb-4"
      />
      <cornie-input
        label="Website"
        placeholder="-Enter--"
        class="w-full mb-4"
      />
      <phone-input
        v-model:code="code"
        :rules="requiredRule"
        label="Contact Numbers"
        v-model="phone"
        class="w-full"
      />
    </div>
    <div class="w-full mt-8 mb-32" v-else>
      <div class="float-left">
        <img class="mr-2" v-if="orgInfo.image" :src="orgInfo.image" />
        <avatar class="mr-2 w-15 h-15" v-else :src="localSrc" />
        <div class="flex space-x-4 mt-2">
          <div class="text-gray-300 text-xs">Active Since:</div>
          <div class="text-blue-600 font-bold text-xs">31st May, 2021</div>
        </div>
        <div class="flex space-x-4 mt-2">
          <star-icon />
          <span class="text-xs text-red-600 bg-red-100 rounded-full p-1 px-2"
            >Get Verified</span
          >
          <span
            class="text-xs text-green-600 bg-green-100 rounded-full"
            v-if="verified"
            >Verified</span
          >
        </div>
      </div>
      <div class="float-right">
        <p class="text-sm text-black mb-1">
          57 Campbell Street, Lagos Island. Lagos
        </p>
        <p class="text-sm text-black mb-1">+234 802 290 8484</p>
        <p class="text-sm text-black mb-1">Info@saintnicholashospital.com</p>
        <p class="text-sm text-black mb-1">www.nicholashospital.org</p>
        <div class="flex space-x-4 mt-2">
          <span class="text-gray-300 text-xs"
            >Total Ratings:
            <span class="text-blue-600 font-bold text-xs">16</span>
          </span>
          <span class="text-gray-300 text-xs"
            >Patients Seen:
            <span class="text-blue-600 font-bold text-xs">24</span>
          </span>
        </div>
        <div class="mt-10">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            <view-icon class="mr-2" /> View
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="apply"
            class="text-white bg-danger px-6 rounded-xl"
          >
            <share-icon class="mr-2" /> Share
          </cornie-btn>
        </div>
      </div>
    </div>
    <div class="w-full mb-12">
      <label
        for="ecounter"
        class="w-full capitalize text-black text-sm font-bold mt-12"
        >Site Message
        <span class="text-xs text-red-600 font-medium italic"
          >(Max 150 characters)</span
        ></label
      >
      <div class="w-full -mt-6">
        <Textarea
          class="w-full text-xs"
          placeholder="Text Area"
          :rules="required"
          v-model="siteMessage"
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
  <!-- <accordion-component class="shadow-none rounded-none border-none mt-5 text-primary" title="Practice Hours" expand="true" v-model="opened" :opened="true">
           <div class="grid grid-cols-1 mt-8 gap-y-6 w-full">
    <label class="flex items-center">
      <select-option type="checkbox" class="mr-3" v-model="all" />
      All days
    </label>
    <div class="day-grid grid w-full">
      <span class="font-bold block"></span>
      <span class="font-light uppercase text-black text-sm">
        <span>Start Time</span>
        <span class="ml-14">End Time</span>
      </span>
    </div>
    <div class="grid day-grid w-full" v-for="(opHour, i) in opHours" :key="i">
      <label class="flex items-center"></label>
        <select-option
          @change="changed"
          v-model="opHour.selected"
          type="checkbox"
          class="mr-3"
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
  </accordion-component> -->
  <accordion-component
    class="shadow-none rounded-none border-none text-primary"
    title="Practice Hours"
    expand="true"
    v-model="opened"
    :opened="true"
  >
    <div class="grid grid-cols-1 mt-4 gap-y-6 w-full">
      <label class="flex items-center text-sm text-black">
        <select-option type="checkbox" class="mr-3" v-model="all" />
        All days
      </label>
      <div class="day-grid grid w-full">
        <span class="font-bold block"></span>
        <span class="font-medium text-black uppercase text-sm">
          <span>Start Time</span>
          <span class="ml-14">End Time</span>
        </span>
      </div>
      <div class="grid day-grid w-full" v-for="(opHour, i) in opHours" :key="i">
        <label class="flex items-center text-sm text-black">
          <select-option
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
          <span class="mr-3 mb-6">to</span>
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
          @click="applyhour"
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
// import AddFunction from "./add-function.vue";
import { Watch, PropSync } from "vue-property-decorator";
import { HoursOfOperation } from "@/types/ILocation";
import { Field } from "vee-validate";
import Avatar from "@/components/avatar.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EditIcon from "@/components/icons/aedit.vue";

// const orgFunctions = namespace("OrgFunctions");
const practiceinformations = namespace("practiceinformation");
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
    SelectOption,
    // AddFunction,
    Avatar,
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
    Field,
  },
})
export default class CarePartnersExistingState extends Vue {
  // @Prop({ type: Array, default: [], required: true })
  // functions!: IFunction[];

  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Array, default: opHours })
  modelValue!: HoursOfOperation[];

  @practiceinformations.Action
  fetchPracticeInformation!: () => Promise<void>;

  @practiceinformations.Action
  fetchPracticeHour!: () => Promise<void>;

  showEdit = false;

  @Watch("all")
  opHours = opHours;
  loading = false;
  all = true;
  newArr = [];
  // editingFunction = false;
  expand = false;
  opened = true;
  email = "";
  address = "";
  siteMessage = "";
  contactNumber = "";
  localSrc = require("../../../../../assets/img/placeholder.png");
  orgInfo = [];

  get operationHours() {
    return this.modelValue;
  }
  set operationHours(val: HoursOfOperation[]) {
    this.$emit("update:modelValue", val);
  }

  changed() {
    this.operationHours = this.operationHours;
  }
  async fetchOrgInfo() {
    try {
      const response = await cornieClient().get(
        "/api/v1/organization/myOrg/get"
      );
      this.orgInfo = response.data || {};
    } catch (error) {
      window.notify({ msg: "Could not fetch organization", status: "error" });
    }
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

  get payload() {
    return {
      email: this.email,
      siteMessage: this.siteMessage,
      address: this.address,
      contactNumber: this.contactNumber,
      id: this.id,
    };
  }

  async apply() {
    this.loading = true;
    // if (this.id) await this.updateIssues()
    this.loading = false;
  }
  showEditSection() {
    this.showEdit = true;
  }

  async applyhour() {
    this.loading = true;
    // if (this.id) await this.updateIssues()
    await this.createPracticehour();
    this.loading = false;
  }
  get newaction() {
    return this.id ? "Update" : "Save";
  }
  done() {
    this.$emit("-added");
    this.show = false;
  }

  async mappedfunc() {
    const payload = () => {
      const obj: any = {};
      opHours.forEach((i) => {
        obj[i.day.toLowerCase()] = {
          startDate: i.openTime,
          endDate: i.closeTime,
        };
      });
      return obj;
    };
  }

  async createPracticehour() {
    try {
      const response = await cornieClient().post(
        "/api/v1/practice-hour",
        this.mappedfunc()
      );
      if (response.success) {
        window.notify({
          msg: "practice-information  Created",
          status: "success",
        });
        this.done();
      }
    } catch (error) {
      console.log(error);
      window.notify({
        msg: "practice-information not Created",
        status: "error",
      });
    }
  }

  created() {
    this.fetchOrgInfo();
    if (!this.modelValue || this.modelValue.length < 1)
      this.operationHours = opHours;
    this.fetchPracticeInformation();
    this.fetchPracticeHour();
    // console.log(this.mappedfunc);
  }
}
</script>

<style scoped>
.day-grid {
  grid-template-columns: 20% 75%;
}

.small-font {
  font-size: 10px;
  color: #14171f;
}

.message-font {
  color: red;
  font-size: 6px;
  margin-left: 6px;
}
</style>
