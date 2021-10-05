<template>
  <div class="w-full">
        <div class="w-full mb-4">
            <p class="text-sm text-gray-400">All fields are required</p>
        </div>

        <collapse-section :title="'Basic Info'" :height="490">
            <template #form>
                <div class="w-full flex items-center mb-1 mt-5">
                    <div class="w-6/12">
                        <cornie-select v-model="procedure.canonicalReference" :label="'Instantiates Canonical'"  :items="['Ative', 'Inactive' ]"/>
                    </div>
                    <div class="w-6/12">
                        <cornie-select v-model="procedure.customReference" :label="'Instantiates Uri'"  :items="['Ative', 'Inactive' ]"/>
                    </div>
                </div>

                <div class="w-full flex items-center mb-3">
                    <div class="w-6/12">
                        <cornie-select :label="'Based On'" v-model="procedure.basedOn.id"  :items="['Ative', 'Inactive' ]"/>
                    </div>
                    <div class="w-6/12">
                        <cornie-select :label="'Part Of'" v-model="procedure.partOf.id"  :items="['Ative', 'Inactive' ]"/>
                    </div>
                </div>

                <div class="w-full flex items-center mb-3">
                    <div class="w-6/12">
                        <cornie-select :label="'Code'"  v-model="procedure.code" :items="['Ative', 'Inactive' ]"/>
                    </div>
                    <div class="w-6/12">
                        <cornie-select :label="'Status Reason'" v-model="procedure.statusReason" :items="['Ative', 'Inactive' ]"/>
                    </div>
                </div>

                <div class="w-full flex items-center mb-3">
                    <div class="w-6/12">
                        <cornie-select :label="'Category'" v-model="procedure.category" :items="['Ative', 'Inactive' ]"/>
                    </div>
                    <div class="w-6/12">
                        <cornie-select :label="'Code'"  :items="['Ative', 'Inactive' ]"/>
                    </div>
                </div>

                <div class="w-full flex items-center mb-3">
                    <div class="w-6/12">
                        <cornie-select :label="'Subject'"  :items="['Ative', 'Inactive' ]"/>
                    </div>
                    <div class="w-6/12">
                        <cornie-select :label="'Encounter'" v-model="procedure.encounterId" :items="['Ative', 'Inactive' ]"/>
                    </div>
                </div>
            </template>
        </collapse-section>

        <collapse-section :title="'Performance Info'" :height="565">
            <template #form>
                <div class="w-full flex items-center mb-1 mt-5">
                    <div class="w-6/12">
                        <div class="w-11/12">
                            <date-time-picker :label="'Performed date & Time'" :width="'w-full'">
                                <template #date>
                                    <span>{{ new Date(Date.now()).toLocaleDateString()}}</span>
                                </template>
                                <template #time>
                                    <span>{{ '00:00' }}</span>
                                </template>
                                <template #input>
                                    <v-date-picker v-model="procedure.performedDate" name="eeee" style="z-index:9000;width:100%"></v-date-picker>
                                    <label
                                        class="block uppercase my-1 text-xs font-bold"
                                        >
                                        Time
                                    </label>
                                    <input type="time" class="w-full border rounded-md p-2">
                                </template>
                            </date-time-picker>
                        </div>
                    </div>
                    <div class="w-6/12">
                        <cornie-input :label="'Performed Age'" v-model="procedure.performedAge"/>
                    </div>
                </div>

                <div class="w-full flex items-center mb-3">
                    <div class="w-6/12">
                        <div class="w-11/12">
                            <date-time-picker :label="'Start date & Time'" :width="'w-full'">
                                <template #date>
                                    <span>{{ new Date(Date.now()).toLocaleDateString()}}</span>
                                </template>
                                <template #time>
                                    <span>{{ '00:00' }}</span>
                                </template>
                                <template #input>
                                    <v-date-picker v-model="procedure.performedPeriod.start" name="eeee" style="z-index:9000;width:100%"></v-date-picker>
                                    <label
                                        class="block uppercase my-1 text-xs font-bold"
                                        >
                                        Time
                                    </label>
                                    <input type="time" class="w-full border rounded-md p-2">
                                </template>
                            </date-time-picker>
                        </div>
                    </div>
                    <div class="w-6/12">
                        <div class="w-11/12">
                            <date-time-picker :label="'End date & Time'" :width="'w-full'">
                                <template #date>
                                    <span>{{ new Date(Date.now()).toLocaleDateString()}}</span>
                                </template>
                                <template #time>
                                    <span>{{ '00:00' }}</span>
                                </template>
                                <template #input>
                                    <v-date-picker v-model="procedure.performedPeriod.end" name="eeee" style="z-index:9000;width:100%"></v-date-picker>
                                    <label
                                        class="block uppercase my-1 text-xs font-bold"
                                        >
                                        Time
                                    </label>
                                    <input type="time" class="w-full border rounded-md p-2">
                                </template>
                            </date-time-picker>
                        </div>
                    </div>
                </div>

                <div class="w-full flex items-center mb-3">
                    <div class="w-4/12">
                        <cornie-input v-model="procedure.performedRange" :label="'Performed Range (min)'"  :items="['Ative', 'Inactive' ]"/>
                    </div>
                    <div class="w-4/12">
                        <cornie-input :label="'Performed Range (max)'"  :items="['Ative', 'Inactive' ]"/>
                    </div>
                    <div class="w-4/12">
                        <cornie-input v-model="procedure.performedString" :label="'String'"  :items="['Ative', 'Inactive' ]"/>
                    </div>
                </div>

                <div class="w-full flex items-center mb-3">
                    <div class="w-6/12">
                        <cornie-select :label="'Recorder'" v-model="procedure.recorderId" :items="practitionersList"/>
                    </div>
                    <div class="w-6/12">
                        <cornie-select :label="'Asserter'"  v-model="procedure.asserterId"  :items="practitionersList"/>
                    </div>
                </div>
            </template>
        </collapse-section>

        <collapse-section :title="'Performer'" >
            <template #form>
                <div class="w-full flex items-center mb-3">
                    <div class="w-6/12">
                        <cornie-select :label="'Function'"  :items="['Ative', 'Inactive' ]"/>
                    </div>
                    <div class="w-6/12">
                        <cornie-select :label="'Actor'"  v-model="procedure.actorId" :items="practitionersList"/>
                    </div>
                </div>
                <div class="w-full flex items-center mb-3">
                    <div class="w-6/12">
                        <cornie-select :label="'On  Behalf Of'" v-model="procedure.onBehalfOf" :items="['Ative', 'Inactive' ]"/>
                    </div>
                    <div class="w-6/12">
                        <cornie-select :label="'Location'" v-model="procedure.locationId" :items="locationsList"/>
                    </div>
                </div>
                <div class="w-full flex items-center mb-3">
                    <div class="w-6/12">
                        <cornie-select :label="'Reason Code'" v-model="procedure.reasonCode" :items="['Ative', 'Inactive' ]"/>
                    </div>
                    <div class="w-6/12">
                        <cornie-select :label="'Reason Reference'" v-model="procedure.reasonReference" :items="['Ative', 'Inactive' ]"/>
                    </div>
                </div>
                <div class="w-full flex items-center mb-3">
                    <div class="w-6/12">
                        <cornie-select :label="'Body Site'" v-model="procedure.bodySite" :items="['Ative', 'Inactive' ]"/>
                    </div>
                    <div class="w-6/12">
                        <cornie-select :label="'Outcome'" v-model="procedure.outcome" :items="['Ative', 'Inactive' ]"/>
                    </div>
                </div>
                <div class="w-full flex items-center mb-3">
                    <div class="w-6/12">
                        <cornie-select :label="'Report'" v-model="procedure.report" :items="['Ative', 'Inactive' ]"/>
                    </div>
                    <div class="w-6/12">
                        <cornie-select :label="'Complication'" v-model="procedure.complication" :items="['Ative', 'Inactive' ]"/>
                    </div>
                </div>
                <div class="w-full flex items-center mb-3">
                    <div class="w-6/12">
                        <cornie-select :label="'Complication Detail'" v-model="procedure.complicationDetail" :items="['Ative', 'Inactive' ]"/>
                    </div>
                    <div class="w-6/12">
                        <cornie-select :label="'Followup'" v-model="procedure.followUp" :items="['Ative', 'Inactive' ]"/>
                    </div>
                </div>
                <div class="w-full flex items-center mb-3">
                    <div class="w-6/12">
                        <cornie-input :label="'Note'" v-model="procedure.note" />
                    </div>
                </div>
            </template>
        </collapse-section>

        <collapse-section :title="'Focal Device'" :height="200">
            <template #form>
                <div class="w-full flex items-center mb-3">
                    <div class="w-6/12">
                        <cornie-select :label="'Action'" v-model="procedure.deviceAction" :items="['Ative', 'Inactive' ]"/>
                    </div>
                    <div class="w-6/12">
                        <cornie-select :label="'Manipulated'" v-model="procedure.deviceManipulated" :items="['Ative', 'Inactive' ]"/>
                    </div>
                </div>
                <div class="w-full flex items-center mb-3">
                    <div class="w-6/12">
                        <cornie-select :label="'User Reference'" v-model="procedure.deviceUsedReference" :items="['Ative', 'Inactive' ]"/>
                    </div>
                    <div class="w-6/12">
                        <cornie-select :label="'Used Code'" v-model="procedure.deviceUsedCode" :items="['Ative', 'Inactive' ]"/>
                    </div>
                </div>
            </template>
        </collapse-section>

        <div class=" flex justify-end">
            <corniebtn class="p-2 rounded-full px-8 mx-4 cursor-pointer flex items-center" style="border: 1px solid #080056;">
                <span class="font-semibold text-primary-500" @click="() => $emit('closesidemodal')">Cancel</span>
            </corniebtn>

            <CornieBtn :loading="false" class="bg-red-500 p-2 rounded-full px-8 mx-4">
                <span class="text-white font-semibold" @click="onSave">Create New Procedure</span>
            </CornieBtn>
        </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieSelect from "@/components/cornieselect.vue"
import CollapseSection from "./collapse-section.vue"
import DateTimePicker from "@/views/dashboard/schedules/components/datetime-picker.vue"
import CornieInput from "@/components/cornieinput.vue"
import { namespace } from "vuex-class";
import IProcedure from "@/types/IProcedure";
import ILocation from "@/types/ILocation";
import IPractitioner from "@/types/IPractitioner";
import { IEncounter } from "@/types/IVital";

const procedure = namespace('procedure');
const location = namespace('location');
const practitioner = namespace('practitioner')
const vital = namespace('vitals')

@Options({
    components: {
        CornieSelect,
        CollapseSection,
        DateTimePicker,
        CornieInput,
    }
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

    procedure = { 
        basedOn: {
            type: 'type',
            id: ''
        },
        partOf: {
            type: 'type',
            id: ''
        },
        performedPeriod: {
            start: '',
            end: ''
        }
    } as IProcedure;

    patientId = ""

    get locationsList() {
        if (!this.locations || this.locations.length === 0) return [ ];
        return this.locations?.map(location => {
            return {
                code: location.id,
                display: location.alias
            }
        })
    }

    get practitionersList() {
        if (!this.practitioners || this.practitioners.length === 0) return [ ];
        return this.practitioners?.map(practitioner => {
            return {
                code: practitioner.id,
                display: practitioner.firstName
            }
        })
    }

    async onSave() {
        this.procedure.patientId = this.patientId;
        await this.createProcedure(this.procedure)
    }

    async created() {
        this.patientId = this.$route.params.id as string;
        this.getEncounters(this.patientId);
        await this.fetchLocations();
        // await this.get
        this.fetchPractitioners()
    }
}
</script>

<style>

</style>