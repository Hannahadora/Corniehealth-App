<template>
    <div class="bg-white">
        <modal
        :visible="visible"
        class="w-4/12 flex flex-col  mr-2"
        >
            <div class="flex w-full rounded-t-lg p-5">
            <span class="block pr-2 border-r-2">
            <arrow-left-icon
                class="stroke-current text-primary cursor-pointer"
                @click="show = false"
            />
            </span>
             <div class="w-full">
            <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-2">Item </h2>
              <cancel-icon class="float-right cursor-pointer" @click="show = false"/>
             </div>
            </div>
            <div class="flex flex-col p-3 mb-7 h-96">
                <div class="border-b-2 pb-3 border-dashed">
                    <label for="ecounter" class="flex capitalize mb-5 mt-5 text-black text-xs font-bold">status
                    </label>
                    <div class="w-full flex space-x-4">
                        <cornie-radio  label="Condition"  class="text-xs" name="practice" v-model="check" :checked="check" @click="setValue('Condition')"/>
                        <cornie-radio label="Observation"  class="text-xs" name="role" v-model="check2" :checked="check2"  @click="setValue('Observation')"/>
                         <cornie-radio label="Media"  class="text-xs" name="role" v-model="check4" :checked="check4"  @click="setValue('Media')"/>
                    </div>
                </div>
                <div class="w-full mt-4">
                    <div class="relative bottom-2">
                    <icon-input
                        autocomplete="off"
                        class="
                        border border-gray-200
                        h-10
                        w-full
                        rounded-full
                        focus:outline-none
                        "
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
                        <div  v-if="conditionFilter">
                            <!-- <div v-for="(input, index) in conditions" :key="index"> --> 
                                    <div class="w-full mt-2 p-3  hover:bg-gray-100 cursor-pointer"  @click="getValue(input)">
                                        <div class="w-full">
                                            <div class="w-full">
                                                <p class="text-sm text-dark mb-1 font-medium">
                                            [Identifier]
                                                </p>
                                            <p class="text-xs text-gray-300">04/09/2021, 19:45</p>
                                            </div>
                                        </div>
                                    </div>
                                <!-- </div> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-end pb-6 px-2">
                <div class="flex justify-end w-full mt-auto" v-if="conditionFilter">
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
                    @click="apply()"
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
                <div class="flex justify-end w-full mt-auto" v-if="allergyFilter">
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
                    @click="apply()"
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
    </div>
</template>
<script>
import { setup} from "vue-class-component";
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
import CornieRadio from '@/components/cornieradio.vue';
import Period from "@/types/IPeriod";
import { initial } from 'lodash';
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
    CornieRadio
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
    selected:{
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
     allergy: {
      type: Array,
       required: true,
      default: () => [],
    },

  },
  data() {
    return {
      selected:0,
      localSrc: require('../../../../assets/img/placeholder.png'),
        check: true,
         check2: false,
         check4:false,
         check3: {
           practitioners:[{
               name: "",
               date:""
           }]
         },
      Patients: [],
      Practitioners: [],
        Devices:[],
      activeState:"",
      practitionerType:"",
      columnsProxy: [],
      indexvalue:[],
      checkProblem: [],
       checkProblemdate: [],
      checkProblems:{
          code: "",
          date:""
      },
      type:'Condition',
      conditionFilter:true,
      allergyFilter:false,
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
    setValue(value) {
    if (value == "Condition") {
        this.check = true;
           this.check2 = false;
      this.conditionFilter = true;
    this.allergyFilter = false;
          this.type = value;
    }else if(value == 'Allergy'){
          this.check2 = true;
        this.check = false;
        this.allergyFilter = true;
          this.conditionFilter = false;
        this.type = value;
    }
     },
         changed(index,intital){
        console.log(index);
         this.assesorPractitionerValue = index;
        const newvalue = this.assesorPractitionerValue;
        if (index === this.assesorPractitionerValue && this.assesorRoleValue.length > 0){
            this.assesorRoleValue.splice(intital, 1);
        }
        else {
            this.assesorRoleValue.push(this.assesorPractitionerValue)
            console.log("this.assesorPractitionerValue")
              console.log(this.assesorPractitionerValue)
        }
       
      //this.valueid.push(index);
    },
     getValue(value){
         this.checkProblem = value;
     },
    apply() {
      this.$emit("update:preferred", this.checkProblem,this.type);
      this.show = false;
     
    },
     select(i) {
      this.selected = i;
    },

    
  },
  mounted() {
    this.columnsProxy = copy([...this.indexvalue]);
  },
  created(){
    this.setValue();
  }
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
.hide{
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
