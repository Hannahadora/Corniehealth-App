<template>
  <div class="overflow-y-auto bg-white">
    <modal
      :visible="visible"
      class="w-4/12 flex flex-col overflow-y-auto mr-2"
    >
      <div class="flex w-full overflow-y-auto rounded-t-lg p-5">
        <span class="block pr-2 border-r-2">
          <arrow-left-icon
            class="stroke-current text-primary cursor-pointer"
            @click="show = false"
          />
        </span>
          <h2 class="font-bold text-lg text-primary ml-3 -mt-2">Profile </h2>
      </div>
      <div class="flex flex-col p-3 mb-7">
        <p class="text-sm mt-2">
         View {{name}} profile
        </p>
        <div class="my-5 border-2 p-3 border-gray-200 w-full flex-col flex">
            <span class="items-center hover:bg-gray-100 mb-5 w-full flex justify-between">
              <p class="cursor-pointer float-left text-xs text-black">Provider ID</p>
              <p class="cursor-pointer float-right text-xs text-gray-500">{{profileId}}</p>
            </span>
            <span class="items-center hover:bg-gray-100 mb-5 w-full flex justify-between">
              <p class="cursor-pointer float-left text-xs text-black">Status</p>
              <p class="cursor-pointer float-right text-xs text-gray-500">{{activeState}}</p>
            </span>
            <span class="items-center hover:bg-gray-100 mb-5 w-full flex justify-between">
              <p class="cursor-pointer float-left text-xs text-black">Specialty</p>
              <p class="cursor-pointer float-right text-xs text-gray-500">{{type}}</p>
            </span>
            <span class="items-center hover:bg-gray-100 mb-5 w-full flex justify-between">
              <p class="cursor-pointer float-left text-xs text-black">Total Patients Seen</p>
              <p class="cursor-pointer float-right text-xs text-gray-500">0</p>
            </span>
            <span class="items-center hover:bg-gray-100 mb-5 w-full flex justify-between">
              <p class="cursor-pointer float-left text-xs text-black">Rating</p>
              <p class="cursor-pointer float-right text-xs text-gray-500"><star-rating :show-rating="false" v-model:rating="rating" :star-size="20" /></p>
            </span>
        </div>
        <div class="flex justify-end w-full mt-auto">
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
            Close
          </button>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import Modal from "@/components/practitionermodal.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import DragIcon from "@/components/icons/draggable.vue";
import Draggable from "vuedraggable";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import StarRating from 'vue-star-rating';
const copy = (original) => JSON.parse(JSON.stringify(original));
import { cornieClient } from "@/plugins/http";

export default {
  name: "ParticipantFilter",
  components: {
    Modal,
    DragIcon,
    ArrowLeftIcon,
    Draggable,
    IconInput,
    SearchIcon,
    StarRating
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
    profile:{
       type: Array,
      required: true,
      default: () => [],
    },
      name:{
        type:String,
        required: true,
        default: "",
    },
    profileId:{
      type:String,
       required: true,
      default: "",
    },
     activeState:{
      type:String,
       required: true,
      default: "",
    },
     type:{
      type:String,
       required: true,
      default: "",
    },
  },
  data() {
    return {
      columnsProxy: [],
      rating: 4,
      practitionerprofile:[]
    };
  },
  watch: {
    columns(val) {
      this.columnsProxy = copy(val);
    },
    visible() {
      const active = this.preferred.length > 0 ? this.preferred : this.columns;
      this.columnsProxy = copy([...active]);
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
     async viewProfile() {
      const SinglePractitioner = cornieClient().get(`/api/v1/schedule/practitioner/${this.profileId}`);
      const response = await Promise.all([SinglePractitioner]);
      this.practitionerprofile = response[0].data;
      return response[0].data
    }, 
    apply() {
      this.$emit("update:preferred", copy([...this.columnsProxy]));
      this.show = false;
    },
    reset() {
      this.$emit("update:preferred", copy([...this.columns]));
      this.show = false;
    },
  },
  mounted() {
      this.viewProfile();
    this.columnsProxy = copy([...this.columns]);
  },
  created(){
    this.viewProfile();
  }
};
</script>
