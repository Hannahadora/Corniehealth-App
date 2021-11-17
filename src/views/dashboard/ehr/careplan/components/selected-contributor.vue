<template>
    <div class="container-fluid px-2">
        <div class="w-full flex box">
            <div class="w-10/12">
                <selected-author :selectedAuthor="selectedContributor" :title="'Contributor'" />
            </div>
            <div class="w-2/12 flex items-center">
                <div class="w-full p-3 mr-2 flex items-center justify-center" style="background: #F6F8F9">
                    <span class="cursor-pointer" @click="() => $emit('remove')"><delete-icon /></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SelectedAuthor from "./selected-author.vue"
import DeleteIcon from "@/components/icons/deleteorange.vue"
import { Prop } from 'vue-property-decorator';

@Options({
    components: {
        SelectedAuthor,
        DeleteIcon,
    }
})
export default class Contributor extends Vue {
    @Prop()
    selectedContributor!: any;
}
</script>

<style scoped>
    .box {
        background: #FFFFFF;
        /* Buttons & Cards */

        box-shadow: 0px 1px 2px rgba(46, 41, 78, 0.02), 0px 4px 8px rgba(46, 41, 78, 0.08);
        border-radius: 8px;
    }
</style>
