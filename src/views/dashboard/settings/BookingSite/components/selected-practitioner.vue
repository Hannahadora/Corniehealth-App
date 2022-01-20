<template>
  <div class="container-fluid flex flex-col">
    <!-- {{ items }} -->
    <span class="flex items-center">
      <span>
        <div
          class="image-con rounded-full border flex items-center justify-center"
          v-if="actor?.image"
        >
          <img
            :src="actor?.image"
            class="rounded-full"
            style="width: 100%; height: 100%"
            :alt="actor?.name"
          />
        </div>
        <div
          v-else
          class="image-con rounded-full -ml-3 flex items-center border justify-center bg-white"
        >
          <span class="text-warning"
            >{{ actor?.firstName ? actor.firstName[0] : "" }}
          </span>
          <span class="text-warning"
            >{{ actor?.lastName ? actor.lastName[0] : "" }}
          </span>
        </div>
      </span>
      <span class="mx-2 flex flex-col">
        <span>
          <span class="text-primary font-semibold"
            >{{ actor?.firstName }}
          </span>
          <span class="text-primary font-semibold mx-2"
            >{{ actor?.lastName }}
          </span>
        </span>
        <span class="w-full text-gray-400 text-sm">
          {{ actor.jobDesignation }}
        </span>
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import IPractitioner from "@/types/IPractitioner";
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class ActorsList extends Vue {
  @Prop()
  item!: IPractitioner;

  get actor() {
    if (!this.item) return {} as IPractitioner;
    return this.item;
  }
}
</script>

<style scoped>
.image-con {
  width: 32px;
  height: 32px;
}
</style>
