<template>
  <div class="container-fluid flex">

      <span
        v-for="(actor, index) in items.slice(0, 3)"
        :key="index"
        :class="{ 'img-hover': index > 0 }"
      >
        <div
          class="image-con rounded-full border flex items-center justify-center"
          v-if="actor.image"
        >
          <!-- <img :src="actor.image" class="rounded-full" style="width: 100%;height:100%" :alt="actor.name"> -->
          <avatar :src="actor.image" />
        </div>
        <div
          v-if="!actor.image && actor.firstName"
          class="image-con rounded-full relative -ml-1 flex items-center border justify-center bg-white"
        >
          <span class="text-warning"
            >{{ actor.firstName ? actor.firstName[0] : "" }}
          </span>
          <span class="text-warning"
            >{{ actor.lastName ? actor.lastName[0] : "" }}
          </span>
        </div>
      </span>
      <div
        v-if="items?.length > 3"
        class="image-con rounded-full bg-blue-700 -ml-3 flex items-center border justify-center  relative"
      >
        <span class="text-xs">+{{ items?.length - actors?.length }}</span>
      </div>
  
  </div>
</template>

<script lang="ts">
import IPractitioner from "@/types/IPractitioner";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import Avatar from "@/components/avatar.vue";

@Options({
  components: {
    Avatar,
  },
})
export default class ActorsList extends Vue {
  @Prop()
  items!: IPractitioner[];

  get actors() {
    if (!this.items || this.items.length === 0) return [];
    if (this.items.length >= 3) return this.items;
    return this.items.slice(0, 3);
  }
}
</script>

<style scoped>
.image-con {
  width: 32px;
  height: 32px;
}

.img-hover {
  margin-left: -0.8rem;
}
</style>
