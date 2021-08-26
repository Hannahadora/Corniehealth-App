<template>
    <div class="container-fluid">
        <div class="w-full px-2">
            <div>
                <p class="text-base text-gray-500 my-3">
                    Search actor/practitioner name to add to this schedule
                </p>
                <div class="w-full">
                    <div class="w-full pb-2" style="border-bottom: 1px dashed #C2C7D6;">
                        <SearchBox :items="actors">
                            <template #item="data">
                                <p class="my-2 flex justify-between">
                                    <span>{{ data.item.display }}</span>
                                    <span @click="addActor(data.item)" class="text-danger font-semibold text-lg cursor-pointer">Add</span>
                                </p>
                            </template>
                        </SearchBox>
                    </div>
                    <div class="container flex flex-col mt-4">
                        <div class="w-full">
                            <p class="font-semibold text-base">Actors currently associated with this schedule</p>
                        </div>
                        <div class="w-full flex items-center my-2" v-for="(person, index) in persons" :key="index">
                            <div class="w-2/12">
                            <img v-if="person.image" :src="person.image" class="rounded-full border" alt="Image">
                            <img v-else src="https://via.placeholder.com/40x40" class="rounded-full border" alt="Image">
                            </div>
                            <div class="w-10/12 ml-2">
                            <span class=" flex justify-between">
                                <span class="text-base text-gray-500">{{ person.firstName }} {{ person.lastName ?? '' }}</span>
                                <span class="text-danger font-semibold" @click="removeActor(person)"><a  class="text-warning"><DeleteIcon /></a></span>
                            </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-full flex justify-end mt-6">
                    <corniebtn class="bg-danger p-2 px-8 rounded-full text-white" @click="$emit('close')">
                        <span>Close</span>
                    </corniebtn>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import { Prop } from "vue-property-decorator";
import DeleteIcon from "@/components/icons/delete.vue";
import SearchBox from "./search-box.vue";
import { namespace } from 'vuex-class';

const schedules = namespace('schedules');

@Options({
    components: {
        IconInput,
        SearchIcon,
        DeleteIcon,
        SearchBox,
    }
})

export default class AllActors extends Vue {
    search = '';
    data: any;

    @schedules.Action
    removePractitioner!: (reqData: any) => Promise<boolean>;

    @schedules.Action
    addPractitioner!: (reqData: any) => Promise<boolean>;

    @Prop()
    schedule!: any;

    @Prop()
    actors!: any;

    actorSelected(actor: any) {
        this.$emit('actoradded', { id: actor.code, firstName: actor.display })
    }

    get persons() {
        if (!this.schedule || !this.schedule.practitioners || this.schedule.practitioners.length === 0) return [ ];
        return this.schedule.practitioners;
    }

    async addActor(actor: any) {
        try {
            const removed = await this.addPractitioner({ id: this.schedule.id, body: [ actor.code ]})
            if (removed) {
                window.notify({ msg: "Actor added successfully", status: "success" });
                this.$emit('actoradded', { id: actor.code, firstName: actor.display, scheduleId: this.schedule.id, image: actor.image })
            } else {
                window.notify({ msg: "Actor could not be added", status: "error" });
            }
        } catch (error) {
            console.log(error);
        }
    }

    async removeActor(actor: any) {
        const confirmed = await window.confirmAction({
            message: "Are you sure you want to remove this actor?",
        });
        if (!confirmed) return;
        try {
            const removed = await this.removePractitioner({ id: this.schedule.id, body: [ actor.id ]})
            if (removed) {
                window.notify({ msg: "Actor removed successfully", status: "success" });
            } else {
                window.notify({ msg: "Actor could not be removed", status: "error" });
            }
        } catch (error) {
            console.log(error);
        }
    }
}
</script>


