<template>
  <cornie-dialog v-model="show" right class="w-1/2 h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll"
    >
      <cornie-card-title class="">
        <icon-btn class="cursor-pointer" @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3">Create New</h2>
          <cancel-icon class="float-right cursor-pointer mt-1" @click="show = false" />
        </div>
      </cornie-card-title>
      <cornie-card-text>
        <v-form class="flex-grow flex flex-col">
          <accordion-component
            class="rounded-none border-none text-primary"
            title="Basic info"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <div class="flex flex-col w-full">
                <div class="capitalize text-black text-sm font-semibold">Based on</div>
                <div
                  @click="() => (showBasedOn = true)"
                  class="flex border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none self-center">
                    <add-icon />
                  </div>
                </div>
              </div>
              <div class="flex flex-col w-full">
                <div class="capitalize text-black text-sm font-semibold">Part of</div>
                <div
                  @click="() => (showPartOf = true)"
                  class="flex border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none self-center">
                    <add-icon />
                  </div>
                </div>
              </div>
              <cornie-select
                :label="'Category'"
                v-model="code"
                placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
              <cornie-select
                :label="'Code'"
                v-model="code"
                placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
            </div>
          </accordion-component>
          <div class="border-2 h-1 border-dashed w-full my-4"></div>

          <accordion-component
            class="rounded-none border-none text-primary"
            title="Performed"
            :opened="false"
          >
            <div class="flex flex-col">
              <div>Performed</div>
              <div class="flex space-x-2">
                <div v-for="r in performedOptions" :key="r">
                  <cornie-radio
                    v-model="performed"
                    :value="r.toLocaleLowerCase()"
                    :label="r"
                  />
                </div>
              </div>
              <div>
                <date-time-picker
                  v-if="performed == 'date/time'"
                  class="w-full"
                  label="Date reported"
                  v-model:date="date"
                  v-model:time="time"
                />
                <div v-if="performed == 'period'" class="grid grid-cols-2 gap-6">
                  <date-time-picker
                    class="w-full"
                    label="Date reported"
                    v-model:date="date"
                    v-model:time="time"
                  />
                  <date-time-picker
                    class="w-full"
                    label="Date reported"
                    v-model:date="date"
                    v-model:time="time"
                  />
                </div>
                <cornie-input
                  v-if="performed == 'string'"
                  class="w-full"
                  label="String"
                  placeholder="Enter"
                />
              </div>
            </div>
          </accordion-component>
          <div class="border-2 h-1 border-dashed w-full my-4"></div>

          <accordion-component
            class="rounded-none text-primary"
            title="Recorder"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-5">
              <div class="flex flex-col">
                <div class="flex flex-row items-center justify-between">
                  <div>Recorder</div>
                  <div class="flex items-center space-x-1">
                    <check-box v-model="recorderCheck" class="mr-2" />
                    <div>Assert this record</div>
                  </div>
                </div>
                <div>
                  <cornie-input
                    :disabled="true"
                    class="w-full"
                    placeholder="Autoloaded"
                  />
                </div>
              </div>
            </div>
          </accordion-component>
          <div class="border-2 h-1 border-dashed w-full my-4"></div>

          <accordion-component
            class="rounded-none text-primary"
            title="Performer"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <div class="flex flex-col w-full">
                <div class="capitalize text-black text-sm font-semibold">Actor</div>
                <div
                  @click="() => (showActor = true)"
                  class="flex border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none self-center">
                    <add-icon />
                  </div>
                </div>
              </div>
              <div class="flex flex-col w-full">
                <div class="capitalize text-black text-sm font-semibold">Function</div>
                <div
                  @click="() => (showFunction = true)"
                  class="flex border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none self-center">
                    <add-icon />
                  </div>
                </div>
              </div>
              <cornie-select
                :label="'On Behalf'"
                v-model="code"
                placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
            </div>
          </accordion-component>
          <div class="border-2 h-1 border-dashed w-full my-4"></div>

          <accordion-component
            class="rounded-none text-primary"
            title="Location"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <div class="flex flex-col w-full">
                <div class="capitalize text-black text-sm font-semibold">Location</div>
                <div
                  @click="() => (showLocation = true)"
                  class="flex border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none self-center">
                    <add-icon />
                  </div>
                </div>
              </div>
              <cornie-select
                :label="'Reason Code'"
                v-model="code"
                placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
              <div class="flex flex-col w-full">
                <div class="capitalize text-black text-sm font-semibold">
                  Reason Reference
                </div>
                <div
                  @click="() => (showReasonReference = true)"
                  class="flex border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none self-center">
                    <add-icon />
                  </div>
                </div>
              </div>
              <cornie-select
                :label="'Body site'"
                v-model="code"
                placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
              <cornie-select
                :label="'Outcome'"
                v-model="code"
                placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
              <div class="flex flex-col w-full">
                <div class="capitalize text-black text-sm font-semibold">Report</div>
                <div
                  @click="() => (showReport = true)"
                  class="flex border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none self-center">
                    <add-icon />
                  </div>
                </div>
              </div>
              <cornie-select
                :label="'Complication'"
                v-model="code"
                placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
              <cornie-select
                :label="'Complication Detail'"
                v-model="code"
                placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
              <cornie-select
                :label="'Follow Up'"
                v-model="code"
                placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
              <cornie-input class="w-full" :label="'Note'" placeholder="Autoloaded" />
            </div>
          </accordion-component>
          <div class="border-2 h-1 border-dashed w-full my-4"></div>
          <accordion-component
            class="rounded-none text-primary"
            title="Focal Device"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <cornie-select
                :label="'Action'"
                v-model="code"
                placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
              <cornie-select
                :label="'Manipulated'"
                v-model="code"
                placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
            </div>
          </accordion-component>
          <div class="border-2 h-1 border-dashed w-full my-4"></div>

          <accordion-component
            class="rounded-none text-primary"
            title="Used items"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <div class="flex flex-col w-full">
                <div class="capitalize text-black text-sm font-semibold">
                  Used reference
                </div>
                <div
                  @click="() => (showUsedReference = true)"
                  class="flex border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none self-center">
                    <add-icon />
                  </div>
                </div>
              </div>
              <cornie-select
                :label="'Used Code'"
                v-model="code"
                placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
            </div>
            <div class="flex w-full justify-end">
              <div
                class="rounded-full space-x-3 font-bold px-6 py-3 flex text-primary items-center justify-center border border-primary"
              >
                <add-icon />
                <div>Add</div>
              </div>
            </div>
          </accordion-component>
        </v-form>
      </cornie-card-text>
    </cornie-card>
    <div>
      <basedon v-model="showBasedOn" />
      <parton v-model="showPartOf" />
      <actor v-model="showActor" />
      <function v-model="showFunction" />
      <location v-model="showLocation" />
      <reason-reference v-model="showReasonReference" />
      <report v-model="showReport" />
      <used-reference v-model="showUsedReference" />
    </div>
  </cornie-dialog>
</template>
<script lang="ts">
import CornieCard from "@/components/cornie-card";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CheckBox from "@/components/custom-checkbox.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import AddIcon from "@/components/icons/plus.vue";
import DateTimePicker from "@/views/dashboard/schedules/components/datetime-picker.vue";
import { Options, Vue } from "vue-class-component";
import { PropSync } from "vue-property-decorator";
import actor from "./actor.vue";
import basedon from "./basedon.vue";
import Function from "./function.vue";
import location from "./location.vue";
import parton from "./partof.vue";
import reasonReference from "./reason-reference.vue";
import report from "./report.vue";
import usedReference from "./used-reference.vue";

@Options({
  components: {
    CornieDialog,
    ...CornieCard,
    ArrowLeft,
    CancelIcon,
    AddIcon,
    DateTimePicker,
    AccordionComponent,
    basedon,
    CornieSelect,
    parton,
    CheckBox,
    CornieInput,
    actor,
    Function,
    location,
    reasonReference,
    report,
    usedReference,
  },
})
export default class NewProgressNote extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  performedOptions = ["Date/Time", "Age", "Period", "Range", "String"];
  showBasedOn = false;
  showPartOf = false;
  showItemReference = false;
  showActor = false;
  showFunction = false;
  showLocation = false;
  showReasonReference = false;
  showReport = false;
  showUsedReference = false;

  performed = "";
  recorderCheck = "";
  date = "23/04/2022";
  time = "";
  code = "";
  assessment = {
    protocol: "",
    summary: "",
  };
}
</script>
