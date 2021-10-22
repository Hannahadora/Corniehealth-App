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
                    <cornie-select :label="'Room'" :items="rooms" v-model="visitData.roomId" style="width: 100%" />
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
                <div class="w-12/12 mt-5">
                    <label for="" class="flex capitalize mb-1 text-black text-sm font-medium">All Patients for Visit</label>
                    <div class="w-full mt-4">
                        <visitor :appointment="appointment" />
                    </div>
                </div>
            </div>

        </div>

        <div class="w-full">
            <div class="w-full flex justify-end">
                <corniebtn class="p-2 rounded-full px-8 mx-4 cursor-pointer flex items-center" style="border: 1px solid #080056;">
                    <span class="font-semibold text-primary-500" @click="() => $emit('closesidemodal')">Cancel</span>
                </corniebtn>

                <CornieBtn :loading="loading" @click="checkinPatient" class="bg-red-500 p-2 rounded-full px-8 mx-4">
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
import ILocation from "@/types/ILocation";
import IVisit from "@/types/IVisit";
import TextArea from "@/components/textarea.vue"
import Visitor from "./visitor.vue"
import IAppointment from "@/types/IAppointment";

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
    @location.State
    locations!: ILocation[];

    @location.Action
    fetchLocations!: () => Promise<void>

    @appointment.State
    appointments!: any[];

    @appointment.Action
    fetchByIdAppointments!: (patientId: string) => Promise<void>;

    @visitStore.Action
    checkout!: (id: string) => Promise<boolean>

    @visitStore.Action
    checkin!: (body: any) => Promise<boolean>

    @Prop({ type: Object, default: { }})
    visit!: IVisit;

    visitData: any = {
        
    }
    loading = false;
    @Prop({ type: String, default: ''})
    appointmentId = ""

    get appointment() {
        if (!this.appointmentId) return { }
        return this.appointments[0]?.result.find((appointment: IAppointment) => appointment?.id === this.appointmentId)
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

    async checkinPatient() {
    try {
        this.loading = true;
        const checkedIn = await this.checkin({
            "patientId": this.$route.params.id,
            "appointmentId": this.appointmentId,
            "status": "In-progress",
            "roomId": this.visitData.roomId,
            "notes": this.visitData.notes,
            "slotId": this.visitData.slotId,
        })

        this.loading = false;
        
        if (checkedIn && checkedIn) {
            window.notify({ msg: "Patient Check-in", status: "success" });
            this.$emit("closesidemodal")
        } else {
            window.notify({ msg: "Patient check-in failed", status: "error" });
        }
    } catch (error) {
        this.loading = false;
        console.log(error);
    }
  }

    async created() {
        if (this.locations?.length <= 0) await this.fetchLocations();
        if (this.appointments?.length <= 0) await this.fetchByIdAppointments(this.$route.params.id.toString());
        console.log(this.appointments, "appoitmbrb");
    }

    @Watch("appointmentId", { deep: true })
    updateVisit() {
        alert('ff')
        if (this.appointmentId) {
            alert('has')
            const appointment = this.appointments[0]?.result?.find((appointment: IAppointment) => appointment?.id === this.appointmentId) as IAppointment;
            alert(this.appointmentId)
            console.log(appointment, "TARGET");
            
            if (appointment?.id) {
                alert("hello")
                this.visitData.startDate = appointment.period?.start;
                this.visitData.startDate = appointment.period?.end?.toString().substring(11, 15);
                this.visitData.roomId = 'd25cc910-0830-40cf-a0c8-7c303f381b29';
                // this.visitData.roomId = appointment?.locationId;
                this.visitData.slotId = appointment?.slot;
                alert(appointment?.slot)
                console.log(this.visitData);
                
             } else {
                 alert('no o')
             }
        }
    }
}
</script>
