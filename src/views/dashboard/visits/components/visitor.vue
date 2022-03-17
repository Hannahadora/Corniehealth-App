<template>
  <div class="w-full mb-5 border-b-2">
    <div class="w-full">
      <div class="container-fluid pb-2">
        <div class="w-full flex items-center">
          <div class="w-1/12 rounded-full">
            <img
              v-if="patient.profilePhoto"
              src="https://via.placeholder.com/40x40"
              class="rounded-full w-full"
              alt="Image"
            />
            <img
              v-else
              :src="localSrc"
              class="rounded-full w-full"
              alt="Image"
            />
          </div>
          <div class="w-11/12 ml-2">
            <div class="w-full">
              <p class="font-semibold text-sm mb-0">
                {{
                  patient
                    ? `${patient.firstname ? patient.firstname : ""} ${
                        patient.lastname ? patient.lastname : ""
                      }`
                    : "Unavailbale"
                }}
              </p>
              <span class="flex items-center text-sm">
                <span class="uppercase text-success">Appointment Time 10:00</span>
                <span class="uppercase text-success mx-3">|</span>
                <span class="uppercase text-success">Queue #03</span>
              </span>
            </div>
          </div>
        </div>
        <div class="w-full">
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";

const patientsStore = namespace("visits");

@Options({
  components: {},
})
export default class CheckIn extends Vue {
  @patientsStore.State
  patients!: any[];

  @patientsStore.Action
  getPatients!: () => Promise<void>;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, default: {} })
  patient!: object;

  localSrc = require("../../../../assets/img/placeholder.png");

  // get patient() {
  //   if (!this.id) return {};
  //   return this.patients.find((i: any) => i.id === this.id);
  // }

  async created() {
    if (!this.patients || this.patients.length === 0) await this.getPatients();
  }
}
</script>
<style></style>
