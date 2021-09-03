<template>
  <div class="overflow-y-auto bg-white">
    <modal
      :visible="visible"
      style="height: 95%"
      class="w-4/12 flex flex-col overflow-y-auto ml-auto mr-2 bg-transparent"
    >
      <div class="flex w-full overflow-y-auto rounded-t-lg p-5">
        <span class="block pr-2 border-r-2">
          <arrow-left-icon
            class="stroke-current text-primary cursor-pointer"
            @click="show = false"
          />
        </span>
          <h2 class="font-bold text-lg text-primary ml-3 -mt-2">Medication</h2>
      </div>
      <span class="text-danger text-xs p-3 uppercase float-right font-semibold mb-4">0 added</span>
       <accordion-component class="shadow-none rounded-none border-none  text-primary" title="Medication Details" v-model="openedS">
               <div class="w-full mt-5 pb-5">
                  <cornie-select
                  class="w-full"
                    :items="['']"
                    label="medication code"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="w-full"
                    :items="['']"
                    label="medication reference"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="required w-full"
                    :rules="required"
                    :items="['Continuous','Acute','Seasonal']"
                    label="course of therapy type"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="required w-full"
                    :rules="required"
                    :items="['']"
                    label="dosage instruction"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                   <cornie-select
                   class="required w-full"
                    :rules="required"
                    :items="['']"
                    label="initial fill"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                   <cornie-select
                   class="required w-full"
                    :rules="required"
                    :items="['']"
                    label="quantity"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <date-picker  placeholder="autofill" label="Duration"  class="mb-5 w-full"/>
                </div>
        </accordion-component>
        <accordion-component class="shadow-none rounded-none border-none  text-primary" title="Refill Info" v-model="openedS">
              <div class="w-full mt-5 pb-5">
                <date-picker  placeholder="autofill" label="dispense interval"  class="w-full mb-5 required"
                    :rules="required"/>

                  <cornie-select
                   class="required w-full"
                    :rules="required"
                    :items="['']"
                    label="number of repeats allowed"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="required w-full"
                    :rules="required"
                    :items="['']"
                    label="quantity"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="required w-full"
                    :rules="required"
                    :items="['']"
                    label="expected supply duration"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                </div>
        </accordion-component>
        <accordion-component class="shadow-none rounded-none  border-none  text-primary" title="Substitution Allowed" v-model="openedS">
              <div class="w-full mt-5 pb-5">
                  <cornie-select
                    class="required w-full"
                    :rules="required"
                    :items="['']"
                    label="Code"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                  <cornie-select
                   class="w-full"
                    :items="['']"
                    label="reason"
                    placeholder="--Select--"
                  >
                  </cornie-select>
                </div>
        </accordion-component>
       <span class="text-danger text-xs p-3 uppercase float-right font-semibold mt-4">Add</span>

      <div class="mt-16 mb-4">   
        <div class="grid grid-cols-2 p-3">
          <p class="text-sm font-semibold text-black">Amlodipine</p>
          <div class="w-full flex flex-wrap float-right justify-between">
            <span><d-edit class="text-primary fill-current ml-20"/></span> 
            <span><c-delete class=" text-danger fill-current" /></span> 
          </div>
        </div>
        <div class="grid grid-cols-2 p-3">
          <p class="text-sm font-semibold text-black">Paracetamol</p>
          <div class="w-full flex flex-wrap float-right justify-between">
            <span><d-edit class="text-primary fill-current ml-20"/></span> 
            <span><c-delete class=" text-danger fill-current" /></span> 
          </div>
        </div>
        <div class="grid grid-cols-2 p-3">
          <p class="text-sm font-semibold text-black">Quinine</p>
          <div class="w-full flex flex-wrap float-right justify-between">
            <span><d-edit class="text-primary fill-current ml-20"/></span> 
            <span><c-delete class=" text-danger fill-current" /></span> 
          </div>
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
            Save
          </button>
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
import DEdit from "@/components/icons/aedit.vue";
import CDelete from "@/components/icons/adelete.vue";
import IconInput from "@/components/IconInput.vue";
import Availability from "@/components/availability.vue";
import Profile from "@/components/profile.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "./accordion-medication-list.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import DatePicker from "@/components/daterangepicker.vue";

const copy = (original) => JSON.parse(JSON.stringify(original));

export default {
  name: "ParticipantFilter",
  components: {
    Modal,
    DragIcon,
    CornieInput,
    CornieSelect,
    DEdit,
    AccordionComponent,
    DatePicker,
    ArrowLeftIcon,
    Draggable,
    CDelete,
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
      openedS: false,
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
<style scoped>
.bg-gray-50{
  background: #ffffff !important;
}
</style>
