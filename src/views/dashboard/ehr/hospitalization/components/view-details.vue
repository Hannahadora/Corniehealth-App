<template>
    <div class="container-fluid">
        <div class="w-full p-2">
            <div class="w-full flex items-start pb-4" style="border-bottom: 1px dashed #C2C7D6;">
                <div class="w-6/12">
                    <div class="w-full">
                        <p class="basic-info">Patient</p>
                        <div class="w-full">
                            <div class="my-4" style="width:90px; height:90px">
                                <img v-if="patient?.profilePhoto" :src="patient?.profilePhoto" class="rounded-full w-full" alt="Image" style="max-height:100%">
                                <img v-else src="https://via.placeholder.com/90x90" class="rounded-full w-full" alt="Image" style="max-height:100%">
                            </div>
                        </div>

                        <div class="w-full">
                            <p class="patient-name">{{ patient?.firstname }} {{ patient?.middlename }} {{ patient?.lastname }}</p>
                            <p class="flex flex-col my-4">
                                <span class="subheader">{{ patient?.mrn }}</span>
                                <span class="my-2 text-xs">{{ patientAddress }}</span>
                                <span class="my-2 text-xs">{{ patientPhone }}</span>
                                <span class="my-2 text-xs">{{ patientEmail }}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="w-6/12">
                    <div class="w-full">
                        <p class="basic-info">Basic Information</p>
                        <div class="w-full flex items-center">
                            <div class="w-6/12">
                                <p class="flex flex-col my-4">
                                    <span class="subheader">Status</span>
                                    <span class="">Active</span>
                                </p>
                                <p class="flex flex-col my-4">
                                    <span class="subheader">Admit Date</span>
                                    <span class="">{{ new Date(hospitalisation.createdAt).toLocaleDateString() }}</span>
                                </p>
                                <p class="flex flex-col my-4">
                                    <span class="subheader">Duration of stay</span>
                                    <span class="">Ongoing</span>
                                </p>
                                <p class="flex flex-col my-4">
                                    <span class="subheader">Room</span>
                                    <span class="">{{ hospitalisation.room }}</span>
                                </p>
                            </div>
                            <div class="w-6/12">
                                <p class="flex flex-col my-4">
                                    <span class="subheader">Status</span>
                                    <span class="">Active</span>
                                </p>
                                <p class="flex flex-col my-4">
                                    <span class="subheader">Condition</span>
                                    <span class="">Homoiothermia</span>
                                </p>
                                <p class="flex flex-col my-4">
                                    <span class="subheader">Ward</span>
                                    <span class="">{{ hospitalisation.ward }}</span>
                                </p>
                                <p class="flex flex-col my-4">
                                    <span class="subheader">Bed</span>
                                    <span class="">{{ hospitalisation.bed }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full py-4">
                <p class="hospitalization-header flex items-center">
                    <span><hospitalisation-icon /></span>
                    <span class="ml-2">Hospitalisation</span>
                </p>
                <div class="w-full flex items-start">
                    <div class="w-3/12">
                        <p class="flex flex-col my-2">
                            <span class="subheader my-2">Origin</span>
                            <span class="">Reddington Hospital</span>
                            <span class="subheader my-2">12, Idowu Martin Street, Victoria Island, Lagos</span>
                        </p>
                    </div>
                    <div class="w-3/12">
                        <p class="flex flex-col my-2">
                            <span class="subheader my-2">Admit Source</span>
                            <span class="">{{ hospitalisation.admitSource}}</span>
                        </p>
                    </div>
                    <div class="w-3/12">
                        <p class="flex flex-col my-2">
                            <span class="subheader my-2">Re-admission</span>
                            <span class="">{{hospitalisation.reAdmission}}</span>
                        </p>
                    </div>
                    <div class="w-3/12">
                        <p class="flex flex-col my-2">
                            <span class="subheader my-2">Diet Preference</span>
                            <span class="">{{ hospitalisation.dietPreference }}</span>
                        </p>
                    </div>
                </div>

                <div class="w-full flex items-start">
                    <div class="w-3/12">
                        <p class="flex flex-col mb-2">
                            <span class="subheader my-2">Special Courtesy</span>
                            <span class="">{{ hospitalisation.specialCourtesy }}</span>
                        </p>
                    </div>
                    <div class="w-3/12">
                        <p class="flex flex-col mb-2">
                            <span class="subheader my-2">Special Arrangement</span>
                            <span class="">{{ hospitalisation.specialArrangement }}</span>
                        </p>
                    </div>
                    <div class="w-3/12">
                        <p class="flex flex-col mb-2">
                            <span class="subheader my-2">Destination</span>
                            <span class="">{{ hospitalisation.destination }}</span>
                            <span class="subheader my-2">12, Marwa, Lekki, Lagos</span>
                        </p>
                    </div>
                    <div class="w-3/12">
                        <p class="flex flex-col mb-2">
                            <span class="subheader my-2">Discharge Disposition</span>
                            <span class="">{{ hospitalisation.dischargeDisposition }}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div class="w-full flex justify-end mt-4">
                <CornieBtn @click="$emit('onedit', hospitalisationId)" class="p-2 rounded-full px-8 mx-2 cursor-pointer border">
                    <span class="text-gray font-semibold">Edit</span>
                </CornieBtn>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { IHospitalisation } from "@/types/IHospitalisation";
import { IPatient } from "@/types/IPatient";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import HospitalisationIcon from "./hospital-icon.vue"

const patient = namespace('patients')

@Options({
    components: {
        HospitalisationIcon,
    }
})
export default class DetailsView extends Vue {
    @patient.State
    patients!: IPatient[]

    @patient.Action
    fetchPatients!: () => Promise<void>

    @Prop({ type: String, default: ""})
    hospitalisationId!: string;

    @Prop({ type: Array, default: [ ]})
    items!: IHospitalisation[];

    get hospitalisation() {
        if (!this.hospitalisationId) return { } as IHospitalisation;
        return this.items.find(hospitalisation => hospitalisation.id === this.hospitalisationId) as IHospitalisation;
    }


    get patient() {
        if (!this.$route.params?.id) return { } as IPatient;
        const target =  this.patients.find(patient => patient.id === this.$route.params.id);
        return target;
    }

    get patientAddress() {
        if (!this.patient?.id) return "";
        const { contactInfo } = this.patient;
        if (!contactInfo || contactInfo?.length <= 0) return "Unknown";
        const firstAddress = contactInfo[0];
        return `${firstAddress.country} ${firstAddress.state}, ${firstAddress.city}`
    }

    get patientPhone() {
        if (!this.patient?.id) return "";
        const { contactInfo } = this.patient;
        if (!contactInfo || contactInfo?.length <= 0) return "Unknown";
        const firstAddress = contactInfo[0];
        return `${firstAddress.phone?.dialCode}${firstAddress.phone?.number}`
    }

    get patientEmail() {
        if (!this.patient?.id) return "";
        const { contactInfo } = this.patient;
        if (!contactInfo || contactInfo?.length <= 0) return "Unknown";
        const firstAddress = contactInfo[0];
        return `${firstAddress.email}`
    }


    async created() {
        if (this.patients?.length === 0) await this.fetchPatients();
        console.log(this.patients, "Patients");
        
    }
}
</script>


<style scoped>
* {
    font-family: Inter;
}

.basic-info {
    position: static;
    width: 138px;
    height: 24px;
    left: calc(50% - 138px/2 - 166.5px);
    top: calc(50% - 24px/2);

    /* Subtitles/Sub_2 */

    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */


    /* Primary/Indigo Dye */

    color: #080056;
}

.subheader {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 19px;
    /* identical to box height, or 160% */


    /* Greys/Blue Yonder */

    color: #667499;
}

.hospitalization-header {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */


    /* Primary/Razzmataz */

    color: #FE4D3C;
}

.border {
    border: 1px solid #080056;
}

.patient-name {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    /* identical to box height, or 150% */


    /* Blacks/Jet */

    color: #14171F;
}
</style>