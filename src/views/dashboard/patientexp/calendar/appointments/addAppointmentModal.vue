<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            New Appointment
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
                 <cornie-select
                    :label="'Type'"
                    placeholder="--Select--"
                    class="w-full mt-4"
                />
                <cornie-input
                    label="Description"
                    class="w-full mb-5"
                    placeholder="--Enter--"
                />
               
            </div>
            <div class="w-full mt-5">
                <div class="flex w-full border-dashed border-b border-gray-100">
                    <div class="w-full">
                     <span class="text-sm font-bold">Patient</span>
                    </div>
                    <add-icon class="flex justify-end float-right cursor-pointer" @click="showPatient = true"/>
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
             <div class="w-full mt-2 mb-2">
                <div class="flex w-full border-dashed border-b border-gray-100">
                    <div class="w-full">
                     <span class="text-sm font-bold">Other Participants <span class="text-xs text-gray-500">(Optional)</span></span>
                    </div>
                    <add-icon class="flex justify-end float-right cursor-pointer" @click="showParticipant = true"/>
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
            <accordion-component :title="'Location'" :addborder="true" :opened="false">
                  <template v-slot:default>
                      <div class="w-full mt-5">
                            <span class="text-primary font-semibold text-xs ">Select where you’ll like appointment to be held</span>
                           <div class="w-full flex flex-wrap items-center py-5">
                                <div class="-mb-2">
                                    <cornie-radio
                                    :label="'Hospital/Clinic'"
                                    :value="'HospitalClinic'"
                                    name="practiceRegister"
                                    v-model="locationType"
                                    />
                                </div>
                                <div class="-mb-2 ml-4">
                                    <cornie-radio
                                    :label="'Virtual'"
                                    :value="'Virtual'"
                                    name="practiceRegister"
                                      v-model="locationType"
                                    />
                                </div>
                                <div class="ml-4 -mb-2">
                                    <cornie-radio
                                    :label="'At Home'"
                                    :value="'AtHome'"
                                    name="practiceRegister"
                                      v-model="locationType"
                                    />
                                </div>
                           </div>
                      </div>
                       <cornie-select
                            v-if="locationType == 'HospitalClinic'"
                            :items="['Days','Weeks','Months','Years']"
                            placeholder="--Select--"
                            :label="'Hospital/Clinic'"
                            class="w-full"
                        />
                         <cornie-input
                            v-if="locationType == 'Virtual'"
                            :label="'Link'"
                            placeholder="Paste meeting link"
                            class="w-full"
                        />
                        <cornie-input
                            v-if="locationType == 'AtHome'"
                            :label="'Address'"
                            placeholder="Enter address"
                            class="w-full"
                        />
                  </template>    
            </accordion-component>
            <div class="w-full mt-2 mb-2">
                <div class="flex w-full border-dashed border-b border-gray-100">
                    <div class="w-full">
                     <span class="text-sm font-bold cursor-pointer">Service <span class="text-gray-400 text-xs">(Optional)</span></span>
                    </div>
                    <add-icon class="flex justify-end float-right cursor-pointer" @click="showService = true"/>
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
  
            <accordion-component :addborder="true" :title="'Billing Type'" :opened="false">
                  <template v-slot:default>
                      <div class="w-full border-dashed border-b-2 pb-4 border-gray-100">
                        <div class="flex w-full">
                                <div class="w-full">
                                  <span class="text-xs text-gray-400 font-semibold">Insurance</span>    
                                </div>
                                <div class="w-full">
                                    <span class="text-xs flex justify-end w-full text-danger cursor-pointer" @click="showBilling = true">Change billing type</span>
                                </div>
                        </div>
                         <cornie-select
                                    v-if="showBilling"
                                    :label="'Change Billing Type'"
                                    placeholder="--Select--"
                                    class="w-full mt-4"
                            />
                      </div>
                      <text-area :label="'Comment'"  placeholder="Placeholder" class="w-full"/>
                        <div class="w-full">
                            <span class="text-sm text-primary font-semibold mb-5">Payment</span>
                            <div class="grid grid-cols-3 gap-1 mt-5">
                                <span class="border py-1 px-6 text-xs text-center border-gray-200 cursor-pointer rounded-lg" @click="showCollect = true">
                                    Collect payment
                                </span>
                                <span class="border py-1 px-6 text-center text-xs border-gray-200 cursor-pointer rounded-lg" @click="showShare = true">
                                    Share Pay Link
                                </span>
                                <span class="border py-1 px-6 text-center text-xs border-gray-200 cursor-pointer rounded-lg" @click="showBill = true">
                                    Share Bill
                                </span>
                                <span class="border py-1 px-6 text-center text-xs border-gray-200 cursor-pointer rounded-lg" @click="showPost = true">
                                    Post Claim
                                </span>

                            </div>
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
            Create
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
    </cornie-card>

        <patient-modal v-model="showPatient" />
        <participant-modal v-model="showParticipant"/>
        <services-modal v-model="showService"/>

        <collect-modal v-model="showCollect"/>
        <share-modal v-model="showShare"/>
        <post-modal v-model="showPost"/>
        <bill-modal v-model="showBill"/>
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
import CornieSelect from "@/components/autocomplete.vue";
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
import PatientModal from "./patients.vue";
import ParticipantModal from "./participants.vue";
import PhoneInput from "@/components/phone-input.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import TextArea from "@/components/textarea.vue";
import ServicesModal from "./services.vue";
import CollectModal from "./collectpayment.vue";
import ShareModal from "./sharepaylink.vue";
import PostModal from "./postclaim.vue";
import BillModal from "./sharebill.vue";


@Options({
  name: "appointmentModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    DatePicker,
    PatientModal,
    ParticipantModal,
    CollectModal,
    ShareModal,
    PostModal,
    AddIcon,
    BillModal,
    PhoneInput,
    CancelIcon,
    DeleteIcon,
    TextArea,
    TimePicker,
    CornieDialog,
    ServicesModal,
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
export default class appointmentModal extends Vue {
 @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  showPatient = false;
  locationType = "";
  showBilling = false;
  showParticipant = false;
  showService = false;

  showCollect = false;
  showShare = false;
  showPost = false;
  showBill = false;
 

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
