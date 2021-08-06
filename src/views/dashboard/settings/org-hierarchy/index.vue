<template>
  <div>
    <div class="h-full flex justify-center pb-5">
      <div class="w-full">
        <span class="flex flex-col w-full font-semibold py-2 mx-auto pb-4">
          <span
            class="
              flex
              border-b-2
              w-full
              font-semibold
              text-xl text-primary
              py-2
              mx-auto
            "
          >
            Organization Hierarchy
          </span>
          <span class="flex w-full font-semibold py-2 mx-auto mt-4">
            <span
              class="
                flex
                px-3
                py-2
                border-b-4
                cursor-pointer
                hover:bg-gray-300 hover:bg-opacity-20
              "
              @click="active = i"
              v-for="(tab, i) in tabs"
              :key="i"
              :class="isActive(i) ? ['border-danger'] : []"
            >
              {{ tab }}
            </span>
            <span></span>
            <span class="flex px-3 pb-2 border-b-4 flex-grow"></span>
          </span>
        </span>
        <div>
          <job-level-index v-if="active == 1" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import JobLevelIndex from "./job-level/index.vue";

@Options({
  name: "OrgHierarchyIndex",
  components: {
    JobLevelIndex,
  },
})
export default class OrgHierarchyIndex extends Vue {
  active = 0;
  tabs = ["Functions", "Job Levels", "Designations", "People"];
  isActive(key: number) {
    return key == this.active;
  }
}
</script>
