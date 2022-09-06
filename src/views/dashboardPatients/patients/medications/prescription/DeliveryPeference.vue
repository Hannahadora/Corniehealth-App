<template>
  <cornie-dialog v-model="show" right class="w-5/12 h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white overflow-y-scroll"
    >
      <cornie-card-title class="">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Delivery Preferences
          </h2>
          <cancel-red-bg
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <div class="w-full p-4 shadow flex items-start">
          <img src="@/assets/img/blue-location.svg" alt="" />
          <div class="mx-4">
            <span class="text-sm text-blue-300 italic">Default Address</span>
            <p class="font-bold">
              9A Wilton Drive, Pinnock Beach Estate, Lekki
            </p>
            <span class="text-sm text-blue-300 italic">Office</span>
            <p class="font-bold">
              Preferred Delivery Times
              <img
                @click="showDeliveryTimes = true"
                class="ml-2"
                src="@/assets/img/chevrondown.svg"
                alt=""
              />
            </p>
            <div v-if="showDeliveryTimes" class="flex items-center">
              <p>{{ day }}</p>
              <p>{{ hour }}</p>
            </div>
          </div>
          <div class="flex items-center">
            <edit class="mr-10" />
            <delete-red />
          </div>
        </div>

        <div class="flex items-center cursor-pointer" @click="showForm">
          <plus class="mr-2" />
          <p class="text-red-400">Add Another Address</p>
        </div>

        <v-form v-if="showForm" class="flex-grow flex flex-col" @submit="save">
          <div>
            <cornie-select
              label="Type"
              v-model="type"
              placeholder="--Select--"
              :items="types"
              class=""
            />
            <cornie-select
              label="Country"
              v-model="pharmacy"
              placeholder="--Select--"
              :items="countrys"
            />
            <cornie-select
              label="State or Region"
              v-model="pharmacy"
              placeholder="--Select--"
              :items="countrys"
            />
            <cornie-input
              label="City"
              v-model="city"
              placeholder="--Enter--"
              class=""
            />
            <cornie-input
              label="Zip or Post Code"
              v-model="zipCode"
              placeholder="--Enter--"
            />
            <cornie-input
              label="Apartment or House Number"
              v-model="appartment"
              placeholder="--Enter--"
            />
            <cornie-input
              label="Address"
              v-model="address"
              placeholder="--Enter--"
            />
          </div>
          <accordion-component
            class="text-primary shadow-none border-none"
            title="Preferred Delivery Times"
            :opened="false"
          >
          </accordion-component>
        </v-form>

       
      </cornie-card-text>

      <div class="flex items-center justify-end mt-6 mb-6 px-5">
        <cornie-btn
          class="border-primary border-2 px-3 py-1 mr-3 rounded-lg text-primary"
        >
         Cancel
        </cornie-btn>
        <cornie-btn
          @click="save('')"
          :loading="loading"
          type="submit"
          class="text-white bg-danger px-3 py-1 rounded-lg"
        >
          Save
        </cornie-btn>
      </div>
    </cornie-card>

    <upload-prescription v-model="uploadPrescriptionModal" />
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
import PlusIcon from "@/components/icons/plus.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieBtn from "@/components/CornieBtn.vue";
import { namespace } from "vuex-class";
import { CornieUser } from "@/types/user";
import { string } from "yup";
import AutoComplete from "@/components/autocomplete.vue";
import { cornieClient } from "@/plugins/http";
import CornieRadio from "@/components/cornieradio.vue";
import { IPatient } from "@/types/IPatient";

// import AccordionComponent from "@/components/dialog-accordion.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import Edit from "@/components/icons/edit.vue";

const hierarchy = namespace("hierarchy");
const orgFunctions = namespace("OrgFunctions");
const user = namespace("user");
const patients = namespace("patients");

@Options({
  name: "AddPrescriptionDialog",
  components: {
    CornieDialog,
    ...CornieCard,
    Edit,
    ArrowLeft,
    IconBtn,
    CornieInput,
    CornieSelect,
    CustomCheckbox,
    CornieBtn,
    AutoComplete,
    CornieRadio,
    CancelRedBg,
    AccordionComponent,
    PlusIcon,
  },
})
export default class AddPrescriptionDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, default: {} })
  observation!: any;

  loading = false;

  showDeliveryTimes = false;
  showForm = false;

  get addresses() {
    return [];
  }
  get locations() {
    return [];
  }
  get pharmacys() {
    return [];
  }

  async save() {}

  async created() {}
}
</script>

<style scoped>
td {
  padding: 16px;
}
</style>
