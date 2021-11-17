<template>
    <div class="container-fluid p-2 h-screen overflow-y-scroll">
        <div class="w-full">
            <div class="w-full p-2 stock">
                <collapse-section :title="'New Product'" :height="400">
                     <template #form>
                         <div class="w-full mb-5">
                             <p class="v-xteristics mb-4">Select Product Type</p>
                             <div class="my-2 flex">
                                 <span><cornieradio :label="'Medication Product'" /> </span>
                                 <span class="ml-8"><cornieradio :label="'Other Health Product'" /> </span>
                             </div>
                         </div>

                        <div class="w-full flex items-center  my-4">
                            <div class="w-4/12">
                                <cornie-select :label="'Category'" />
                            </div>
                            <div class="w-4/12">
                                <cornie-select :label="'Generic Name'" />
                            </div>
                            <div class="w-4/12">
                                <cornie-select :label="'Brand/Manufacturer'" />
                            </div>
                        </div>
                        <div class="w-full flex items-center my-4">
                            <div class="w-4/12">
                                <cornie-input :label="'Ingrdient'" placeholder="--Autoloaded--" />
                            </div>
                            <div class="w-4/12">
                                <p class="flex capitalize mb-5 text-black text-sm font-semibold">Ingredient Status</p>
                                <div class="flex items-end -mb-2">
                                    <span class="mr-14"><cornieradio :label="'Active'" /></span>
                                    <cornieradio :label="'Inactive'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <cornie-input :label="'Description'" placeholder="Enter" />
                            </div>
                        </div>
                        <div class="w-full flex items-center mt-8 mb-4">
                            <div class="w-4/12">
                                <cornie-input :label="'NAFDAC Registration No.'" placeholder="--Autoloaded--" />
                            </div>
                            <div class="w-4/12">
                                
                            </div>
                            <div class="w-4/12">
                                
                            </div>
                        </div>

                        <div class="w-full my-6">
                            <a class="v-xteristics flex">
                                <span class="mr-3"><add-icon /> </span>
                                <span>Variant Characteristics</span>
                            </a>
                        </div>
                    </template>
                </collapse-section>
            </div>

            <div class="w-full my-5">
                <div class="stock py-6">
                    <p class="flex justify-between px-2 sub-header">
                        <span>Stock Unit of Measurement (UoM)</span>
                        <span><add-icon /></span>
                    </p>
                </div>
            </div>

            <div class="w-full stock p-2">
                <collapse-section :title="'Cost Information'" :height="250">
                    <template #form>
                        <div class="w-full mb-7 mt-5">
                            <div class="mb-2 flex">
                                 <span><cornieradio :label="'Medication Product'" /> </span>
                                 <span class="ml-8"><cornieradio :label="'Other Health Product'" /> </span>
                             </div>
                        </div>
                        <div class="w-full">
                            <div class="w-full">
                                <div class="w-full flex ths py-4">
                                    
                                    <div class="th py-4  flex items-center">
                                        <span>UOM</span>
                                    </div>
                                    <div class="th py-4  flex items-center">
                                        <span>item quantity/unit</span>
                                    </div>
                                    <div class="th py-4  flex items-center">
                                        <span>Unit Cost</span>
                                    </div>
                                    <div class="th py-4  flex items-center">
                                        <span>Available QTY</span>
                                    </div>
                                    <div class="th py-4  flex items-center">
                                        <span>% availability</span>
                                    </div>
                                    <div class="th py-4  flex items-center">
                                        <span>weighted av. cost</span>
                                    </div>

                                </div>
                                <div class="w-full flex tbs py- mb-3">
                                    
                                    <div class="th flex items-center">
                                        <span>Carton</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span>90</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span><cornie-input /></span>
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

                                </div>
                            </div>
                        </div>
                    </template>
                </collapse-section>
            </div>

            <div class="w-full stock p-2 my-5">
                <collapse-section :title="'Sales Information'" :height="450">
                    <template #form>
                        <div class="w-full my-6 flex justify-between">
                            <div class="w-4/12 p-4" style="border: 1px solid #C2C7D6;border-radius: 8px;width:32%">
                                <p class="flex flex-col">
                                    <span class="sales-label">Sales Information</span>
                                    <span class="sales-value">--Autoloaded--</span>
                                </p>
                            </div>
                            <div class="w-4/12 p-4" style="border: 1px solid #C2C7D6;border-radius: 8px;width:32%">
                                <p class="flex flex-col">
                                    <span class="sales-label">Sales Information</span>
                                    <span class="sales-value">--Autoloaded--</span>
                                </p>
                            </div>
                            <div class="w-4/12 p-4" style="border: 1px solid #C2C7D6;border-radius: 8px;width:32%">
                                <p class="flex flex-col">
                                    <span class="sales-label">Sales Information</span>
                                    <span class="sales-value">--Autoloaded--</span>
                                </p>
                            </div>
                        </div>
                        <div class="w-full">
                            <div class="w-full overflow-x-scroll">
                                <div class="w-full flex ths py-2"  style="width:fit-content">
                                    <div class="th  flex items-center">
                                        <span>Sales Unit</span>
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
                                <div class="w-full flex tbs py-2" style="width:fit-content">
                                    <div class="th flex items-center">
                                        <span class="small-text">Carton</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text">900</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text">₦ 120,000.00</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text"><cornie-input /></span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text">₦ 240,000.00</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text">₦ 240,000.00</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text">50%</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text"><cornie-input /></span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text">₦ 216,000.00</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text"> ₦ 86,000.00</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text">43%</span>
                                    </div>
                                </div>
                                <div class="w-full flex tbs py-2" style="width:fit-content">
                                    <div class="th flex items-center">
                                        <span class="small-text">Carton</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text">900</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text">₦ 120,000.00</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text"><cornie-input /></span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text">₦ 240,000.00</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text">₦ 240,000.00</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text">50%</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text"><cornie-input /></span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text">₦ 216,000.00</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text"> ₦ 86,000.00</span>
                                    </div>
                                    <div class="th flex items-center">
                                        <span class="small-text">43%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="w-full my-5">
                            <a class="v-xteristics">Tax Information</a>
                            <span class=" flex mt-4">
                                <span ><cornie-checkbox /></span>
                                <span class="ml-" style="color: #14171F;font-size:14px">Apply VAT to this product item</span>
                            </span>
                        </div>
                    </template>
                </collapse-section>
            </div>
        </div>

        <div style="height: 400px">

        </div>
    </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import CollapseSection from "@/views/dashboard/settings/kyc/components/collapse-section.vue"
import CornieInput from "@/components/cornieinput.vue"
import CornieSelect from "@/components/cornieselect.vue";
import CornieRadio from "@/components/cornieradio.vue"
import Cornieradio from '@/views/dashboard/ehr/progressnotes/cornieradio.vue';
import AddIcon from "@/components/icons/add-orange.vue"
import CornieCheckbox from "@/components/corniecheckbox.vue";

@Options({
    components: {
        CollapseSection,
        CornieInput,
        CornieSelect,
        CornieRadio,
        Cornieradio,
        AddIcon,
        CornieCheckbox,
    }
})
export default class NewProuct extends Vue {
    
}
</script>

<style scoped>
    .v-xteristics {
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        color: #FE4D3C;
    }

    .stock {
        background: #FFFFFF;
        /* Buttons & Cards */
        box-shadow: 0px 1px 2px rgba(46, 41, 78, 0.02), 0px 4px 8px rgba(46, 41, 78, 0.08);
        border-radius: 8px;
    }

    .sub-header {
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 22px;
        color: #14171F;
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
        width: 16.6%;
        padding: 0.55rem 0.25rem;
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

    .small-text {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        color: #14171F;
    }

    .sales-value {
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 27px;
        color: #141F15;
    }

    .sales-label {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        color: #667499;
    }
</style>
