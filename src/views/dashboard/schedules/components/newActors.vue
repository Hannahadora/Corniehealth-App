<template>
  <div class="container-fluid flex cursor-pointer">
    <!-- {{ items }} -->
    <span
      v-for="(actor, index) in actors"
      :key="index"
      :class="{ 'img-hover': index > 0 }"
    >
      <div
        class="image-con rounded-full border flex items-center justify-center cursor-pointer"
        v-if="actor.user.image"
        @click="showActorModal(items)"
      >
        <!-- <img :src="actor.image" class="rounded-full" style="width: 100%;height:100%" :alt="actor.name"> -->
        <avatar :src="actor.user.image" />
      </div>
      <div
        v-if="!actor.user.image && actor.user.firstName"
        class="image-con rounded-full relative -ml-1 flex items-center border justify-center bg-white"
      >
        <span class="text-warning"
          >{{ actor.user.firstName ? actor.user.firstName : "" }}
        </span>
        <span class="text-warning"
          >{{ actor.user.lastName ? actor.user.lastName : "" }}
        </span>
      </div>
    </span>
    <div
      v-if="items?.length > 3"
      class="image-con rounded-full bg-blue-600 text-white font-bold -ml-3 flex items-center border justify-center  relative"
    >
      <span class="text-xs">+{{ items?.length - actors?.length }}</span>
    </div>
  </div>
 <actors-modal :actors="setActors" :range="range"  v-model="showActors" @one-id="setId"/>
</template>

<script lang="ts">
import IPractitioner from "@/types/IPractitioner";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import Avatar from "@/components/avatar.vue";
import ActorsModal from "./add-actor.vue";

@Options({
  components: {
    Avatar,
    ActorsModal
  },
})
export default class ActorsList extends Vue {
//   @Prop()
//   items!: IPractitioner[];

@Prop({ type: String, default: "" })
  range!: string;

  @Prop({ type: Array, default: [] })
  items!: any;

  setActors= [];
  showActors = false;

  get actors() {
    if (!this.items || this.items.length === 0) return [];
    if (this.items.length <= 3) return this.items;
    return this.items.slice(0, 3);
  }
 showActorModal(value:any){
     this.setActors = value;
     this.showActors = true;
 }
  
  setId(practitioner:any,value:string){
     console.log(practitioner,value,"HELLO SECOND")
    this.$emit('set-oneId', practitioner,value)
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
