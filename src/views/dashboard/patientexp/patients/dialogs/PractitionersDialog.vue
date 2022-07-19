<template>
  <div>
    <cornie-dialog v-model="show" right class="w-4/12 h-full">
      <cornie-card height="100%" class="flex flex-col">
        <cornie-card-title>
          <cornie-icon-btn @click="show = false">
            <arrow-left-icon />
          </cornie-icon-btn>
          <span
            class="text-primary font-extrabold text-lg border-l-2 border-gray-100 pl-2"
          >
            Primary Doctor
          </span>
        </cornie-card-title>
        <div class="px-2">
          <search-input
            v-model="query"
            :results="results"
            @selected="selected"
            placeholder="Search practitioner"
          />

          <v-form class="mt-4 w-full">
            <div class="w-full grid grid-cols-1 gap-y-3">
              <cornie-input
                label="Practice Assigned Provider"
                class="rounded-none w-full"
                v-model="practice"
                :disabled="true"
              
              />
              <cornie-input
                label="Email Address"
                v-model="email"
                class="rounded-none w-full"
                :disabled="true"
              
              />
              <cornie-input
                label="Reference Organization"
                class="rounded-none w-full"
                v-model="referenceOrganizationName"
                :disabled="true"
               
              />
            </div>
            <span class="flex justify-end">
              <cornie-btn
                @click="show = false"
                type="button"
                class="text-primary rounded-lg border-2 mr-2 border-primary"
              >
                Cancel
              </cornie-btn>
              <cornie-btn
                type="button"
                @click="save"
                class="text-white bg-danger px-6 rounded-lg"
              >
                Save
              </cornie-btn>
            </span>
          </v-form>
        </div>
        <hr class="mx-2 h-2 my-4" />
        <div class="px-2" v-if="items.length">
          <h2 class="uppercase font-semibold text-xs">
            SELECT DEFAULT PRACTITIONER
          </h2>
          <div class="flex items-center mb-5 mt-5" v-for="(item, i) in allPractitioner" :key="i">
            <cornie-radio
              name="default"
              :modelValue="item.default"
              @change="toggleDefault(item)"
            />
            <div class="flex flex-col ml-3">
              <span> {{ item.name }} </span>
              <small class="text-gray-300 text-xs font-semibold">
                {{ item.email }}
              </small>
            </div>
            <delete-icon
              @click="remove(item, i)"
              class="cursor-pointer ml-auto"
            />
          </div>
        </div>
      </cornie-card>
    </cornie-dialog>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/NewCornieSelect.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieDatePicker from "@/components/CornieDatePicker.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import PillIcon from "@/components/icons/PillIcon.vue";
import TestTubeIcon from "@/components/icons/test-tube.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import DeleteIcon from "@/components/icons/deleteorange.vue";
import { IPatient, Practitioner, Provider } from "@/types/IPatient";
import { cornieClient } from "@/plugins/http";
import { string } from "yup";
import { namespace } from "vuex-class";
import IPractitioner from "@/types/IPractitioner";
import SearchInput from "@/components/search-input.vue";
import { IOrganization } from "@/types/IOrganization";
import CornieRadio from "@/components/cornieradio.vue";
import ObjectSet from "@/lib/objectset";

const patients = namespace("patients");
const practitioners = namespace("practitioner");
const organization = namespace("organization");

interface Result extends IPractitioner {
  display: string;
}

interface GeneralPractitioner extends IPractitioner {
  default?: boolean;
}

@Options({
  name: "PractitionersDialog",
  components: {
    ...CornieCard,
    SearchInput,
    SearchIcon,
    TestTubeIcon,
    CornieIconBtn,
    IconInput,
    ArrowLeftIcon,
    DeleteIcon,
    CornieDialog,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieDatePicker,
    CornieBtn,
    PillIcon,
    CornieRadio,
  },
})
export default class PractitionersDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @Prop({ type: Object })
  patient!: IPatient;

  @Prop({ type: Array, default: [] })
  practitoners!: GeneralPractitioner[];

  @PropSync("practitioners")
  practitonersSync!: GeneralPractitioner[];

  @organization.State
  organizationInfo!: IOrganization;

  @organization.Action
  fetchOrgInfo!: () => Promise<void>;

  loading = false;

  @practitioners.Action
  searchPractitioners!: (q: string) => Promise<IPractitioner[]>;

  query = "";
  results: Result[] = [];

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

  email = "";
  practice = "";
  referenceOrganization = "";
  referenceOrganizationName = "";
  practitioner!: IPractitioner;
  allPractitioner = [] as any;
  emailRule = string().email().required();

  @patients.Action
  updatePatientField!: (data: {
    id: string;
    field: string;
    data: any[];
  }) => void;

  async selected(practitioner: IPractitioner) {
    this.email = practitioner.email;
    this.practice = practitioner.department;
    this.referenceOrganization = practitioner.organizationId;
    this.referenceOrganizationName = this.organizationInfo.name;
  }

  get items() {
    const genPractitioners = this.patient?.generalPractitioners || [];
    if (genPractitioners.length < 1) return this.practitonersSync;
    return genPractitioners;
  }

  async save() {
    this.loading = true;
    if (this.patient) await this.submit();
    else this.addToBatch();
    this.loading = false;
  }

  pushPractitioners() {
    this.allPractitioner.push({
      email : this.email,
      practice: this.practice,
      referenceOrganization: this.referenceOrganization, 
      referenceOrganizationName: this.referenceOrganizationName
    })
    // const practitionerSet = new ObjectSet(
    //   [...this.practitonersSync, this.practitioner],
    //   "id"
    // );
    // this.practitonersSync = [...practitionerSet];
  }

  addToBatch() {
    if(!this.query){
      window.notify({ msg: "Please search for a practitioner", status: "error" });
    }else{

      this.pushPractitioners();
  
      window.notify({ msg: "Practitioner added", status: "success" });
      this.$emit('added-pract', this.allPractitioner);
      
      this.email = "";
      this.practice = "";
      this.referenceOrganization = "";
      this.referenceOrganizationName = "";
    }

  }

  async submit() {
    try {
      await cornieClient().post("/api/v1/patient/practitioner", {
        practitioner: this.practitioner.id,
      });
      window.notify({
        msg: `Practitioner added `,
        status: "success",
      });
    } catch (error) {
      window.notify({ msg: `Practitioner not added`, status: "error" });
    }
  }

  async remove(item: Practitioner, index: number) {
    if (item.id) await this.removeRemote(item);
    else this.removeLocal(index);
  }

  async removeLocal(index: number) {
    this.practitonersSync = this.practitonersSync.filter(
      (value, i) => i != index
    );
  }

  async removeRemote(item: Practitioner) {
    try {
      await cornieClient().delete(`/api/v1/patient/practitioner/${item.id}`);
      this.deletePractitioner(item.id!!);
      window.notify({
        msg: "Practitioner deleted from patient",
        status: "success",
      });
    } catch (error) {
      window.notify({
        msg: "Practitioner not deleted from patient",
        status: "error",
      });
    }
  }

  deletePractitioner(id: string) {
    let practitioners = this.patient.generalPractitioners || [];
    practitioners = practitioners.filter((p) => p.id == id);
    this.updatePatientField({
      id: this.patient.id!!,
      field: "generalPractitioners",
      data: practitioners,
    });
  }

  async toggleDefault(practitioner: Practitioner) {
    const { id } = practitioner;
    if (!this.patient) return;
    try {
      await cornieClient().patch(
        `/api/v1/patient/practitioner/set-default/${this.patient.id}/${id}`,
        {}
      );
      this.updateDefaultPractitioner(practitioner);
      window.notify({ msg: "Practitioner made default", status: "success" });
    } catch (error) {
      window.notify({ msg: "Practitioner not made default", status: "error" });
    }
  }

  updateDefaultPractitioner(practitioner: Practitioner) {
    let practitioners = this.patient.generalPractitioners;
    practitioners = practitioners!!.map((p) => {
      if (p.id != practitioner.id) return { ...p, default: false };
      return { ...p, default: true };
    });
    this.updatePatientField({
      id: this.patient.id!!,
      field: "generalPractitioners",
      data: practitioners,
    });
  }
  created() {
    if (!this.organizationInfo) this.fetchOrgInfo();
  }
}
</script>
