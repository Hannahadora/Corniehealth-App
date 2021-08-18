<template>
  <div class="menu" @click="onMenuClick" >
    <slot name="activator" :on="{ click }" />
    <card v-show="showMenu" class="menu-popup" :style="styles" ref="card">
      <slot />
    </card>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CardText from "@/components/card-text.vue";
import CardTitle from "@/components/card-title.vue";
import Card from "@/components/card.vue";
import { Prop, PropSync, Ref, Watch } from "vue-property-decorator";

@Options({
  name: "CornieMenu",
  components: {
    Card,
    CardText,
    CardTitle,
  },
})
export default class Menu extends Vue {
  @Prop({ type: Boolean, default: true })
  closeOnClick!: boolean;

  @Prop({ type: String, default: "auto" })
  top!: string;

  @Prop({ type: String, default: "auto" })
  left!: string;

  @Prop({ type: String, default: "auto" })
  right!: string;

  @Prop({ type: String, default: "auto" })
  bottom!: string;

  @PropSync("modelValue", { type: Boolean, default: false })
  syncedModelValue!: boolean;

  showMenu = false;

  closeHandler = () => this.close();

  get styles() {
      return {
        top: this.top,
        left: this.left,
        right: this.right,
        bottom: this.bottom,
      }
  }

  click(event: Event) {
    event.stopPropagation()
    if(!this.showMenu) {
      document.body.addEventListener("click", this.closeHandler);
      this.showMenu = true;
    }
    else this.close();
  }

  onMenuClick(event: Event) {
    if (!this.closeOnClick) event.stopPropagation();
  }

  close() {
    this.showMenu = false;
    document.body.removeEventListener("click", this.closeHandler)
  }

  @Watch("showMenu")
  onShowMenuChanged(newValue: boolean) {
    this.syncedModelValue = newValue;
  }
}
</script>

<style scoped>
.menu-popup {
  position: absolute;
  z-index: 10;
  max-height: 300px;
  overflow-y: auto;
}
.menu {
  position: relative;
}
body {
  position: relative;
}
</style>