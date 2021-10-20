<template>
    <div class="container-fluid p-3">
        <div class="w-full" style="min-height: 78vh">
            <div class="w-full flex items-center">
                <div class="w-6/12">
                    <div class="w-11/12 -mt-5">
                        <date-time-picker :label="'Start date & Time'" :width="'w-full'">
                            <template #date>
                                <span>{{ new Date(visit?.checkInTime ?? Date.now()).toLocaleDateString()}}</span>
                            </template>
                            <template #time>
                                <span>{{ visitData.startTime ?? '00:00' }}</span>
                            </template>
                            <template #input>
                                <v-date-picker style="z-index:9000;width:100%"></v-date-picker>
                                <label
                                    class="block uppercase my-1 text-xs font-bold"
                                    >
                                    Time
                                </label>
                                <input v-model="visitData.startTime" type="time" class="w-full border rounded-md p-2">
                            </template>
                        </date-time-picker>
                    </div>
                </div>
                <div class="w-6/12">
                    <cornie-select :label="'Room'" :items="rooms" v-model="visitData.room" style="width: 100%" />
                </div>
            </div>
<!-- 
            <div class="w-full flex items-center">
                <div class="w-6/12">
                    <cornie-select :label="'Room'" :items="rooms" v-model="visitData.room" />
                </div>
                <div class="w-6/12 -mt-5">
                    <CornieInput :label="'Total Bill'" />
                </div>
            </div> -->

            <div class="w-full mt-1">
                <div class="w-12/12">
                    <text-area style="width: 100%;height: 125px" :label="'Notes'" />
                </div>
            </div>

            <div class="w-full">
                <div class="w-12/12">
                    <label for="" class="flex capitalize mb-1 text-black text-sm font-medium">All Patients for Visit</label>
                    <div class="w-full">
                        <visitor id />
                    </div>
                </div>
            </div>

        </div>

        <div class="w-full">
            <div class="w-full flex justify-end">
                <corniebtn class="p-2 rounded-full px-8 mx-4 cursor-pointer flex items-center" style="border: 1px solid #080056;">
                    <span class="font-semibold text-primary-500" @click="() => $emit('closesidemodal')">Cancel</span>
                </corniebtn>

                <CornieBtn :loading="loading" @click="checkPatientOut" class="bg-red-500 p-2 rounded-full px-8 mx-4">
                    <span class="text-white font-semibold">Checkin</span>
                </CornieBtn>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DateTimePicker from "@/views/dashboard/schedules/components/datetime-picker.vue";
import CornieSelect from "@/components/cornieselect.vue"
import CornieInput from "@/components/cornieinput.vue"
import { Prop, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import IPractitioner from "@/types/IPractitioner";
import ILocation from "@/types/ILocation";
import IVisit from "@/types/IVisit";
import TextArea from "@/components/textarea.vue"
import Visitor from "./visitor.vue"
import IAppointment from "@/types/IAppointment";

const practitioner = namespace('practitioner');
const location = namespace('location');
const visitStore = namespace('visits');
const appointment = namespace('appointment');


@Options({
    components: {
        DateTimePicker,
        CornieSelect,
        CornieInput,
        TextArea,
        Visitor,
    }
})
export default class PatientCheckin extends Vue {
    @practitioner.State
    practitioners!: IPractitioner[];

    @practitioner.Action
    fetchPractitioners!: () => Promise<void>

    @location.State
    locations!: ILocation[];

    @location.Action
    fetchLocations!: () => Promise<void>

    @appointment.State
    appointments!: IAppointment[];

    @appointment.Action
    fetchAppointments!: () => Promise<void>

    @visitStore.Action
    checkout!: (id: string) => Promise<boolean>

    @Prop({ type: Object, default: { }})
    visit!: IVisit;

    visitData: any = {
        
    }
    loading = false;
    @Prop({ type: String, default: ''})
    visitId = ""

    get physicians() {
        if (this.practitioners?.length <= 0) return [ ]
        return this.practitioners?.map(practitioner => {
            return { code: practitioner.id, display: `${practitioner.firstName} ${practitioner.lastName}`}
        })
    }

    async checkPatientOut() {
        try {
            this.loading = true;
            const completed = await this.checkout(this.visit?.id)
            if (completed) {
                notify({
                    msg: "Patient checked out successfully",
                    status: "success",
                });
                this.$emit("closesidemodal");
            } else {
                notify({
                    msg: "There was an error checking out this patient",
                    status: "error",
                });
            }
            this.loading = false;
        } catch (error) {
            console.log(error);
            
            this.loading = false;
        }
    }

    get rooms() {
        if (this.locations?.length <= 0) return [ ]
        return this.locations?.map(location => {
            return { code: location.id, display: location.name }
        })
    }

    async created() {
        if (this.practitioners?.length <= 0) await this.fetchPractitioners();
        if (this.locations?.length <= 0) await this.fetchLocations();
        if (this.appointments?.length <= 0) await this.fetchAppointments();
        console.log(this.appointments, "appoitmbrb");
    }

    @Watch("visitId", { deep: true })
    updateVisit() {
        if (this.visit?.id) {
            this.visitData.startDate = new Date(this.visit?.checkInTime)
            this.visitData.startTime = this.visit?.checkInTime.substring(11, 16)
            this.visitData.room = this.visit?.roomId
            if (this.visit?.practitioners?.length > 0) {
                this.visitData.practitioner = this.visit?.practitioners[0];
            }
        }
    }
}
</script>
