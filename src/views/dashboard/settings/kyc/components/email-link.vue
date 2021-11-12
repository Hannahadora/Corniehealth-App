<template>
    <div class="container-fluid p-4 bg-white overflow-y-scroll">
        <div class="w-full">
            <div class="w-full py-4" style="border-bottom: 1px solid #C2C7D6">
                <p class="header">KYC</p>
            </div>

            <div class="w-full">
                <form action="">

                    
                    <div class="w-full flex flex-wrap items-center pt-6 pb-8">
                        <p class="normal-text">Thank you for choosing to refer Dr.Obi Akeem Musa. This exercise will take less than 5 minutes.</p>
                    </div>

                    <div class="w-full section-card px-4">
                        <div class="w-full flex flex-wrap items-center py-4">
                            <div class="w-5/12">
                                <p class="normal-text mr-4">What's your relationship with Dr. Obi Akeem Musa?</p>
                            </div>
                            <div class="w-7/12 flex">
                                <div class="mx-2 -mb-2">
                                    <cornie-radio v-model="data.relationship" :label="'Professional Colleague'" value="Professional Colleague" />
                                </div>
                                <div class="mx-2 -mb-2">
                                    <cornie-radio v-model="data.relationship" :label="'Friend'" value="Friend" />
                                </div>
                                <div class="mx-2 -mb-2">
                                    <cornie-radio v-model="data.relationship" :label="'Relative'" value="Relative" />
                                </div>
                                <div class="mx-2 -mb-2">
                                    <cornie-radio v-model="data.relationship" :label="'Others'" value="Others" />
                                </div>
                            </div>
                        </div>

                        <div class="w-full flex my-3">
                            <div class="w-5/12">
                                <p class="normal-text">How long have you known Dr. Obi Akeem Musa?</p>
                            </div>
                            <div class="w-3/12 flex border py-1 rounded" style="height:46px;max-width:200px">
                                <div class="w-4/12">
                                    <input type="text" v-model="data.knownDuration" class="w-full p-2 px-3 outline-none" style="height: 100%;border:none">
                                    <!-- <cornie-input style="width:100%;border: transparent" /> -->
                                </div>
                                <div class="w-8/12 border-l-2">
                                    <cornie-dropdown  v-model="data.knowDurationUnit" style="width: 100%;border:transparent" :items="['Years', 'Months']" />
                                </div>
                            </div>
                        </div>

                        <div class="w-full flex mb-4">
                            <div class="w-12/12 flex items-center flex-wrap mx-4 my-2">
                                <a class="normal-text mr-4">Please select qualities that best describe Dr. Obi Akeem Musa</a>
                                <div class="mx-3 -mb-2" v-for="(quality, index) in qualities" :key="index">
                                    <label class="inline-flex items-center my-4">
                                        <input type="checkbox" class="form-radio h-3 w-3" :value="quality" >
                                        <span class="ml-2 noraml-text text-sm font-normal">{{ quality }}</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="w-full flex flex-wrap items-center pb-4">
                            <div class="w-6/12">
                                <p class="normal-text mr-4">Please rate Dr. Obi Akeem Musa's clinical experience</p>
                            </div>
                            <div class="w-4/12 flex">
                                <range-picker />
                            </div>
                        </div>

                        <div class="w-full flex flex-wrap items-center py-4">
                            <div class="w-6/12">
                                <p class="normal-text mr-4">Please rate Dr. Obi Akeem Musa quality of work in clinical medicine</p>
                            </div>
                            <div class="w-4/12 flex">
                                <range-picker />
                            </div>
                        </div>

                        <div class="w-full flex flex-wrap items-center py-4">
                            <div class="w-7/12">
                                <p class="normal-text mr-4">Are you aware of any previous or pending malpractice suite against Dr. Obi Akeem Musa?</p>
                            </div>
                            <div class="w-5/12 flex">
                                <div class="mx-2 -mb-2">
                                    <cornie-radio :label="'Yes'" value="Yes" />
                                </div>
                                <div class="mx-2 -mb-2">
                                    <cornie-radio :label="'No'" value="No" />
                                </div>
                            </div>
                        </div>

                        <div class="w-full">
                            <div class="w-12/12">
                                <Textarea style="width: 97%; height: 150px" :label="'General comments'" />
                            </div>
                        </div>
                    </div>

                    <div class="w-full section-card px-4 my-6">
                        <collapse-section :title="'Particulars of Referee'" :height="320" :overflow="true">
                            <template #form>
                                <div class="w-full flex items-center  mb-6">
                                    <div class="w-3/12">
                                        <cornie-input :label="'Full Name'" />
                                    </div>
                                    <div class="w-3/12">
                                        <cornie-input :label="'Nationality'" />
                                    </div>
                                    <div class="w-3/12">
                                        <div class="w-11/12">
                                            <cornie-input :label="'Email Address'" />
                                        </div>
                                    </div>
                                    <div class="w-3/12">
                                        <div class="w-11/12">
                                            <phone-input :label="'Phone Number'" />
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full flex items-center  mb-6">
                                    <div class="w-4/12 -mb-4">
                                        <cornie-select :items="[ 'Nigerian Bank Identification Number (BVN)', 'International Passport', 'National Identitiy Number (NIN)', 'Driver\'s License', 'Voter\'s Card']" :label="'Identification Document'" />
                                    </div>
                                    <div class="w-4/12">
                                        <cornie-input :label="'Identity Document Number'" />
                                    </div>
                                    <div class="w-4/12">
                                        <file-picker :label="'Upload Identitification Document '" />
                                    </div>
                                </div>
                                <div class="w-full flex items-center  mb-6">
                                    <div class="w-4/12 -mb-4">
                                        <cornie-select style="z-index:1000" :items="[ 'Medical Practice Licence', 'Pharmacy Practice Licence', 'Radiology Practice Licence', 'Pathology Practice Licence', 'Not Applicable']" :label="'Practice Licence Document'" />
                                    </div>
                                    <div class="w-4/12">
                                        <cornie-input :label="'Practice Licence Number'" />
                                    </div>
                                    <div class="w-4/12">
                                        <file-picker :label="'Upload Practice Licence Document'" />
                                    </div>
                                </div>
                            </template>
                        </collapse-section>
                    </div>

                    <div class="w-full section-card px-4 my-6">
                        <collapse-section :title="'Address'" :height="220">
                            <template #form>
                                <div class="w-full flex items-center  mb-6">
                                    <div class="w-4/12 -mb-4">
                                        <cornie-select :items="[ 'Nigeria']" :label="'Country'" />
                                    </div>
                                    <div class="w-4/12 -mb-4">
                                        <cornie-select :items="[ 'Lagos']" :label="'State of Region'" />
                                    </div>
                                    <div class="w-4/12 -mb-4">
                                        <cornie-select :items="[ 'Ikeja']" :label="'City'" />
                                    </div>
                                </div>
                                <div class="w-full flex items-center  mb-6">
                                    <div class="w-4/12">
                                        <cornie-input :label="'ZIP or Post Code'" />
                                    </div>
                                    <div class="w-4/12">
                                        <cornie-input :label="'Address'" />
                                    </div>
                                    <div class="w-4/12">
                                        <cornie-input :label="'Apartment or House Number'" />
                                    </div>
                                </div>
                            </template>
                        </collapse-section>
                    </div>


                    <div class="w-full py-10 flex justify-between">
                        <cornie-button class="rounded-full px-8 font-semibold cursor-pointer py-1" style="border: 1px solid #080056; color: #080056">
                            Cancel
                        </cornie-button>

                        <cornie-button class="rounded-full px-8 font-semibold cursor-pointer py-1 text-white" style="background: #FE4D3C">
                            Save
                        </cornie-button>
                    </div>

                </form>
            </div>
        </div>

        <modal :visible="nominateRefree">
            <nominate-refree  @close="() => nominateRefree = false"/>
        </modal>

        <modal :visible="addOwner">
            <beneficial-owner  @close="() => addOwner = false"/>
        </modal>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CollapseSection from './collapse-section.vue'
import CornieInput from "@/components/cornieinput.vue"
import DatePicker from "@/components/datepicker.vue"
import PhoneInput from "@/components/phone-input.vue"
import CornieSelect from "@/components/autocomplete.vue"
import AutoComplete from "@/components/autocomplete.vue"
import DeleteIcon from "@/components/icons/deleteorange.vue"
import CornieButton from "@/components/CornieBtn.vue"
import Modal from "@/components/modal.vue"
import Textarea from "@/components/textarea.vue"
import RangePicker from "./range-picker.vue"
import CornieDropdown from "@/components/cornieselect.vue"
import FilePicker from "./choose-file.vue"
import UploadedFile from "./uploadd-file.vue"
import CornieRadio from "@/components/cornieradio.vue"
import CornieCheckbox from "@/components/corniecheckbox.vue"

@Options({
    components: {
        CollapseSection,
        CornieInput,
        DatePicker,
        PhoneInput,
        CornieSelect,
        AutoComplete,
        DeleteIcon,
        CornieButton,
        Modal,
        Textarea,
        RangePicker,
        CornieDropdown,
        FilePicker,
        UploadedFile,
        CornieRadio,
        CornieCheckbox,
    }
})
export default class EmailLink extends Vue {
    nominateRefree = false;
    addOwner = false;

    qualities = [ 'Knowledgeable', 'Attentive', 'Curious', 'Collaborative', 'Analytical', 'Calm', 'Decisive', 'Detail', 'Composed', 'Trustworthy', 'Mature', 'Responsible', 'Ethical', 'Empathetic', 'Patient Oriented', 'Frieindly', 'Time management' ]

    data: any = { }
}
</script>


<style scoped>
    * {
        font-family: Inter;
        font-style: normal;
    }

    .header {
        font-weight: bold;
        font-size: 20px;
        line-height: 28px;
        color: #080056;
    }

    .normal-text {
        font-size: 14px !important;
        line-height: 21px !important;
        color: #14171F !important;
        font-weight: 600 !important;
    }

    .section-card {
        background: #FFFFFF;
        box-shadow: 0px 1px 2px rgba(46, 41, 78, 0.02), 0px 4px 8px rgba(46, 41, 78, 0.08);
    }

    .upload-desc {
        background: #F6F8F9;
        border-radius: 8px;
    }

    input[type="checkbox"]:after {
        border: 1px solid #c4bdbd !important;
    }
    input[type="checkbox"]:checked:after {
        background-color: #ff0000 !important;
    } 
</style>