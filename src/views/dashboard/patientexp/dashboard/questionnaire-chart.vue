<template>
  <chart-card title="Questionnaires" height="250px">
    <div class="w-full grid grid-cols-1 gap-y-4">
      <div class="w-full flex justify-between pb-2 border-b">
        <div class="w-full flex items-center">
          <avatar :src="photo" />
          <div class="text-xs flex flex-col">
            <span class="font-semibold">
              How did this come to be with no anyone’s knowledge | Title creator
            </span>
            <span class="uppercase">
              <span class="text-success"> December 23, 2021 08:00 pm </span>
              <span class="text-gray-600">
                | 45 respondent | 45 feedback |
              </span>
            </span>
          </div>
        </div>
        <div class="text-xs text-primary">
          <span class="flex items-center">
            Details
            <chevron-down-icon
              class="ml-2 stroke-current cursor-pointer text-danger"
            />
          </span>
        </div>
      </div>

      <div class="w-full flex justify-between pb-2 border-b">
        <div class="w-full flex items-center">
          <avatar :src="photo" />
          <div class="text-xs flex flex-col">
            <span class="font-semibold">
              How did this come to be with no anyone’s knowledge | Title creator
            </span>
            <span class="uppercase">
              <span class="text-success"> December 23, 2021 08:00 pm </span>
              <span class="text-gray-600">
                | 45 respondent | 45 feedback |
              </span>
            </span>
          </div>
        </div>
        <div class="text-xs text-primary">
          <span class="flex items-center">
            Details
            <chevron-down-icon
              class="ml-2 stroke-current cursor-pointer text-danger"
            />
          </span>
        </div>
      </div>
    </div>
  </chart-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChartCard from "./chart-card.vue";
import Avatar from "@/components/avatar.vue";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";

@Options({
  name: "QuestionnaireChart",
  components: {
    ChartCard,
    Avatar,
    ChevronDownIcon,
  },
})
export default class QuestionnaireChart extends Vue {
  photo = require("@/assets/img/avatar.png");
}
</script>
