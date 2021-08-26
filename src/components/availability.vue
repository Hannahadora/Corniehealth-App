<template>
  <div class="overflow-y-auto bg-white">
    <modal
      :visible="visible"
      class="w-4/12 flex flex-col overflow-y-auto  mr-2"
    >
      <div class="flex w-full overflow-y-auto rounded-t-lg p-5">
        <span class="block pr-2 border-r-2">
          <arrow-left-icon
            class="stroke-current text-primary cursor-pointer"
            @click="show = false"
          />
        </span>
          <h2 class="font-bold text-lg text-primary ml-3 -mt-2">Availability </h2>
      </div>
      <div class="flex flex-col p-3 mb-7">
        <p class="text-sm mt-2">
         View Dr. Daniel Arubuike available times this week
        </p>
        <div class="my-5 border-2 p-3 border-gray-200 w-full flex-col flex">
            <span class="items-center hover:bg-gray-100 mb-4 w-full flex justify-between">
              <p class="cursor-pointer float-left text-xs text-black">Mon, 1st Feb</p>
              <p class="cursor-pointer float-right text-xs text-gray-500">9AM - 6PM</p>
            </span>
            <span class="items-center hover:bg-gray-100 mb-4 w-full flex justify-between">
              <p class="cursor-pointer float-left text-xs text-black">Mon, 1st Feb</p>
              <p class="cursor-pointer float-right text-xs text-gray-500">9AM - 6PM</p>
            </span>
            <span class="items-center hover:bg-gray-100 mb-4 w-full flex justify-between">
              <p class="cursor-pointer float-left text-xs text-black">Mon, 1st Feb</p>
              <p class="cursor-pointer float-right text-xs text-gray-500">9AM - 6PM</p>
            </span>
         <!-- <div v-for="(item,index) in columnsProxy" :key="index">
          </div>-->
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
import { string } from 'yup/lib/locale';
import { cornieClient } from "@/plugins/http";

const copy = (original) => JSON.parse(JSON.stringify(original));

export default {
  name: "ParticipantFilter",
  components: {
    Modal,
    DragIcon,
    ArrowLeftIcon,
    Draggable,
    IconInput,
    SearchIcon,
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
    practitionerId:{
      type:String,
    }
  },
  data() {
    return {
      columnsProxy: [],
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
    apply() {
      this.$emit("update:preferred", copy([...this.columnsProxy]));
      this.show = false;
    },
    reset() {
      this.$emit("update:preferred", copy([...this.columns]));
      this.show = false;
    },
     async viewAvialaibilty() {
      this.loading = true;
      // try {
      //   const response = await cornieClient().post(
      //     `/api/v1/schedule/practitioner/${this.practitionerId}`
      //   );
      //   if (response.success) {
      //   this.columnsProxy = response.data
      //   }
      // } catch (error) {
      //   this.loading = false;
      //   console.error(error);
      // }
    },
  },
  mounted() {
    this.columnsProxy = copy([...this.columns]);
    this.viewAvialaibilty();
  },
};
</script>
