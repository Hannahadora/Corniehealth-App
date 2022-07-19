<template>
  <div class="container-fluid" :class="{ 'mb-5': showDetails }">
    <div class="w-full">
      <p
        class="flex justify-between items-center cursor-pointer"
        @click="toggleDetailsDisplay"
        :class="{ 'border-b-2': showDetails || underlined }"
      >
        <span class="header py-2" :style="{ color: color }">{{ title }}</span>
        <span class="flex">
          <ChevronDown
            :class="{ 'icon-down': showDetails, 'icon-normal': !showDetails }"
          />
        </span>
      </p>
      <div
        class="w-full show-details"
        :class="{ 'mt-5': showDetails }"
        :style="{
          height: displayHeight + 'px',
          overflow: showDetails && overflow ? '' : 'hidden',
        }"
      >
        <div class="w-full mb-4">
          <slot name="form" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChevronDown from "@/components/icons/chevrondown.vue";
import CornieSelect from "@/components/cornieselect.vue";
import { Prop } from "vue-property-decorator";
import AddIcon from "@/components/icons/add-circled.vue";
import ExistingIcon from "@/components/icons/select-existing.vue";

@Options({
  components: {
    ChevronDown,
    CornieSelect,
    AddIcon,
    ExistingIcon,
  },
})
export default class CollapseSection extends Vue {
  showDetails = true;

  @Prop()
  color!: string;

  @Prop({ type: Number, default: 790 })
  height!: number;

  @Prop({ title: String, default: "" })
  title!: string;

  @Prop({ title: Boolean, default: false })
  show!: boolean;

  @Prop({ title: Boolean, default: false })
  overflow!: boolean;

  @Prop({ title: Boolean, default: false })
  underlined!: boolean;

  get displayHeight() {
    if (this.showDetails) return this.height;
    return 0;
  }

  toggleDetailsDisplay(e: any) {
    if (!e.target.classList.contains("add")) {
      this.showDetails = !this.showDetails;
    }
  }

  created() {
    if (this.show) this.showDetails = true;
    if (!this.show) this.showDetails = false;
  }
}
</script>

<style scoped>
.hide-details {
  height: 0;
  transition: all 0.4s ease-in-out;
  overflow: hidden;
}

.show-details {
  /* height: 790px; */
  transition: all 0.4s ease-in-out;
  /* overflow: hidden; */
}

.icon-normal {
  transition: all 0.5s ease-in-out;
  transform: rotate(270deg);
}

.icon-down {
  transition: all 0.5s ease-in-out;
  transform: rotate(360deg);
}

.header {
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 27px;
  color: #14171f;
}
</style>
