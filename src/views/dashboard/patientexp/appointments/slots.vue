<template>
   <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">

      
     <cornie-card-title>
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
          <h2 class="font-bold text-lg text-primary ml-3 -mt-2">Select slot</h2>
      </cornie-card-title>

    
         <cornie-card-text class="flex-grow scrollable">
            <p class="text-sm mb-4 mt-2">Select a time slot for this appointment</p>
            <p class="text-xs text-gray-300 mb-5">Available time slots</p>
            <div class="grid grid-cols-2 gap-4 w-full">
                <div v-for="(input, index) in columnsProxy" :key="index">
                    <cornie-radio
                        v-bind:value="input"
                        :label="input.startTime +'-'+ input.endTime"
                        class="text-xs"
                        name="request"
                        v-model="indexvalue"
                    />
                </div>
            </div>
         </cornie-card-text>
         
        <cornie-card>
        <cornie-card-text class="flex justify-end">
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
                  @click="apply('Practitioner')"
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
        </cornie-card-text>
        </cornie-card>
    </cornie-card>
   </cornie-dialog>
</template>
<script>
import { setup} from "vue-class-component";
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
import moment from 'moment';
import { cornieClient } from "@/plugins/http";
import CornieRadio from '@/components/cornieradio.vue';
import CornieSelect from "@/components/cornieselect.vue";
import CornieCheckbox from "@/components/corniecheckbox.vue";
import { useHandleImage } from "@/composables/useHandleImage";
const copy = (original) => JSON.parse(JSON.stringify(original));

export default {
  name: "slots",
  components: {
    ...CornieCard,
    CornieDialog,
    CornieIconBtn,
    Modal,
    CornieRadio,
    DragIcon,
    CornieSelect,
    CornieCheckbox,
    ArrowLeftIcon,
    Draggable,
    Availability,
    IconInput,
    SearchIcon,
    Profile,
    Avatar
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
    showPartcipants:{
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
    options: {
        hour: 'numeric',
        hour12: true
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
      columnsProxy: [],
      indexvalue: [],
      valueid: [],
      type:'Patient',
      singleId:"",
      availableFilter: false,
      profileFilter:false,
      practitionerFilter:true,
      deviceFilter:false,
      patientFilter:false,
      roleFilter:false,
      practitionerId: "",
      slots:"",
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
      moment: function () {
    return moment();
  },
    apply(value) {
      this.$emit("update:preferred",  this.indexvalue);
      this.show = false;
     
    },
    reset() {
      this.$emit("update:preferred", copy([...this.columns]));
      this.show = false;
      this.showPartcipants = false;
    },
    showAvailable(){
      this.availableFilter = true;
    },
    showProfile(){
        this.profileFilter = true;
    },
    changed(index){
      if(this.setValue == 'Practitioner'){
          this.singleId = index;
      }
      this.valueid.push(index);
    },
  },
  mounted() {
    this.columnsProxy = copy([...this.indexvalue]);
  },
};
</script>
<style scoped>
.dflex {
  display: -webkit-box;
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
    background-color: #FE4D3C;
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
    border: 1px solid #FE4D3C;
}
</style>
