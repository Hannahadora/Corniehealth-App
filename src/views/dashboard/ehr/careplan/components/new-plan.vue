<template>
    <div class="container-fluid p-3">
        <div class="text-gray-400 mb-3">All fields with <span class="text-danger">*</span> are required</div>

        <collapse-section :title="'Basic Info'" :height="650">
            <template #form>
                <div class="w-full" style="overflow-y:scroll; height: 650px">
                    <div class="w-full mb-3">
                        <label class="flex capitalize mb-1 text-black text-sm font-semibold">Instantiates Canonical</label>
                        <div class="w-full flex flex-wrap py-4">
                            <div class="mx-3">
                                <label class="inline-flex items-center">
                                    <input type="radio" v-model="reqBody.detail.instantiatesCanonical" class="form-radio h-4 w-4" :value="'planned'" >
                                    <span class="ml-2 text-sm">Plan Definition</span>
                                </label>
                            </div>
                            <div class="mx-3">
                                <label class="inline-flex items-center">
                                    <input type="radio" v-model="reqBody.detail.instantiatesCanonical" class="form-radio h-4 w-4" :value="'active'" >
                                    <span class="ml-2 text-sm">ActivityDefinition</span>
                                </label>
                            </div>
                            <div class="mx-3">
                                <label class="inline-flex items-center">
                                    <input type="radio" v-model="reqBody.detail.instantiatesCanonical" class="form-radio h-4 w-4" :value="'reserved'" >
                                    <span class="ml-2 text-sm">Measure</span>
                                </label>
                            </div>
                            <div class="mx-3">
                                <label class="inline-flex items-center">
                                    <input type="radio" v-model="reqBody.detail.instantiatesCanonical" class="form-radio h-4 w-4" :value="'completed'" >
                                    <span class="ml-2 text-sm">Operation Definition</span>
                                </label>
                            </div>
                            <div class="mx-3">
                                <label class="inline-flex items-center">
                                    <input type="radio" v-model="reqBody.detail.instantiatesCanonical" class="form-radio h-4 w-4" :value="'completed'" >
                                    <span class="ml-2 text-sm">Questionnaire</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="w-full my-2 flex items-center">
                        <div class="w-6/12 -mt-3">
                            <cornie-input v-model="reqBody.detail.instantiatesUri" :label="'Instantiate Uri'" />
                        </div>
                        <div class="w-6/12">
                            <auto-complete :label="'Based On'" :items="[ 'Provider 1', 'Provider 2' ]" />
                        </div>
                    </div>

                    <div class="w-full my-2 flex items-center">
                        <div class="w-6/12">
                            <auto-complete :label="'Replaces'" :items="[ 'Plan 1', 'Plan 2' ]" />
                        </div>
                        <div class="w-6/12">
                            <auto-complete :label="'Part Of'" :items="[ 'Plan 1', 'Plan 2' ]" />
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
                            <label class="flex capitalize mb-1 text-black text-sm font-semibold">Intent</label>
                            <div class="w-full flex flex-wrap py-4">
                                <div class="mx-3">
                                    <label class="inline-flex items-center">
                                        <input type="radio" v-model="reqBody.intent" class="form-radio h-4 w-4" :value="'proposal'" >
                                        <span class="ml-2 text-sm">Proposal</span>
                                    </label>
                                </div>
                                <div class="mx-3">
                                    <label class="inline-flex items-center">
                                        <input type="radio"  v-model="reqBody.intent" class="form-radio h-4 w-4" :value="'plan'" >
                                        <span class="ml-2 text-sm">Plan</span>
                                    </label>
                                </div>
                                <div class="mx-3">
                                    <label class="inline-flex items-center">
                                        <input type="radio" v-model="reqBody.intent" class="form-radio h-4 w-4" :value="'order'" >
                                        <span class="ml-2 text-sm">Order</span>
                                    </label>
                                </div>
                                <div class="mx-3">
                                    <label class="inline-flex items-center">
                                        <input type="radio" v-model="reqBody.intent" class="form-radio h-4 w-4" :value="'option'" >
                                        <span class="ml-2 text-sm">Option</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-full my-2 flex items-center">
                        <div class="w-6/12">
                            <fhir-input
                                v-model="reqBody.status"
                                label="Category"
                                reference="http://hl7.org/fhir/ValueSet/care-plan-category"
                            />
                        </div>
                        <div class="w-6/12 -mt-3">
                            <cornie-input v-model="reqBody.title" :label="'Title'" />
                        </div>
                    </div>

                    <div class="w-full my-2 flex items-center">
                        <div class="w-6/12 -mt-3">
                            <cornie-input v-model="reqBody.description" :label="'Description'" />
                        </div>
                        <div class="w-6/12">
                            <encounter-select label="Reference Encounter" v-model="reqBody.referenceEncounter" />
                            <!-- <auto-complete :label="'Reference Encounter'" :items="[ 'Encounter 1', 'Encounter 2' ]" /> -->
                        </div>
                    </div>

                    <div class="w-full my-2 flex items-center">
                        <div class="w-full flex items-center my-3">
                            <div class="w-6/12">
                                <div class="w-11/12 relative">
                                    <date-time-picker :label="'Start date & Time'" :width="'w-full'">
                                        <template #date>
                                            <span>{{ new Date(Date.now()).toLocaleDateString()}}</span>
                                        </template>
                                        <template #time>
                                            <span>{{ '00:00' }}</span>
                                        </template>
                                        <template #input>
                                            <div class="w-full">
                                                <div class="w-full">
                                                    <v-date-picker v-model="reqBody.scheduleTiming.startDate" name="eeee" style="z-index:9000;width:100%"></v-date-picker>
                                                </div>
                                                <div class="w-full">
                                                    <label
                                                        class="block uppercase my-1 text-xs font-bold"
                                                    >
                                                        Time
                                                    </label>
                                                    <input type="time"  class="w-full border rounded-md p-2">
                                                </div>
                                            </div>
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
                                            <v-date-picker name="eeee" v-model="reqBody.scheduleTiming.endDate"  style="z-index:9000;width:100%"></v-date-picker>
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
                    </div>
                </div>
            </template>
        </collapse-section>

        <collapse-section :title="'Acivity'" :height="210" :show="false">
            <template #form>
                <div class="w-full">
                    <div class="w-full my-2 flex items-center">
                        <div class="w-6/12">
                            <auto-complete :label="'Outcome'" :items="[ 'Outcome 1', 'Outcome 2' ]" />
                        </div>
                        <div class="w-6/12">
                            <cornie-input :label="'Outcome Reference'" :items="[ 'Outcome 1', 'Outcome 2' ]" />
                        </div>
                    </div>
                    <div class="w-full my-2 flex items-center">
                        <div class="w-6/12">
                            <auto-complete :label="'Progress'" :items="[ 'Progress 1', 'Progress 2' ]" />
                        </div>
                        <div class="w-6/12 -mt-3">
                            <cornie-input :label="'Reference'" :items="[ 'Progress 1', 'Progress 2' ]" />
                        </div>
                    </div>
                </div>
            </template>
        </collapse-section>

        <collapse-section :title="'Detail'" :height="500" :show="false">
            <template #form>
                <div class="w-full">
                   <div class="w-full mb-3">
                        <p class="flex capitalize mb-1 text-black text-sm font-semibold">Instantiates Canonical</p>
                        <div class="w-full flex flex-wrap py-4">
                            <div class="mx-3">
                                <label class="inline-flex items-center">
                                    <input type="radio" class="form-radio h-4 w-4" :value="'planned'" >
                                    <span class="ml-2 text-sm">Plan Definition</span>
                                </label>
                            </div>
                            <div class="mx-3">
                                <label class="inline-flex items-center">
                                    <input type="radio" class="form-radio h-4 w-4" :value="'active'" >
                                    <span class="ml-2 text-sm">ActivityDefinition</span>
                                </label>
                            </div>
                            <div class="mx-3">
                                <label class="inline-flex items-center">
                                    <input type="radio" class="form-radio h-4 w-4" :value="'reserved'" >
                                    <span class="ml-2 text-sm">Measure</span>
                                </label>
                            </div>
                            <div class="mx-3">
                                <label class="inline-flex items-center">
                                    <input type="radio" class="form-radio h-4 w-4" :value="'completed'" >
                                    <span class="ml-2 text-sm">Operation Definition</span>
                                </label>
                            </div>
                            <div class="mx-3">
                                <label class="inline-flex items-center">
                                    <input type="radio" class="form-radio h-4 w-4" :value="'completed'" >
                                    <span class="ml-2 text-sm">Questionnaire</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="w-full my-2 flex items-center">
                        <div class="w-6/12 -mt-3">
                            <cornie-input :label="'Instantiates Uri'"  />
                        </div>
                        <div class="w-6/12">
                            <auto-complete :label="'Code'" :items="codes" />
                        </div>
                    </div>

                    <div class="w-full my-2 flex items-center">
                        <div class="w-6/12">
                            <auto-complete :label="'Reason Code'" :items="reeasonReferences" />
                        </div>
                        <div class="w-6/12">
                            <auto-complete :label="'Reason Reference'" :items="[ 'Reference']" />
                        </div>
                    </div>

                    <div class="w-full my-2 flex items-center">
                        <div class="w-6/12 -mt-3">
                            <auto-complete :label="'Goal'" :items="['Goal']" />
                        </div>
                        <div class="w-6/12">
                            <auto-complete :label="'Status'" :items="detailStatus" />
                        </div>
                    </div>

                    <div class="w-full my-2 flex items-center">
                        <div class="w-6/12 -mt-3">
                            <cornie-input :label="'Status Reason'" />
                        </div>
                        <div class="w-6/12">
                            <div class="w-full mb-3">
                                <p class="flex capitalize mb-1 text-black text-sm font-semibold">Don not perfom</p>
                                <div class="w-full flex flex-wrap py-4">
                                    <div class="mx-3">
                                        <label class="inline-flex items-center">
                                            <input type="radio" class="form-radio h-4 w-4" :value="'planned'" >
                                            <span class="ml-2 text-sm">True</span>
                                        </label>
                                    </div>
                                    <div class="mx-3">
                                        <label class="inline-flex items-center">
                                            <input type="radio" class="form-radio h-4 w-4" :value="'active'" >
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
                        <p class="flex capitalize mb-1 text-black text-sm font-semibold">Schedule Timing</p>
                        <div class="w-full flex flex-wrap py-4">
                            <div class="mx-3">
                                <label class="inline-flex items-center">
                                    <input type="radio" class="form-radio h-4 w-4" :value="'planned'" >
                                    <span class="ml-2 text-sm">Day</span>
                                </label>
                            </div>
                            <div class="mx-3">
                                <label class="inline-flex items-center">
                                    <input type="radio" class="form-radio h-4 w-4" :value="'active'" >
                                    <span class="ml-2 text-sm">Period</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="w-full my-3">
                        <div class="w-6/12">
                            <div class="w-11/12 relative">
                                <date-time-picker :label="'Scheduling Timing'" :width="'w-full'">
                                    <template #date>
                                        <span>{{ new Date(Date.now()).toLocaleDateString()}}</span>
                                    </template>
                                    <template #time>
                                        <span>{{ '00:00' }}</span>
                                    </template>
                                    <template #input>
                                        <div class="w-full">
                                            <div class="w-full">
                                                <v-date-picker name="eeee" style="z-index:9000;width:100%"></v-date-picker>
                                            </div>
                                            <div class="w-full">
                                                <label
                                                    class="block uppercase my-1 text-xs font-bold"
                                                >
                                                    Time
                                                </label>
                                                <input type="time" class="w-full border rounded-md p-2">
                                            </div>
                                        </div>
                                    </template>
                                </date-time-picker>
                            </div>
                        </div>
                    </div>

                    <div class="w-full flex items-center mt-5 mb-3">
                        <div class="w-6/12">
                            <auto-complete :label="'Location'" :items="[ 'Location 1', 'Location 2' ]" />
                        </div>
                        <div class="w-6/12 -mt-3">
                            <cornie-input :label="'Performer'" :items="[ 'Performer 1', 'Performer 2' ]" />
                        </div>
                    </div>
                </div>
            </template>
        </collapse-section>

        <collapse-section :title="'Product'" :height="570" :show="false">
            <template #form>
                <div class="w-full">
                    <div class="w-full flex items-center mt-5 mb-3">
                        <div class="w-6/12">
                            <auto-complete :label="'Product Code'" :items="[ 'Location 1', 'Location 2' ]" />
                        </div>
                        <div class="w-6/12 -mt-3">
                            <cornie-input :label="'Product Reference'" :items="[ 'Performer 1', 'Performer 2' ]" />
                        </div>
                    </div>
                    <div class="w-full flex items-center mt-5 mb-3">
                        <div class="w-6/12">
                            <cornie-input :label="'Daily Amount'"  />
                        </div>
                        <div class="w-6/12 -mt-3">
                            <cornie-input :label="'Quantity'" />
                        </div>
                    </div>
                    <div class="w-full flex items-center mt-5 mb-3">
                        <div class="w-6/12 -mt-3">
                            <cornie-input :label="'Description'" />
                        </div>
                    </div>

                    <div class="w-full">
                        <text-area :label="'Note'" style="width: 96%" />
                    </div>
                </div>
            </template>
        </collapse-section>

        <div class="w-full">
            <div class=" flex justify-end">
                <corniebtn class="p-2 rounded-full px-8 mx-4 cursor-pointer flex items-center" style="border: 1px solid #080056;">
                    <span class="font-semibold text-primary-500" @click="() => $emit('closesidemodal')">Cancel</span>
                </corniebtn>

                <CornieBtn :loading="loading" @click="onSave" class="bg-red-500 p-2 rounded-full px-8 mx-4">
                    <span class="text-white font-semibold">Save</span>
                </CornieBtn>
            </div>
        </div>
        
    </div>    
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieBtn from "@/components/CornieBtn.vue"
import AutoComplete from "@/components/autocomplete.vue"
import CornieInput from "@/components/cornieinput.vue"
import CornieSelect from "@/components/cornieselect.vue"
import { Item } from "@/types/IUpdateModel";
import DateTimePicker from "@/views/dashboard/schedules/components/datetime-picker.vue"
import CollapseSection from "@/views/dashboard/ehr/procedures/components/collapse-section.vue"
import helper from "../helper/helper"
import TextArea from "@/components/textarea.vue"
import ICarePlan from "@/types/ICarePlan"
import FhirInput from "@/components/fhir-input.vue";
import EncounterSelect from "@/views/dashboard/ehr/allergy/encounter-select.vue"
import { namespace } from "vuex-class";

const careplan = namespace('careplan');

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
    }
})
export default class NewPlan extends Vue {
    @careplan.Action
    createCarePlan!: (body: any) => Promise<void>

    reqBody = {
        // "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "patientId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "practitionerId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "organizationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "instantiatesUri": "string",
        "basedOn": "string",
        "replaces": "string",
        "partOf": "string",
        "intent": "string",
        "status": "string",
        "author": "string",
        "contributor": "string",
        "careTeam": "string",
        "category": "string",
        "addresses": "string",
        "referenceEncounter": "string",
        "title": "Unknown Type: string;",
        "description": "string",
        "startDate": "string",
        "endDate": "string",
        "reference": "string",
        "outcomeReference": "string",
        "progress": "string",
        "outcome": "string",
        "detail": {
            "kind": "string",
            "instantiatesCanonical": "string",
            "instantiatesUri": "string",
            "code": "string",
            "reasonCode": "string",
            "referenceCode": "string",
            "goal": "string",
            "status": "string",
            "statusReason": "string",
            "doNotPerform": true
        },
        "scheduleTiming": {
            "scheduleTiming": "string",
            "startDate": "string",
            "endDate": "string",
            "location": "d25cc910-0830-40cf-a0c8-7c303f381b29",
            "performer": "d25cc910-0830-40cf-a0c8-7c303f381b29"
        },
        "product": {
            "productCode": "string",
            "productReference": "string",
            "dailyAmount": "string",
            "quantity": "string",
            "description": "string",
            "note": "string"
        }
     } as any;

    planStatus = [
        { code: 'draft', display: 'Draft'},
        { code: 'active', display: 'Active'},
        { code: 'on-hold', display: 'On Hold'},
        { code: 'revoked', display: 'Revoked'},
        { code: 'completed', display: 'Completed'},
        { code: 'entered-in-error', display: 'Entered in Error'},
        { code: 'unknown', display: 'Unknown'},
    ] as Item[];
    loading = false;

    get codes() {
        return helper.carePlanCodes;
    }

    get reeasonReferences() {
        return helper.carePlanReasonReferences;
    }

    get detailStatus() {
        return helper.carePlanDetailStatus;
    }

    async onSave() {
        try {
            alert('hello')
            this.loading = true;
            alert('hello')
            const response = await this.createCarePlan(this.reqBody);
            console.log(response, );
            this.loading = false
        } catch (error) {
            console.log(error);
            
        }
    }
}
</script>
