<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
          Select Existing Practitioner
          </h2>
          <!-- <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          /> -->
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
            <div class="border-b-2 w-full border-dashed pb-2 mb-7 border-gray-300">
                <span class="text-dark text-sm font-medium">Search existing practitioner to add</span>
                <div class="">
                 <span class="mb-2 w-full rounded-full" @click="showDatalist = !showDatalist">
                    <icon-input
                    autocomplete="off"
                    class="border border-gray-600 rounded-full focus:outline-none"
                    type="search"
                    placeholder="Search"
                    v-model="query"
                    >
                    <template v-slot:prepend>
                        <search-icon />
                    </template>
                    </icon-input>
                 </span>
                  <div :class="[!showDatalist ? 'hidden' : 'o', filteredItems.length === 0 ? 'h-20' : 'h-auto']" 
                 class="absolute shadow bg-white border-gray-400 border top-100 z-40 left-0 m-3 rounded  overflow-auto mt-2 svelte-5uyqqj" style="width:96%">
                        <div class="flex flex-col w-full p-2">
                            <div v-for="(item, i) in filteredItems"
                                :key="i"
                                @click="selected(item)"
                                class="cursor-pointer w-full border-gray-100 rounded-xl hover:bg-white-cotton-ball">
                                <div  class="w-full text-sm items-center p-2 pl-2 border-transparent border-l-2 relative">
                                    {{ item?.firstName +' '+ item?.lastName   || item }}
                                    <p class="text-xs text-gray-500">[{{ item?.department }}]</p>
                                </div>
                            </div>
                        </div>
                        <div v-if="filteredItems.length === 0">
                             <span class="py-2 px-5 text-sm text-gray-600 text-center flex justify-center">No result found!</span>
                        </div>
                  </div>
                </div>
            </div>
             <cornie-input
                label="Full Name"
                class="w-full mb-5"
                placeholder="--Autofilled--"
                :disabled="true"
                v-model="name"
              />
               <cornie-input
                label="Email"
                class="w-full mb-5"
                v-model="email"
                 :rules="emailRule"
                placeholder="--Autofilled--"
                :disabled="true"
              />
                 <cornie-input
                label="Phone number"
                class="w-full mb-5"
                placeholder="--Autofilled--"
                :disabled="true"
                v-model:code="phone.dialCode"
                v-model="phone.number"
              />
               
 
         
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
    </cornie-card>
    <assesor-modal
      :practitioners="practitioner"
      :roles="role"
      @update:preferred="showAssessor"
      v-model:visible="showAssessorModal"
    />
    <problem-modal
      :conditions="conditions"
      :allergy="allergy"
      @update:preferred="showProblem"
      v-model:visible="showProblemModal"
    />
    <item-modal
      :observations="observations"
      :questions="questions"
      @update:preferred="showItem"
      v-model:visible="showItemModal"
    />
    <reference-modal
      @update:preferred="showFindings"
      v-model:visible="showFindingModal"
    />
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from "@/components/icons/info.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import MainCornieSelect from "@/components/cornieselect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import NoteIcon from "@/components/icons/graynote.vue";
import { cornieClient } from "@/plugins/http";
import DEdit from "@/components/icons/aedit.vue";
import RangeSlider from "@/components/range.vue";
import CDelete from "@/components/icons/adelete.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import DatePicker from "@/components/datepicker.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import Period from "@/types/IPeriod";
import IKyc from "@/types/IKyc";
import { namespace } from "vuex-class";
import IPractitioner from "@/types/IPractitioner";
import { createDate } from "@/plugins/utils";
import { string, date } from "yup";
import { useCountryStates } from "@/composables/useCountryStates";
import FilePicker from "./choose-file.vue";
import PhoneInput from "@/components/phone-input.vue";
import search from "@/plugins/search";

const kyc = namespace("kyc");
const practitioner = namespace("practitioner");
type Sorter = (a: any, b: any) => number;


function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}


@Options({
  name: "Exisiting Practitioner",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    ArrowLeftIcon,
    DatePicker,
    RangeSlider,
    DEdit,
    CDelete,
    PhoneInput,
    CancelIcon,
    InfoIcon,
    FilePicker,
    CornieDialog,
    SearchIcon,
    AccordionComponent,
    IconInput,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieRadio,
    CornieBtn,
    MainCornieSelect,
  },
})
export default class Medication extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  
  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @Prop({ type: String, default: "" })
  id!: string;

   @kyc.Action
  fetchKycs!: () => Promise<void>;

  @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

   @kyc.State
   orgKyc!: IKyc;

  query = "";
  showDatalist = false;
  loading = false;
  name="";
  email="";
  phone = {
    dialCode: "+234",
    number: "",
  };



//Date of birth validation
  dobValidator = date().max(
    createDate(0, 0, -16),
    "Director must be at least 16yrs."
  );
  //Email Valitdaiton
  emailRule = string().email("A valid email is required").required();
  orderBy: Sorter = () => 1;

  get filteredItems() {
    return this.practitioners
      .filter((item: any) => this.filter(item, this.query))
      .sort(this.orderBy);
  }
  selected(item: any) {
      this.showDatalist = false;
      this.name = item.firstName +' '+ item.lastName;
      this.email = item.email;
      this.phone.dialCode = item.phone.dialCode;
      this.phone.number = item.phone.number;
  }
 
  async submit() {
    this.loading = true;
    await this.onSave();
    this.loading = false;
  }

 get payload() {
    return {
      name: this.name,
      email: this.email,
      phone: this.phone,
      notified: false
    };
  }
  async onSave() {
    try {
      const response = await cornieClient().post(
        `/api/v1/kyc/referee/${this.id}`,
        this.payload
      );
      if(response.success){
        window.notify({ msg: "Refree added successfully,kindly check email", status: "success" });
          this.done();
      }
    } catch (error) {
      window.notify({ msg: "Referee not added", status: "error" });
    }
  }

 done() {
    this.$emit("refree-added");
    this.show = false;
  }

  async created() {
   await this.fetchKycs();
   await this.fetchPractitioners();
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
