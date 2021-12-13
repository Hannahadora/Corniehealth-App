<template>
  <div class="overflow-y-auto bg-white">
    <cornie-dialog v-model="show" right class="w-4/12 h-full">
      <cornie-card height="100%" class="flex flex-col">
        <cornie-card-title>
          <cornie-icon-btn @click="show = false">
            <arrow-left-icon />
          </cornie-icon-btn>
          <h2 class="font-bold text-lg text-primary ml-3 -mt-2">
            All Participants
          </h2>
        </cornie-card-title>

        <cornie-card-text class="flex-grow scrollable">
          <p class="text-sm mt-2">All participants for this appointment</p>
          <div>
            <div
              v-for="(input, index) in columnsProxy.Practitioners"
              :key="index"
            >
              <span
                class="flex border-b-2 border-dashed w-full text-sm text-primary py-2 mx-auto font-semibold col-span-full mb-2 mt-4"
              >
                Practitioner
              </span>
              <div class="grid grid-cols-2 gap-4 col-span-full mt-2 p-5">
                <div class="dflex space-x-4">
                  <div class="w-10 h-10">
                    <avatar
                      class="mr-2"
                      v-if="input.practitioner.image"
                      :src="input.practitioner.image"
                    />
                    <avatar class="mr-2" v-else :src="localSrc" />
                  </div>
                  <div class="w-full">
                    <p class="text-xs text-dark font-semibold">
                      {{ input.practitioner.firstName }}
                      {{ input.practitioner.lastName }}
                    </p>
                    <p class="text-xs text-gray-500 font-meduim">
                      {{ input.practitioner.jobDesignation }}
                      {{ input.practitioner.department }}
                    </p>
                  </div>
                </div>
                <div>
                  <p class="mr-2 float-right text-xs text-danger">Accepted</p>
                </div>
              </div>
            </div>

            <div v-for="(input, index) in columnsProxy.Devices" :key="index">
              <span
                class="flex border-b-2 border-dashed w-full text-sm text-primary py-2 mx-auto font-semibold col-span-full mb-2"
              >
                Device
              </span>
              <div class="grid grid-cols-2 gap-4 col-span-full mt-2 p-5">
                <div class="dflex space-x-4">
                  <div class="w-10 h-10">
                    <avatar class="mr-2" :src="localSrc" />
                  </div>
                  <div class="w-full">
                    <p class="text-xs text-dark font-semibold">
                      {{ input.device.deviceName.name }}
                    </p>
                    <p class="text-xs text-gray-500 font-meduim">
                      {{ input.device.deviceName.nameType }}
                    </p>
                  </div>
                </div>
                <div>
                  <p class="mr-2 float-right text-xs text-danger">Accepted</p>
                </div>
              </div>
            </div>
            <div v-for="(input, index) in columnsProxy.Roles" :key="index">
              <span
                class="flex border-b-2 border-dashed w-full text-sm text-primary py-2 mx-auto font-semibold col-span-full mb-2"
              >
                Practitioners Role
              </span>
              <div class="grid grid-cols-2 gap-2 col-span-full p-5">
                <div class="dflex space-x-4">
                  <div class="w-10 h-10">
                    <avatar class="mr-2" :src="input.patient.profilePhoto" />
                  </div>
                  <div class="w-full">
                    <p class="text-xs text-dark font-semibold">
                      {{ input.patient.firstname }} {{ input.patient.lastname }}
                    </p>
                    <!-- <p class="text-xs text-gray font-light">{{input.patient.description}}</p> -->
                  </div>
                </div>
                <div>
                  <p class="mr-2 float-right text-xs text-danger">Accepted</p>
                </div>
              </div>
            </div>
            <div v-for="(input, index) in columnsProxy.Patients" :key="index">
              <span
                class="flex border-b-2 border-dashed w-full text-sm text-primary py-2 mx-auto font-semibold col-span-full mb-2"
              >
                Patients
              </span>
              <div class="grid grid-cols-2 gap-2 col-span-full p-5">
                <div class="dflex space-x-4">
                  <div class="w-10 h-10">
                    <!-- <avatar class="mr-2" :src="input.profilePhoto" v-if="input.profilePhoto" />-->
                    <avatar class="mr-2" :src="input.patient.profilePhoto" />
                  </div>
                  <div class="w-full">
                    <p class="text-xs text-dark font-semibold">
                      {{ input.patient.firstname }} {{ input.patient.lastname }}
                    </p>
                  </div>
                </div>
                <div>
                  <p class="mr-2 float-right text-xs text-danger">Accepted</p>
                </div>
              </div>
            </div>
          </div>
        </cornie-card-text>

        <cornie-card>
          <cornie-card-text class="flex justify-end">
            <div class="flex justify-end w-full mt-auto">
              <button
                type="button"
                @click="show = false"
                class="bg-danger rounded-full text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90 w-1/3"
              >
                Close
              </button>
            </div>
          </cornie-card-text>
        </cornie-card>
      </cornie-card>
    </cornie-dialog>
    <availability v-model:visible="availableFilter" />
    <profile v-model:visible="profileFilter" />
  </div>
</template>
<script>
import Modal from "@/components/practitionermodal.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieCard from "@/components/cornie-card";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import DragIcon from "@/components/icons/draggable.vue";
import Draggable from "vuedraggable";
import IconInput from "@/components/IconInput.vue";
import Availability from "@/components/availability.vue";
import Profile from "@/components/profile.vue";
import SearchIcon from "@/components/icons/search.vue";
import Avatar from "@/components/avatar.vue";
import { cornieClient } from "@/plugins/http";
import { setup } from "vue-class-component";
import { useHandleImage } from "@/composables/useHandleImage";

const copy = (original) => JSON.parse(JSON.stringify(original));

export default {
  name: "ParticipantFilter",
  components: {
    ...CornieCard,
    CornieDialog,
    CornieIconBtn,
    Modal,
    DragIcon,
    ArrowLeftIcon,
    Draggable,
    Availability,
    IconInput,
    SearchIcon,
    Profile,
    Avatar,
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
  },
  data() {
    return {
      localSrc: require("../../../../assets/img/placeholder.png"),
      columnsProxy: [],
      indexvalue: [],
      practitioners: [],
      valueid: [],
      availableFilter: false,
      profileFilter: false,
      practitionerId: "",
      img: setup(() => useHandleImage()),
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
  },
  methods: {
    apply() {
      this.$emit("update:preferred", copy([...this.columnsProxy]));
      this.show = false;
    },
    reset() {
      this.$emit("update:preferred", copy([...this.columns]));
      this.show = false;
      this.showPartcipants = false;
    },
    showAvailable() {
      this.availableFilter = true;
    },
    showProfile() {
      this.profileFilter = true;
    },
    changed(index) {
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
    this.columnsProxy = copy([...this.columnsProxy]);
    this.viewAppointemnt();
  },
};
</script>
<style scoped>
.dflex {
  display: -webkit-box;
}
</style>
