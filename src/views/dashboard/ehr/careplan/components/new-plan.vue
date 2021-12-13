<template>
  <div class="container-fluid p-3">
    <div class="text-gray-400 mb-3">
      All fields with <span class="text-danger">*</span> are required
    </div>

    <collapse-section :title="'Basic Info'" :height="650">
      <template #form>
        <div class="w-full" style="overflow-y: scroll; height: 650px">
          <div class="w-full mb-3">
            <label class="flex capitalize mb-1 text-black text-sm font-semibold"
              >Instantiates Canonical</label
            >
            <div class="w-full flex flex-wrap py-4">
              <div class="mx-3">
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio h-4 w-4"
                    :value="'planned'"
                  />
                  <!-- <input type="radio" v-model="reqBody.instantiatesCanonical" class="form-radio h-4 w-4" :value="'planned'" > -->
                  <span class="ml-2 text-sm">Plan Definition</span>
                </label>
              </div>
              <div class="mx-3">
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio h-4 w-4"
                    :value="'active'"
                  />
                  <!-- <input type="radio" v-model="reqBody.instantiatesCanonical" class="form-radio h-4 w-4" :value="'active'" > -->
                  <span class="ml-2 text-sm">ActivityDefinition</span>
                </label>
              </div>
              <div class="mx-3">
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio h-4 w-4"
                    :value="'measure'"
                  />
                  <!-- <input type="radio" v-model="reqBody.instantiatesCanonical" class="form-radio h-4 w-4" :value="'measure'" > -->
                  <span class="ml-2 text-sm">Measure</span>
                </label>
              </div>
              <div class="mx-3">
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio h-4 w-4"
                    :value="'operation'"
                  />
                  <!-- <input type="radio" v-model="reqBody.instantiatesCanonical" class="form-radio h-4 w-4" :value="'operation'" > -->
                  <span class="ml-2 text-sm">Operation Definition</span>
                </label>
              </div>
              <div class="mx-3">
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="form-radio h-4 w-4"
                    :value="'questionaire'"
                  />
                  <!-- <input type="radio" v-model="reqBody.instantiatesCanonical" class="form-radio h-4 w-4" :value="'questionaire'" > -->
                  <span class="ml-2 text-sm">Questionnaire</span>
                </label>
              </div>
            </div>
          </div>

          <div class="w-full my-2 flex items-center">
            <div class="w-6/12 -mt-3">
              <cornie-input
                v-model="reqBody.instantiatesUri"
                :label="'Instantiate Uri'"
              />
            </div>
            <div class="w-6/12">
              <auto-complete
                :label="'Based On'"
                :items="['Provider 1', 'Provider 2']"
              />
            </div>
          </div>

          <div class="w-full my-2 flex items-center">
            <div class="w-6/12">
              <auto-complete :label="'Replaces'" :items="[]" />
            </div>
            <div class="w-6/12">
              <auto-complete :label="'Part Of'" :items="[]" />
            </div>
          </div>

          <div class="w-full my-2 flex items-center">
            <div class="w-6/12">
              <fhir-input
                v-model="reqBody.status"
                label="Status"
                reference="http://hl7.org/fhir/ValueSet/request-status"
              />
            </div>
            <div class="w-6/12">
              <label
                class="flex capitalize mb-1 text-black text-sm font-semibold"
                >Intent</label
              >
              <div class="w-full flex flex-wrap py-4">
                <div class="mx-3">
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      v-model="reqBody.intent"
                      class="form-radio h-4 w-4"
                      :value="'proposal'"
                    />
                    <span class="ml-2 text-sm">Proposal</span>
                  </label>
                </div>
                <div class="mx-3">
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      v-model="reqBody.intent"
                      class="form-radio h-4 w-4"
                      :value="'plan'"
                    />
                    <span class="ml-2 text-sm">Plan</span>
                  </label>
                </div>
                <div class="mx-3">
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      v-model="reqBody.intent"
                      class="form-radio h-4 w-4"
                      :value="'order'"
                    />
                    <span class="ml-2 text-sm">Order</span>
                  </label>
                </div>
                <div class="mx-3">
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      v-model="reqBody.intent"
                      class="form-radio h-4 w-4"
                      :value="'option'"
                    />
                    <span class="ml-2 text-sm">Option</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full my-2 flex items-center">
            <div class="w-6/12">
              <cornie-select
                v-model="reqBody.category"
                label="Category"
                :items="['Category 1', 'Category 2']"
                reference="http://hl7.org/fhir/ValueSet/care-plan-category"
              />
              <!-- <fhir-input
                                v-model="reqBody.status"
                                label="Category"
                                reference="http://hl7.org/fhir/ValueSet/care-plan-category"
                            /> -->
            </div>
            <div class="w-6/12 -mt-5">
              <cornie-input v-model="reqBody.title" :label="'Title'" />
            </div>
          </div>

          <div class="w-full my-2 flex items-center">
            <div class="w-6/12 -mt-3">
              <cornie-input
                v-model="reqBody.description"
                :label="'Description'"
              />
            </div>
            <div class="w-6/12">
              <encounter-select
                label="Reference Encounter"
                v-model="reqBody.referenceEncounter"
              />
              <!-- <auto-complete :label="'Reference Encounter'" :items="[ 'Encounter 1', 'Encounter 2' ]" /> -->
            </div>
          </div>

          <div class="w-full my-2 flex items-center">
            <div class="w-full flex items-center my-3">
              <div class="w-6/12">
                <div class="w-11/12 relative">
                  <date-time-picker
                    :label="'Start date & Time'"
                    :width="'w-full'"
                  >
                    <template #date>
                      <span>{{
                        new Date(
                          reqBody.startDate ?? Date.now()
                        ).toLocaleDateString()
                      }}</span>
                    </template>
                    <template #time>
                      <span>{{ "00:00" }}</span>
                    </template>
                    <template #input>
                      <div class="w-full">
                        <div class="w-full">
                          <v-date-picker
                            v-model="reqBody.startDate"
                            name="eeee"
                            style="z-index: 9000; width: 100%"
                          ></v-date-picker>
                        </div>
                        <div class="w-full">
                          <label class="block uppercase my-1 text-xs font-bold">
                            Time
                          </label>
                          <input
                            type="time"
                            class="w-full border rounded-md p-2"
                          />
                        </div>
                      </div>
                    </template>
                  </date-time-picker>
                </div>
              </div>
              <div class="w-6/12">
                <div class="w-11/12">
                  <date-time-picker
                    :label="'End date & Time'"
                    :width="'w-full'"
                  >
                    <template #date>
                      <span>{{
                        new Date(
                          reqBody.endDate ?? Date.now()
                        ).toLocaleDateString()
                      }}</span>
                    </template>
                    <template #time>
                      <span>{{ "00:00" }}</span>
                    </template>
                    <template #input>
                      <v-date-picker
                        name="eeee"
                        v-model="reqBody.endDate"
                        style="z-index: 9000; width: 100%"
                      ></v-date-picker>
                      <label class="block uppercase my-1 text-xs font-bold">
                        Time
                      </label>
                      <input type="time" class="w-full border rounded-md p-2" />
                    </template>
                  </date-time-picker>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full my-2 flex items-center">
            <div class="w-full flex items-center my-3">
              <div class="w-4/12">
                <div class="w-11/12 relative">
                  <date-time-picker :label="'Created'" :width="'w-full'">
                    <template #date>
                      <span>{{
                        new Date(
                          reqBody.scheduleTiming.startDate ?? Date.now()
                        ).toLocaleDateString()
                      }}</span>
                    </template>
                    <template #time>
                      <span>{{ "--:--" }}</span>
                    </template>
                    <template #input>
                      <div class="w-full">
                        <div class="w-full">
                          <v-date-picker
                            name="eeee"
                            style="z-index: 9000; width: 100%"
                          ></v-date-picker>
                        </div>
                        <div class="w-full">
                          <label class="block uppercase my-1 text-xs font-bold">
                            Time
                          </label>
                          <input
                            type="time"
                            class="w-full border rounded-md p-2"
                          />
                        </div>
                      </div>
                    </template>
                  </date-time-picker>
                </div>
              </div>
              <div class="w-4/12">
                <select-reference
                  :label="'Author'"
                  @selected="actorSelected"
                  :options="['Practitioner', 'Patient', 'Location', 'Device']"
                  :selectedType="'Device'"
                />
                <!-- <cornie-select :label="'Author'" /> -->
              </div>

              <div class="w-4/12">
                <select-reference
                  :label="'Contributor'"
                  @selected="contributorSelected"
                  :options="['Practitioner', 'Patient', 'Location', 'Device']"
                />
              </div>
            </div>
          </div>

          <div class="-full flex items-center">
            <div class="w-6/12">
              <cornie-select :label="'Care Team'" />
            </div>
            <div class="w-6/12">
              <cornie-select :label="'Addresses'" />
            </div>
          </div>

          <div class="-full flex items-cente">
            <div class="w-6/12">
              <cornie-input :label="'Supporting Info'" />
            </div>
            <div class="w-6/12">
              <cornie-select :label="'Goal'" />
            </div>
          </div>

          <div
            class="w-full pt-5 my-4"
            v-if="selectedAuthor?.id || selectedContributor?.id"
            style="border-top: 1px dashed #c2c7d6"
          >
            <div class="w-full flex">
              <div class="w-4/12 px-2 box" v-if="selectedAuthor?.id">
                <selected-author
                  :selectedAuthor="selectedAuthor"
                  :title="'Author'"
                />
              </div>
              <div class="w-4/12 ml-6" v-if="selectedContributor?.id">
                <selected-contributor
                  @remove="() => (selectedContributor = {})"
                  :selectedContributor="selectedContributor"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </collapse-section>

    <collapse-section :title="'Acivity'" :height="300" :show="false">
      <template #form>
        <div class="w-full">
          <div class="w-full my-2 flex">
            <div class="w-6/12">
              <auto-complete
                v-model="reqBody.outcome"
                :label="'Outcome'"
                :items="[
                  'Appointment',
                  'Communication Request',
                  'Device Request',
                  'MedicationRequest',
                ]"
              />
            </div>
            <div class="w-6/12">
              <select-reference
                @selected="outcomeReferenceSelected"
                :label="'Outcome Reference'"
                :options="[
                  'Appointment',
                  'Communication Request',
                  'Device Request',
                  'MedicationRequest',
                ]"
                :selectedType="'Appointment'"
              />
            </div>
          </div>
          <div class="w-full my-2 flex">
            <div class="w-6/12">
              <auto-complete
                v-model="reqBody.progress"
                :label="'Progress'"
                :items="[
                  'Appointment',
                  'Communication Request',
                  'Device Request',
                  'Medication Request',
                  'Nutrition Order',
                ]"
              />
            </div>
            <div class="w-6/12">
              <select-reference :label="'Reference'" />
              <!-- <cornie-input :label="'Reference'" :items="[ 'Progress 1', 'Progress 2' ]" /> -->
            </div>
          </div>

          <div
            class="w-full pt-5 my-4"
            v-if="outcomeReference?.id"
            style="border-top: 1px dashed #c2c7d6"
          >
            <div class="w-full flex">
              <div class="w-4/12 px-2 box" v-if="true">
                <selected-author
                  :selectedAuthor="outcomeReference"
                  :title="'Outcome Reference'"
                />
              </div>
              <!-- <div class="w-4/12 ml-6" v-if="selectedContributor?.id">
                                <selected-contributor @remove="() => selectedContributor = {}" :selectedContributor="selectedContributor" />
                            </div> -->
            </div>
          </div>
        </div>
      </template>
    </collapse-section>

    <collapse-section :title="'Detail'" :height="500" :show="false">
      <template #form>
        <div class="w-full">
          <div class="w-full mb-3">
            <p class="flex capitalize mb-1 text-black text-sm font-semibold">
              Instantiates Canonical
            </p>
            <div class="w-full flex flex-wrap py-4">
              <div class="mx-3">
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    v-model="reqBody.detail.instantiatesCanonical"
                    class="form-radio h-4 w-4"
                    :value="'planned'"
                  />
                  <span class="ml-2 text-sm">Plan Definition</span>
                </label>
              </div>
              <div class="mx-3">
                <label class="inline-flex items-center">
                  <input
                    v-model="reqBody.detail.instantiatesCanonical"
                    type="radio"
                    class="form-radio h-4 w-4"
                    :value="'active'"
                  />
                  <span class="ml-2 text-sm">ActivityDefinition</span>
                </label>
              </div>
              <div class="mx-3">
                <label class="inline-flex items-center">
                  <input
                    v-model="reqBody.detail.instantiatesCanonical"
                    type="radio"
                    class="form-radio h-4 w-4"
                    :value="'measure'"
                  />
                  <span class="ml-2 text-sm">Measure</span>
                </label>
              </div>
              <div class="mx-3">
                <label class="inline-flex items-center">
                  <input
                    v-model="reqBody.detail.instantiatesCanonical"
                    type="radio"
                    class="form-radio h-4 w-4"
                    :value="'operation'"
                  />
                  <span class="ml-2 text-sm">Operation Definition</span>
                </label>
              </div>
              <div class="mx-3">
                <label class="inline-flex items-center">
                  <input
                    v-model="reqBody.detail.instantiatesCanonical"
                    type="radio"
                    class="form-radio h-4 w-4"
                    :value="'questionaire'"
                  />
                  <span class="ml-2 text-sm">Questionnaire</span>
                </label>
              </div>
            </div>
          </div>

          <div class="w-full my-2 flex items-center">
            <div class="w-6/12 -mt-3">
              <cornie-input
                v-model="reqBody.detail.instantiatesUri"
                :label="'Instantiates Uri'"
              />
            </div>
            <div class="w-6/12">
              <auto-complete
                v-model="reqBody.detail.code"
                :label="'Code'"
                :items="codes"
              />
            </div>
          </div>

          <div class="w-full my-2 flex">
            <div class="w-6/12">
              <auto-complete
                v-model="reqBody.detail.reasonCode"
                :label="'Reason Code'"
                :items="reeasonReferences"
              />
            </div>
            <div class="w-6/12">
              <radio-otions :label="'Reason Reference'" />
            </div>
          </div>

          <div class="w-full my-2 flex items-center">
            <div class="w-6/12 -mt-3">
              <auto-complete :label="'Goal'" :items="['Goal']" />
            </div>
            <div class="w-6/12">
              <auto-complete
                v-model="reqBody.detail.status"
                :label="'Status'"
                :items="detailStatus"
              />
            </div>
          </div>

          <div class="w-full my-2 flex items-center">
            <div class="w-6/12 -mt-3">
              <cornie-input
                v-model="reqBody.detail.statusReason"
                :label="'Status Reason'"
              />
            </div>
            <div class="w-6/12">
              <div class="w-full mb-3">
                <p
                  class="flex capitalize mb-1 text-black text-sm font-semibold"
                >
                  Don not perfom
                </p>
                <div class="w-full flex flex-wrap py-4">
                  <div class="mx-3">
                    <label class="inline-flex items-center">
                      <input
                        v-model="reqBody.detail.doNotPerform"
                        type="radio"
                        class="form-radio h-4 w-4"
                        :value="true"
                      />
                      <span class="ml-2 text-sm">True</span>
                    </label>
                  </div>
                  <div class="mx-3">
                    <label class="inline-flex items-center">
                      <input
                        v-model="reqBody.detail.doNotPerform"
                        type="radio"
                        class="form-radio h-4 w-4"
                        :value="'False'"
                      />
                      <span class="ml-2 text-sm">False</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </collapse-section>

    <collapse-section :title="'Schedule'" :height="325" :show="false">
      <template #form>
        <div class="w-full mb-3" style="height: 320px; overflow-y: scroll">
          <div class="w-full mb-3">
            <p class="flex capitalize mb-1 text-black text-sm font-semibold">
              Schedule Timing
            </p>
            <div class="w-full flex flex-wrap py-4">
              <div class="mx-3">
                <label class="inline-flex items-center">
                  <input
                    v-model="reqBody.scheduleTiming.scheduleTiming"
                    type="radio"
                    class="form-radio h-4 w-4"
                    :value="'planned'"
                  />
                  <span class="ml-2 text-sm">Day</span>
                </label>
              </div>
              <div class="mx-3">
                <label class="inline-flex items-center">
                  <input
                    v-model="reqBody.scheduleTiming.scheduleTiming"
                    type="radio"
                    class="form-radio h-4 w-4"
                    :value="'active'"
                  />
                  <span class="ml-2 text-sm">Period</span>
                </label>
              </div>
            </div>
          </div>

          <div class="w-full my-3">
            <div class="w-6/12">
              <div class="w-11/12 relative">
                <date-time-picker :label="'Schedule Date'" :width="'w-full'">
                  <template #date>
                    <span>{{
                      new Date(
                        reqBody.scheduleTiming?.startDate ?? Date.now()
                      ).toLocaleDateString()
                    }}</span>
                  </template>
                  <template #time>
                    <span>{{ "--:--" }}</span>
                  </template>
                  <template #input>
                    <div class="w-full">
                      <div class="w-full">
                        <v-date-picker
                          v-model="reqBody.scheduleTiming.startDate"
                          name="eeee"
                          style="z-index: 9000; width: 100%"
                        ></v-date-picker>
                      </div>
                      <div class="w-full">
                        <label class="block uppercase my-1 text-xs font-bold">
                          Time
                        </label>
                        <input
                          type="time"
                          class="w-full border rounded-md p-2"
                        />
                      </div>
                    </div>
                  </template>
                </date-time-picker>
              </div>
            </div>
          </div>

          <div class="w-full flex">
            <div class="w-6/12">
              <auto-complete
                v-model="reqBody.scheduleTiming.location"
                :label="'Location'"
                :items="['Location 1', 'Location 2']"
              />
            </div>
            <div class="w-6/12">
              <select-reference
                :label="'Performer'"
                @selected="performerSelected"
                :options="['Practitioner', 'Patient', 'Location', 'Device']"
                :selectedType="'Practitioner'"
              />
            </div>
          </div>
        </div>
      </template>
    </collapse-section>

    <collapse-section :title="'Product'" :height="570" :show="false">
      <template #form>
        <div class="w-full">
          <div class="w-full flex">
            <div class="w-6/12">
              <fhir-input
                v-model="reqBody.product.productCode"
                label="Product Code"
                reference="http://hl7.org/fhir/ValueSet/medication-codes"
              />
            </div>
            <div class="w-6/12">
              <!-- <cornie-input :label="'Product Reference'" :items="[ 'Performer 1', 'Performer 2' ]" /> -->
              <select-reference :label="'Reference'" />
            </div>
          </div>
          <div class="w-full flex items-center mt-5 mb-3">
            <div class="w-6/12">
              <cornie-input
                v-model="reqBody.product.dailyAmount"
                :label="'Daily Amount'"
              />
            </div>
            <div class="w-6/12 -mt-3">
              <cornie-input
                v-model="reqBody.product.quantity"
                :label="'Quantity'"
              />
            </div>
          </div>
          <div class="w-full flex items-center mt-5 mb-3">
            <div class="w-6/12 -mt-3">
              <cornie-input
                v-model="reqBody.product.description"
                :label="'Description'"
              />
            </div>
          </div>

          <div class="w-full">
            <text-area
              v-model="reqBody.product.note"
              :label="'Note'"
              style="width: 96%"
            />
          </div>
        </div>
      </template>
    </collapse-section>

    <div class="w-full">
      <div class="flex justify-end">
        <corniebtn
          class="p-2 rounded-full px-8 mx-4 cursor-pointer flex items-center"
          style="border: 1px solid #080056"
        >
          <span
            class="font-semibold text-primary-500"
            @click="() => $emit('closesidemodal')"
            >Cancel</span
          >
        </corniebtn>

        <CornieBtn
          :loading="loading"
          @click="onSave"
          class="bg-red-500 p-2 rounded-full px-8 mx-4"
        >
          <span class="text-white font-semibold">Save</span>
        </CornieBtn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieBtn from "@/components/CornieBtn.vue";
import AutoComplete from "@/components/autocomplete.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import { Item } from "@/types/IUpdateModel";
import DateTimePicker from "@/views/dashboard/schedules/components/datetime-picker.vue";
import CollapseSection from "@/views/dashboard/ehr/procedures/components/collapse-section.vue";
import helper from "../helper/helper";
import TextArea from "@/components/textarea.vue";
import ICarePlan from "@/types/ICarePlan";
import FhirInput from "@/components/fhir-input.vue";
import EncounterSelect from "@/views/dashboard/ehr/allergy/encounter-select.vue";
import { namespace } from "vuex-class";
import SelectedAuthor from "./selected-author.vue";
import SelectedContributor from "./selected-contributor.vue";
import IPractitioner from "@/types/IPractitioner";
import SelectReference from "./select-reference.vue";
import RadioOtions from "./radio-options.vue";

const careplan = namespace("careplan");
const user = namespace("user");

@Options({
  components: {
    CornieBtn,
    AutoComplete,
    CornieInput,
    CornieSelect,
    DateTimePicker,
    CollapseSection,
    TextArea,
    FhirInput,
    EncounterSelect,
    SelectedAuthor,
    SelectedContributor,
    SelectReference,
    RadioOtions,
  },
})
export default class NewPlan extends Vue {
  @careplan.Action
  createCarePlan!: (body: any) => Promise<any>;

  @user.Getter
  authPractitioner!: IPractitioner;

  reqBody = {
    // "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    practitionerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    organizationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    instantiatesUri: "dssss",
    basedOn: "d25cc910-0830-40cf-a0c8-7c303f381b29",
    replaces: "d25cc910-0830-40cf-a0c8-7c303f381b29",
    partOf: "d25cc910-0830-40cf-a0c8-7c303f381b29",
    intent: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    status: "",
    // "author": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    // "contributor": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    // "careTeam": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    category: "",
    addresses: "4bb1baab-e384-491c-90eb-9b1fe887d7ff",
    // "referenceEncounter": "d25cc910-0830-40cf-a0c8-7c303f381b29",
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    reference: "d25cc910-0830-40cf-a0c8-7c303f381b29",
    outcomeReference: "d25cc910-0830-40cf-a0c8-7c303f381b29",
    progress: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    outcome: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    detail: {
      kind: "d25cc910-0830-40cf-a0c8-7c303f381b29",
      // "instantiatesCanonical": "stirn",
      instantiatesUri: "",
      code: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      reasonCode: "",
      referenceCode: "fevt",
      goal: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      status: "active",
      statusReason: "",
      doNotPerform: true,
    },
    scheduleTiming: {
      scheduleTiming: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      startDate: new Date(),
      endDate: new Date(),
      location: "d25cc910-0830-40cf-a0c8-7c303f381b29",
      performer: "d25cc910-0830-40cf-a0c8-7c303f381b29",
    },
    product: {
      productCode: "",
      productReference: "d25cc910-0830-40cf-a0c8-7c303f381b29",
      dailyAmount: "",
      quantity: "",
      description: "",
      note: "",
    },
  } as any;

  planStatus = [
    { code: "draft", display: "Draft" },
    { code: "active", display: "Active" },
    { code: "on-hold", display: "On Hold" },
    { code: "revoked", display: "Revoked" },
    { code: "completed", display: "Completed" },
    { code: "entered-in-error", display: "Entered in Error" },
    { code: "unknown", display: "Unknown" },
  ] as Item[];
  loading = false;

  selectedAuthor: any = {};
  selectedContributor: any = {};
  outcomeReference: any = {};

  get codes() {
    return helper.carePlanCodes;
  }

  get reeasonReferences() {
    return helper.carePlanReasonReferences;
  }

  get detailStatus() {
    return helper.carePlanDetailStatus;
  }

  performerSelected(data: any) {
    this.reqBody.scheduleTiming.performer = data?.id;
  }

  actorSelected(data: any) {
    this.selectedAuthor = data;
  }

  contributorSelected(data: any) {
    this.selectedContributor = data;
    ;
  }

  outcomeReferenceSelected(data: any) {
    this.outcomeReference = data;
    ;
  }

  async onSave() {
    try {
      this.loading = true;
      this.reqBody.practitionerId = this.authPractitioner.id;
      this.reqBody.patientId = this.$route.params.id.toString();
      const response = await this.createCarePlan(this.reqBody);
      if (response?.id) {
        this.$emit("closesidemodal");
      }
      ;
      ;
      this.loading = false;
    } catch (error) {
      ;
    }
  }
}
</script>

<style scoped>
.box {
  background: #ffffff;
  /* Buttons & Cards */

  box-shadow: 0px 1px 2px rgba(46, 41, 78, 0.02),
    0px 4px 8px rgba(46, 41, 78, 0.08);
  border-radius: 8px;
}
</style>
