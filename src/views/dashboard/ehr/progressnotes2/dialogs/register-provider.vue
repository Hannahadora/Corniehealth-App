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
          <icon-input
            autocomplete="off"
            type="search"
            placeholder="Search"
            class="rounded-full w-full border-2 focus:outline-none"
          >
            <template v-slot:prepend>
              <search-icon />
            </template>
          </icon-input>
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
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import DeleteIcon from "@/components/icons/deleteorange.vue";
import { IPatient, Provider } from "@/types/IPatient";
import { cornieClient } from "@/plugins/http";
import { string } from "yup";
import { namespace } from "vuex-class";

const patients = namespace("patients");

@Options({
  name: "RegisterProvider",
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
export default class RegisterProvider extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @Prop({ type: String, default: "" })
  title!: string;

  @Prop({ type: Array, default: [] })
  labs!: Provider[];

  @PropSync("providers")
  labsSync!: Provider[];

  @Prop({ type: Array, default: [] })
  pharmacies!: Provider[];

  @PropSync("providers")
  pharmaciesSync!: Provider[];

  @Prop({ type: String })
  patientId!: string;

  @patients.Action
  deleteProvider!: (provider: Provider) => Promise<boolean>;

  name = "";
  email = "";
  referenceOrganization = "";

  requiredString = string().required();
  requiredEmail = string().email();

  get type() {
    return this.title.toLowerCase().includes("lab") ? "lab" : "pharmacy";
  }

  items() {
    return this.type == "lab" ? this.labsSync : this.pharmaciesSync;
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
    if (this.type == "lab") this.labsSync = [...this.labsSync, data];
    else this.pharmaciesSync = [...this.pharmaciesSync, data];
  }

  async submit() {
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
  }

  async toggleDefault(item: Provider) {
    const payload = { ...item, type: this.type };
    try {
      const response = await cornieClient().put(
        `/api/v1/patient/provider/${item.id}`,
        payload
      );
      this.sync(response.data);
      window.notify({ msg: "Provider now made default", status: "success" });
    } catch (error) {
      window.notify({ msg: "Provider Not made default", status: "error" });
    }
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
    const removed = await this.deleteProvider(provider);
    if (removed) window.notify({ msg: "Provider Removed", status: "success" });
    else window.notify({ msg: "Provider not removed", status: "error" });
  }
}
</script>
