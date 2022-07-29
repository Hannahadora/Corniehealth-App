<template>
<div>
    <div class="container-fluid flex bg-gray-200 border-l-2 py-1 px-2 border-gray-500 w-full" v-if="actors.length > 1">
        <!-- {{ items }} -->
        <span class="flex w-full">

            <span v-for="(actor, index) in actors" :key="index" :class="{ 'img-hover': index > 0 }">
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
                    class="image-con rounded-full border flex items-center justify-center bg-white cursor-pointer"
                    @click="showActorModal(items)"
                >
                    <span class="text-warning">
                      {{
                          `${actor.user.firstName
                            .substr(0, 1)
                            ?.toUpperCase()}${actor.user.lastName 
                            ?.substr(0, 1)
                            ?.toUpperCase()}`
                        }}
                    </span>
                </div>
            </span>
            <div class="text-xs font-semibold float-right flex justify-end w-full">
                <div class="text-xxs italic text-gray-400 float-right flex justify-end mr-5 w-full"> {{ range +' - '+ range2  }}</div>
                <cornie-menu top="30px" right="100%">
                <template #activator="{ on }">
                  <icon-btn v-on="on">
                    <dots-vertical-icon v-on="on" class="fill-current text-gray-400 cursor-pointer"  @click="showActorModal(items)"/>
                  </icon-btn>
                </template>
                </cornie-menu>
            </div> 
        </span>
        <div
        v-if="actors?.length > 3"
        class="image-con rounded-full bg-yellow-400 text-white font-bold -ml-3 flex items-center border justify-center  relative"
                >
        <span class="text-xs">+{{ items?.length - actors?.length }}</span>
        </div> 
    </div>

     <div class="container-fluid flex" v-else>
    <!-- {{ items }} -->
    <span v-for="(actor, index) in actors" :key="index" :class="{ 'img-hover': index > 0 }">
        <div
            class="image-con rounded-full border flex items-center justify-center"
            v-if="actor.user.image"
            @click="showActorModal(items)"
        >
            <avatar :src="actor.user.image" />
        </div>
        <!-- <div
            v-if="!actor.user.image && actor.user.firstName"
            class="image-con rounded-full relative -ml-4 flex items-center border justify-center bg-white"
        >
            <span class="text-warning"
            >{{ actor.user.firstName ? actor.user.firstName : "" }}
            </span>
            <span class="text-warning"
            >{{ actor.user.lastName ? actor.user.lastName : "" }}
            </span>
        </div> -->
        <!-- <div class="text-xs purple font-semibold">
            {{ actor.user.firstName +' '+ actor.user.lastName}}
            <div class="text-xs italic small"> {{ range }}</div>
        </div> -->
    </span>
    <div
      v-if="actors?.length > 3"
      class="image-con rounded-full bg-yellow-400 text-white font-bold -ml-3 flex items-center border justify-center  relative"
            >
      <span class="text-xs">+{{ items?.length - actors?.length }}</span>
    </div> 
  </div>
</div>

 <actors-modal :singletime="singletime" :date="date" :actors="setActors" :range="range" :range2="range2"  v-model="showActors" @one-id="setId"/>
</template>

<script lang="ts">
import IPractitioner from "@/types/IPractitioner";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import Avatar from "@/components/avatar.vue";
import CornieMenu from "@/components/CornieMenu.vue";
import DotsVerticalIcon from "@/components/icons/DotsGrayIcon.vue";
import ActorsModal from "./add-actor.vue";


@Options({
  components: {
    Avatar,
    CornieMenu,
    DotsVerticalIcon,
    ActorsModal
  },
})
export default class ActorsList extends Vue {
//   @Prop()
//   items!: IPractitioner[];

@Prop({ type: String, default: "" })
  range!: string;

  @Prop({ type: String, default: 0 })
  range2!: number;

  @Prop({ type: String, default: 0 })
  singletime!: number;

  @Prop({ type: Array, default: [] })
  items!: any;

  @Prop({ type: String, default: "" })
  date!: string;

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
.border-purple{
    border: 1px solid #541388;
}
.bg-purple{
    background: rgba(84, 19, 136, 0.12);;
}
.purple{
    color: #541388;
}
.small{
    color: rgba(84, 19, 136, 0.5);
}
</style>
