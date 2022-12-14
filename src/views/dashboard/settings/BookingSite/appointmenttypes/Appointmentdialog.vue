<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            New Appointment
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <main-cornie-select
          class="w-full mb-5"
          v-model="serviceId"
          @click="setFee(serviceId)"
          :items="allServiceName"
          label="Service Name"
          placeholder="--Autoloaded--"
        >
        </main-cornie-select>
        <div class="mb-5">
          <span class="text-sm font-semibold mb-1">Practitioners</span>
            <Multiselect
                 v-model="practitioners"
                  mode="tags"
                  :hide-selected="false"
                  id="field-id"
                  :options="allPractitioner"
                  value-prop="code"
                  trackBy="code"
                  label="code"
                  placeholder="--Select--"
                  class="w-full"
                >
                  <template v-slot:tag="{ option, handleTagRemove, disabled }">
                    <div class="multiselect-tag is-user">
                      {{ option.display }}
                      <span
                        v-if="!disabled"
                        class="multiselect-tag-remove"
                        @mousedown.prevent="handleTagRemove(option, $event)"
                      >
                        <span class="multiselect-tag-remove-icon"></span>
                      </span>
                    </div>
                  </template>
                   <template v-slot:option="{ option }">
                    <span class="w-full text-sm">{{ option.display }}</span>
                   </template>
                </Multiselect>
        </div>
          <cornie-input
          disabled
          label="Duration"
          placeholder="--Autoloaded--"
          class="mb-8 w-full"
          v-model="duration"
        />

        <cornie-input
          disabled
          label="Appointment Fee"
          placeholder="--Autoloaded--"
          class="mb-8 w-full"
          v-model="fee"
        />

        <div class="w-full mt-5 mb-8">
          <span class="text-sm font-semibold mb-3"
            >Appointment Confirmation</span
          >
          <div class="grid grid-cols-2 gap-4 mt-3 mb-5">
            <cornie-radio
              name="confirm"
              value="pay-to-confirm"
              v-model="appointmentConfirmation"
              checked
              label="Pay to Confirm"
            />
            <cornie-radio
              name="confirm"
              value="pay-later"
              v-model="appointmentConfirmation"
              label="Confirm and pay later"
            />
            <cornie-radio
              name="confirm"
              value="either"
              v-model="appointmentConfirmation"
              label="Either"
            />
          </div>
        </div>
        <div class="mb-5">
          <span class="text-sm font-semibold mb-1">Link forms</span>
          <Multiselect
                 v-model="linkForms"
                  mode="tags"
                  :hide-selected="false"
                  id="field-id"
                  :options="allForms"
                  value-prop="code"
                  trackBy="code"
                  label="code"
                  placeholder="--Select--"
                  class="w-full"
                >
                  <template v-slot:tag="{ option, handleTagRemove, disabled }">
                    <div class="multiselect-tag is-user">
                      {{ option.display }}
                      <span
                        v-if="!disabled"
                        class="multiselect-tag-remove"
                        @mousedown.prevent="handleTagRemove(option, $event)"
                      >
                        <span class="multiselect-tag-remove-icon"></span>
                      </span>
                    </div>
                  </template>
                   <template v-slot:option="{ option }">
                    <span class="w-full text-sm">{{ option.display }}</span>
                   </template>
          </Multiselect>
        </div>

     
        <domain-input
          label="Booking Site Link"
          placeholder="--Enter--"
          :rules="requiredRule"
          :modelValue="orgValue"
          v-model="bookingSiteLink"
          class="mb-6"
        />
        <div class="flex space-x-4 w-full mt-3">
          <span class="flex space-x-1 text-sm font-semibold text-primary"
            ><copyform-icon /> <span>Copy</span></span
          >
          <span class="flex space-x-1 text-sm font-semibold text-primary"
            ><share-icon class="fill-current text-primary" /> <span>Share</span>
          </span>
        </div>
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
            @click="apply"
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
import { Options, Vue } from "vue-class-component";
import Accordion from "@/components/accordion-component.vue";
import CornieInput from "@/components/cornieinput.vue";
import { namespace } from "vuex-class";
import CustomDropdown from "@/components/cornieselect.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import ChevronDown from "@/components/icons/chevrondownprimary.vue";
import DateTimePicker from "./components/datetime-picker.vue";
import ToggleCheck from "@/components/ToogleCheck.vue";
import PlusIcon from "@/components/icons/plus.vue";
import MainCornieSelect from "@/components/cornieselect.vue";
import TextArea from "@/components/textarea.vue";
import Multiselect from "@vueform/multiselect";
import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import IPractitioner from "@/types/IPractitioner";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import PractionerSelect from "@/components/practitioner-select.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import DomainInput from "@/components/newdomaininput.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CopyformIcon from "@/components/icons/formcopy.vue";
import EditIcon from "@/components/icons/edit.vue";
import ShareIcon from "@/components/icons/newshare.vue";
import DatePicker from "@/components/daterangepicker.vue";
import { cornieClient } from "@/plugins/http";
import Period from "@/types/IPeriod";
import IAppointmentTypes from "@/types/IAppointmentTypes";
import ICatalogueService from "@/types/ICatalogue";

const organization = namespace("organization");
const appointmentType = namespace("appointmentType");
const catalogues = namespace("catalogues");

@Options({
  components: {
    ...CornieCard,
    CornieIconBtn,
    Accordion,
    CornieInput,
    CancelIcon,
    ArrowLeftIcon,
    CustomDropdown,
    DeleteIcon,
    Multiselect,
    ChevronDown,
    CornieDialog,
    CopyformIcon,
    CornieRadio,
    ShareIcon,
    DomainInput,
    DateTimePicker,
    DatePicker,
    ToggleCheck,
    MainCornieSelect,
    TextArea,
    PlusIcon,
    PractionerSelect,
  },
})
export default class AppointmentTypeDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @catalogues.Action
  getServices!: () => Promise<void>;

  @catalogues.State
  services!: ICatalogueService[];

  @appointmentType.Action
  getAppointmentTypeById!: (id: string) => IAppointmentTypes;

  @organization.Action
  fetchOrgInfo!: () => Promise<void>;

  @organization.State
  organizationInfo: any;

  appointmentItem = "";
  showDetails = true;
  orgValue = "";
  showBreaks = false;
  showPlanning = false;
  loading = false;
  date = new Date();

  duration = "";
  singlePractitioner = [""];
  singleform = "";
  practitioners = [""];
  fee = 0;
  linkForms = [""];
  bookingSiteLink = "";
  serviceId = "";
  serviceName = "";
  appointmentConfirmation = "Pay to Confirm";

  practitioner = [];
  practiceform = [];
  serviceFees = [] as any;
  arr = [] as any[];

  data: any = {};
  selectedActors: any[] = [];
  availableSlots: any[] = [];

  @Watch("id")
  idChanged() {
    this.setAppointmentType();
  }

  async setAppointmentType() {
    const appointmentType = await this.getAppointmentTypeById(this.id);
    if (!appointmentType) return;
    this.practitioners = appointmentType.practitioners;
    this.linkForms = appointmentType.linkForms;
    this.bookingSiteLink = appointmentType.bookingSiteLink;
    this.serviceId = appointmentType.serviceId;
    this.appointmentConfirmation = appointmentType.appointmentConfirmation;
  }

  get payload() {
    const filteritems = this.practitioners.filter((c) => c !== "");
    const filteritems2 = this.linkForms.filter((c) => c !== "");
    return {
      duration: this.duration,
      practitioners: this.practitioners,
      linkForms: this.linkForms,
      bookingSiteLink: this.bookingSiteLink,
      serviceId: this.serviceId,
      appointmentConfirmation: this.appointmentConfirmation,
    };
  }

  get allPractitioner() {
    if (!this.practitioner || this.practitioner.length === 0) return [];
    return this.practitioner.map((i: any) => {
      return {
        code: i.id,
        display: i.firstName + " " + i.lastName,
      };
    });
  }

  sendPractioner() {
    this.practitioners.push(this.singlePractitioner as any);
  }
  sendForm() {
    this.linkForms.push(this.singleform);
  }
  get allForms() {
    if (!this.practiceform || this.practiceform.length === 0) return [];
    return this.practiceform.map((i: any) => {
      return {
        code: i.id,
        display: i.code,
      };
    });
  }
  get allServiceName() {
    if (!this.services || this.services.length === 0) return [];
    return this.services.map((i: any) => {
      return {
        code: i.id,
        display: i.name,
      };
    });
  }
  setFee(id: string) {
    const pt = this.serviceFees.find((i: any) => i.id === id);
    return pt ? (this.fee = pt.fee) : "", (this.duration = pt.serviceUOM);
  }
  done() {
    this.$emit("type-added");
    this.show = false;
  }

  async fetchPractitioner() {
    const AllPractitioner = cornieClient().get("/api/v1/practitioner");
    const response = await Promise.all([AllPractitioner]);
    this.practitioner = response[0].data;
  }

  async fetchPracticeForms() {
    const AllForms = cornieClient().get("/api/v1/practice-form/surveys");
    const response = await Promise.all([AllForms]);
    this.practiceform = response[0].data;
  }
  async fetchServiceFess() {
    const AllForms = cornieClient().get("/api/v1/catalogue-service/fees");
    const response = await Promise.all([AllForms]);
    this.serviceFees = response[0].data;
  }

  async apply() {
    this.loading = true;
    if (this.id) await this.updateAppointmentType();
    else await this.createAppointmentType();
    this.loading = false;
  }
  async createAppointmentType() {
    //this.serviceId = this.organizationInfo.id;
    try {
      const response = await cornieClient().post(
        "/api/v1/appointment-types",
        this.payload
      );
      if (response.success) {
        window.notify({
          msg: "Appointment Type Created",
          status: "success",
        });
        this.done();
      }
    } catch (error) {
      window.notify({
        msg: "Appointment Type not Created",
        status: "error",
      });
    }
  }
  get filterItems() {
    return this.practitioners.filter((c: any) => c !== null);
  }
  get filterItems2() {
    return this.linkForms.filter((c: any) => c !== null);
  }
  apractitioner = ["d4249dec-f3ab-444f-867d-5710e3c6891a"];
  alinkForms = ["046c3d84-78d6-4162-b530-81b9175971de"];
  async updateAppointmentType() {
    const url = `/api/v1/appointment-types/${this.id}`;

    const payload = {
      duration: this.duration,
      practitioners: this.practitioners,
      linkForms: this.linkForms,
      bookingSiteLink: this.bookingSiteLink,
      serviceId: this.serviceId,
      appointmentConfirmation: this.appointmentConfirmation,
    };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({
          msg: "Appointment Type  updated",
          status: "success",
        });
        this.done();
      }
    } catch (error) {
      window.notify({
        msg: "Appointment Type not  updated",
        status: "error",
      });
    }
  }
  async created() {
    await this.fetchPractitioner();
    await this.fetchPracticeForms();
    await this.getServices();
    if (!this.organizationInfo || this.organizationInfo.length === 0)
      await this.fetchOrgInfo();
    this.orgValue = this.organizationInfo.domainName;
    await this.fetchServiceFess();
    //this.appointmentTypes();
  }
}
</script>
<style>
.dashed-bottom {
  border-bottom: 1px dashed #667499;
}

.h-scrren {
  height: 100vh;
  overflow: scroll;
  padding-bottom: 40px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.h-scrren::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.h-scrren {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
