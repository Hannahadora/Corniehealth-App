<template>
  <empty-state heading="No job level recorded." subheading="Add new job level">
    <template v-slot:icon>
      <img src="@/assets/img/empty-joblevel.svg" />
    </template>
    <template v-slot:actions>
      <button
        class="bg-danger rounded-full text-white mt-5 py-2 px-5 focus:outline-none hover:opacity-90"
      >
        <span class="flex items-center w-full h-full justify-between">
          <add-icon class="fill-current text-white mr-3" />
          New Job Level
        </span>
      </button>
    </template>
  </empty-state>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import EmptyState from "@/components/CornieEmptyState.vue";
import AddIcon from "@/components/icons/add.vue";

@Options({
  name: "JObLevelEmptyState",
  components: {
    EmptyState,
    AddIcon,
  },
})
export default class JObLevelEmptyState extends Vue {}
</script>
