<template>
  <cornie-dialog v-model="show" right class="md:w-4/12 w-12/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="closeModal" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Primary Doctor
          </h2>
          <!-- <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          /> -->
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form class="container" ref="form">
          <div
            class="w-full pb-2 mb-7 border-gray-300"
          >
            <span class="text-dark text-sm font-medium">Add your primary doctor</span>
            <search-input
              v-model="query"
              :results="results"
              @selected="selected"
              placeholder="Search by name or email"
              class="py-3"
            />

          </div>
          <cornie-input
            label="Doctor’s Name"
            class="w-full mb-8"
            placeholder="--Enter--/--Autoloaded--"
            v-model="name"
            :disabled="true"
          
          />
          <cornie-input
            label="Email Address"
            class="w-full mb-8"
            placeholder="--Enter--/--Autoloaded--"
            v-model="email"
            :disabled="true"
          
          />
          <div class="mb-8">
              <phone-input
                   v-model="phone.number"
                   v-model:code="phone.dialCode"
                   :rules="requiredRule"
                   label="Phone Number"
                   class="w-full"
                   :disabled="true"
                    :readonly="true"
               />
          </div>
             <cornie-input
            label="Reference Organization"
            class="w-full mb-8"
            placeholder="--Enter--/--Autoloaded--"
            v-model="identifier"
            :disabled="true"
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
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { createDate } from "@/plugins/utils";
import { cornieClient } from "@/plugins/http";

import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import { string, date, number } from "yup";
import PhoneInput from "@/components/phone-input.vue";
import search from "@/plugins/search";
import {IPatientProvider} from "@/types/IPatientProvider";
import  {IPatientPractitioners}  from "@/types/IPatientPractitioners";
import IPractitioner from "@/types/IPractitioner";
import SearchInput from "@/components/search-input.vue";

const patientprovider = namespace("patientprovider");

interface Result extends IPractitioner {
  display: string;
}

type Sorter = (a: any, b: any) => number;

function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "DoctorModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    PhoneInput,
    CornieDialog,
    SearchIcon,
    IconInput,
    CornieInput,
    CornieSelect,
    CornieBtn,
    SearchInput
  },
})
export default class DoctorModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @patientprovider.State
  patientproviders!: IPatientProvider[];

  @patientprovider.Action
  fetchPatientProvider!: () => Promise<void>;

  @patientprovider.State
  primarydoctors!: IPatientPractitioners[];

  @patientprovider.Action
  fetchPrimaryDoctors!: () => Promise<void>;

  results: Result[] = [];


  query = "";
  showDatalist = false;
  loading = false;
  percentage = 0;
  name = "";
  email = "";
  referenceOrganization = "";
  organizationId = "";
  identifier = "";
  type ="";

  phone = {
    number: "",
    dialCode: "+234",
  };
  requiredRule = string().required();

  //Date of birth validation
  dobValidator = date().max(
    createDate(0, 0, -16),
    "Director must be at least 16yrs."
  );
  //Email Valitdaiton
  emailRule = string().email("A valid email is required").required();
  orderBy: Sorter = () => 1;

  @Watch("query")
  async search(query: string) {
    if (!query) return (this.results = []);
    await this.searchPractitioners(query);
  }

   async searchPractitioners(query: string) {
      const AllNotes = cornieClient().get(`/api/v1/booking-website/search/practitionerByName?query=${query}`);
      const response = await Promise.all([AllNotes]);
      const info = response[0].data;
        this.results = info.map((p:IPractitioner) => ({
        ...p,
        display: this.printPractitioner(p),
      }));

  }


  printPractitioner(practitioner: IPractitioner) {
    return `${practitioner.firstName} ${practitioner.lastName}`;
  }

 
 
  async selected(practitioner: any) {
    this.name = practitioner.firstName +''+ practitioner.lastName;
    this.email = practitioner.email;
    this.referenceOrganization = practitioner.practitioner.id;
    this.organizationId = practitioner.organizationId;
    this.phone = practitioner?.phone as any;
    this.identifier = practitioner.organizationId;
  }

  resetForm(){
     this.name = '';
    this.email = '';
    this.referenceOrganization = '';
    this.organizationId = '';
    this.phone = this.phone;
    this.identifier = '';
  }


 

  get payload() {
    return {
      name: this.name,
      email: this.email,
      phone: this.phone,
      referenceOrganization: this.referenceOrganization,
      organizationId: this.organizationId,
      type : this.type 

    };
  }
   async submit() {
        this.loading = true;
        if (this.id) await this.updatePrimaryDoctor();
        else await this.createPrimaryDoctor();
        this.loading = false;
    }


 async createPrimaryDoctor() {
    // const { valid } = await (this.$refs.form as any).validate();
    // if (!valid) return;
    console.log(this.payload)
    try {
      const { data } = await cornieClient().put(`/api/v1/patient-portal/practitioner/default-doctor/${this.referenceOrganization}`,{});
      window.notify({ msg: "Primary Doctor Added" , status: "success" });
      this.done();
      this.resetForm();
      //this.reset();
    } catch (error:any) {
      window.notify({ msg: "Primary Doctor Not Added", status: "error" });
    }
  }

  async updatePrimaryDoctor() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;

    const id = this.id;
    const url = `/api/v1/patient-portal/provider/${id}`;
    const payload = this.payload;
    try {
      const response = await cornieClient().put(url, this.payload);
      if (response.success) {
        window.notify({
          msg: "Primary Doctor Updated",
          status: "success",
        });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: "Primary Doctor Not Updated", status: "error" });
    }
  }

  closeModal(){
    this.resetForm();
    this.show = false
  }


  get newaction() {
    return this.id ? "Update" : "Add";
  }

  done() {
    this.show = false;
  }

  
  async created() {
    await this.fetchPrimaryDoctors();
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
