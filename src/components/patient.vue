<template>
  <div class="overflow-y-auto bg-white">
    <modal
      :visible="visible"
      style="height: 95%"
      class="w-4/12 flex flex-col overflow-y-auto ml-auto mr-2"
    >
      <div class="flex w-full overflow-y-auto rounded-t-lg p-5">
        <span class="block pr-2 border-r-2">
          <arrow-left-icon
            class="stroke-current text-primary cursor-pointer"
            @click="show = false"
          />
        </span>
          <h2 class="font-bold text-lg text-primary ml-3 -mt-2">Patient</h2>
      </div>
      <div class="flex flex-col p-3">
        <p class="text-sm mt-2">
          Select preferred patient
        </p>
         <icon-input autocomplete="off" class="border border-gray-600 rounded-full focus:outline-none"  type="search" placeholder="Search" v-bind="$attrs" v-model="displayVal">
            <template v-slot:prepend>
              <search-icon />
            </template>
        </icon-input>
        <div class="my-2 border-2 w-full flex-col rounded-md flex">
          <div v-for="(item,index) in columnsProxy" :key="index">
            <span
              class="items-center w-full flex space-x-2"
             >
              <label class="my-3 p-3 border-gray-200 flex">
                    <input
                    v-model="indexvalue" 
                    :value="item"
                    @input="changed(item.id)"
                    type="checkbox"
                    class="bg-danger focus-within:bg-danger px-6 shadow"
                  />
              </label>
                    <p class="text-sm font-extrabold">{{item.firstname}} {{item.lastname}}</p>
            </span>
          </div> 
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
        </div>
      </div>
    </modal>
       <availability
            v-model:visible="availableFilter"
        />
        <profile
            v-model:visible="profileFilter"
        />
  </div>
</template>
<script>
import Modal from "@/components/practitionermodal.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import DragIcon from "@/components/icons/draggable.vue";
import Draggable from "vuedraggable";
import IconInput from "@/components/IconInput.vue";
import Availability from "@/components/availability.vue";
import Profile from "@/components/profile.vue";
import SearchIcon from "@/components/icons/search.vue";


const copy = (original) => JSON.parse(JSON.stringify(original));

export default {
  name: "ParticipantFilter",
  components: {
    Modal,
    DragIcon,
    ArrowLeftIcon,
    Draggable,
    Availability,
    IconInput,
    SearchIcon,
    Profile
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
    available: {
      type: Array,
      required: true,
      default: () => [],
    },
    
  },
  data() {
    return {
      columnsProxy: [],
       indexvalue: [],
      valueid: [],
      availableFilter: false,
      profileFilter:false
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
      this.$emit("update:preferred", copy([...this.indexvalue]), this.valueid);
      this.show = false;
    },
    reset() {
      this.$emit("update:preferred", copy([...this.columns]));
      this.show = false;
    },
    showAvailable(){
      this.availableFilter = true;
    },
    showProfile(){
        this.profileFilter = true;
    },
    changed(index){
      this.valueid.push(index);
    }
  },
  mounted() {
    this.columnsProxy = copy([...this.indexvalue]);
  },
};
</script>
