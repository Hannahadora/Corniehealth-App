<template>
  <div class="w-full p-4 overflow-y-scroll h-scrren">
    <div class="container-fluid">
      <div class="w-full my-4">
        <cornie-input
          :label="'Schedule'"
          class="w-12/12"
          style="width: 100%"
          v-model="data.schedule"
        />
      </div>

      <div class="w-full my-4">
        <label for="">Active</label>
        <div class="w-full flex">
          <div class="mr-6" v-for="(state, index) in activeStates" :key="index">
            <label class="inline-flex items-center">
              <input
                type="radio"
                class="form-radio h-6 w-6"
                v-model="state.code"
              />
              <span class="ml-2">{{ state.display }}</span>
            </label>
          </div>
        </div>
      </div>

      <div class="w-full my-4">
        <CornieSelect
          :items="[1, 2, 3]"
          :label="'Service Category'"
          v-model="data.serviceCategory"
          style="width: 100%"
        />
      </div>

      <div class="w-full my-4">
        <CornieSelect
          :items="[1, 2, 3]"
          :label="'Service Type'"
          v-model="data.serviceType"
          style="width: 100%"
        />
      </div>

      <div class="w-full my-4">
        <CornieSelect
          :items="[1, 2, 3]"
          :label="'Specialty'"
          v-model="data.specialty"
          style="width: 100%"
        />
      </div>

      <div class="w-full my-4">
        <CornieSelect
          :items="[1, 2, 3]"
          :label="'Appointment'"
          v-model="data.appointmentType"
          style="width: 100%"
        />
      </div>

      <div class="w-full my-4">
        <cornie-input
          :label="'Descrription (optional)'"
          class="w-12/12"
          style="width: 100%"
          v-model="data.schedule"
        />
      </div>

      <div class="w-full my-4">
        <cornie-input
          :label="'Capacity (optional)'"
          class="w-12/12"
          style="width: 100%"
          v-model="data.schedule"
        />
      </div>

      <div class="w-full my-4">
        <CornieSelect
          :items="[1, 2, 3]"
          :label="'Appointment'"
          v-model="data.appointmentType"
          style="width: 100%"
        />
      </div>

      <div class="w-full my-4">
        <label for=""
          >Wait list on full capacity
          <span class="text-xs text-gray-500">(optional)</span></label
        >
        <div class="w-full flex">
          <div class="mr-6" v-for="(state, index) in waitList" :key="index">
            <label class="inline-flex items-center">
              <input
                type="radio"
                class="form-radio h-6 w-6"
                v-model="state.code"
              />
              <span class="ml-2">{{ state.display }}</span>
            </label>
          </div>
        </div>
      </div>

      <div class="w-full my-4">
        <label for=""
          >How often do you want this slot to occur?
          <span class="text-xs text-gray-500">(optional) </span></label
        >
        <div class="w-full flex flex-wrap">
          <div
            class="mr-6"
            v-for="(state, index) in slotOccurence"
            :key="index"
            style="max-width: fit-content"
          >
            <label class="inline-flex items-center">
              <input
                type="radio"
                class="form-radio h-6 w-6"
                v-model="state.code"
              />
              <span class="ml-2">{{ state.display }}</span>
            </label>
          </div>
        </div>
      </div>

      <div class="w-full my-4">
        <div class="w-full">
          <label for="" class="font-semibold text-sm">Repeat Every</label>
        </div>
        <div class="w-full flex items-center">
          <CornieInput v-model="data.appointmentType" style="width: 45px" />
          <span class="mx-3"
            ><CornieSelect
              v-model="data.appointmentType"
              :items="['Weekly', 'Daily', 'Monthly']"
              style="width: 124px"
          /></span>
        </div>
      </div>
    </div>

    <div class="w-full my-4">
      <label for="" class="font-semibold text-sm">Repeat on</label>
      <div class="w-full flex flex-wrap mt-1">
        <div
          class="mr-6"
          v-for="(state, index) in days"
          :key="index"
          style="max-width: fit-content"
        >
          <label class="inline-flex items-center">
            <input
              type="checkbox"
              class="form-radio h-6 w-6"
              v-model="state.code"
            />
            <span class="ml-2">{{ state.display }}</span>
          </label>
        </div>
      </div>
    </div>

    <div class="w-full my-4">
      <label for="" class="font-semibold text-sm">Ends</label>
      <div class="w-full">
        <div class="mr-6 my-2" v-for="(state, index) in ends" :key="index">
          <label class="inline-flex items-center">
            <input
              type="radio"
              class="form-radio h-6 w-6"
              v-model="state.code"
            />
            <span class="ml-2 flex items-center">
              {{ state.display }}
              <span class="mx-2" v-if="index === 1"
                ><DatePicker v-model="data.date"
              /></span>
              <span class="mx-2" v-if="index === 2"
                ><CornieInput
                  v-model="data.appointmentType"
                  style="width: 45px"
                />
                <span class="mx-2">Occurrence</span>
              </span>
            </span>
          </label>
        </div>
      </div>
    </div>

    <div class="w-full my-4">
      <CornieSelect
        :items="[1, 2, 3]"
        :label="'Slot Status (optional)'"
        v-model="data.appointmentType"
        style="width: 100%"
      />
    </div>

    <div class="w-full my-4 flex items-center">
      <div class="w-8/12">
        <DatePicker :label="'Start Date'" v-model="data.date" />
      </div>
      <div class="w-4/12">
        <label for="">
          <span class="uppercase font-bold text-xs">Time</span>
          <input
            type="time"
            v-model="data.endTime"
            class="w-full border rounded-lg p-2"
            id="appt"
            required
          />
        </label>
      </div>
    </div>

    <div class="w-full my-4 flex items-center">
      <div class="w-8/12">
        <DatePicker :label="'End Date'" v-model="data.date" />
      </div>
      <div class="w-4/12">
        <label for="">
          <span class="uppercase font-bold text-xs">Time</span>
          <input
            type="time"
            v-model="data.endTime"
            class="w-full border rounded-lg p-2"
            id="appt"
            required
          />
        </label>
      </div>
    </div>

    <div class="w-full my-4">
      <CornieInput
        :label="'Comment (optional)'"
        v-model="data.appointmentType"
        style="width: 100%"
      />
    </div>

    <div class="w-full my-6">
      <div class="container-fluid flex justify-end items-center">
        <corniebtn :loading="false">
          <router-link
            to=""
            class="cursor-pointer bg-white focus:outline-none text-gray-500 border mr-6 font-bold py-3 px-8 rounded-full"
          >
            Cancel
          </router-link>
        </corniebtn>
        <Button :loading="loading">
          <a
            style="background: #fe4d3c"
            class="bg-red-500 hover:bg-blue-700 cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-full"
          >
            Save
          </a>
        </Button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Accordion from "@/components/accordion-component.vue";
import CornieInput from "@/components/cornieinput.vue";
import { namespace } from "vuex-class";
import CustomDropdown from "@/components/cornieselect.vue";
import Button from "@/components/globals/corniebtn.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import ChevronDown from "@/components/icons/chevrondownprimary.vue";
import DatePicker from "@/components/datepicker.vue";
import ToggleCheck from "@/components/ToogleCheck.vue";
import CornieSelect from "@/components/cornieselect.vue";

const healthcare = namespace("healthcare");
const shifts = namespace("shifts");

@Options({
  components: {
    Accordion,
    CornieInput,
    CustomDropdown,
    Button,
    DeleteIcon,
    ChevronDown,
    DatePicker,
    ToggleCheck,
    CornieSelect,
  },
})
export default class Shift extends Vue {
  showDetails = true;
  showBreaks = false;
  showPlanning = false;
  loading = false;

  data: any = {};

  activeStates: any = [
    { display: "Yes", value: "yes" },
    { display: "No", value: "no" },
  ];

  waitList: any = [
    { display: "Yes", value: "yes" },
    { display: "No", value: "no" },
  ];

  slotOccurence: any = [
    { display: "Do not repeat", code: "do not repeat" },
    { display: "Every day", code: "every day" },
    { display: "Every week", code: "every week" },
    { display: "Every month", code: "every month" },
    { display: "Every forever", code: "every forever" },
    { display: "Custom", code: "Custom" },
  ];

  ends: any = [
    { display: "Never", code: "never" },
    { display: "On", code: "" },
    { display: "After", code: "" },
  ];

  days: any = [
    { display: "Monday", code: true },
    { display: "Tuesday", code: false },
    { display: "Wednesday", code: false },
    { display: "Thursday", code: false },
    { display: "Friday", code: false },
    { display: "Saturday", code: false },
    { display: "Sunday", code: false },
  ];
}
</script>
<style>
.dashed-bottom {
  border-bottom: 1px dashed #667499;
}

.h-scrren {
  height: 100vh;
  overflow: scroll;
  padding-bottom: 40px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.h-scrren::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.h-scrren {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
