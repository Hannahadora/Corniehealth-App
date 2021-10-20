<template>
     <cornie-dialog v-model="show" center class="w-4/12  h-5/6">
    <cornie-card height="100%" class="flex flex-col">
     <cornie-card-title>
        <!-- <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn> -->
        <div class="w-full">
         <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">Add Actor</h2>

           <delete-icon
            class="text-danger fill-current cursor-pointer float-right"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
     
         <cornie-card-text class="flex-grow scrollable">
            <div class="w-full">
              <div class="border-dashed border-b-2">
                <cornie-select
                v-if="stepped == 1"
                  label="Select"
                 :items="['Patient','Practitioner','Device','Location','Healthcare Services']"
                  v-model="actorType"
                  class="w-full"
                  placeholder="--Select--"
                >
                </cornie-select>
              </div>
                 <div class="mt-4 mb-4">
                        <p class="text-gray-400 text-xs">{{total}} selected</p>
                    </div>
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
            <div class="" v-if="stepped == 1">
                <div  v-if="actorType == 'Practitioner'">
                    <div v-for="(input, index) in practitioners" :key="index">
                    <div class="flex justify-between space-x-4 w-full mt-2 p-3">
                        <div class="w-full dflex space-x-4">
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
                    
                        
                        <div class="w-full mb-5 cursor-pointer w-full text-xs text-danger">
                            <input
                                type="checkbox"
                                v-model="updatePractitioners" :value="input"
                                class="bg-danger focus-within:bg-danger px-6 shadow float-right"
                            />
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
                          class="
                            mr-2
                            object-cover object-center
                            w-full
                            h-full
                            visible
                            group-hover:hidden
                          "
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
                     <div class="w-full mb-5 cursor-pointer w-full text-xs text-danger">
                            <input
                                type="checkbox"
                                 v-model="updateDevices" :value="input"
                                class="bg-danger focus-within:bg-danger px-6 shadow float-right"
                            />
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div  v-if="actorType == 'Practitioner Role'">
                <div v-for="(input, index) in practitionerRoles" :key="index">
                  <div class="grid grid-cols-2 gap-4 w-full col-span-full p-3">
                    <div class="dflex space-x-4">
                      <div class="w-10 h-10">
                          <avatar class="mr-2"  :src="localSrc" />
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
                    <div class="w-full mb-5 cursor-pointer w-full text-xs text-danger">
                            <input
                                type="checkbox"
                                  v-model="updateDevices" :value="input"
                                class="bg-danger focus-within:bg-danger px-6 shadow float-right"
                            />
                    </div>
                  </div>
                </div>
              </div> -->
              <div v-if="actorType == 'Patient'">
                <div v-for="(input, index) in patients" :key="index">
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
                          {{ input.firstname }} {{ input.lastname }}
                        </p>
                      </div>
                    </div>
                     <div class="w-full mb-5 cursor-pointer w-full text-xs text-danger">
                            <input
                                type="checkbox"
                                  v-model="updatePatients" :value="input"
                                class="bg-danger focus-within:bg-danger px-6 shadow float-right"
                            />
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
                      <div class="w-full mb-5 cursor-pointer w-full text-xs text-danger">
                            <input
                                type="checkbox"
                                  v-model="updateLocation" :value="input"
                                class="bg-danger focus-within:bg-danger px-6 shadow float-right"
                            />
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
                       <div class="w-full mb-5 cursor-pointer w-full text-xs text-danger">
                            <input
                                type="checkbox"
                                  v-model="updateHealthcare" :value="input"
                                class="bg-danger focus-within:bg-danger px-6 shadow float-right"
                            />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full" v-if="stepped == 2">
                <div v-if="actorType == 'Practitioner'">
                       <cornie-select
                        class="w-full mb-2"
                        :rules="required"
                        :items="['Type']"
                        v-model="type"
                        label="Type"
                        placeholder="--Select--"
                      >
                      </cornie-select>

                      <div class="w-full flex space-x-2 mb-5">
                          <input
                          checked
                            v-model="requiredPractitioner"
                            type="checkbox"
                            class="bg-danger focus-within:bg-danger px-6 shadow"
                          />
                          <p class="text-sm">Required</p>
                      </div>
                    
                      <date-picker
                      class="w-full mb-5 mt-4"
                        label="period"
                        v-model="periodPractitioner"
                        :rules="required"
                      />
                      <cornie-select
                        class="w-full mt-4"
                        :rules="required"
                        :items="[
                          'Out-Patient',
                          ' In-Patient',
                          ' Virtual',
                          'HomeCare',
                        ]"
                        v-model="consultationMediumPractitioner"
                        label="consultation medium"
                        placeholder="--Select--"
                      >
                      </cornie-select>
                </div>
                 <div v-if="actorType == 'Patient'">
                       <cornie-select
                        class="w-full mb-2"
                        :rules="required"
                        :items="['Type']"
                        v-model="type"
                        label="Type"
                        placeholder="--Select--"
                      >
                      </cornie-select>

                      <div class="w-full flex space-x-2 mb-5">
                          <input
                          checked
                            v-model="requiredPatient"
                            type="checkbox"
                            class="bg-danger focus-within:bg-danger px-6 shadow"
                          />
                          <p class="text-sm">Required</p>
                      </div>
                    
                      <date-picker
                      class="w-full mb-5 mt-4"
                        label="period"
                        v-model="periodPatient"
                        :rules="required"
                      />
                      <cornie-select
                        class="w-full mt-4"
                        :rules="required"
                        :items="[
                          'Out-Patient',
                          ' In-Patient',
                          ' Virtual',
                          'HomeCare',
                        ]"
                        v-model="consultationMediumPatient"
                        label="consultation medium"
                        placeholder="--Select--"
                      >
                      </cornie-select>
                </div>
                 <div v-if="actorType == 'Practitioner Role'">
                       <cornie-select
                        class="w-full mb-2"
                        :rules="required"
                        :items="['Type']"
                        v-model="type"
                        label="Type"
                        placeholder="--Select--"
                      >
                      </cornie-select>

                      <div class="w-full flex space-x-2 mb-5">
                          <input
                          checked
                            v-model="apatient.required"
                            type="checkbox"
                            class="bg-danger focus-within:bg-danger px-6 shadow"
                          />
                          <p class="text-sm">Required</p>
                      </div>
                    
                      <date-picker
                      class="w-full mb-5 mt-4"
                        label="period"
                        v-model="apatient.period"
                        :rules="required"
                      />
                      <cornie-select
                        class="w-full mt-4"
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
                </div>
                 <div v-if="actorType == 'Device'">
                       <cornie-select
                        class="w-full mb-2"
                        :rules="required"
                        :items="['Type']"
                        v-model="type"
                        label="Type"
                        placeholder="--Select--"
                      >
                      </cornie-select>

                      <div class="w-full flex space-x-2 mb-5">
                          <input
                          checked
                            v-model="requiredDevice"
                            type="checkbox"
                            class="bg-danger focus-within:bg-danger px-6 shadow"
                          />
                          <p class="text-sm">Required</p>
                      </div>
                    
                      <date-picker
                      class="w-full mb-5 mt-4"
                        label="period"
                        v-model="periodDevice"
                        :rules="required"
                      />
                      <cornie-select
                        class="w-full mt-4"
                        :rules="required"
                        :items="[
                          'Out-Patient',
                          ' In-Patient',
                          ' Virtual',
                          'HomeCare',
                        ]"
                        v-model="consultationMediumDevice"
                        label="consultation medium"
                        placeholder="--Select--"
                      >
                      </cornie-select>
                </div>
                 <div v-if="actorType == 'Location'">
                       <cornie-select
                        class="w-full mb-2"
                        :rules="required"
                        :items="['Type']"
                        v-model="type"
                        label="Type"
                        placeholder="--Select--"
                      >
                      </cornie-select>

                      <div class="w-full flex space-x-2 mb-5">
                          <input
                          checked
                            v-model="requiredLocation"
                            type="checkbox"
                            class="bg-danger focus-within:bg-danger px-6 shadow"
                          />
                          <p class="text-sm">Required</p>
                      </div>
                    
                      <date-picker
                      class="w-full mb-5 mt-4"
                        label="period"
                        v-model="periodLocation"
                        :rules="required"
                      />
                      <cornie-select
                        class="w-full mt-4"
                        :rules="required"
                        :items="[
                          'Out-Patient',
                          ' In-Patient',
                          ' Virtual',
                          'HomeCare',
                        ]"
                        v-model="consultationMediumLocation"
                        label="consultation medium"
                        placeholder="--Select--"
                      >
                      </cornie-select>
                </div>
                 <div v-if="actorType == 'Healthcare Services'">
                       <cornie-select
                        class="w-full mb-2"
                        :rules="required"
                        :items="['Type']"
                        v-model="type"
                        label="Type"
                        placeholder="--Select--"
                      >
                      </cornie-select>

                      <div class="w-full flex space-x-2 mb-5">
                          <input
                          checked
                            v-model="requiredHealthcare"
                            type="checkbox"
                            class="bg-danger focus-within:bg-danger px-6 shadow"
                          />
                          <p class="text-sm">Required</p>
                      </div>
                    
                      <date-picker
                      class="w-full mb-5 mt-4"
                        label="period"
                        v-model="periodHealthcare"
                        :rules="required"
                      />
                      <cornie-select
                        class="w-full mt-4"
                        :rules="required"
                        :items="[
                          'Out-Patient',
                          ' In-Patient',
                          ' Virtual',
                          'HomeCare',
                        ]"
                        v-model="consultationMediumHealthcare"
                        label="consultation medium"
                        placeholder="--Select--"
                      >
                      </cornie-select>
                </div>

            </div>
         
         </cornie-card-text>

       <cornie-card>
        <cornie-card-text class="flex justify-end">
        <div class="flex justify-end w-full mt-auto" v-if="stepped == 1">
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
            @click="next(2)"
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
            Next
          </button>
        </div>
         <div class="flex justify-end w-full mt-auto" v-if="stepped == 2">
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
            @click="back()"
          >
            Back
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
        </cornie-card-text>
       </cornie-card>
    
     
    </cornie-card>
    </cornie-dialog>
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
import DeleteIcon from "@/components/icons/cancel.vue";
import IconInput from "@/components/IconInput.vue";
import Availability from "@/components/availability.vue";
import Profile from "@/components/profile.vue";
import SearchIcon from "@/components/icons/search.vue";
import Avatar from "@/components/avatar.vue";
import { cornieClient } from "@/plugins/http";
import CornieSelect from "@/components/cornieselect.vue";
import CornieCheckbox from "@/components/corniecheckbox.vue";
import { useHandleImage } from "@/composables/useHandleImage";
import DatePicker from "@/components/daterangepicker.vue";
import CornieRadio from '@/components/cornieradio.vue';
import Period from "@/types/IPeriod";
const copy = (original) => JSON.parse(JSON.stringify(original));


export default {
  name: "actors",
  components: {
      ...CornieCard,
      DeleteIcon,
    Modal,
    DragIcon,
    CornieSelect,
    CornieCheckbox,
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
    CornieRadio
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
     actorType:{
      type: String,
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
      selected:0,
      stepped:1,
      localSrc: require('../../../../assets/img/placeholder.png'),
          columnsProxy: [],
      indexvalue:[],
      practitionerId:"",
      patientId:"",
      deviceId:"",
      locationId:"",
      healthId:"",
      updatePractitioners:[],
        updatePatients:[],
        updateDevices:[],
         updateHealthcare:[],
          updateLocation:[],
     requiredPractitioner: false,
        consultationMediumPractitioner: "",
        periodPractitioner:{
            start:"",
            end:""
        },
         requiredPatient: false,
        consultationMediumPatient: "",
        periodPatient:{
            start:"",
            end:""
        },
         requiredDevice: false,
        consultationMediumDevice: "",
        periodDevice:{
            start:"",
            end:""
        },
         requiredLocation: false,
        consultationMediumLocation: "",
        periodLocation:{
            start:"",
            end:""
        },
         requiredHealthcare: false,
        consultationMediumHealthcare: "",
        periodHealthcare:{
            start:"",
            end:""
        },
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
      total(){
          return this.updateHealthcare.length + this.updateDevices.length + this.updatePatients.length + this.updatePractitioners.length + this.updateLocation.length;  
      },
   getPractitioner(){
       return {
        id: this.practitionerId,
        required: this.requiredPractitioner,
        consultationMedium: this.consultationMediumPractitioner,
        period: this.periodPractitioner
       }
   },
   getPatient(){
       return {
        id: this.patientId,
        required: this.requiredPatient,
        consultationMedium: this.consultationMediumPatient,
        period: this.periodPatient
       }
   },
   getLocation(){
       return {
        id: this.locationId,
        required: this.requiredLocation,
        consultationMedium: this.consultationMediumLocation,
        period: this.periodLocation
       }
   },
   getHealthcare(){
       return {
        id: this.healthId,
        required: this.requiredHealthcare,
        consultationMedium: this.consultationMediumHealthcare,
        period: this.periodHealthcare
       }
   },
   getDevice(){
       return {
        id: this.deviceId,
        required: this.requiredDevice,
        consultationMedium: this.consultationMediumDevice,
        period: this.periodDevice
       }
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
   
    next(i) {
      this.stepped = i;
    },
     back() {
      this.stepped >= 0 && (this.stepped -= 1);
    },
   
    apply() {
      this.$emit("show:modal",this.updatePractitioners,this.updatePatients,this.updateDevices,this.updateLocation,this.updateHealthcare,this.getPractitioner,this.getPatient,this.getLocation,this.getDevice,this.getHealthcare);
    this.show=false;
    },
  
     select(i) {
      this.selected = i;
    },
  
  },
//   mounted() {
//     this.columnsProxy = copy([...this.indexvalue]);
//   },
  created(){
     
  }
};
</script>
<style scoped>
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
