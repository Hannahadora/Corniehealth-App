<template>
  <cornie-dialog v-model="show" class="h-full w-3/4" right>
    <cornie-card height="100%" class="flex flex-col bg-white">
      <cornie-card-title>
        <div class="w-full flex items-center justify-between">
          <div class="w-full flex items-center">
            <h2 class="font-bold text-lg text-primary ml-3 -mt-0.5">
              Order Lab and Imaging
            </h2>
          </div>
          <delete-icon
            class="text-danger fill-current cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="overflow-y-auto h-full">
        <div class="flex space-x-4">
          <div class="flex flex-col w-1/3 shadow-lg space-y-5 h-full">
            <accordion-component
              class="rounded-none border-none text-primary shadow-none"
              title="Category"
              :opened="false"
            >
              <!-- <icon-input
                autocomplete="off"
                type="search"
                v-model="query"
                placeholder="Search"
                class="rounded-full w-full border-2 py-2 px-8 focus:outline-none"
              >
                <template v-slot:prepend>
                  <search-icon />
                </template>
              </icon-input> -->
              <!-- {{ query }} -->
              <div class="flex flex-col pt-4 space-y-3">
                <cornie-checkbox label="Laboratory" v-model="queryData.lab" />
                <cornie-checkbox label="Imaging" v-model="queryData.imaging" />
              </div>
            </accordion-component>

            <accordion-component
              class="rounded-none border-none text-primary shadow-none"
              title="Location"
              :opened="false"
            >
              <icon-input
                autocomplete="off"
                type="search"
                v-model="locationQuery"
                placeholder="Search"
                class="rounded-full w-full border-2 py-2 mt-4 px-8 focus:outline-none"
              >
                <template v-slot:prepend>
                  <search-icon />
                </template>
              </icon-input>
              <!-- {{ query }} -->
              <div class="flex flex-col pt-4 space-y-2">
                <label
                  v-for="(l, i) in displayLocations"
                  :key="i"
                  class="flex items-center"
                >
                  <input
                    @change="locationChanged"
                    v-model="l.value"
                    type="checkbox"
                    class="mr-3 cursor-pointer"
                  />
                  {{ l.display }}:
                </label>
                <!-- Locations - {{ pickedLocations }} -->
              </div>
            </accordion-component>

            <accordion-component
              class="rounded-none border-none text-primary shadow-none"
              title="Diagnostics Service"
              :opened="false"
            >
              <icon-input
                autocomplete="off"
                type="search"
                v-model="diagnosticsQuery"
                placeholder="Search"
                class="rounded-full w-full border-2 py-2 mt-4 px-8 focus:outline-none"
              >
                <template v-slot:prepend>
                  <search-icon />
                </template>
              </icon-input>
              <!-- {{ query }} -->
              <div class="flex flex-col">
                <div class="flex flex-col pt-4 space-y-2">
                  <label
                    v-for="(l, i) in displayProviders"
                    :key="i"
                    class="flex items-center"
                  >
                    <input
                      @change="locationChanged"
                      v-model="l.value"
                      type="checkbox"
                      class="mr-3 cursor-pointer"
                    />
                    {{ l.display }}:
                  </label>
                  <!-- Providers - {{ pickedD }} -->
                </div>
              </div>
            </accordion-component>
          </div>
          <div class="flex flex-col w-full px-5 h-full">
            <div class="shadow-md px-3 py-2">
              <icon-input
                autocomplete="off"
                type="search"
                v-model="searchServices"
                placeholder="Search diagnostics services by Name"
                class="rounded-full w-full border-2 py-2 px-8 focus:outline-none"
              >
                <template v-slot:prepend>
                  <search-icon />
                </template>
              </icon-input>
            </div>
            <div v-if="allServices.length == 0">
              <div
                class="flex h-full font-bold items-center h-100 justify-center text-center p-10"
              >
                No services available
              </div>
            </div>
          </div>
        </div>
      </cornie-card-text>
      <div class="flex justify-end mx-4 mt-auto mb-4 pt-5">
        <cornie-btn
          @click="show = false"
          class="border-primary border-2 px-1 mr-3 rounded-xl text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn
          @click="continueProcess"
          class="text-white bg-danger px-6 rounded-xl"
        >
          Proceed
        </cornie-btn>
      </div>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
  import CornieCard from "@/components/cornie-card";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieIconBtn from "@/components/CornieIconBtn.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import CornieCheckbox from "@/components/custom-checkbox.vue";
  import AccordionComponent from "@/components/form-accordion.vue";
  import IconInput from "@/components/IconInput.vue";
  import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
  import DeleteIcon from "@/components/icons/cancel.vue";
  import { cornieClient } from "@/plugins/http";
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync, Watch } from "vue-property-decorator";

  @Options({
    name: "ClinicalDialog",
    components: {
      ...CornieCard,
      CornieIconBtn,
      CornieDialog,
      ArrowLeftIcon,
      DeleteIcon,
      CornieSelect,
      AccordionComponent,
      IconInput,
      CornieCheckbox,
    },
    emits: ["continueProcess"],
  })
  export default class AddCondition extends Vue {
    @Prop({ type: Boolean, default: false })
    modelValue!: boolean;

    @PropSync("modelValue")
    show!: boolean;

    queryData = {
      lab: false,
      imaging: false,
    };

    locationQuery = "";
    locations = [];

    async locationChanged() {
      this.pickedLocations = this.displayLocations
        .filter((x) => x.value == true)
        .map((x) => x.display);
      await this.fetchServices();
    }

    async diagnosticsC() {
      this.pickedD = this.displayProviders
        .filter((x) => x.value == true)
        .map((x) => x.id);
      await this.fetchServices();
    }
    pickedLocations: any[] = [];
    pickedD: any[] = [];
    diagnosticsQuery = "";
    diagnostics = [];
    categoryOptions = ["Laboratory", "Imaging"];
    searchServices = "";
    accountType = "";
    paymentType = "";
    allServices = [];
    query = "";

    @Watch("locationQuery")
    fetchL() {
      if (!this.locationQuery) return;
      this.fetchLocations();
    }

    @Watch("diagnosticsQuery")
    fetchD() {
      if (!this.diagnosticsQuery) return;
      this.fetchProviders();
    }

    get displayLocations() {
      return this.locations.map((x) => {
        return {
          display: x,
          value: false,
        };
      });
    }

    get displayProviders() {
      return this.diagnostics.map((x: any) => {
        return {
          display: x.name,
          value: false,
          id: x.id,
        };
      });
    }

    async fetchLocations() {
      const pending = cornieClient().get(
        `/api/v1/patient-portal/diagnostics/locations/?query=${this.locationQuery}`
      );
      const response = await Promise.all([pending]);
      console.log("locations", response[0].data);
      this.locations = response[0].data;
    }

    async fetchProviders() {
      const pending = cornieClient().get(
        `/api/v1/patient-portal/diagnostics/providers/?query=${this.diagnosticsQuery}`
      );
      const response = await Promise.all([pending]);
      console.log("diagnostics", response[0].data);
      this.diagnostics = response[0].data;
    }

    async fetchServices() {
      const pending = cornieClient().get(
        `/api/v1/patient-portal/diagnostics/services/${this.generateQ()}`
      );
      const response = await Promise.all([pending]);
      console.log("services", response[0].data);
      this.diagnostics = response[0].data;
    }

    generateQ() {
      let qString = "?";
      let categoryQ = `category=${
        this.queryData.lab == true ? "laboratory," : ""
      }${this.queryData.imaging == true ? "imaging" : ""}`;
      let locationQ = `&locations=${this.pickedLocations.join(",")}`;
      let providerQ = `&providers=${this.pickedD.join(",")}`;

      return qString + categoryQ + locationQ + providerQ;
    }

    continueProcess() {
      this.$emit("continueProcess", {
        paymentType: this.paymentType,
        accountType: this.accountType,
      });
      this.show = false;
    }
  }
</script>
