<template>
    <div class="container-fluid">
        <div class="w-full p-2">
            <div class="w-full flex items-start pb-4" style="border-bottom: 1px dashed #C2C7D6;">
                <div class="w-6/12">
                    <div class="w-full">
                        <p class="basic-info">Patient</p>
                        <div class="w-full">
                            <div class="my-4" style="width:90px">
                                <img src="https://via.placeholder.com/90x90" class="rounded-full w-full" alt="Image">
                            </div>
                        </div>

                        <div class="w-full">
                            <p class="patient-name">Nkechi Claire Obi</p>
                            <p class="flex flex-col my-4">
                                <span class="subheader">MRN-CH23022021-0010</span>
                                <span class="my-2 text-xs">87 Montagomery Close, Friend’s Colony Estate, Lekki</span>
                                <span class="my-2 text-xs">08032545678</span>
                                <span class="my-2 text-xs">Nkechi@gmail.com</span>
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
                                    <span class="">21/10/2021</span>
                                </p>
                                <p class="flex flex-col my-4">
                                    <span class="subheader">Duration of stay</span>
                                    <span class="">Ongoing</span>
                                </p>
                                <p class="flex flex-col my-4">
                                    <span class="subheader">Room</span>
                                    <span class="">12</span>
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
                                    <span class="">XXXXX</span>
                                </p>
                                <p class="flex flex-col my-4">
                                    <span class="subheader">Bed</span>
                                    <span class="">24</span>
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
                            <span class="">XXXXX</span>
                        </p>
                    </div>
                    <div class="w-3/12">
                        <p class="flex flex-col my-2">
                            <span class="subheader my-2">Re-admission</span>
                            <span class="">XXXXX</span>
                        </p>
                    </div>
                    <div class="w-3/12">
                        <p class="flex flex-col my-2">
                            <span class="subheader my-2">Diet Preference</span>
                            <span class="">Vegetarian</span>
                        </p>
                    </div>
                </div>

                <div class="w-full flex items-start">
                    <div class="w-3/12">
                        <p class="flex flex-col mb-2">
                            <span class="subheader my-2">Special Courtesy</span>
                            <span class="">XXXXX</span>
                        </p>
                    </div>
                    <div class="w-3/12">
                        <p class="flex flex-col mb-2">
                            <span class="subheader my-2">Special Arrangement</span>
                            <span class="">XXXXX</span>
                        </p>
                    </div>
                    <div class="w-3/12">
                        <p class="flex flex-col mb-2">
                            <span class="subheader my-2">Destination</span>
                            <span class="">XXXXX</span>
                            <span class="subheader my-2">12, Marwa, Lekki, Lagos</span>
                        </p>
                    </div>
                    <div class="w-3/12">
                        <p class="flex flex-col mb-2">
                            <span class="subheader my-2">Discharge Disposition</span>
                            <span class="">XXXXX</span>
                        </p>
                    </div>
                </div>
            </div>

            <div class="w-full flex justify-end mt-4">
                <CornieBtn :loading="false" class="p-2 rounded-full px-8 mx-2 cursor-pointer border">
                    <span class="text-gray font-semibold">Edit</span>
                </CornieBtn>
            </div>
        </div>
    </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import HospitalisationIcon from "./hospital-icon.vue"

@Options({
    components: {
        HospitalisationIcon,
    }
})
export default class DetailsView extends Vue {
    
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