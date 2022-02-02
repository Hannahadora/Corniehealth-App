<template>
  <cornie-dialog v-model="show" center class="w-4/12 h-5/6">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Add Actor
          </h2>

          <delete-icon
            class="text-danger fill-current cursor-pointer float-right"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <p class="text-sm mb-4 mt-2">Add Actor(s) to this appointment</p>
        <div class="w-full">
          <div class="border-dashed border-b-2">
            <cornie-select
              label="Select"
              :items="[
                'Patient',
                'Practitioner',
                'Device',
                'Location',
                'Healthcare Services',
              ]"
              v-model="actorType"
              class="w-full"
              placeholder="--Select--"
            >
            </cornie-select>
          </div>
          <div class="mt-5 mb-4">
            <p class="text-gray-400 text-xs">{{ total }} selected</p>
          </div>
          <div class="relative bottom-5">
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
          <div>
            <div v-if="actorType == 'Practitioner'">
              <div v-for="(input, index) in practitioners" :key="index">
                <div class="flex justify-between space-x-4 w-full mt-2 p-1">
                  <div class="w-full dflex space-x-1">
                    <div class="w-10 h-10">
                      <avatar
                        class="mr-2"
                        v-if="input.image"
                        :src="input.image"
                      />
                      <avatar class="mr-2" v-else :src="localSrc" />
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
                  <div class="flex space-x-4 w-full">
                    <p
                      style="font-size: 0.5rem"
                      class="cursor-pointer w-full text-danger"
                      @click="
                        showAvailable(input.id, input.firstName, input.lastName)
                      "
                    >
                      View Availability
                    </p>
                    <p
                      style="font-size: 0.5rem"
                      class="cursor-pointer w-full text-danger"
                      @click="
                        showProfile(
                          input.id,
                          input.firstName,
                          input.lastName,
                          input.type,
                          input.activeState,
                          input.image
                        )
                      "
                    >
                      View Profile
                    </p>
                  </div>
                  <!-- <div class="w-full mt-5 cursor-pointer w-full text-xs text-danger">
                            <input
                              v-model="newIndexvaluepractitioner"
                        :value="input"
                        @input="changed(input.id)"
                        name="practioner"
                        class="bg-danger mb-5  focus-within:bg-danger px-6 shadow float-right"
                            />
                    </div> -->
                  <div class="relative bottom-1">
                    <cornie-radio
                      v-model="newIndexvaluepractitioner"
                      :value="input"
                      @input="changed(input.id)"
                      name="practioner"
                      class="bg-danger focus-within:bg-danger px-6 shadow float-right"
                    />
                  </div>
                </div>
                <div class="w-full p-1 mt-5" v-if="singleId == input.id">
                  <!-- <cornie-select
                        :onChange="setValue"
                        class="required w-full"
                        :rules="required"
                        :items="['Type']"
                        v-model="apractitioner.type"
                        label="TYPE"
                        placeholder="--Select--"
                      >
                      </cornie-select> -->
                  <!-- <cornie-select
                        class="required w-full"
                        :rules="required"
                        :items="['Required', 'Information Only', 'Optional']"
                        v-model="apractitioner.required"
                        label="required"
                        placeholder="--Select--"
                      >
                      </cornie-select> -->
                  <cornie-select
                    class="required w-full"
                    :rules="required"
                    :items="['Required', 'Information Only', 'Optional']"
                    v-model="apractitioner.required"
                    label="required"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <date-picker
                    class="w-full mb-5"
                    label="period"
                    v-model="apractitioner.period"
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
                    v-model="apractitioner.consultationMedium"
                    label="consultation medium"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <div class="pb-5">
                    <!-- <span class=" float-right cursor-pointer text-danger text-xs font-semibold"  v-if="Practitioners[index] && Practitioners[index].practitionerId" @click="clearActor('Practitioner',index)">Clear Actor</span>
                      <span class=" float-right cursor-pointer text-danger text-xs font-semibold" v-else @click="applyActor('Practitioner',index)">Add Actor</span> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="actorType == 'Device'">
            <div v-for="(input, index) in devices" :key="index">
              <div class="flex space-x-10 w-full justify-between p-3">
                <div class="dflex space-x-4">
                  <div class="w-10 h-10">
                    <avatar
                      class="mr-2 object-cover object-center w-full h-full visible group-hover:hidden"
                      :src="localSrc"
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
                  v-model="newIndexvaluedevice"
                  :value="input"
                  @input="changed(input.id)"
                  name="device"
                  class="bg-danger float-right focus-within:bg-danger px-6 shadow"
                />
              </div>
              <div class="w-full p-3" v-if="singleId == input.id">
                <cornie-select
                  class="required w-full"
                  :rules="required"
                  :items="['Required', 'Information Only', 'Optional']"
                  v-model="adevice.required"
                  label="required"
                  placeholder="--Select--"
                >
                </cornie-select>
                <date-picker
                  class="w-full mb-5"
                  label="period"
                  v-model="adevice.period"
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
                  v-model="adevice.consultationMedium"
                  label="consultation medium"
                  placeholder="--Select--"
                >
                </cornie-select>
                <div class="pb-5">
                  <!-- <span class=" float-right cursor-pointer text-danger text-xs font-semibold"  v-if="Devices[index] && Devices[index].deviceId" @click="clearActor('Device',index)">Clear Actor</span>
                      <span class=" float-right cursor-pointer text-danger text-xs font-semibold" v-else @click="applyActor('Device',index)">Add Actor</span> -->
                </div>
              </div>
            </div>
          </div>
          <div v-if="roleFilter">
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
                  v-model="newIndexvalue"
                  :value="input"
                  @input="changed(input.id)"
                  name="role"
                  class="bg-danger ml-16 focus-within:bg-danger px-6 shadow"
                />
              </div>
            </div>
          </div>
          <div v-if="actorType == 'Patient'">
            <div v-if="patients.lenth !== 0">
              <div class="flex space-x-10 w-full justify-between p-3">
                <div class="dflex space-x-4">
                  <div class="w-10 h-10">
                    <avatar
                      class="mr-2"
                      v-if="patients.profilePhoto"
                      :src="patients.profilePhoto"
                    />
                    <avatar class="mr-2" v-else :src="localSrc" />
                  </div>
                  <div class="w-full">
                    <p class="text-xs text-dark font-semibold">
                      {{ patients.firstname }} {{ patients.lastname }}
                    </p>
                  </div>
                </div>
                <cornie-radio
                  v-model="newIndexvaluepatient"
                  :value="patients"
                  @input="changed(patients.id)"
                  name="patients"
                  class="bg-danger float-right focus-within:bg-danger px-6 shadow"
                />
              </div>
              <div class="w-full p-3" v-if="singleId == patients.id">
                <cornie-select
                  class="required w-full"
                  :rules="required"
                  :items="['Required', 'Information Only', 'Optional']"
                  v-model="apatient.required"
                  label="required"
                  placeholder="--Select--"
                >
                </cornie-select>

                <date-picker
                  class="w-full mb-5"
                  label="period"
                  v-model="apatient.period"
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
                  v-model="apatient.consultationMedium"
                  label="consultation medium"
                  placeholder="--Select--"
                >
                </cornie-select>
                <div class="pb-5">
                </div>
              </div>
            </div>
          </div>
          <div v-if="actorType == 'Location'">
            <div v-for="(input, index) in locations" :key="index">
              <div class="flex space-x-10 w-full justify-between p-3">
                <div class="dflex space-x-4">
                  <div class="w-10 h-10">
                    <avatar class="mr-2" :src="localSrc" />
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
                  v-model="newIndexvaluelocation"
                  :value="input"
                  @input="changed(input.id)"
                  name="patients"
                  class="bg-danger float-right focus-within:bg-danger px-6 shadow"
                />
              </div>
              <div class="w-full p-3" v-if="singleId == input.id">
                <cornie-select
                  class="required w-full"
                  :rules="required"
                  :items="['Required', 'Information Only', 'Optional']"
                  v-model="alocation.required"
                  label="required"
                  placeholder="--Select--"
                >
                </cornie-select>

                <date-picker
                  class="w-full mb-5"
                  label="period"
                  v-model="alocation.period"
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
                  v-model="alocation.consultationMedium"
                  label="consultation medium"
                  placeholder="--Select--"
                >
                </cornie-select>
                <div class="pb-5">
                  <!-- <span class=" float-right cursor-pointer text-danger text-xs font-semibold"  v-if="Patients[index] && Patients[index].patientId" @click="clearActor('Patient',index)">Clear Actor</span>
                      <span class=" float-right cursor-pointer text-danger text-xs font-semibold" v-else @click="applyActor('Patient',index)">Add Actor</span> -->
                </div>
              </div>
            </div>
          </div>
          <div v-if="actorType == 'Healthcare Services'">
            <div v-for="(input, index) in healthcares" :key="index">
              <div class="flex space-x-10 w-full justify-between p-3">
                <div class="dflex space-x-4">
                  <div class="w-10 h-10">
                    <avatar
                      class="mr-2"
                      v-if="input.profilePhoto"
                      :src="input.profilePhoto"
                    />
                    <avatar class="mr-2" v-else :src="localSrc" />
                  </div>
                  <div class="w-full">
                    <p class="text-xs text-dark font-semibold">
                      {{ input.name }}
                    </p>
                  </div>
                </div>
                <cornie-radio
                  v-model="newIndexvaluehealthcare"
                  :value="input"
                  @input="changed(input.id)"
                  name="patients"
                  class="bg-danger float-right focus-within:bg-danger px-6 shadow"
                />
              </div>
              <div class="w-full p-3" v-if="singleId == input.id">
                <!-- <cornie-select
                            :onChange="setValue"
                            class="required w-full"
                            :rules="required"
                            :items="['Type']"
                            v-model="apatient.type"
                            label="TYPE"
                            placeholder="--Select--"
                        >
                        </cornie-select> -->
                <!-- <cornie-select
                            class="required w-full"
                            :rules="required"
                            :items="['Required', 'Information Only', 'Optional']"
                            v-model="apatient.required"
                            label="required"
                            placeholder="--Select--"
                        >
                        </cornie-select> -->
                <cornie-select
                  class="required w-full"
                  :rules="required"
                  :items="['Required', 'Information Only', 'Optional']"
                  v-model="ahealthcare.required"
                  label="required"
                  placeholder="--Select--"
                >
                </cornie-select>

                <date-picker
                  class="w-full mb-5"
                  label="period"
                  v-model="ahealthcare.period"
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
                  v-model="ahealthcare.consultationMedium"
                  label="consultation medium"
                  placeholder="--Select--"
                >
                </cornie-select>
                <div class="pb-5">
                  <!-- <span class=" float-right cursor-pointer text-danger text-xs font-semibold"  v-if="Patients[index] && Patients[index].patientId" @click="clearActor('Patient',index)">Clear Actor</span>
                        <span class=" float-right cursor-pointer text-danger text-xs font-semibold" v-else @click="applyActor('Patient',index)">Add Actor</span> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </cornie-card-text>

      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <div
            class="flex justify-end w-full mt-auto"
            v-if="actorType == 'Practitioner'"
          >
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
          <div
            class="flex justify-end w-full mt-auto"
            v-if="actorType == 'Device'"
          >
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
          <div
            class="flex justify-end w-full mt-auto"
            v-if="actorType == 'Patient'"
          >
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
          <div
            class="flex justify-end w-full mt-auto"
            v-if="actorType == 'Location'"
          >
            <button
              class="rounded-full mt-5 py-2 px-3 border border-primary focus:outline-none hover:opacity-90 w-1/3 mr-2 text-primary font-semibold"
              @click="show = false"
            >
              Cancel
            </button>
            <button
              @click="apply('Location')"
              class="bg-danger rounded-full text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90 w-1/3"
            >
              Add
            </button>
          </div>
          <div
            class="flex justify-end w-full mt-auto"
            v-if="actorType == 'Healthcare Services'"
          >
            <button
              class="rounded-full mt-5 py-2 px-3 border border-primary focus:outline-none hover:opacity-90 w-1/3 mr-2 text-primary font-semibold"
              @click="show = false"
            >
              Cancel
            </button>
            <button
              @click="apply('Healthcare Services')"
              class="bg-danger rounded-full text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90 w-1/3"
            >
              Add
            </button>
          </div>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
  <availability
    v-model:visible="availableFilter"
    :available="available"
    :name="practitionername"
    :practitionerId="singleId"
  />
  <profile
    v-model:visible="profileFilter"
    :profile="practitioners"
    :name="practitionername"
    :activeState="activeState"
    :type="practitionerType"
    :profileId="singleId"
    :image="image"
  />
</template>
<script>
import { setup } from "vue-class-component";
import Modal from "@/components/practitionermodal.vue";
import DragIcon from "@/components/icons/draggable.vue";
import Draggable from "vuedraggable";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieCard from "@/components/cornie-card";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import IconInput from "@/components/IconInput.vue";
import Availability from "@/components/availability.vue";
import Profile from "@/components/profile.vue";
import SearchIcon from "@/components/icons/search.vue";
import Avatar from "@/components/avatar.vue";
import DeleteIcon from "@/components/icons/cancel.vue";
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
    ...CornieCard,
    Modal,
    DragIcon,
    CornieSelect,
    CornieCheckbox,
    DeleteIcon,
    ArrowLeftIcon,
    CornieIconBtn,
    Draggable,
    DatePicker,
    Availability,
    CornieDialog,
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
    actorType: {
      type: String,
      required: true,
      default: () => "Practitioner",
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
    practitionerRoles: {
      type: Array,
    },
    locations: {
      type: Array,
    },
    healthcares: {
      type: Array,
    },
    patients: {
      type: Array,
    },
  },
  data() {
    return {
      selected: 0,
      localSrc: require("../../../../assets/img/placeholder.png"),
      participantDetail: {
        consultationMedium: "",
        period: "",
        required: "",
      },
      apractitioner: {
        required: false,
        consultationMedium: "",
        period: "",
        practitionerId: "",
      },
      apatient: {
        required: false,
        consultationMedium: "",
        period: "",
        patientId: "",
      },
      adevice: {
        required: false,
        consultationMedium: "",
        period: "",
        deviceId: "",
      },
      alocation: {
        required: false,
        consultationMedium: "",
        period: "",
        locationId: "",
      },
      ahealthcare: {
        required: false,
        consultationMedium: "",
        period: "",
        healthId: "",
      },
      Patients: [],
      Practitioners: [],
      Devices: [],
      Locations: [],
      Healths: [],
      activeState: "",
      practitionerType: "",
      columnsProxy: [],
      indexvalue: [],
      indexvaluepractitioner: [],
      newIndexvaluepractitioner: {},
      newIndexvaluepatient: {},
      newIndexvaluedevice: {},
      newIndexvaluelocation: {},
      newIndexvaluehealthcare: {},
      indexvaluepatient: [],
      indexvaluedevice: [],
      indexvaluelocation: [],
      indexvaluehealthcare: [],

      valueid: [],
      available: [],
      type: "Practitioners",
      singleId: "",
      availableFilter: false,
      practitionername: "",
      image: "",
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
    total() {
      return (
        this.indexvaluepractitioner.length +
        this.indexvaluepatient.length +
        this.indexvaluedevice.length +
        this.indexvaluelocation.length +
        this.indexvaluehealthcare.length
      );
    },
    show: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
  },
  methods: {
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
    },
    async reset(value) {
      if (value == "Practitioner") {
        this.apractitioner = { ...this.Practitioners };
      } else if (value == "Patient") {
        this.apatient = { ...this.Patients };
      } else if (value == "Device") {
        this.adevice = { ...this.Devices };
      }
    },
    applyActor(value) {
      if (value == "Practitioner") {
        this.apractitioner.practitionerId = this.singleId;
        this.Practitioners.push(this.apractitioner);
        this.indexvaluepractitioner.push(this.newIndexvaluepractitioner);
      } else if (value == "Patient") {
        this.apatient.patientId = this.singleId;
        this.Patients.push(this.apatient);
        this.indexvaluepatient.push(this.newIndexvaluepatient);
      } else if (value == "Device") {
        this.adevice.deviceId = this.singleId;
        this.Devices.push(this.adevice);
        this.indexvaluedevice.push(this.newIndexvaluedevice);
      } else if (value == "Location") {
        this.alocation.locationId = this.singleId;
        this.Locations.push(this.alocation);
        this.indexvaluelocation.push(this.newIndexvaluelocation);
      } else if (value == "Healthcare Services") {
        this.ahealthcare.healthId = this.singleId;
        this.Healths.push(this.ahealthcare);
        this.indexvaluehealthcare.push(this.newIndexvaluehealthcare);
      }
      // this.reset(value);
    },
    apply(value) {
      this.applyActor(value);
      this.$emit(
        "show:modal",
        this.singleId,
        this.indexvaluepractitioner,
        this.indexvaluepatient,
        this.indexvaluedevice,
        this.indexvaluelocation,
        this.indexvaluehealthcare,
        this.Practitioners,
        this.Patients,
        this.Devices,
        this.Locations,
        this.Healths,
        value,
        this.apractitioner.practitionerId
      );
      this.indexvalue = [];
      this.valueid = [];
      this.value = [];
      this.show = false;
    },
    showAvailable(value, firstname, lastname) {
      this.singleId = value;
      this.availableFilter = true;
      this.practitionername = firstname + " " + lastname;
      this.viewAvialaibilty();
    },
    showProfile(value, firstname, lastname, type, state, image) {
      this.singleId = value;
      this.profileFilter = true;
      this.practitionername = firstname + " " + lastname;
      this.practitionerType = type;
      this.activeState = state;
      this.image = image;

      this.viewProfile();
    },
    select(i) {
      this.selected = i;
    },
    changed(index) {
      this.singleId = index;
      if (this.setValue == "Practitioner") {
        this.singleId = index;
      }
      //this.valueid.push(index);
    },
    async viewAvialaibilty() {
      const SinglePractitioner = cornieClient().get(
        `/api/v1/schedule/practitioner/${this.singleId}`
      );
      const response = await Promise.all([SinglePractitioner]);
      this.available = response[0].data;
    },
    async viewProfile() {
      const SinglePractitioner = cornieClient().get(
        `/api/v1/schedule/practitioner/${this.singleId}`
      );
      const response = await Promise.all([SinglePractitioner]);
      this.practitionerprofile = response[0].data;
      return response[0].data;
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
    this.viewAppointemnt();
    this.columnsProxy = copy([...this.indexvalue]);
  },
  created() {
    this.viewAvialaibilty();

    this.setValue();
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
