<template>
  <div class="w-full">
    <div class="w-full mb-4">
      <p class="text-sm text-gray-400">All fields are required</p>
    </div>

    <collapse-section :title="'Basic Info'" :height="530">
      <template #form>
        <div class="w-full flex items-center mb-4 mt-5">
          <div class="w-6/12">
            <cornie-input
              v-model="procedure.canonicalReference"
              :label="'Instantiates Canonical'"
              :items="['active', 'inactive', 'received']"
            />
          </div>
          <div class="w-6/12">
            <cornie-input
              v-model="procedure.customReference"
              :label="'Instantiates Uri'"
              :items="['Ative', 'Inactive']"
            />
          </div>
        </div>

        <div class="w-full flex items-center mb-3">
          <div class="w-6/12">
            <cornie-select
              :label="'Based On'"
              v-model="procedure.basedOn.id"
              :items="['Reference 1', 'Reference 2']"
            />
          </div>
          <div class="w-6/12">
            <cornie-select
              :label="'Part Of'"
              v-model="procedure.partOf.id"
              :items="['Reference 1', 'Reference 2']"
            />
          </div>
        </div>

        <div class="w-full flex items-center mb-3">
          <div class="w-6/12">
            <cornie-select
              :label="'Code'"
              v-model="procedure.code"
              :items="[
                'Excision of lesion of patella',
                'Fit removable orthodontic appliance',
              ]"
            />
          </div>
          <div class="w-6/12">
            <cornie-select
              :label="'Status Reason'"
              v-model="procedure.statusReason"
              :items="[
                'Nitrate contraindicated',
                'Sensitivity C/I - immunization',
                'Calcium channel blocker contraindicated',
              ]"
            />
          </div>
        </div>

        <div class="w-full flex items-center mb-3">
          <div class="w-6/12">
            <cornie-select
              :label="'Category'"
              v-model="procedure.category"
              :items="[
                'Surgical procedure',
                'Diagnostic procedure',
                'Social service procedur',
              ]"
            />
          </div>
          <div class="w-6/12">
            <cornie-select :label="'Subject'" :items="['Ative', 'Inactive']" />
            <!-- <cornie-select :label="'Code'"  :items="['Ative', 'Inactive' ]"/> -->
          </div>
        </div>

        <div class="w-full flex items-center mb-3">
          <!-- <div class="w-6/12">
                        <cornie-select :label="'Subject'"  :items="['Ative', 'Inactive' ]"/>
                    </div> -->
          <div class="w-6/12">
            <cornie-select
              :label="'Encounter'"
              v-model="procedure.encounterId"
              :items="encountersList"
            />
          </div>
        </div>
      </template>
    </collapse-section>

    <collapse-section :title="'Performance Info'" :height="565">
      <template #form>
        <div class="w-full flex items-center mb-1 mt-5">
          <div class="w-6/12">
            <div class="w-11/12">
              <date-time-picker
                :label="'Performed date & Time'"
                :width="'w-full'"
              >
                <template #date>
                  <span>{{
                    new Date(
                      procedure.performedDate ?? Date.now()
                    ).toLocaleDateString()
                  }}</span>
                </template>
                <template #time>
                  <span>{{ "00:00" }}</span>
                </template>
                <template #input>
                  <v-date-picker
                    v-model="procedure.performedDate"
                    name="eeee"
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
          <div class="w-6/12">
            <cornie-input
              :label="'Performed Age'"
              v-model="procedure.performedAge"
            />
          </div>
        </div>

        <div class="w-full flex items-center mt-6 mb-3">
          <div class="w-6/12">
            <div class="w-11/12">
              <date-time-picker :label="'Start date & Time'" :width="'w-full'">
                <template #date>
                  <span>{{
                    new Date(
                      procedure.performedPeriod?.start ?? Date.now()
                    ).toLocaleDateString()
                  }}</span>
                </template>
                <template #time>
                  <span>{{ "00:00" }}</span>
                </template>
                <template #input>
                  <v-date-picker
                    v-model="procedure.performedPeriod.start"
                    name="eeee"
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
          <div class="w-6/12">
            <div class="w-11/12">
              <date-time-picker :label="'End date & Time'" :width="'w-full'">
                <template #date>
                  <span>{{
                    new Date(
                      procedure.performedPeriod?.end ?? Date.now()
                    ).toLocaleDateString()
                  }}</span>
                </template>
                <template #time>
                  <span>{{ "00:00" }}</span>
                </template>
                <template #input>
                  <v-date-picker
                    v-model="procedure.performedPeriod.end"
                    name="eeee"
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

        <div class="w-full flex items-center mb-3">
          <div class="w-4/12">
            <cornie-input
              v-model="procedure.performedRange"
              :label="'Performed Range (min)'"
              :items="['Ative', 'Inactive']"
            />
          </div>
          <div class="w-4/12">
            <cornie-input
              :label="'Performed Range (max)'"
              :items="['Ative', 'Inactive']"
            />
          </div>
          <div class="w-4/12">
            <cornie-input
              v-model="procedure.performedString"
              :label="'String'"
              :items="['Ative', 'Inactive']"
            />
          </div>
        </div>

        <div class="w-full flex items-center mb-3">
          <div class="w-6/12">
            <cornie-select
              :label="'Recorder'"
              v-model="procedure.recorderId"
              :items="practitionersList"
            />
          </div>
          <div class="w-6/12">
            <cornie-select
              :label="'Asserter'"
              v-model="procedure.asserterId"
              :items="practitionersList"
            />
          </div>
        </div>
      </template>
    </collapse-section>

    <collapse-section :title="'Performer'">
      <template #form>
        <div class="w-full flex items-center mb-3">
          <div class="w-6/12">
            <cornie-select
              :label="'Function'"
              :items="[
                'Specialized surgeon',
                'Radiation therapist',
                'Chiropractor',
              ]"
            />
          </div>
          <div class="w-6/12">
            <cornie-select
              :label="'Actor'"
              v-model="procedure.actorId"
              :items="practitionersList"
            />
          </div>
        </div>
        <div class="w-full flex items-center mb-3">
          <div class="w-6/12">
            <cornie-select
              :label="'On  Behalf Of'"
              v-model="procedure.onBehalfOf"
              :items="['Practitioner', 'Organisation']"
            />
          </div>
          <div class="w-6/12">
            <cornie-select
              :label="'Location'"
              v-model="procedure.locationId"
              :items="demoLocations"
            />
          </div>
        </div>
        <div class="w-full flex items-center mb-3">
          <div class="w-6/12">
            <cornie-select
              :label="'Reason Code'"
              v-model="procedure.reasonCode"
              :items="[
                'Anxiety disorder of childhood OR adolescence',
                'Choroidal hemorrhage',
                'Decreased hair growth',
              ]"
            />
          </div>
          <div class="w-6/12">
            <cornie-select
              :label="'Reason Reference'"
              v-model="procedure.reasonReference"
              :items="['Hand written reason', 'Unavailable']"
            />
          </div>
        </div>
        <div class="w-full flex items-center mb-3">
          <div class="w-6/12">
            <cornie-select
              :label="'Body Site'"
              v-model="procedure.bodySite"
              :items="[
                'Posterior carpal region',
                'Fetal part of placenta',
                'Parathyroid gland',
              ]"
            />
          </div>
          <div class="w-6/12">
            <cornie-select
              :label="'Outcome'"
              v-model="procedure.outcome"
              :items="['Successfull', 'Unsuccessfull', 'Partially Successful']"
            />
          </div>
        </div>
        <div class="w-full flex items-center mb-3">
          <div class="w-6/12">
            <cornie-select
              :label="'Report'"
              v-model="procedure.report"
              :items="['Report 1', 'Report 2']"
            />
          </div>
          <div class="w-6/12">
            <cornie-select
              :label="'Complication'"
              v-model="procedure.complication"
              :items="[
                'Anxiety disorder of childhood OR adolescence',
                'Choroidal hemorrhage',
                'Spontaneous abortion with laceration of cervix',
              ]"
            />
          </div>
        </div>
        <div class="w-full flex items-center mb-3">
          <div class="w-6/12">
            <cornie-select
              :label="'Complication Detail'"
              v-model="procedure.complicationDetail"
              :items="['Condition 1', 'Condition 2']"
            />
          </div>
          <div class="w-6/12">
            <cornie-select
              :label="'Followup'"
              v-model="procedure.followUp"
              :items="[
                'Change of dressing',
                'Removal of suture',
                'Removal of drain',
              ]"
            />
          </div>
        </div>
        <div class="w-full flex items-center mb-3">
          <div class="w-6/12">
            <cornie-input :label="'Note'" v-model="procedure.note" />
          </div>
        </div>
      </template>
    </collapse-section>

    <collapse-section :title="'Focal Device'" :height="300">
      <template #form>
        <div class="w-full flex items-center mb-3">
          <div class="w-6/12">
            <cornie-select
              :label="'Action'"
              v-model="procedure.deviceAction"
              :items="[
                'Patient evaluation - action',
                'Measurement - action',
                'Administrative action',
              ]"
            />
          </div>
          <div class="w-6/12">
            <cornie-select
              :label="'Manipulated'"
              v-model="procedure.deviceManipulated"
              :items="demoDevices"
            />
          </div>
        </div>
        <div class="w-full flex items-center mb-3">
          <div class="w-6/12">
            <cornie-select
              :label="'Used Reference'"
              v-model="procedure.deviceUsedReference"
              :items="['Other substance used', 'Bone plate', 'Atomizer']"
            />
          </div>
          <div class="w-6/12">
            <cornie-select
              :label="'Used Code'"
              v-model="procedure.deviceUsedCode"
              :items="['Spine board', 'Inactive']"
            />
          </div>
        </div>
      </template>
    </collapse-section>

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
        class="bg-red-500 p-2 rounded-full px-8 mx-4"
        v-if="!item?.id"
        @click="onSave"
      >
        <span class="text-white font-semibold">Create New Procedure</span>
      </CornieBtn>

      <CornieBtn
        :loading="loading"
        class="bg-red-500 p-2 rounded-full px-8 mx-4"
        v-else
        @click="onUpdate"
      >
        <span class="text-white font-semibold">Update Procedure</span>
      </CornieBtn>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieSelect from "@/components/cornieselect.vue";
import CollapseSection from "./collapse-section.vue";
import DateTimePicker from "@/views/dashboard/schedules/components/datetime-picker.vue";
import CornieInput from "@/components/cornieinput.vue";
import { namespace } from "vuex-class";
import IProcedure from "@/types/IProcedure";
import ILocation from "@/types/ILocation";
import IPractitioner from "@/types/IPractitioner";
import IEncounter from "@/types/IEncounter";
import { Prop, Watch } from "vue-property-decorator";
import helperFunctions from "../helper/helper";
import IDevice from "@/types/IDevice";

const procedure = namespace("procedure");
const location = namespace("location");
const practitioner = namespace("practitioner");
const vital = namespace("vitals");
const device = namespace("device");

@Options({
  components: {
    CornieSelect,
    CollapseSection,
    DateTimePicker,
    CornieInput,
  },
})
export default class NewProcedure extends Vue {
  @procedure.Action
  createProcedure!: (procedure: IProcedure) => Promise<boolean>;

  @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;

  @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  @vital.State
  encounters!: IEncounter[];

  @vital.Action
  getEncounters!: (id: string) => Promise<void>;

  @procedure.Action
  updateProcedure!: (procedure: IProcedure) => Promise<void>;

  @device.Action
  fetchDevices!: () => Promise<void>;

  @device.State
  devices!: IDevice[];

  @Prop({ type: Object, default: {} })
  item!: IProcedure;

  procedure = {
    basedOn: {
      type: "location",
      id: "d25cc910-0830-40cf-a0c8-7c303f381b29",
    },
    partOf: {
      type: "location",
      id: "d25cc910-0830-40cf-a0c8-7c303f381b29",
    },
    performedPeriod: {
      start: new Date().toLocaleDateString(),
      end: new Date().toLocaleDateString(),
    },
  } as IProcedure;

  patientId = "";
  loading = false;

  demoLocations = [
    { code: "d25cc910-0830-40cf-a0c8-7c303f381b29", display: "Market" },
    { code: "25bc0c8e-bec8-401d-a1a3-bb74fee9dc4a", display: "Hospital" },
  ];

  demoDevices = [
    { code: "1ddf9d31-2c65-4eb5-9ee5-d2eaa2d9f2a3", display: "Stethoscope" },
    { code: "e581a5a9-8762-4c4a-9293-0ed964a49ce3", display: "Stethoscope" },
  ];

  get locationsList() {
    if (!this.locations || this.locations.length === 0) return [];
    return this.locations?.map((location) => {
      return {
        code: location.id,
        display: location.alias,
      };
    });
  }

  get practitionersList() {
    if (!this.practitioners || this.practitioners.length === 0) return [];
    return this.practitioners?.map((practitioner) => {
      return {
        code: practitioner.id,
        display: practitioner.firstName,
      };
    });
  }

  get encountersList() {
    if (!this.encounters || this.encounters.length === 0) return [];
    return this.encounters?.map((encounter) => {
      return {
        code: encounter.id,
        display: `${encounter.startDate} - ${encounter.endDate}`,
      };
    });
  }

  async onSave() {
    try {
      this.loading = true;
      this.procedure.patientId = this.patientId;
      this.procedure.locationId = "d25cc910-0830-40cf-a0c8-7c303f381b29";
      const response = await this.createProcedure(this.procedure);
      this.loading = false;
      this.$emit("closesidemodal");
    } catch (error) {
      this.loading = false;
    }
  }

  async onUpdate() {
    try {
      const reqBody = helperFunctions.formatReqBody(this.procedure);

      this.loading = true;
      const response = await this.updateProcedure(reqBody);
      this.loading = false;
      this.$emit("closesidemodal");
    } catch (error) {
      this.loading = false;
    }
  }

  async created() {
    this.patientId = this.$route.params.id as string;
    await this.getEncounters(this.patientId);
    await this.fetchLocations();

    if (this.devices?.length <= 0) await this.fetchDevices();
    // await this.get
    this.fetchPractitioners();
  }

  @Watch("item")
  updateProcedureData() {
    this.procedure = helperFunctions.mapSelectedProcedure(this.item);
  }
}
</script>

<style></style>
