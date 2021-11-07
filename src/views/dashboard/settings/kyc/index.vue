<template>
    <div class="container-fluid p-4 bg-white overflow-y-scroll">
        <div class="w-full">
            <div class="w-full py-4" style="border-bottom: 1px solid #C2C7D6">
                <p class="header">KYC</p>
            </div>

            <div class="w-full">
                <form action="">

                    
                    <div class="w-full flex flex-wrap items-center pt-6 pb-8">
                        <p class="normal-text">Is this practice registered?</p>
                        <div class="mx-5 -mb-2">
                            <label class="inline-flex items-center">
                                <input type="radio" class="form-radio h-4 w-4" :value="'planned'" >
                                <span class="ml-2 noraml-text">Yes</span>
                            </label>
                        </div>
                        <div class="mx-5 -mb-2">
                            <label class="inline-flex items-center">
                                <input type="radio" class="form-radio h-4 w-4" :value="'active'" >
                                <span class="ml-2 normal-text">No</span>
                            </label>
                        </div>
                    </div>

                    <div class="w-full section-card px-4 my-6">
                        <collapse-section :title="'Incorporation Details'" :height="200">
                            <template #form>
                                <div class="w-full flex items-center  mb-6">
                                    <div class="w-4/12">
                                        <cornie-input :label="'Incorporated Name'" />
                                    </div>
                                    <div class="w-4/12">
                                        <cornie-input :label="'RC Number'" />
                                    </div>
                                    <div class="w-4/12">
                                        <cornie-input :label="'Certificate of Incorporation'" />
                                    </div>
                                </div>
                                <div class="w-full flex items-center my-6">
                                    <div class="w-4/12">
                                        <cornie-input :label="'Form CAC 1.1'" />
                                    </div>
                                    <div class="w-4/12">
                                        <cornie-input :label="'Memorandum & Articles of Association'" />
                                    </div>
                                    <div class="w-4/12">
                                        <cornie-input :label="'Tax Identification Number'" />
                                    </div>
                                </div>
                            </template>
                        </collapse-section>
                    </div>

                    <div class="w-full section-card px-4 my-6">
                        <collapse-section :title="'Particulars of Directors'" :height="550" :showAdd="true" :showAddExisting="true" :buttonText="'Select existing director'">
                            <template #form>
                                <div class="w-full section-card p-4">
                                    <collapse-section :title="'Director 1'" :height="380" :overflow="true" >
                                        <template #form>
                                            <div class="w-full flex items-center  mb-6">
                                                <div class="w-4/12">
                                                    <cornie-input :label="'Full Name'" />
                                                </div>
                                                <div class="w-4/12">
                                                    <div class="w-11/12">
                                                        <date-picker :label="'Date of Birth'" />
                                                    </div>
                                                </div>
                                                <div class="w-4/12">
                                                    <cornie-input :label="'Nationality'" />
                                                </div>
                                            </div>
                                            
                                            <div class="w-full flex items-center my-6">
                                                <div class="w-4/12">
                                                    <cornie-input :label="'Email Address'" />
                                                </div>
                                                <div class="w-4/12">
                                                    <div class="w-11/12">
                                                        <phone-input :label="'PhoneNumber'" />
                                                    </div>
                                                </div>
                                                <div class="w-4/12">
                                                    <cornie-input :label="'Tax Identification Number'" />
                                                </div>
                                            </div>
                                            <div class="w-full flex items-center  mb-6">
                                                <div class="w-4/12 -mb-4">
                                                    <cornie-select :items="[ 'Doc 1']" :label="'Identification Document'" />
                                                </div>
                                                <div class="w-4/12">
                                                    <cornie-input :label="'Identification Document Number'" />
                                                </div>
                                                <div class="w-4/12">
                                                    <cornie-input :label="'Upload Identitification Document '" />
                                                </div>
                                            </div>
                                            <div class="w-full flex items-center  mb-6">
                                                <div class="w-4/12 -mb-4">
                                                    <cornie-select style="z-index:1000" :items="[ 'Doc 1']" :label="'Practice Licence Document'" />
                                                </div>
                                                <div class="w-4/12">
                                                    <cornie-input :label="'Practice Licence Number'" />
                                                </div>
                                                <div class="w-4/12">
                                                    <cornie-input :label="'Upload Practice Licence Document'" />
                                                </div>
                                            </div>
                                        </template>
                                    </collapse-section>
                                </div>
                            </template>
                        </collapse-section>
                    </div>

                    <div class="w-full section-card px-4 my-6">
                        <collapse-section :title="'Address'" :height="370">
                            <template #form>
                                <div class="w-full flex items-center  mb-6">
                                    <div class="w-4/12 -mb-4">
                                        <cornie-select :items="[ 'Doc 1']" :label="'Country'" />
                                    </div>
                                    <div class="w-4/12 -mb-4">
                                        <cornie-select :items="[ 'Doc 1']" :label="'State of Region'" />
                                    </div>
                                    <div class="w-4/12 -mb-4">
                                        <cornie-select :items="[ 'Doc 1']" :label="'City'" />
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
                                <div class="w-full flex items-start  mb-6">
                                    <div class="w-4/12">
                                        <cornie-input :label="'Please upload a proof of address *'" />
                                    </div>
                                    <div class="w-8/12">
                                        <div class="w-full upload-desc p-3">
                                            <p style="border-bottom: 1px solid #C2C7D6" class="pb-4 mb-3">Proof of address can be any of the listed documents below, not more than 3 months old.</p>
                                            <div class="w-full">
                                                <ul class="pl-4" style="list-style: unset">
                                                    <li class="text-normal" style="color: #14171F">Utility bill for services to the address</li>
                                                    <li class="text-normal" style="color: #14171F">Bank statement showing current address</li>
                                                    <li class="text-normal" style="color: #14171F">Tax assessment document showing address</li>
                                                    <li class="text-normal" style="color: #14171F">Letter from a public authority</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </collapse-section>
                    </div>

                    <div class="w-full section-card px-4 my-6">
                        <collapse-section :title="'Beneficial Owners'" :showAddExisting="true" @add="() => addOwner = true" :showAdd="true" :buttonText="'Select existing dirctor'" :height="150">
                            <template #form>
                                <div class="w-full flex pt-4">
                                    <div class="w-4/12 py-3 px-2" style="border: 1px solid #C2C7D6">
                                        <span class="normal-text">Ademola Emeka</span>
                                    </div>
                                    <div class="w-4/12 py-3 px-2 flex justify-end" style="border: 1px solid #C2C7D6">
                                        10%
                                    </div>
                                    <div class="w-4/12 py-3 px-2 flex justify-end" style="border: 1px solid #C2C7D6">
                                        <span><delete-icon /></span>
                                        <span class="text-sm font-normal mx-2">Delete</span>
                                    </div>
                                </div>
                                <div class="w-full flex">
                                    <div class="w-4/12 py-3 px-2" style="border: 1px solid #C2C7D6">
                                        <span class="normal-text">Ademola Emeka</span>
                                    </div>
                                    <div class="w-4/12 py-3 px-2 flex justify-end" style="border: 1px solid #C2C7D6">
                                        10%
                                    </div>
                                    <div class="w-4/12 py-3 px-2 flex justify-end" style="border: 1px solid #C2C7D6">
                                        <span><delete-icon /></span>
                                        <span class="text-sm font-normal mx-2">Delete</span>
                                    </div>
                                </div>
                            </template>
                        </collapse-section>
                    </div>

                    <div class="w-full section-card px-4 my-6">
                        <collapse-section :title="'Nominate Referees'" @add="() => nominateRefree = true" :showAddExisting="true" :showAdd="true" :buttonText="'Select existing dirctor'" :height="150">
                            <template #form>
                                <div class="w-full flex pt-4">
                                    <div class="w-4/12 py-3 px-2" style="border: 1px solid #C2C7D6">
                                        <span class="normal-text">Ademola Emeka</span>
                                    </div>
                                    <div class="w-4/12 py-3 px-2 flex" style="border: 1px solid #C2C7D6">
                                        test@gmail.com
                                    </div>
                                    <div class="w-4/12 py-3 px-2 flex justify-end" style="border: 1px solid #C2C7D6">
                                        <span><delete-icon /></span>
                                        <span class="text-sm font-normal mx-2">Delete</span>
                                    </div>
                                </div>
                                <div class="w-full flex">
                                    <div class="w-4/12 py-3 px-2" style="border: 1px solid #C2C7D6">
                                        <span class="normal-text">Ademola Emeka</span>
                                    </div>
                                    <div class="w-4/12 py-3 px-2 flex" style="border: 1px solid #C2C7D6">
                                        test@gmail.com
                                    </div>
                                    <div class="w-4/12 py-3 px-2 flex justify-end" style="border: 1px solid #C2C7D6">
                                        <span><delete-icon /></span>
                                        <span class="text-sm font-normal mx-2">Delete</span>
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
import CollapseSection from './components/collapse-section.vue'
import CornieInput from "@/components/cornieinput.vue"
import DatePicker from "@/components/datepicker.vue"
import PhoneInput from "@/components/phone-input.vue"
import CornieSelect from "@/components/autocomplete.vue"
import AutoComplete from "@/components/autocomplete.vue"
import DeleteIcon from "@/components/icons/deleteorange.vue"
import CornieButton from "@/components/CornieBtn.vue"
import Modal from "@/components/modal.vue"
import NominateRefree from "./components/nominate-refrees.vue"
import BeneficialOwner from "./components/beneficial-owner.vue"

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
        NominateRefree,
        BeneficialOwner,
        Modal,
    }
})
export default class KYC extends Vue {
    nominateRefree = false;
    addOwner = false;
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
        font-size: 14px;
        line-height: 21px;
        color: #14171F;
        font-weight: 600;
    }

    .section-card {
        background: #FFFFFF;
        box-shadow: 0px 1px 2px rgba(46, 41, 78, 0.02), 0px 4px 8px rgba(46, 41, 78, 0.08);
    }

    .upload-desc {
        background: #F6F8F9;
        border-radius: 8px;
    }
</style>