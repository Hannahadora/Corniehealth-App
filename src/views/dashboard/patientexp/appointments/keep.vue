<template>
  <div class="overflow-y-auto bg-white">
    <modal
      :visible="visible"
      style="height: 95%"
      class="w-4/12 flex flex-col overflow-y-auto ml-auto mr-2"
    >
      <div class="flex w-full overflow-y-auto rounded-t-lg p-3">
        <span class="block pr-2 border-r-2">
          <arrow-left-icon
            class="stroke-current text-primary cursor-pointer"
            @click="show = false"
          />
        </span>
        <h2 class="font-bold text-lg text-primary ml-3 -mt-2">Add Actor(s)</h2>
      </div>
      <div class="flex flex-col p-3">
        <p class="text-sm mb-4 mt-2">Add Actor(s) to this appointment</p>
        <div class="grid grid-cols-2 gap-4 w-full">
          <div>
            <cornie-select
              :onChange="setValue"
              :items="[
                'Patient',
                'Practitioner',
                'Practitioner Role',
                'Device',
              ]"
              v-model="type"
              class="rounded-full"
              placeholder="--Select--"
            >
            </cornie-select>
          </div>
          <div class="relative bottom-2">
            <icon-input
              autocomplete="off"
              class="border border-gray-200 h-10 w-full rounded-full focus:outline-none"
              type="search"
              placeholder="Search"
              v-bind="$attrs"
              v-model="displayVal"
            >
              <template v-slot:prepend>
                <search-icon />
              </template>
            </icon-input>
          </div>
        </div>
        <div>
          <div class="bg-gray-100">
            <div v-if="practitionerFilter">
              <div v-for="(input, index) in practitioners" :key="index">
                <div class="flex justify-between space-x-7 w-full mt-2 p-3">
                  <div class="w-full dflex space-x-4">
                    <div class="w-10 h-10">
                      <avatar
                        class="mr-2"
                        v-if="input.image"
                        :src="input.image"
                      />
                      <avatar
                        class="mr-2"
                        v-else
                        src="@assets/img/placeholder.png"
                      />
                    </div>
                    <div class="w-full">
                      <p class="text-xs text-dark font-semibold">
                        {{ input.firstName }}
                        {{ input.lastName }}
                      </p>
                      <p class="text-xs text-gray-500 font-meduim">
                        {{ input.jobDesignation }}
                        {{ input.department }}
                      </p>
                    </div>
                  </div>
                  <p
                    class="cursor-pointer text-xs text-danger"
                    @click="
                      showAvailable(input.id, input.firstName, input.lastName)
                    "
                  >
                    View Availability
                  </p>
                  <p
                    class="cursor-pointer text-xs text-danger"
                    @click="
                      showProfile(
                        input.id,
                        input.firstName,
                        input.lastName,
                        input.type,
                        input.activeState
                      )
                    "
                  >
                    View Profile
                  </p>
                  <cornie-radio
                    v-model="indexvalue"
                    :value="input"
                    @input="changed(input.id)"
                    name="practioner"
                    class="bg-danger focus-within:bg-danger px-6 shadow"
                  />
                </div>
                <div class="w-full p-3" v-if="singleId == input.id">
                  <cornie-select
                    :onChange="setValue"
                    class="required w-full"
                    :rules="required"
                    :items="['Type']"
                    v-model="Practitioners.type"
                    label="TYPE"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                    class="required w-full"
                    :rules="required"
                    :items="['Required', 'Information Only', 'Optional']"
                    v-model="Practitioners.required"
                    label="required"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <date-picker
                    class="w-full mb-5"
                    label="period"
                    v-model="Practitioners.period"
                    :rules="required"
                  />
                  <cornie-select
                    class="required w-full"
                    :rules="required"
                    :items="[
                      'Out-Patient',
                      ' In-Patient',
                      ' Virtual',
                      'HomeCare',
                    ]"
                    v-model="Practitioners.consultationMedium"
                    label="consultation medium"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                </div>
              </div>
            </div>
          </div>
          <!-- <div v-if="practitionerFilter.length < 0">
              <span class="text-center py-3 px-5">No Practitioner. Please select a slot.</span>
            </div> -->
          <div class="bg-gray-100" v-if="deviceFilter">
            <div v-for="(input, index) in devices" :key="index">
              <div
                class="grid grid-cols-2 w-full justify-between gap-4 mt-2 p-3"
              >
                <div class="dflex space-x-4">
                  <div class="w-10 h-10">
                    <avatar
                      class="mr-2 object-cover object-center w-full h-full visible group-hover:hidden"
                      src="@/assets/img/placeholder.png"
                    />
                  </div>
                  <div class="w-full">
                    <p class="text-xs text-dark font-semibold">
                      {{ input.deviceName.name }}
                    </p>
                    <p class="text-xs text-gray-500 font-meduim">
                      {{ input.deviceName.nameType }}
                    </p>
                  </div>
                </div>
                <cornie-radio
                  v-model="indexvalue"
                  :value="input"
                  @input="changed(input.id)"
                  name="device"
                  class="bg-danger ml-16 focus-within:bg-danger px-6 shadow"
                />
              </div>
              <div class="w-full p-3" v-if="singleId == input.id">
                <cornie-select
                  :onChange="setValue"
                  class="required w-full"
                  :rules="required"
                  :items="['Type']"
                  v-model="Devices.type"
                  label="TYPE"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  class="required w-full"
                  :rules="required"
                  :items="['Required', 'Information Only', 'Optional']"
                  v-model="Devices.required"
                  label="required"
                  placeholder="--Select--"
                >
                </cornie-select>
                <date-picker
                  class="w-full mb-5"
                  label="period"
                  v-model="Devices.period"
                  :rules="required"
                />
                <cornie-select
                  class="required w-full"
                  :rules="required"
                  :items="[
                    'Out-Patient',
                    ' In-Patient',
                    ' Virtual',
                    'HomeCare',
                  ]"
                  v-model="Devices.consultationMedium"
                  label="consultation medium"
                  placeholder="--Select--"
                >
                </cornie-select>
              </div>
            </div>
          </div>
          <div class="bg-gray-100" v-if="roleFilter">
            <div v-for="(input, index) in roles" :key="index">
              <div class="grid grid-cols-2 gap-4 w-full col-span-full p-3">
                <div class="dflex space-x-4">
                  <div class="w-10 h-10">
                    <avatar
                      class="mr-2"
                      :src="'@/assets/img/placeholder.png'"
                    />
                  </div>
                  <div class="w-full">
                    <p class="text-xs text-dark font-semibold">
                      {{ input.name }}
                    </p>
                    <p class="text-xs text-gray font-light">
                      {{ input.description }}
                    </p>
                  </div>
                </div>
                <cornie-radio
                  v-model="indexvalue"
                  :value="input"
                  @input="changed(input.id)"
                  name="role"
                  class="bg-danger ml-16 focus-within:bg-danger px-6 shadow"
                />
                <!-- <input
                  v-model="indexvalue"
                  :value="input"
                  @input="changed(input.id)"
                  type="checkbox"
                  class="bg-danger ml-32 focus-within:bg-danger px-6 shadow"
                />-->
              </div>
            </div>
          </div>
          <div class="bg-gray-100" v-if="patientFilter">
            <div v-for="(input, index) in patients" :key="index">
              <div class="flex space-x-10 w-full justify-between p-3">
                <div class="dflex space-x-4">
                  <div class="w-10 h-10">
                    <avatar
                      class="mr-2"
                      src="../../../../assets/img/placeholder.png"
                    />
                  </div>
                  <div class="w-full">
                    <p class="text-xs text-dark font-semibold">
                      {{ input.firstname }} {{ input.lastname }}
                    </p>
                  </div>
                </div>
                <cornie-radio
                  v-model="indexvalue"
                  :value="input"
                  @input="changed(input.id)"
                  name="patients"
                  class="bg-danger float-right focus-within:bg-danger px-6 shadow"
                />
              </div>
              <div class="w-full p-3" v-if="singleId == input.id">
                <cornie-select
                  :onChange="setValue"
                  class="required w-full"
                  :rules="required"
                  :items="['Type']"
                  v-model="Patients.type"
                  label="TYPE"
                  placeholder="--Select--"
                >
                </cornie-select>
                <cornie-select
                  class="required w-full"
                  :rules="required"
                  :items="['Required', 'Information Only', 'Optional']"
                  v-model="Patients.required"
                  label="required"
                  placeholder="--Select--"
                >
                </cornie-select>
                <date-picker
                  class="w-full mb-5"
                  label="period"
                  v-model="Patients.period"
                  :rules="required"
                />
                <cornie-select
                  class="required w-full"
                  :rules="required"
                  :items="[
                    'Out-Patient',
                    ' In-Patient',
                    ' Virtual',
                    'HomeCare',
                  ]"
                  v-model="Patients.consultationMedium"
                  label="consultation medium"
                  placeholder="--Select--"
                >
                </cornie-select>
              </div>
            </div>
          </div>
        </div>
        <!--   <div class="flex justify-end w-full mt-auto">
            <button
            class="
              rounded-full
              mt-5
              py-2
              px-3
              border border-primary
              focus:outline-none
              hover:opacity-90
              w-1/3
              mr-2
              text-primary
              font-semibold
            "
            @click="show = false"
          >
            Cancel
          </button>
          <button
            @click="apply"
            class="
              bg-danger
              rounded-full
              text-white
              mt-5
              py-2
              px-3
              focus:outline-none
              hover:opacity-90
              w-1/3
            "
          >
            Add
          </button>
        </div>-->
        <div class="flex justify-end w-full mt-auto" v-if="practitionerFilter">
          <button
            class="rounded-full mt-5 py-2 px-3 border border-primary focus:outline-none hover:opacity-90 w-1/3 mr-2 text-primary font-semibold"
            @click="show = false"
          >
            Cancel
          </button>
          <button
            @click="apply('Practitioner')"
            class="bg-danger rounded-full text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90 w-1/3"
          >
            Add
          </button>
        </div>
        <div class="flex justify-end w-full mt-auto" v-if="deviceFilter">
          <button
            class="rounded-full mt-5 py-2 px-3 border border-primary focus:outline-none hover:opacity-90 w-1/3 mr-2 text-primary font-semibold"
            @click="show = false"
          >
            Cancel
          </button>
          <button
            @click="apply('Device')"
            class="bg-danger rounded-full text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90 w-1/3"
          >
            Add
          </button>
        </div>
        <div class="flex justify-end w-full mt-auto" v-if="roleFilter">
          <button
            class="rounded-full mt-5 py-2 px-3 border border-primary focus:outline-none hover:opacity-90 w-1/3 mr-2 text-primary font-semibold"
            @click="show = false"
          >
            Cancel
          </button>
          <button
            @click="apply('Role')"
            class="bg-danger rounded-full text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90 w-1/3"
          >
            Add
          </button>
        </div>
        <div class="flex justify-end w-full mt-auto" v-if="patientFilter">
          <button
            class="rounded-full mt-5 py-2 px-3 border border-primary focus:outline-none hover:opacity-90 w-1/3 mr-2 text-primary font-semibold"
            @click="show = false"
          >
            Cancel
          </button>
          <button
            @click="apply('Patient')"
            class="bg-danger rounded-full text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90 w-1/3"
          >
            Add
          </button>
        </div>
      </div>
    </modal>
    <availability
      v-model:visible="availableFilter"
      :name="practitionername"
      :practitionerId="singleId"
      :availability="practitioners"
    />
    <profile
      v-model:visible="profileFilter"
      :profile="practitioners"
      :name="practitionername"
      :activeState="activeState"
      :type="practitionerType"
      :profileId="singleId"
    />
  </div>
</template>
<script>
import { setup } from "vue-class-component";
import Modal from "@/components/practitionermodal.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import DragIcon from "@/components/icons/draggable.vue";
import Draggable from "vuedraggable";
import IconInput from "@/components/IconInput.vue";
import Availability from "@/components/availability.vue";
import Profile from "@/components/profile.vue";
import SearchIcon from "@/components/icons/search.vue";
import Avatar from "@/components/avatar.vue";
import { cornieClient } from "@/plugins/http";
import CornieSelect from "@/components/cornieselect.vue";
import CornieCheckbox from "@/components/corniecheckbox.vue";
import { useHandleImage } from "@/composables/useHandleImage";
import DatePicker from "@/components/daterangepicker.vue";
import CornieRadio from "@/components/cornieradio.vue";
import Period from "@/types/IPeriod";
const copy = (original) => JSON.parse(JSON.stringify(original));

export default {
  name: "actors",
  components: {
    Modal,
    DragIcon,
    CornieSelect,
    CornieCheckbox,
    ArrowLeftIcon,
    Draggable,
    DatePicker,
    Availability,
    IconInput,
    SearchIcon,
    Profile,
    Avatar,
    CornieRadio,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
    showPartcipants: {
      type: Boolean,
    },
    columns: {
      type: Array,
      required: true,
      default: () => [],
    },
    preferred: {
      type: Array,
      required: true,
      default: () => [],
    },
    available: {
      type: Array,
      required: true,
      default: () => [],
    },
    appointmentId: {
      type: String,
    },
    practitioners: {
      type: Array,
      required: true,
      default: () => [],
    },
    devices: {
      type: Array,
    },
    roles: {
      type: Array,
    },
    patients: {
      type: Array,
    },
  },
  data() {
    return {
      selected: 0,
      participantDetail: {
        consultationMedium: "",
        period: "",
        required: "",
      },
      // Patients: {
      //     id: "",
      //     type: "",
      //     required: "",
      //     consultationMedium: "",
      //     period : "",
      //     firstname: "",
      //     lastname: "",
      //     gender: "",
      //     dateOfBirth: "",
      //     accountType: "",
      //     mrn: "",

      //   },
      //   Practitioners: {
      //         id: "",
      //         type: "",
      //         required: "",
      //         consultationMedium: "",
      //         period :"",
      //       },
      //       Devices:{
      //         id: "",
      //       type: "",
      //       required: "",
      //       consultationMedium: "",
      //       period :  "",
      //     },
      activeState: "",
      practitionerType: "",
      columnsProxy: [],
      indexvalue: [],
      valueid: [],
      type: "Patient",
      singleId: "",
      availableFilter: false,
      practitionername: "",
      profileFilter: false,
      practitionerFilter: true,
      deviceFilter: false,
      patientFilter: false,
      roleFilter: false,
      practitionerId: "",
    };
  },
  watch: {
    columns(val) {
      this.columnsProxy = copy(val);
    },
    visible() {
      const active = this.preferred.length > 0 ? this.preferred : this.columns;
      //this.columnsProxy = copy([...active]);
    },
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
    setValue() {
      if (this.type == "Practitioner") {
        this.practitionerFilter = true;
        this.patientFilter = false;
        this.deviceFilter = false;
        this.roleFilter = false;
      } else if (this.type == "Patient") {
        this.patientFilter = true;
        this.deviceFilter = false;
        this.roleFilter = false;
        this.practitionerFilter = false;
      } else if (this.type == "Device") {
        this.deviceFilter = true;
        this.practitionerFilter = false;
        this.patientFilter = false;
        this.roleFilter = false;
      } else if (this.type == "Practitioner Role") {
        this.roleFilter = true;
        this.practitionerFilter = false;
        this.patientFilter = false;
        this.deviceFilter = false;
      }
      return this.type;
    },
  },
  methods: {
    apply(value) {
      this.$emit(
        "update:preferred",
        copy([...this.indexvalue]),
        this.valueid,
        value,
        this.type,
        this.Practitioners,
        this.Patients,
        this.Devices
      );
      this.indexvalue = [];
      this.valueid = [];
      this.value = [];
      this.show = false;
    },
    reset() {
      this.$emit("update:preferred", copy([...this.columns]));
      this.show = false;
      this.showPartcipants = false;
    },
    showAvailable(value, firstname, lastname) {
      this.singleId = value;
      this.availableFilter = true;
      this.practitionername = firstname + " " + lastname;
    },
    showProfile(value, firstname, lastname, type, state) {
      this.singleId = value;
      this.profileFilter = true;
      this.practitionername = firstname + " " + lastname;
      this.practitionerType = type;
      this.activeState = state;
    },
    select(i) {
      this.selected = i;
    },
    changed(index) {
      if (this.setValue == "Practitioner") {
        this.singleId = index;
      }
      this.singleId = index;
      this.valueid.push(index);
    },
    async viewAppointemnt() {
      try {
        const response = await cornieClient().get(
          "/api/v1/appointment",
          this.appointmentId
        );
        if (response.success) {
          this.columnsProxy = response.data;
        }
      } catch (error) {
        this.show = false;
        console.error(error);
      }
    },
  },
  mounted() {
    this.columnsProxy = copy([...this.indexvalue]);
    this.viewAppointemnt();
  },
};
</script>
<style scoped>
.dflex {
  display: -webkit-box;
}
.hide {
  display: none;
}
/* Large checkboxes */

input[type="checkbox"] {
  height: 22px;
  width: 22px;
}

input[type="checkbox"]:before {
  width: 24px;
  border: hidden;
  height: 20px;
}

input[type="checkbox"]:after {
  top: -20px;
  width: 22px;
  height: 22px;
}

input[type="checkbox"]:checked:after {
  background-image: url("../../../../assets/tick.svg");
  background-color: #fe4d3c;
}
input[type="checkbox"]:after {
  position: relative;
  display: block;
  left: 0px;
  content: "";
  background: white;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 3px;
  text-align: center;
  border: 1px solid #fe4d3c;
}
</style>
