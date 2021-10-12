<template>
  <detail-card height="313px" title="Current Medications">
   
  </detail-card>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DetailCard from "./detail-card.vue";

import Avatar from "@/components/avatar.vue";
import AddIcon from "@/components/icons/add.vue";
import ChevronRightIcon from "@/components/icons/chevronright.vue";




@Options({
  name: "MedicationCard",
  components: {
    DetailCard,
    Avatar,
    AddIcon,
    // ArrowRightIcon,
    ChevronRightIcon,
  },
})
export default class MedicationCard extends Vue {
  photo = require("@/assets/img/avatar.png");
}
</script>
