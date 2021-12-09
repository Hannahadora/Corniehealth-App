<template>
  <!-- <div
    class="
      flex-col
      justify-center
      bg-white
      shadow-md
      p-3
      mt-2
      mb-2
      rounded
      w-full
    "
    style="height:313px"
  > -->
  <detail-card
    :title="'Recent Procedures'"
    :count="items.length"
    @add="() => (showModal = true)"
    @view:all="() => $router.push({ name: 'Procedures' })"
  >
    <div class="w-full" v-for="(item, index) in items" :key="index">
      <div class="w-full">
        <div class="text-xs flex flex-col">
          <div class="w-full flex items-start">
            <div class="w-2/12 flex flex-col items-cneter justify-center">
              <p class="flex items-center">
                <span class="number-box flex items-center justify-center">{{
                  index + 1
                }}</span>
              </p>
              <div
                class="w-full flex items-center justify-center my-2"
                :class="{ 'my-4': item.reasonCode?.length > 20 }"
                v-if="index !== items.length - 1"
              >
                <span
                  style="height: 30px; border: 1px dashed #667499"
                  :style="{
                    height: item.reasonCode?.length > 20 ? '45px' : '30px',
                  }"
                  class="-ml-2"
                ></span>
              </div>
            </div>
            <div class="w-9/12">
              <div class="w-full">
                <span class="header">
                  {{ item.reasonCode }}
                </span>
              </div>
              <div class="w-full">
                <span class="subtext">
                  <h5>{{ item.actor }}</h5></span
                >
                <span class="subtext">
                  <h5>{{ item.date }}</h5></span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </detail-card>
  <!-- <div class="w-full p-2">
      <span
        class="flex w-full justify-between mb-5 text-xs text-gray-400 py-2"
      >
        <span class="text-primary font-bold text-sm">Recent Procedures <span class="text-danger">({{ items.length }})</span></span>
        <div class="flex items-center">
            <span class="cursor-pointer" @click="() => showModal = true"><add-icon/></span>
        </div>
      </span>
      <div class="w-full grid grid-cols-1 gap-y-2">
        <div class="w-full" v-for="(item, index) in items" :key="index">
          <div class="w-full">
            <div class="text-xs flex flex-col">
              <div class="w-full flex items-start">
                <div class="w-2/12 flex flex-col items-cneter justify-center">
                  <p class="flex items-center">
                    <span class="number-box flex items-center justify-center">{{ index + 1 }}</span>
                  </p>
                  <div class="w-full flex items-center justify-center" v-if="index !== (items.length -1)">
                    <span style="height:37px;border: 1px dashed #667499;"></span>
                  </div>
                </div>
                <div class="w-9/12">
                  <div class="w-full">
                    <span class="header">
                      {{ item.reasonCode }}
                    </span>
                  </div>
                  <div class="w-full">
                    <span class="subtext"> <h5> {{ item.actor }}</h5></span>
                    <span class="subtext"> <h5> {{ item.date }} </h5></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full flex justify-end pb-2 mt-10">
          <div class="text-xs text-danger font-semibold">
            <router-link class="cursor-pointer" :to="{ name: 'Procedures' }">
              View all
            </router-link>
          </div>
        </div>
    </div>
    </div> -->

  <side-modal
    :visible="showModal"
    :header="'New Procedure'"
    :width="990"
    @closesidemodal="() => (showModal = false)"
  >
    <div class="w-full px-4">
      <new-procedure @closesidemodal="closeModal" />
    </div>
  </side-modal>

  <!-- </div> -->
</template>
<script lang="ts">
import IProcedure from "@/types/IProcedure";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import DetailCard from "./detail-card.vue";
import AddIcon from "@/components/icons/add.vue";

import SideModal from "@/views/dashboard/schedules/components/side-modal.vue";
import NewProcedure from "@/views/dashboard/ehr/procedures/components/new-procedure.vue";
import { sortListByDate } from "./chart-filter";
import { Watch } from "vue-property-decorator";

const procedure = namespace("procedure");

@Options({
  name: "ProcedureCard",
  components: {
    DetailCard,
    AddIcon,
    NewProcedure,
    SideModal,
  },
})
export default class ProcedureCard extends Vue {
  @procedure.State
  procedures!: IProcedure[];

  @procedure.Action
  getProcedures!: (patientId: string) => Promise<void>;

  closeModal() {
    this.showModal = false;
    this.items;
    this.getProcedures(this.$route.params.id.toString());
  }

  showModal = false;

  get items() {
    if (this.procedures?.length === 0) return [];
    const datedList = this.procedures.map((procedure) => {
      return {
        ...procedure,
        date: procedure.performedDate,
      };
    });
    if (this.procedures.length > 2)
      return sortListByDate(datedList)
        .slice(0, 2)
        ?.map((procedure) => {
          return {
            actor: `${procedure.actor?.firstName} ${procedure.actor?.lastName}`,
            reasonCode: procedure.reasonCode,
            date: `${new Date(
              procedure.performedDate
            ).toLocaleDateString()}, ${new Date(procedure.performedDate)
              .toTimeString()
              .substring(0, 5)}`,
          };
        });

    return sortListByDate(datedList).map((procedure) => {
      return {
        actor: `${procedure.actor?.firstName} ${procedure.actor?.lastName}`,
        reasonCode: procedure.reasonCode,
        date: `${new Date(
          procedure.performedDate
        ).toLocaleDateString()}, ${new Date(procedure.performedDate)
          .toTimeString()
          .substring(0, 5)}`,
      };
    });
  }

  @Watch("procedures")
  proceduresUpdated() {
    this.items;
  }

  async created() {
    await this.getProcedures(this.$route.params.id.toString());
    console.log(this.procedures, "PROCEDURES");
  }
}
</script>

<style scoped>
.number-box {
  width: 32px;
  height: 32px;
  left: 0px;
  top: 85px;

  /* Whites/cotton ball */

  background: #f0f4fe;
  border-radius: 124px;
}

.subtext {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 19px;
  /* identical to box height, or 160% */

  /* Greys/Blue Yonder */

  color: #667499;
}

.header {
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  /* identical to box height, or 150% */

  /* Primary/Indigo Dye */

  color: #080056;
}
</style>
