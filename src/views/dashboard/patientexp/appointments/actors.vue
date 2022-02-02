<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <h2 class="font-bold text-lg text-primary ml-3 -mt-2">Add Actor(s)</h2>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <p class="text-sm mb-4 mt-2">Add Actor(s) to this appointment</p>
        <div class="grid grid-cols-2 gap-4 w-full">
          <div>
            <cornie-select
              :onChange="setValue"
              :items="['Patient', 'Practitioner', 'Device']"
              v-model="type"
              class="rounded"
              placeholder="--Select--"
            >
            </cornie-select>
          </div>
          <div class="relative bottom-2">
            <icon-input
              autocomplete="off"
              class="border border-gray-200 h-10 w-full rounded focus:outline-none"
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
        <div>
          <div class="bg-gray-100">
            <div v-if="practitionerFilter">
              <div v-for="(input, index) in practitioners" :key="index">
                <div v-if="practionerId != input.id">
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

                    <!-- <p
                      class="cursor-pointer pl-12 w-full text-xs text-danger"
                      @click="availableFilter = true">
                      View Availability
                    </p> -->
                    <p
                      class="cursor-pointer float-right justify-end flex w-full text-xs mt-3  text-danger"
                      @click="
                        showProfile(
                          input.id,
                          input.firstName,
                          input.lastName,
                          input.type,
                          input.activeState,
                          input.image
                        )"
                    >
                      View Profile
                    </p>
                    <cornie-radio
                      v-model="newIndexvaluepractitioner"
                      :value="input"
                      @input="changed(input.id)"
                      @click="apractitioner.practitionerId = input.id"
                      name="practioner"
                      class="bg-danger mb-5 focus-within:bg-danger px-6 shadow"
                    />
                  </div>
                  <div class="w-full p-3" v-if="singleId == input.id">
                    <cornie-select
                      class="required w-full"
                      :rules="required"
                      :items="['Required', 'Information Only', 'Optional']"
                      v-model="apractitioner.required"
                      label="required"
                      placeholder="--Select--"
                    >
                    </cornie-select>
                    <date-picker
                      class="w-full mb-5"
                      label="period"
                      v-model="apractitioner.period"
                      :rules="required"
                    />
                    <cornie-select
                      class="required w-full"
                      :rules="required"
                      :items="[
                        'Out-Patient',
                        ' In-Patient',
                        ' Virtual',
                        'HomeCare',
                      ]"
                      v-model="apractitioner.consultationMedium"
                      label="consultation medium"
                      placeholder="--Select--"
                    >
                    </cornie-select>
                    <div class="pb-5">
                      <!-- <span class=" float-right cursor-pointer text-danger text-xs font-semibold"  v-if="Practitioners[index] && Practitioners[index].practitionerId" @click="clearActor('Practitioner',index)">Clear Actor</span>
                        <span class=" float-right cursor-pointer text-danger text-xs font-semibold" v-else @click="applyActor('Practitioner',index)">Add Actor</span> -->
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="practitioners.length === 0">
                <span class="text-center py-3 px-5"
                  >Practitioners Loading
                </span>
              </div>
            </div>
          </div>
          <div class="bg-gray-100" v-if="deviceFilter">
            <div v-for="(input, index) in devices" :key="index">
              <div class="flex space-x-10 w-full justify-between p-3">
                <div class="dflex space-x-4">
                  <div class="w-10 h-10">
                    <avatar
                      class="mr-2 object-cover object-center w-full h-full visible group-hover:hidden"
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
                <cornie-radio
                  v-model="newIndexvaluedevice"
                  :value="input"
                  @input="changed(input.id)"
                   @click="adevice.deviceId = input.id"
                  name="device"
                  class="bg-danger float-right focus-within:bg-danger px-6 shadow"
                />
              </div>
              <div class="w-full p-3" v-if="singleId == input.id">
                <!-- <cornie-select
                        :onChange="setValue"
                        class="required w-full"
                        :rules="required"
                        :items="['Type']"
                        v-model="adevice.type"
                        label="TYPE"
                        placeholder="--Select--"
                      >
                      </cornie-select> -->

                <!-- <div class="w-full flex space-x-2 mb-5">
                          <input
                          checked
                            v-model="adevice.required"
                            type="checkbox"
                            class="bg-danger focus-within:bg-danger px-6 shadow"
                          />
                          <p class="text-sm">Required</p>
                      </div> -->
                <cornie-select
                  class="required w-full"
                  :rules="required"
                  :items="['Required', 'Information Only', 'Optional']"
                  v-model="adevice.required"
                  label="required"
                  placeholder="--Select--"
                >
                </cornie-select>
                <date-picker
                  class="w-full mb-5"
                  label="period"
                  v-model="adevice.period"
                  :rules="required"
                />
                <cornie-select
                  class="required w-full"
                  :rules="required"
                  :items="[
                    'Out-Patient',
                    ' In-Patient',
                    ' Virtual',
                    'HomeCare',
                  ]"
                  v-model="adevice.consultationMedium"
                  label="consultation medium"
                  placeholder="--Select--"
                >
                </cornie-select>
                <div class="pb-5">
                  <!-- <span class=" float-right cursor-pointer text-danger text-xs font-semibold"  v-if="Devices[index] && Devices[index].deviceId" @click="clearActor('Device',index)">Clear Actor</span>
                      <span class=" float-right cursor-pointer text-danger text-xs font-semibold" v-else @click="applyActor('Device',index)">Add Actor</span> -->
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-100" v-if="roleFilter">
            <div v-for="(input, index) in roles" :key="index">
              <div class="grid grid-cols-2 gap-4 w-full col-span-full p-3">
                <div class="dflex space-x-4">
                  <div class="w-10 h-10">
                    <avatar
                      class="mr-2"
                      :src="'@/assets/img/placeholder.png'"
                    />
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
                <cornie-radio
                  v-model="newIndexvalue"
                  :value="input"
                  @input="changed(input.id)"
                  name="role"
                  class="bg-danger ml-16 focus-within:bg-danger px-6 shadow"
                />
                <!-- <input
                      v-model="indexvalue"
                      :value="input"
                      @input="changed(input.id)"
                      type="checkbox"
                      class="bg-danger ml-32 focus-within:bg-danger px-6 shadow"
                    />-->
              </div>
            </div>
          </div>
          <div class="bg-gray-100" v-if="patientFilter">
            <div v-for="(input, index) in patients" :key="index">
              <div class="flex space-x-10 w-full justify-between p-3">
                <div class="dflex space-x-4">
                  <div class="w-10 h-10">
                    <avatar class="mr-2" :src="localSrc" />
                  </div>
                  <div class="w-full">
                    <p class="text-xs text-dark font-semibold">
                      {{ input.firstname }} {{ input.lastname }}
                    </p>
                  </div>
                </div>
                <cornie-radio
                  v-model="newIndexvaluepatient"
                  :value="input"
                  @input="changed(input.id)"
                  @click="apatient.patientId = input.id"
                  name="patients"
                  class="bg-danger float-right focus-within:bg-danger px-6 shadow"
                />
              </div>
              <div class="w-full p-3" v-if="singleId == input.id">
                <!-- <cornie-select
                        :onChange="setValue"
                        class="required w-full"
                        :rules="required"
                        :items="['Type']"
                        v-model="apatient.type"
                        label="TYPE"
                        placeholder="--Select--"
                      >
                      </cornie-select> -->
                <!-- <cornie-select
                        class="required w-full"
                        :rules="required"
                        :items="['Required', 'Information Only', 'Optional']"
                        v-model="apatient.required"
                        label="required"
                        placeholder="--Select--"
                      >
                      </cornie-select> -->
                <!-- <div class="w-full flex space-x-2 mb-5">
                          <input
                          checked
                            v-model="apatient.required"
                            type="checkbox"
                            class="bg-danger focus-within:bg-danger px-6 shadow"
                          />
                          <p class="text-sm">Required</p>
                      </div> -->
                <cornie-select
                  class="required w-full"
                  :rules="required"
                  :items="['Required', 'Information Only', 'Optional']"
                  v-model="apatient.required"
                  label="required"
                  placeholder="--Select--"
                >
                </cornie-select>

                <date-picker
                  class="w-full mb-5"
                  label="period"
                  v-model="apatient.period"
                  :rules="required"
                />
                <cornie-select
                  class="required w-full"
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
                <div class="pb-5">
                  <!-- <span class=" float-right cursor-pointer text-danger text-xs font-semibold"  v-if="Patients[index] && Patients[index].patientId" @click="clearActor('Patient',index)">Clear Actor</span>
                      <span class=" float-right cursor-pointer text-danger text-xs font-semibold" v-else @click="applyActor('Patient',index)">Add Actor</span> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </cornie-card-text>

      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <div
            class="flex justify-end w-full mt-auto"
            v-if="practitionerFilter"
          >
            <button
              class="rounded mt-5 py-2 px-3 border border-primary focus:outline-none hover:opacity-90 w-1/3 mr-2 text-primary font-semibold"
              @click="show = false"
            >
              Cancel
            </button>
            <button
              @click="apply('Practitioner')"
              class="bg-danger rounded text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90 w-1/3"
            >
              Add
            </button>
          </div>
          <div class="flex justify-end w-full mt-auto" v-if="deviceFilter">
            <button
              class="rounded mt-5 py-2 px-3 border border-primary focus:outline-none hover:opacity-90 w-1/3 mr-2 text-primary font-semibold"
              @click="show = false"
            >
              Cancel
            </button>
            <button
              @click="apply('Device')"
              class="bg-danger rounded text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90 w-1/3"
            >
              Add
            </button>
          </div>
          <div class="flex justify-end w-full mt-auto" v-if="roleFilter">
            <button
              class="rounded mt-5 py-2 px-3 border border-primary focus:outline-none hover:opacity-90 w-1/3 mr-2 text-primary font-semibold"
              @click="show = false"
            >
              Cancel
            </button>
            <button
              @click="apply('Role')"
              class="bg-danger rounded text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90 w-1/3"
            >
              Add
            </button>
          </div>
          <div class="flex justify-end w-full mt-auto" v-if="patientFilter">
            <button
              class="rounded mt-5 py-2 px-3 border border-primary focus:outline-none hover:opacity-90 w-1/3 mr-2 text-primary font-semibold"
              @click="show = false"
            >
              Cancel
            </button>
            <button
              @click="apply('Patient')"
              class="bg-danger rounded text-white mt-5 py-2 px-3 focus:outline-none hover:opacity-90 w-1/3"
            >
              Add
            </button>
          </div>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
   <availability
    v-model="availableFilter"
    :available="available"
    :name="practitionername"
    :practitionerId="singleId"
  />
  <profile
    v-model="profileFilter"
    :profile="practitioners"
    :name="practitionername"
    :activeState="activeState"
    :type="practitionerType"
    :profileId="singleId"
    :image="image"
  />
 
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
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
import { useHandleImage } from "@/composables/useHandleImage";
import DatePicker from "@/components/daterangepicker.vue";
import CornieRadio from "@/components/cornieradio.vue";
import Period from "@/types/IPeriod";

@Options({
  name: "actors",
  components: {
    ...CornieCard,
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
    CornieRadio,
  },
})
export default class Actors extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  practionerId!: string;


  @Prop({ type: String, default: "" })
  appointmentId!: string;

  // @Prop({ type: Boolean, default: false })
  // visible: boolean;

  // @Prop({ type: Boolean, default: false })
  // showPartcipants: boolean;


  // @Prop({ type: Array, default: () => [] })
  // available!: object;

  @Prop({ type: Array, default: () => [] })
  columns!: object;

  @Prop({ type: Array, default: () => [] })
  preferred!: object;

  @Prop({ type: Array, default: () => [] })
  practitioners!: object;

  @Prop({ type: Array, default: () => [] })
  devices!: object;

  @Prop({ type: Array, default: () => [] })
  roles!: object;

  @Prop({ type: Array, default: () => [] })
  patients!: object;


    selected = 0;
      localSrc = require("../../../../assets/img/placeholder.png");
      participantDetail = {
        consultationMedium: "",
        period: "",
        required: "",
      };
      image="";
       singlePracId = "";
      apractitioner = {
        required: false,
        consultationMedium: "",
        period: "",
        id:"",
        practitionerId:"",
      } as any;
      apatient = {
        required: false,
        consultationMedium: "",
        period: "",
        id:"",
        patientId:"",
      } as any;
      adevice = {
        required: false,
        consultationMedium: "",
        period: "",
        id: "",
        deviceId:""
      } as any;
      Patients = [];
      Practitioners = [];
      Devices = [];
      activeState = "";
      practitionerType = "";
      columnsProxy = [];
      indexvalue = [];
      indexvaluepractitioner = [];
      indexvaluepatient = [];
      indexvaluedevice = [];
      newIndexvaluepractitioner = {};
      newIndexvaluedevice = {};
      newIndexvaluepatient = {};
      valueid = [];
      practitionerprofile = [];
      available = [];
     
      type = "Practitioners";
      singleId = "";
      availableFilter = false;
      practitionername = "";
      profileFilter = false;
      practitionerFilter = true;
      deviceFilter = false;
      patientFilter = false;
      roleFilter = false;
      practitionerId = "";

  setValue() {
      if (this.type == "Practitioner") {
        this.practitionerFilter = true;
        this.patientFilter = false;
        this.deviceFilter = false;
        this.roleFilter = false;
      } else if (this.type == "Patient") {
        this.patientFilter = true;
        this.deviceFilter = false;
        this.roleFilter = false;
        this.practitionerFilter = false;
      } else if (this.type == "Device") {
        this.deviceFilter = true;
        this.practitionerFilter = false;
        this.patientFilter = false;
        this.roleFilter = false;
      } else if (this.type == "Practitioner Role") {
        this.roleFilter = true;
        this.practitionerFilter = false;
        this.patientFilter = false;
        this.deviceFilter = false;
      }
    }
    async reset(value:string) {
      if (value == "Practitioner") {
        this.apractitioner = { ...this.Practitioners };
      } else if (value == "Patient") {
        this.apatient = { ...this.Patients };
      } else if (value == "Device") {
        this.adevice = { ...this.Devices };
      }
    }
 
    apply(value:string) {
      // this.applyActor(value);
      console.log(this.indexvaluepractitioner,"VALUES")
      this.$emit(
        "update:preferred",
        [this.newIndexvaluepractitioner],
       [ this.newIndexvaluepatient],
        [this.newIndexvaluedevice],
        value,
        [this.apractitioner],
        [this.apatient],
        [this.adevice],
        this.singleId
      );
      this.indexvalue = [];
      this.valueid = [];
      // this.value = [];
      this.show = false;
    }
    showAvailable(value:string, firstname:string, lastname:string) {
      this.singleId = value;
      this.availableFilter = true;
      this.practitionername = firstname + " " + lastname;
      // this.viewAvialaibilty();
    }
    showProfile(value:string, firstname:string, lastname:string, type:string, state:string,image:string) {
      this.singleId = value;
      this.profileFilter = true;
      this.practitionername = firstname + " " + lastname;
      this.practitionerType = type;
      this.activeState = state;
      this.image = image;

      // this.viewProfile();
    }
    select(i:any) {
      this.selected = i;
    }
    changed(index:string) {
      this.singleId = index;
      if (this.type == "Practitioner") {
        this.singlePracId = index;
      }
      //this.valueid.push(index);
    }
    async viewAvialaibilty() {
      if(this.singlePracId == ''){
        this.singlePracId = this.practionerId;
      }
      const SinglePractitioner = cornieClient().get(
        `/api/v1/schedule/practitioner/${this.singlePracId}`
      );
      const response = await Promise.all([SinglePractitioner]);
      this.available = response[0].data;
    }
    // async viewProfile() {
    //   const SinglePractitioner = cornieClient().get(
    //     `/api/v1/schedule/practitioner/${this.apractitioner.practitionerId}`
    //   );
    //   const response = await Promise.all([SinglePractitioner]);
    //   this.practitionerprofile = response[0].data;
    //   return response[0].data;
    // }
    // async viewAppointemnt() {
    //   try {
    //     const response = await cornieClient().get(
    //       "/api/v1/appointment",
    //       this.appointmentId
    //     );
    //     if (response.success) {
    //       this.columnsProxy = response.data;
    //     }
    //   } catch (error) {
    //     this.show = false;
    //     console.error(error);
    //   }
    // }

   mounted() {
   // this.viewAppointemnt();
  }
  async created() {
    await this.viewAvialaibilty();
    this.setValue();
  }
}



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
