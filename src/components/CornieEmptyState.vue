<template>
  <div class="empty-state">
    <slot name="icon" />
    <h3 class="mt-5 font-bold text-lg" v-if="heading">{{ heading }}</h3>
    <h5 class="text-sm mt-2" v-if="subheading">
      {{ subheading }}
    </h5>
    <div class="actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({})
export default class EmptyState extends Vue {
  @Prop()
  heading!: string;

  @Prop()
  subheading!: string;
}
</script>

<style scoped>
.empty-state {
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
img {
  margin: 0;
}
</style>
