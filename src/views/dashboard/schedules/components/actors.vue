<template>
    <div class="container-fluid flex">
        <span v-for="(actor, index) in items" :key="index">
            <div class="image-con rounded-full border flex items-center justify-center" v-if="actor.image">
                <img :src="actor.image" class="rounded-full" style="width: 100%;height:100%" :alt="actor.name">
            </div>
            <div v-else class="image-con rounded-full -ml-3 flex items-center border justify-center bg-white">
                <span class="text-warning">{{ actor.firstName ? actor.firstName[0] : '' }} </span>
                <span class="text-warning">{{ actor.lastName ? actor.lastName[0] : '' }} </span>
            </div>
        </span>
    </div>
</template>

<script lang="ts">
import IPractitioner from "@/types/IPractitioner";
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";


export default class ActorsList extends Vue {
    @Prop()
    items!: IPractitioner[];

    get actors() {
        if (!this.items || this.items.length === 0) return [ ];
        if (this.items.length <= 3) return this.items;
        return this.items.slice(0, 3);
    }
}
</script>

<style scoped>
.image-con {
    width: 32px;
    height: 32px;
}
</style>