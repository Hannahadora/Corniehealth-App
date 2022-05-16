<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <span
          class="text-primary font-extrabold text-lg border-l-2 border-gray-100 pl-2"
        >
          Authorise Practitioners
        </span>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <p class="text-sm mb-5">Grant practitioner(s) access to patient record.</p>
        <v-form ref="form" class="grid grid-cols-1">
             <span class="w-full border-b-2 border-gray-200 pb-5">
                <search-input
                    v-model="query"
                    background="bg-gray-200"
                    :results="results"
                    @selected="selected"
                    placeholder="Search for practitioner"
                >
                    <template #item="{ item }">
                    <div class="w-full flex items-center justify-between">
                        <div class="flex items-center">
                        <avatar :src="item.image"  />
                        <div class="flex ml-1 flex-col">
                            <span class="font-semibold text-sm">
                            {{ printPractitioner(item) }}
                            </span>
                            <span class="text-xs font-semibold text-gray-200">
                            {{ item.specialty }}
                            </span>
                        </div>
                        </div>
                        <span class="text-danger font-semibold text-sm">
                        Grant Access
                        </span>
                    </div>
                    </template>
                </search-input>
            </span>
            <div class="mt-5">
                <span class="uppercase text-sm font-bold">Access granted</span>
                <div class="mt-5" v-for="(item, index) in practitioners" :key="`-${index}`">
                    <div class="flex items-center mb-5 space-x-4">
                        <avatar :src="item.image" class="h-10 w-10" />
                        <div class="flex ml-1 flex-col">
                            <span class="font-semibold text-sm">
                            {{ item.firstName +''+ item.lastName }}
                            </span>
                            <span class="text-xs font-semibold text-gray-500">
                            {{ item.jobDesignation }}
                            </span>
                        </div>
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
            @click="save"
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
import { Vue, Options } from "vue-class-component";
import { PropSync, Prop, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { string } from "yup";
import { cornieClient } from "@/plugins/http";

import { IPatient, RelatedPerson } from "@/types/IPatient";

import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieDatePicker from "@/components/CornieDatePicker.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import PeriodPicker from "@/components/daterangepicker.vue";
import AutoComplete from "@/components/autocomplete.vue";
import SearchIcon from "@/components/icons/search.vue";
import CornieSearch from "@/components/search-input.vue";
import DeleteIcon from "@/components/icons/delete-red.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieAccordion from "@/components/accordion-component-provider.vue";
import Avatar from "@/components/avatar.vue";

import SearchInput from "@/components/search-input.vue";
import IPractitioner from "@/types/IPractitioner";
import practitioner from "@/store/practitioner";
import ObjectSet from "@/lib/objectset";

const practitioners = namespace("practitioner");
const patients = namespace("patients");

@Options({
  name: "providersdialog",
  components: {
    ...CornieCard,
    CornieAccordion,
    CornieIconBtn,
    AutoComplete,
    ArrowLeftIcon,
    CornieDialog,
    CornieInput,
    CornieSelect,
    PeriodPicker,
    CorniePhoneInput,
    CornieDatePicker,
    CornieBtn,
    Avatar,
    SearchIcon,
    SearchInput,
    CornieSearch,
    DeleteIcon,
    CornieRadio,
  },

})
export default class providersdialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String })
  id!: string;

  @practitioners.Action
  searchPractitioners!: (q: string) => Promise<IPractitioner[]>;

  @patients.Action
  findPatient!: (id: string) => Promise<IPatient>;

 
  loading = false;
  query= "";
  results: any[] = [];

  
  patient = {} as IPatient;
  practitioners: IPractitioner[] = [];

  @Watch("query")
  async search(query: string) {
    if (!query) return (this.results = []);
    const practitioners = await this.searchPractitioners(query);
    this.results = practitioners.map((p) => ({
      ...p,
      display: this.printPractitioner(p),
    }));
  }
  

  printPractitioner(practitioner: IPractitioner) {
    return `${practitioner.jobDesignation} ${practitioner.firstName} ${practitioner.lastName}`;
  }

  async save(){
      this.loading = true;
      this.$emit('set-authorize')
      this.loading = false;
      this.show = false;
  }

get patientName() {
    if (!this.patient?.id) return "";
    return `${this.patient.firstname} ${this.patient.lastname}`;
  }

  async selected(practitioner: IPractitioner) {
    const confirmed = await window.confirmAction({
      title: "Grant access",
      message: `You are about to grant ${this.printPractitioner(
        practitioner
      )} access to this patient's data, are you sure?`,
    });
    if (!confirmed) return;
    await this.commitSelection(practitioner);
  }

    async commitSelection(selected: IPractitioner) {
         console.log(selected,"practitioner")
    try {
      await cornieClient().post(
        `/api/v1/patient/authorize/practitioner/${this.id}`,
        [selected.id]
      );
      const practitionersSet = new ObjectSet(
        [...this.practitioners, selected],
        "id"
      );
      this.practitioners = [...practitionersSet];
      window.notify({
        msg: "Access granted",
        status: "success",
      });
    } catch (error) {
      window.notify({
        msg: "There  was an error please try again",
        status: "error",
      });
    }
  }

   async fetchPractitioners() {
    try {
      const response = await cornieClient().get(
        `/api/v1/patient/authorized/practitioners/${this.id}`
      );
      this.practitioners = response.data;
    } catch (error) {
      window.notify({ msg: "Couldn't fetch practitioners", status: "error" });
    }
  }


 async created() {
    this.fetchPractitioners();
    this.patient = await this.findPatient(this.id);
    this.patientName;
  }
}
</script>
<style scoped>
.image-con {
  width: 32px;
  height: 32px;
}
</style>