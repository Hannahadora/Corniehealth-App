<template>
  <div>
    <cornie-input v-bind="$attrs" readonly @click="show = true" />
    <assessment-modal v-model="show" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import AssessmentModal from "./assessment-modal.vue";

@Options({
  name: "AssessmentSelect",
  inheritAttrs: false,
  components: {
    CornieInput,
    AssessmentModal,
  },
})
export default class Assessment extends Vue {
  show = false;
}
</script>
