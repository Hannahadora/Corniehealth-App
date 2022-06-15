<template>
  <div class="flex w-full pb-3 mb-2 border-b-2">
    <div class="flex">
      <avatar :src="photo" class="flex-grow-0" />
      <div class="flex flex-col justify-center ml-4">
        <span class="text-sm text-black font-semibold"> {{ name }} </span>
        <span class="text-xs text-green-700"> Queue no. {{ queueNo }} </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import Avatar from "@/components/avatar.vue";

@Options({
  components: {
    Avatar,
  },
})
export default class Queue extends Vue {
  @Prop()
  photo!: string;

  @Prop()
  name!: string;

  @Prop()
  queueNo!: number;
}
</script>
