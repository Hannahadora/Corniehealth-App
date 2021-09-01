<template>
  <div>
    <cornie-dialog v-model="show" right class="w-4/12 h-full">
      <cornie-card height="100%" class="flex flex-col">
        <cornie-card-title>
          <cornie-icon-btn @click="show = false">
            <arrow-left-icon />
          </cornie-icon-btn>
          <span
            class="
              text-primary
              font-extrabold
              text-lg
              border-l-2 border-gray-100
              pl-2
            "
          >
            General Practitioners
          </span>
        </cornie-card-title>
        <div class="px-2">
          <icon-input
            autocomplete="off"
            type="search"
            placeholder="Search by practitioner name"
            class="rounded-full w-full border-2 focus:outline-none"
          >
            <template v-slot:prepend>
              <search-icon />
            </template>
          </icon-input>
          <v-form class="mt-4 w-full" @submit="submit">
            <cornie-input
              label="Practice Assigned Provider"
              class="my-2 rounded-none w-full"
              v-model="providerPractice"
            />
            <cornie-input
              label="Email Address"
              v-model="email"
              :rules="requiredEmail"
              class="my-2 rounded-none w-full"
            />
            <cornie-input
              label="Reference Organization"
              class="my-2 rounded-none w-full"
              v-model="referenceOrganization"
            />
            <span class="flex justify-end">
              <cornie-btn
                @click="show = false"
                class="text-primary border-2 mr-2 border-primary"
              >
                Cancel
              </cornie-btn>
              <cornie-btn
                type="submit"
                class="text-white bg-danger px-6 rounded-xl"
              >
                Save
              </cornie-btn>
            </span>
          </v-form>
        </div>
        <hr class="mx-2 h-2 my-4" />
        <div class="px-2">
          <h2 class="uppercase font-semibold text-xs">
            SELECT DEFAULT PRACTITIONER
          </h2>
          <div class="flex items-center" v-for="(item, i) in items" :key="i">
            <input
              @change="toggleDefault(item)"
              v-model="item.default"
              type="checkbox"
              class=""
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
import { Prop, PropSync } from "vue-property-decorator";
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

const patients = namespace("patients");

@Options({
  name: "PractitionersDialog",
  components: {
    ...CornieCard,
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
  },
})
export default class PractitionersDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @Prop({ type: Object })
  patient!: IPatient;

  practitioner!: IPractitioner;

  get items() {
    return [];
  }

  get email() {
    return "";
  }

  get practice() {
    return "";
  }

  get referenceOrganization() {
    return "";
  }

  remove(item: Practitioner, index: number) {
    console.log("removing");
  }

  toggleDefault(item: Practitioner) {
    console.log("toggling");
  }
}
</script>
