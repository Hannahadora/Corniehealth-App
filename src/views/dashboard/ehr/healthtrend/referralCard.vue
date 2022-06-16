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
    height="337px"
    :title="'Referrals'"
    :count="items.length"
    @add="() => (showModal = true)"
    @view:all="() => $router.push({ name: 'Referrals' })"
  >
  <template #empty>
      <div
      class="flex flex-col items-center justify-center my-auto"
      v-if="items?.length === 0"
    >
      <img class="mb-3" src="@/assets/img/no-referral.svg" alt="" />
      <p class="text-sm text-center" style="color: #667499">No Referrals</p>
    </div>
    </template>
   
    <div>
      <div class="w-full p-2 border-b" v-for="(item, index) in items" :key="index">
        <div class="w-full">
          <div class="text-xs flex flex-col">
            <div class="w-full flex items-start">
              <div class="w-2/12 flex flex-col items-cneter justify-center mr-4">
                <img :src="performerImage" alt="" class="w-10 h-10 rounded-full">
              </div>
              <div class="w-9/12">
                <div class="w-full">
                  <span class="header">
                    {{ item.performerName }}
                  </span>
                </div>
                <div class="w-full">
                  <!-- <span class="subtext">
                    <h5>{{ item.performerSpecialty }}</h5></span
                  > -->
                  <span class="subtext">
                    <h5>{{ item.date }}</h5></span
                  >
                  <span class="text-primary text-sm font-bold">
                    <h5>{{ item.intent }}</h5></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </detail-card>
</template>
<script lang="ts">
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import DetailCard from "./detail-card.vue";
import AddIcon from "@/components/icons/add.vue";

import SideModal from "@/views/dashboard/schedules/components/side-modal.vue";
import NewProcedure from "@/views/dashboard/ehr/procedures/components/new-procedure2.vue";
import { sortListByDate } from "./chart-filter";

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
  @Prop({ type: Array, default: () => [] })
  referrals!: any[];

  get items() {
    const items = this.referrals?.map((referral: any) => ({
      date: new Date(referral.date).toLocaleString('en-US'),
      intent: referral.intent,
      performerName: referral.performer?.name,
      performerSpecialty: referral.performer?.specialty,
      performerImage: referral.performer?.image,
    }));

    return items || [];
  }

  async created() {}
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
