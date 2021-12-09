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
            <Avatar :src="item.image" />
          </div>
          <div class="w-11/12 ml-2">
            <p class="flex flex-col items-start justify-start">
              <span class="main-text" style="color: #14171f">{{
                item.name
              }}</span>
              <span class="subtext job-text">{{ item.job }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import IPractitioner from "@/types/IPractitioner";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import Avatar from "@/components/avatar.vue";

const practitioner = namespace("practitioner");

@Options({
  components: {
    Avatar,
  },
})
export default class Practitioners extends Vue {
  @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  get items() {
    if (this.practitioners?.length <= 0) return [];
    return this.practitioners?.map((practitioner) => {
      return {
        id: practitioner.id,
        name: `${practitioner.firstName} ${practitioner.lastName}`,
        job: practitioner.jobDesignation,
        image: practitioner.image,
      };
    });
  }

  selectItem(item: any) {
    this.$emit("selected", { type: "practitioner", ...item });
  }

  async created() {
    await this.fetchPractitioners();
    console.log(this.practitioners, "PPPPPP");
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
