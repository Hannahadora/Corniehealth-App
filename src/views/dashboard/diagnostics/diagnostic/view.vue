<template>
  <cornie-dialog v-model="show" right class="w-7/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
         Diagnostic Request
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
       <v-form ref="form">
            <div class="grid grid-cols-2 gap-4 w-full">
                <date-picker :label="'Request Date'"  :modelValue="new Date(selectedItem?.createdAt).toLocaleDateString()" :disabled="true"/>
            </div>
           <div class="grid grid-cols-2 mt-5 gap-4 w-full border-dashed border-gray-200 border-b-2 pb-10">
                <cornie-input
                    label="Requisition ID"
                    placeholder="DF5456788"
                    class="w-full"
                    :disabled="true"
                    :modelValue="selectedItem?.identifier"
                />
                 <cornie-input
                    label="Specimen ID"
                    placeholder="XXXXXX"
                    class="w-full"
                    :disabled="true"
                    :modelValue="selectedItem?.identifier"
                />
                <cornie-input
                  label="Status"
                   :disabled="true"
                  :modelValue="selectedItem?.status"
                >
                </cornie-input>

                <cornie-input
                    class="required"
                    label="based on"
                     :disabled="true"
                  :modelValue="selectedItem?.basedOn"
                    >
                </cornie-input>
                <cornie-input
                        class="required"
                        label="intent"
                        :disabled="true"
                  :modelValue="selectedItem?.intent"
                    >
                            <template #labelicon>
                            <span class="text-xs text-gray-500">(Optional)</span>
                            
                            </template>
                </cornie-input>
                <cornie-input
                            class="required"
                            label="priority"
                             :disabled="true"
                  :modelValue="selectedItem?.priority"
                        >
                         <template #labelicon>
                            <span class="text-xs text-gray-500">(Optional)</span>
                            
                            </template>
                </cornie-input>
                <cornie-input
                            class="required"
                            label="category"
                             :disabled="true"
                  :modelValue="selectedItem?.category"
                        >
                </cornie-input>
                        


           </div>
            <div  class="border-b-2 pb-5 border-dashed border-gray-200">
                <accordion-component
                title="Request Info"
                :opened="false"
                >
                <cornie-table :columns="rawHeaders" v-model="items" :listmenu="true" :check="false">
                </cornie-table>
                <div class="mt-5 grid grid-cols-2 gap-4">

                    <cornie-input
                            label="Request Description"
                             :disabled="true"
                  :modelValue="selectedItem?.requestDescription"
                            class="Enter"
                    />
                    <cornie-input
                        :disabled="true"
                  :modelValue="selectedItem?.bodySite"
                        label="Body Site"
                        class="w-full"
                    />
                </div>
                </accordion-component>
            </div>
             <div  class="border-b-2 pb-5 border-dashed border-gray-200">
                <accordion-component
                title="Patient Info"
                :opened="false"
                >

                    <div class="mt-5 grid grid-cols-2 gap-4">
                        <cornie-input
                                class="required"
                                :disabled="true"
                  :modelValue="selectedItem?.patient.firstname +''+ selectedItem.patient.lastname"
                            label="Patient"
                            >
                        </cornie-input>
                        <cornie-input
                                 :disabled="true"
                  :modelValue="selectedItem?.patient?.status ?? 'N/A'"
                                label="Payment Profile"
                                class="Enter"
                        />
                        <cornie-input
                            :disabled="true"
                  :modelValue="selectedItem?.encounterId ?? 'N/A'"
                            label="Encounter"
                            class="w-full"
                        />
                        <div class="w-full -mt-1">
                            <span class="text-sm font-semibold mb-3">Occurence</span>
                            <div class="flex space-x-2 w-full">
                                <cornie-input
                                :rules="required"
                                 :disabled="true"
                  :modelValue="selectedItem?.occurenceValue"
                                class="grow w-full"
                                :setfull="true"
                                />
                                <cornie-input
                                :items="['Day']"
                                placeholder="Date"
                                class="w-32 mt-0.5 flex-none"
                                :setPrimary="true"
                                 :disabled="true"
                  :modelValue="selectedItem?.occurenceUnit"
                                />
                            </div>
                        </div>
                        <cornie-input
                             :disabled="true"
                   :modelValue="selectedItem?.patient.firstname +''+ selectedItem.patient.lastname"
                            label="Requester"
                            class="w-full"
                        />
                        <cornie-input
                                class="required"
                            label="Perfomer"
                              :disabled="true"
                   :modelValue="getPractitionerName(selectedItem?.performerId)"
                            >
                        </cornie-input>
                        <cornie-input
                            class="required"
                        label="Location"
                        :disabled="true"
                   :modelValue="getLocationName(selectedItem?.locationId)"
                        >
                        </cornie-input>
                    </div>
                </accordion-component>
            </div>
              <div  class="">
                <accordion-component
                title="Patient Info"
                :opened="false"
                >
                <div class="mt-5 grid grid-cols-2 gap-4">

                    <cornie-input
                            class="required"
                          :disabled="true"
                   :modelValue="selectedItem?.replaces"
                        label="Replaces"
                        >
                    </cornie-input>
                     <cornie-input
                            class="required"
                           :disabled="true"
                   :modelValue="selectedItem?.asNeeded"
                        label="As Needed"
                        placeholder="Select"
                        >
                    </cornie-input>
                    <cornie-input
                        label="As Needed Code"
                        class="Enter"
                       :disabled="true"
                   :modelValue="selectedItem?.asNeededCode"
                    />
                    <cornie-input
                        label="Reason Code"
                        class="w-full"
                        :disabled="true"
                   :modelValue="selectedItem?.reasonCode"
                    />
                     <cornie-input
                            class="required"
                           :disabled="true"
                   :modelValue="selectedItem?.reasonReference"
                        label="Reason Reference"
                        >
                    </cornie-input>
                    <cornie-input
                       :disabled="true"
                   :modelValue="selectedItem?.note"
                        label="Note"
                        class="w-full"
                    />
                      <cornie-input
                            class="required"
                            :disabled="true"
                   :modelValue="FormName"
                        label="Link Forms"
                        >
                    </cornie-input>
                </div>
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
             @click="submit"
            class="text-white bg-danger px-2 rounded-xl"
           >
            Save
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

import ILocation from "@/types/ILocation";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import { IPatient } from "@/types/IPatient";

import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";

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
import CornieRadio from "@/components/cornieradio.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import DatePicker from '@/components/datepicker.vue';


const practitioner = namespace("practitioner");
const location = namespace("location");
const patients = namespace("patients");

type Sorter = (a: any, b: any) => number;


function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "DetailedViewModal",
  components: {
    ...CornieCard,
    AccordionComponent,
    CornieIconBtn,
    ArrowLeftIcon,
    DRangePicker,
    DatePicker,
    CancelIcon,
    CornieDialog,
    CornieRadio,
    Avatar,
    CornieTable,
    SelectOption,
    SearchIcon,
    TextArea,
    DeleteIcon,
    IconInput,
     CornieInput,
    CornieBtn,
    CornieSelect,
    CloseIcon
  },
})
export default class DetailedViewModal extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @Prop({ type: Object, default: {} })
    selectedItem!: any;


    @practitioner.State
    practitioners!: IPractitioner[];


    @practitioner.Action
    fetchPractitioners!: () => Promise<void>;

      @location.State
    locations!: ILocation[];

    @location.Action
    fetchLocations!: () => Promise<void>;


    loading = false;
    localSrc = require("../../../../assets/img/placeholder.png");
    query = "";
    orderBy: Sorter = () => 1;
    required = string().required();

    rawHeaders = [
    {
      title: "request code",
      key: "identifier",
      show: true,
       noOrder: true,
    },
    { title: "order detail", key: "orderDetail", show: true, noOrder: true, },
    {
      title: "qty",
      key: "quantityValue/quantityUnit",
      show: true,
       noOrder: true,
    },

    ];
    rawHeaders2 = [
    {
      title: "DISPENSE INTERVAL",
      key: "id",
      show: true,
       noOrder: true,
    },
    { title: "VALID PERIOD", key: "createdAt", show: true, noOrder: true, },
    {
      title: "QUANTITY",
      key: "patient",
      show: true,
      noOrder: true,
    },
    {
      title: "SUPPLY DURATION",
      key: "requester",
      show: true,
      noOrder: true,
    },
    {
      title: "Actions",
      key: "actions",
      show: true,
      noOrder: true,
    },
    ];

    get RequestItem(){
      return [this.selectedItem]
    }
    get items() {
      const requests = this.RequestItem.map((i: any) => {
      return {
        ...i,
      };
    });

    return requests;
    // if (!this.query) return shifts;
    // return search.searchObjectArray(shifts, this.query);
  }

  getPractitionerName(id: string) {
    const pt = this.practitioners.find((i: any) => i.organizationId === id);
    return pt ? `${pt.firstName} ${pt.lastName}` : "";
  }
  getLocationName(id: string){
    const pt = this.locations.find((i: any) => i.id === id);
    return pt ? `${pt.name}` : "";
  }

  get FormName(){
    return this.selectedItem.forms.map((c:any) => c.name).toString();
  }



   async submit() {
    this.loading = true;
    this.loading = false;
  }


  async created() {
      await this.fetchPractitioners();
      await this.fetchLocations();
  }
}
</script>

<style>
.dflex {
  display: -webkit-box;
}
</style>
