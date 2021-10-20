<template>
    <div class="w-full ">
        <div class="w-full">
            <div class="w-full flex items-center">
                <div class="w-1/12 rounded-full">
                    <img v-if="actor && actor.image" src="https://via.placeholder.com/40x40" class="rounded-full w-full" alt="Image">
                    <img v-else src="https://via.placeholder.com/40x40" class="rounded-full w-full" alt="Image">
                </div>
                <div class="w-11/12 rounded-full ml-2">
                    <p class="font-semibold text-sm mb-0">{{ `${actor.firstName ? actor.firstname : ''} ${actor.lastName ? actor.lastName : ''}` }}</p>
                </div>
            </div>
            <div class="w-full mt-2">
                <p class="text-sm mb-0">{{ `${actor.jobDesignation} / ${actor.type}` }}</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { namespace } from 'vuex-class';

const actorsStor = namespace('practitioner');
const appointment = namespace("appointment");


@Options({
  components: {
      
  },
})
export default class CheckIn extends Vue {
    @actorsStor.State
    practitioners!: any[]

    @actorsStor.Action
    fetchPractitioners!: () => Promise<void>;

    @appointment.State
  appointments!: any[];

  @appointment.Action
  fetchAppointments!: () => Promise<void>;

    @Prop({ type: String, default: ''})
    id!: string;

    get actor() {
        if (!this.id) return { };
        return this.practitioners.find((i: any) => i.id === this.id);
    }

    // get appointment() {
    //     if (!this.appointments || this.appointments.length === 0) return { };
    //     return this.appointments.find((i: any) => i.id === this.id)
    // }

    async created() {
        if (!this.practitioners || this.practitioners.length === 0) await this.fetchPractitioners();        
    }

}
</script>
<style>
    
</style>
