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
            class="float-right cursor-pointer mt-1 fill-current text-danger"
            @click="show = false"
          />
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
                      class="flex items-center border rounded-md p-3 mt-0.5"
                    >
                      <div class="flex-1">Select</div>
                      <div class="flex-none self-center">
                        <add-icon class="fill-current text-danger" />
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
                        <div
                          class="capitalize text-black text-sm font-semibold flex-1"
                        >
                          Condition
                        </div>
                        <div class="flex-none">
                          <div class="underline-danger text-danger underline">
                            View Details
                          </div>
                        </div>
                      </div>

                      <cornie-input
                        class="w-full"
                        :disabled="true"
                        v-model="history.condition"
                      />
                    </div>
                  </div>
                  <div class="col-span-1">
                    <date-time-picker
                      class="w-full h-full"
                      label="Date recorded"
                      v-model:date="history.date.date"
                      v-model:time="history.date.time"
                    />
                  </div>
                  <div class="col-span-1">
                    <div class="flex flex-col">
                      <div class="capitalize text-black text-sm font-semibold">
                        Severity
                      </div>
                      <cornie-input
                        class="w-full"
                        placeholder="Autoloaded"
                        :disabled="true"
                        v-model="history.severity"
                      />
                    </div>
                  </div>
                  <div class="col-span-1">
                    <div class="flex flex-col">
                      <div class="capitalize text-black text-sm font-semibold">
                        Verification status
                      </div>
                      <cornie-input
                        class="w-full"
                        placeholder="Autoloaded"
                        :disabled="true"
                        v-model="history.status"
                      />
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
              <div
                v-for="m in allMedication"
                class="flex w-full justify-between space-x-20 pt-3"
              >
                <div class="flex-none">
                  <div class="flex flex-col">
                    <div class="flex space-x-1 items-center">
                      <div class="font-bold">
                        {{ m.genericName }}
                      </div>
                      <div class="font-light text-xxs">(Tablet)</div>
                    </div>
                    <div class="font-light text-xs">{{ m.createdAt }}</div>
                  </div>
                </div>
                <div class="flex-1 flex space-x-5">
                  <div class="flex flex-col w-full">
                    <div class="flex">
                      <div
                        class="capitalize text-black text-sm font-semibold flex-1"
                      >
                        Strength
                      </div>
                      <!-- <div class="flex-none">
                        <div class="underline-danger text-danger">View details</div>
                      </div> -->
                    </div>
                    <cornie-input
                      class="w-full"
                      :disabled="true"
                      v-model="m.strength"
                    />
                  </div>
                  <div class="flex flex-col w-full">
                    <div class="flex">
                      <div
                        class="capitalize text-black text-sm font-semibold flex-1"
                      >
                        Dosage
                      </div>
                      <!-- <div class="flex-none">
                        <div class="underline-danger text-danger">View details</div>
                      </div> -->
                    </div>
                    <div class="grid grid-cols-3 gap-x-2">
                      <div class="flex border rounded-md p-3 mt-0.5">
                        2 Tabs
                      </div>
                      <div class="flex border rounded-md p-3 mt-0.5">
                        {{ m.dosageInstruction }}
                      </div>
                      <div
                        class="flex border text-white bg-blue-700 rounded-md text-sm p-3 mt-0.5"
                      >
                        x {{ m.durationInDays }} Days
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
                      <div
                        class="capitalize text-black text-sm font-semibold flex-1"
                      >
                        Diagnostics
                      </div>
                      <div class="flex-none">
                        <div class="underline-danger text-danger text-sm">
                          View details
                        </div>
                      </div>
                    </div>
                    <cornie-input
                      class="w-full"
                      placeholder="Autoloaded"
                      :disabled="true"
                    />
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
                  <cornie-input
                    class="w-full"
                    label="code"
                    disabled
                    placeholder="Autogenerated"
                  />
                  <div class="flex flex-col">
                    <div class="capitalize text-black text-sm font-semibold">
                      item
                    </div>
                    <div
                      @click="() => (showItemsModal = true)"
                      class="flex items-center border rounded-md p-3 mt-0.5"
                    >
                      <div class="flex-1">Select</div>
                      <div class="flex-none">
                        <add-icon class="fill-current text-danger" />
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="investigationItems.length > 0">
                  <div class="w-full flex items-center py-5">
                    <div
                      class="w-4/12"
                      v-for="(record, index) in investigationItems"
                      :key="index"
                    >
                      <p class="text-red-500 text-sm font-medium mb-2">
                        {{ record?.item?.type }}
                      </p>
                      <div
                        class="w-11/12"
                        style="border-right: 1px dashed #878e99"
                      >
                        <div class="w-full flex items-center">
                          <div class="w-8/12 flex flex-col">
                            <div>
                              <p class="font-bold text-sm">
                                {{ record?.item?.details }}
                              </p>
                              <p class="text-xxs">{{ record?.code }}</p>
                            </div>
                          </div>
                          <div class="w-4/12 flex items-center justify-center">
                            <span class="mx-2 cursor-pointer"
                              ><edit-icon
                            /></span>
                            <span class="mx-2 cursor-pointer"
                              ><delete-icon @click="removeInvestigation(index)"
                            /></span>
                          </div>
                        </div>
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
            <div class="grid grid-cols-2 gap-6 py-5">
              <cornie-select
                :label="'Protocol(optional)'"
                v-model="assessment.protocol"
                placeholder="Select"
                :items="['Active', 'Inactive', 'Resolved']"
              />
              <cornie-input
                label="Summary"
                class="w-full"
                v-model="assessment.summary"
              />

              <div class="col-span-2">
                <div class="flex w-full py-3 font-bold">Findings</div>
                <div class="grid grid-cols-2 gap-6">
                  <div class="col-span-1">
                    <cornie-input
                      class="w-full"
                      label="Item code"
                      :disabled="true"
                      placeholder="Autoloaded"
                      v-model="assessment.itemCode"
                    />
                  </div>
                  <div class="col-span-1">
                    <div class="flex flex-col">
                      <div class="capitalize text-black text-sm font-semibold">
                        Item Reference
                      </div>
                      <div
                        @click="() => (showItemReference = true)"
                        class="flex items-center border rounded-md p-3 mt-0.5"
                      >
                        <div class="flex-1">Select</div>
                        <div class="flex-none self-center">
                          <add-icon class="fill-current text-danger" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-span-1">
                    <cornie-input
                      class="w-full"
                      label="Basis"
                      placeholder="Enter"
                      v-model="assessment.basis"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div
                v-for="(s, i) in findingsItems"
                class="p-3 shadow-md rounded-md"
              >
                <div class="flex items-center">
                  <div class="flex-1">
                    <div class="font-bold text-danger capitalize">
                      {{ s.typeData }}
                    </div>
                    <div class="font-bold text-sm mb-0.5">
                      {{ printCode(s.code)?.display }}
                    </div>
                    <div class="font-bold text-sm">XXXXXX</div>
                    <div class="flex items-center">
                      <div class="font-semibold text-xs">
                        {{ s.practitioner.firstName }}
                      </div>
                      .
                      <div class="font-light text-xxs flex justify-end">
                        {{ s.practitioner.department }}
                      </div>
                    </div>
                  </div>
                  <delete-icon @click="removeFinding(i)" />
                </div>
              </div>
            </div>
            <accordion-component
              class="rounded-none shadow-none border-none text-primary"
              title="Prognosis"
              :opened="false"
            >
              <div class="grid grid-cols-2 gap-6 pt-5">
                <cornie-input
                  class="w-full"
                  label="Code"
                  placeholder=""
                  disabled
                  v-model="prognosis.code"
                />
                <cornie-select
                  class="w-full"
                  label="Reference"
                  :items="observations"
                  v-model="prognosis.reference"
                />
                <cornie-input
                  class="w-full"
                  label="Supporting info"
                  placeholder="Enter"
                  v-model="prognosis.supportingInfo"
                />
                <cornie-input
                  class="w-full"
                  placeholder="Autoloaded"
                  :disabled="true"
                  label="Item Reference"
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
      <problem
        :conditions="conditions"
        :allergys="allergys"
        v-model="showProblemModal"
        @selectedId="setHistoryOfDisease"
      />
      <items
        :observations="observations"
        :questions="questions"
        :familyHistories="familyHistories"
        :diagnosticReports="diagnosticReports"
        @getItem="showItem"
        v-model="showItemsModal"
      />
      <item-reference
        @selectedId="showFindings"
        :observations="observations"
        :conditions="conditions"
        v-model="showItemReference"
      />
    </div>
  </cornie-dialog>
</template>
<script lang="ts">
  import CornieCard from "@/components/cornie-card";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieInput from "@/components/cornieinput.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import DateTimePicker from "@/components/date-time-picker.vue";
  import AccordionComponent from "@/components/form-accordion.vue";
  import ArrowLeft from "@/components/icons/arrowleft.vue";
  import CancelIcon from "@/components/icons/cancel.vue";
  import DeleteIcon from "@/components/icons/deleteorange.vue";
  import AddIcon from "@/components/icons/plus.vue";
  import { cornieClient } from "@/plugins/http";
  import IAllergy from "@/types/IAllergy";
  import IRequest from "@/types/IRequest";
  import { Options, Vue } from "vue-class-component";
  import { PropSync } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { codes, severities } from "../conditions/drop-downs";
  import ItemReference from "./item-reference.vue";
  import items from "./items.vue";
  import problem from "./problem.vue";

  const progressNote = namespace("progressNote");
  const medicationRequest = namespace("request");
  const conditionR = namespace("condition");
  const allergy = namespace("allergy");

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
      DeleteIcon,
    },
  })
  export default class NewProgressNote extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    investigationItems: any = [];
    findingsItems: any = [];
    showProblemModal = false;
    showItemsModal = false;
    showItemReference = false;
    loading = false;

    date = "";
    time = "";
    code = "";
    assessment = {
      protocol: "",
      summary: "",
      itemCode: "",
      basis: "",
    };
    patientId = "";
    history = {
      condition: "",
      date: {
        date: "",
        time: "",
      },
      severity: "",
      status: "",
      id: "",
    };
    prognosis = {
      code: "",
      reference: "",
      supportingInfo: "",
      item: "",
    };
    showFindings(value: any) {
      console.log("findings", value);
      this.findingsItems.push(value);
    }
    observations = [];
    familyHistories = [];
    questions = [];
    diagnosticReports = [];
    role: any = [];

    removeInvestigation(index: number) {
      this.investigationItems.splice(index, 1);
    }

    removeFinding(index: number) {
      this.findingsItems.splice(index, 1);
    }
    @progressNote.Action
    createProgressNote!: (data: any) => Promise<void>;
    @medicationRequest.Action
    fetchrequestsById!: (id: string) => Promise<void>;
    @conditionR.Action
    fetchPatientConditions!: (patientId: string) => Promise<void>;

    @conditionR.State
    conditions!: any;

    @allergy.State
    allergys!: IAllergy[];

    @allergy.Action
    fetchAllergys!: (patientId: string) => Promise<void>;

    @medicationRequest.State
    patientrequests!: IRequest[];

    printCode(code: string) {
      return codes.find((c) => c.code == code);
    }

    printSeverity(severity: string) {
      return severities.find((s) => s.code == severity)?.display || "";
    }

    async showItem(value: any) {
      this.showItemsModal = true;
      console.log("itemInvestigation", value);
      this.investigationItems.push(value);
    }

    async submit() {
      try {
        await this.createProgressNote({
          patientId: this.$route.params.id,
          identifier: "",
          chiefComplaint: {
            type: "condition",
            condition: this.history.condition,
            dateRecorded: this.history.date.date
              ? new Date(this.history.date.date).toISOString()
              : undefined,
            severity: this.history.severity,
            verificationStatus: this.history.status,
            referenceId: this.history.id,
          },
          medications: this.allMedication.map((x) => {
            return {
              name: x.name || undefined,
              strength: x.strength || undefined,
              duration: x.durationInDays ? String(x.durationInDays) : undefined,
              dosage: x.dosageInstruction,
              requestId: x.id,
            };
          }),
          objectiveDiagnosis: [
            {
              summary: "string",
              dateReported: "2022-05-27",
            },
          ],
          objectiveInvestigations: this.investigationItems,
          protocol: this.assessment.protocol,
          summary: this.assessment.summary,
          assessmentFindings: this.findingsItems.map((x: any) => {
            return {
              type: x.typeData,
              referenceId: x.id,
              practitioner:
                x.practitioner.firstName + " " + x.practitioner.lastName,
              practitionerSpeciality: undefined,
              description: x.summary,
              details: this.printCode(x.code)?.display,
            };
          }),
          assessmentBasis: this.assessment.basis,
          prognosisCode: undefined,
          prognosisReference: undefined,
          prognosisSupportingInfo: undefined,
          prognosisSupportingInfoReference: undefined,
        }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        window.notify({
          msg: "There was an error when fetching patient's progress notes",
          status: "error",
        });
      }

      // window.location.reload();
    }

    get allMedication() {
      return this.patientrequests
        .map(this.medicationRequest)
        .flatMap((value) => value);
    }

    setHistoryOfDisease(e: any) {
      console.log("emitted", e);
      this.history.condition = this.printCode(e.code)?.display as any;
      this.history.date.date = e.recordDate;
      this.history.date.time = e.recordDate;
      this.history.severity = this.printSeverity(e.severity);
      this.history.status = e.verificationStatus;
      this.history.id = e.id;
    }

    async fetchRoles() {
      const AllRoles = cornieClient().get("/api/v1/roles");
      const response = await Promise.all([AllRoles]);
      this.role = response[0].data;
    }

    async fetchObservations() {
      const url = `/api/v1/observations/patient/${this.$route.params.id}`;
      const response = await cornieClient().get(url);
      if (response.success) {
        this.observations = response.data;
      }
    }

    async fetchFamilyHistories() {
      const url = `/api/v1/family-history/get-for-patient/${this.$route.params.id}`;
      const response = await cornieClient().get(url);
      if (response.success) {
        this.familyHistories = response.data;
      }
    }

    medicationRequest(request: any) {
      const { medications, ...rest } = request;
      return medications.map((medication: any) => {
        console.log("Each m", medication);
        return {
          ...medication,
          ...rest,
          medicationId: medication.id,
          requestId: request.id,
          createdAt: new Date(request.createdAt).toLocaleDateString(),
        };
      });
    }
    async created() {
      this.patientId = this.$route.params.id as string;
      await this.fetchPatientConditions(this.$route.params.id.toString());
      await this.fetchAllergys(this.patientId);
      await this.fetchrequestsById(this.patientId).then(() => {
        console.log(
          "medication",
          this.patientrequests.map(this.medicationRequest)
        );
      });
      await this.fetchRoles();
      await this.fetchFamilyHistories();
      await this.fetchObservations();
    }
  }
</script>
