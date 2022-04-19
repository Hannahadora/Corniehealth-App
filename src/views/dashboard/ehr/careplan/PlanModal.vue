<template>
  <cornie-dialog v-model="show" right class="w-8/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
          New Care Partner
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
         <v-form ref="form">
            <div  class="border-b-2 pb-5 border-dashed border-gray-200">
                <accordion-component :title="'Basic Info'"  :opened="true">
                    <template v-slot:default>
                        <div class="grid grid-cols-2 gap-4 w-full mt-5">
                            <cornie-select
                                class="required"
                                :items="[
                                    'Draft',
                                    'Active',
                                    'On Hold',
                                    'Revoked',
                                    'Completed',
                                    'Entered in errir',
                                ]"
                            label="Based on"
                            v-model="basedOn"
                            placeholder="--Select--">
                            </cornie-select>
                            <cornie-select
                                class="required"
                                :items="[
                                    'Draft',
                                    'Active',
                                    'On Hold',
                                    'Revoked',
                                    'Completed',
                                    'Entered in errir',
                                ]"
                            label="status"
                            v-model="status"
                            placeholder="--Select--">
                            </cornie-select>
                             <div class="w-full mt-2">
                                <span class="text-sm font-semibold mb-4">Intent</span>
                                <div class="flex space-x-4 w-full mt-5">
                                    <cornie-radio :label="'Proposal'" :value="'proposal'" v-model="intent" name="intent"/>
                                    <cornie-radio :label="'Plan'" :value="'plan'" v-model="intent" name="intent"/>
                                    <cornie-radio :label="'Order'" :value="'order'" v-model="intent" name="intent"/>
                                    <cornie-radio :label="'Option'" :value="'Option'" v-model="intent" name="intent"/>
                                </div>             
                            </div> 
                            <cornie-select
                                class="required"
                                :items="[
                                    'Draft',
                                    'Active',
                                    'On Hold',
                                    'Revoked',
                                    'Completed',
                                    'Entered in errir',
                                ]"
                                label="Category"
                                v-model="category"
                                placeholder="--Select--">
                            </cornie-select>
                            <cornie-input v-model="title" :label="'Title'" placeholder="Enter"/>
                            <cornie-select
                                class="required"
                                :items="[
                                    'Draft',
                                    'Active',
                                    'On Hold',
                                    'Revoked',
                                    'Completed',
                                    'Entered in errir',
                                ]"
                                label="Author"
                                v-model="author"
                                placeholder="--Select--">
                            </cornie-select>
                             <date-time-picker
                                v-model:date="startDate"
                                v-model:time="startTime"
                                label="Start Date/Time"
                                width="w-full"
                            />
                            <date-time-picker
                                v-model:date="endDate"
                                v-model:time="endTime"
                                label="End Date/Time"
                                width="w-full"
                            />
                        </div>
                      
                    </template>
                </accordion-component>
            </div>
            <div  class="border-b-2 pb-5 border-dashed border-gray-200">
                <accordion-component :title="'Activity'"  :opened="false">
                    <template v-slot:default>
                        <div class="grid grid-cols-2 gap-4 w-full mt-5">
                            <cornie-select
                                class="required"
                                :items="[
                                    'Draft',
                                    'Active',
                                    'On Hold',
                                    'Revoked',
                                    'Completed',
                                    'Entered in errir',
                                ]"
                            label="Outcome"
                            v-model="outcome"
                            placeholder="--Select--">
                            </cornie-select>
                            <cornie-select
                                class="required"
                                :items="[
                                    'Draft',
                                    'Active',
                                    'On Hold',
                                    'Revoked',
                                    'Completed',
                                    'Entered in errir',
                                ]"
                            label="Outcome Reference"
                            v-model="outcomeReference"
                            placeholder="--Select--">
                            </cornie-select>
                            <cornie-input v-model="progress" :label="'Progress'" placeholder="Enter"/>
                            <cornie-select
                                class="required"
                                :items="[
                                    'Draft',
                                    'Active',
                                    'On Hold',
                                    'Revoked',
                                    'Completed',
                                    'Entered in errir',
                                ]"
                            label="Reference"
                            v-model="reference"
                            placeholder="--Select--">
                            </cornie-select>
                        </div>
                      
                    </template>
                </accordion-component>
            </div>
            <div  class="border-b-2 pb-5 border-dashed border-gray-200">
                <accordion-component :title="'Detail'"  :opened="false">
                    <template v-slot:default>
                        <div class="grid grid-cols-2 gap-4 w-full mt-5">
                            <cornie-select
                                class="required"
                                :items="[
                                    'Draft',
                                    'Active',
                                    'On Hold',
                                    'Revoked',
                                    'Completed',
                                    'Entered in errir',
                                ]"
                            label="Reason Code"
                            v-model="RrasonCode"
                            placeholder="--Select--">
                            </cornie-select>
                            <cornie-select
                                class="required"
                                :items="[
                                    'Draft',
                                    'Active',
                                    'On Hold',
                                    'Revoked',
                                    'Completed',
                                    'Entered in errir',
                                ]"
                            label="Reason Reference"
                            v-model="reasonReference"
                            placeholder="--Select--">
                            </cornie-select>
                            <cornie-select
                                class="required"
                                :items="[
                                    'Draft',
                                    'Active',
                                    'On Hold',
                                    'Revoked',
                                    'Completed',
                                    'Entered in errir',
                                ]"
                            label="Goal"
                            v-model="goal"
                            placeholder="--Select--">
                            </cornie-select>
                            <cornie-select
                                class="required"
                                :items="[
                                    'Draft',
                                    'Active',
                                    'On Hold',
                                    'Revoked',
                                    'Completed',
                                    'Entered in errir',
                                ]"
                            label="status"
                            v-model="status"
                            placeholder="--Select--">
                            </cornie-select>
                             <cornie-input v-model="statusReason" :label="'Status Reason'" placeholder="Enter"/>
                             <div class="w-full mt-2">
                                <span class="text-sm font-semibold mb-4">Do not perform</span>
                                <div class="flex space-x-4 w-full mt-5">
                                    <cornie-radio :label="'True'" :value="true" v-model="doNotPerform" name="doNotPerform"/>
                                    <cornie-radio :label="'False'" :value="false" v-model="doNotPerform" name="doNotPerform"/>
                                  
                                </div>             
                            </div> 
                        
                        </div>
                      
                    </template>
                </accordion-component>
            </div>
            <div  class="border-b-2 pb-5 border-dashed border-gray-200">
                <accordion-component :title="'Schedule'"  :opened="false">
                    <template v-slot:default>
                        <div class="grid grid-cols-2 gap-4 w-full mt-5">
                            <div class="w-full mt-2">
                                <span class="text-sm font-semibold mb-4">Schedule TIming</span>
                                <div class="flex space-x-4 w-full mt-5">
                                    <cornie-radio :label="'Day'" :value="'day'" v-model="scheduleTiming" name="scheduleTiming"/>
                                    <cornie-radio :label="'Period'" :value="'period'" v-model="scheduleTiming" name="scheduleTiming"/>
                                </div>             
                            </div> 
                            <div></div>
                            <date-time-picker
                                v-model:date="endDate"
                                v-model:time="endTime"
                                label="Schedule Timing"
                                width="w-full"
                            />
                            <cornie-select
                                class="required"
                                :items="[
                                    'Draft',
                                    'Active',
                                    'On Hold',
                                    'Revoked',
                                    'Completed',
                                    'Entered in errir',
                                ]"
                            label="Location"
                            v-model="location"
                            placeholder="--Select--">
                            </cornie-select>
                            <cornie-select
                                class="required"
                                :items="[
                                    'Draft',
                                    'Active',
                                    'On Hold',
                                    'Revoked',
                                    'Completed',
                                    'Entered in errir',
                                ]"
                            label="Performer"
                            v-model="performer"
                            placeholder="--Select--">
                            </cornie-select>
                        </div>
                      
                    </template>
                </accordion-component>
            </div>
             <div  class="border-b-2 pb-5 border-dashed border-gray-200">
                <accordion-component :title="'Product'"  :opened="false">
                    <template v-slot:default>
                        <div class="grid grid-cols-2 gap-4 w-full mt-5">
                            <cornie-select
                                class="required"
                                :items="[
                                    'Draft',
                                    'Active',
                                    'On Hold',
                                    'Revoked',
                                    'Completed',
                                    'Entered in errir',
                                ]"
                            label="Product Code"
                            v-model="productCode"
                            placeholder="--Select--">
                            </cornie-select>
                             <cornie-select
                                class="required"
                                :items="[
                                    'Draft',
                                    'Active',
                                    'On Hold',
                                    'Revoked',
                                    'Completed',
                                    'Entered in errir',
                                ]"
                            label="Product Reference"
                            v-model="productReference"
                            placeholder="--Select--">
                            </cornie-select>
                             <cornie-input v-model="dailyAmount" :label="'Daily Amount'" placeholder="Enter"/>
                            <cornie-input v-model="quantity" :label="'Quantity'" placeholder="Enter"/>
                            <cornie-input v-model="Description" :label="'Description'" placeholder="Enter"/>
                        </div>
                        <div>

                         <text-area :label="'Note'" placeholder="'Start typing'" class="w-full"/>
                        </div>
                      
                    </template>
                </accordion-component>
            </div>

        </v-form>
      </cornie-card-text>
      
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2  mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="sendInvite"
            class="text-white bg-danger px-2 rounded-xl"
           >
            Invite
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
    </cornie-card>


  </cornie-dialog>

</template>

<script lang="ts">
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import { string } from "yup";
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { mapDisplay } from "@/plugins/definitions";
import { string as yupString } from "yup";


import ICarePartner from "@/types/ICarePartner";
import IPhone from "@/types/IPhone";
import IEmail from "@/types/IEmail";
import ISpecial from "@/types/ISpecial";


import AccordionComponent from "@/components/form-accordion.vue";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CloseIcon from "@/components/icons/whitecancel.vue";
import CornieSelect from "@/components/cornieselect.vue";
import Avatar from "@/components/avatar.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import SelectOption from "@/components/custom-checkbox.vue";
import TextArea from "@/components/textarea.vue";
import CornieInput from "@/components/cornieinput.vue";
import DRangePicker from "@/components/daterangecalendar.vue";
import DatePicker from "@/components/datepicker.vue";
import PhoneInput from "@/components/phone-input.vue";
import CornieRadio from "@/components/cornieradio.vue";
import DeleteorangeIcon from "@/components/icons/deleteorange.vue";
import Multiselect from "@vueform/multiselect";
import FhirInput from "@/components/fhir-input.vue";
import AutoComplete from "@/components/autocomplete.vue";
import InfoBlueBg from "@/components/icons/info-blue-bg.vue";
import CornieMenu from "@/components/CornieMenu.vue";
import SearchInput from "@/components/search-input.vue";
import DateTimePicker from "@/components/date-time-picker.vue";




const careplan = namespace("careplan");
const user = namespace("user");

@Options({
  name: "carePlanModal",
  components: {
    ...CornieCard,
    AccordionComponent,
    CornieIconBtn,
    ArrowLeftIcon,
    InfoBlueBg,
    DRangePicker,
    PhoneInput,
    SearchInput,
    FhirInput,
    CancelIcon,
    AutoComplete,
    CornieDialog,
    DateTimePicker,
    CornieRadio,
    Avatar,
    CornieMenu,
    SelectOption,
    SearchIcon,
    TextArea,
    DeleteIcon,
    DatePicker,
    Multiselect,
    IconInput,
     CornieInput,
    CornieBtn,
    CornieSelect,
    CloseIcon,
    DeleteorangeIcon
  },
})
export default class carePlanModal extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;


    @Prop({ type: String, default: "" })
    id!: string;


  async created() {
  
  }



}
</script>
