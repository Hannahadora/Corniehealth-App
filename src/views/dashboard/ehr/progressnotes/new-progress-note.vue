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
            title="Subjective"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 py-6">
              <div class="col-span-2">
                <div class="flex w-1/2">
                  <div class="flex flex-col w-full">
                    <div class="capitalize text-black text-sm font-semibold">
                      Chief complaint
                    </div>
                    <div
                      @click="() => (showProblemModal = true)"
                      class="flex border rounded-md p-3 mt-0.5"
                    >
                      <div class="flex-1">Select</div>
                      <div class="flex-none self-center">
                        <add-icon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-span-2">
                <div class="font-bold">History of Present illness(HPI)</div>
              </div>
              <div class="col-span-2 border-b border-dashed pb-10">
                <div class="grid grid-cols-2 gap-6">
                  <div class="col-span-1">
                    <div class="flex flex-col">
                      <div class="flex">
                        <div class="capitalize text-black text-sm font-semibold flex-1">
                          Condition
                        </div>
                        <div class="flex-none">
                          <div class="underline-danger text-danger underline">
                            View Details
                          </div>
                        </div>
                      </div>
                      <div class="flex border bg-gray-400 rounded-md p-3 mt-0.5">
                        Autoloaded
                      </div>
                    </div>
                  </div>
                  <div class="col-span-1">
                    <date-time-picker
                      class="w-full h-full"
                      label="Date recorded"
                      v-model:date="date"
                      v-model:time="time"
                    />
                  </div>
                  <div class="col-span-1">
                    <div class="flex flex-col">
                      <div class="capitalize text-black text-sm font-semibold">
                        Severity
                      </div>
                      <div class="flex border bg-gray-400 rounded-md p-3 mt-0.5">
                        Autoloaded
                      </div>
                    </div>
                  </div>
                  <div class="col-span-1">
                    <div class="flex flex-col">
                      <div class="capitalize text-black text-sm font-semibold">
                        Verification status
                      </div>
                      <div class="flex border bg-gray-400 rounded-md p-3 mt-0.5">
                        Autoloaded
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <accordion-component
              class="rounded-none shadow-none border-none text-primary"
              title="Medications"
              :opened="false"
            >
              <div class="flex w-full justify-between space-x-20 pt-3">
                <div class="flex-none">
                  <div class="flex flex-col">
                    <div class="flex space-x-1 items-center">
                      <div class="font-bold">Paracetamol</div>
                      <div class="font-light text-xxs">(Tablet)</div>
                    </div>
                    <div class="font-light text-xs">27/12/2019</div>
                  </div>
                </div>
                <div class="flex-1 flex space-x-5">
                  <div class="flex flex-col w-full">
                    <div class="flex">
                      <div class="capitalize text-black text-sm font-semibold flex-1">
                        Strength
                      </div>
                      <!-- <div class="flex-none">
                        <div class="underline-danger text-danger">View details</div>
                      </div> -->
                    </div>
                    <div class="flex border bg-gray-400 rounded-md p-3 mt-0.5">
                      Autoloaded
                    </div>
                  </div>
                  <div class="flex flex-col w-full">
                    <div class="flex">
                      <div class="capitalize text-black text-sm font-semibold flex-1">
                        Dosage
                      </div>
                      <!-- <div class="flex-none">
                        <div class="underline-danger text-danger">View details</div>
                      </div> -->
                    </div>
                    <div class="grid grid-cols-3 gap-x-2">
                      <div class="flex border bg-gray-400 rounded-md p-3 mt-0.5">
                        2 Tabs
                      </div>
                      <div class="flex border bg-gray-400 rounded-md p-3 mt-0.5">
                        1:1:1
                      </div>
                      <div
                        class="flex border text-white bg-blue-700 rounded-md p-3 mt-0.5"
                      >
                        x 3 Days
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </accordion-component>
          </accordion-component>
          <div class="border-2 h-1 border-dashed w-full my-4"></div>
          <accordion-component
            class="rounded-none border-none text-primary"
            title="Objective"
            :opened="false"
          >
            <div class="flex flex-col space-y-7">
              <div class="flex flex-col">
                <div class="font-bold py-5">Diagnostics</div>
                <div class="grid grid-cols-2 gap-6">
                  <div class="flex flex-col">
                    <div class="flex">
                      <div class="capitalize text-black text-sm font-semibold flex-1">
                        Diagnostics
                      </div>
                      <div class="flex-none">
                        <div class="underline-danger text-danger text-sm">
                          View details
                        </div>
                      </div>
                    </div>
                    <div class="flex border bg-gray-400 rounded-md p-3 mt-0.5">
                      Autoloaded
                    </div>
                  </div>
                  <date-time-picker
                    class="w-full"
                    label="Date reported"
                    v-model:date="date"
                    v-model:time="time"
                  />
                </div>
              </div>
              <div class="flex flex-col">
                <div class="font-bold flex py-5 items-center">
                  <div class="flex-1">Investigation</div>
                  <div class="flex-none">
                    <div
                      class="flex text-danger underline-danger text-sm font-bold items-center space-x-2"
                    >
                      <div>
                        <add-icon />
                      </div>
                      <div>Add New</div>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-6">
                  <cornie-select
                    :label="'Code'"
                    v-model="code"
                    placeholder="Select"
                    :items="['ASAP', 'Callback results', 'callback for scheduling']"
                  />
                  <div class="flex flex-col">
                    <div class="capitalize text-black text-sm font-semibold">item</div>
                    <div
                      @click="() => (showItemsModal = true)"
                      class="flex border rounded-md p-3 mt-0.5"
                    >
                      <div class="flex-1">Select</div>
                      <div class="flex-none">
                        <add-icon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </accordion-component>
          <div class="border-2 h-1 border-dashed w-full my-4"></div>
          <accordion-component
            class="rounded-none border-none text-primary"
            title="Assessment"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-6 pt-5">
              <cornie-select
                :label="'Protocol(optional)'"
                v-model="assessment.protocol"
                placeholder="Select"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
              <cornie-select
                :label="'Summary'"
                v-model="assessment.summary"
                placeholder="Enter"
                :items="['ASAP', 'Callback results', 'callback for scheduling']"
              />
              <div class="col-span-2">
                <div class="flex w-full py-3 font-bold">Findings</div>
                <div class="grid grid-cols-2 gap-6">
                  <div class="col-span-1">
                    <cornie-select
                      :label="'Item code'"
                      v-model="assessment.summary"
                      placeholder="Enter"
                      :items="['ASAP', 'Callback results', 'callback for scheduling']"
                    />
                  </div>
                  <div class="col-span-1">
                    <div class="flex flex-col">
                      <div class="capitalize text-black text-sm font-semibold">
                        Item Reference
                      </div>
                      <div
                        @click="() => (showItemReference = true)"
                        class="flex border rounded-md p-3 mt-0.5"
                      >
                        <div class="flex-1">Select</div>
                        <div class="flex-none self-center">
                          <add-icon />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-span-1">
                    <cornie-input class="w-full" label="Basis" placeholder="Enter" />
                  </div>
                </div>
              </div>
            </div>
            <accordion-component
              class="rounded-none shadow-none border-none text-primary"
              title="Prognosis"
              :opened="false"
            >
              <div class="grid grid-cols-2 gap-6 pt-5">
                <cornie-select
                  :label="'Code'"
                  v-model="code"
                  placeholder="Select"
                  :items="['ASAP', 'Callback results', 'callback for scheduling']"
                />
                <cornie-select
                  :label="'Reference'"
                  v-model="code"
                  placeholder="Select"
                  :items="['ASAP', 'Callback results', 'callback for scheduling']"
                />
                <cornie-select
                  :label="'Supporting info'"
                  v-model="code"
                  placeholder="Select"
                  :items="['ASAP', 'Callback results', 'callback for scheduling']"
                />
                <cornie-input
                  class="w-full"
                  label="Item REference"
                  placeholder="Autoloaded"
                />
              </div>
            </accordion-component>
          </accordion-component>
          <div class="border-2 h-1 border-dashed w-full my-4"></div>
          <accordion-component
            class="rounded-none border-none text-primary"
            title="Plan"
            :opened="false"
          >
            <div class="grid grid-cols-2 gap-5 pt-5">
              <div class="flex items-center w-full p-5 shadow-lg rounded-md">
                <div class="flex-1">
                  <div class="flex flex-col">
                    <div class="">Medication Request</div>
                    <div class="text-xxs">Create New</div>
                  </div>
                </div>
                <div class="flex-none">
                  <div
                    class="bg-grays w-14 h-14 flex items-center justify-center text-center"
                  >
                    <add-icon />
                  </div>
                </div>
              </div>
              <div class="flex items-center w-full p-5 shadow-lg rounded-md">
                <div class="flex-1">
                  <div class="flex flex-col">
                    <div class="">Diagnostics Request</div>
                    <div class="text-xxs">Create New</div>
                  </div>
                </div>
                <div class="flex-none">
                  <div
                    class="bg-grays w-14 h-14 flex items-center justify-center text-center"
                  >
                    <add-icon />
                  </div>
                </div>
              </div>
              <div class="flex items-center w-full p-5 shadow-lg rounded-md">
                <div class="flex-1">
                  <div class="flex flex-col">
                    <div class="">Referral Request</div>
                    <div class="text-xxs">Create New</div>
                  </div>
                </div>
                <div class="flex-none">
                  <div
                    class="bg-grays w-14 h-14 flex items-center justify-center text-center"
                  >
                    <add-icon />
                  </div>
                </div>
              </div>
              <div class="flex items-center w-full p-5 shadow-lg rounded-md">
                <div class="flex-1">
                  <div class="flex flex-col">
                    <div class="">Hospitalisation</div>
                    <div class="text-xxs">Create New</div>
                  </div>
                </div>
                <div class="flex-none">
                  <div
                    class="bg-grays w-14 h-14 flex items-center justify-center text-center"
                  >
                    <add-icon />
                  </div>
                </div>
              </div>
              <div class="flex items-center w-full p-5 shadow-lg rounded-md">
                <div class="flex-1">
                  <div class="flex flex-col">
                    <div class="">Appointments</div>
                    <div class="text-xxs">Create New</div>
                  </div>
                </div>
                <div class="flex-none">
                  <div
                    class="bg-grays w-14 h-14 flex items-center justify-center text-center"
                  >
                    <add-icon />
                  </div>
                </div>
              </div>
            </div>
          </accordion-component>
        </v-form>
      </cornie-card-text>
      <div class="flex items-center justify-between mt-24">
        <div class="text-danger cursor-pointer font-semibold self-center">
          Save as Draft
        </div>
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
      <problem v-model="showProblemModal" />
      <items v-model="showItemsModal" />
      <item-reference v-model="showItemReference" />
    </div>
  </cornie-dialog>
</template>
<script lang="ts">
import CornieCard from "@/components/cornie-card";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import AddIcon from "@/components/icons/plus.vue";
import DateTimePicker from "@/views/dashboard/schedules/components/datetime-picker.vue";
import { Options, Vue } from "vue-class-component";
import { PropSync } from "vue-property-decorator";
import ItemReference from "./item-reference.vue";
import items from "./items.vue";
import problem from "./problem.vue";

@Options({
  components: {
    CornieDialog,
    ...CornieCard,
    ArrowLeft,
    CancelIcon,
    AddIcon,
    DateTimePicker,
    AccordionComponent,
    problem,
    CornieSelect,
    items,
    ItemReference,
    CornieInput,
  },
})
export default class NewProgressNote extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  showProblemModal = false;
  showItemsModal = false;
  showItemReference = false;

  date = "23/04/2022";
  time = "";
  code = "";
  assessment = {
    protocol: "",
    summary: "",
  };
}
</script>
