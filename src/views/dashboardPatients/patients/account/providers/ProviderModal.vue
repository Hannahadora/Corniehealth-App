<template>
  <cornie-dialog v-model="show" right class="md:w-4/12 w-12/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="resetForm()" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
           Provider
          </h2>
          <!-- <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          /> -->
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">

            <div
              class="w-full pb-2 mb-7 border-gray-300"
            >
              <span class="text-dark text-sm font-medium">Add providers and select a default.</span>
              <div class="">
                <span
                  class="mb-2 w-full rounded-full"
                  @click="showDatalist = !showDatalist"
                >
                  <icon-input
                    autocomplete="off"
                    class="border border-gray-400 py-2 rounded-full focus:outline-none"
                    type="search"
                    placeholder="Search by name or email"
                    v-model="query"
                  >
                    <template v-slot:prepend>
                      <search-icon />
                    </template>
                  </icon-input>
                </span>
                <div
                  :class="[
                    !showDatalist ? 'hidden' : 'o',
                    searchResults.length === 0 ? 'h-20' : 'h-auto',
                  ]"
                  class="absolute shadow bg-white border-gray-400 border top-100 z-40 left-0 m-3 rounded overflow-auto mt-2 svelte-5uyqqj"
                  style="width: 96%"
                  
                >
                  <div class="flex flex-col w-full p-2">
                    <div
                      v-for="(item, i) in searchResults"
                      :key="i"
                      @click="selected(item)"
                      class="cursor-pointer w-full border-gray-100 rounded-xl hover:bg-white-cotton-ball"
                    >
                      <div
                        class="w-full text-sm items-center p-2 pl-2 border-transparent border-l-2 relative"
                      >
                        {{ item.name }}
                      </div>
                    </div>
                    <!-- <div v-if="searchResults.length === 0">
                      <span
                        class="py-2 px-5 text-sm text-gray-600 text-center flex justify-center"
                        >No result found!</span
                      >
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
            <cornie-select
                  v-model="type"
                  :items="['pharmacy', 'lab', 'clinic']"
                  label="Type"
                  class="w-full"
                  placeholder="--Select--"
                :rules="required"
                :required="true"
              />
            <cornie-input
              label="Practice Name"
              class="w-full mb-8"
              placeholder="--Enter--"
              v-model="name"
            :disabled="true"
            />
            <cornie-input
              label="Email Address"
              class="w-full mb-8"
              placeholder="--Enter--/--Autoloaded--"
              v-model="email"
            :disabled="true"
            :rules="emailRule"
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
                :required="true"
                />
            </div>
              <div class="w-full flex justify-end border-b border-gray-200 pb-5">
                  <button
                      @click="pushProviders"
                      type="button"
                      class="border-primary border-2 py-2  px-8 mr-3 rounded-lg text-primary"
                  >
                      Add
                  </button>
              </div>
              <div class="mt-5">
                  <span class="uppercase text-black font-bold text-sm">Select default Provider</span>

                  <div v-if="patientproviders.length > 0 && id">
                    <div v-if="PharmarcyProviders2.length > 0">
                      <accordion-component :title="'Pharmacy'" :opened="true">
                          <template v-slot:default>
                              <div class="w-full flex justify-between mt-5" v-for="(pharmacy,index) in PharmarcyProviders2" :key="index">
                                  <div class="flex space-x-2 items-center">
                                      <cornie-radio
                                      v-model="pharmacy.default"
                                      :name="pharmacy"
                                      @update:modelValue="setDefault"
                                      :value="pharmacy.id"
                                      />
                                      <div>
                                          <span class="text-black text-sm font-bold mb-0 capitalize">{{ pharmacy.provider.name }}</span>
                                          <p class="text-xs text-gray-300">{{ pharmacy.provider.email }}</p>
                                      </div>
                                  </div>
                                  <div class="cursor-pointer" @click="deleteProviderWithId(pharmacy.provider.id)">
                                      <delete-icon />
                                  </div>
                              </div>
                            
                          </template>
                      </accordion-component>
                    </div>
                    <div v-if="LabProviders2.length > 0">
                      <accordion-component :title="'Lab'" :opened="true">
                          <template v-slot:default>
                              <div class="w-full flex justify-between mt-5" v-for="(pharmacy,index) in LabProviders2" :key="index">
                                  <div class="flex space-x-2 items-center">
                                      <cornie-radio
                                      v-model="pharmacy.default"
                                      :name="pharmacy"
                                      @update:modelValue="setDefault"
                                      :value="pharmacy.id"
                                      />
                                      <div>
                                          <span class="text-black text-sm font-bold mb-0 capitalize">{{ pharmacy.provider.name }}</span>
                                          <p class="text-xs text-gray-300">{{ pharmacy.provider.email }}</p>
                                      </div>
                                  </div>
                                  <div class="cursor-pointer" @click="deleteProviderWithId(pharmacy.provider.id)">
                                      <delete-icon />
                                  </div>
                              </div>
                            
                          </template>
                      </accordion-component>
                    </div>
                    <div v-if="ClinicProviders2.length > 0">
                      <accordion-component :title="'Clinic'" :opened="true">
                          <template v-slot:default>
                              <div class="w-full flex justify-between mt-5" v-for="(pharmacy,index) in ClinicProviders2" :key="index">
                                  <div class="flex space-x-2 items-center">
                                      <cornie-radio
                                      v-model="pharmacy.default"
                                      :name="pharmacy"
                                      @update:modelValue="setDefault"
                                      :value="pharmacy.id"
                                      />
                                      <div>
                                          <span class="text-black text-sm font-bold mb-0 capitalize">{{ pharmacy.provider.name }}</span>
                                          <p class="text-xs text-gray-300">{{ pharmacy.provider.email }}</p>
                                      </div>
                                  </div>
                                  <div class="cursor-pointer" @click="deleteProviderWithId(pharmacy.provider.id)">
                                      <delete-icon />
                                  </div>
                              </div>
                            
                          </template>
                      </accordion-component>
                    </div>
                  </div>


                  <div v-else>
                    <div v-if="PharmarcyProviders.length > 0">
                      <accordion-component :title="'Pharmacy'" :opened="true">
                          <template v-slot:default>
                              <div class="w-full flex justify-between mt-5" v-for="(pharmacy,index) in PharmarcyProviders" :key="index">
                                  <div class="flex space-x-2 items-center">
                                      <cornie-radio
                                      v-model="pharmacy.default"
                                      :name="pharmacy"
                                      @update:modelValue="setDefault"
                                      :value="pharmacy.id"
                                      />
                                      <div>
                                          <span class="text-black text-sm font-bold mb-0 capitalize">{{ pharmacy.name }}</span>
                                          <p class="text-xs text-gray-300">{{ pharmacy.email }}</p>
                                      </div>
                                  </div>
                                  <div>
                                      <delete-icon @click="deleteProviderWithoutId(index)"/>
                                  </div>
                              </div>
                            
                          </template>
                      </accordion-component>
                    </div>
                    <div v-if="LabProviders.length > 0">
                      <accordion-component :title="'Lab'" :opened="true">
                          <template v-slot:default>
                              <div class="w-full flex justify-between mt-5" v-for="(pharmacy,index) in LabProviders" :key="index">
                                  <div class="flex space-x-2 items-center">
                                      <cornie-radio
                                      v-model="pharmacy.default"
                                      :name="pharmacy"
                                      @update:modelValue="setDefault"
                                      :value="pharmacy.id"
                                      />
                                      <div>
                                          <span class="text-black text-sm font-bold mb-0 capitalize">{{ pharmacy.name }}</span>
                                          <p class="text-xs text-gray-300">{{ pharmacy.email }}</p>
                                      </div>
                                  </div>
                                  <div>
                                      <delete-icon @click="deleteProviderWithoutId(index)"/>
                                  </div>
                              </div>
                            
                          </template>
                      </accordion-component>
                    </div>
                    <div v-if="ClinicProviders.length > 0">
                      <accordion-component :title="'Clinic'" :opened="true">
                          <template v-slot:default>
                              <div class="w-full flex justify-between mt-5" v-for="(pharmacy,index) in ClinicProviders" :key="index">
                                  <div class="flex space-x-2 items-center">
                                      <cornie-radio
                                      v-model="pharmacy.default"
                                      :name="pharmacy"
                                      @update:modelValue="setDefault"
                                      :value="pharmacy.id"
                                      />
                                      <div>
                                          <span class="text-black text-sm font-bold mb-0 capitalize">{{ pharmacy.name }}</span>
                                          <p class="text-xs text-gray-300">{{ pharmacy.email }}</p>
                                      </div>
                                  </div>
                                  <div>
                                      <delete-icon @click="deleteProviderWithoutId(index)"/>
                                  </div>
                              </div>
                            
                          </template>
                      </accordion-component>
                    </div>
                  </div>

              </div>
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
            {{ action }}
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
import search from "@/plugins/search";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import { string, date, number } from "yup";

import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import PhoneInput from "@/components/phone-input.vue";
import CornieRadio from "@/components/cornieradio.vue";
import DeleteIcon from "@/components/icons/deleteorange.vue";
import SearchInput from "@/components/search-input.vue";

import {IPatientProvider} from "@/types/IPatientProvider";

import AccordionComponent from "@/components/form-accordion.vue";

interface Result extends IPractitioner {
  display: string;
}

const practitioner = namespace("practitioner");
const patientprovider = namespace("patientprovider");

type Sorter = (a: any, b: any) => number;

function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "OtherDoctorModal",
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
    AccordionComponent,
    CornieRadio,
    DeleteIcon,
    SearchInput,
  },
})
export default class OtherDoctorModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @patientprovider.State
  patientproviders!: any[];

  @patientprovider.Action
  fetchPatientProvider!: () => Promise<void>;

  @patientprovider.Action
  getPatientProviderById!: (id: string) => IPatientProvider;

  @patientprovider.Action
  deletePatientProvider!: (id: string) => Promise<boolean>;

  required = string().required();


  query = "";
  showDatalist = false;
  loading = false;
  percentage = 0;
  name = "";
  searchResults = [] as any;
  email = "";
  referenceOrganization = "";
  organizationId = "";
  identifier = "";
  type = "";
  allProviders = [] as any;
  selectedItem = {} as any;
  results: Result[] = [];

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
  emailRule = string().email("A valid email is required");
  orderBy: Sorter = () => 1;

  @Watch("query")
  async search(query: string) {
    if (!query) return (this.results = []);
    await this.searchPrimaryDoctors(query);
  }

    @Watch("id")
    setItem() {
      this.setProviders();
    }

    async setProviders(){
       const provider = await this.getPatientProviderById(this.id);
      if (!provider) return;
      this.name = provider.provider.name;
      this.email = provider.provider.email;
      this.organizationId = provider.provider.organizationId;
      this.type = provider.provider.type;
      this.phone = provider.provider?.organizationDetails.phone;
     
    }

    async selected(provider: any) {
      console.log({provider})
      this.showDatalist = false;
    this.name = provider.name;
    this.email = provider.email;
    this.referenceOrganization = provider.id;
    this.organizationId = provider.id;
    this.phone = provider?.phone as any;
    this.identifier = provider.identifier;
    this.type = provider.type
  }


  async pushProviders(){
    //e.preventDefault()
    const body = {
      name : this.name,
      email: this.email,
      phone: this.phone,
      referenceOrganization: this.referenceOrganization,
      organizationId: this.organizationId,
      type : this.type
    }
    this.allProviders.push(body)
     try {
      const { data } = await cornieClient().post("/api/v1/patient-portal/provider",body);
      window.notify({ msg: "Primary Doctor Added" , status: "success" });
      // await this.fetchPatientProvider()
      this.reset();
    } catch (error:any) {
     // window.notify({ msg: "Primary Doctor Not Added", status: "error" });
    }
  }

  get PharmarcyProviders(){
    return this.allProviders.filter((pharmacy:any) => pharmacy.type == 'pharmacy')
  }
  get LabProviders(){
    return this.allProviders.filter((lab:any) => lab.type == 'lab')
  }
  get ClinicProviders(){
    return this.allProviders.filter((clinic:any) => clinic.type == 'clinic')
  }
get PharmarcyProviders2(){
    return this.patientproviders.filter((pharmacy:any) => pharmacy.type == 'pharmacy')
  }
  get LabProviders2(){
    return this.patientproviders.filter((lab:any) => lab.type == 'lab')
  }
  get ClinicProviders2(){
    return this.patientproviders.filter((clinic:any) => clinic.type == 'clinic')
  }
  get payload() {
    return this.allProviders;
  }
  reset(){
     this.name = '';
    this.email = '';
    this.referenceOrganization = '';
    this.organizationId = '';
    this.phone = this.phone;
    this.identifier = '';
    this.id = '';
    this.type = '';
    this.phone = {
      dialCode: '+234',
      number: '',
    }

   
  }
  resetForm(){
       this.show = false;
     this.name = '';
    this.email = '';
    this.referenceOrganization = '';
    this.organizationId = '';
    this.phone = this.phone;
    this.identifier = '';
    this.id = '';
    this.type = '';
    this.phone = {
      dialCode: '+234',
      number: '',
    }

   
  }

   setDefault(val: string) {
    console.log({val})
    if(this.patientproviders.length > 0 && this.id){
      let item = this.patientproviders.find((item: any) => item.id === val);
      this.selectedItem = item;
      if (item) item.default = true;
      this.patientproviders.forEach((i: any) => {
        if (i.id !== val && i.type === item.type) {
          i.default = false;
        }
      });
    } else {
      let item = this.allProviders.find((item: any) => item.id === val);
      if (item) item.default = true;
      this.allProviders.forEach((i: any) => {
        if (i.id !== val && i.type === item.type) {
          i.default = false;
        }
      });
    }
  }
   async submit() {
        this.loading = true;
        if (this.id) await this.updateProvider();
        else await this.createProvider();
        this.loading = false;
    }


 async createProvider() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;
     this.done();
     this.resetForm();
   
  }

  async updateProvider() {
    // const { valid } = await (this.$refs.form as any).validate();
    // if (!valid) return;

    const id = this.selectedItem.provider.id;
    const url = `/api/v1/patient-portal/provider/default/${id}`;
    const payload = this.payload;
    try {
      const response = await cornieClient().put(url, this.selectedItem);
      if (response.success) {
        window.notify({
          msg: "Provider Updated",
          status: "success",
        });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: "Provider Not Updated", status: "error" });
    }
  }
  get action() {
    return this.id ? "Update" : "Save";
  }
  deleteProviderWithoutId(index:number){
    this.allProviders.splice(index, 1);
  }
  
  async deleteProviderWithId(id:string){
      const confirmed = await window.confirmAction({
      message: "You are about to delete this provider",
      title: "Delete provider",
    });
    if (!confirmed) {
      return;
    } else {
      try {
        const response = await cornieClient().delete(
          `/api/v1/patient-portal/provider/remove/${id}`
        );
        if (response.success) {
          window.notify({ msg: "Provider deleted", status: "success" });
          await this.fetchPatientProvider();
        }
      } catch (error) {
        window.notify({ msg: "Provider not deleted", status: "error" });
      }
    }
  }



  done() {
    this.$emit("provideradded");
    this.show = false;
  }

  
  printPractitioner(practitioner: IPatientProvider) {
    return `${practitioner.name}`;
  }

    async searchPrimaryDoctors(patientName: any) {
      const AllNotes = cornieClient().get(`/api/v1/utils/practice/search?query=${patientName}`);
       const response = await Promise.all([AllNotes]);
      this.searchResults = response[0].data;
       
    }

  async created() {
    await this.setProviders();
    await this.fetchPatientProvider();
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
