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
              Item reference
            </h2>
          </div>
          <delete-icon
            class="text-danger fill-current cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <div class="flex flex-col p-3 mb-7 h-96">
          <div class="border-b-2 pb-3 border-dashed">
            <label
              for="ecounter"
              class="flex capitalize mb-5 mt-5 text-black text-xs font-bold"
              >status
            </label>
            <div class="w-full flex space-x-4">
              <cornie-radio
                label="Condition"
                class="text-xs"
                name="role"
                v-model="type"
                value="condition"
              />
              <cornie-radio
                label="Observation"
                class="text-xs"
                name="role"
                v-model="type"
                value="observation"
              />
              <cornie-radio
                label="Media"
                class="text-xs"
                name="role"
                v-model="type"
                value="media"
              />
            </div>
          </div>
          <div class="w-full mt-4">
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
          <div class="overflow-y-auto h-96">
            <div>
              <div v-if="type === 'condition'">
                <div v-for="(input, index) in conditions" :key="index">
                  <div
                    class="w-full mt-2 p-3 hover:bg-gray-100 cursor-pointer"
                    @click="getValue(input)"
                  >
                    <div class="w-full flex items-center justify-between">
                      <div class="w-full">
                        <p class="text-sm text-dark mb-1 font-medium">
                          {{ input.code }}
                        </p>
                        <p class="text-xs text-gray-300">
                          {{
                            new Date(input?.recordedDate).toLocaleDateString()
                          }}
                        </p>
                      </div>

                      <div>
                        <p class="text-sm">
                          <span>{{ input?.practitioner?.firstName }}</span>
                          <span>{{ input?.practitioner?.lastName }}</span>
                        </p>
                        <p class="text-xs text-gray-300">
                          {{ input?.practitioner?.jobDesignation }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="type === 'observation'">
                <div v-for="(input, index) in observations" :key="index">
                  <div
                    class="w-full mt-2 p-3 hover:bg-gray-100 cursor-pointer"
                    @click="getValue(input)"
                  >
                    <div class="w-full">
                      <div class="w-full">
                        <p class="text-sm text-dark mb-1 font-medium">
                          {{ input }}
                        </p>
                        <p class="text-xs text-gray-300">04/09/2021, 19:45</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </cornie-card-text>

      <div class="flex justify-end pb-6 px-2">
        <div
          class="flex justify-end w-full mt-auto"
          v-if="type === 'condition'"
        >
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
        <div
          class="flex justify-end w-full mt-auto"
          v-if="type === 'observation'"
        >
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
import { cornieClient } from "@/plugins/http";
import CornieSelect from "@/components/cornieselect.vue";
import CornieCheckbox from "@/components/corniecheckbox.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import { useHandleImage } from "@/composables/useHandleImage";
import DatePicker from "@/components/daterangepicker.vue";
import CornieRadio from "@/components/cornieradio.vue";
import Period from "@/types/IPeriod";
import { initial } from "lodash";
const copy = (original) => JSON.parse(JSON.stringify(original));

export default {
  name: "reference",
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
    selected: {
      type: Array,
      required: true,
      default: () => [],
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
    conditions: {
      type: Array,
      required: true,
      default: () => [],
    },
    observations: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  data() {
    return {
     selectedRef: {},
     type: "",
    };
  },
  computed: {
    patientId() {
      return this.$route.params.id;
    },
  },
  methods: {
    getValue(value) {
      this.selectedRef = value;
    },
    apply() {
      this.$emit("update:preferred", this.selectedRef, this.type);
      this.show = false;
    },
  },

  async created() {
  },
};
</script>
<style scoped>
.custom-checkbox {
  position: absolute;
}

.custom-checkbox-input {
  display: none;
}

.custom-checkbox-text {
  padding: 1rem;
  background-color: #aaa;
  color: #555;
  cursor: pointer;
  user-select: none;
}

.custom-checkbox-input:checked ~ .custom-checkbox-text {
  background-color: red;
  color: white;
}

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
