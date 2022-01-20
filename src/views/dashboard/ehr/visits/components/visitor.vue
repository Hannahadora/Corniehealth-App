<template>
  <div class="w-full mb-5">
    <div class="w-full">
      <div class="container-fluid pb-2">
        <div class="w-5/12 flex items-center">
          <div
            class="w-1/12 rounded-full"
            style="max-height: 60px; max-width: 40px"
          >
            <!-- <img v-if="patient && patient.image" src="https://via.placeholder.com/40x40" class="rounded-full w-full" alt="Image"> -->
            <!-- <img v-else src="https://via.placeholder.com/40x40" class="rounded-full w-full" alt="Image"> -->
            <Avatar
              v-if="patient?.practitioner?.image"
              :src="patient?.practitioner?.image"
            />
            <Avatar
              v-else
              :src="`https://via.placeholder.com/40x40`"
              class="w-full"
            />
          </div>
          <div class="w-11/12 ml-2">
            <div class="w-full mb-1">
              <p class="font-semibold text-sm mb-0">
                {{ patient?.practitioner?.firstName }}
                {{ patient?.practitioner?.lastName }}
              </p>
            </div>
            <div class="w-full">
              <span class="flex items-center text-sm">
                <span class="uppercase text-success"
                  >Appointment Time
                  {{
                    appointment?.duration?.split("-")[0]?.substring(0, 5)
                  }}</span
                >
                <span class="uppercase text-success mx-3">|</span>
                <span class="uppercase text-success">Queue #03</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import Avatar from "@/components/avatar.vue";

const patientsStore = namespace("visits");
const appointment = namespace("appointment");

@Options({
  components: {
    Avatar,
  },
})
export default class CheckIn extends Vue {
  @patientsStore.State
  patients!: any[];

  @patientsStore.Action
  getPatients!: () => Promise<void>;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop()
  appointment!: any;

  get patient() {
    if (!this.appointment?.id) return {};
    return this.appointment?.Practitioners[0] ?? {};
  }

  async created() {
    if (this.patients?.length === 0) await this.getPatients();
  }
}
</script>
<style></style>
