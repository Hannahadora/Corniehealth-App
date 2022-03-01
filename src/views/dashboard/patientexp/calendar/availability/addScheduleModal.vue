<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            New Availability
          </h2>
          <!-- <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          /> -->
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
            <div class="flex space-x-2 w-full pb-2 mb-5 border-gray-300">
                <select-option/>
                <span class="text-dark text-sm font-medium  mt-2">Make available for online appointment booking.</span>
            </div>
            <div class="border-b-2 border-dashed border-gray-100">
                <cornie-input
                    label="Name"
                    class="w-full mb-5"
                    placeholder="--Enter--"
                />
                <cornie-input
                    label="Description"
                    class="w-full mb-5"
                    placeholder="--Enter--"
                
                />
                <cornie-select
                    :label="'Location'"
                    placeholder="--Select--"
                    class="w-full mt-4"
                />
            </div>
            <accordion-component :title="'Group'" :addborder="true" :opened="false">
                  <template v-slot:default>
                       <div class="mt-5">
                       <cornie-select
                            :label="'Category'"
                            placeholder="--Select--"
                            class="w-full"
                        />
                          <cornie-select
                            :label="'Specialty(s)'"
                            placeholder="--Select--"
                            class="w-full"
                        />
                          <cornie-select
                            :label="'Sub-Specialtys)'"
                            placeholder="--Select--"
                            class="w-full"
                        />
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
                       />
                       <div class="grid grid-cols-2 gap-4">
                           <time-picker
                             label="Start Time"
                            placeholder="00:00"
                            class="w-full"
                           />
                           <time-picker
                             label="End Time"
                            placeholder="00:00"
                            class="w-full"
                           />
                       </div>
                       <span class="font-bold text-blue-700 text-xs cursor-pointer">Repeat</span>
                            <div class="flex space-x-2">
                                <cornie-input
                                    :rules="required"
                                    placeholder="Every"
                                    class="grow"
                                />
                                <cornie-select
                                    :items="['Days','Weeks','Months','Years']"
                                    placeholder="Days"
                                    class="w-32 mt-0.5 flex-none"
                                    :setPrimary="true"
                                />
                            </div>
                            <div class="italic text-xs -mt-4 mb-5">Event will occur every 3 days</div>
                        <div class="col-span-12">
                            <span class="text-primary text-sm font-semibold mb-5"> Select Days </span>
                            <div class="grid grid-cols-7 gap-4 w-full mt-4">
                                <div :class="{'active' : isActiveMon}" @click="setActive('mon')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                                Mon
                                </div>
                                <div :class="{'active' : isActiveTue}" @click="setActive('tue')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                                Tue
                                </div>
                                <div :class="{'active' : isActiveWed}" @click="setActive('wed')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                                Wed
                                </div>
                                <div :class="{'active' : isActiveThu}" @click="setActive('thu')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                                Thu
                                </div>
                                <div :class="{'active' : isActiveFir}" @click="setActive('fri')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                                Fri
                                </div>
                                <div :class="{'active' : isActiveSat}" @click="setActive('sat')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                                Sat
                                </div>
                                <div :class="{'active' : isActiveSun}" @click="setActive('sun')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                                Sun
                                </div>

                            </div>
                        </div>
                        <div class="w-full mt-4">
                            <span class="text-primary font-semibold text-sm ">End Repeat</span>
                           <div class="w-full flex flex-wrap items-center py-5">
                                <div class="-mb-2">
                                    <cornie-radio
                                    :label="'Never'"
                                    :value="'Never'"
                                    name="practiceRegister"
                                    />
                                </div>
                                <div class="-mb-2 ml-4">
                                    <cornie-radio
                                    :label="'After'"
                                    :value="'After'"
                                    name="practiceRegister"
                                    />
                                </div>
                                <div class="ml-4 -mb-2">
                                    <cornie-radio
                                    :label="'Calender Date'"
                                    :value="'CalenderDate'"
                                    name="practiceRegister"
                                    />
                                </div>
                           </div>
                        </div>
                         <div class="flex space-x-2">
                            <cornie-input
                            :rules="required"
                            placeholder="20"
                            class="grow"
                            />
                            <cornie-input
                                style="width: 8rem !important;"
                                placeholder="Events"
                                class="mt-0.5 flex-none"
                                :setPrimary="true"
                            />
                         </div>
                         <div class="italic text-xs -mt-4 mb-5">Event will end after 20 events</div>
                        <div>
                            <date-picker
                                label="Start Date"
                                placeholder="--/04/2021"
                                class="w-full"
                            />
                            <span class="text-xs">Event will end on 23/04/2022</span>
                        </div>
                       </div>
                  </template>    
            </accordion-component>
            <div class="w-full mt-2">
                <div class="flex w-full border-dashed border-b border-gray-100">
                    <div class="w-full">
                     <span class="text-sm font-bold">Actors</span>
                    </div>
                    <add-icon class="flex justify-end float-right cursor-pointer" @click="showActorModal = true"/>
                </div>
                  <!-- <div class="w-full flex space-x-7 mt-4" v-for="(item, index) in newspecials.practitioners" :key="index">
                    
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
                    <delete-icon class="fill-current text-danger cursor-pointer" @click="deleteItem(item.id)"/>
                </div> -->
            </div>
            <div class="w-full mt-3 mb-2">
                <div class="flex w-full border-dashed border-b border-gray-100">
                    <div class="w-full">
                     <span class="text-sm font-bold">Service <span class="text-gray-400 text-xs">(Optional)</span></span>
                    </div>
                    <add-icon class="flex justify-end float-right cursor-pointer" @click="showServiceModal = true"/>
                </div>
                  <!-- <div class="w-full flex space-x-7 mt-4" v-for="(item, index) in newspecials.practitioners" :key="index">
                    
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
                    <delete-icon class="fill-current text-danger cursor-pointer" @click="deleteItem(item.id)"/>
                </div> -->
            </div>
              <accordion-component :title="'Break'" :addborder="true" :grayCaption="true" :opened="false">
                  <template v-slot:default>
                      <div class="mt-5">
                        <cornie-select
                            :items="['Days','Weeks','Months','Years']"
                            placeholder="Select"
                            class="w-full"
                            :label="'Break Type'"
                        />
                         <cornie-input
                            :rules="required"
                            placeholder="Enter"
                            class="w-full"
                            :label="'Description'"
                        />
                         <div class="grid grid-cols-2 gap-4">
                           <time-picker
                             label="Start Time"
                            placeholder="00:00"
                            class="w-full"
                           />
                           <time-picker
                             label="End Time"
                            placeholder="00:00"
                            class="w-full"
                           />
                       </div>
                       <span class="text-sm text-danger font-semibold my-5"><span class="text-lg">+</span> Add</span>   
                        
                       </div>
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
            Save
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
      
      <actor-modal v-model="showActorModal"/>
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
import SelectOption from "@/components/custom-checkbox.vue";
import TimePicker from "@/components/Timepicker.vue";
import CornieRadio from "@/components/cornieradio.vue";
import AddIcon from "@/components/icons/add-orange.vue";
import { useHandleImage } from "@/composables/useHandleImage";
import { reactive } from "@vue/reactivity";
import { createDate } from "@/plugins/utils";
import { string, date } from "yup";
import { useCountryStates } from "@/composables/useCountryStates";
import PhoneInput from "@/components/phone-input.vue";
import IDirector from "@/types/IDirector";
import DeleteIcon from "@/components/icons/delete.vue";
import ActorModal from "./actors.vue";
import ServicesMdoal from "./services.vue";

const kyc = namespace("kyc");

@Options({
  name: "scheduleModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    DatePicker,
    AddIcon,
    ServicesMdoal,
    PhoneInput,
    CancelIcon,
    DeleteIcon,
    TimePicker,
    CornieDialog,
    ActorModal,
    SearchIcon,
    CornieRadio,
    AccordionComponent,
    IconInput,
    CornieInput,
    CornieSelect,
    CornieBtn,

    SelectOption
  },
})
export default class scheduleModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  showActorModal = false;
  showServiceModal = false;
 

  created() {
    //this.setImpression();
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
</style>
