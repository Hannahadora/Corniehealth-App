<template>
    <div class="container-fluid px-3">
        <div class="w-full">
            <div class="w-full my-3">
                <cornie-select :label="'Purchase UOM'" style="width:100%" :items="['Option 1']" />
            </div>
            
            <div class="w-full my-4">
                <cornie-input :label="'Item Quantity/Purchase UOM'" style="width:100%" />
            </div>

            <div class="w-full my-4">
                <cornie-select :label="'Inventory UOM'" style="width:100%" :items="['Option 1']" />
            </div>

            <div class="w-full my-4">
                <cornie-input :label="'Item Quantity/Inventory UOM'" style="width:100%" />
            </div>

            <div class="w-full my-4">
                <cornie-select :label="'Sales UOM'" style="width:100%" :items="['Option 1']" />
            </div>

            <div class="w-full my-4">
                <cornie-input :label="'Item Quantity/Sales UOM'" style="width:100%" />
            </div>
        </div>

        <span class="w-full bg-danger">
            <span class="flex justify-end w-full m4-5">
                <cornie-btn
                class="m-5 font-semibold rounded-full"
                style="color: #080056;border: 1px solid #080056"
                >
                Cancel
                </cornie-btn>

                <cornie-btn
                class="bg-danger px-2 text-white my-5 mx-4  font-semibold rounded-full"
                >
                Save
                </cornie-btn>
            </span>
        </span>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CornieSelect from "@/components/cornieselect.vue"
import CornieInput from "@/components/cornieinput.vue"
import AddIcon from "@/components/icons/add-orange.vue"

@Options({
    components: {
        CornieSelect,
        CornieInput,
        AddIcon,
    }
})
export default class StockMeasurement extends Vue {

}
</script>

<style scoped>

    
</style>
