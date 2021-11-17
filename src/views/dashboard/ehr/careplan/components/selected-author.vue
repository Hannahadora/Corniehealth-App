<template>
    <div class="container-fluid">
        <div class="w-full px-2">
            <p class="name">{{ title }}</p>
        </div>
        <div class="w-full flex">
            <div class="w-2/12">
                <div class="w-full p-2">
                    <Avatar :src="selectedAuthor?.image" />
                </div>
            </div>
            <div class="w-10/12 p-2">
                <p class=" normal">{{ selectedAuthor?.name }}</p>
                <p class="job">{{ selectedAuthor?.job }} </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Avatar from "@/components/avatar.vue"
import { Prop } from 'vue-property-decorator';

@Options({
    components: {
        Avatar,
    }
})
export default class Author extends Vue {
    @Prop({type: String, default: ''})
    title!: string;

    @Prop()
    selectedAuthor!: any;
}
</script>

<style scoped>
.normal {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    /* identical to box height, or 150% */


    /* Blacks/Jet */

    color: #14171F;
}

.job {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 16px;
    /* identical to box height, or 160% */

    letter-spacing: 0.02em;

    /* Greys/Blue Yonder */

    color: #667499;
}

.name {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    /* identical to box height, or 150% */


    /* Primary/Razzmataz */

    color: #FE4D3C;
}
</style>
