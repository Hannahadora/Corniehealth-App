<template>
    <div class="container-fluid py-5 px-4 bg-white">
        <div class="w-full p-2 main-box relative">
            <div class="text-gray-400">Fields with <span class="text-danger">*</span> are required</div>

            <div class="w-full flex items-center my-3">
                <div class="w-6/12">
                    <cornie-select :label="'Status'" v-model="episode.status"  :items="['planned', 'waitlist', 'active', 'onhold', 'finished', 'cancelled', 'entered-in-error' ]"/>
                </div>
            </div>

            <div class="w-full mb-3 mt-3 mb-6">
                <div class="w-16/12">
                    <p class="text-base font-semibold">Class History</p>
                    <div class="w-full">
                        <div class="md w-12/12">
                            <div class="md w-full">
                                <div class="md w-full">
                                    <p>
                                        <span class="mr-2">Arrived</span> 
                                        <span class="text-gray-400">(29/04/2021, 09:00 - 29/04/2021, 09:30)</span>
                                    </p>
                                </div>
                                <div class="md w-full my-2" style="height: 30px;border-left: 1px dashed #878E99;">

                                </div>
                            </div>
                        </div>

                        <div class="md w-12/12">
                            <div class="md w-full">
                                <div class="md w-full">
                                    <p>
                                        <span class="mr-2">Inpatient</span> 
                                        <span class="text-gray-400">(29/04/2021, 09:00 - 29/04/2021, 09:30)</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="w-full flex items-center my-3">
                <div class="w-6/12">
                    <cornie-select :label="'Type'" v-model="episode.type"  :items="['Ative', 'Inactive' ]"/>
                </div>
                <div class="w-6/12 -mt-3">
                    <auto-complete v-model="episode.condition" :label="'Reference Condition'" :items="['Obesity', 'Flu', 'Drug abuse', 'Mental illness' ]" />
                </div>
            </div>

            <div class="w-full flex items-center my-3">
                <div class="w-6/12">
                    <cornie-select :label="'Role'" v-model="episode.role"  :items="['Ative', 'Inactive' ]"/>
                </div>
                <div class="w-6/12 -mt-3">
                    <cornie-input :label="'Rank'" />
                </div>
            </div>

            <div class="w-full flex items-center my-3">
                <div class="w-4/12">
                    <auto-complete :label="'Managing Organisation'"  :items="['Option 1', 'Option 2' ]"/>
                </div>
                <div class="w-4/12 -mt-3">
                    <div class="w-11/12">
                        <date-time-picker :label="'Start date & Time'" :width="'w-full'">
                            <template #date>
                                <span>{{ new Date(episode.start ?? Date.now()).toLocaleDateString()}}</span>
                            </template>
                            <template #time>
                                <span>{{ '00:00' }}</span>
                            </template>
                            <template #input>
                                <v-date-picker v-model="episode.start" name="eeee" style="z-index:9000;width:100%"></v-date-picker>
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
                <div class="w-4/12 -mt-3">
                    <div class="w-11/12">
                        <date-time-picker :label="'End date & Time'" :width="'w-full'">
                            <template #date>
                                <span>{{ new Date(episode.end ?? Date.now()).toLocaleDateString()}}</span>
                            </template>
                            <template #time>
                                <span>{{ '00:00' }}</span>
                            </template>
                            <template #input>
                                <v-date-picker v-model="episode.end" name="eeee" style="z-index:9000;width:100%"></v-date-picker>
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

            <div class="w-full flex items-center my-3">
                <div class="w-6/12">
                    <auto-complete :label="'Referral Request'"  :items="['Ative', 'Inactive' ]"/>
                </div>
                <div class="w-6/12 -mt-3">
                    <cornie-select :label="'Care Manager'" v-model="episode.careManagerId"  :items="practitioners"/>
                </div>
            </div>

            <div class="w-full mt-12">
              <div class="w-full pb-8 flex flex justify-end">
                <corniebtn class="p-2 rounded-full px-8 mx-4 cursor-pointer flex items-center" style="border: 1px solid #080056;">
                    <span class="font-semibold text-primary-500" @click="() => $emit('closesidemodal')">Cancel</span>
                </corniebtn>

                <CornieBtn :loading="false" class="bg-red-500 p-2 rounded-full px-8 mx-4"
                    @click="onSave"
                >
                    <span class="text-white font-semibold">Create New Episode</span>
                </CornieBtn>
            </div>
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieSelect from "@/components/cornieselect.vue"
import CornieInput from "@/components/cornieinput.vue"
import DateTimePicker from "@/views/dashboard/schedules/components/datetime-picker.vue"
import AutoComplete from "@/components/autocomplete.vue"
import { namespace } from "vuex-class";
import IEpisode from "@/types/IEpisode";
import { Prop } from "vue-property-decorator";
import IPractitioner from "@/types/IPractitioner";

const vital = namespace('vitals');

@Options({
    components: {
        CornieSelect,
        CornieInput,
        DateTimePicker,
        AutoComplete,
    }
})
export default class NewEpisode extends Vue {
    @Prop({ type: Array, default: []})
    items!: IPractitioner[]

    @vital.Action
    createEpisode!: (episode: IEpisode) => Promise<boolean>

    episode = {  } as IEpisode;
    patientId = '';

    get practitioners() {
        if (this.items?.length === 0) return [ ];
        return this.items.map(practitioner => {
            return { code: practitioner.id, display: `${practitioner.firstName} ${practitioner.lastName}`}
        })
    }

    async onSave() {
        try {
            this.episode.patientId = this.patientId;
            this.episode.name = "Test"
            const created = await this.createEpisode(this.episode);
            console.log(created, "created");
        } catch (error) {
            console.log(error);
        }
    }

    created() {
        this.patientId = this.$route.params.id as string;
    }
}
</script>

<style scoped>
.main-box {
    min-height: 400px;
    height: 80vh;
}
</style>