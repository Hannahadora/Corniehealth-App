<template>
    <div class="container-fluid p-4 bg-white overflow-y-scroll">
        <div class="w-full">
             <div class="w-full" style="border-bottom: 1px solid #C2C7D6;">
                <span
                class="
                    flex flex-col
                    w-full
                    justify-center
                    font-bold
                    text-xl text-primary
                    py-2
                "
                >
                New Service
                </span>
                <!-- <registration-chart class="w-full" :height="100" /> -->
                
            </div>

            <div class="container">
                <span class="flex items-center my-6">
                    <avatar class="mr-2" v-if="img.url" :src="img.url" />
                    <avatar class="mr-2 h-20 w-20" v-else :src="img.placeholder" />
                    <input
                        type="file"
                        accept="image/*"
                        name="image"
                        id="file"
                        @change="img.onChange"
                        hidden
                    />
                    <label for="file" class="text-pink-600 font-bold cursor-pointer">
                        Upload
                    </label>
                </span>
            </div>

            <div class="w-full flex">
                <div class="w-4/12">
                    <cornie-select :label="'Category'" :items="[ 'Category 1' ]" />
                </div>
                <div class="w-4/12">
                    <cornie-select :label="'Sub-Category'" :items="[ 'Sub-Category 1' ]" />
                </div>
                <div class="w-4/12">
                    <cornie-select :label="'Service Name'" :items="[ 'Specialist Consultation', 'General Consultation', 'Biopsy' ]" />
                </div>
            </div>

            <div class="w-full flex">
                <div class="w-4/12">
                    <cornie-input :label="'Description'" />
                </div>
                <div class="w-4/12">
                    <cornie-input :label="'Item Code'" :disabled="true" placeholder="--DNS Generated" />
                </div>
                <div class="w-4/12">
                    <div class="w-11/12 -mt-5">
                        <combo-input :label="'Service UoM'"  >
                            <template #list>
                                <cornie-select :items="[ 'Option 1']" style="width: 100%;border-radius: 8px 0 0 8px" />
                            </template>
                            <template #input>
                                <input-with-desc :info="'mmHg'">
                                    <input type="text" class="p-2 border w-100 w-full" style="border-radius: 0 8px 8px 0">
                                </input-with-desc>
                            </template>
                        </combo-input>
                    </div>
                </div>
            </div>

            <div class="w-full py-4">
                <p class="sub-headers">Fee Information</p>
            </div>

            
            <div class="w-full flex">
                <div class="w-4/12">
                    <cornie-input :label="'Service Cost (NGN)'" />
                </div>
                <div class="w-4/12">
                    <cornie-input :label="'Free Markup'" :disabled="true" placeholder="--Autoloaded--" />
                </div>
                <div class="w-4/12">
                    <cornie-input :label="'Discount Limit'" :disabled="true" placeholder="--Autoloaded--" />
                </div>
            </div>

            <div class="w-full my-8 py-4">
                <div class="w-full overflow-x-scroll">
                    <div class="w-full flex ths py-2"  style="width:fit-content">
                        <div class="th  flex items-center">
                            <span>unit of Service</span>
                        </div>
                        <div class="th  flex items-center">
                            <span>QTY</span>
                        </div>
                        <div class="th  flex items-center">
                            <span>service cost</span>
                        </div>
                        <div class="th  flex items-center">
                            <span>Fee markup</span>
                        </div>
                        <div class="th  flex items-center">
                            <span>Service fee</span>
                        </div>
                        <div class="th  flex items-center">
                            <span>margin (ngn)</span>
                        </div>
                        <div class="th  flex items-center">
                            <span>margin (%)</span>
                        </div>
                        <div class="th  flex items-center">
                            <span>discount limit</span>
                        </div>
                        <div class="th  flex items-center">
                            <span>Service fee (discounted)</span>
                        </div>
                        <div class="th  flex items-center">
                            <span>DISCOUNTED margin (ngn)</span>
                        </div>
                        <div class="th  flex items-center">
                            <span>DISCOUNTED margin(%)</span>
                        </div>
                    </div>
                    <div class="w-full flex tbs py-3 mb-3" style="width:fit-content">
                        <div class="th flex items-center">
                            <span>Hour</span>
                        </div>
                        <div class="th flex items-center">
                            <span>1</span>
                        </div>
                        <div class="th flex items-center">
                            <span>Autoloaded</span>
                        </div>
                        <div class="th flex items-center">
                            <span><cornie-input /></span>
                        </div>
                        <div class="th flex items-center">
                            <span>Autoloaded</span>
                        </div>
                        <div class="th flex items-center">
                            <span>Autoloaded</span>
                        </div>
                        <div class="th flex items-center">
                            <span>Autoloaded</span>
                        </div>
                        <div class="th flex items-center">
                            <span><cornie-input /></span>
                        </div>
                        <div class="th flex items-center">
                            <span>Autoloaded</span>
                        </div>
                        <div class="th flex items-center">
                            <span>Autoloaded</span>
                        </div>
                        <div class="th flex items-center">
                            <span>Autoloaded</span>
                        </div>
                    </div>
                </div>
            </div>

            
            <div class="w-full py-4">
                <p class="sub-headers">Tax Information</p>
            </div>

            <div class="w-full my-8">
                <div class="w-full flex">
                    <span>
                        <cornie-checkbox />
                    </span>
                    <span class="mx-3">Apply VAT to this service item</span>
                </div>
            </div>

            <div class="w-full">
                <span class="w-full bg-danger">
                    <span class="flex justify-end w-full my-5">
                        <cornie-btn
                        class="m-5 p-2 px-12 font-semibold"
                        style="color: #080056;border: 1px solid #080056"
                        >
                        Cancel
                        </cornie-btn>

                        <cornie-btn
                        class="bg-danger px-10 text-white my-5 mx-4 p-2 font-semibold"
                        >
                        Save
                        </cornie-btn>
                    </span>
                </span>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from 'vue-class-component';
import Avatar from "@/components/avatar.vue"
import { useHandleImage } from "@/composables/useHandleImage";
import CornieSelect from "@/components/cornieselect.vue"
import CornieInput from "@/components/cornieinput.vue"
import ComboInput from "@/views/dashboard/ehr/vitals/components/split-input.vue"
import CornieCheckbox from "@/components/corniecheckbox.vue"

@Options({
    components: {
        Avatar,
        CornieSelect,
        CornieInput,
        ComboInput,
        CornieCheckbox,
    }
})
export default class NwService extends Vue {
    img = setup(() => useHandleImage());
}
</script>

<style scoped>
    .sub-headers {
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 24px;
        color: #FE4D3C;
    }

    .th {
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        line-height: 19px;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        color: #080056;
        min-width: 120px;
        padding: .25rem;
    }

    .ths {
        background: #F0F4FE;
        border-radius: 8px 8px 0px 0px;
        padding: .25rem;
    }

    .tbs {
        background: #FFFFFF;
        border: 1px solid #C2C7D6;
        box-sizing: border-box;
        border-radius: 0px 0px 8px 8px;
    }
</style>
