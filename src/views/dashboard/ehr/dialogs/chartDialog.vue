<template>
  <div class="">
    <modal :visible="visible">
      <div
        class="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
            >&#8203;</span
          >
          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full"
          >
            <div class="bg-white px-2 pt-3 pb-2 sm:p-3 sm:pb-2">
              <div>
                <div class="mt-5 text-center sm:mt-0 sm:text-left">
                  <div class="d-flex w-full">
                    <h3
                      class="text-lg leading-6  text-primary font-bold"
                      id="modal-title"
                    >
                      Find Patient Chart
                    </h3>
                     <close-icon
                      class="items-end absolute right-5 top-4 cursor-pointer fill-current text-primary"
                      @click="show = false"
                    />
                  </div>
                   <div class="w-full my-10">
                    <span class="mb-2 w-full rounded-full" @click="showDatalist = !showDatalist">
                        <icon-input
                        :autocomplete="'off'"
                        class="border border-gray-600 py-2 -mt-2 rounded-full focus:outline-none"
                        type="search"
                        placeholder="Search for patient"
                        v-model="query"
                        >
                        <template v-slot:prepend>
                            <search-icon />
                        </template>
                        </icon-input>
                    </span>
                    <div :class="[!showDatalist ? 'hidden' : 'o', filteredItems.length === 0 ? 'h-20' : 'h-auto']" 
                        class="absolute shadow bg-white border-gray-400 border top-100 z-40 left-0 m-3 rounded  overflow-auto mt-2 svelte-5uyqqj" style="width:96%">
                            <div class="flex flex-col h-24 w-full p-2">
                                <div v-for="(item, i) in filteredItems"
                                    :key="i"
                                    @click="selected(item, item.id)"
                                    class="cursor-pointer w-full border-gray-100 rounded-xl hover:bg-white-cotton-ball">
                                    <div  class="w-full text-sm items-center p-2 pl-2 border-transparent border-l-2 relative">
                                        {{ item?.firstname +' '+ item?.lastname   || item }}
                                    </div>
                                </div>
                            </div>
                            <div v-if="filteredItems.length === 0">
                                <span class="py-2 px-5 text-sm text-gray-600 text-center flex justify-center">No result found!</span>
                            </div>
                    </div>
                    </div>
                </div>
               
              </div>
            </div>
            <div class="flex justify-end my-5 px-3">
                 <cornie-btn
                        :loading="loading"
                        @click="find"
                        class="text-white bg-danger px-3 rounded-xl"
                 >
                        find
                </cornie-btn>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script lang="ts">
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, PropSync } from "vue-property-decorator";
import { cornieClient } from "@/plugins/http";
import { Options, Vue } from "vue-class-component";
import { IPatient } from "@/types/IPatient";


import Modal from "@/components/modal.vue";
import Textarea from "@/components/textarea.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import CloseIcon from "@/components/icons/CloseIconBlue.vue";
import DatePicker from "@/components/daterangepicker.vue";
import search from "@/plugins/search";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";

import Avatar from "@/components/avatar.vue";

const patients = namespace("patients");
type Sorter = (a: any, b: any) => number;


function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}
@Options({
  name: "patientChartDialog",
  components: {
    Modal,
    CornieInput,
    DatePicker,
    CornieSelect,
    ArrowLeftIcon,
    CloseIcon,
    EyeIcon,
    DeleteIcon,
    Textarea,
    Avatar,
    IconInput,
    SearchIcon,

  },
})
export default class patientChartDialog extends Vue {
  @Prop({ type: Boolean, required: true, default: false })
  visible!: boolean;

  @Prop({ type: String, default: "" })
  paymentId!: string;

  @PropSync("visible", { type: Boolean, required: true, default: false })
  show!: boolean;

  @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  loading = false;
  showDatalist = false;
  reasonsForDeactivation = "";
  deactivateTillDate = "";
  localSrc = require("../../../../assets/img/placeholder.png");
  required = string().required();

  patientId = "";

  orgPatients = [];
  query = "";
  orderBy: Sorter = () => 1;

  get classes() {
    return this.show ? ["flex"] : ["hidden"];
  }

   get filteredItems() {
    return this.patients
      .filter((item: any) => this.filter(item, this.query))
      .sort(this.orderBy);
  }

   selected(value:any,id:any){
       this.query = value.firstname +''+ value.lastname;
       this.showDatalist = false;
       
      this.patientId = id;
      //this.firstPatient.push(value);

      //   this.firstPatient = [];
      //  this.patientId ="";
     
  }

  find(){
      this.loading = true;

      this.$emit('patientId', this.patientId);
      this.show = false;

      this.loading = false;
  }

  get payload() {
    return {
      reasonsForDeactivation: this.reasonsForDeactivation,
      deactivateTillDate: this.deactivateTillDate,
    };
  }

  async created(){
    await this.fetchPatients();
  }


}
</script>
