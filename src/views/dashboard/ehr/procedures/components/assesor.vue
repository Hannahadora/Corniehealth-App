<template>
  <cornie-dialog
    v-model="show"
    right
    class="w-4/12 h-full"
    style="z-index: 999"
  >
    <cornie-card height="100%" class="flex flex-col bg-white">
      <cornie-card-title>
        <div class="w-full flex items-center justify-between">
          <div class="w-full flex items-center">
            <span class="pr-2 flex items-center cursor-pointer border-r-2">
              <cornie-icon-btn @click="show = false">
                <arrow-left-icon />
              </cornie-icon-btn>
            </span>

            <h2 class="font-bold text-lg text-primary ml-3 -mt-0.5">
              Recorder
            </h2>
          </div>
          <delete-icon
            class="text-danger fill-current cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <div class="flex flex-col p-3 mb-7">
          <div class="border-b-2 pb-3 border-dashed">
            <label
              for="ecounter"
              class="flex capitalize mb-5 mt-5 text-black text-xs font-bold"
              >Reference
            </label>
            <div class="w-full flex space-x-4">
              <cornie-radio
                label="Practitioner"
                class="text-xs"
                name="practice"
                :checked="check"
                @click="setValue('Practitioner')"
              />
              <!-- <cornie-radio
              label="Practitioner role"
              class="text-xs"
              name="role"
              :checked="check2"
              @click="setValue('Role')"
            /> -->
            </div>
          </div>
          <div class="w-full">
            <div class="mt-4 mb-4">
              <p class="text-gray-400 text-xs">
                {{ check3.practitioners.length }} selected
              </p>
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
          <div class="overflow-y-auto">
            <div>
              <div v-if="practitionerFilter">
                <div v-for="(input, index) in practitioners" :key="index">
                  <div class="flex justify-between w-full mt-2 p-3">
                    <div class="w-full dflex space-x-4 w-11/12">
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
                        </p>
                      </div>
                    </div>
                    <div
                      class="mb-5 cursor-pointer text-xs text-danger flex items-center justify-end"
                    >
                      <cornie-radio
                        type="radio"
                        v-model="check3.practitioners"
                        :value="input.firstName + ' ' + input.lastName"
                        class=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="roleFilter">
              <div v-for="(input, index) in roles" :key="index">
                <div class="grid grid-cols-2 gap-4 w-full col-span-full p-3">
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
                  <div
                    class="w-full mb-5 cursor-pointer w-full text-xs text-danger"
                  >
                    <input
                      v-model="check3.practitioners"
                      :value="input.name"
                      type="checkbox"
                      class="bg-danger focus-within:bg-danger px-6 shadow float-right"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </cornie-card-text>

      <div class="flex justify-end pb-6 px-2">
        <div class="flex justify-end w-full mt-auto" v-if="practitionerFilter">
          <button
            class="rounded-full mt-5 py-2 px-3 border border-primary focus:outline-none hover:opacity-90 w-1/3 mr-2 text-primary font-semibold"
            @click="show = false"
          >
            Cancel
          </button>
          <button
            @click="apply()"
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
            @click="apply()"
            class="bg-danger rounded-full text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90 w-1/3"
          >
            Add
          </button>
        </div>
      </div>
    </cornie-card>
  </cornie-dialog>
</template>
<script>
  import Availability from "@/components/availability.vue";
  import Avatar from "@/components/avatar.vue";
  import CornieCard from "@/components/cornie-card";
  import CornieCheckbox from "@/components/corniecheckbox.vue";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieIconBtn from "@/components/CornieIconBtn.vue";
  import CornieRadio from "@/components/cornieradio.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import DatePicker from "@/components/daterangepicker.vue";
  import IconInput from "@/components/IconInput.vue";
  import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
  import CancelIcon from "@/components/icons/CloseIcon.vue";
  import DragIcon from "@/components/icons/draggable.vue";
  import SearchIcon from "@/components/icons/search.vue";
  import Modal from "@/components/practitionermodal.vue";
  import Profile from "@/components/profile.vue";
  import Draggable from "vuedraggable";
  const copy = (original) => JSON.parse(JSON.stringify(original));

  export default {
    name: "assesor",
    components: {
      ...CornieCard,
      Modal,
      DragIcon,
      CornieSelect,
      CornieCheckbox,
      ArrowLeftIcon,
      CornieIconBtn,
      CancelIcon,
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
      practitioners: {
        type: Array,
        required: true,
        default: () => [],
      },
      roles: {
        type: Array,
        required: true,
        default: () => [],
      },
    },
    data() {
      return {
        selected: 0,
        localSrc: require("@/assets/img/placeholder.png"),
        check: true,
        check2: false,
        check3: {
          practitioners: [],
        },
        Patients: [],
        Practitioners: [],
        Devices: [],
        activeState: "",
        practitionerType: "",
        columnsProxy: [],
        indexvalue: [],
        valueid: [],
        available: [],
        type: "Practitioner",
        assesorPractitionerValue: [],
        assesorRoleValue: [],
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
        const active =
          this.preferred.length > 0 ? this.preferred : this.columns;
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
    },
    methods: {
      setValue(value) {
        if (value == "Practitioner") {
          this.practitionerFilter = true;
          this.roleFilter = false;
          this.check = true;
          this.check2 = false;
          this.type = value;
        } else if (value == "Role") {
          this.roleFilter = true;
          this.practitionerFilter = false;
          this.type = value;
          this.check2 = true;
          this.check = false;
        }
      },
      apply() {
        this.$emit("update:preferred", this.check3.practitioners);
        this.show = false;
      },
      select(i) {
        this.selected = i;
      },
    },
    mounted() {
      this.columnsProxy = copy([...this.indexvalue]);
    },
    created() {
      this.setValue();
      console.log("assessor", this.practitioners);
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
    background-image: url("../../../../../assets/tick.svg");
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
