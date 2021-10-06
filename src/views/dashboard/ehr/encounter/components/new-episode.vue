<template>
    <div class="container-fluid py-5 px-4 bg-white">
        <div class="w-full p-2 main-box relative">
            <div class="text-gray-400">All fields are required</div>

            <div class="w-full flex items-center my-3">
                <div class="w-6/12">
                    <cornie-select :label="'Status'"  :items="['Ative', 'Inactive' ]"/>
                </div>
                <div class="w-6/12 -mt-3">
                    <cornie-input :label="'Encounter Id'" />
                </div>
            </div>

            <div class="w-full flex items-center my-3">
                <div class="w-6/12">
                    <cornie-select :label="'Type'"  :items="['Ative', 'Inactive' ]"/>
                </div>
                <div class="w-6/12 -mt-3">
                    <cornie-select :label="'Role'"  :items="['Ative', 'Inactive' ]"/>
                </div>
            </div>

            <div class="w-full mt-12 absolute bottom-0">
              <div class="w-full pb-8 flex flex justify-end">
                <corniebtn class="p-2 rounded-full px-8 mx-4 cursor-pointer flex items-center" style="border: 1px solid #080056;">
                    <span class="font-semibold text-primary-500" @click="() => $emit('closesidemodal')">Cancel</span>
                </corniebtn>

                <CornieBtn :loading="false" class="bg-red-500 p-2 rounded-full px-8 mx-4">
                    <span class="text-white font-semibold">Save</span>
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

@Options({
    components: {
        CornieSelect,
        CornieInput,
    }
})
export default class NewEpisode extends Vue {
    
}
</script>

<style scoped>
.main-box {
    min-height: 400px;
    height: 80vh;
}
</style>