<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
                Share Pay Link
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
           <div v-if="loading">
            <div class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-500 opacity-75 flex flex-col items-center justify-center">
              <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
              <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
              <p class="w-1/3 text-center text-white">This may take a few seconds, please don't close this modal.</p>
            </div>
          
          </div>
          <div v-else>
              <span class="text-xs font-semibold text-green-600 mb-4">View Bill</span>
              <cornie-input
                      label="Pay Link"
                      class="w-full mt-4"
                      placeholder="Autoloaded"
                      :disabled="true"
                      v-model="link.paymentLink"
              >
                  <template #append-inner>
                      <copy-icon @click="copyURL(link.paymentLink)" class="cursor-pointer"/>
                      
                  </template>
              </cornie-input>
              <cornie-input
                      label="Patient’s Email"
                      class="w-full mt-4"
                      placeholder="Autoloaded"
                      :disabled="true"
                      v-model="PatientName"
                     
              />
              <cornie-input
                      label="Payment Amount (NGN)"
                      class="w-full mt-4"
                      placeholder="Autoloaded"
                      :disabled="true"
                       v-model="bill.total"
              />
                <!-- <text-area :label="'Note'"  placeholder="Type here" class="w-full"/> -->
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
            Submit
          </cornie-btn>
         
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  <new-practitioner v-model="showPractitionerModal"   :specilatyId="specilatyId"/>

  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { cornieClient } from "@/plugins/http";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CloseIcon from "@/components/icons/whitecancel.vue";
import { namespace } from "vuex-class";
import Multiselect from "@vueform/multiselect";
import CornieSelect from "@/components/cornieselect.vue";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import Avatar from "@/components/avatar.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import ISpecial from "@/types/ISpecial";
import SelectOption from "@/components/custom-checkbox.vue";
import search from "@/plugins/search";
import TextArea from "@/components/textarea.vue";
import CopyIcon from "@/components/icons/copy.vue";
import CornieInput from "@/components/cornieinput.vue";
import { IPatient } from "@/types/IPatient";


const practitioner = namespace("practitioner");
const special = namespace("special");
const patients = namespace("patients");

type Sorter = (a: any, b: any) => number;


function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "managePractitioner",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    Multiselect,
    CornieInput,
    CancelIcon,
    CornieDialog,
    Avatar,
    CopyIcon,
    SelectOption,
    SearchIcon,
    TextArea,
    DeleteIcon,
    IconInput,
    CornieBtn,
    CornieSelect,
    CloseIcon
  },
})
export default class managePractitioner extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  specilatyId!: string;

  
  @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;


  loading = false;
  showPractitionerModal = false;
  aPractitioner = [];
  localSrc = require("../../../../../assets/img/placeholder.png");
  query = "";
  orderBy: Sorter = () => 1;
  link = [] as any;
  bill = [] as any;
  note = "";


 @Watch("id")
  idChanged() {
    this.fetchPaylink();
  }


 @practitioner.State
  practitioners!: IPractitioner[];


  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

 get filteredItems() {
    return this.practitioners
      .filter((item: any) => this.filter(item, this.query))
      .sort(this.orderBy);
  }

  get PatientName() {
    if(this.bill){
      const pt = this.patients.find((i: any) => i.id === this.bill.patientId) as any;
     return pt?.contactInfo?.map((item:any) => {
         return `${item.email}`;
      })
    }
  }

async copyURL(mytext:string) {
    try {
      await navigator.clipboard.writeText(mytext);
      window.notify({ msg: "Payment link copied!", status: "success" });
      this.show = false;
    } catch($e) {
      window.notify({ msg: "Payment link  not copied!", status: "error" });
    }
}

async fetchPaylink() {
     this.loading = true;
     try {
      const response = await cornieClient().post(
      `/api/v1/appointment/bill/generate-link/${this.id}`,{}
      );
      if (response.success) {
        this.loading = false;
         this.link = response.data;
      }
    } catch (error:any) {
       this.loading = false;
     window.notify({ msg: error.response.data.message, status: "error" });
    }
  }
  async fetchBill() {
     try {
      const response = await cornieClient().post(
      `/api/v1/appointment/bill/generate/${this.id}`,{note: this.note}
      );
      if (response.success) {
        this.loading = false;
         this.bill = response.data;
      }
    } catch (error:any) {
      this.loading = false;
     window.notify({ msg: error.response.data.message, status: "error" });
    }
  }



  async created() {
    if (this.id)await this.fetchBill();
    if (this.id)await this.fetchPaylink();
    await this.fetchPractitioners();
    await this.fetchPatients();
  }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.dflex {
  display: -webkit-box;
}
.loader {
	border-top-color: #3498db;
	-webkit-animation: spinner 1.5s linear infinite;
	animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
	0% {
		-webkit-transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
	}
}

@keyframes spinner {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

</style>
