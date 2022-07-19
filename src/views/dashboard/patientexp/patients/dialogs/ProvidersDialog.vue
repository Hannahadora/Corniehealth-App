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
          Providers
        </span>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <p class="text-sm mb-5">Add providers and select a default.</p>
        <v-form ref="form" class="grid grid-cols-1">
          <div class="flex flex-col">
            <cornie-search
              label="Name"
              class="w-full rounded-full mb-3"
              placeholder="Search by name or email"
              v-model="name"
            >
            </cornie-search>
          </div>
          <cornie-select
            label="Type"
            class="w-full"
            placeholder="Select One"
            :items="['Pharmacy', 'Diagnostics']"
            v-model="providerType"
          />
          <cornie-input
            label="Practice Name"
            class="rounded-none w-full"
            v-model="practice"
          />
          <cornie-input
            label="Email Address"
            class="rounded-none w-full"
            :rules="emailRule"
            v-model="email"
          />
          <div class="flex justify-end w-full">
            <button
              class="px-5 py-2 rounded-xl border border-primary text-primary font-bold"
              @click="add"
              type="button"
            >
              Add
            </button>
          </div>
          <div>
            <div class="border-b border-gray-400 my-4 w-full"></div>
            <h1 class="uppercase font-bold text-xs">Select default provider</h1>
          </div>
          <template v-if="providersList.length">
            <cornie-accordion
              v-for="item in providersList"
              :key="item"
              :title="item"
              class="mb-4"
            >
              <template v-if="providers.length">
                <div
                  v-for="provider in providers"
                  :key="provider.id"
                  class="mt-3 flex justify-between items-center"
                >
                  <template v-if="provider.providerType === item">
                    <div class="flex items-center">
                      <div class="mr-1">
                        <cornie-radio
                          :name="item"
                          @update:modelValue="setDefault"
                          :value="provider.id"
                        ></cornie-radio>
                      </div>
                      <div>
                        <h1 class="font-semibold text-sm">
                          {{ provider.practice }}
                        </h1>
                        <h1 class="text-xs text-gray-400">
                          {{ provider.email }}
                        </h1>
                      </div>
                    </div>
                    <button
                      @click="delProvider(provider.id, item)"
                      type="button"
                    >
                      <delete-icon />
                    </button>
                  </template>
                </div>
              </template>
            </cornie-accordion>
          </template>
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
    SearchIcon,
    CornieSearch,
    DeleteIcon,
    CornieRadio,
  },
  emits: ["add-providers"],
})
export default class providersdialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Object })
  patient!: IPatient;


  providerType = "";
  name = "";
  practice = "";
  email = "";
  loading = false;
  emailRule = string().email().required();

  providers = [] as any;

  providersList = [] as any;

   @Watch("patient")
  patientChanged() {
    
  }



  reset() {
    this.providerType = "";
    this.name = "";
    this.practice = "";
    this.email = "";
  }

  setDefault(val: string) {
    let item = this.providers.find((item: any) => item.id === val);
    if (item) item.default = true;
    this.providers.forEach((i: any) => {
      if (i.id !== val && i.providerType === item.providerType) {
        i.default = false;
      }
    });
  }

  addProviders(type: any) {
    const hasType = this.providersList.includes(type);

    if (!hasType) this.providersList.push(type);
  }

  async add() {
    if (this.providerType === "") return;
    this.addProviders(this.providerType);

    this.providers.push({
      id: `${Math.random() * 1999}${Math.random() * 2999}`,
      providerType: this.providerType,
      name: this.name,
      practice: this.practice,
      email: this.email,
      default: false,
    });

    this.reset();
  }

  async delProvider(id: string, provider: string) {
    const confirm = await window.confirmAction({
      title: `Delete ${provider}`,
      message: `Are you sure you want to delete this ${provider.toLowerCase()}?This ${provider.toLowerCase()} can always be added back even after deletion.`,
      yes: "Proceed",
      no: "Cancel",
    });

    if (confirm) {
      this.providers = this.providers.filter((item: any) => item.id !== id);
      let inList = this.providers.filter(
        (item: any) => item.providerType === provider
      );

      if (inList.length === 0) {
        console.log(inList);
        this.providersList = this.providersList.filter(
          (item: any) => item !== provider
        );
      }
    }
  }

  // async save() {
  //   console.log(this.providers);
  //   this.$emit("add-providers", this.providers);

  //   this.show = false;
  //   this.providers = [];
  // }

async save() {
    this.loading = true;
    if (this.patient) await this.submit();
    else this.batch();
    this.loading = false;
  }

  batch() {
    console.log(this.providers);
    this.$emit("add-providers", this.providers, this.providerType);

    this.show = false;
    this.providers = [];
  }

  async submit() {
    const action = this.patient?.id ? "Updated" : "Created";
    let result: any;
    try {
      if (this.patient?.id) result = await this.update();
      else result = await this.createNew();
      window.notify({
        msg: ` ${action} successfully`,
        status: "success",
      });
    } catch (error) {
      window.notify({ msg: `Provider not ${action}`, status: "error" });
    }
  }

    async createNew() {
    const response = await cornieClient().post(
      "/api/v1/patient/provider",
      this.providers
    );
    return response.data;
  }
  async update() {
    const response = await cornieClient().put(
      `/api/v1/patient/provider/${this.patient?.id}`,
      this.providers
    );
    return response.data;
  }

  created() {}
}
</script>
