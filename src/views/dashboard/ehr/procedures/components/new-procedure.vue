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
          <h2 class="font-bold float-left text-lg text-primary ml-3">
            Create New
          </h2>
          <cancel-icon
            class="float-right fill-current text-danger cursor-pointer mt-1"
            @click="show = false"
          />
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
                <div class="capitalize text-black text-sm font-semibold">
                  Based on
                </div>
                <div
                  @click="() => (showBasedOn = true)"
                  class="flex items-center border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none self-center">
                    <add-icon class="fill-current text-danger" />
                  </div>
                </div>
              </div>
              <div class="flex flex-col w-full">
                <div class="capitalize text-black text-sm font-semibold">
                  Part of
                </div>
                <div
                  @click="() => (showPartOf = true)"
                  class="flex items-center border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none self-center">
                    <add-icon class="fill-current text-danger" />
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
              <div class="flex space-x-3 w-full mt-3">
                <div v-for="r in performedOptions" :key="r">
                  <cornie-radio
                    v-model="performed"
                    :value="r.toLocaleLowerCase()"
                    :label="r"
                  />
                </div>
              </div>
              <div class="mt-2">
                <date-time-picker
                  v-if="performed == 'date/time'"
                  class="w-full"
                  label="Date reported"
                  v-model:date="date"
                  v-model:time="time"
                />
                <div class="w-full mt-1" v-if="performed == 'age'">
                  <span class="text-sm font-semibold mb-3">Age</span>
                  <div class="flex space-x-2 w-full">
                    <cornie-input
                      placeholder="0"
                      class="grow w-full"
                      :setfull="true"
                      v-model="age.value"
                    />
                    <cornie-select
                      :items="['Day']"
                      placeholder="/ Day"
                      class="w-32 mt-0.5 flex-none"
                      :setPrimary="true"
                      v-model="age.day"
                    />
                  </div>
                </div>
                <div
                  v-if="performed == 'period'"
                  class="grid grid-cols-2 gap-6"
                >
                  <date-time-picker
                    class="w-full"
                    label="Start Date/time"
                    v-model:date="date"
                    v-model:time="time"
                  />
                  <date-time-picker
                    class="w-full"
                    label="End Date/time"
                    v-model:date="date"
                    v-model:time="time"
                  />
                </div>
                <div class="w-full mt-1" v-if="performed == 'range'">
                  <!-- <span class="text-sm font-semibold mb-3">Range</span> -->
                  <div class="grid grid-cols-2 gap-6">
                    <div class="flex flex-col">
                      <div>Range (min)</div>
                      <div class="flex space-x-2 w-full">
                        <cornie-input
                          placeholder=""
                          class="grow w-full"
                          :setfull="true"
                          v-model="range.value"
                        />
                        <cornie-select
                          :items="['Day']"
                          placeholder="/ Day"
                          class="w-32 mt-0.5 flex-none"
                          :setPrimary="true"
                          v-model="range.day"
                        />
                      </div>
                    </div>
                    <div class="flex flex-col">
                      <div>Range (max)</div>
                      <div class="flex space-x-2 w-full">
                        <cornie-input
                          placeholder=""
                          class="grow w-full"
                          :setfull="true"
                          v-model="range.value"
                        />
                        <cornie-select
                          :items="['Day']"
                          placeholder="/ Day"
                          class="w-32 mt-0.5 flex-none"
                          :setPrimary="true"
                          v-model="range.day"
                        />
                      </div>
                    </div>
                  </div>
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
                <div class="capitalize text-black text-sm font-semibold">
                  Actor
                </div>
                <div
                  @click="() => (showActor = true)"
                  class="flex items-center border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none self-center">
                    <add-icon class="fill-current text-danger" />
                  </div>
                </div>
              </div>
              <div class="flex flex-col w-full">
                <div class="capitalize text-black text-sm font-semibold">
                  Function
                </div>
                <div
                  @click="() => (showFunction = true)"
                  class="flex items-center border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none self-center">
                    <add-icon class="fill-current text-danger" />
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
                <div class="capitalize text-black text-sm font-semibold">
                  Location
                </div>
                <div
                  @click="() => (showLocation = true)"
                  class="flex items-center border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none self-center">
                    <add-icon class="fill-current text-danger" />
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
                  class="flex items-center border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none self-center">
                    <add-icon class="fill-current text-danger" />
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
                <div class="capitalize text-black text-sm font-semibold">
                  Report
                </div>
                <div
                  @click="() => (showReport = true)"
                  class="flex items-center border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none self-center">
                    <add-icon class="fill-current text-danger" />
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
              <cornie-input
                class="w-full"
                :label="'Note'"
                placeholder="Autoloaded"
              />
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
                  class="flex items-center border rounded-md p-3 mt-0.5"
                >
                  <div class="flex-1">Select</div>
                  <div class="flex-none self-center">
                    <add-icon class="fill-current text-danger" />
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
      <div class="flex items-center justify-end mt-24">
        <div class="flex items-center mb-6">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 py-1 mr-3 rounded-lg text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="submit"
            type="submit"
            class="text-white bg-danger px-3 py-1 rounded-lg"
          >
            Save
          </cornie-btn>
        </div>
      </div>
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
  import CornieRadio from "@/components/cornieradio.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import CheckBox from "@/components/custom-checkbox.vue";
  import DateTimePicker from "@/components/date-time-picker.vue";
  import AccordionComponent from "@/components/form-accordion.vue";
  import ArrowLeft from "@/components/icons/arrowleft.vue";
  import CancelIcon from "@/components/icons/cancel.vue";
  import AddIcon from "@/components/icons/plus.vue";
  import { Options, Vue } from "vue-class-component";
  import { PropSync } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import actor from "./actor.vue";
  import basedon from "./basedon.vue";
  import Function from "./function.vue";
  import location from "./location.vue";
  import parton from "./partof.vue";
  import reasonReference from "./reason-reference.vue";
  import report from "./report.vue";
  import usedReference from "./used-reference.vue";

  const procedure = namespace("procedure");

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
      CornieRadio,
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

    performed = "range";
    recorderCheck = "";
    loading = false;
    date = "";
    time = "";
    code = "";
    assessment = {
      protocol: "",
      summary: "",
    };
    age = {
      value: "",
      day: "",
    };
    period = {
      value: "",
      day: "",
    };
    range = {
      value: "",
      day: "",
    };

    @procedure.Action
    createProcedure!: (procedure: any) => Promise<boolean>;

    async submit() {
      let g = {
        patientId: this.$route.params.id,
        // recorderId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        // asserterId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        recorder: {
          name: "string",
          specialty: "string",
        },
        basedOn: [
          {
            type: "care-plan",
            date: "2022-05-30",
            name: "string",
          },
        ],
        partOf: {
          type: "location",
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          name: "string",
        },
        category: "string",
        // code: "120006",
        status: "preparation",
        performed: {
          // dateTime: "2022-05-30",
          // age: {
          //   unit: "string",
          //   value: 0,
          // },
          period: {
            start: "2022-05-30",
            end: "2022-05-30",
            startTime: "2022-05-30",
            endTime: "2022-05-30",
          },
          // range: {
          //   unit: "string",
          //   min: 0,
          //   max: 0,
          // },
          // string: "string",
        },
        performers: [
          {
            type: "practitioner",
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "string",
            detail: "string",
            dispenserType: "string",
            dispenser: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          },
        ],
        performerFunction: {
          type: "procedure",
          practitioner: "string",
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          name: "string",
          detail: "string",
        },
        locations: [
          {
            type: "location",
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "string",
          },
        ],
        reason: {
          type: "condition",
          practitioner: "string",
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          name: "string",
          detail: "string",
          practitionerSpecialty: "string",
          date: "2022-05-30",
        },
        bodySite: "string",
        outcome: "string",
        // report: {
        //   type: "diagnostic-report",
        //   date: "2022-05-30",
        //   id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        //   name: "string",
        //   detail: "string",
        // },
        report: "jkdlkfj09435",
        complication: "string",
        complicationDetail: "string",
        followUp: "string",
        note: "string",
        focalDeviceAction: "string",
        focalDeviceManipulated: "string",
        statusHistory: {
          value: "string",
          start: "2022-05-30",
          end: "2022-05-30",
          practitionerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          practitionerName: "string",
          current: true,
          priorPrescription: "string",
          detectedIssue: "string",
          eventHistory: "string",
        },
        usedItems: [
          {
            type: "device",
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "string",
            detail: "string",
          },
        ],
      };

      await this.createProcedure(g);
    }

    mounted() {
      console.log("mounted");
    }
  }
</script>
