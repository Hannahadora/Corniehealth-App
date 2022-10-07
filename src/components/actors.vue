<template>
  <div class="container-fluid flex">
    <span>
      <div
        class="image-con rounded-full border flex items-center justify-center"
        v-if="items.image"
      >
        <avatar :src="items.image" />
      </div>
    </span>
  </div>
</template>

<script lang="ts">
  import Avatar from "@/components/avatar.vue";
  import IPractitioner from "@/types/IPractitioner";
  import { Options, Vue } from "vue-class-component";
  import { Prop } from "vue-property-decorator";

  @Options({
    components: {
      Avatar,
    },
  })
  export default class ActorsList extends Vue {
    @Prop()
    items!: IPractitioner[];

    // get actors() {
    //     if (!this.items || this.items.length === 0) return [ ];
    //     if (this.items.length <= 3) return this.items;
    //     return this.items.slice(0, 3);
    // }
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
