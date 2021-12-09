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
            Preferred {{ title }}
          </span>
        </cornie-card-title>
        <div class="px-2">
          <provider-search @selected="selected" :type="type" />
          <v-form class="mt-4 w-full" @submit="submit">
            <cornie-input
              :label="`${title} Name`"
              class="my-2 rounded-none w-full"
              v-model="name"
              :rules="requiredString"
            />
            <cornie-input
              label="Reference Organization"
              class="my-2 rounded-none w-full"
              v-model="referenceOrganization"
              :rules="requiredString"
            />
            <cornie-input
              label="Email Address"
              v-model="email"
              :rules="requiredEmail"
              class="my-2 rounded-none w-full"
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
                :loading="loading"
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
            SELECT DEFAULT {{ title }}
          </h2>
          <div class="flex items-center" v-for="(item, i) in items" :key="i">
            <cornie-radio
              @change="toggleDefault(item)"
              v-model="item.default"
              type="radio"
              :name="type"
              class=""
            />
            <div class="flex flex-col ml-3">
              <span> {{ item.name }} </span>
              <small class="text-gray-300 text-xs font-semibold">
                {{ item.email }}
              </small>
            </div>
            <delete-icon
              @click="removeProvider(item, i)"
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
import DeleteIcon from "@/components/icons/deleteorange.vue";
import { IPatient, Provider } from "@/types/IPatient";
import { cornieClient } from "@/plugins/http";
import { string } from "yup";
import { namespace } from "vuex-class";
import CornieRadio from "@/components/cornieradio.vue";
import ProviderSearch from "./provider-search.vue";

const patients = namespace("patients");

@Options({
  name: "RegisterProvider",
  components: {
    ...CornieCard,
    ProviderSearch,
    TestTubeIcon,
    CornieIconBtn,
    ArrowLeftIcon,
    DeleteIcon,
    CornieDialog,
    CornieInput,
    CornieRadio,
    CornieSelect,
    CorniePhoneInput,
    CornieDatePicker,
    CornieBtn,
    PillIcon,
  },
})
export default class RegisterProvider extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @Prop({ type: String, default: "" })
  title!: string;

  @Prop({ type: Array, default: [] })
  labs!: Provider[];

  @PropSync("labs")
  labsSync!: Provider[];

  @Prop({ type: Array, default: [] })
  pharmacies!: Provider[];

  @PropSync("pharmacies")
  pharmaciesSync!: Provider[];

  @Prop({ type: Object })
  patient!: IPatient;

  @patients.Action
  deleteProvider!: (provider: Provider) => Promise<boolean>;

  @patients.Action
  updatePatientField!: (data: {
    id: string;
    field: string;
    data: any[];
  }) => void;

  get patientId() {
    return this.patient?.id;
  }

  selected(item: Provider) {
    this.name = item.name;
    this.email = item.email;
    this.referenceOrganization = item.referenceOrganization || "";
    this.id = item.id!!;
  }

  id = "";
  loading = false;
  name = "";
  email = "";
  referenceOrganization = "";

  requiredString = string().required();
  requiredEmail = string().email();

  get type() {
    return this.title.toLowerCase().includes("lab") ? "lab" : "pharmacy";
  }

  get preferredLabs() {
    if (!this.patientId) return this.labsSync;
    return this.patient.preferredLabs;
  }

  get pharms() {
    return this.patientId
      ? this.patient.preferredPharmacies
      : this.patient.preferredPharmacies;
  }

  addProviders(providers: Provider[]) {
    const key = this.type == "lab" ? "preferredLabs" : "preferredPharmacies";
    this.updatePatientField({
      id: this.patient.id!!,
      field: key,
      data: providers,
    });
  }

  get items() {
    const items = this.type == "lab" ? this.preferredLabs : this.pharms;
    return items?.map((item) => ({
      ...item,
      default: (item as any).patient_provider?.default || false,
    }));
  }

  get payload() {
    const payload = {
      email: this.email,
      name: this.name,
      referenceOrganization: this.referenceOrganization,
      default: false,
      type: this.type,
    } as Provider;
    if (this.patientId) payload.patientId = this.patientId;
    if (this.id) payload.id = this.id;
    return payload;
  }

  reset() {
    this.email = "";
    this.name = "";
    this.referenceOrganization = "";
  }

  async save() {
    if (this.patientId) await this.submit();
    else {
      this.sync(this.payload);
    }
    this.reset();
  }

  sync(data: Provider) {
    if (this.patientId) return this.storeSync(data);
    if (this.type == "lab") this.labsSync = [...this.labsSync, data];
    else this.pharmaciesSync = [...this.pharmaciesSync, data];
  }

  storeSync(data: Provider) {
    let providers: Provider[];
    if (this.type == "lab") providers = [...this.labsSync, data];
    else providers = this.pharmaciesSync = [...this.pharmaciesSync, data];
    this.addProviders(providers);
  }
  async submit() {
    this.loading = true;
    try {
      const response = await cornieClient().post(
        "/api/v1/patient/provider",
        this.payload
      );
      this.sync(response.data);
      window.notify({ msg: "Provider Added", status: "success" });
    } catch (error) {
      window.notify({ msg: "Provider Not Added", status: "error" });
    }
    this.loading = false;
  }

  async toggleDefault(item: Provider) {
    try {
      await cornieClient().put(
        `/api/v1/patient/provider/default/${this.patientId}/${item.id}`,
        {}
      );
      this.updateDefault(item);
      window.notify({ msg: "Provider now made default", status: "success" });
    } catch (error) {
      window.notify({ msg: "Provider Not made default", status: "error" });
    }
  }

  updateDefault(item: Provider) {
    let providers = this.items!!;
    providers = providers.map((p) => {
      let isDefault = false;
      if (p.id == item.id) isDefault = true;
      return {
        ...p,
        default: isDefault,
      };
    });
    this.addProviders(providers);
  }

  excise(index: number) {
    if (this.type == "lab") {
      this.labsSync = this.labsSync.filter((val, i) => i != index);
    }
    if (this.type == "pharmacy") {
      this.pharmaciesSync = this.pharmaciesSync.filter((val, i) => i != index);
    }
  }

  async removeProvider(provider: Provider, index: number) {
    if (!this.patientId) {
      return this.excise(index);
    }
    const removed = await this.deleteProvider({
      ...provider,
      patientId: this.patientId,
    });
    if (removed) window.notify({ msg: "Provider Removed", status: "success" });
    else window.notify({ msg: "Provider not removed", status: "error" });
  }
}
</script>
