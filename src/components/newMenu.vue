<template>
  <div class="menu" @click="onMenuClick">
    <slot name="activator" :on="{ click }" />
    <div class="absolute pt-2 z-50 right-2 right-0 top-2">
      <card
        v-show="showMenu"
        class="relative py-2 p-0 bg-white border-gray-200 rounded-2xl block shadow-xl"
        ref="card"
        :width="'120%'"
      >
        <slot class="p-0" />
      </card>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CardTitle from "@/components/cornie-card/CornieCardTitle.vue";
import Card from "@/components/cornie-card/CornieCard.vue";
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
    };
  }

  click(event: Event) {
    event.stopPropagation();
    if (!this.showMenu) {
      document.body.addEventListener("click", this.closeHandler);
      this.showMenu = true;
    } else this.close();
  }

  close() {
    this.showMenu = false;
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
  max-height: 300px;
  overflow-y: auto;
}
.menu {
  position: relative;
}
</style>
