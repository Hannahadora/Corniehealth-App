<template>
  <div
    class="flex-col justify-center bg-white shadow-md p-3 mt-2 mb-2 rounded w-full"
    style="min-height: 313px"
  >
    <div class="w-full p-2">
      <span class="flex w-full justify-between mb-5 text-xs text-gray-400 py-2">
        <span class="text-primary font-bold text-sm"
          >Patients Visit History</span
        >
        <div class="flex items-center">
          <span class="cursor-pointer relative"
            ><cornie-select
              v-model="option"
              :items="['All', 'Recent']"
              style="border: none; width: 86px"
          /></span>
        </div>
      </span>
      <div
        class="w-full grid grid-cols-1 gap-y-2 -mt-8"
        v-if="itemsList?.length > 0"
      >
        <div
          class="w-full py-2"
          v-for="(item, index) in itemsList"
          :key="index"
          style="border-bottom: 1px solid #ebeff2"
        >
          <div class="w-full flex">
            <div class="w-3/12">
              <p class="condition">{{ item.code }}</p>
            </div>
            <div class="w-3/12">
              <p class="grey-text">{{ item.practitioner }}</p>
            </div>
            <div class="w-3/12">
              <p class="grey-text">{{ item.date }}</p>
            </div>
            <div class="w-3/12 flex justify-end">
              <span
                class="tag flex items-center px-3 py-1"
                :class="{
                  'new-item': item.status?.toLocaleLowerCase() !== 'completed',
                  'bg-success rounded-full':
                    item.status?.toLocaleLowerCase() === 'completed',
                }"
                style="width: fit-content"
              >
                <span>{{
                  item.status?.toLocaleLowerCase() !== "completed"
                    ? "New"
                    : "Done"
                }}</span>
                <span
                  class="ml-2"
                  v-if="item.status?.toLocaleLowerCase() !== 'completed'"
                >
                  <info-icon />
                </span>
                <span class="ml-2" v-else>
                  <check-icon />
                </span>
              </span>
            </div>
          </div>
        </div>

        <div class="w-full flex justify-end pb-2 mt-10">
          <div class="text-xs text-danger font-semibold">
            <!-- <router-link
              class="cursor-pointer"
              :to="{ name: 'Medical | Family History' }"
            >
              View all
            </router-link> -->
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col justify-center items-center" v-else>
        <p class="my-2"><empty-history-icon /></p>
        <p class="grey-text">No patient history</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Ihistory from "@/types/Ihistory";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import DetailCard from "./detail-card.vue";
import InfoIcon from "@/components/icons/info-white-bg.vue";
import IPractitioner from "@/types/IPractitioner";
import { formatFullDate, sortListByDate } from "./chart-filter";
import CheckIcon from "@/components/icons/check-white-bg.vue";
import CornieSelect from "@/components/cornieselect.vue";
import EmptyHistoryIcon from "@/components/icons/empty-history.vue";

const history = namespace("history");
const practitioner = namespace("practitioner");

@Options({
  name: "HistoryCard",
  components: {
    DetailCard,
    InfoIcon,
    CheckIcon,
    CornieSelect,
    EmptyHistoryIcon,
  },
})
export default class HistoryCard extends Vue {
  @history.State
  historys!: Ihistory[];

  @history.Action
  fetchHistorys!: (patientId: string) => Promise<void>;

  @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  option = "Recent";

  get items() {
    const sortedList = sortListByDate(this.historys);
    if (sortedList?.length <= 0) return [];
    return sortedList?.map((history) => {
      const practitioner = this.practitioners?.find(
        (practitioner) => practitioner.id === history.practitionerId
      );
      return {
        code: history.conditionRelatedPerson?.code,
        date: formatFullDate(history.basicInfo?.date),
        practitioner: practitioner
          ? `${practitioner.firstName} ${practitioner.lastName}`
          : "Unknown",
        id: history.id,
        status: history.basicInfo?.status,
      };
    });
  }

  get itemsList() {
    if (this.option === "All") return this.items;
    return this.items?.length > 3 ? this.items?.slice(0, 3) : this.items;
  }

  async created() {
    await this.fetchHistorys(this.$route.params.id.toString());
    if (this.practitioners?.length <= 0)
      await this.fetchHistorys(this.$route.params.id.toString());
  }
}
</script>

<style scoped>
* {
  font-family: Inter;
}

.condition {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #080056;
}

.grey-text {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #667499;
}

.new-item {
  background: #114ff5;
  border-radius: 124px;
}

.tag {
  color: #fff;
  font-size: 14px;
}
</style>
