<template>
  <div class="container-fluid mb-5">
    <div class="w-full">
      <p
        class="flex justify-between items-center border-b-2 cursor-pointer"
        @click="toggleDetailsDisplay"
      >
        <span class="uppercase mb-1 text-sm font-bold">{{ title }}</span>
        <span
          ><ChevronDown
            :class="{ 'icon-down': showDetails, 'icon-normal': !showDetails }"
          />
        </span>
      </p>
      <div
        class="w-full show-details mt-5"
        :style="{ height: displayHeight + 'px' }"
      >
        <!-- <div class="w-full" :class="{ 'hide-details': !showDetails, 'show-details -mb-28': showDetails }"> -->
        <!-- <slot name="details" /> -->
        <div class="w-full mb-4">
          <slot name="form" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChevronDown from "@/components/icons/chevrondown-red.vue";
import CornieSelect from "@/components/cornieselect.vue";
import { Prop } from "vue-property-decorator";

@Options({
  components: {
    ChevronDown,
    CornieSelect,
  },
})
export default class Participants extends Vue {
  showDetails = true;

  @Prop({ type: Number, default: 790 })
  height!: number;

  @Prop({ title: String, default: "" })
  title!: string;

  @Prop({ title: Boolean, default: true })
  show!: boolean;

  get displayHeight() {
    if (this.showDetails) return this.height;
    return 0;
  }

  toggleDetailsDisplay() {
    this.showDetails = !this.showDetails;
  }

  created() {
    if (this.show === false) this.showDetails = false;
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
  overflow: hidden;
}

.icon-normal {
  transition: all 0.5s ease-in-out;
  transform: rotate(270deg);
}

.icon-down {
  transition: all 0.5s ease-in-out;
  transform: rotate(360deg);
}
</style>
