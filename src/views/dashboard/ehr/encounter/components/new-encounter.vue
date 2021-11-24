<template>
    <div class="container-fluid py-5 px-4 bg-white">
        <div class="w-full p-2 main-box">
            <div class="text-gray-400">All fields are required</div>

            <basic-info>
                <template #form>

                <div class="w-full" style="overflow-y:scroll; height: 550px">
                    <div class="w-full flex mb-3 mt-5">
                        <div class="w-6/12">
                            <cornie-select :label="'Status'" v-model="encounter.status"  :items="[ 'active', 'inactive' ]"/>
                        </div>
                        <div class="w-6/12">
                            <cornie-select :label="'Type'" v-model="encounter.type"  :items="['Annual diabetes mellitus screening', 'Bone drilling/bone marrow punction in clinic', 'Infant colon screening - 60 minutes' ]"/>
                        </div>
                    </div>

                    <div class="w-full flex  mt-3">
                        <div class="w-6/12">
                            <cornie-select :label="'Class'" v-model="encounterClass"  :items="['inpatient', 'outpatient', 'ambulatory', 'emmergency' ]"/>
                        </div>
                        <div class="w-6/12">
                            <cornie-select :label="'Service Type'" v-model="encounter.serviceType"  :items="['Cardiology', 'Aged Care Assessment', 'Friendly Visiting', 'Personal Alarms/Alerts', 'Acupuncture', 'Aromatherapy', 'Bowen Therapy']"/>
                        </div>
                    </div>

                    <div class="w-full flex items-center my-3">
                        <div class="w-6/12">
                            <cornie-select :label="'Priority'" v-model="encounter.priority" :items="['ASAP', 'Callback results', 'callback for scheduling' ]"/>
                        </div>
                        <div class="w-6/12">
                            <cornie-select :label="'Episode of care'" v-model="encounter.episodeId"  :items="['Episode 1', 'Episode 2' ]"/>
                        </div>
                    </div>

                    <div class="w-full flex items-center my-3">
                        <div class="w-6/12">
                            <auto-complete :label="'Appointment'" v-model="encounter.appointmentId"  :items="appointmentList"/>
                        </div>
                        <div class="w-6/12">
                            <cornie-select :label="'Based on'" :items="['Service 1', 'Service 2' ]"/>
                        </div>
                    </div>

                    <div class="w-full flex items-center my-3">
                        <div class="w-6/12">
                            <div class="w-11/12">
                                <date-time-picker :label="'Start date & Time'" :width="'w-full'">
                                    <template #date>
                                        <span>{{ new Date(encounter.startDate ?? Date.now()).toLocaleDateString()}}</span>
                                    </template>
                                    <template #time>
                                        <span>{{ '00:00' }}</span>
                                    </template>
                                    <template #input>
                                        <v-date-picker v-model="encounter.startDate" name="eeee" style="z-index:9000;width:100%"></v-date-picker>
                                        <label
                                            class="block uppercase my-1 text-xs font-bold"
                                            >
                                            Time
                                        </label>
                                        <input type="time" v-model="encounter.startTime" class="w-full border rounded-md p-2">
                                    </template>
                                </date-time-picker>
                            </div>
                        </div>
                        <div class="w-6/12">
                            <div class="w-11/12">
                                <date-time-picker :label="'End date & Time'" :width="'w-full'">
                                    <template #date>
                                        <span>{{ new Date(encounter.endDate ?? Date.now()).toLocaleDateString()}}</span>
                                    </template>
                                    <template #time>
                                        <span>{{ '00:00' }}</span>
                                    </template>
                                    <template #input>
                                        <v-date-picker v-model="encounter.endDate" name="eeee" style="z-index:9000;width:100%"></v-date-picker>
                                        <label
                                            class="block uppercase my-1 text-xs font-bold"
                                            >
                                            Time
                                        </label>
                                        <input type="time" v-model="encounter.endTime" class="w-full border rounded-md p-2">
                                    </template>
                                </date-time-picker>
                            </div>
                        </div>
                    </div>

                    <div class="w-full flex mb-3 mt-6">
                        <div class="w-6/12">
                            <cornie-select :label="'Reason Reference'" v-model="encounter.episodeId"  :items="[ 'Anxiety disorder of childhood OR adolescence', 'Choroidal hemorrhage', 'Decreased hair growth' ]"/>
                        </div>
                        <div class="w-6/12">
                            <cornie-select :label="'Account'" v-model="encounter.episodeId"  :items="[ 'Anxiety disorder of childhood OR adolescence', 'Choroidal hemorrhage', 'Decreased hair growth' ]"/>
                        </div>
                    </div>

                    <div class="w-full flex my-3">
                        <div class="w-6/12">
                            <cornie-input :label="'Length'" :disabled="true" placeholder="--Autoloaded--" />
                        </div>
                        <div class="w-6/12">
                            <cornie-select :label="'Reference'" v-model="encounter.episodeId"  :items="[ 'Anxiety disorder of childhood OR adolescence', 'Choroidal hemorrhage', 'Decreased hair growth' ]"/>
                        </div>
                    </div>
                    </div>

                </template>
            </basic-info>

            <service-provider style="margin: 2rem 0">
                <template #form>
                    <div class="w-full" style="overflow-y:scroll; height: 350px">
                        <div class="w-full flex  mb-3 mt-5">
                        <div class="w-6/12">
                            <auto-complete :label="'Provider\'s name'" :items="[ 'Provider 1', 'Provider 2' ]" />
                        </div>
                        <div class="w-6/12">
                            <cornie-select :label="'Reference Location'" v-model="encounter.locationId"  :items="locationList"/>
                        </div>
                    </div>

                    <div class="w-full flex my-3">
                        
                        <div class="w-6/12">
                            <p class="text-xs font-semibold uppercase">Status</p>
                            <div class="w-full flex flex-wrap py-4">
                                <div class="w-3/12">
                                    <label class="inline-flex items-center">
                                        <input type="radio" v-model="encounter.providerStatus" class="form-radio h-4 w-4" :value="'planned'" >
                                        <span class="ml-2 text-sm">Planned</span>
                                    </label>
                                </div>
                                <div class="w-3/12">
                                    <label class="inline-flex items-center">
                                        <input type="radio" v-model="encounter.providerStatus" class="form-radio h-4 w-4" :value="'active'" >
                                        <span class="ml-2 text-sm">Active</span>
                                    </label>
                                </div>
                                <div class="w-3/12">
                                    <label class="inline-flex items-center">
                                        <input type="radio" v-model="encounter.providerStatus" class="form-radio h-4 w-4" :value="'reserved'" >
                                        <span class="ml-2 text-sm">Reserved</span>
                                    </label>
                                </div>
                                <div class="w-3/12">
                                    <label class="inline-flex items-center">
                                        <input type="radio" v-model="encounter.providerStatus" class="form-radio h-4 w-4" :value="'completed'" >
                                        <span class="ml-2 text-sm">Completed</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="w-6/12 -mt-1">
                            <cornie-select :label="'Physical Type'"  :items="physicalTypes"/>
                        </div>
                    </div>

                    <div class="w-full flex items-center my-3">
                        <div class="w-6/12">
                            <div class="w-11/12 relative">
                                <date-time-picker :label="'Start date & Time'" :width="'w-full'">
                                    <template #date>
                                        <span>{{ new Date(encounter.providerStartDate ?? Date.now()).toLocaleDateString()}}</span>
                                    </template>
                                    <template #time>
                                        <span>{{ '00:00' }}</span>
                                    </template>
                                    <template #input>
                                        <div class="w-full">
                                            <div class="w-full">
                                                <v-date-picker v-model="encounter.providerStartDate" name="eeee" style="z-index:9000;width:100%"></v-date-picker>
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
                        <div class="w-6/12">
                            <div class="w-11/12">
                                <date-time-picker :label="'End date & Time'" :width="'w-full'">
                                    <template #date>
                                        <span>{{ new Date(encounter.providerEndDate ?? Date.now()).toLocaleDateString()}}</span>
                                    </template>
                                    <template #time>
                                        <span>{{ '00:00' }}</span>
                                    </template>
                                    <template #input>
                                        <v-date-picker v-model="encounter.providerEndDate" name="eeee" style="z-index:9000;width:100%"></v-date-picker>
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
                </template>
            </service-provider>

            <hospital-info style="margin: 2rem 0">
                <template #form>
                    <div class="w-full flex mb-3 mt-4">
                        
                        <div class="w-6/12">
                            <cornie-select :label="'Origin'" v-model="encounter.origin.id"  :items="locationList"/>
                        </div>
                        <div class="w-6/12">
                            <cornie-select :label="'Ward'" v-model="encounter.admitSource.id"  :items="['Ative', 'Inactive' ]"/>
                        </div>
                    </div>

                    <div class="w-full flex mb-3 mt-3">
                        
                        <div class="w-6/12">
                            <cornie-select :label="'Room'" v-model="encounter.origin.id"  :items="locationList"/>
                        </div>
                        <div class="w-6/12">
                            <cornie-select :label="'Bed'" v-model="encounter.admitSource.id"  :items="['Ative', 'Inactive' ]"/>
                        </div>
                    </div>

                    <div class="w-full flex mb-3 mt-3">
                        
                        <div class="w-6/12">
                            <cornie-select :label="'Admit Source'" v-model="encounter.readmission"  :items="['Admit source' ]"/>
                        </div>
                        
                        <div class="w-6/12">
                            <cornie-select :label="'Re-admission'" v-model="encounter.readmission"  :items="['Re-admission' ]"/>
                        </div>
                        
                    </div>

                    <div class="w-full flex mb-3 mt-3">
                        <div class="w-6/12 ">
                            <cornie-select :label="'Diet Preference'" v-model="encounter.dietPreference"  :items="diets"/>
                            <!-- <label for="" class="font-bold uppercase text-xs mb-1">Diet Preference</label>
                            <select-boxes>
                                <div class="w-full border rounded px-2 absolute bg-white" style="z-index:1000">
                                    <a class="text-gray-700 block py-2 text-sm flex" role="menuitem" tabindex="-1" id="menu-item-0"
                                    >
                                        <span><input type="checkbox" class="h-4 w-4" name="" id="" ></span>
                                        <span class="mx-2 text-lg">Fufu</span>
                                    </a>
                                </div>
                            </select-boxes> -->
                            <!-- <cornie-select :label="'Diet Preference'"  :items="['Ative', 'Inactive' ]"/> -->
                        </div>
                        <div class="w-6/12">
                            <cornie-select :label="'Special Courtsey'" v-model="encounter.specialCourtesy"  :items="courtseys"/>
                        </div>
                    </div>

                    <div class="w-full flex mb-3 mt-3">
                        <div class="w-6/12">
                            <cornie-select :label="'Special Arrangement'"  :items="arrangements"/>
                        </div>
                        <div class="w-6/12">
                            <cornie-select :label="'Destination'" v-model="encounter.destination.id"  :items="locationList"/>
                        </div>
                    </div>

                    <div class="w-full flex mb-3 mt-3">
                        <div class="w-6/12">
                            <cornie-select :label="'Discharge Disposition'" v-model="encounter.dischargeDisposition"  :items="dispositions"/>
                        </div>
                    </div>
                </template>
            </hospital-info>

            <modal :visible="false">
                <div class="w-full" style="width: 565px">
                    <origin-select />
                </div>
            </modal>

            <div class="spacer my-12"></div>
            <!-- <div class="w-full mt-12"> -->
            <div class="w-full mt-12">

            <div class=" flex justify-end">
                <corniebtn class="p-2 rounded-full px-8 mx-4 cursor-pointer flex items-center" style="border: 1px solid #080056;">
                    <span class="font-semibold text-primary-500" @click="() => $emit('closesidemodal')">Cancel</span>
                </corniebtn>

                <CornieBtn :loading="loading" class="bg-red-500 p-2 rounded-full px-8 mx-4" @click="onSave">
                    <span class="text-white font-semibold">Create New Encounter</span>
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
import BasicInfo from "./basic-info.vue"
import ServiceProvider from "./service-provider.vue"
import HospitalInfo from "./hospital-info.vue"
import AutoComplete from "@/components/autocomplete.vue"
import SelectBoxes from "@/views/dashboard/schedules/components/apply-to.vue"
import Modal from "@/components/modal.vue"
import OriginSelect from "./origin-select.vue"
import { namespace } from "vuex-class";
import IAppointment from "@/types/IAppointment";
import ILocation from "@/types/ILocation";
import { IOrigin } from "@/types/IEpisode";
import IEncounter from "@/types/IEncounter";
import IPractitioner from "@/types/IPractitioner";
import { Item } from "@/types/IUpdateModel";

const vital = namespace('vitals')
const appointment = namespace('appointment')
const location = namespace('location')
const userStore = namespace('user');

@Options({
    components: {
        CornieSelect,
        CornieInput,
        DateTimePicker,
        BasicInfo,
        ServiceProvider,
        HospitalInfo,
        AutoComplete,
        SelectBoxes,
        Modal,
        OriginSelect,
    }
})
export default class NewEpisode extends Vue {
    @appointment.Action
    fetchAppointments!: () => Promise<void>;

    @appointment.State
    appointments!: IAppointment[];

    @location.Action
    fetchLocations!: () => Promise<void>;

    @location.State
    locations!: ILocation[];

    @vital.Action
    createEncounter!: (encounter: IEncounter) => Promise<boolean>;

    @userStore.Getter
    authPractitioner!: IPractitioner;

    loading = false;
    encounterClass = "";

    diets = [
        { code: 'vegetarian', display: 'Vegetarian' },
        { code: 'dairy-free', display: 'Dairy Free' },
        { code: 'nut-free', display: 'Nut Free' },
        { code: 'gluten-free', display: 'Gluten Free' },
    ] as Item[];

    courtseys = [
        { code: 'EXT', display: 'extended courtesy' },
        { code: 'NRM', display: 'Normal Courtsey' },
        { code: 'PRF', display: 'professional courtesy' },
        { code: 'STF', display: 'staff' },
    ] as Item[];

    arrangements = [
        { code: 'add-bed', display: 'Additional bedding' },
        { code: 'wheel', display: 'Wheelchair' },
        { code: 'int', display: 'Interpreter' },
        { code: 'att', display: 'Attendant' },
        { code: 'dog', display: 'Guide dog' },
    ] as Item[];

    dispositions = [
        { code: 'home', display: 'Home' },
        { code: 'alt-home', display: 'Alternative Home' },
        { code: 'other-hcf', display: 'Other healthcare facility' },
        { code: 'exp', display: 'Expired' },
    ] as Item[];

    physicalTypes = [
        { code: 'si', display: 'Site' },
        { code: 'bu', display: 'Building' },
        { code: 'wi', display: 'Wing' },
        { code: 'wa', display: 'Ward' },
    ] as Item[];

    encounter = {
        destination: { id: "d25cc910-0830-40cf-a0c8-7c303f381b29", type: 'location'},
        origin: { id: "d25cc910-0830-40cf-a0c8-7c303f381b29", type: 'location'},
        admitSource: { id: "d25cc910-0830-40cf-a0c8-7c303f381b29", type: 'location'},
     } as IEncounter;
    patientId = "";

    get appointmentList() {
        if (this.appointments?.length === 0) return [ ];
        return this.appointments.map(appointment => {
            return {
                code: appointment.id,
                display: appointment.description,
            }
        })
    }

    get locationList() {
        if (this.locations?.length === 0) return [ ];
        return this.locations.map(location => {
            return {
                code: location.id,
                display: location.description,
            }
        })
    }

    async onSave() {        
        try {
            this.loading = true;
            this.encounter.patientId = this.patientId;
            this.encounter.practitionerId = this.authPractitioner?.id;
            this.encounter.class = this.encounterClass;
            this.encounter.locationId = "d25cc910-0830-40cf-a0c8-7c303f381b29";

            const created = await this.createEncounter(this.encounter);
            console.log(created);
            
            this.loading = false;
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    }

    async created() {
        this.patientId = this.$route.params.id as string;
        if (this.locations?.length <= 0) await this.fetchLocations()
        console.log(this.locations, "LOCATIONS");
        
    }
}
</script>

<style scoped>
/* .main-box {
    min-height: 400px;
    height: 100vh;
    overflow-y: scroll;
    overflow: hidden;
} */
</style>