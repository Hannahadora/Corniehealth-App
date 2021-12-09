<template>
  <div class="container-fluid">
    <div class="w-full">
      <div class="w-full" v-if="items?.length > 0">
        <div
          class="w-full flex items-center my-2 cursor-pointer p-2"
          @click="selectItem(item)"
          v-for="(item, index) in items"
          :key="index"
        >
          <div class="w-1/12" style="max-width: 90px">
            <Avatar :src="item?.image" />
          </div>
          <div class="w-11/12 ml-2">
            <p class="flex flex-col items-start justify-start">
              <span class="main-text" style="color: #14171f">{{
                item?.name
              }}</span>
              <span class="subtext job-text">{{ item?.job }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import IAppointment from "@/types/IAppointment";
import { Vue } from "vue-class-component";
import { namespace } from "vuex-class";

const appointment = namespace("appointment");

export default class AppointmentList extends Vue {
  @appointment.State
  patientappointments!: IAppointment[];

  @appointment.Action
  fetchByIdAppointments!: (patientId: string) => Promise<void>;

  get items() {
    if (this.patientappointments?.length <= 0) return [];
    return this.patientappointments
      ?.filter((app) => app)
      .map((app) => {
        return {
          id: app?.id,
          name: app?.description,
          job: app.specialty,
          image: "",
        };
      });
  }

  selectItem(item: any) {
    this.$emit("selected", item);
    console.log(item, "ITEM");
  }

  async created() {
    await this.fetchByIdAppointments(this.$route.params.id.toString());
    console.log(this.patientappointments, "PATientAPPs");
  }
}
</script>
<style scoped>
.main-text {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 140% */

  /* Blacks/Jet */

  color: #14171f;
}

.job-text {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 19px;
  /* identical to box height, or 160% */

  /* Greys/Blue Yonder */

  color: #667499;
}
</style>
