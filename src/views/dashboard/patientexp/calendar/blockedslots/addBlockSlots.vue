<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
           Event
          </h2>
          <!-- <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          /> -->
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
            <div class="border-b-2 border-dashed border-gray-100">
                <auto-complete
                    class="w-full"
                    placeholder="--Select--"
                    label="Type"
                    :items="dropdowns.serviceType"
                    v-model="type"
                    :rules="required"
                />
                <cornie-input
                    label="Name"
                    class="w-full mb-5"
                    v-model="name"
                    placeholder="--Enter--"
                />
                <cornie-input
                    label="Description"
                    class="w-full mb-5"
                    placeholder="--Enter--"
                    v-model="description"
                
                />
                <cornie-input
                    label="Capacity"
                    class="w-full mb-5"
                    placeholder="--Enter--"
                    :type="'number'"
                    v-model="capacity"
                
                />
                 <div class="w-full mt-4">
                    <span class="text-primary font-semibold text-sm ">Waitlist</span>
                    <div class="w-full flex flex-wrap items-center py-5">
                        <div class="-mb-2">
                            <cornie-radio
                            :label="'Yes'"
                            :value="true"
                            v-model="hasWaitList"
                            name="sWaitList"
                            />
                        </div>
                        <div class="-mb-2 ml-4">
                            <cornie-radio
                            :label="'No'"
                            :value="false"
                             v-model="hasWaitList"
                            name="practiceRegister"
                            />
                        </div>
                    </div>
                    <cornie-input
                        v-if="hasWaitList == 'Yes'"
                        label="Set threshold"
                        class="w-full mb-5"
                        placeholder="--Enter--"
                        v-model="waitListCapacity"
                    
                    />
                </div>
                 <div class="w-full mt-4">
                    <span class="text-primary font-semibold text-sm ">Select Location Type</span>
                    <div class="w-full flex flex-wrap items-center py-5">
                        <div class="-mb-2">
                            <cornie-radio
                            :label="'Physical'"
                            :value="'Physical'"
                            v-model="location"
                            name="location"
                            />
                        </div>
                        <div class="-mb-2 ml-4">
                            <cornie-radio
                            :label="'Virtual'"
                            :value="'Virtual'"
                            v-model="location"
                            name="practiceRegister"
                            />
                        </div>
                    </div>
                     <cornie-select
                        v-if="location == 'Physical'"
                        :label="'Select Location'"
                        placeholder="--Select--"
                        class="w-full mt-4"
                        v-model="bookingLocationId"
                       :items="allLocations"
                    />
                     <cornie-input
                        v-if="location == 'Virtual'"
                        label="Link"
                        class="w-full mb-5"
                        placeholder="Paste meeting link"
                        v-model="meetingLink"
                    
                    />
                </div>
            </div>
            <accordion-component :title="'Group'" :addborder="true" :opened="false">
                  <template v-slot:default>
                       <div class="mt-5">
                            <div>
                                <span class="text-sm font-semibold mb-1">Specialty(s)</span>
                                <Multiselect
                                v-model="specialties"
                                mode="multiple"
                                :searchable = true
                                :options="allSpecialities"
                                :clear-on-select="false"
                                label-prop="display"
                                value-prop="code"
                                trackBy="display"
                                label="display"
                                placeholder="--Select--"
                                class="w-full"
                                >
                                <template v-slot:tag="{ option, handleTagRemove, disabled }">
                                    <div class="multiselect-tag is-user">
                                    {{ option.display }}
                                    <span
                                        v-if="!disabled"
                                        class="multiselect-tag-remove"
                                        @mousedown.prevent="handleTagRemove(option, $event)"
                                    >
                                        <span class="multiselect-tag-remove-icon"></span>
                                    </span>
                                    </div>
                                </template>
                                <template v-slot:option="{ option }">
                                    <select-option :value="option.display" :label="option.display"/>
                                </template>
                                </Multiselect>
                            </div>
                            <div class="-mt-7">
                                <span class="text-sm font-semibold mb-1">Sub-Specialtys(s)</span>
                                <Multiselect
                                v-model="subspecialties"
                                mode="multiple"
                                :searchable = true
                                :options="allSpecialities"
                                :clear-on-select="false"
                                label-prop="display"
                                value-prop="code"
                                trackBy="display"
                                label="display"
                                placeholder="--Select--"
                                class="w-full"
                                >
                                <template v-slot:tag="{ option, handleTagRemove, disabled }">
                                    <div class="multiselect-tag is-user">
                                    {{ option.display }}
                                    <span
                                        v-if="!disabled"
                                        class="multiselect-tag-remove"
                                        @mousedown.prevent="handleTagRemove(option, $event)"
                                    >
                                        <span class="multiselect-tag-remove-icon"></span>
                                    </span>
                                    </div>
                                </template>
                                <template v-slot:option="{ option }">
                                    <select-option :value="option.display" :label="option.display"/>
                                </template>
                                </Multiselect>
                            </div>
                       </div>
                  </template>    
            </accordion-component>
             <accordion-component :title="'Period'" :addborder="true" :opened="false">
                  <template v-slot:default>
                      <div class="mt-5">

                       <date-picker
                        label="Start Date"
                        placeholder="--/04/2021"
                        class="w-full"
                         v-model="startDate"
                       />
                       <div class="grid grid-cols-2 mt-5 gap-4">
                           <time-picker
                             label="Start Time"
                            placeholder="00:00"
                            class="w-full"
                            v-model="startTime"
                           />
                           <time-picker
                             label="End Time"
                            placeholder="00:00"
                            class="w-full"
                            v-model="endTime"
                           />
                       </div>
                    <div class="-mt-10">
                        <span class="font-bold text-blue-700 text-xs cursor-pointer" @click="showRepeat = !showRepeat" >Repeat</span>
                       </div>
                        <div class="flex space-x-2" v-if="showRepeat">
                            <cornie-input
                                :rules="required"
                                placeholder="Every"
                                class="grow w-full"
                                v-model="repeat.interval"
                            />
                            <cornie-select
                                :items="['day','week','month','year']"
                                placeholder="Days"
                                class="w-32 mt-0.5 flex-none"
                                :setPrimary="true"
                                v-model="repeat.intervalUnit"
                            />
                        </div>
                        <div class="italic text-xs -mt-4 mb-5" v-if="showRepeat && repeat.intervalUnit == 'day'">Event will occur every {{ repeat.interval }} {{ repeat.intervalUnit }}</div>
                        <div class="col-span-12" v-if="showRepeat && repeat.intervalUnit == 'week'">
                            <span class="text-primary text-xs font-semibold mb-2"> Select Days </span>
                            <div class="grid grid-cols-7 gap-4 w-full mt-4">
                                <div :class="{'active' : isActiveMon}" @click="setActive('monday')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                                Mon
                                </div>
                                <div :class="{'active' : isActiveTue}" @click="setActive('tuesday')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                                Tue
                                </div>
                                <div :class="{'active' : isActiveWed}" @click="setActive('wednesday')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                                Wed
                                </div>
                                <div :class="{'active' : isActiveThu}" @click="setActive('thursday')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                                Thu
                                </div>
                                <div :class="{'active' : isActiveFri}" @click="setActive('friday')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                                Fri
                                </div>
                                <div :class="{'active' : isActiveSat}" @click="setActive('saturday')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                                Sat
                                </div>
                                <div :class="{'active' : isActiveSun}" @click="setActive('sunday')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                                Sun
                                </div>

                            </div>
                        </div>
                        <div class="w-full mt-4" v-if="showRepeat">
                            <div class="text-primary font-semibold mt-5 text-xs" >End Repeat</div>
                           <div class="w-full flex flex-wrap items-center py-5" >
                                <div class="-mb-2">
                                    <cornie-radio
                                    :label="'Never'"
                                    :value="'Never'"
                                    name="repeat"
                                    v-model="repeattype"
                                    />
                                </div>
                                <div class="-mb-2 ml-4">
                                    <cornie-radio
                                    :label="'After'"
                                    :value="'After'"
                                    name="repeat"
                                     v-model="repeattype"
                                    />
                                </div>
                                <div class="ml-4 -mb-2">
                                    <cornie-radio
                                    :label="'Calender Date'"
                                    :value="'CalenderDate'"
                                    name="repeat"
                                     v-model="repeattype"
                                    />
                                </div>
                           </div>
                        </div>
                         <div class="flex space-x-2" v-if="repeattype =='After'">
                            <cornie-input
                            :rules="required"
                            placeholder="20"
                            class="grow"
                             v-model="repeat.end.value"
                            />
                             <cornie-select
                                :items="['events','date']"
                                placeholder="Days"
                                class="w-32 mt-0.5 flex-none"
                                :setPrimary="true"
                                v-model="repeat.end.type"
                            />
                         </div>
                        <div class="italic text-xs -mt-4 mb-5" v-if="repeattype =='After'">Event will end after {{ repeat.end.value }} events</div>
                        <div class="mt-2" v-if="repeattype =='CalenderDate'">
                            <date-picker
                                placeholder="--/04/2021"
                                class="w-full"
                                v-model="endDate"
                            />
                            <span class="text-xs">Event will end on {{ endDate }}</span>
                        </div>

                       </div>
                  </template>    
            </accordion-component>
               <accordion-component :title="'Booking'" :addborder="true" :grayCaption="true" :opened="false">
                  <template v-slot:default>
                      <!-- <div class="grid grid-cols-2 gap-4">
                           <date-time
                                label="Start Date/time"
                                width="w-full"
                            />
                            <date-time
                                label="End Date/time"
                                width="w-full"
                            />

                      </div> -->
                       <div class="flex space-x-2 w-full mt-4 mb-7 pb-4 border-b-2 border-dashed border-gray-100">
                            <cornie-select
                                :items="['Practitioner']"
                                placeholder="--Select--"
                                class="w-40"
                                @selected="showActorModal = true"
                            />
                            <div class="w-full">
                            <span class="mb-2 w-full rounded-full">
                                <icon-input
                                autocomplete="off"
                                class="border border-gray-600 py-2 -mt-2 rounded focus:outline-none"
                                type="search"
                                placeholder="Search"
                                v-model="query"
                                >
                                <template v-slot:prepend>
                                    <search-icon />
                                </template>
                                </icon-input>
                            </span>
                            </div>
                        </div>
                        <div class="w-full flex space-x-7 my-5" v-for="(item, index) in practitoners" :key="index">
                            <div class="w-full dflex space-x-4 mb-3">
                                <div class="w-10 h-10">
                                    <avatar
                                        class="mr-2"
                                        v-if="item.image"
                                        :src="item.image"
                                    />
                                    <avatar class="mr-2" v-else :src="localSrc" />
                                </div>
                                <div class="w-full">
                                    <p class="text-xs text-dark font-medium">
                                        {{ item.firstName }}
                                        {{ item.lastName }}
                                    </p>
                                    <p class="text-xs text-gray-500 font-meduim">
                                    {{ item.jobDesignation }}
                                    {{ item.department }}
                                </p>
                                </div>
                            </div>
                            <delete-icon class="fill-current text-danger cursor-pointer" @click="deletePractitionerItem(item.id,index)"/>
                        </div>
                        <text-area :label="'Comment'" v-model="comments" placeholder="Placeholder" class="w-full"/>
                    
                  </template>    
            </accordion-component>

        </v-form>
      </cornie-card-text>
      
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="submit"
            class="text-white bg-danger px-6 rounded-xl"
           >
            Create
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
      
      <actors-modal v-model="showActorModal" @practitioner-data="practitionerdata" :id="id" :practitionerId="practitionerId"/>
      <services-mdoal v-model="showServiceModal"/>
    </cornie-card>
  </cornie-dialog>


</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { cornieClient } from "@/plugins/http";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "../components/accordion.vue";
import DatePicker from "@/components/datepicker.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import { namespace } from "vuex-class";
import ISchedule,{Break, Repeat, Slot} from "@/types/ISchedule";
import SelectOption from "@/components/custom-checkbox.vue";
import TimePicker from "@/components/pickerTime.vue";
import CornieRadio from "@/components/cornieradio.vue";
import AddIcon from "@/components/icons/add-orange.vue";
import DateTime from "@/components/date-time-picker.vue";
import PhoneInput from "@/components/phone-input.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import ILocation from "@/types/ILocation";
import ISpecial from "@/types/ISpecial";
import Multiselect from "@vueform/multiselect";
import ActorsModal from "./practitioners.vue";
import IPractitioner from "@/types/IPractitioner";
import AutoComplete from "@/components/autocomplete.vue";
import Avatar from "@/components/avatar.vue";
import TextArea from "@/components/textarea.vue";

const location = namespace("location");
const special = namespace("special");
const schedulesStore = namespace("schedules");
const dropdown = namespace("dropdown");
const user = namespace("user");

@Options({
  name: "blockslotsModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    DatePicker,
    AddIcon,
    PhoneInput,
    DateTime,
    CancelIcon,
    TextArea,
    DeleteIcon,
    TimePicker,
    ActorsModal,
    CornieDialog,
    SearchIcon,
    AutoComplete,
    CornieRadio,
    Multiselect,
    Avatar,
    AccordionComponent,
    IconInput,
    CornieInput,
    CornieSelect,
    CornieBtn,

    SelectOption
  },
})
export default class blockslotsModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;

   @special.State
  specials!: ISpecial[];

  @special.Action
  fetchSpecials!: () => Promise<void>;

  @schedulesStore.Action
  getSlotById!: (id: string) => Promise<Slot>;

  @user.State
  currentLocation!: string;

    dropdowns = {} as IIndexableObject;

    @dropdown.Action
    getDropdowns!: (a: string) => Promise<IIndexableObject>;

  showActorModal = false;
  showServiceModal = false; 
  loading = false;
  showRepeat = false;
  isActiveMon = false;
  isActiveTue = false;
  isActiveWed = false;
  isActiveThu = false;
  isActiveFri = false;
  isActiveSat = false;
  isActiveSun = false;

  location = "";
 Waitlist = "";
   practitoners: IPractitioner[]  = [];


 date = "2022-03-10";
 description = "";
 status = "";
 active = false;
 capacity = 0;
 hasWaitList = false;
 comments = "";
  repeat = {
    end:{} as any,
    days:[] as any
  } as any;

 type = "";
 name = "";
 locationId = "";
 meetingLink = null;
 specialtyId = "";
 specialties = [] as any;
  subspecialties = [] as any;
  startDate = "";
  startTime = "";
  endTime = "";
  endDate = "";
  practitonerId = [] as any;
  waitListCapacity = 0;
  repeattype = "";
  bookingLocationId = null;



  @Watch("id")
  idChanged() {
    this.setEvent();
  }


  async setEvent() {
    const event = await this.getSlotById(this.id);
    if (!event) return;
    this.name = event.name;
    this.description = event.description;
    this.specialties = event.specialties;
    this.subspecialties = event.subspecialties;
    this.startDate = event.startDate;
    this.startTime = event.startTime;
    this.endTime = event.endTime;
    this.endDate = event.endDate;
    this.practitoners = event.participatingPractitioners;
    this.repeat = event.repeat;
    this.capacity = event.capacity;
    this.hasWaitList = event.hasWaitList;
    this.comments = event.comments;
    this.meetingLink = event.meetingLink;
    this.waitListCapacity = event.waitListCapacity;


  }

get payload(){
  return {
    name: this.name,
    date:this.date,
    type:this.type,
    description: this.description,
    locationId: this.locationId,
    specialties: this.specialties,
    subspecialties: this.subspecialties,
    startDate: this.startDate,
    startTime: this.startTime,
    endTime: this.endTime,
    endDate: this.endDate,
    participatingPractitioners: this.practitonerId,
    repeat:this.repeat,
    capacity:this.capacity,
    hasWaitList:this.hasWaitList,
    comments:this.comments,
    meetingLink:this.meetingLink,
    waitListCapacity:this.waitListCapacity,
    bookingLocationId: this.bookingLocationId

  }
}

   get allLocations() {
    if (!this.locations || this.locations.length === 0) return [];
    return this.locations.map((i: any) => {
      return {
        code: i.id,
        display: i.name,
      };
    });
  }
  get allSpecialities() {
    if (!this.specials || this.specials.length === 0) return [];
    return this.specials.map((i: any) => {
      return {
        code: i.id,
        display: i.name,
      };
    });
  }

    setActive(item:string){
    if (item == 'monday'){
      this.isActiveMon = !this.isActiveMon;
      this.repeat.days.push('monday');
    } else if (item == 'tuesday'){
       this.repeat.days.push('tuesday');
      this.isActiveTue = !this.isActiveTue;
    } else if (item == 'wednesday'){
       this.repeat.days.push('wednesday');
      this.isActiveWed = !this.isActiveWed;
    } else if ( item == 'thursday'){
      this.repeat.days.push('thursday');
      this.isActiveThu = !this.isActiveThu;
    } else if ( item == 'friday'){
       this.repeat.days.push('friday');
      this.isActiveFri = !this.isActiveFri;
    } else if (item == 'saturday'){
      this.repeat.days.push('saturday');
      this.isActiveSat = !this.isActiveSat;
    } else {
       this.repeat.days.push('sunday');
      this.isActiveSun = !this.isActiveSun;
    }
  }

 practitionerdata(value:any,valueId:any){
      this.practitoners = value;
      this.practitonerId = valueId;
  }

async deletePractitionerItem(value:string,index:number) {
      const confirmed = await window.confirmAction({
        message: "You are about to delete this practitioner details",
        title: "Delete practitioner details",
      });
      if (!confirmed) return;
      if(this.id){
        try {
        const response = await cornieClient().delete(
          `/api/v1/schedule/remove-practitioners/${this.id}`,
           [value]
        );
        if(response.success){
            // this.done();
          window.notify({ msg: "practitioner details deleted", status: "success" });
        }
        } catch (error) {
          window.notify({ msg: "practitioner details not deleted", status: "error" });
        }
      }else {
         this.practitoners.splice(index, 1);
      }
  }

   async submit() {
    this.loading = true;
    if (this.id) await this.updateEvent();
    else await this.createEvent();
    this.loading = false;
  }

  async createEvent() {

    this.payload.locationId = this.currentLocation;
    try {
      const response = await cornieClient().post(
        "/api/v1/schedule/slot",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Event created", status: "success" });
        this.done();
      }
    } catch (error:any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }

  async updateEvent() {

    const url = `/api/v1/schedule/slot/${this.id}`;
    const payload = { ...this.payload, id: this.id };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Event updated", status: "success" });
       this.show = false;
      }
    } catch (error) {
      window.notify({ msg: "Event not updated", status: "error" });
    }
  }

  done(){
    this.$emit("event-added");
    this.show = false;
  }


 async created() {
     this.getDropdowns("availability");
     this.fetchLocations();
    this.fetchSpecials();

     const data = await this.getDropdowns("availability");
    this.dropdowns = data;
  }
}
</script>

<style>
.border-r-0 {
    border-right-width: 0px !important;
}
.border-l-0 {
    border-left-width: 0px !important;
}
.active{
  background: #080056;
  border: 1px solid #080056;
  color: #fff;
}
</style>
