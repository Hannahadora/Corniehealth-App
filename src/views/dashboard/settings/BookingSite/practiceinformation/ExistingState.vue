<template>
  <accordion-component
    class="shadow-none rounded-none border-none text-primary"
    title="Practice Information"
    expand="true"
    v-model="opened"
    :opened="true"
  >
    <div>
      <div class="w-full flex items-start justify-between mt-3">
        <div class="">
          <p class="text-sm mt-3 text-black">
            The information contained below will appear in your Cornie Health
            public profile and on your booking site, if you have embedded the
            link.<br />
            This information does not affect other related data in your practice
            settings.
          </p>
        </div>
        <!-- <div>
          <div
            class="flex text-primary font-semibold text-sm mt-3 cursor-pointer"
            v-if="showEdit"
            @click="showEdit = false"
          >
            <edit-icon class="fill-current text-primary mr-4" /> Edit
          </div>
          <div
            v-else
            class="flex text-danger font-semibold text-sm mt-3 cursor-pointer"
            @click="showEditSection"
          >
            <edit-icon class="fill-current text-danger mr-4" /> Edit
          </div>
        </div> -->
      </div>
    </div>
    <div v-if="showEdit" class="w-full">
      <div class="grid grid-cols-3 w-full justify-between gap-4 mt-5">
        <cornie-input
          label="Email"
          v-model="email"
          placeholder="--Enter--"
          class="w-full mb-4"
        />
        <cornie-input
          label="Address"
          v-model="address"
          placeholder="--Enter--"
          class="w-full mb-4"
        />
        <cornie-input
          label="Website"
          v-model="website"
          placeholder="https://corniehealth.com"
          class="w-full mb-4"
        />
        <div>
          <phone-input
            :add="true"
            @addnumbers="addNumbers"
            v-model:code="dialCode"
            :rules="phoneRule"
            label="Contact Numbers"
            v-model="contactNumber"
            class="w-full"
          />
          <div class="grid grid-cols-2 gap-4 mt-3">
            <div
              class="flex space-x-6 w-full bg-primary rounded-full text-white p-1 px-4"
              v-for="(item, index) in phonenumbers"
              :key="index"
            >
              <span>{{ item.number }}</span>
              <cancel-icon
                class="mt-1 cursor-pointer"
                @click="removenumber(index)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="w-full mb-12">
        <label
          for="ecounter"
          class="w-full capitalize text-black text-sm font-bold mt-12"
          >About Us
          <span class="text-xs text-red-600 font-medium italic"
            >(Max 1500 characters)</span
          ></label
        >
        <div class="w-full -mt-6">
          <Textarea
            class="w-full text-xs"
            placeholder="Text Area"
            :rules="required"
            :maxlength="'1500'"
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
            @click="apply()"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </div>
    <div class="w-full mt-8 grid grid-cols-7 items-start" v-else>
      <div
        class="col-span-2 bg-white shadow p-4 mr-6 flex flex-col justify-center"
      >
        <div class="flex flex-col items-center justify-center">
          <img class="w-24 h-24" v-if="organizationInfo?.image" :src="organizationInfo?.image" />
          <avatar class="mr-2 w-24 h-24" v-else :src="localSrc" />
          <!-- <star-icon class="mt-2" /> -->
          <div class="text-gray-300 text-xs mt-2">
            {{ organizationInfo?.registrationNumber }}
          </div>
        </div>
        <div class="flex space-x-4 mt-2">
          <div class="text-gray-800 text-sm">Domain :</div>
          <div class="text-black text-sm">
            {{ organizationInfo?.domainName }}
          </div>
        </div>
        <div class="flex space-x-4 mt-2">
          <div class="text-gray-600 text-sm">Active Since :</div>
          <div v-if="organizationInfo?.createdAt" class="text-black text-sm">
            {{
              new Date(organizationInfo?.createdAt).toLocaleDateString("en-US")
            }}
          </div>
          <div v-else class="text-black text-sm">Nil</div>
        </div>
        <div class="flex space-x-4 mt-2">
          <div class="text-gray-600 text-sm">Address :</div>
          <div class="text-black text-sm">
            {{ organizationInfo?.address }}
          </div>
        </div>
        <div class="flex space-x-4 mt-2">
          <div class="text-gray-600 text-sm">Email :</div>
          <div class="text-black text-sm">
            {{ organizationInfo?.email }}
          </div>
        </div>
        <div class="flex space-x-4 mt-2">
          <div class="text-gray-600 text-sm">Mobile :</div>
          <div class="text-black text-sm">
            {{ organizationInfo?.phone?.dialCode +' '+   organizationInfo?.phone?.number}}
          </div>
        </div>
        <!-- <div class="flex space-x-4 mt-2">
          <span class="text-gray-600 text-sm"
            >Total Ratings :
            <span class="text-black text-sm">16</span>
          </span>
        </div>
        <div class="flex space-x-4 mt-2 mb-2">
          <span class="text-gray-600 text-sm"
            >Patients Seen :
            <span class="text-black text-6m">24</span>
          </span>
        </div> -->
        <a href="organizationInfo.website" target="_blank" class="text-blue-500 underline text-sm mb-1">{{ organizationInfo?.website }}</a>

        <!-- <div class="flex space-x-4 items-center justify-center mt-2">
          <span
            class="text-xs text-red-600 bg-red-100 rounded-full p-1 px-2"
            >Get Verified</span
          >
          <span
            class="text-xs text-green-600 bg-green-100 rounded-full"
            v-if="verified"
            >Get Verified</span
          >
        </div> -->

        <div class="flex items-center justify-between mt-7 border-t border-dashed pt-4">
          <span class="text-gray-600 text-sm"
            >Account Owner:
            <span class="text-black text-xs">{{ authPractitioner?.firstName +' '+ authPractitioner?.lastName}}</span>
          </span>
        </div>

        <!-- <div class="mt-4">
          <cornie-btn
            class="border-primary border-2 px-0 mr-3 py-1 rounded-xl text-primary"
          >
            <copy-icon class="mr-2" /> Copy Link
          </cornie-btn>
          <cornie-btn class="text-white bg-danger px-0 py-2 rounded-xl">
            <share-icon class="mr-2" /> Share Link
          </cornie-btn>
        </div> -->
      </div>

      <div class="col-span-5 bg-white shadow p-4 h-full relative">
        <label
          for="ecounter"
          class="w-full capitalize text-black text-sm font-bold"
          >About Us
          <span class="text-xs text-red-600 font-medium italic"
            >(Max 1500 characters)</span
          ></label
        >
        <div class="w-full">
          <Textarea
            class="w-full text-xs"
            placeholder="Start typing...."
            :rules="required"
            :maxlength="'1500'"
            v-model="siteMessage"
          />
        </div>

        <cornie-card class="absolute bottom-12 right-4">
          <cornie-card-text class="flex justify-end">
            <cornie-btn
              @click="show = false"
              class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
            >
              Cancel
            </cornie-btn>
            <cornie-btn
              :loading="loading"
              @click="apply()"
              class="text-white bg-danger px-6 rounded-xl"
            >
              Save
            </cornie-btn>
          </cornie-card-text>
        </cornie-card>
      </div>
    </div>
    <div class="">
      <!-- <p class="text-sm text-black mb-1"> {{
                authPractitioner.phone.dialCode + authPractitioner.phone.number
              }}</p> -->
      <!-- <p class="text-sm text-black mb-1"> {{ authPractitioner.email }}</p> -->
    </div>
  </accordion-component>

  <photo-section />

  <accordion-component
    class="shadow-none rounded-none pb-14 mb-32 border-none mt-32 text-primary"
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
import PhotoSection from "../photo.vue";
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
import CancelIcon from "@/components/icons/whitecancel.vue";
import { string } from "yup";
import { Watch, PropSync } from "vue-property-decorator";
import { HoursOfOperation } from "@/types/ILocation";
import { Field } from "vee-validate";
import IPhone from "@/types/IPhone";
import Avatar from "@/components/avatar.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EditIcon from "@/components/icons/aedit.vue";
import IPractitioner from "@/types/IPractitioner";
import IPracticeInformation from "@/types/IPracticeInformation";
import IPracticeHour from "@/types/IPracticeHours";
import CopyIcon from "@/components/icons/copy.vue";
import { IOrganization } from "@/types/IOrganization";

const userStore = namespace("user");
const organization = namespace("organization");

const phoneRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const practiceinformation = namespace("practiceinformation");
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
    CancelIcon,
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
    PhotoSection,
    CopyIcon,
  },
})
export default class CarePartnersExistingState extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Array, default: opHours })
  modelValue!: HoursOfOperation[];

  @organization.State
  organizationInfo!: IOrganization;

  @organization.Action
  fetchOrgInfo!: () => Promise<void>

  @practiceinformation.State
  practiceInformations!: IPracticeInformation[];

  @practiceinformation.Action
  fetchPracticeInformations!: () => Promise<void>;

  @practiceinformation.Action
  getPracticeinformationById!: (id: string) => IPracticeInformation;

  @userStore.Getter
  authPractitioner!: IPractitioner;

  @practiceinformation.State
  practiceHours!: IPracticeHour[];

  @practiceinformation.Action
  fetchPracticeHours!: () => Promise<void>;

  @practiceinformation.Action
  getPracticeHourById!: (id: string) => IPracticeHour;

  hoursModel = {} as IPracticeHour;

  showEdit = false;
  informationId = "";
  hourId = "";
  opHours = opHours;
  loading = false;
  all = true;
  newArr = [];
  // editingFunction = false;
  expand = false;
  opened = true;
  email = "";
  address = "";
  phonenumbers = [] as any;
  website = "";
  required = string().required();

  siteMessage = "";
  contactNumber = "";
  localSrc = require("../../../../../assets/img/placeholder.png");
  dialCode = "+234";
  dateoptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  monday = {
    startDate: "",
    endDate: "",
  };
  tuesday = {
    startDate: "",
    endDate: "",
  };
  wednesday = {
    startDate: "",
    endDate: "",
  };
  thursday = {
    startDate: "",
    endDate: "",
  };
  friday = {
    startDate: "",
    endDate: "",
  };
  saturday = {
    startDate: "",
    endDate: "",
  };
  sunday = {
    startDate: "",
    endDate: "",
  };

  @Watch("informationId")
  idChanged() {
    this.setPracticeInformation();
    this.setPracticeHour();
  }
  async setPracticeInformation() {
    const practice = await this.getPracticeinformationById(this.items as any);
    if (!practice) return;
    this.email = practice.email;
    this.siteMessage = practice.siteMessage;
    this.address = practice.address;
    this.website = practice.website;
    this.phonenumbers = practice.contactNumbers;
  }
  async setPracticeHour() {
    const hour = await this.getPracticeHourById(this.items2 as any);
    if (!hour) return;
    this.hoursModel = hour;
  }
  async setImpressionModel() {
    this.hoursModel = JSON.parse(JSON.stringify({ ...opHours }));
  }
  phoneRule = string().matches(phoneRegex, "A valid phone number is required");

  removenumber(index: number) {
    this.phonenumbers.splice(index, 1);
  }
  async reset() {
    this.contactNumber = "";
  }

  addNumbers() {
    if (this.contactNumber == "") {
      window.notify({ msg: "Please input a contact number", status: "error" });
    } else {
      this.phonenumbers.push(this.phone);
      this.reset();
    }
  }

  get items() {
    return this.practiceInformations.map((practiceInformation) => {
      return (this.informationId = practiceInformation.id as string);
    });
  }

  get items2() {
    return this.practiceHours.map((practiceHour) => {
      return (this.hourId = practiceHour.id as string);
    });
  }
  get phone(): IPhone {
    return {
      dialCode: this.dialCode,
      number: this.contactNumber,
    };
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

  get payload() {
    return {
      email: this.email,
      siteMessage: this.siteMessage,
      address: this.address,
      website: this.website,
      contactNumbers: this.phonenumbers,
    };
  }

  async apply() {
    this.loading = true;
    await this.createPracticeInfromation();
    this.loading = false;
  }
  showEditSection() {
    this.showEdit = true;
  }

  async applyhour() {
    this.loading = true;
    await this.createPracticehour();
    this.loading = false;
  }
  get newaction() {
    return this.id ? "Update" : "Save";
  }
  done() {
    this.$emit("added");
    this.show = false;
    this.showEdit = false;
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

  async createPracticeInfromation() {
    try {
      const response = await cornieClient().post(
        "/api/v1/practice-information",
        this.payload
      );
      if (response.success) {
        window.notify({
          msg: "Practice Information  Created",
          status: "success",
        });
        this.done();
      }
    } catch (error) {
      console.log(error);
      window.notify({
        msg: "Practice Information not Created",
        status: "error",
      });
    }
  }
  async createPracticehour() {
    try {
      const response = await cornieClient().post(
        "/api/v1/practice-hour",
        this.mappedfunc()
      );
      if (response.success) {
        window.notify({
          msg: "Practice Hour  Created",
          status: "success",
        });
        this.done();
      }
    } catch (error) {
      console.log(error);
      window.notify({
        msg: "Practice Hour not Created",
        status: "error",
      });
    }
  }

  async created() {
    await this.fetchOrgInfo();
    await this.setImpressionModel();
    await this.setPracticeHour();
    await this.setPracticeInformation();
    if (!this.modelValue || this.modelValue.length < 1)
      this.operationHours = opHours;
    this.fetchPracticeInformations();
    this.fetchPracticeHours();
    this.authPractitioner;
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
img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
</style>
