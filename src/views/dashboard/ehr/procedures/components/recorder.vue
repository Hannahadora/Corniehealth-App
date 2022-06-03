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
        <div class="border-b-2 border-dashed pb-5">
          <p class="font-bold mb-4">Recorder</p>
          <cornie-radio :label="'Practitoner'" name="pract" />
        </div>
        <div>
          <search-input placeholder="Search" v-model="query" class="py-4" />

          <div v-for="(input, index) in practitioners" :key="index">
            <div class="flex justify-between space-x-4 w-full mt-2 mb-5 p-1">
              <div class="w-full dflex space-x-1">
                <div class="w-10 h-10">
                  <avatar class="mr-2" v-if="input.image" :src="input.image" />
                  <avatar class="mr-2" v-else :src="localSrc" />
                </div>
                <div class="w-full">
                  <p class="text-sm text-dark font-semibold">
                    Dr. {{ input.firstName }}
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
                  name="practioner"
                  class="bg-danger focus-within:bg-danger px-6 shadow float-right"
                />
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
  import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
  import SearchInput from "@/components/search-input.vue";
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
      SearchInput,
      CornieRadio,
      Avatar,
    },
  })
  export default class itemModal extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @Prop({ type: String, default: "" })
    id!: string;

    @practitioner.State
    practitioners!: IPractitioner[];

    @practitioner.Action
    fetchPractitioners!: () => Promise<void>;

    loading = false;

    localSrc = require("../../../../../assets/img/placeholder.png");

    query = "";

    async created() {
      await this.fetchPractitioners();
    }
  }
</script>

<style>
  .dflex {
    display: -webkit-box;
  }
</style>
