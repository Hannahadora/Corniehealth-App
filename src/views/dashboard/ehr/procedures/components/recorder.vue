<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <span class="pr-2 flex items-center cursor-pointer border-r-2">
          <cornie-icon-btn @click="show = false">
            <arrow-left-icon />
          </cornie-icon-btn>
        </span>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Recorder
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <div class="pb-5">
          <p class="font-bold mb-4">Reference</p>
          <div class="grid grid-cols-4 gap-3 border-b-2 border-dashed pb-6">
            <div
              v-for="(r, i) in radioValues"
              :key="r"
              :class="i == 4 ? 'col-span-2' : 'col-span-1'"
            >
              <cornie-radio
                v-model="selectedOption"
                :value="r.toLocaleLowerCase()"
                :label="r"
              />
            </div>
          </div>
        </div>
        <div>
          <div class="flex flex-col">
            <icon-input
              autocomplete="off"
              type="search"
              v-model="query"
              placeholder="Search"
              class="rounded-full w-full border-2 py-2 px-8 focus:outline-none"
            >
              <template v-slot:prepend>
                <search-icon />
              </template>
            </icon-input>

            <div v-if="selectedOption == 'practitioner'">
              <div
                @click="() => (selectedId = input.id)"
                :class="`rounded-full flex px-5 py-3 cursor-pointer`"
                v-for="(input, index) in practitioners"
                :key="index"
              >
                <div
                  class="flex justify-between items-center space-x-4 w-full mt-2 mb-5 p-1"
                >
                  <div class="w-full flex items-center space-x-1">
                    <div class="w-10 h-10">
                      <avatar
                        class="mr-2"
                        v-if="input.image"
                        :src="input.image"
                      />
                      <avatar class="mr-2" v-else :src="localSrc" />
                    </div>
                    <div class="w-full">
                      <p class="text-sm text-dark font-semibold">
                        {{ input.firstName }}
                        {{ input.lastName }}
                      </p>
                      <p class="text-xs text-gray-500 font-meduim">
                        {{ input.jobDesignation }}
                        {{ input.department }}
                      </p>
                    </div>
                  </div>

                  <div class="relative bottom-1">
                    <cornie-radio
                      v-model="selectedId"
                      :value="input.id"
                      class="bg-danger focus-within:bg-danger px-6 shadow float-right"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div v-if="selectedOption == 'patient'">
              <div
                @click="() => (selectedId = input.id)"
                :class="`rounded-full flex px-5 py-3 cursor-pointer`"
                v-for="(input, index) in patient"
                :key="index"
              >
                <div
                  class="flex justify-between items-center space-x-4 w-full mt-2 mb-5 p-1"
                >
                  <div class="w-full flex items-center space-x-1">
                    <div class="w-10 h-10">
                      <avatar
                        class="mr-2"
                        v-if="input.profilePhoto"
                        :src="input.profilePhoto"
                      />
                      <avatar class="mr-2" v-else :src="localSrc" />
                    </div>
                    <div class="w-full">
                      <p class="text-sm text-dark font-semibold">
                        {{ input.firstname }}
                        {{ input.lastname }}
                      </p>
                    </div>
                  </div>

                  <div class="relative bottom-1">
                    <cornie-radio
                      v-model="selectedId"
                      :value="input.id"
                      class="bg-danger focus-within:bg-danger px-6 shadow float-right"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div v-if="selectedOption == 'related person'">
              <div
                @click="() => (selectedId = input.id)"
                :class="`rounded-full flex px-5 py-3 cursor-pointer`"
                v-for="(input, index) in related"
                :key="index"
              >
                <div
                  class="flex justify-between items-center space-x-4 w-full mt-2 mb-5 p-1"
                >
                  <div class="w-full flex items-center space-x-1">
                    <div class="w-10 h-10">
                      <avatar
                        class="mr-2"
                        v-if="input.profilePhoto"
                        :src="input.profilePhoto"
                      />
                      <avatar class="mr-2" v-else :src="localSrc" />
                    </div>
                    <div class="w-full">
                      <p class="text-sm text-dark font-semibold">
                        {{ input.name }}
                      </p>
                    </div>
                  </div>

                  <div class="relative bottom-1">
                    <cornie-radio
                      v-model="selectedId"
                      :value="input.id"
                      class="bg-danger focus-within:bg-danger px-6 shadow float-right"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            @click="submit"
            :loading="loading"
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
  import Avatar from "@/components/avatar.vue";
  import CornieCard from "@/components/cornie-card";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieIconBtn from "@/components/CornieIconBtn.vue";
  import CornieRadio from "@/components/cornieradio.vue";
  import DateTimePicker from "@/components/date-time-picker.vue";
  import IconInput from "@/components/IconInput.vue";
  import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
  import IPractitioner from "@/types/IPractitioner";
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync } from "vue-property-decorator";
  import { namespace } from "vuex-class";

  const practitioner = namespace("practitioner");

  @Options({
    name: "itemModal",
    components: {
      ...CornieCard,
      CornieIconBtn,
      ArrowLeftIcon,
      CornieDialog,
      DateTimePicker,
      IconInput,
      CornieRadio,
      Avatar,
    },
  })
  export default class itemModal extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @Prop({ type: String, default: "" })
    patient!: any[];

    @Prop({ type: String, default: "" })
    related!: any[];

    @practitioner.State
    practitioners!: IPractitioner[];

    @practitioner.Action
    fetchPractitioners!: () => Promise<void>;

    loading = false;
    selectedOption = "";
    selectedId = "";
    selectedData: any = {};

    localSrc = require("../../../../../assets/img/placeholder.png");

    query = "";

    radioValues = ["Practitioner", "Patient", "Related Person"];

    async created() {
      await this.fetchPractitioners();
      console.log("patients", this.patient);
      console.log("related", this.related);
    }

    submit() {
      if (!this.selectedId) return;
      let u = this.$route.params.id.toLocaleString();

      if (this.selectedOption == "procedure") {
        let d = this.practitioners.find((x) => x.id == this.selectedId);
        this.selectedData = {
          name: d?.firstName + " " + d?.lastName,
          specialty: d?.jobDesignation,
          id: d?.id,
        };
      }

      if (this.selectedOption == "patient") {
        let d = this.patient.find((x: any) => x.id == this.selectedId);
        this.selectedData = { name: d.firstname + " " + d.lastname, id: d?.id };
      }

      if (this.selectedOption == "related person") {
        let d = this.related.find((x: any) => x.id == this.selectedId);
        this.selectedData = { name: d.name, id: d?.id };
      }
      //@ts-ignore
      this.$emit("selectedId", {
        typeData: this.selectedOption,
        ...this.selectedData,
      });
      this.show = false;
    }
  }
</script>

<style>
  .dflex {
    display: -webkit-box;
  }
</style>
