<template>
  <div class="menu">
    <slot name="activator" :on="{ click, close }" />
    <card v-if="showMenu" @click="close" class="menu-popup ">
        <slot/>
    </card>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CardText from "@/components/card-text.vue"
import CardTitle from "@/components/card-title.vue"
import Card from "@/components/card.vue"

@Options({
  name: "CornieMenu",
  components: {
      Card,
      CardText,
      CardTitle
  }
})
export default class Menu extends Vue {
  showMenu = false;

  click() {
    this.showMenu = true;
  }

  close() {
    this.showMenu = false;
  }
}
</script>

<style scoped>
.menu-popup {
  position: absolute;
  width: 100%;
  max-height: 300px;
  overflow-y: auto
}
.menu {
  position: relative;
}
</style>